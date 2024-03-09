<?php
declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use App\Models\Volunteer;
use App\Models\VolunteerHour;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\TestCase;

class VolunteerApiTest extends TestCase
{
    use MakesGraphQLRequests;
    use RefreshDatabase;

    protected function executeReviewHours(array $input)
    {
        return $this->graphQL(
            /** lang GraphQL */
            '
            mutation ReviewHours($input: [VolunteerReviewTimeInput!]) {
                volunteer {
                    reviewHours(input: $input) {
                        id
                        approved
                    }
                }
            }',
            [
                'input' => $input,
            ]
        );
    }

    public function testApproveVolunteerHours()
    {
        $admin = $this->actAs('admin');

        $user = User::factory()->has(Volunteer::factory())->create();

        $hours = VolunteerHour::factory()
            ->for($user->volunteer)
            ->count(3)
            ->create([
                'supervisor_id' => $admin->id,
            ]);

        $response = $this->executeReviewHours(
            $hours->map(function ($hour) {
                return [
                    'id' => $hour->id,
                    'approved' => true,
                ];
            })->toArray(),
        );

        $response->assertJsonCount(3, 'data.volunteer.reviewHours');
        $hours = $response->json('data.volunteer.reviewHours');
        foreach ($hours as $hour) {
            $this->assertEquals($hour['approved'], true);
        }
    }

    public function testCannotApproveOwnHours()
    {
        $user = $this->actAs('manager');

        Volunteer::factory()->for($user)->create();

        $this->be($user);

        $hour = VolunteerHour::factory()
            ->for($user->volunteer)
            ->create([
                'supervisor_id' => $user->id,
            ]);

        $response = $this->executeReviewHours(
            [
                [
                    'id' => $hour->id,
                    'approved' => true,
                ],
            ],
        );

        $response->assertGraphQLErrorMessage('NOT_AUTHORIZED');
    }

    public function testCannotApproveIfNotASupervisor()
    {
        $user = User::factory()->has(Volunteer::factory())->create();

        $this->be($user);

        $supervisor = User::factory()->has(Volunteer::factory())->create();

        $workerUser = User::factory()->has(Volunteer::factory())->create();

        $hour = VolunteerHour::factory()
            ->for($workerUser->volunteer)
            ->create([
                'supervisor_id' => $supervisor->id,
            ]);

        $response = $this->executeReviewHours([
            [
                'id' => $hour->id,
                'approved' => true,
            ],
        ]);

        $response->assertGraphQLErrorMessage('NOT_AUTHORIZED');
    }

    public function testCanApproveIfSupervisor()
    {
        $user = User::factory()->has(Volunteer::factory())->create();
        $this->be($user);

        $workerUser = User::factory()->has(Volunteer::factory())->create();

        $hour = VolunteerHour::factory()
            ->for($workerUser->volunteer)
            ->create([
                'supervisor_id' => $user->id,
            ]);

        $response = $this->executeReviewHours(
            [
                [
                    'id' => $hour->id,
                    'approved' => true,
                ],
            ]
        );

        $response->assertJsonCount(1, 'data.volunteer.reviewHours');
        $response->assertJsonPath('data.volunteer.reviewHours.0.approved', true);
    }

    public function testCanApproveIfManager()
    {
        $user = $this->actAs('manager');
        Volunteer::factory()->for($user)->create();

        $supervisor = User::factory()->has(Volunteer::factory())->create();
        $workerUser = User::factory()->has(Volunteer::factory())->create();

        $hour = VolunteerHour::factory()
            ->for($workerUser->volunteer)
            ->create([
                'supervisor_id' => $supervisor->id,
            ]);

        $response = $this->executeReviewHours(
            [
                [
                    'id' => $hour->id,
                    'approved' => true,
                ],
            ]
        );

        $response->assertJsonCount(1, 'data.volunteer.reviewHours');
        $response->assertJsonPath('data.volunteer.reviewHours.0.approved', true);
    }

