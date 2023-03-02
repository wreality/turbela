<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
}
