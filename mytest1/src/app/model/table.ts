export class Table {

    constructor(
        public target: string[],
        public acOutput: number[],
        public note: String[]
    ) { }

    static CreateDefault(): Table {
        return new Table([],[],[]);
    }
}