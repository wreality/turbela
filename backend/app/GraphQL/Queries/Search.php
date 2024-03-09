<?php
declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Badge;
use App\Models\User;
use ProtoneMedia\LaravelCrossEloquentSearch\Search as SearchModel;

final class Search
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return array
     */
    public function __invoke($_, array $args)
    {
        $search = $args['q'];
        $first = $args['first'] ?? 25;
        $page = $args['page'] ?? 1;
        $searchResult = SearchModel::new()
          ->add(User::class, ['name', 'email'])
          ->add(Badge::class, 'name')
          ->paginate((int)$first, 'page', (int)$page)
          ->beginWithWildcard()
          ->includeModelType('__typename')
          ->search($search);

          return $searchResult;
    }
}
