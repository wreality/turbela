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

            $abilities = [
                //User object permissions
                [['App\Models\User',     'view'],            ['admin',  'manager', 'staff']],
                [['App\Models\User',     'impersonate'],     ['admin'                     ]],
                [['App\Models\User',     'assign-roles'],    ['admin'                     ]],
                [['App\Models\User',     'create'],          ['admin',  'manager', 'staff']],
                [['App\Models\User',     'search'],          ['admin',  'manager', 'staff']],
                [['App\Models\User',     'update'],          ['admin',  'manager', 'staff']],
                [['App\Models\Badge',    'create'],          ['admin',  'manager'         ]],
                [['App\Models\Badge',    'edit'],            ['admin',  'manager', 'staff']],
                [['App\Models\Badge',    'assign'],          ['admin',  'manager', 'staff']],
                [['App\Models\Plan',     'create'],          ['admin'                     ]],
                [['App\Models\Plan',     'update'],          ['admin'                     ]],
                [['App\Models\Plan',     'index'],           ['admin'                     ]],
                [['App\Models\Feature',  'index'],           ['admin'                     ]],
                [['App\Models\Feature',  'create'],          ['admin'                     ]],
                [['App\Models\Terminal', 'create'],          ['admin'                     ]],
                [['App\Models\Terminal', 'index'],           ['admin'                     ]],
                [['App\Models\Terminal', 'delete'],          ['admin'                     ]],
                [['App\Models\Overlay',  'create'],          ['admin'                     ]],
                [['App\Models\Overlay',  'index'],           ['admin'                     ]],
                [['App\Models\Overlay',  'delete'],          ['admin'                     ]],
                [['App\Models\Overlay',  'view'],            ['admin'                     ]],
                [['App\Models\Overlay',  'update'],          ['admin'                     ]],
                ['update-admin-settings',                    ['admin'                     ]],
                ['update-general-settings',                  ['admin'                     ]],
                ['query-admin-settings',                     ['admin',  'manager', 'staff']],
                ['update-payment-settings',                  ['admin'                     ]],

            ];

            foreach ($abilities as list($perms,$roles)) {
                foreach ($roles as $role) {
                    if (is_array($perms)) {
                       Bouncer::allow($role)->to($perms[1], $perms[0]);
                    } else {
                        Bouncer::allow($role)->to($perms);
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
