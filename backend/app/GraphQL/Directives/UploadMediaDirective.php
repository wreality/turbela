<?php
declare(strict_types=1);

namespace App\GraphQL\Directives;

use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Support\Contracts\ArgDirective;
use Nuwave\Lighthouse\Support\Contracts\ArgResolver;

final class UploadMediaDirective extends BaseDirective implements ArgDirective, ArgResolver
{
    /**
     * Schema definition
     *
     * @return string
     */
    public static function definition(): string
    {
        //phpcs:disable
        return                                    /** @lang GraphQL */ <<<'GRAPHQL'
directive @uploadMedia(
    """
    The collection that the uploaded media should be added to.
    """
    collection: String!
) on ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION
GRAPHQL;
        //phpcs:enable
    }

    /**
     * Invoke the directive.
     *
     * @param mixed $root
     * @param mixed $upload
     * @return void
     */
    public function __invoke($root, $upload)
    {
        // TODO implement the arg resolver
        $class = $this->directiveArgValue('collection');
        if ($class === null) {
            throw new \Error('Missing argument class on upload media directive');
        }
        /** @var \App\Models\User $root */
        $root
            ->addMedia($upload)
            ->usingName('avatar.png')
            ->toMediaCollection($class);
    }
}
