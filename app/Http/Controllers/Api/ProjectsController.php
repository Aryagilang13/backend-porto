<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use App\Services\ProjectService;

class ProjectsController extends Controller
{
    public function index(Request $request, ProjectService $service)
    {
        $projects = $service->getProjects(
            search: $request->get('search'),
            perPage: $request->get('per_page', 10)
        );

        // $projects = Project::with(['media', 'keypoints'])->get();
        return response()->json([
            'status' => 'success',
            'data' => ProjectResource::collection($projects),
            'pagination' => [
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
                'per_page' => $projects->perPage(),
                'total' => $projects->total(),
                'next_page_url' => $projects->nextPageUrl(),
                'prev_page_url' => $projects->previousPageUrl(),
            ]
        ]);
    }

    public function show($slug)
    {
        $project = Project::with(['media', 'keypoints'])->where('slug', $slug)->firstOrFail();
        return response()->json([
            'status' => 'success',
            'data' => new ProjectResource($project)
        ]);
    }

    public function filterByCategory($slug)
    {
        $projects = Project::with(['media', 'keypoints', 'category'])
            ->whereHas('category', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })
            ->paginate(6);

        if ($projects->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }


        return response()->json([
            'status' => 'success',
            'data' => ProjectResource::collection($projects)
        ]);
    }

    public function filterByKeypoint($keypoint)
    {
        $projects = Project::with(['media', 'keypoints', 'category'])
            ->whereHas('keypoints', function ($query) use ($keypoint) {
                $query->where('name', $keypoint);
            })
            ->paginate(6);

        if ($projects->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Keypoints not found'
            ], 404);
        }


        return response()->json([
            'status' => 'success',
            'data' => ProjectResource::collection($projects)
        ]);
    }
}
