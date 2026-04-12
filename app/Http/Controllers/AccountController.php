<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    /**
     * Display a listing of the accounts.
     */
    public function index()
    {
        return Inertia::render('accounts/index', [
            'accounts' => Auth::user()->accounts()->latest()->get(),
        ]);
    }


    /**
     * Show the form for creating a new account.
     * Aluth account ekak hadana page ekata yanna meka oni.
     */
    public function create()
    {
        return Inertia::render('accounts/create');
    }

    /**
     * Store a newly created account in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('accounts')->where(fn ($query) => $query->where('user_id', Auth::id())),
            ],
            'type' => 'required|string|in:Bank,Cash,Wallet,Card',
            'balance' => 'required|numeric|min:0',
        ], [
            'name.unique' => 'You already have an account with this name!', // Custom error message එක
        ]);

        $request->user()->accounts()->create($validated);

        return redirect()->route('accounts.index')->with('success', 'Account created successfully!');
    }
    /**
     * Display the specified account.
     */
    public function show(Account $account)
    {
        // Me account eka ayithi me user ta mada kiyala check karanna
        if ($account->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('accounts/show', [
            'account' => $account
        ]);
    }

        /**
     * Show the form for editing the specified account.
     */
    public function edit(Account $account)
    {
        // Me account eka ayithi me user ta mada kiyala check karanna
        if ($account->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('accounts/edit', [
            'account' => $account
        ]);
    }

    /**
     * Update the specified account in storage.
     */
    public function update(Request $request, Account $account)
    {
        if ($account->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('accounts')
                    ->where(fn ($query) => $query->where('user_id', Auth::id()))
                    ->ignore($account->id),
            ],
            'type' => 'required|string|in:Bank,Cash,Wallet,Card',
            'balance' => 'required|numeric|min:0',
        ]);

        $account->update($validated);

        return redirect()->route('accounts.index')->with('success', 'Account updated successfully!');
    }

    /**
     * Remove the specified account from storage.
     */
    public function destroy(Account $account)
    {
        if ($account->user_id !== Auth::id()) {
            abort(403);
        }

        $account->delete();

        return redirect()->back()->with('success', 'Account deleted successfully!');
    }
}
