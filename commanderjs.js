#!/usr/bin/env node  
  
var program = require('commander');  
var tuling = require('./api/tuling')
let login = require('./api/login')
let report = require("./api/report")

let config = require("./config");
config = config();
//定义参数,以及参数内容的描述  
program  
    .version('0.0.1')  
    .usage('[options] [value ...]')  
    .option('-m, --message <string>', 'a string argument')  
    .option('-n, --name <string>', 'a string argument')  
  
//添加额外的文档描述  
program.on('--help', function() {
    console.log('   Examples:')  
    console.log('')  
    console.log('       # input string, integer and float')  
    console.log('       $ ./nodecmd.js -m \"a string\" -i 1 -f 1.01')  
    console.log('')  
    console.log('')  
});  
  
let optionsOut = () => {
    console.log('');
    console.log('   命令：');
    console.log('       \"产品id\"（获取禅道产品id表）');
    console.log('       \"提交bug:[产品id]:[内容]\"（向指定产品提交bug）');
    console.log('   例如：');
    console.log('       \"@八哥 产品id\"');
    console.log('       \"@八哥 提交bug:30:系统日志一览中时间控件，缺少精准时间后，查询不到数据\"');
    console.log('');
    console.log('');
}

//解析commandline arguments  
program.parse(process.argv)
  
async function run(params){
    params.info = params.info.replace("[@ME]", "");
    params.info = params.info.replace("@八哥", "");
    params.info = params.info.replace(/\$/g, " ");
    params.info = params.info.replace(/(^\s*)|(\s*$)/g, ""); 
    // console.log(JSON.stringify(params))
    if(params.info === "命令") {
        optionsOut();
        console.log("产品id表：")
        console.log(JSON.stringify(config.prdctIds, null, '\t'));
    } else
    if(params.info.indexOf("产品id") != -1) {
        console.log("产品id表：")
        console.log(JSON.stringify(config.prdctIds, null, '\t'));
    } else 
    if(params.info.indexOf("提交bug") != -1){
        // params.info = params.info.replace("提交bug","");
        // 去掉前后空格
        params.info = params.info.replace(/(^\s*)|(\s*$)/g, ""); 
        let infoParam = params.info.split(/:|：/);
        if(infoParam.length != 3 || !infoParam[0] || !infoParam[1] || !infoParam[2]){
            console.log("参数不合法，请使用“:”分割各参数");
            return;
        }
        if(! /^[0-9]+$/.test(infoParam[1])){
            console.log("产品id必须为数字");
            return;
        }
        console.log(infoParam)
        // 登录获取zantaosid
        let res = await login();
        let resText = JSON.parse(res.text);
        if(resText.status === "success"){
            let cookieSid = res.headers["set-cookie"][0];
            let resReport = await report({
                cookie: cookieSid,
                title: "auto bug",
                steps: `<p>${infoParam[2]}</p>
                        <p style="text-align:center;"><strong>report by ${params.userid}</strong></p>`,
                product: infoParam[1]
            })
            let resObj = JSON.parse(resReport);
            if(resObj.result && resObj.result === "success"){
                console.log("提交成功 @" + params.userid);
                console.log(config.origin + resObj.locate.replace("json", "html"));
            } else {
                console.log("提交失败");
                console.log(resReport);
            }
        } else { 
            console.log(resText.reason);
        }
    } else {
        let res = await tuling(params);
        console.log(JSON.parse(res.text).text);
    }
}
run({
    info: program.message,
    userid: program.name
});

