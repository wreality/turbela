<?php
declare(strict_types=1);

namespace App\Models;

use App\Rules\ISODuration;
use App\Rules\PriceJson;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends BaseModel
{
    use HasFactory;
    use SoftDeletes;

    protected $rules = [];

    protected $fillable = [
        'name', 'public', 'prorate_duration', 'prorate_price', 'price', 'signup_fee', 'duration',
    ];

    protected $casts = [
        'price' => 'json',
        'prorate_price' => 'json',
        'signup_fee' => 'json',
    ];

    /**
     * Features associated with the plan.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class)
            ->withPivot('amount')
            ->as('parameters');
    }

    /**
     * Set rules manually
     *
     * @param \Illuminate\Validation\Validator $validator
     * @return \Illuminate\Validation\Validator
     */
    public function withValidator($validator)
    {
        $validator->setRules([
            'name' => 'required|max:255',
            'public' => 'boolean',
            'duration' => ['required', new ISODuration()],
            'prorate_price' => [new PriceJson()],
            'price' => [new PriceJson()],
            'signup_fee' => [new PriceJson()],
        ]);

        return $validator;
    }

    /**
     * Scope for public plans.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublic($query)
    {
        return $query->where('public', 1);
    }
}
