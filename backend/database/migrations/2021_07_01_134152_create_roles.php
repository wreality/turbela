<?php

use Illuminate\Database\Migrations\Migration;
use Silber\Bouncer\BouncerFacade as Bouncer;

class CreateRoles extends Migration
{

    public $abilityRoles = [
        //User object permissions
        'view:App\Models\User' =>           ['admin', 'manager', 'staff'],
        'impersonate:App\Models\User' =>    ['admin'                    ],
        'assign-roles:App\Models\User' =>   ['admin'                    ],
        'assign-badge:App\Models\User' =>   ['admin', 'manager', 'staff'],
        'create:App\Models\User' =>         ['admin', 'manager', 'staff'],
        'search:App\Models\User' =>         ['admin', 'manager', 'staff'],
        'update:App\Models\User' =>         ['admin', 'manager', 'staff'],
        'create:App\Models\Badge' =>        ['admin', 'manager'         ],
        'edit:App\Models\Badge' =>          ['admin', 'manager', 'staff'],
        'search:App\Models\Badge' =>        ['admin', 'manager', 'staff'],
        'create:App\Models\Plan' =>         ['admin'                    ],
        'update:App\Models\Plan' =>         ['admin'                    ],
        'index:App\Models\Plan' =>          ['admin'                    ],
        'index:App\Models\Feature' =>       ['admin'                    ],
        'create:App\Models\Feature' =>      ['admin'                    ],
        'create:App\Models\Terminal' =>     ['admin'                    ],
        'index:App\Models\Terminal' =>      ['admin'                    ],
        'delete:App\Models\Terminal' =>     ['admin'                    ],
        'create:App\Models\Overlay' =>      ['admin'                    ],
        'index:App\Models\Overlay' =>       ['admin'                    ],
        'delete:App\Models\Overlay' =>      ['admin'                    ],
        'view:App\Models\Overlay' =>        ['admin'                    ],
        'update:App\Models\Overlay' =>      ['admin'                    ],
        'search:App\Models\Locator' =>      ['admin', 'manager', 'staff', 'terminal' ],
        'create:App\Models\Locator' =>      ['admin', 'manager', 'staff'],
        'create:App\Models\Course' =>       ['admin',                   ],
        'update:App\Models\Course' =>       ['admin',                   ],
        'delete:App\Models\Course' =>       ['admin',                   ],
        'index:App\Models\Course' =>        ['admin', 'manager', 'staff'],
        'view:App\Models\Course' =>         ['admin', 'manager', 'staff'],
        'update-admin-settings' =>          ['admin'                    ],
        'update-general-settings'=>         ['admin'                    ],
        'query-admin-settings'=>            ['admin', 'manager', 'staff'],
        'update-payment-settings'=>         ['admin'                    ],
        'view-horizon'=>                    ['admin',                   ],
    ];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (class_exists('\Silber\Bouncer\Bouncer')) {
            Bouncer::allow('super-user')->everything();
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
