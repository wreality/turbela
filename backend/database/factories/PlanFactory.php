<?php
declare(strict_types=1);

namespace Database\Factories;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanFactory extends Factory
{
    protected $model = Plan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => ucwords($this->faker->sentence(3)),
            'duration' => 'P1M',
            'price' => [['currency' => 'USD', 'amount' => rand(100, 40000)]],
            'public' => false,
        ];
    }

    /**
     * Public scope
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function public(): Factory
    {
        return $this->state(function (array $_attributes) {
            return [
                'public' => true,
            ];
        });
    }
}
