namespace App {
    export enum ProjectStatus { Active, Finished }
    
    //PROJECT CLASS
    /* It creates a class called Project with the following properties: id, title, description, people, and
    status. */
    export class Project {
        constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) { }
    }
}