    protected function executePunch(array $input)
    {
        return $this->graphQL(
            /** lang GraphQL */
            '
            mutation Punch($input: VolunteerPunchInput!) {
                volunteer {
                    punch(input: $input) {
                        id
                        start
                        end
                        supervisor {
                            id
                        }
                    }
                }
            }
            ',
            [
                'input' => $input,
            ]
        );
    }

    public function testCannotPunchInTwice()
    {
        $user = User::factory()->has(Volunteer::factory())->create();
        $this->be($user);

        VolunteerHour::factory()
            ->for($user->volunteer)
            ->open()
            ->create();

        $response = $this->executePunch(
            [
                'id' => $user->id,
                'direction' => 'IN',
            ]
        );

        $response->assertGraphQLErrorMessage('DUPLICATE');
    }

    public function testSupervisorRequiredAtPunchOut()
    {
        $user = User::factory()->has(Volunteer::factory())->create();
        $this->be($user);

        VolunteerHour::factory()
            ->for($user->volunteer)
            ->open()
            ->create();

        $response = $this->executePunch(
            [
                'id' => $user->id,
                'direction' => 'OUT',
            ]
        );

        $response->assertGraphQLValidationError('supervisor_id', 'REQUIRED');
    }

    public function testSupervisorNotRequiredAtPunchIn()
    {
        $user = User::factory()->has(Volunteer::factory())->create();
        $this->be($user);

        $response = $this->executePunch(
            [
                'id' => $user->id,
                'direction' => 'IN',
            ]
        );

        $response->assertGraphQLValidationPasses();

        $this->assertNotEmpty($response->json('data.volunteer.punch.id'));
        $this->assertNotEmpty($response->json('data.volunteer.punch.start'));
    }

    public function testMustBeActiveVolunteerToPunchIn()
    {
        $user = User::factory()->create();
        $this->be($user);

        $response = $this->executePunch(
            [
                'id' => $user->id,
                'direction' => 'IN',
            ]
        );

        $response->assertGraphQLErrorMessage('NOT_ACTIVE');
    }

    public function executeEditHour(array $input)
    {
        return $this->graphQL(
            /** lang GraphQL */
            '
        mutation EditHour($input: VolunteerEditTimeInput!) {
            volunteer {
                editHour(input: $input) {
                    id
                    start
                    end
                }
            }
        }
        ',
            [ 'input' => $input]
        );
    }

    public function testCanEditOwnHoursBeforeApproval()
    {
        $user = User::factory()
            ->has(Volunteer::factory())
            ->create();

        $this->be($user);

        $hour = VolunteerHour::factory()
            ->for($user->volunteer)
            ->pending()
            ->create();

        $response = $this->executeEditHour(
            [
                'id' => $hour->id,
                'start' => '2021-01-01 12:00:00',
                'end' => '2021-01-01 13:00:00',
            ]
        );

        $response->assertJsonPath('data.volunteer.editHour.start', '2021-01-01T12:00:00.000000Z');
        $response->assertJsonPath('data.volunteer.editHour.end', '2021-01-01T13:00:00.000000Z');
    }

    public function testCannotEditOwnHoursAfterApproval()
    {
        $user = User::factory()
            ->has(Volunteer::factory())
            ->create();

        $this->be($user);

        $hour = VolunteerHour::factory()
            ->for($user->volunteer)
            ->approved()
            ->create();

        $response = $this->executeEditHour(
            [
                'id' => $hour->id,
                'start' => '2021-01-01 12:00:00',
                'end' => '2021-01-01 13:00:00',
            ],
        );

        $response->assertGraphQLErrorMessage('LOCKED');
    }

    public function testManagerCanCreateHours()
    {
        $this->markTestIncomplete('This test has not been implemented yet.');
    }

    public function testManagerCannotCreateOwnHours()
    {
        $this->markTestIncomplete('This test has not been implemented yet.');
    }

    public function testUserWithDirectEntryPermissionCanCreateOwnHours()
    {
        $this->markTestIncomplete('This test has not been implemented yet.');
    }
}
