<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'about',
        'thumbnail',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function keypoints()
    {
        return $this->hasMany(ProjectKeypoint::class);
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }
}
