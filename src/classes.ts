function main(): void {
    // CLASSES
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }

        greet(): string {
            return "Hello, " + this.greeting;
        }
    }

    let greeter = new Greeter("world");
    console.log(greeter.greet());

    // INHERITANCE
    // able to extend existing classes to create new ones
    class Animal {
        x: number;
        y: number;
        private name: string;
        protected foo: string;

        constructor() {
            this.x = 0;
            this.y = 0;
            this.name = "foo";
            this.foo = "bar";
        }

        move(distanceInMeters: number = 0) {
            console.log(`Animal moved ${distanceInMeters}m.`);
            console.log(this.foo);
        }
    }
    
    class Dog extends Animal {
        location: number;

        constructor(x: number, y: number) {
            super(); // executes constructor of base class
            // without it, location is created but not x and y
            this.location = x + y;
        }

        bark() {
            console.log('Woof! Woof!');
        }
    }
    
    // dog has bark and move methods
    const dog = new Dog(1, 2);
    dog.bark();
    dog.move(10);
    dog.bark();
    console.log(dog);
    // first __proto__ has methods bark and constructor with argument function
    // console.log(dog.__proto__.__proto__)

    // PUBLIC, PRIVATE, AND PROTECTED MODIFIERS
    // each member is public by default
    // private member cannot be accessed from outside of its class
    const cat = new Animal();
    console.log(cat);
    // cat.name; --> error
    // console.log(dog.foo) --> error
    // but this.foo can be accessed with in Dog class

    // class Octopus {
    //     readonly name: string;
    //     readonly numberOfLegs: number = 8;

    //     constructor (theName: string) {
    //         this.name = theName;
    //     }

    //     // changeName(newName: string) {
    //     //     this.name = newName;
    //     // }
    // }

    class Octopus {
        readonly numberOfLegs: number = 8;

        // automatically creates this.name and sets it to arg
        constructor(readonly name: string) {}
    }

    let oct = new Octopus("Boo");
    // oct.changeName("La") --> both cause errors
    // oct.name = "Foo"
    console.log(oct)

    // ACCESSORS
    // set/get helps control how a member is accessed on each object
    class Employee {
        private _fullName: string;

        // get and set are automatically set to readonly
        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            this._fullName = newName;
        }
    }

    let employee = new Employee();
    employee.fullName = "Bob Smith";
    console.log(employee.fullName)

    // STATIC PROPERTIES
    // creates members that are visible on the class not on instance
    // have to access it by calling ClassName.key
    class Grid {
        static origin = {x: 0, y: 0};
        calculateDistanceFromOrigin(point: {x: number; y: number;}) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
        constructor (public scale: number) { }
    }
    
    let grid1 = new Grid(1.0);  // 1x scale
    let grid2 = new Grid(5.0);  // 5x scale
    
    console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
    console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
    

    // ABSTRACT CLASSES
    // base classes from with other classes may be derived
    abstract class Moo {
        // must be implemented in derived class
        abstract makeSound(): void;

        move(): void {
            console.log("roaming...")
        }
    }

    class Cow extends Moo {
        name: string;

        constructor() {
            super()
            this.name = "Sue"
        }

        makeSound() {
            console.log("moo")
        }
    }

    let cow = new Cow();
    console.log(cow);

    // ADVANCED TECHNIQUES
}

export default main;