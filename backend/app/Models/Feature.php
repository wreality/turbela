<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Feature extends BaseModel
{
    use HasFactory;

    public const TYPE_GRANT = 1;
    public const TYPE_LIMIT = 2;
    public const TYPE_TRACK = 3;

    protected $rules = [
        'name' => 'required|max:50',
        'type' => 'integer|regex:/^[1-3]$/',
    ];

    /**
     * Plans associated with this feature.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function plans(): BelongsToMany
    {
        return $this->belongsToMany(Plan::class)
            ->withPivot('amount')
            ->as('parameters');
    }
}
