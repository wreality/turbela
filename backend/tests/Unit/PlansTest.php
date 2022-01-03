<?php
declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Plan;
use Tests\TestCase;
use Tests\ValidationTests;

class PlansTest extends TestCase
{
    use ValidationTests;

    /**
     * A basic unit test example.
     *
     * @return void
     * @dataProvider  priceValidationData
     */
    public function testPriceValidation($value, $success): void
    {
        $this->priceValidation('price', $value, $success);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     * @dataProvider  priceValidationData
     */
    public function testProratePriceValidation($value, $success): void
    {
        $this->priceValidation('prorate_price', $value, $success);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     * @dataProvider  priceValidationData
     */
    public function testSignupFeeValidation($value, $success): void
    {
        $this->priceValidation('signup_fee', $value, $success);
    }

    public function priceValidation($field, $value, $success): void
    {
        $data = [
            'name' => 'test',
            'duration' => 'P1M',
        ];
        $data[$field] = $value;

        $plan = new Plan($data);

        $this->assertEquals($plan->isValid(), $success);
    }

    public function priceValidationData(): array
    {
        return [
            //[$price, $success]
            ['', true],
            [null, true],
            ['test', false],
            [[['currency' => 'USD', 'amount' => '10']], true],
            [[['currency' => 'USD', 'amount' => 10]], true],
            [[['currency' => 'UD', 'amount' => 10]], false],
            [[['currency' => 'USD', 'amount' => 'money']], false],
            [[['currency' => 'USD', 'amount' => '']], false],
            [[['currency' => '', 'amount' => '10']], false],
            [[['currency' => 'USD', 'amount' => '35'], ['currency' => 'HRS', 'amount' => '10']], true],
            [[['currency' => 'USD', 'amount' => '35'], ['currency' => 'HS', 'amount' => '10']], false],
        ];
    }

    /**
     * Duration validation
     *
     * @param string $value
     * @param bool $success
     * @return void
     * @dataProvider durationValidationData
     */
    public function testDurationValidation($value, $success): void
    {
        $plan = new Plan([
           'name' => 'test',
           'price' => [['currency' => 'USD', 'amount' => '10']],
           'duration' => $value,
        ]);
        $this->assertEquals($plan->isValid(), $success);
    }

    public function durationValidationData(): array
    {
        return [
            ['P1D', true],
            ['P2D1M', false],
            ['P3M3DT3M', true],
            ['2D', false],
            ['', false],
            [null, false],
        ];
    }
}
