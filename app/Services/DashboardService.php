<?php

namespace App\Services;

use App\Models\User;
use App\Models\Lesson;
use App\Models\Assignment;
use App\Models\Quiz;
use App\Models\Announcement;
use App\Models\ActivityLog;
use App\Models\QuizAttempt;
use App\Models\AssignmentSubmission;

class DashboardService
{
    public function getDashboardData(): array
    {
        return [
            'stats'                => $this->getStats(),
            'teacherActivity'      => $this->getTeacherActivity(),
            'studentParticipation' => $this->getStudentParticipation(),
            'recentActivities'     => $this->getRecentActivities(),
            'recentAnnouncements'  => $this->getRecentAnnouncements(),
            'academicSummary'      => $this->getAcademicSummary(),
            'quickStats'           => $this->getQuickStats(),
        ];
    }

    private function getStats(): array
    {
        return [
            'totalTeachers'      => User::role('teacher')->where('is_archived', false)->count(),
            'totalStudents'      => User::role('student')->where('is_archived', false)->count(),
            'totalLessons'       => Lesson::where('status', 'published')->count(),
            'totalAssignments'   => Assignment::where('status', 'published')->count(),
            'totalQuizzes'       => Quiz::where('status', 'published')->count(),
            'totalAnnouncements' => Announcement::where('status', 'published')->count(),
        ];
    }

    private function getTeacherActivity(): array
    {
        $teachers = User::role('teacher')
            ->where('is_archived', false)
            ->with([
                'lessons' => fn($q) => $q->where('status', 'published'),
                'assignments' => fn($q) => $q->where('status', 'published'),
                'quizzes' => fn($q) => $q->where('status', 'published'),
                'teacherGradeAssignments',
            ])
            ->get();

        $activities = $teachers->map(function (User $teacher) {
            // Get last activity from latest created_at across content types
            $lastLesson     = $teacher->lessons()->max('created_at');
            $lastAssignment = $teacher->assignments()->max('created_at');
            $lastQuiz       = $teacher->quizzes()->max('created_at');

            $timestamps = collect([$lastLesson, $lastAssignment, $lastQuiz])
                ->filter()
                ->map(fn($d) => \Carbon\Carbon::parse($d))
                ->sort();

            $lastActivity = $timestamps->last();

            return [
                'name'          => $teacher->name,
                'teacher_id'    => $teacher->teacher_id,
                'lessons'       => $teacher->lessons->count(),
                'assignments'   => $teacher->assignments->count(),
                'quizzes'       => $teacher->quizzes->count(),
                'last_activity' => $lastActivity ? $lastActivity->diffForHumans() : 'No activity yet',
                '_sort_key'     => $lastActivity?->timestamp ?? 0,
            ];
        });

        // Sort descending by last activity timestamp, then remove _sort_key
        return $activities
            ->sortByDesc('_sort_key')
            ->values()
            ->map(fn($a) => \Illuminate\Support\Arr::except($a, ['_sort_key']))
            ->toArray();
    }

    private function getStudentParticipation(): array
    {
        $grades = ['Grade 4', 'Grade 5', 'Grade 6'];
        $participation = [];

        foreach ($grades as $grade) {
            $studentIds = User::role('student')
                ->where('grade_level', $grade)
                ->where('is_archived', false)
                ->pluck('id');

            $total = $studentIds->count();

            $active = $studentIds->filter(function ($id) {
                return AssignmentSubmission::where('student_id', $id)->exists()
                    || QuizAttempt::where('student_id', $id)->exists();
            })->count();

            $participation[] = [
                'grade_level'        => $grade,
                'students'           => $total,
                'active_students'    => $active,
                'participation_rate' => $total > 0 ? round(($active / $total) * 100) : 0,
            ];
        }

        return $participation;
    }

    private function getRecentActivities(): array
    {
        return ActivityLog::with('user')
            ->where('role', 'teacher')
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->map(fn(ActivityLog $log) => [
                'teacher_name'  => $log->user?->name ?? 'Unknown',
                'activity_type' => $log->activity_type,
                'description'   => $log->description,
                'created_at'    => $log->created_at->diffForHumans(),
            ])
            ->toArray();
    }

    private function getRecentAnnouncements(): array
    {
        return Announcement::with('author')
            ->where('status', 'published')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn(Announcement $a) => [
                'title'       => $a->title,
                'author_name' => $a->author?->name ?? 'Unknown',
                'author_role' => $a->author_role,
                'created_at'  => $a->created_at->diffForHumans(),
            ])
            ->toArray();
    }

    private function getAcademicSummary(): array
    {
        $avgQuizScore = QuizAttempt::where('status', 'completed')
            ->whereNotNull('score')
            ->avg('score') ?? 0;

        $totalStudents    = User::role('student')->where('is_archived', false)->count();
        $totalAssignments = Assignment::where('status', 'published')->count();
        $totalSubmissions = AssignmentSubmission::whereIn('status', [
            'submitted', 'late', 'reviewed', 'graded', 'returned',
        ])->count();

        $expectedSubmissions      = $totalAssignments * $totalStudents;
        $assignmentCompletionRate = $expectedSubmissions > 0
            ? round(($totalSubmissions / $expectedSubmissions) * 100)
            : 0;

        $totalLessons    = Lesson::count();
        $publishedLessons = Lesson::where('status', 'published')->count();
        $lessonCompletionRate = $totalLessons > 0
            ? round(($publishedLessons / $totalLessons) * 100)
            : 0;

        return [
            'avg_quiz_score'            => round($avgQuizScore, 1),
            'assignment_completion_rate' => $assignmentCompletionRate,
            'lesson_completion_rate'     => $lessonCompletionRate,
        ];
    }

    private function getQuickStats(): array
    {
        $teachers = User::role('teacher')
            ->where('is_archived', false)
            ->get();

        $noActivity = 0;
        $teacherData = [];

        foreach ($teachers as $teacher) {
            $count = ActivityLog::where('user_id', $teacher->id)->count();
            $teacherData[] = ['name' => $teacher->name, 'count' => $count];
            if ($count === 0) $noActivity++;
        }

        usort($teacherData, fn($a, $b) => $b['count'] - $a['count']);

        return [
            'most_active_teacher'        => $teacherData[0]['name'] ?? null,
            'least_active_teacher'       => $teacherData[count($teacherData) - 1]['name'] ?? null,
            'teachers_with_no_activity'  => $noActivity,
        ];
    }
}
