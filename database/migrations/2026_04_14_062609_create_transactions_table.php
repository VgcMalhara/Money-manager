<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            // User id (Kage transaction ekakda kiyala)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Category id (Groceries, Salary, etc.)
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();

            // Account id (Cash, Bank, Wallet etc.)
            $table->foreignId('account_id')->constrained()->cascadeOnDelete();

            // Amount - Precision eka 15, 2 damma (Loku ganan walata)
            $table->decimal('amount', 15, 2);

            // Description (Optional note ekak)
            $table->string('description')->nullable();

            // Transaction date (Timestamp nemei, user thorana date eka)
            $table->date('date');

            // Type (Income hari Expense hari kiyala wend karanna)
            $table->enum('type', ['income', 'expense']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
