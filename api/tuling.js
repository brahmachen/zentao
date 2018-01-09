var request = require('superagent');

let tuling = function({info, userid}){
    return new Promise((resolve, reject) => {
        request
            .post("http://www.tuling123.com/openapi/api")
            .type('form')
            .send({
                "key": "5aad2a6b46894ae4b082232c6a02f5eb",
                "info": info,
                "userid": userid
            })
            .then(function(res) {
                resolve(res);
            });
    })
}

module.exports = tuling