function main():void {
    // x is inferred to be number 
    let x = 3

    // BEST COMMON TYPE
    // when type inference is made from severy expressions, those types are used to calculate best "common type"
    // picks type that is compatible with the other candidates
    let y = [0, 1, null]

    // because there is no object of type Animal, we make no inference about array
    // instead explicity provide the type when no one type is a super type of all other candidates
    // let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];

    // CONTEXTUAL TYPE
    // type of an expression is implied by its location
    window.onmousedown = function(mouseEvent) {
        // console.log(mouseEvent.button) error --> able to infer the type of mouseEvent parameter
    }
}

export default main;