namespace App {
    /* The above code is creating a class called Component. This class is an abstract class. This means
    that it cannot be instantiated. It is only meant to be inherited from. The class has a constructor
    that takes in a templateId, hostElementId, insertAtStart, and newElementId. The constructor then
    assigns the templateElement, hostElement, and element. The element is assigned by importing the
    templateElement and then assigning the firstElementChild to the element. The attach function is then
    called and the element is inserted into the DOM. */
    
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;

        constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {

            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;


            const importNode = document.importNode(this.templateElement.content, true);
            this.element = importNode.firstElementChild as U;

            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }

        abstract configure(): void;
        abstract renderContent(): void;

        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
        }

    }
}