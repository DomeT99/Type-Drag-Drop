namespace App {
    /* An interface that is used to validate the input. */
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }
    /**
     * If the input is required, it must have a value. If the input has a minLength, it must be at least
     * that long. If the input has a maxLength, it must be at most that long. If the input has a min, it
     * must be at least that value. If the input has a max, it must be at most that value.
     * @param {Validatable} validatableInput - Validatable
     * @returns The function validate is being returned.
     */
    export function validate(validatableInput: Validatable) {
        let isValid = true;

        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }

        if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }

        if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }

        if (validatableInput.min != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }

        if (validatableInput.max != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }

        return isValid;
    }
}