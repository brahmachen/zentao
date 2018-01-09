var request = require('superagent');
var zentaoConfig = require('../config');
var config = zentaoConfig();

let login = function(){
    return new Promise((resolve, reject) => {
        request
            .post(config.urls.login)
            .type('form')
            .send({
                'account': config.account.userName,
                'password': config.account.password,
                'referer':'http://192.168.1.37:8899/zentao/my/'
            })
            .then(function(res) {
                resolve(res);
            });
    })
}

module.exports = login