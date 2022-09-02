//PROJECT CLASS
/* It creates a class called Project with the following properties: id, title, description, people, and
status. */
class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) { }
}

//STATE CLASS
/* The State class is a generic class that takes a type parameter T. It has a protected property called
listeners that is an array of functions that take a parameter of type T and return void. It also has
a method called addListener that takes a function as an argument and adds it to the listeners array */
class State<T> {
    protected listeners: Listener<T>[] = [];

    /**
     * This function takes a function as an argument and adds it to the listeners array.
     * @param {Function} listenerFn - The function that will be called when the event is triggered.
     */
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}


//PROJECT STATE CLASS
/* The ProjectState class is a class that holds an array of projects. It has a method called addProject
that adds a new project to the array. */
class ProjectState extends State<Project> {

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() { super() }
    /**
     * If the instance exists, return it. If it doesn't exist, create it and return it.
     * * @returns The instance of the class.
     */
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new ProjectState();
    }


    /**
     * This function takes in three arguments, title, description, and numOfPeople, and creates a new
     * project object with those arguments and pushes it into the projects array.
     * @param {string} title - string, description: string, numOfPeople: number
     * @param {string} description - string, numOfPeople: number
     * @param {number} numOfPeople - number
     */
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())
        }
    }
}

/* Creating a new instance of the ProjectState class. */
const projState = ProjectState.getInstance();

/* An interface that is used to validate the input. */
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}


/* Defining interfaces for the draggable and drag target. */
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus { Active, Finished }
type Listener<T> = (items: T[]) => void;
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

//COMPONENT BASE CLASS
/* The above code is creating a class called Component. This class is an abstract class, meaning that
it cannot be instantiated. It is meant to be extended by other classes. The class has a constructor
that takes in four parameters. The first parameter is a string that represents the id of the
template element. The second parameter is a string that represents the id of the host element. The
third parameter is a boolean that determines whether the element will be inserted at the beginning
or the end of the host element. The fourth parameter is a string that represents the id of the
element that will be created. The */
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        /* Getting the template and host elements from the DOM. */
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        /* Importing the template element's content, and assigning the first element of that content to the
        element property. */
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as U;

        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }

    abstract configure(): void;
    abstract renderContent(): void;

    /**
     * This function takes the element that was created in the constructor and inserts it into the DOM.
     */
    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
    }

}

//PROJECT LIST CLASS
/* The `ProjectList` class is a class that extends the `Component` class, and it has a constructor that
takes in a string, and it has a `configure` method that adds a listener to the `projState` object,
and it has a `renderProjects` method that renders the projects, and it has a `renderContent` method
that sets the id of the ul element to the string, and it sets the text content of the h2 element to
the string. */
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    /* Defining the types of the variables. */
    assignedProjects: Project[];


    constructor(private type: TypeElement) {
        /* Calling the constructor of the parent class. */
        super("project-list", "app", false, `${type}-projects`);
        /* Assigning an empty array to the assignedProjects property of the class. */
        this.assignedProjects = []

        this.configure();
        /* Calling the renderContent method. */
        this.renderContent();
    }

    @Autobind
    dragOverHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
    }
    dropHandler(_: DragEvent): void { }

    @Autobind
    dragLeaveHandler(_: DragEvent): void { 
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
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
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)


        if (projState != undefined) {
            /* Adding a listener to the projState object. */
            projState.addListener((projects: Project[]) => {

                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === ProjectStatus.Active
                    } else {
                        return prj.status === ProjectStatus.Finished
                    }
                })

                this.assignedProjects = relevantProjects;
                this.renderProjects();
            })
        }
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
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.querySelector("li")?.remove();

        for (const projItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, projItem)
        }
    }

    /**
     * The function takes in a string, and then it sets the id of the ul element to the string, and then it
     * sets the text content of the h2 element to the string.
     */
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project

    get persons() {
        if (this.project.people === 1) {
            return '1 person'
        } else {
            return `${this.project.people} persons`
        }
    }


    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        console.log(event)
    }

    @Autobind
    dragEndHandler(event: DragEvent): void {
        console.log("End")
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.persons + ' assigned';
        this.element.querySelector("p")!.textContent = this.project.description;
    }
}

//PROJECT INPUT CLASS
/* The constructor takes two arguments, idTemplate and idHost, and then uses those arguments to get the
template and host elements from the DOM. It then imports the template element's content, and assigns
the first element of that content to the element property. Finally, it calls the attach method,
passing the element property as an argument. */
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {

        super("project-input", "app", true, "user-input")

        /* Getting the input elements from the form element. */
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();

    }
    /**
     * This function does nothing.
     */
    renderContent(): void { }

    /**
     * The configure function adds an event listener to the form element, and when the form is
     * submitted, the submitHandler function is called.
     */
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
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
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            if (projState != undefined) {
                projState.addProject(title, desc, people)
            }
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


}



/* Creating new instances of the ProjectInput class. */
const projInput = new ProjectInput();
const projListActive = new ProjectList('active');
const projListFinished = new ProjectList('finished');


