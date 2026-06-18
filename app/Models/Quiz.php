<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'lesson_id',
        'grade_level',
        'subject_id',
        'school_year',
        'trimester',
        'week_number',
        'title',
        'quiz_type',
        'total_questions',
        'time_limit',
        'passing_score',
        'attempts_allowed',
        'shuffle_questions',
        'status',
        'publish_date',
    ];

    protected $casts = [
        'shuffle_questions' => 'boolean',
        'time_limit' => 'integer',
        'passing_score' => 'integer',
        'attempts_allowed' => 'integer',
        'publish_date' => 'date',
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

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
}
