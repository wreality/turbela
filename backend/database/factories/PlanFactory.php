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
            'name' => $this->faker->title(),
            'duration' => 'P1M',
            'price' => [['currency' => 'USD', 'amount' => 20]],
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
