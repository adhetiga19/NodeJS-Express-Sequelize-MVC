var Sequelize = require('sequelize');
var db = require('../config/database');

var employee = db.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    job_id: {
        type: Sequelize.STRING,
        references: 'job',
        referencesKey: 'job_id'
    }
});

module.exports = employee;