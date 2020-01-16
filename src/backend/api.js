const mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var db = 'mongodb://localhost/test';
var Resident = require('./Resident');
var Task = require('./Task');

const api = express.Router();

//Connect to MongoDB
mongoose.connect(db);
mongoose.connection.on('error', function (error) { console.log('Connection error:', error) });
mongoose.connection.once('open', function () {
    console.log('connection has been made')
});

//allows us to parse json elements & give/receive body elements through the url
app.use(bodyParser.json({ strict: false }));

//RESIDENTS API

//get residents
api.get('/residents', (req, res) => {
    console.log('getting all residents')
    Resident.find({})
        .exec(function (err, residents) {
            if (err) {
                res.send('error has occured');
            } else {
                console.log(residents);
                res.json(residents);
            }
        })
})

//Create a resident
api.post('/residents', function (req, res) {
    var newResident = new Resident();

    newResident.name = req.body.name;
    newResident.ArrivalDate = new Date(parseInt(req.body.ArrivalDate));

    newResident.save(function (err, resident) {
        if (err) {
            res.status(400).end(JSON.stringify({ err: "error saving resident" }));

        } else {
            res.end(JSON.stringify(resident));
        }
    })
})

//update a resident
// in front-end, we use UPDATE
api.put('/residents/:id', function (req, res) {
    console.log('yessaie')
    Resident.findOneAndUpdate({
        _id: req.params.id
    },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newResident) {
            if (err) {
                console.log('error occured');
            } else {
                console.log(newResident);
                res.status(204).end(JSON.stringify({ err: "error updating resident" }));
            }
        }
    )
})

//delete a resident
api.delete('/residents/:id', function (req, res) {
    console.log('truc');
    Resident.findOneAndRemove({
        _id: req.params.id
    }, function (err, resident) {
        if (err) {
            res.status(500).end(JSON.stringify({ err: "error deleting resident" }));
        } else {
            console.log(resident);
            res.status(204);
        }
    })
})

//TASK API

//get tasks
api.get('/tasks', (req, res) => {
    console.log('getting all tasks')
    Task.find({})
        .exec(function (err, tasks) {
            if (err) {
                res.send('error has occured');
            } else {
                console.log(tasks);
                res.json(tasks);
            }
        })
})

//create task
api.post('/tasks', function (req, res) {
    var newTask = new Task();

    newTask.name = req.body.name;
    newTask.description = req.body.description;
    newTask.assignedresident = req.body.assignedresident;
    newTask.startdate = new Date(parseInt(req.body.startdate));
    newTask.enddate = new Date(parseInt(req.body.enddate));

    newTask.save(function (err, task) {
        if (err) {
            res.status(400).end(JSON.stringify({ err: "error saving task" }));

        } else {
            res.end(JSON.stringify(task));
        }
    })
})



app.use('/api', api);
app.listen(8080);