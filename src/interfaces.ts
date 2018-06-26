function main(): void {
    // typechecking focuses on the shape that values have --> "duck typing" or "structural typing"
    function printLabel(obj: {label: string}): void {
        console.log(obj.label)
    }
    // even though there is an extra key, just checks to make sure label exists
    // otherwise we get a compile error 
    let myObj = {size: 10, label: "my label"};
    printLabel(myObj);

    // OPTIONAL PROPERTIES
    // not all properites of an interface may be required
    // prevents use of properties taht are not part of interface
    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): {color: string; area: number} {
        return {
            color: config.color || "white",
            area: (config.width) ? config.width * config.width: 100
        };
    }

    // cannot add keys that are not part of the interface 
    let mySquare = createSquare({color: "red" /*, height: 10*/});
    console.log(mySquare)

    // READONLY PROPERTIES
    // some properties are modifiable only when an object is first created
    interface Point {
        readonly x: number;
        readonly y: number;
    }

    // create Point by assigning object literal
    let p1: Point = { x: 10, y: 20 };
    // p1.x = 5; --> error

    // const a will cause an error because readonly cannot be assigned constant
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    // ro[0] = 12 --> error
    // however, you can still mutate 'a' which 'ro' also points to
    a[0] = 12;
    console.log(a);
    console.log(ro);

    // EXCESS PROPERTY CHECKS
    // colour does not exist on SquareConfig
    // let newSquare = createSquare({colour: "red", width: 100})
    // can use type assertion instead
    // NOTE argument does not actually change, colour will still be a part of the argument
    let newSquare = createSquare({colour: "red", width: 100} as SquareConfig)
    console.log(newSquare)

    // FUNCTION TYPES
    // interface can describe objects and functions
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    let mySearch: SearchFunc;
    mySearch = function(source, subString) {
        let result = source.search(subString);
        return result > -1
    }
    // mySearch('happy', 10); --> error
    mySearch('happy', 'ppy');

    // INDEXABLE TYPES 
    // indexable types have an index signature 
    // can index with string or number
    interface StringArray {
        [index: number]: string;
        // readonly [index: number]: string; prevents assigning vals to indeces
        length: number;
        // name: string this will cause an error when initializing myArray with an array
    }
    let myArray: StringArray;
    myArray = ["bob", "sarah"];
    let myStr: string = myArray[0];
    // console.log(myArray["1" as string], myArray.length) // coerced to string so it does not matter

    // this will compile but you may end with diff vals
    // interface NotOkay {
    //     [x: number]: string
    //     [y: string]: string
    // }

    // CLASS TYPES 
    // implementing interface
    // in other languages, enforces class meets a particular contract
    // interface describe the public side of the class 
    // static side of classes
    interface ClockInterface {
        currentTime: Date
        setTime(d: Date): void; // can also describe methods
    }

    // instance side of classes
    // interface ClockConstructor {
    //     new (hour: number, minute: number);
    // }

    class Clock implements ClockInterface {
    //class Clock implements ClockConstructor {
        currentTime: Date;
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(hour: number, minute: number) {
            // super();
            // this.hour = hour;
            // this.number = number;
        }
    }

    let myClock: Clock = new Clock(12, 0);
    // ClockConstructor interface is only helpful when passing in a class as an argument to
    // another function

    // EXTENDING INTERFACES
    // interfaces can extend eachother
    interface Shape {
        color: string;
    }

    interface Square extends Shape {
        sideLength: number;
    }

    // just an empty object
    // <Square> is same as "as Square"
    let square = <Square>{};
    console.log(square);

    // HYBRID TYPES
    // can make function act as object
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = <Counter>function(start: number) {};
        counter.interval = 123;
        return counter;
    }

    let c = getCounter();
    c(10);
    c.interval = 5

    // INTERFACES EXTENDING CLASSES
    // When an interface type extends a class type it inherits the members of the class but NOT implementation
    // interfaces inherit even private and protected members of base class
    class Control {
        private state: any;
    }

    interface SelectableControl extends Control {
        select(): void;
    }

    class Button extends Control implements SelectableControl {
        select() {}
    }

    let button = new Button();
    console.log(button);
}

export default main;