<?php
declare(strict_types=1);

namespace Tests;

use Nuwave\Lighthouse\Exceptions\ValidationException;

trait ValidationTests
{
    public function expectValidationException($enabled = true)
    {
        if ($enabled) {
            $this->expectException(ValidationException::class);
        }
    }
}
