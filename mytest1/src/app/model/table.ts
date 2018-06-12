export class Table {

    constructor(
        public target: string[],
        public acOutput: number[],
        public note: String[]
    ) { }

    static CreateDefault(): Table {
        return new Table([],[],[]);
    }
    static CreateEmpty(): Table {
        return new Table([],[0,0,0,0],[]);
    }
}