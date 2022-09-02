"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
//STATE CLASS
/* The State class is a generic class that takes a type parameter T. It has a protected property called
listeners that is an array of functions that take a parameter of type T and return void. It also has
a method called addListener that takes a function as an argument and adds it to the listeners array */
var State = /** @class */ (function () {
    function State() {
        this.listeners = [];
    }
    /**
     * This function takes a function as an argument and adds it to the listeners array.
     * @param {Function} listenerFn - The function that will be called when the event is triggered.
     */
    State.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    return State;
}());
//PROJECT STATE CLASS
/* The ProjectState class is a class that holds an array of projects. It has a method called addProject
that adds a new project to the array. */
var ProjectState = /** @class */ (function (_super) {
    __extends(ProjectState, _super);
    function ProjectState() {
        var _this = _super.call(this) || this;
        _this.projects = [];
        return _this;
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
}(State));
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
//COMPONENT BASE CLASS
/* The above code is creating a class called Component. This class is an abstract class, meaning that
it cannot be instantiated. It is meant to be extended by other classes. The class has a constructor
that takes in four parameters. The first parameter is a string that represents the id of the
template element. The second parameter is a string that represents the id of the host element. The
third parameter is a boolean that determines whether the element will be inserted at the beginning
or the end of the host element. The fourth parameter is a string that represents the id of the
element that will be created. The */
var Component = /** @class */ (function () {
    function Component(templateId, hostElementId, insertAtStart, newElementId) {
        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        /* Importing the template element's content, and assigning the first element of that content to the
        element property. */
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    /**
     * This function takes the element that was created in the constructor and inserts it into the DOM.
     */
    Component.prototype.attach = function (insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    };
    return Component;
}());
//PROJECT LIST CLASS
/* The `ProjectList` class is a class that extends the `Component` class, and it has a constructor that
takes in a string, and it has a `configure` method that adds a listener to the `projState` object,
and it has a `renderProjects` method that renders the projects, and it has a `renderContent` method
that sets the id of the ul element to the string, and it sets the text content of the h2 element to
the string. */
var ProjectList = /** @class */ (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(type) {
        var _this = 
        /* Calling the constructor of the parent class. */
        _super.call(this, "project-list", "app", false, "".concat(type, "-projects")) || this;
        _this.type = type;
        /* Assigning an empty array to the assignedProjects property of the class. */
        _this.assignedProjects = [];
        _this.configure();
        /* Calling the renderContent method. */
        _this.renderContent();
        return _this;
    }
    /**
     * "If the projState object is not undefined, then add a listener to the projState object that filters
     * the projects based on the type of the project, and then renders the projects."
     *
     * The above function is a bit more complicated than the previous functions, so let's break it down.
     *
     * First, we check if the projState object is not undefined. If it is not undefined, then we add a
     * listener to the projState object.
     *
     * The listener is a function that takes in an array of projects. The listener then filters the
     * projects based on the type of the project.
     *
     * If the type of the project is active, then the listener filters the projects to only include
     * projects that have a status of active.
     *
     * If the type of the project is finished, then the listener filters the projects to only include
     * projects that have a status of finished.
     *
     *
     */
    ProjectList.prototype.configure = function () {
        var _this = this;
        if (projState != undefined) {
            /* Adding a listener to the projState object. */
            projState.addListener(function (projects) {
                var relevantProjects = projects.filter(function (prj) {
                    if (_this.type === 'active') {
                        return prj.status === ProjectStatus.Active;
                    }
                    else {
                        return prj.status === ProjectStatus.Finished;
                    }
                });
                _this.assignedProjects = relevantProjects;
                _this.renderProjects();
            });
        }
    };
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
            new ProjectItem(this.element.querySelector("ul").id, projItem);
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
    return ProjectList;
}(Component));
var ProjectItem = /** @class */ (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(hostId, project) {
        var _this = _super.call(this, 'single-project', hostId, false, project.id) || this;
        _this.project = project;
        _this.configure();
        _this.renderContent();
        return _this;
    }
    Object.defineProperty(ProjectItem.prototype, "persons", {
        get: function () {
            if (this.project.people === 1) {
                return '1 person';
            }
            else {
                return "".concat(this.project.people, " persons");
            }
        },
        enumerable: false,
        configurable: true
    });
    ProjectItem.prototype.configure = function () { };
    ProjectItem.prototype.renderContent = function () {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + ' assigned';
        this.element.querySelector("p").textContent = this.project.description;
    };
    return ProjectItem;
}(Component));
//PROJECT INPUT CLASS
/* The constructor takes two arguments, idTemplate and idHost, and then uses those arguments to get the
template and host elements from the DOM. It then imports the template element's content, and assigns
the first element of that content to the element property. Finally, it calls the attach method,
passing the element property as an argument. */
var ProjectInput = /** @class */ (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, "project-input", "app", true, "user-input") || this;
        /* Getting the input elements from the form element. */
        _this.titleInputElement = _this.element.querySelector('#title');
        _this.descriptionInputElement = _this.element.querySelector('#description');
        _this.peopleInputElement = _this.element.querySelector('#people');
        _this.configure();
        return _this;
    }
    /**
     * This function does nothing.
     */
    ProjectInput.prototype.renderContent = function () { };
    /**
     * The configure function adds an event listener to the form element, and when the form is
     * submitted, the submitHandler function is called.
     */
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener("submit", this.submitHandler);
    };
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
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}(Component));
/* Creating new instances of the ProjectInput class. */
var projInput = new ProjectInput();
var projListActive = new ProjectList('active');
var projListFinished = new ProjectList('finished');
//# sourceMappingURL=app.js.map