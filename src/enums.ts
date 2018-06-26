function main(): void {
    // NUMERIC
    // allows us to define a set of named constants. 
    enum Direction {
        Up = 1,
        Down, // 2
        Left, // 3
        Right // 4
    }

    enum Response {
        No = 0,
        Yes = 1
    }

    function respond(recipient: string, message: Response): void {
        console.log(message);
    }
    respond("Princess Caroline", Response.Yes);
    // non-initialized enums need to come first or only after constant initialized values

    // STRING
    // each member has to be constant-initialized with string literal
    enum Directions {
        Up = "UP",
        Down = "DOWN"
    }

    // constant vs computed members
    enum FileAccess {
        // constant
        None,
        Read = 1 << 1,
        Write = 1 << 2,
        ReadWrite = Read | Write,
        // computed
        G = "123".length
    }
}

export default main;