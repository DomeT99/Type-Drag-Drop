namespace App {

    type Listener<T> = (items: T[]) => void;
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
    export class ProjectState extends State<Project> {

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
            this.updateListener();
        }

        /**
         * "Find the project with the given id and set its status to the given status."
         * 
         * The function takes two arguments:
         * 
         * - projectId: string
         * - newStatus: ProjectStatus
         * 
         * The first argument is a string that represents the id of the project we want to move. The second
         * argument is a ProjectStatus enum value that represents the new status of the project.
         * 
         * The function starts by finding the project with the given id. If it finds the project, it sets the
         * project's status to the given status.
         * 
         * The function uses the find() method to find the project. The find() method takes a callback function
         * as an argument. The callback function takes a project as an argument and returns true if the
         * project's id matches the given id.
         * 
         * The find() method returns the first project that matches the callback function. If it doesn't find a
         * matching project, it
         * @param {string} projectId - string - the id of the project to be moved
         * @param {ProjectStatus} newStatus - ProjectStatus
         */
        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListener();
            }
        }

        /**
         * This function loops through all the listeners and calls them with the current state of the projects
         * array.
         */
        private updateListener() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice())
            }
        }
    }

    /* Creating a new instance of the ProjectState class. */
    export const projState = ProjectState.getInstance();
}