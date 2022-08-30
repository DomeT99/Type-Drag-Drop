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

    constructor(idTemplate: string, idHost: string) {

        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById(idTemplate)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(idHost)! as HTMLDivElement;

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

    /* A decorator that binds the submitHandler method to the class instance. */
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
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
const projInput = new ProjectInput("project-input", "app");

