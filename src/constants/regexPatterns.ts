export default class EegexPatterns {
    static readonly PHONENUMBER = /^0\d{1,4}-\d{1,4}-\d{3,4}$/
    static readonly EMAIL = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
}