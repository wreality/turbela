<?php
declare(strict_types=1);

namespace App\GraphQL\Scalars;

use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Type\Definition\ScalarType;

/**
 * Read more about scalars here https://webonyx.github.io/graphql-php/type-definitions/scalars
 */
final class AbilityName extends ScalarType
{
    /**
     * Serializes an internal value to include in a response.
     *
     * @param mixed $value
     * @return mixed
     */
    public function serialize(mixed $value): mixed
    {
        return $value;
    }

    /**
     * Parses an externally provided value (query variable) to use as an input
     *
     * @param mixed $value
     * @return mixed
     */
    public function parseValue(mixed $value): mixed
    {
        return $value;
    }

    /**
     * Parses an externally provided literal value (hardcoded in GraphQL query) to use as an input.
     *
     * Should throw an exception with a client friendly message on invalid value nodes, @see \GraphQL\Error\ClientAware.
     *
     * @param  \GraphQL\Language\AST\ValueNode&\GraphQL\Language\AST\Node  $valueNode
     * @param  array|null  $_
     * @return mixed
     */
    public function parseLiteral(Node $valueNode, ?array $_ = null): mixed
    {
        if (!$valueNode instanceof StringValueNode) {
            throw new \GraphQL\Error\ClientAware(
                'Query error: Can only parse strings got: ' . $valueNode->kind,
                [$valueNode]
            );
        }

        return $valueNode->value;
    }
}
