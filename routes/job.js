var express = require('express');
var router = express.Router();
var db = require('../config/database');
var job = require('../models/job');

// LIST
router.get('/', (req, res) =>
    job.findAll()
        .then(jobList => {
            res.render('admin/jobList', {
                jobList
            });
        })
        .catch(err => console.log(err))
);

// ADD
router.get('/add', (req, res) =>
    res.render('admin/job/add')
);

router.post('/add', (req, res) => {
    let { job_id, job_title } = req.body;

    // Insert into Table
    job.create({
        job_id,
        job_title
    })
        .then(jobList => res.redirect('/job'))
        .catch(err => console.log(err));
});

// DELETE
router.get('/delete/:id', (req, res) => {
    job.destroy({
        where: {
            job_id: req.params.id //this will be your id that you want to delete
        }
    })
        .then(jobList => res.redirect('/job'))
        .catch(err => console.log(err));
});

//UPDATE
router.get('/edit/:id', (req, res) => {
    job.findOne({
        where: {
            job_id: req.params.id //this will be your id that you want to edit
        }
    })
        .then(jobEdit => {
            res.render('admin/job/edit', {
                jobEdit
            });
        })
        .catch(err => console.log(err))
});

router.post('/edit', (req, res) => {
    let { job_id, job_title } = req.body;

    // Update set Table
    job.update({
        job_id,
        job_title
    },
        {
            where: {
                job_id: job_id
            }
        })
        .then(jobList => res.redirect('/job'))
        .catch(err => console.log(err));
});

module.exports = router;
