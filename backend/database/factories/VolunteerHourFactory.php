<?php
declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VolunteerHour>
 */
class VolunteerHourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $start = $this->faker->dateTimeBetween('-1 year', 'now');
        $end = (clone $start)->add(new \DateInterval('PT' . rand(60, 400) . 'M'));

        return [
            'start' => $start,
            'end' => $end,
        ];
    }
}
