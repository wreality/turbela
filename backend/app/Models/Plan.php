<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Laravel\Cashier\Cashier;
use Stripe\Product;

class Plan extends BaseModel
{
    use HasFactory;
    use SoftDeletes;

    protected $rules = [];

    protected $fillable = [
        'name', 'public', 'stripe_id',
    ];

    protected $casts = [
        'stripe_data' => 'json',
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
        ]);

        return $validator;
    }

    protected static function booted()
    {
        static::saving(
            function (Plan $plan) {
                if (array_key_exists('stripe_id', $plan->getDirty()) && !empty($plan->stripe_id)) {
                    //Check that the new product id is valid
                    $availablePlans = self::listAvailableStripeProducts();
                    $planIsAvailable = $availablePlans->contains(function ($value, $_) use ($plan) {
                        return $plan->stripe_id == $value->id;
                    });
                    if (!$planIsAvailable) {
                        return false;
                    }
                    $plan->updateStripePlanData();
                }
            }
        );
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

    public function updateStripePlanData()
    {
        if (empty($this->stripe_id)) {
            throw new \Error('Empty stripe product ID');
        }
        $this->setAttribute('stripe_data', self::getStripePlanData($this->stripe_id));
    }

    public static function getStripePlanData($stripeId): Product
    {
        $plan_data = Cashier::stripe()->products->retrieve($stripeId);
        $plan_prices = Cashier::stripe()
            ->prices
            ->all(['product' => $stripeId, 'active' => true, 'type' => 'recurring']);
        $plan_data['prices'] = $plan_prices->data;

        return $plan_data;
    }

    public static function listAvailableStripeProducts(): Collection
    {
        //Get all stripe recurring prices
        //Extract the product ids
        //Get All stripe ids in use in active plans
        //Filter stripe products list
        //Fetch product names / ids for each product remaining.
        $prices = Cashier::stripe()->prices->all(['type' => 'recurring', 'active' => true, 'limit' => 99]);
        $pricesCollection = collect($prices->data);

        $ids = $pricesCollection->pluck('product')->unique();

        $inUseIds = Plan::whereNotNull('stripe_id')->get()->pluck('stripe_id')->toArray();

        $ids = $ids->filter(function ($value, $_) use ($inUseIds) {
            return !in_array($value, $inUseIds);
        });

        $products = Cashier::stripe()->products->all(['ids' => array_values($ids->toArray())]);
        $productsCollection = collect($products->data);

        return $productsCollection;
    }
}
