<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;
use BaseModel;

class Badge extends BaseModel
{
    use HasFactory, Searchable;

    public $fillable = [
        'name'
    ];

    protected $rules = [
		'name'   => 'required',
	];

    public function toSearchableArray()
    {
        $array = $this->toArray();

        return $array;
    }
}
