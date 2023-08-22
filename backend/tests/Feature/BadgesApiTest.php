<?php
declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Badge;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\TestCase;

class BadgesApiTest extends TestCase
{
    use MakesGraphQLRequests;

    use RefreshDatabase;

    public function testCreateBadge()
    {
        $this->actAs('super-user');

        $response = $this->graphQL(
            /** lang GraphQL */
            '
            mutation CreateBadge($name: String!) {
                createBadge(input: {name: $name}) {
                    id
                    name
                }
            }',
            ['name' => 'Test Badge']
        );

        $this->assertNotEmpty($response->json('data.createBadge.id'));
    }

    public function testAssignBadge()
    {
        $instructor = $this->actAs('manager');
        $instructor_id = $instructor->id;
        $user = User::firstOrCreate(
            ['email' => 'badgeuser@example.com'],
            ['name' => 'Badge', 'password' => 'null']
        );
        $user_id = $user->id;

        $badge = Badge::factory()->create();
        $badge_id = $badge->id;

        $response = $this->graphQL(
            /** lang GraphQL */
            '
            mutation AssignUserBadge($badge_id: ID!, $user_id: ID!, $instructor_id: ID!) {
                updateUserBadges(
                    input: {
                        id: $user_id
                        grant:[
                            {
                                id: $badge_id,
                                instructor_id: $instructor_id,
                            }
                        ]

                    }
                ) {
                    id
                    badges {
                        id
                        name
                        completion {
                            created_at
                        }
                    }
                }
            }
            ',
            [
            'user_id' => $user_id,
            'badge_id' => $badge_id,
            'instructor_id' => $instructor_id,
            ]
        );
        $badges = $response->json('data.updateUserBadges.badges');

        $this->assertCount(1, $badges);
    }

    public function testRevokeBadge()
    {
        $instructor = $this->actAs('manager');
        $instructor_id = $instructor->id;
        $user = User::firstOrCreate(
            ['email' => 'badgeuse2@example.com'],
            ['name' => 'Badge', 'password' => 'null']
        );
        $user_id = $user->id;

        $badge = Badge::factory()->create();
        $badge_id = $badge->id;

        $user->badges()->attach($badge_id, ['instructor_id' => $instructor_id]);

        $response = $this->graphQL(
            /** lang GraphQL */
            '
            mutation RevokeUserBadge($badge_id: ID!, $user_id: ID!) {
                updateUserBadges(
                    input: {
                        id: $user_id
                        revoke:[
                            {
                                id: $badge_id,
                            }
                        ]

                    }
                ) {
                    id
                    badges {
                        id
                        name
                        completion {
                            created_at
                        }
                    }
                }
            }
            ',
            [
                'user_id' => $user_id,
                'badge_id' => $badge_id,
            ]
        );
        $badges = $response->json('data.updateUserBadges.badges');

        $this->assertCount(0, $badges);
    }
}
