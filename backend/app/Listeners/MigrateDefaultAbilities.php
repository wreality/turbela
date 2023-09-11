<?php
declare(strict_types=1);

namespace App\Listeners;

use Illuminate\Database\Events\MigrationEnded;
use Silber\Bouncer\BouncerFacade as Bouncer;

class MigrateDefaultAbilities
{
    /**
     * Handle the event.
     *
     * @param \Illuminate\Database\Events\MigrationEndedd $event
     * @return void
     */
    public function handle(MigrationEnded $event)
    {
        if (!empty($event->migration->abilityRoles)) {
            foreach ($event->migration->abilityRoles as $ability => $roles) {
                $this->migrateAbility($ability, $roles, $event->method);
            }
        }
    }

    /**
     * Migrate an ability to a role.
     *
     * @param string $ability
     * @param array $roles
     * @param string $method
     * @return void
     */
    protected function migrateAbility($ability, $roles, $method)
    {
        $dir = $method === 'up' ? 'allow' : 'disallow';
        if (stripos($ability, ':') !== false) {
            $ability = explode(':', $ability);
        } else {
            $ability = [$ability];
        }
        foreach ($roles as $role) {
            Bouncer::{$dir}($role)->to(...$ability);
        }
    }
}
