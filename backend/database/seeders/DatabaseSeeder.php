<?php
declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Silber\Bouncer\BouncerFacade as Bouncer;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'email' => 'regularuser@turbela.dev',
            'name' => 'Regular User',
            'password' => Hash::make('regularPassword!@#'),
        ]);

        $admin = User::factory()->create([
            'email' => 'adminuser@turbela.dev',
            'name' => 'Admin User',
            'password' => Hash::make('adminPassword!@#'),
        ]);

        Bouncer::assign('admin')->to($admin);


        $super = User::factory()->create([
            'email' => 'superuser@turbela.dev',
            'name' => 'Super User',
            'password' => Hash::make('superPassword!@#'),
        ]);

        Bouncer::assign('super-user')->to($super);

        User::factory()->count(50)->create();
    }

}
