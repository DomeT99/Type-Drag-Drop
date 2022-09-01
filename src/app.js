"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//PROJECT CLASS
/* It creates a class called Project with the following properties: id, title, description, people, and
status. */
var Project = /** @class */ (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
//PROJECT STATE CLASS
/* The ProjectState class is a class that holds an array of projects. It has a method called addProject
that adds a new project to the array. */
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    /**
     * If the instance exists, return it. If it doesn't exist, create it and return it.
     * * @returns The instance of the class.
     */
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new ProjectState();
    };
    /**
     * This function takes a function as an argument and adds it to the listeners array.
     * @param {Function} listenerFn - The function that will be called when the event is triggered.
     */
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    /**
     * This function takes in three arguments, title, description, and numOfPeople, and creates a new
     * project object with those arguments and pushes it into the projects array.
     * @param {string} title - string, description: string, numOfPeople: number
     * @param {string} description - string, numOfPeople: number
     * @param {number} numOfPeople - number
     */
    ProjectState.prototype.addProject = function (title, description, numOfPeople) {
        var newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}());
/* Creating a new instance of the ProjectState class. */
var projState = ProjectState.getInstance();
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
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
//PROJECT LIST CLASS
/* It gets the template and host elements from the DOM, imports the template element's content, and
assigns the first element of that content to the element property. It then attaches the element to
the host element, and renders the content */
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        /* Creating a property called assignedProjects and assigning it an empty array. */
        this.assignedProjects = [];
        /* Importing the template element's content, and assigning the first element of that content to the
        element property. */
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = "".concat(this.type, "-projects");
        if (projState != undefined) {
            /* Adding a listener to the projState object. */
            projState.addListener(function (projects) {
                _this.assignedProjects = projects;
                _this.renderProjects();
            });
        }
        /* Creating a new instance of the class and calling the attach and renderContent methods. */
        this.attach();
        this.renderContent();
    }
    /**
     * "We're going to get the element with the id of `${this.type}-projects-list` and then we're going to
     * cast it to an HTMLUListElement. Then we're going to loop through the assignedProjects array and for
     * each item in the array we're going to create a new list item element, set the text content of that
     * list item to the title of the project, and then append that list item to the list element."
     *
     * The first thing we do is get the element with the id of `${this.type}-projects-list`. We're using a
     * template literal here to get the id of the element we want to append our list items to. The
     * `${this.type}` part of the template literal is going to be replaced with the value of the `type`
     * property of the class. So if the class is an instance of the `ProjectList` class, the `type`
     */
    ProjectList.prototype.renderProjects = function () {
        var _a;
        var listEl = document.getElementById("".concat(this.type, "-project-list"));
        (_a = listEl.querySelector("li")) === null || _a === void 0 ? void 0 : _a.remove();
        for (var _i = 0, _b = this.assignedProjects; _i < _b.length; _i++) {
            var projItem = _b[_i];
            var listItem = document.createElement("li");
            listItem.textContent = projItem.title;
            listEl.appendChild(listItem);
        }
    };
    /**
     * The function takes in a string, and then it sets the id of the ul element to the string, and then it
     * sets the text content of the h2 element to the string.
     */
    ProjectList.prototype.renderContent = function () {
        var listId = "".concat(this.type, "-project-list");
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = this.type.toUpperCase() + ' PROJECTS';
    };
    /**
     * This function takes the element that was created in the constructor and inserts it into the DOM.
     */
    ProjectList.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    return ProjectList;
}());
//PROJECT INPUT CLASS
/* The constructor takes two arguments, idTemplate and idHost, and then uses those arguments to get the
template and host elements from the DOM. It then imports the template element's content, and assigns
the first element of that content to the element property. Finally, it calls the attach method,
passing the element property as an argument. */
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
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
    /**
     * The submitHandler function is a private method that takes an event as an argument and prevents
     * the default behavior of the event. It then calls the gatherUserInput method and assigns the
     * return value to the userInput variable. If the userInput variable is an array, it destructures
     * the array and assigns the values to the title, desc, and people variables. It then calls the
     * addProject method on the projState object and passes in the title, desc, and people variables as
     * arguments. It then calls the clearInput method.
     * </code>
     * @param {Event} event - Event -&gt; this is the event that is triggered when the form is
     * submitted.
     */
    /* A decorator that binds the submitHandler method to the class instance. */
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            if (projState != undefined) {
                projState.addProject(title, desc, people);
            }
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
var projInput = new ProjectInput();
var projListFinished = new ProjectList('finished');
var projListActive = new ProjectList('active');
//# sourceMappingURL=app.js.map