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
                'view-user-details',
                'impersonate-user',
                'assign-user-roles',
                'create-users',
                'search-users',
            ];

            foreach ($roles as $role => $perms) {
                foreach ($perms as $index) {
                    Bouncer::allow($role)->to($abilities[$index]);
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
