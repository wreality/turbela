<?php

namespace App\GraphQL\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Illuminate\Contracts\Auth\Access\Gate;
use Nuwave\Lighthouse\Exceptions\AuthorizationException;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class GateDirective extends BaseDirective implements FieldMiddleware
{
    public function __construct(Gate $gate){
        $this->gate = $gate;
    }

    /**
     * Wrap around the final field resolver.
     *
     * @param  \Nuwave\Lighthouse\Schema\Values\FieldValue  $fieldValue
     * @param  \Closure  $next
     * @return \Nuwave\Lighthouse\Schema\Values\FieldValue
     */
    public function handleField(FieldValue $fieldValue, Closure $next): FieldValue
    {
        $previousResolver = $fieldValue->getResolver();

        $ability = $this->directiveArgValue('ability');

        $fieldValue->setResolver(
            function ($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) use ($ability, $previousResolver) {
                $gate = $this->gate->forUser($context->user());

                $response = $gate->inspect($ability);

                if ($response->denied()) {
                    throw new AuthorizationException($response->message(), $response->code());
                }

                return $previousResolver($root, $args, $context, $resolveInfo);
            }
        );

        return $next($fieldValue);
    }

    public static function definition(): string
    {
        return /** @lang GraphQL */ <<<'GRAPHQL'
"""
Check a Laravel Gate to ensure the current user is authorized to access a field.
"""
directive @ability(
  """
  The ability to check permissions for.
  """
  ability: String!

) repeatable on FIELD_DEFINITION
"""
Any constant literal value: https://graphql.github.io/graphql-spec/draft/#sec-Input-Values
"""
scalar CanArgs
GRAPHQL;
    }
}
