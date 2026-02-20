<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
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
        if ($this->type === 'image') {
            return [
                'type' => 'required|in:image,video',
                'images' => 'required|array',
                'images.*' => 'image|max:2048',
            ];
        }

        if ($this->type === 'video') {
            return [
                'type' => 'required|in:image,video',
                'path_trailer' => 'required|url',
            ];
        }

        return [];
    }
}
