export class Fridge{

    constructor(
        public date:String,
        public reader_mac:String,
        public rfid_mac:String,
        public job_number:String,
        public model:String,
        public lot:String,
        public target:String,
        public amount:String
    ){}

    static CreateDefault(): Fridge {
        return new Fridge('', '','', '','', '','','');
    }
}