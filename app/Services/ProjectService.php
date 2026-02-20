<?php

// app/Services/ProjectService.php
namespace App\Services;

use App\Query\ProjectQuery;
use Illuminate\Support\Facades\Cache;

class ProjectService
{
    public function __construct(
        protected ProjectQuery $query
    ) {}

    public function getProjects(?string $search, int $perPage)
    {
        $page = request('page', 1);

        $cacheKey = "projects:list:"
            . md5(json_encode([$search, $perPage, $page]));

        return Cache::remember(
            $cacheKey,
            now()->addMinutes(10),
            fn() => $search
                ? $this->query->search($search, $perPage)
                : $this->query->paginate($perPage)
        );
    }
}
