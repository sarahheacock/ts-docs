function main(): void {
    // BOOLEAN, NUMBER, STRING
    let str: string = "Hello";
    console.log(str)

    // ARRAY
    // array types can be written in two ways
    // (1) type of element
    let listOne: number[] = [1, 2, 3];
    // (2) generic array type
    let listTwo: Array<number> = [1, 2, 3];

    // TUPLE
    // create array where type of a fixed number of elements is known
    // but does not need to be the same
    let x: [string, number];
    x = ["hello", 10]; // but has to have number as well 
    x[2] = 20;
    console.log(x[5])  // shows up undefined
    // x[6] = true --> is not number of string

    // ENUM
    // standard set of datatypes from javascript 
    // gives more friendly names to sets of numberic values
    // by default, begin by number at 0
    enum Color {Red = 1, Green, Blue};
    let c: Color = Color.Green;
    console.log(c) 
    // can also look up corresponding name
    let colorName: string = Color[2]
    console.log(colorName) // "Green"

    // ANY
    // sometimes we may want to opt-out of type-checking and 
    // let the values pass through compile-time checks
    let notSure: any = 4;
    notSure = "a string!";
    // but you still cannot pass methods when type is not ok

    // VOID
    // absence of any type at all 
    function warnUser(): void {
        console.log("Hello, world!");
    }
    warnUser();
    let unusable: void = undefined; // can only assing undefined or null to them

    // NULL and UNDEFINED
    // Not much else we can assign to these variables!
    // --strictNullChecks null and undefined are only assignable to void
    let u: undefined = undefined;
    let n: null = null;

    // NEVER
    // type of values that never occurs
    // ie a function that throws an error or never returns
    function infiniteLoop(): never {
        while(true) {}
    }

    // OBJECT
    // represents non-primitve types 
    // ie NOT number, string, boolean, symbol, null, or undefined

    // TYPE ASSERTIONS
    // type cast but does not perform special checking or restructuring of data
    let someValue: any = "this is a string";
    let angleBracket: number = (<string>someValue).length;
    let asSyntax: number = (someValue as string).length;
}

export default main;