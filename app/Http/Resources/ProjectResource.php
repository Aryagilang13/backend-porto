<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'about' => $this->about,
            'thumbnail' => $this->thumbnail,
            'category_id' => $this->category_id,
            'media' => $this->media->map(function ($m) {
                return [
                    'type' => $m->type,
                    'path_image' => $m->path_image,
                    'path_trailer' => $m->path_trailer,
                ];
            }),
            'keypoints' => $this->keypoints->map(function ($k) {
                return [
                    'name' => $k->name
                ];
            }),
        ];
    }
}
