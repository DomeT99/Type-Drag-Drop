
/* A way to reference other files in TypeScript. */
/// <reference path="./models/interfaces.ts" />
/// <reference path="./models/project.ts" />
/// <reference path="./state/project.ts" />
/// <reference path="./util/validation.ts" />
/// <reference path="./decorators/autobind.ts" />
/// <reference path="./components/base-component.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />


namespace App {
    /* Creating new instances of the classes. */
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
}


