var request = require('superagent');
var zentaoConfig = require('../config');
var config = zentaoConfig();

let report = function({cookie, title, steps, product}){
    return new Promise((resolve, reject) => {
        request
        .post(config.urls.report)
        .type('form')
        .set('Cookie', cookie)
        .send({
            'product': product,
            'module': 0,
            'openedBuild[]': 'trunk',
            'type': 'codeerror',
            'title': title,
            'steps': steps,
            'task': 0,
            'case': 0,
            'caseVersion': 0,
            'result': 0,
            'testtask': 0
        })
        .then(function(res) {
            resolve(res.text);
        });
    })
}

module.exports = report

