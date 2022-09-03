/// <reference path="./project-item.ts" />

namespace App {
    type TypeElement = 'active' | 'finished';

    /* The `ProjectList` class extends the `Component` class, and it has a constructor that takes in a
    string, and it has a `renderContent` method that takes in a string, and it has a `renderProjects`
    method that takes in no arguments, and it has a `configure` method that takes in no arguments, and
    it has a `dropHandler` method that takes in a `DragEvent` object, and it has a `dragLeaveHandler`
    method that takes in a `DragEvent` object, and it has a `dragOverHandler` method that takes in a
    `DragEvent` object. */
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
        dragOverHandler(event: DragEvent): void {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')! as HTMLUListElement;
                listEl.classList.add('droppable');
            }
        }

        @Autobind
        dropHandler(event: DragEvent): void {
            const projId = event.dataTransfer!.getData('text/plain');
            projState.moveProject(projId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        }

        @Autobind
        dragLeaveHandler(_: DragEvent): void {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable');
        }

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
            listEl.innerHTML = '';

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
}