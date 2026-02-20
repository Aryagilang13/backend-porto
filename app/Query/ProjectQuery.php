<?php

namespace App\Query;

use App\Models\Project;

class ProjectQuery
{
    private function base()
    {
        return Project::query()->with(['media', 'keypoints', 'category'])->latest();
    }

    public function paginate(int $perPage)
    {
        return $this->base()->paginate($perPage);
    }

    public function search(string $keyword, int $perPage)
    {
        return $this->base()
            ->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                    ->orWhere('about', 'like', "%{$keyword}%");
            })
            ->paginate($perPage);
    }
}
