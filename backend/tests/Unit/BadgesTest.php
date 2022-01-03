<?php
declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Badge;
use Nuwave\Lighthouse\Exceptions\ValidationException;
use Tests\TestCase;

class BadgesTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     * @dataProvider  nameRequiredData
     */
    public function testNameRequired($name, $success)
    {
        if (!$success) {
            $this->expectException(ValidationException::class);
        }

        $badge = Badge::create(['name' => $name]);

        if ($success) {
            $this->assertNotNull($badge->id);
        } else {
            $this->assertNull($badge);
        }
    }

    public function nameRequiredData()
    {
        return [
            //[$name, $success]
            ['', false],
            [null, false],
            ['test', true],
        ];
    }
}
