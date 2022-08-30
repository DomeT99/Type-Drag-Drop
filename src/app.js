"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * If the input is required, it must have a value. If the input has a minLength, it must be at least
 * that long. If the input has a maxLength, it must be at most that long. If the input has a min, it
 * must be at least that value. If the input has a max, it must be at most that value.
 * @param {Validatable} validatableInput - Validatable
 * @returns The function validate is being returned.
 */
function validate(validatableInput) {
    var isValid = true;
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
/**
 * "If the descriptor is not undefined, then create a new descriptor that returns a bound function of
 * the original method."
 *
 * The first two parameters of the decorator function are not used in this example.
 *
 * The third parameter is the descriptor of the property that the decorator is applied to.
 *
 * The descriptor has a value property that is the original method.
 *
 * The descriptor is then replaced with a new descriptor that returns a bound function of the original
 * method.
 *
 * The new descriptor is returned.
 * @param {any} _ - any -&gt; The class that the decorator is being applied to
 * @param {string} _2 - string -&gt; The name of the property
 * @param {PropertyDescriptor} descriptor - PropertyDescriptor
 * @returns A PropertyDescriptor
 */
function Autobind(_, _2, descriptor) {
    if (descriptor != undefined) {
        var originalMethod_1 = descriptor.value;
        var adjDescriptor = {
            configurable: true,
            enumerable: false,
            get: function () {
                var boundFn = originalMethod_1.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
}
/* The constructor takes two arguments, idTemplate and idHost, and then uses those arguments to get the
template and host elements from the DOM. It then imports the template element's content, and assigns
the first element of that content to the element property. Finally, it calls the attach method,
passing the element property as an argument. */
var ProjectInput = /** @class */ (function () {
    function ProjectInput(idTemplate, idHost) {
        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById(idTemplate);
        this.hostElement = document.getElementById(idHost);
        /* Importing the template element's content, and assigning the first element of that content to the
        element property. */
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = "user-input";
        /* Getting the input elements from the form element. */
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        /* Calling the attach method, passing the element property as an argument. */
        this.attach(this.element);
    }
    /**
     * It takes the values from the input fields, checks if they are valid, and if they are, it returns
     * them as an array.
     *
     * If they are not valid, it alerts the user and returns nothing.
     *
     * The function is called in the following way:
     *
     * const userInput = this.gatherUserInput();
     *
     * if (Array.isArray(userInput)) {
     *     const [title, desc, people] = userInput;
     *     console.log(title, desc, people);
     * }
     * @returns an array of strings and numbers.
     */
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        var peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("Insert input, please try again!");
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    };
    /* A decorator that binds the submitHandler method to the class instance. */
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            console.log(title, desc, people);
            this.clearInput();
        }
    };
    /**
     * The function clears the input fields by setting the value of each input field to an empty string.
     */
    ProjectInput.prototype.clearInput = function () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    };
    /**
     * The configure function adds an event listener to the form element, and when the form is
     * submitted, the submitHandler function is called.
     */
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener("submit", this.submitHandler);
    };
    /**
     * Insert the element before the host element.
     * @param {HTMLFormElement} element - HTMLFormElement - The element to attach to the DOM.
     */
    ProjectInput.prototype.attach = function (element) {
        this.hostElement.insertAdjacentElement("beforebegin", element);
    };
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
/* Creating new instances of the ProjectInput class. */
var projInput = new ProjectInput("project-input", "app");
