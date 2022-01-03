<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PriceJson implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (empty($value)) {
            return true;
        }
        if (!is_array($value)) {
            return false;
        }

        foreach($value as $price) {
            if (!$this->checkRegex($price['currency'], '/^[A-Z]{3}$/')) {
                return false;
            }
            if (!$this->checkRegex((string)($price['amount']), '/^[0-9]+$/')) {
                return false;
            }
        }
        return true;
    }

    protected function checkRegex($value, $regex): bool {
        if (empty($value) || preg_match($regex, $value) !== 1) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid price object.';
    }
}
