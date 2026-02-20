<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMediaRequest;
use App\Models\Media;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class MediaController extends Controller
{
    public function create(Project $project)
    {
        $project->load('media');

        return inertia('Projects/Media/Create', [
            'project' => $project,
        ]);
    }

    public function store(StoreMediaRequest $request, Project $project)
    {
        $lastOrder = $project->media()->max('order') ?? 0;

        if ($request->type === 'image') {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('projects/media', 'public');

                $project->media()->create([
                    'type' => 'image',
                    'path_image' => $path,
                    'order' => $lastOrder + $index + 1,
                ]);
            }
        }

        if ($request->type === 'video') {

            $url = $request->path_trailer;

            preg_match(
                '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i',
                $url,
                $matches
            );

            if (!isset($matches[1])) {
                return back()->withErrors([
                    'path_trailer' => 'Invalid YouTube URL',
                ]);
            }

            $embedUrl = 'https://www.youtube.com/embed/' . $matches[1];

            $project->media()->create([
                'type' => 'video',
                'path_trailer' => $embedUrl,
                'order' => ($project->media()->max('order') ?? 0) + 1,
            ]);
        }


        return redirect()
            ->back()
            ->with('success', 'Media uploaded successfully');
    }

    public function destroy(Project $project, Media $media)
    {
        $media->delete();

        return redirect()
            ->back()
            ->with('success', 'Media deleted');
    }
}
