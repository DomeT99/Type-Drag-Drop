namespace App {
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
    export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
}