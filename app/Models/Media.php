<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'type',
        'path_image',
        'path_trailer',
        'order'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
