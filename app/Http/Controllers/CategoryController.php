<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Categories list eka pennanna
     */
    public function index()
    {
        return Inertia::render('categories/index', [
            'categories' => Auth::user()->categories()->latest()->get()
        ]);
    }

    /**
     * Aluth category form eka pennanna
     */
    public function create()
    {
        return Inertia::render('categories/create');
    }

    /**
     * Database ekata save karanna
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                // User wise unique name check (Same user ta ekama name eken deka ba)
                Rule::unique('categories')->where(fn ($query) => $query->where('user_id', Auth::id())),
            ],
            'type' => 'required|string|in:income,expense',
            'icon' => 'nullable|string',
            'color' => 'nullable|string|max:7', // Hex code eka (#FFFFFF)
        ], [
            'name.unique' => 'This category name already exists!'
        ]);

        $request->user()->categories()->create($validated);

        return redirect()->route('categories.index')->with('success', 'Category created!');
    }
    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        // Security check
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('categories/show', [
            'category' => $category,
            // Passe api transactions haduwama me category ekata
            // adala transactions tika meheta pass karamu.
            'transactions' => []
        ]);
    }

    /**
     * Edit form eka pennanna
     */
    public function edit(Category $category)
    {
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('categories/edit', [
            'category' => $category
        ]);
    }

    /**
     * Thiyena category ekak update karanna
     */
    public function update(Request $request, Category $category)
    {
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories')
                    ->where(fn ($query) => $query->where('user_id', Auth::id()))
                    ->ignore($category->id),
            ],
            'type' => 'required|string|in:income,expense',
            'icon' => 'nullable|string',
            'color' => 'nullable|string|max:7',
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')->with('success', 'Category updated!');
    }

    /**
     * Category eka delete karanna
     */
    public function destroy(Category $category)
    {
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted!');
    }
}
