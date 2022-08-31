/* An interface that is used to validate the input. */
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

type TypeElement = 'active' | 'finished';

/**
 * If the input is required, it must have a value. If the input has a minLength, it must be at least
 * that long. If the input has a maxLength, it must be at most that long. If the input has a min, it
 * must be at least that value. If the input has a max, it must be at most that value.
 * @param {Validatable} validatableInput - Validatable
 * @returns The function validate is being returned.
 */
function validate(validatableInput: Validatable) {
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
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    if (descriptor != undefined) {
        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            enumerable: false,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        }
        return adjDescriptor;
    }
}

//PROJECT LIST CLASS
/* It gets the template and host elements from the DOM, imports the template element's content, and
assigns the first element of that content to the element property. It then attaches the element to
the host element, and renders the content */
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: TypeElement) {
        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        /* Importing the template element's content, and assigning the first element of that content to the
        element property. */
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        this.attach();
        this.renderContent();
    }

    /**
     * The function takes in a string, and then it sets the id of the ul element to the string, and then it
     * sets the text content of the h2 element to the string.
     */
    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

//PROJECT INPUT CLASS
/* The constructor takes two arguments, idTemplate and idHost, and then uses those arguments to get the
template and host elements from the DOM. It then imports the template element's content, and assigns
the first element of that content to the element property. Finally, it calls the attach method,
passing the element property as an argument. */
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {

        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        /* Importing the template element's content, and assigning the first element of that content to the
        element property. */
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        /* Getting the input elements from the form element. */
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

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
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("Insert input, please try again!")
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    /* A decorator that binds the submitHandler method to the class instance. */
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people)
            this.clearInput()
        }
    }

    /**
     * The function clears the input fields by setting the value of each input field to an empty string.
     */
    private clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    /**
     * The configure function adds an event listener to the form element, and when the form is
     * submitted, the submitHandler function is called.
     */
    private configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }


    /**
     * Insert the element before the host element.
     * @param {HTMLFormElement} element - HTMLFormElement - The element to attach to the DOM.
     */
    private attach(element: HTMLFormElement) {
        this.hostElement.insertAdjacentElement("beforebegin", element);
    }
}



/* Creating new instances of the ProjectInput class. */
const projInput = new ProjectInput();
const projListFinished = new ProjectList('finished');
const projListActive = new ProjectList('active');


