<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Course extends BaseModel
{
    use HasFactory;
    use Searchable;

    protected $rules = [
      'name => required|string|max:255',
    ];

    /**
     * Convert the model instance to an array that can be serialized.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
          'name' => $this->name,
          'id' => $this->id,
        ];
    }

    /**
     * Setup relationship with CourseSession
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(CourseSession::class);
    }
}
