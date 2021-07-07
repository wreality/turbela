<?php
namespace App\Settings;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings {

    public string $site_name;

    public static function group(): string {
        return 'general';
    }

    /**
     * GraphQL Resolver for the settings class.
     */
    public function mutate($_, array $args, $__, $___): array {
        foreach ($args as $name => $value) {
            $this->{$name} = $value;
        }
        $this->save();

        return $this->toArray();

    }

}