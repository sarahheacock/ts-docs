function main(): void {
    // relates types based solely on their members
    interface Named {
        name: string;
    }

    class Person {
        name: string;
    }

    // this is OK because of structural typing
    let p: Named;
    p = new Person(); 

    // ts allows certain operations taht can't be known at compile-time to be safe
    // x and y are compatible if y has same members as x
    interface Named {
        name: string;
    }

    let x: Named;
    let y = { name: "Alice", location: "Seattle" };
    // does not work since x does not have location
    // y = x;
    // console.log(y)
    x = y;
    console.log(x)

    // COMPARING FUNCTIONS
    // first look at parameter list
    let xFunc = (a: number) => 0;
    let yFunc = (b: number, s: string) => 0;

    yFunc = xFunc; // allowed because ignored parameters is pretty common
    console.log(yFunc);
    // xFunc = yFunc; error --> since yFunc has required string param that xFunc does not have

    // ENUMS
    // enum values from different enum types are considered incompatible
    enum Status { Ready, Waiting };
    enum Color { Red, Blue, Green };

    let status = Status.Ready;
    // status = Color.Green;

    // CLASSES
    // classes have a instance and static type
    // only members of instance are compared
    // private and protected members affect compatibility
    class Animal {
        feet: number;
        constructor(name: string, numFeet: number) { }
    }
    
    class Size {
        feet: number;
        constructor(numFeet: number) { }
    }
    
    let a: Animal;
    let s: Size;
    
    a = s;  // OK
    s = a;  // OK
    
    // GENERICS
    // type parameters only affect the resulting type when consumed as part of type of a member
    interface Empty<T> {}
    let xGen: Empty<number>;
    let yGen: Empty<string>;
    xGen = yGen; // y matches structure of x

    interface NotEmpty<T> {
        data: T;
    }
    let xData: NotEmpty<number>;
    let yData: NotEmpty<string>;

    // xData = yData; --> string is not assignable to number
    // any is used in place when arguments are not specified
    // let identity = function<T>(x: T): T {}
}

export default main;