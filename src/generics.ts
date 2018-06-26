function main(): void {
    // allows users to consume components and use their own types
    // if we use `any` for argument and return type, we lose info
    // we can capture the type of argument with T
    function identity<T>(arg: T): T {
        // arg.length --> T does not have length property 
        // but if arg was Array<T> or T[], it would have been fine
        return arg;
    }

    // both work because argument inference automatically assumes 
    // output type based off of argument type
    console.log(identity<string>("myString"))
    console.log(identity("myString"))

    // anonymous functions
    let myIdentity: <U>(arg: U) => U = identity;
    let anotherIdentity: {<T>(arg: T): T} = identity;

    interface GenericIndentityFn {
        <T>(arg: T): T;
    }
    let otherIdentity: GenericIndentityFn = identity

    // can also make generic parameter, parameter of whole interface
    interface GenericIdentity<T> {
        (arg: T): T;
    }
    let weirdIndentity: GenericIdentity<number> = identity;

    // GENERIC CLASSES
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y){ return x + y; };

    // GENERIC CONSTRAINTS
    // maybe we want to constrain to types that have length
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg
    }

    // loggingIdentity(3); --> error
    loggingIdentity("Hello");

    // prevent calling undefined values of object
    function getProperty<T, K extends keyof T>(obj: T, key: K){
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, "a");
    // getProperty(x, "m"); m is not assignable to a, b, c, d
}

export default main;