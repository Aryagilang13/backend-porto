<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Category;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    // public function __construct()
    // {
    //     $this->middlew('permission:manage project');
    // }

    public function index()
    {
        $projects = Project::with('category')->latest()->get();

        return inertia('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return inertia('Projects/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $project = null;

        DB::transaction(function () use ($request, &$project) {

            $data = $request->validated();

            $data['thumbnail'] = $request
                ->file('thumbnail')
                ->store('projects/thumbnails', 'public');

            $project = Project::create($data);

            if ($request->keypoints) {
                foreach ($request->keypoints as $kp) {
                    $project->keypoints()->create([
                        'name' => $kp
                    ]);
                }
            }
        });

        return redirect()
            ->route('projects.media.create', $project->id)
            ->with('success', 'Project created, now upload media');
    }


    public function edit(Project $project)
    {
        $project->load(['category', 'keypoints', 'media']);

        return inertia('Projects/Edit', [
            'project' => $project,
            'categories' => Category::all(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        DB::transaction(function () use ($request, $project) {

            $data = $request->validated();

            if ($request->hasFile('thumbnail')) {
                $data['thumbnail'] = $request
                    ->file('thumbnail')
                    ->store('projects/thumbnails', 'public');
            }

            $project->update($data);

            // reset & reinsert keypoints
            $project->keypoints()->delete();

            if ($request->keypoints) {
                foreach ($request->keypoints as $kp) {
                    $project->keypoints()->create([
                        'name' => $kp
                    ]);
                }
            }
        });

        return redirect()->back()
            ->with('success', 'Project updated successfully');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted');
    }
}
