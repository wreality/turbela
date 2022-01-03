<?php
declare(strict_types=1);

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Silber\Bouncer\BouncerFacade as Bouncer;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function actAs($role)
    {
        $user = \App\Models\User::firstOrCreate(
            ['email' => $role . '@example.com', ],
            ['name' => 'Bob', 'password' => 'null']
        );

        Bouncer::assign($role)->to($user);
        $this->be($user);
    }

    public function dumpJsonResponse($response, $trace = false)
    {
        $json = $response->json();
        if (!$trace) {
            unset($json['errors'][0]['trace']);
        }
        var_dump($json);
    }
}
