var express = require('express');
var router = express.Router();
var db = require('../config/database');
var employee = require('../models/employee');
var job = require('../models/job');

// LIST
router.get('/', (req, res) =>
  employee.findAll()
    .then(employeeList => {
      res.render('admin/employeeList', {
        employeeList
      });
    })
    .catch(err => console.log(err))
);

// ADD
router.get('/add', (req, res) =>
    // Combobox Job List
  job.findAll()
    .then(jobList => {
      res.render('admin/employee/add', {
        jobList
      });
    })
    .catch(err => console.log(err))
);

router.post('/add', (req, res) => {
  let { id, name, email, job_id } = req.body;

  // Insert into Table
  employee.create({
    id,
    name,
    email,
    job_id
  })
    .then(employeeList => res.redirect('/employee'))
    .catch(err => console.log(err));
});

// DELETE
router.get('/delete/:id', (req, res) => {
  employee.destroy({
    where: {
      id: req.params.id //this will be your id that you want to delete
    }
  })
    .then(employeeList => res.redirect('/employee'))
    .catch(err => console.log(err));
});

//UPDATE
router.get('/edit/:id', (req, res) => {
  employee.findOne({
    where: {
      id: req.params.id //this will be your id that you want to edit
    }
  })
    .then(empEdit => {
      res.render('admin/employee/edit', {
        empEdit
      });
    })
    .catch(err => console.log(err))
});

router.post('/edit', (req, res) => {
  let { id, name, email, job_id } = req.body;

  // Update set Table
  employee.update({
    id,
    name,
    email,
    job_id
  },
    {
      where: {
        id: id
      }
    })
    .then(employeeList => res.redirect('/employee'))
    .catch(err => console.log(err));
});

module.exports = router;
