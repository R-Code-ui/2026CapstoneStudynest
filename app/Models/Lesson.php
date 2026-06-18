<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'subject_id',
        'grade_level',
        'school_year',
        'trimester',
        'week_number',
        'bow_code',
        'learning_competency',
        'learning_objective',
        'title',
        'description',
        'content',
        'key_takeaways',
        'status',
        'publish_date',
    ];

    protected $casts = [
        'publish_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function resources()
    {
        return $this->hasMany(LessonResource::class);
    }

    public function relatedAssignment()
    {
        return $this->hasOne(Assignment::class, 'lesson_id');
    }

    public function relatedQuiz()
    {
        return $this->hasOne(Quiz::class, 'lesson_id');
    }
}
