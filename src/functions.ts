function main(): void {
    // FUNCTION TYPES
    // typescript can figure out return type so you can leave it out
    function add(x: number, y: number): number {
        return x + y;
    }

    // contextual typing allows typing to only be needed on one side of the equals sign
    let myAdd: (x: number, y: number) => number = function(x: number, y: number): number {
        return x + y;
    }

    // OPTIONAL AND DEFAULT PARAMETERS
    // every parameter is assumed to be required by the function
    function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }
    
    // let result1 = buildName("Bob");                  // error, too few parameters
    // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
    let result3 = buildName("Bob", "Adams");         // ah, just right
    // can use lastName?: string for optional parameters
    // default parameter will override 'undefined' argument

    // REST PARAMETERS
    // typescript can gather arguments object into a variable
    function buildNames(firstName: string, ...restOfName: string[]){
        return firstName + " " + restOfName.join(' ');
    }

    console.log(buildNames("Joseph", "Samuel", "Lucas", "MacKinzie"));
    console.log(buildNames("Joseph"))

    // THIS
    // a variable that is set when a function is called
    interface Card {
        suit: string;
        card: number;
    }

    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }

    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        // NOTE: The function now explicitly specifies that its callee must be of type Deck
        createCardPicker: function(this: Deck) {
            return function(this: Deck) {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }

    let cardPicker = deck.createCardPicker().bind(deck);
    let pickedCard = cardPicker();

    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

    // OVERLOADS
    // for different return types for different input, return diff output types...
    // supply multiple function types for the same function as a list of overloads
    let suits = ["hearts", "spades", "clubs", "diamonds"];
    
    function pickCard(x: { suit: string; card: number; }): number;
    function pickCard(x: number): { suit: string; card: number; }
    function pickCard(x: any): any {
        if (typeof x === "object"){
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        }
        else {
            let pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }
}

export default main;