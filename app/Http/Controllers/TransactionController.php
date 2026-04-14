<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Account;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the transactions (Logged in user's only).
     */
    public function index()
    {
        return Inertia::render('transactions/index', [
            'transactions' => Transaction::where('user_id', auth()->id()) // අදාළ user ගේ ඒවා විතරයි
                ->with(['category', 'account'])
                ->latest('date')
                ->get()
        ]);
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create()
    {
        return Inertia::render('transactions/create', [
            'categories' => Category::all(),
            'accounts' => Account::all()
        ]);
    }

    /**
     * Store a newly created transaction.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'account_id'  => 'required|exists:accounts,id',
            'amount'      => 'required|numeric|min:0',
            'type'        => 'required|in:income,expense',
            'date'        => 'required|date',
            'description' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            // User ID එක මෙතනදී manual එකතු කරනවා
            Transaction::create(array_merge($validated, [
                'user_id' => auth()->id()
            ]));

            $account = Account::findOrFail($validated['account_id']);
            if ($validated['type'] === 'income') {
                $account->balance += $validated['amount'];
            } else {
                $account->balance -= $validated['amount'];
            }
            $account->save();
        });

        return redirect()->route('transactions.index');
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction)
    {
        // වෙනත් user කෙනෙක්ගේ එකක් බලන්න බැරි වෙන්න දාපු security check එකක්
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('transactions/show', [
            'transaction' => $transaction->load(['category', 'account'])
        ]);
    }

    /**
     * Show the form for editing.
     */
    public function edit(Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('transactions/edit', [
            'transaction' => $transaction,
            'categories' => Category::all(),
            'accounts' => Account::all()
        ]);
    }

    /**
     * Update the specified transaction.
     */
    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'account_id'  => 'required|exists:accounts,id',
            'amount'      => 'required|numeric|min:0',
            'type'        => 'required|in:income,expense',
            'date'        => 'required|date',
            'description' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $transaction) {
            // 1. Reverse old balance
            $oldAccount = Account::findOrFail($transaction->account_id);
            if ($transaction->type === 'income') {
                $oldAccount->balance -= $transaction->amount;
            } else {
                $oldAccount->balance += $transaction->amount;
            }
            $oldAccount->save();

            // 2. Update transaction
            $transaction->update($validated);

            // 3. Apply new balance
            $newAccount = Account::findOrFail($validated['account_id']);
            if ($validated['type'] === 'income') {
                $newAccount->balance += $validated['amount'];
            } else {
                $newAccount->balance -= $validated['amount'];
            }
            $newAccount->save();
        });

        return redirect()->route('transactions.index');
    }

    /**
     * Remove the transaction and restore balance.
     */
    public function destroy(Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        DB::transaction(function () use ($transaction) {
            $account = Account::findOrFail($transaction->account_id);

            if ($transaction->type === 'income') {
                $account->balance -= $transaction->amount;
            } else {
                $account->balance += $transaction->amount;
            }

            $account->save();
            $transaction->delete();
        });

        return redirect()->route('transactions.index');
    }
}
