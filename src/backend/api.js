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

//get all residents
api.get('/residents', (req, res) => {

    Resident.find({})
        .exec(function (err, residents) {
            if (err) {
                res.send('error has occured');
            } else {

                res.json(residents);
            }
        })
})

//get one resident
api.get('/residents/:id', (req, res) => {

    Resident.findOne({
        _id: req.params.id
    })
        .exec(function (err, resident) {
            if (err) {
                res.send('error has occured while getting a resident');
            } else {

                res.json(resident);
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


//--------------------------------------------------------------------------------------------





//TASK API

//get one task
api.get('/tasks/:id', (req, res) => {

    Task.findOne({
        _id: req.params.id
    })
        .exec(function (err, task) {
            if (err) {
                res.send('error has occured while getting a task');
            } else {

                res.json(task);
            }
        })
})

//get all tasks
api.get('/tasks', (req, res) => {
    console.log('getting all tasks')
    Task.find({})
        .exec(function (err, tasks) {
            if (err) {
                res.send('error has occured');
            } else {

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
    newTask.isdone = req.body.isdone;
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

//update a task

api.put('/tasks/:id', function (req, res) {
    Task.findOneAndUpdate({
        _id: req.params.id
    },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                assignedresident: req.body.assignedresident,
                isdone: req.body.isdone,
                startdate: req.body.startdate,
                enddate: req.body.enddate
            }
        },
        { upsert: true },
        function (err, newTask) {
            if (err) {
                res.status(500).end(JSON.stringify({ err: "error updating task" }));
            } else {
                console.log(newTask);
                res.status(200).json(newTask);
            }
        }
    )
})

//delete a task
api.delete('/tasks/:id', function (req, res) {
    Task.findOneAndRemove({
        _id: req.params.id
    }, function (err, task) {
        if (err) {
            res.status(500).end(JSON.stringify({ err: "error deleting task" }));
        } else {
            console.log(task);
            res.status(204).end();
        }
    })
})

//get all tasks to a resident
api.get('/residentandhistasks/:id', function (req, res) {
    Task.find({
        assignedresident: req.params.id
    }, function (err, tasks) {
        if (err) {
            res.status(500).end(JSON.stringify({ err: "error " }));
        } else {
            res.json(tasks);

        }
    })
})

app.use('/api', api);
app.listen(8080);