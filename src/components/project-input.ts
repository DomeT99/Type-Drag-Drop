namespace App {
    /* The ProjectInput class is a subclass of the Component class. It has three private properties that
    are assigned to the input elements in the form element. It has a constructor that calls the super
    constructor and passes in the id of the div element, the id of the app element, a boolean value, and
    the id of the form element. It then assigns the input elements to the private properties. It then
    calls the configure method. It has a renderContent method that does nothing. It has a configure
    method that adds an event listener to the form element and calls the submitHandler method when the
    form is submitted. It has a gatherUserInput method that takes the values from the input fields,
    checks if they are valid, and if they are, it returns them as an array. If they are not valid, it
    alerts the user and returns nothing. It has a submitHandler method that takes an event as an
    argument and prevents the default behavior of the event. It then calls the gatherUserInput method
    and */
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
}