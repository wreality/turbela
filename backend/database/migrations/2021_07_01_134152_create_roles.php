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
                'admin' => [0, 1, 2, 3, 4 ],
                'manager' => [3, 0, 4]
            ];

            $abilities = [
                ['view', 'App\Models\User'],
                ['impersonate','App\Models\User'],
                ['assign-roles','App\Models\User'],
                ['create', 'App\Models\User'],
                ['search', 'App\Models\User']
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
