const {isNullOrUndefined} = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('node-uuid');
const { createEngine } = require('express-react-views');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
let db;

// const URL = 'mongodb://heroku_3d3d8n74:b3k83c698fvjp9o1iugi38ei2t@ds237967.mlab.com:37967/heroku_3d3d8n74';
const URL = 'mongodb://localhost:27017/heroku_3d3d8n74';
MongoClient.connect(URL, (err, database) => {
    if (err) return console.log(err)
    db = database.db('heroku_3d3d8n74');
    server.listen(3333, err => {
        if (err) console.log(err);
        console.log(`server is listening on port 3333`);
    });    
});    

server.use(bodyParser.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

const book = { 
    BOOK_ID:null,
    ISBN:null,
    CATEGORIES: {
        category: []
        },
    SUBCATEGORIES: {
        subcategory: []
        },
    SUBJECT:{
        tags:[]
    },
    AUTHOR:null,
    TITLE:null,
    VOTES:{UP:0,DOWN:0}
   };


let User = {
    USERNAME:null,
    PASSWORD:null
}



server.get('/', (req, res) => {
    res.send('You Have Reached the API');
});

server.post('/API/Search', (req, res) => {
    let q = {};
    if(req.body.CATEGORY) 
        q.CATEGORIES = req.body.CATEGORY;
    
    if(req.body.SUBCATEGORY) 
        q.SUBCATEGORIES = req.body.SUBCATEGORY;
    
    if(req.body.SUBJECT)
        q.SUBJECT = req.body.SUBJECT;
    
    if(req.body.AUTHOR)
        q.AUTHOR = req.body.AUTHOR;

    if(req.body.TITLE)    
        q.TITLE = req.body.TITLE;
    
    db.collection('books').find(q).sort({ "VOTES.UP" : -1 }).toArray((err, _book) => {
        if(_book.length === 0) {
            _book = Object.create(book);
            _book.RESPONSE = ['Error','No Books found fitting your search!'];
        }
        res.send(
            _book
        );
    });
});

server.get('/API/Books', (req, res) => {
    db.collection('books').find().toArray(function (err, results) {
        res.send(results);
    })
});

server.post('/API/User/:username', (req, res) => {
    if(req.params.username !== undefined) {
        db.collection('users').find({ $and : [{ USERNAME : req.params.username}, {PASSWORD : req.body.PASSWORD }]}).toArray((err, _user) => {
            if (_user.length === 0) {
                sendUserError('Error: Invalid Login. GET /API/User/:username', res);
            } else {
                _user = {}
                _user.USERNAME = req.params.username;
                _user.RESPONSE = ["Success", "Valid Login"];
                res.send(_user);
            }
        });
    } else {
        sendUserError('Error: Parameter Missing. Username Required. GET /API/User/:username',res);
    }
});

server.post('/API/User', (req, res) => {
    if(req.body.USERNAME !== undefined) {
        let _user = Object.create(User);
        Object.assign(_user, User);
        _user.USERNAME = req.body.USERNAME;
        _user.PASSWORD = req.body.PASSWORD || null;
        // lets not have duplicates
        db.collection('users').find({ $set : [{ USERNAME : _user.USERNAME}]}).toArray((err, _user) => {
            if (_user.length === 0) {
                db.collection('users').insert(_user);
                _user.RESPONSE = ["Success", "User added"];
                res.json(_user);
            } else {
                sendUserError('Error: Invalid User. POST /API/User', res);
            }
        });            
    } else {
        sendUserError('Error: Parameter Missing. Username Required. POST /API/User',res);
    }
});
/* Load a Book by API Book Id */
server.get('/API/Book/:id', (req, res) => {
    if (req.params.id !== undefined) {

        db.collection('books').find({_id : ObjectId(req.params.id)}).toArray((err, _book) => {
            if(_book.length !== 0) {
                _book[0].RESPONSE = ['Success','Book found!'];
                _book = _book[0];
            } else {
                _book = Object.create(book);
                _book.RESPONSE = ['Error','Book not found!'];
            }
            res.send(
                _book
            );
        });

    } else {
        sendUserError('Error: Parameter Missing. Book Id required. GET /API/Book/:id',res);
    }    
});

/* Add a new Book to the API */
server.post('/API/Book', (req, res) => {    
    let _book = Object.create(book);
    Object.assign(_book, book);
    const err = [];
    _book.BOOK_ID = uuid.v4();
    
    if(req.body.ISBN !== undefined) {
        _book.ISBN = req.body.ISBN;
    } else {
        err.push({status:'Error', message:'Parameter Missing. ISBN required. POST /API/Book'});
    }
    
    if(req.body.AUTHOR !== undefined) {
        _book.AUTHOR = req.body.AUTHOR;
    } else {
        err.push({status:'Error', message:'Parameter Missing. Author required. POST /API/Book'});
    }
    
    if(req.body.SUBJECT !== undefined) {
        _book.SUBJECT = req.body.SUBJECT;
        console.log(_book.SUBJECT)
    } else {
        err.push({status:'Error', message:'Parameter Missing. Subject required. POST /API/Book'});
    }

    if(req.body.CATEGORY !== undefined) {
        _book.CATEGORIES = req.body.CATEGORY;
    } else {
        err.push({status:'Error', message:'Parameter Missing. Categories required. POST /API/Book'});
    }

    if(req.body.SUBCATEGORY !== undefined) {
        _book.SUBCATEGORIES = req.body.SUBCATEGORY;
    } else {
        err.push({status:'Error', message:'Parameter Missing. Subcategories required. POST /API/Book'});
    }
    if(req.body.TITLE !== undefined) {
        _book.TITLE = req.body.TITLE;
    } else {
        err.push({status:'Error', message:'Parameter Missing. Title required. POST /API/Book'});
    }
    if(err.length){
        console.log(err);
        res.status(422)
        .send(err);
        return;
    } else {
        db.collection('books').insert(_book)
        let __book = Object.create(_book);
        Object.assign(__book, _book);
        __book.RESPONSE = ['Success','Book added!'];
        res.json(
            __book
        );        
    }

});

/* Add a new book to the system */
server.put('/API/Book/:id', (req, res) => {
    if (req.params.id !== undefined) {
        const myquery = { _id: ObjectId(req.params.id) };
        let newvalues = {};

        if (req.body.ISBN !== undefined) {
            newvalues.ISBN = req.body.ISBN;
        }        
        if (req.body.AUTHOR !== undefined) {
            newvalues.AUTHOR = req.body.AUTHOR;
        }
        if (req.body.TITLE !== undefined) {
            newvalues.TITLE = req.body.TITLE;
        }
        if (req.body.CATEGORY !== undefined) {
            newvalues.CATEGORIES = {tags: req.body.CATEGORY};
        }
        if (req.body.SUBCATEGORY !== undefined) {
            newvalues.SUBCATEGORIES = {tags: req.body.SUBCATEGORY};
        }
        if (req.body.SUBJECT !== undefined) {
            newvalues.SUBJECT = {tags: req.body.SUBJECT};
        }
        // dont do redudant call
        db.collection('books').findOneAndUpdate(
            myquery,
            { $set: newvalues },
            { upsert: true, returnNewDocument: true }, 
            (err, _book) => {
                if (err) console.log(err);
                // todo, fix this!
                db.collection('books').find(myquery).toArray((err, result) => {
                    result.RESPONSE = ['Success', 'You updated a book!'];
                    res.send(result);
                })
            }
        );
    } else {
        sendUserError('Error: Parameter Missing. Book Id required. PUT /API/Book/:id');
    }
});

server.delete('/API/Book/:id', (req, res) => {
    if (req.params.id !== undefined) {
        let tmpBook;

        // find and make a temp copy
        // return an query error, not console.log it
        // to add: reference for response for error: ['Error','Book could not be removed!']
        db.collection('books').find({ _id: ObjectId(req.params.id) }).toArray((err, _book) => {
            if (err) console.log(err);
            tmpBook = _book;
        })
        db.collection('books').remove({_id : ObjectId(req.params.id)}, (err, _book) => {
            if (err) console.log(err);
            tmpBook.RESPONSE = ['Success', 'Book removed!'];
            res.send(tmpBook);
        });
    } else {
        sendUserError('Error: Parameter Missing. Book Id required.  DELETE /API/Book/:id', res);
    }
});

server.post('/API/Vote', (req, res) => {
    if(req.body.BOOK_ID !== undefined) {
        const myquery = { BOOK_ID: req.body.BOOK_ID };
        let newvalues;
        switch(req.body.VOTE){
            case 'UP':
                newvalues = { "VOTES.UP" : 1 }
            break;
            case 'DOWN':
                newvalues = { "VOTES.DOWN" : 1  }
            break;
        }
        
        db.collection('books').findOneAndUpdate(
            myquery,
            { $inc: newvalues },
            { upsert: true, returnNewDocument: true },
            (err, _book) => {
                if (err) console.log(err);
                // todo, fix this!
                db.collection('books').find(myquery).toArray((err, result) => {
                    result = result.pop();
                    if(req.body.VOTE === 'UP') {
                        result.RESPONSE = ['Success','You up voted a book!'];
                    } else if ( req.body.VOTE === 'DOWN' ) {
                        result.RESPONSE = ['Success','You down voted a book!'];
                    } else {
                        result.RESPONSE = ['Success','Your vote did not count!'];
                    }   
                    res.send(result);
                })
            }
        );      
    } else {
        return sendUserError('Error: Parameter Missing. Book Id required.', res);
    }
});
 
