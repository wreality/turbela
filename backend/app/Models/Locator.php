<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Watson\Validating\Injectors\UniqueWithInjector;
use Watson\Validating\ValidatingTrait;

class Locator extends Model
{
    use HasFactory;

    use ValidatingTrait;
    use UniqueWithInjector;

    /**
     * Configure the model
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::addGlobalScope('active', function (Builder $builder) {
            $builder->where('active', true);
        });
    }

    protected $rules = [
        'token' => 'required|unique_with:locators,type,token',
        'target_type' => 'required',
        'target_id' => 'required',

    ];

    /**
     * Get the parent model
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function target(): MorphTo
    {
        return $this->morphTo();
    }
}
