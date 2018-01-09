
module.exports = function(){
    let origin = 'http://192.168.1.37:8899',
    urls = {
        login : origin + '/zentao/user-login.json',
        report: origin + '/zentao/bug-create-39-0-moduleID=0.json'
    }
    return {
        origin: origin,
        urls: urls,
        account: {
            userName: "chenmingcheng",
            password: "ea4bf803e454a7ea494f012ecf9cac05"
        },
        prdctIds: {
            "车辆监控平台(新版)": 30,
            "微信查车(企业版)": 41,
            "(外部)ERP": 40,
            "人保救援平台": 42,
            "金融风控平台": 53,
            "DD2经销商版": 58
        }
    }
};
