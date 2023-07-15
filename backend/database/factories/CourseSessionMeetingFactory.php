<?php
declare(strict_types=1);

namespace Database\Factories;

use DateTimeImmutable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseSessionMeeting>
 */
class CourseSessionMeetingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $starts = $this->faker->dateTimeBetween('-1 week', '+1 week');

        $ends = DateTimeImmutable::createFromMutable($starts)->add(new \DateInterval('PT' . $this->faker->numberBetween(1, 4) . 'H'));

        return [
            'start_at' => $starts,
            'end_at' => $ends,
        ];
    }
}
