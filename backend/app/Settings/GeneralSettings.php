<?php
declare(strict_types=1);

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;

    public static function group(): string
    {
        return 'general';
    }

    /**
     * GraphQL Resolver for the settings class.
     */
    public function mutate($_, array $args, $__, $___): array
    {
        foreach ($args as $name => $value) {
            $this->{$name} = $value;
        }
        $this->save();

        return $this->query(null, [], null, null);
    }

    public function query($_, array $args, $__, $___): array
    {
        $query = $this->toArray();

        return $query;
    }
}
