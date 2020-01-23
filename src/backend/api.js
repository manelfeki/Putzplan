const mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var db = 'mongodb://localhost/test';
var Resident = require('./Resident');
var Task = require('./Task');

var cors = require('cors');


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

// //get one resident by id
// api.get('/residents/:id', (req, res) => {

//     Resident.findOne({
//         _id: req.params.id
//     })
//         .exec(function (err, resident) {
//             if (err) {
//                 res.send('error has occured while getting a resident by id');
//             } else {

//                 res.json(resident);
//             }
//         })
// })

//get one resident by name or id
api.get('/residents/:name', (req, res) => {
    Resident.findOne({
        name: req.params.name
    })
        .exec(function (err, resident) {
            if (err || !resident) {
                //if not a name but an id 
                Resident.findOne({
                    _id: req.params.name
                })
                    .exec(function (err, residentid) {
                        if (err || !residentid) {
                            res.send('error has occured while getting a residentid:');
                        } else {
                            console.log
                            res.json(residentid);
                        }
                    })
                //if a name    
            } else {

                res.json(resident);
            }
        })
})

//Create a resident
api.post('/residents', function (req, res) {
    var newResident = new Resident();

    newResident.name = req.body.name;
    newResident.phoneNumber = req.body.phoneNumber;
    //newResident.ArrivalDate = new Date(parseInt(req.body.ArrivalDate));

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
        {
            $set: {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber
            }
        },
        { upsert: true },
        function (err, newResident) {
            if (err) {
                console.log('error occured');
            } else {
                //console.log(newResident);
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
            //console.log(resident);
            res.status(204).end();
        }
    })
})

//delete all residents
api.get('/cleanresidents', function (req, res) {
    Resident.deleteMany(function (err) {
        if (err) console.log(err);
    });
    res.end();
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
                res.status(400).end(JSON.stringify({ err: "error" }));
            } else {
                res.json(task);
            }
        })
})

//get all tasks
api.get('/tasks', (req, res) => {
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
    newTask.description = req.body.description;
    newTask.startDate = req.body.startDate;
    newTask.endDate = req.body.endDate;
    newTask.isRepeating = req.body.isRepeating;
    newTask.taskStatus = "Waiting";
    newTask.occurence = req.body.occurence;
    //newTask.assignedResidents = req.body.assignedResidents;
    Resident.find({}, (err, residents) => {
        if (err) {
            res.status(400).json({ err: "error" });
            return;
        }
      newTask.assignedResident = req.body.assignedResident;
      if (newTask.isRepeating) {
        const index = residents.findIndex(resident => req.body.assignedResident === resident._id);
        newTask.index = index;
      }
      console.log(newTask);
        newTask.save(function (err, task) {
            if (err) {
                res.status(400).end(JSON.stringify({ err: "error saving task" }));

            } else {

                res.end(JSON.stringify(task));
            }
        })
    })
})

//update a task

api.put('/tasks/:id', function (req, res) {
  console.log(req.body);
    Task.findById(req.params.id, (err, task) => {
        if (err || !task) { res.status(400).end(JSON.stringify({ err: "error : task doesn't exist" })); }
        else {
            Resident.find({}, (err, residents) => {
                if (err) {
                    res.status(400).json({ err: "error" });
                    return;
                }

                let new_index = task.index % residents.length;
                let assignedResident = residents[new_index]._id;

                //update the index depending on number of residents

                task.updateOne({
                    description: req.body.description,
                    assignedResident,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    isRepeating: req.body.isRepeating,
                    taskStatus: req.body.taskStatus,
                    occurence: req.body.occurence,
                    index: new_index
                }, (err, raw) => {
                    res.status(200).json(task);
                });
            });
        }
    })
})

// mark a task as done

api.put('/tasks/done/:id', function (req, res) {
  console.log(req.body);
  Task.findById(req.params.id, (err, task) => {
    if (err || !task) { res.status(400).end(JSON.stringify({ err: "error : task doesn't exist" })); }
    else {
        //update the index depending on number of residents
        task.updateOne({
          taskStatus: req.body.taskStatus
        }, (err, raw) => {
          res.status(200).json(task);
        });
      }
    });
});

//delete a task :  2 possibles scenarios
api.delete('/tasks/:id', function (req, res) {
    Task.findOneAndRemove({
        //if the task is not repeatable, remove it
        _id: req.params.id,
        isRepeating: false
    }, function (err, task) {
        if (err) {
            res.status(500).end(JSON.stringify({ err: "error deleting task" }));
        } else if (task === null) {
            Task.findOne({
                _id: req.params.id
            },
                function (err, task) {
                    if (err || !task) {
                        res.status(400).end(JSON.stringify({ err: "error deleting task" }));
                    }
                    /*if the task is repeatable, clicking on delete will :
                    - increment the index
                    - place in assignedResident the id of the next resident
                    - increment the date of 1 week 
                    */
                    else {
                        Resident.find({}, (err, residents) => {
                            if (err) {
                                res.status(400).json({ err: "error" });
                                return;
                            }

                            let start_date = new Date(task.toObject().startDate);
                            let end_date = new Date(task.toObject().endDate);
                            let index = task.toObject().index;
                            let new_index = (index + 1) % residents.length;
                            start_date.setHours(start_date.getHours() + 168);
                            end_date.setHours(end_date.getHours() + 168);
                            task.update(
                                {
                                    $set: {
                                        startDate: start_date,
                                        endDate: end_date,
                                        index: new_index,
                                        assignedResident: residents[new_index]._id
                                    }
                                }, (err, raw) => {
                                    if (err) console.log(err, task, raw);
                                }
                            );
                            res.status(204).end();
                        });
                    }
                })
        }
        else {
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

//delete all tasks
api.delete('/cleantasks', function (req, res) {
    Task.deleteMany(function (err) {
        if (err) console.log(err);
    });
    res.end();
})




app.use(cors());
app.use('/api', api);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(8080);
