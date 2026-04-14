<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Category;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    /**
     * 1. Display all transactions (Read)
     */
    public function index()
    {
        return Inertia::render('transactions/index', [
            'transactions' => Auth::user()->transactions()
                ->with(['category', 'account'])
                ->orderBy('date', 'desc')
                ->get()
        ]);
    }

    /**
     * 2. Show the form for creating a new transaction
     */
    public function create()
    {
        return Inertia::render('transactions/create', [
            'categories' => Auth::user()->categories()->get(),
            'accounts' => Auth::user()->accounts()->get(),
        ]);
    }

    /**
     * 3. Store a newly created transaction (Create)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'account_id'  => 'required|exists:accounts,id',
            'amount'      => 'required|numeric|min:0.01',
            'description' => 'nullable|string|max:255',
            'date'        => 'required|date',
            'type'        => 'required|in:income,expense',
        ]);

        Auth::user()->transactions()->create($validated);

        return redirect()->route('transactions.index')->with('success', 'Transaction added!');
    }

    /**
     * 4. Display a specific transaction (Show)
     */
    public function show(Transaction $transaction)
    {
        // Check ownership
        if ($transaction->user_id !== Auth::id()) abort(403);

        return Inertia::render('transactions/show', [
            'transaction' => $transaction->load(['category', 'account'])
        ]);
    }

    /**
     * 5. Show the form for editing a transaction
     */
    public function edit(Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) abort(403);

        return Inertia::render('transactions/edit', [
            'transaction' => $transaction,
            'categories'  => Auth::user()->categories()->get(),
            'accounts'    => Auth::user()->accounts()->get(),
        ]);
    }

    /**
     * 6. Update the transaction (Update)
     */
    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) abort(403);

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'account_id'  => 'required|exists:accounts,id',
            'amount'      => 'required|numeric|min:0.01',
            'description' => 'nullable|string|max:255',
            'date'        => 'required|date',
            'type'        => 'required|in:income,expense',
        ]);

        $transaction->update($validated);

        return redirect()->route('transactions.index')->with('success', 'Transaction updated!');
    }

    /**
     * 7. Remove the transaction (Delete)
     */
    public function destroy(Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) abort(403);

        $transaction->delete();

        return redirect()->route('transactions.index')->with('success', 'Transaction deleted!');
    }
}
