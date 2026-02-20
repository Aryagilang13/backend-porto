<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:projects,slug,' . $this->project->id,
            'about' => 'required|string',

            'thumbnail' => 'nullable|image|max:2048',

            'category_id' => 'required|exists:categories,id',

            'keypoints' => 'nullable|array',
            'keypoints.*' => 'required|string|max:255',
        ];
    }
}
