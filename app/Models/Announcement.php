<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'author_role',
        'title',
        'category',
        'message',
        'target_audience',
        'priority',
        'is_pinned',
        'status',
        'publish_date',
        'expiration_date',
        'attachment',
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'publish_date' => 'date',
        'expiration_date' => 'date',
        'attachment' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function views()
    {
        return $this->hasMany(AnnouncementView::class);
    }
}
