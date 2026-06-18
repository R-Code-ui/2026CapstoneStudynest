import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, ClipboardList, FileQuestion, Megaphone, GraduationCap, Activity, Clock, TrendingUp, AlertCircle } from 'lucide-react';

// Define the same interfaces (you already have them in types/index.d.ts)
// We'll use optional props with default values.

export default function PrincipalDashboard() {
    const { props } = usePage<{
        stats?: {
            totalTeachers: number;
            totalStudents: number;
            totalLessons: number;
            totalAssignments: number;
            totalQuizzes: number;
            totalAnnouncements: number;
        };
        teacherActivity?: Array<{
            name: string;
            teacher_id: string;
            lessons: number;
            assignments: number;
            quizzes: number;
            last_activity: string;
        }>;
        studentParticipation?: Array<{
            grade_level: string;
            students: number;
            active_students: number;
            participation_rate: number;
        }>;
        recentActivities?: Array<{
            teacher_name: string;
            activity_type: string;
            description: string;
            created_at: string;
        }>;
        recentAnnouncements?: Array<{
            title: string;
            author_name: string;
            author_role: string;
            created_at: string;
        }>;
        academicSummary?: {
            avg_quiz_score: number;
            assignment_completion_rate: number;
            lesson_completion_rate: number;
        };
        quickStats?: {
            most_active_teacher: string | null;
            least_active_teacher: string | null;
            teachers_with_no_activity: number;
        };
    }>();

    // Fallback defaults
    const stats = props.stats ?? {
        totalTeachers: 0,
        totalStudents: 0,
        totalLessons: 0,
        totalAssignments: 0,
        totalQuizzes: 0,
        totalAnnouncements: 0,
    };

    const teacherActivity = props.teacherActivity ?? [];
    const studentParticipation = props.studentParticipation ?? [];
    const recentActivities = props.recentActivities ?? [];
    const recentAnnouncements = props.recentAnnouncements ?? [];
    const academicSummary = props.academicSummary ?? {
        avg_quiz_score: 0,
        assignment_completion_rate: 0,
        lesson_completion_rate: 0,
    };
    const quickStats = props.quickStats ?? {
        most_active_teacher: null,
        least_active_teacher: null,
        teachers_with_no_activity: 0,
    };

    const statCards = [
        { title: 'Total Teachers', value: stats.totalTeachers, icon: Users, color: 'text-blue-500' },
        { title: 'Total Students', value: stats.totalStudents, icon: GraduationCap, color: 'text-green-500' },
        { title: 'Lessons Published', value: stats.totalLessons, icon: BookOpen, color: 'text-purple-500' },
        { title: 'Assignments', value: stats.totalAssignments, icon: ClipboardList, color: 'text-orange-500' },
        { title: 'Quizzes', value: stats.totalQuizzes, icon: FileQuestion, color: 'text-red-500' },
        { title: 'Announcements', value: stats.totalAnnouncements, icon: Megaphone, color: 'text-indigo-500' },
    ];

    return (
        <>
            <Head title="Principal Dashboard" />

            <div className="p-4 md:p-6 space-y-6">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Principal Dashboard</h1>
                        <p className="text-muted-foreground">School Overview & Academic Monitoring</p>
                    </div>
                </div>

                {/* Section 1: School Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {statCards.map((card, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {card.title}
                                </CardTitle>
                                <card.icon className={`h-5 w-5 ${card.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Section 2: Teacher Activity Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Teacher Activity Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-2 font-medium">Teacher</th>
                                                <th className="text-center py-3 px-2 font-medium">Lessons</th>
                                                <th className="text-center py-3 px-2 font-medium">Assignments</th>
                                                <th className="text-center py-3 px-2 font-medium">Quizzes</th>
                                                <th className="text-right py-3 px-2 font-medium">Last Activity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teacherActivity.map((teacher, index) => (
                                                <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                                                    <td className="py-3 px-2 font-medium">{teacher.name}</td>
                                                    <td className="text-center py-3 px-2">{teacher.lessons}</td>
                                                    <td className="text-center py-3 px-2">{teacher.assignments}</td>
                                                    <td className="text-center py-3 px-2">{teacher.quizzes}</td>
                                                    <td className="text-right py-3 px-2 text-muted-foreground">
                                                        {teacher.last_activity}
                                                    </td>
                                                </tr>
                                            ))}
                                            {teacherActivity.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-6 text-muted-foreground">
                                                        No teachers found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Quick Statistics */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Most Active Teacher</p>
                                        <p className="font-semibold">{quickStats.most_active_teacher ?? 'N/A'}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Least Active Teacher</p>
                                        <p className="font-semibold">{quickStats.least_active_teacher ?? 'N/A'}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Teachers with No Activity</p>
                                        <p className="font-semibold">{quickStats.teachers_with_no_activity}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Section 3: Student Participation Overview */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5" />
                                    Student Participation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {studentParticipation.map((grade, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium">{grade.grade_level}</span>
                                                <span>{grade.active_students}/{grade.students} students</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all ${grade.participation_rate >= 80 ? 'bg-green-500' :
                                                        grade.participation_rate >= 60 ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                        }`}
                                                    style={{ width: `${grade.participation_rate}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-end text-xs text-muted-foreground">
                                                {grade.participation_rate}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Overall Participation</span>
                                        <Badge variant="default" className="text-lg px-3 py-1">
                                            {studentParticipation.length > 0
                                                ? Math.round(studentParticipation.reduce((acc, curr) => acc + curr.participation_rate, 0) / studentParticipation.length)
                                                : 0}%
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Section 4 & 5: Recent Activities & Announcements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Teacher Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Recent Teacher Activities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-medium">{activity.teacher_name.charAt(0)}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{activity.teacher_name}</p>
                                            <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{activity.created_at}</p>
                                        </div>
                                    </div>
                                ))}
                                {recentActivities.length === 0 && (
                                    <p className="text-center text-muted-foreground py-4">No recent activities</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Announcements */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Megaphone className="h-5 w-5" />
                                Recent Announcements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentAnnouncements.map((announcement, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-medium">
                                                {announcement.author_name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{announcement.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Posted by {announcement.author_name}
                                                {announcement.author_role === 'principal' && (
                                                    <Badge variant="secondary" className="ml-2 text-xs">Principal</Badge>
                                                )}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">{announcement.created_at}</p>
                                        </div>
                                    </div>
                                ))}
                                {recentAnnouncements.length === 0 && (
                                    <p className="text-center text-muted-foreground py-4">No recent announcements</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section 6: Academic Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Average Quiz Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{academicSummary.avg_quiz_score}%</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Assignment Completion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{academicSummary.assignment_completion_rate}%</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Lesson Completion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">{academicSummary.lesson_completion_rate}%</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section 7: Quick Navigation */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <Button variant="default" asChild>
                        <a href="/principal/users">Manage Teachers</a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="/principal/reports">View Reports</a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="/principal/activity-logs">View Activity Logs</a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="/principal/announcements">View Announcements</a>
                    </Button>
                    <Button variant="secondary" asChild>
                        <a href="/principal/teachers">View Student Participation</a>
                    </Button>
                </div>
            </div>
        </>
    );
}
