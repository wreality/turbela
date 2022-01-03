<?php

use Illuminate\Database\Migrations\Migration;
use Silber\Bouncer\BouncerFacade as Bouncer;

class CreateRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (class_exists('\Silber\Bouncer\Bouncer')) {

            Bouncer::allow('super-user')->everything();

            $roles = [
                'admin' => [0, 1, 2, 3, 4, 5, 6, 7, 9, 10 ],
                'manager' => [3, 0, 4, 8]
            ];

            $abilities = [
                0 => ['view', 'App\Models\User'],
                1 => ['impersonate','App\Models\User'],
                2 => ['assign-roles','App\Models\User'],
                3 => ['create', 'App\Models\User'],
                4 => ['search', 'App\Models\User'],
                5 => 'update-general-settings',
                6 => ['create', 'App\Models\Badge'],
                7 => ['edit', 'App\Models\Badge'],
                8 => ['assign', 'App\Models\Badge'],
                9 => ['create', 'App\Models\Plan'],
                10 => ['update', 'App\Models\Plan'],
                11 => ['index', 'App\Models\Plan']

            ];

            foreach ($roles as $role => $perms) {
                foreach ($perms as $index) {
                    if (is_array($abilities[$index])) {
                        Bouncer::allow($role)->to($abilities[$index][0], $abilities[$index][1]);
                    } else {
                        Bouncer::allow($role)->to($abilities[$index]);
                    }
                }
            }

        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Nothing to do.  When tables get blown away, everything will evaporate.
    }
}
