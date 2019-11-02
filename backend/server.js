const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const conf = require('./conf');

const Todo = require('./models/todo');

const app = express();
app.use(cors());
//app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

// TODO: put this into a different file db.js
const dbConnectionString = `mongodb://${conf.DATABASE.HOST}:${conf.DATABASE.PORT}/${conf.DATABASE.NAME}`
mongoose.connect(dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true });
const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
  console.log('DB connection established.');
});

const router = express.Router();
router.route('/').get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});
router.route('/add').post((req, res) => {
  let todo = new Todo(req.body);
  todo.save()
    .then(todo => {
      res.status(200).json({'msg': 'item added'});
    })
    .catch(err => {
       res.status(500).json({'msg': 'adding item failed'}); 
    });
});
router.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(400).json({'msg': 'item not found'});
    } else {
      todo.description = req.body.description;
      todo.responsible = req.body.responsible;
      todo.priority = req.body.priority;
      todo.completed = req.body.completed;

      todo.save()
        .then(todo => {
          res.status(200).json({'msg': 'item updated'})
        })
        .catch(err => {
          res.status(500).json({'msg': 'updating item failed'})
        });
    }
  });
});
app.use(conf.API_ENDPOINT, router);

app.listen(conf.PORT, () => {
  console.log(`Server listening on port ${conf.PORT}`);
});
