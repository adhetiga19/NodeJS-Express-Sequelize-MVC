var Sequelize = require('sequelize');
var db = require('../config/database');
var job = require('../models/job');

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
        type: Sequelize.STRING
    }
});

// Create Relation beetween table
job.hasMany(employee, {
    foreignKey: 'job_id'
});

employee.belongsTo(job, {
    foreignKey: 'job_id'
});

module.exports = employee;