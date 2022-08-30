"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    /* A decorator that binds the submitHandler method to the class instance. */
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
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
