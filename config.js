class _SystemConfig {
    constructor() {
        this.SESSION_SECRET = "Anything";
        this.SESSION_NAME = "connect.sid";
        this.HD_SQL_CONFIG = {
            encrypt: false,
            username: "sa",
            database: "EISV2",
            host: "192.168.10.2",
            password: "VinaCA@123!@#",
            //host: "10.0.0.51",
            // password: "SqlAsap@123",
        }
        this.EHD_SQL_CONFIG = {
            encrypt: false,
            username: "sa",
            database: "Einvoince",
            host: "192.168.10.2",
            password: "VinaCA@123!@#",
            //host: "10.0.0.51",
            // password: "SqlAsap@123",
        }
        this.SVA_SQL_CONFIG = {
            encrypt: false,
            username: "sa",
            database: "SVA",
            host: "192.168.10.2",
            password: "VinaCA@123!@#",
            //host: "10.0.0.51",
            //password: "SqlAsap@123",
        }
    }
    get Session_Secret() { return this.SESSION_SECRET; }
    set Session_Secret(obj) { }
    get Session_Name() { return this.SESSION_NAME; }
    set Session_Name(obj) { }
    get Session_Age() { return this.SESSION_AGE; }
    set Session_Age(obj) { }
    get HD_SQL_Config() { return this.SQL_CONFIG; }
    set HD_SQL_Config(obj) { }
    get EHD_SQL_Config() { return this.SQL_CONFIG; }
    set EHD_SQL_Config(obj) { }
    get SVA_SQL_Config() { return this.SQL_CONFIG; }
    set SVA_SQL_Config(obj) { }
    get Password_Secret() { return this.PASSWORD_SECRET; }
    set Password_Secret(obj) { }
    get() { }
    set() { }
}

const SystemConfig = new _SystemConfig();

module.exports = SystemConfig;