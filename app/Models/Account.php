<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Account extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'type',
        'balance',
    ];

    /**
     * Get the user that owns the account.
     * Me account eka ayithi user wa ganna.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
