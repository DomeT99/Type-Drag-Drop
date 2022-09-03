namespace App {
    /* The ProjectItem class extends the Component class and implements the Draggable interface.
    
    The ProjectItem class is a child class of the Component class. It inherits the properties and
    methods of the Component class.
    
    The ProjectItem class implements the Draggable interface. This means that the ProjectItem class must
    implement the dragStartHandler and dragEndHandler methods.
    
    The ProjectItem class has a private property called project. This property is of type Project.
    
    The ProjectItem class has a getter called persons. This getter returns a string.
    
    The ProjectItem class has a constructor. The constructor takes three parameters: hostId, project,
    and hasActiveProject.
    
    The constructor calls the super() method. The super() method calls the constructor of the Component
    class.
    
    The constructor assigns the project parameter to the project property.
    
    The */
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }

        @Autobind
        dragEndHandler(_: DragEvent): void { console.log("End") }

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
}