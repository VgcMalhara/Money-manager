<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    /**
     * Database eke save karanna allow karana fields tika.
     */
    protected $fillable = [
        'user_id',
        'name',
        'type',  // income hari expense hari
        'icon',  // lucide icon name eka
        'color', // hex color code eka
    ];

    /**
     * Category ekak ayithi wenne user kenekta.
     * (Relationship with User model)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
