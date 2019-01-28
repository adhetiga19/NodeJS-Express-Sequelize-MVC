var Sequelize = require('sequelize');
var db = require('../config/database');

var job = db.define('job', {
    job_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    job_title: {
        type: Sequelize.STRING
    }
});

module.exports = job;