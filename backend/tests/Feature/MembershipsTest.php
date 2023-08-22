<?php
declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Plan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\TestCase;

class MembershipsTest extends TestCase
{
    use MakesGraphQLRequests;
    use RefreshDatabase;

    // public function testCreatePlan()
    // {
    //     $this->actAs('super-user');

    //     $response = $this->graphQL(
    //         /** @lang GraphQL */
    //         '
    //         #graphql
    //         mutation CreatePlan(
    //             $name: String!
    //             $duration: String!
    //             $price: [PriceInput!]!)
    //             {
    //             createPlan(input: {
    //                 name: $name
    //                 duration: $duration
    //                 price: $price
    //             }) {
    //                 id
    //                 name
    //                 price {
    //                     currency
    //                     amount
    //                 }
    //                 public
    //                 duration
    //                 features {
    //                     id
    //                     name
    //                     type
    //                     parameters {
    //                         amount
    //                     }
    //                 }
    //             }
    //         }

    //     ',
    //         ['name' => 'Test Plan', 'duration' => 'P1M', 'price' => [['currency' => 'USD', 'amount' => 10]]]
    //     );

    //     $id = $response->json('data.createPlan.id');
    //     $this->assertNotEmpty($id);
    // }

    public function testCreateFeature()
    {
        $this->actAs('super-user');

        $response = $this->graphQL(
            /** @lang graphQL */
            '
            mutation CreateFeature($name: String!, $type: FeatureType) {
                createFeature(input: {name: $name, type: $type}) {
                    id
                    type
                    name
                }
            }',
            ['name' => 'Test Feature', 'type' => 'GRANT']
        );

        $id = $response->json('data.createFeature.id');
        $this->assertNotEmpty($id);
    }

    // public function testFeatureAssignment()
    // {
    //     $this->actAs('super-user');

    //     $response = $this->graphQL(
    //         /** @lang graphQL */
    //         '
    //         mutation {
    //             createPlan(input: {
    //                 name: "Feature Test Plan",
    //                 duration: "P1M",
    //                 price: {currency: "USD", amount: 10}
    //             }) {
    //                 id
    //             }
    //         }'
    //     );

    //     $plan_id = $response->json('data.createPlan.id');
    //     $this->assertNotEmpty($plan_id);

    //     $response = $this->graphQL(
    //         /** @lang graphQL */
    //         'mutation {
    //             createFeature(input: {
    //                 name: "Test Feature Assignment"
    //                 type: GRANT
    //             }) {
    //                 id
    //             }
    //         }'
    //     );

    //     $feature_id = $response->json('data.createFeature.id');
    //     $this->assertNotEmpty($feature_id);

    //     $response = $this->graphQL(
    //         /** @lang graphQL */
    //         'mutation UpdatePlan ($id: ID!, $features: [SyncFeatures!]) {
    //             updatePlan(input: {
    //                 id: $id,
    //                 features: {
    //                     sync: $features
    //                 }
    //             }) {
    //                 features {
    //                     id
    //                     name
    //                     parameters {
    //                         amount
    //                     }
    //                 }
    //             }
    //         }',
    //         ['id' => $plan_id, 'features' => [['id' => $feature_id, 'amount' => 99]]]
    //     );

    //         $features = $response->json('data.updatePlan.features');
    //         $this->assertCount(1, $features);

    //         $feature = reset($features);

    //         $this->assertEquals($feature_id, $feature['id']);
    //         $this->assertEquals(99, $feature['parameters']['amount']);
    // }

    /**
     * @dataProvider dataPlanQuery
     */
    public function testPlanQuery($query, $count)
    {
        $this->actAs('super-user');
        Plan::factory()->count(5)->create();
        Plan::factory()->count(7)->public()->create();

        $response = $this->graphQL(
            /** @lang graphQL */
            "query {
                ${query}(first: 20) {
                    paginatorInfo {
                        count
                        total
                    }
                }
            }"
        );
        $this->assertEquals($count, $response->json("data.${query}.paginatorInfo.total"));
    }

    public function dataPlanQuery()
    {
        return [
            'getPlans admin query' => ['plans', 12],
            'getPublicPlans query' => ['getPublicPlans', 7],
        ];
    }
}
