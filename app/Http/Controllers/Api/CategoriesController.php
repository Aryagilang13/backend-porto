<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoriesResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'status' => 'success',
            'data' => CategoriesResource::collection($categories)
        ]);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        return response()->json([
            'status' => 'success',
            'data' => new CategoriesResource($category)
        ]);
    }
}
