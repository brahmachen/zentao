let login = require('./api/login')
let report = require("./api/report")

async function run(){
    let res = await login();
    // let res = await report();
    console.log(res);
}
run();