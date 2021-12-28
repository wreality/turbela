<?php

use Illuminate\Database\Eloquent\Model;
use Nuwave\Lighthouse\Exceptions\ValidationException;
use Watson\Validating\ValidatingTrait;

class BaseModel extends Model {

    use ValidatingTrait;

    protected $throwValidationExceptions = true;


    public function throwValidationException()
    {
        $validator = $this->makeValidator($this->getRules());

        throw new ValidationException('Validation failure', $validator);


    }
}