<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;

class Badge extends BaseModel
{
    use HasFactory;
    use Searchable;

    public $fillable = [
        'name',
    ];

    protected $rules = [
        'name' => 'required',
    ];

    /**
     * Serialize for searching
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
          'id' => $this->id,
          'name' => $this->name,
        ];
    }

    /**
     * Define inverse relationship to users.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
        ->as('completion')
        ->withTimestamps()
        ->withPivot('notes', 'instructor_id');
    }

    /**
     * Badge users paginator
     *
     * @param [type] $badge
     * @param [type] $args
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginateBadgeUsers(Badge $badge, $args)
    {
        $search = $args['q'] ?? '';
        $search = "%{$search}%";
        $query = $badge
            ->users()
            ->where(function (Builder $query) use ($search) {
                $query
                    ->where('name', 'like', $search)
                    ->orWhere('email', 'like', $search);
            })
            ->paginate(
                $args['perPage'] ?? 10,
                ['*'],
                'page',
                $args['page']
            );

            return $query;
    }
}
