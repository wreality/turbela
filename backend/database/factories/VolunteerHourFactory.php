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
        $start = $this->faker->dateTimeBetween('-1 month', 'now');
        $end = (clone $start)->add(new \DateInterval('PT' . rand(60, 400) . 'M'));

        return [
            'start' => $start,
            'end' => $end,
            'approved' => false,
        ];
    }

    /**
     * Make an open
     *
     * @return mixed
     */
    public function open()
    {
        return $this->state([
            'end' => null,
        ]);
    }

    /**
     * Pending state function
     *
     * @return mixed
     */
    public function pending()
    {
        return $this->state([
            'approved' => null,
        ]);
    }

    /**
     * Approved state function
     *
     * @return mixed
     */
    public function approved()
    {
        return $this->state([
            'approved' => true,
        ]);
    }

    /**
     * Rejected state function
     *
     * @return mixed
     */
    public function rejected()
    {
        return $this->state([
            'approved' => false,
        ]);
    }
}
