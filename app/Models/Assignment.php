<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'lesson_id',
        'subject_id',
        'grade_level',
        'school_year',
        'trimester',
        'week_number',
        'title',
        'type',
        'instructions',
        'total_points',
        'estimated_time',
        'allow_late_submission',
        'due_date',
        'due_time',
        'submission_methods',
        'status',
        'publish_date',
    ];

    protected $casts = [
        'allow_late_submission' => 'boolean',
        'due_date' => 'date',
        'due_time' => 'datetime',
        'publish_date' => 'date',
        'submission_methods' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function submissions()
    {
        return $this->hasMany(AssignmentSubmission::class);
    }
}
