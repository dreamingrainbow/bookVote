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

const URL = 'mongodb://heroku_3d3d8n74:b3k83c698fvjp9o1iugi38ei2t@ds237967.mlab.com:37967/heroku_3d3d8n74';

// MongoClient.connect(URL, function (err, database) {
//     if (err) return
//     db = database.db('heroku_3d3d8n74')
// })

MongoClient.connect(URL, (err, database) => {
    if (err) return console.log(err)
    db = database.db('heroku_3d3d8n74');
    // db.collection('books')
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
let books = [];
const book = { 
    BOOK_ID:null,
    ISBN:null,
    SUBJECT:null,
    AUTHOR:null,
    TITLE:null,
    VOTES:{UP:0,DOWN:0}
   };
books.push(book);
let Users = [];
let User = {
    USER_ID:null,
    USERNAME:null,
    PASSWORD:null
}

Users.push(User);

server.get('/', (req, res) => {
    res.send('You Have Reached the API');
});

server.get('/API/Search/:filter/:query', (req, res) => {
    res.send('You Have Reached the API Search');
});

server.get('/API/Books', (req, res) => {
    db.collection('books').find().toArray(function (err, results) {
        res.send(results);
    })
});

server.get('/API/User/:username', (req, res) => {
    if(req.params.username !== undefined) {
        let _user = users.filter( user => user.USERNAME = req.params.username);
        if(_user.length === 0 ){
            res.json({});
        } else {
            res.json(_user[0]);
        }        
    } else {
        sendUserError('Error: Parameter Missing. Username Required. GET /API/User/:username',res);
    }
});

server.post('/API/User', (req, res) => {
    if(req.body.USERNAME !== undefined) {
        let _user = users.filter( user => user.USERNAME = req.body.USERNAME);
        if(_user.length === 0) {
            let _user = Object.create(User);
            Object.assign(_user, User);
            _user.USER_ID = uuid.v4();
            _user.USERNAME = req.body.USERNAME;
            _user.PASSWORD = req.body.PASSWORD || null;
            Users.push(_user);
            res.json(_user);
        } else {
            sendUserError('Error: User exists. POST /API/User',res);
        }
    } else {
        sendUserError('Error: Parameter Missing. Username Required. POST /API/User',res);
    }
});

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

server.post('/API/Book', (req, res) => {    
    let _book = Object.create(book);
    Object.assign(_book, book);
    console.log(_book);
    _book.BOOK_ID = uuid.v4();
    
    if(req.body.ISBN !== undefined) {
        _book.ISBN = req.body.ISBN;
    } else {
        return sendUserError('Error: Parameter Missing. ISBN required. GET /API/Book', res);
    }
    if(req.body.AUTHOR !== undefined) {
        _book.AUTHOR = req.body.AUTHOR;
    } else {
        return sendUserError('Error: Parameter Missing. Author required. GET /API/Book', res);
    }
    if(req.body.SUBJECT !== undefined) {
        _book.SUBJECT = req.body.SUBJECT;
    } else {
        return sendUserError('Error: Parameter Missing. Subject required. GET /API/Book', res);
    }
    if(req.body.TITLE !== undefined) {
        _book.TITLE = req.body.TITLE;
    } else {
        return sendUserError('Error: Parameter Missing. Title required. GET /API/Book', res);
    }

    db.collection('books').insert(_book)
    let __book = Object.create(_book);
    Object.assign(__book, _book);
    __book.RESPONSE = ['Success','Book added!'];
    res.json(
        __book
    );
});

server.put('/API/Book/:id', (req, res) => {
    if (req.params.id !== undefined) {
        // let _book = books.filter( book => book.BOOK_ID === req.params.id);
        const myquery = { _id: ObjectId(req.params.id) };
        let newvalues = {};

        if (req.body.ISBN !== undefined) {
            newvalues.ISBN = req.body.ISBN;
        }
        if (req.body.AUTHOR !== undefined) {
            newvalues.AUTHOR = req.body.AUTHOR;
        }
        if (req.body.SUBJECT !== undefined) {
            newvalues.SUBJECT = req.body.SUBJECT;
        }
        if (req.body.TITLE !== undefined) {
            newvalues.TITLE = req.body.TITLE;
        }

        // on line 186 dont do redudant call
        db.collection('books').findOneAndUpdate(
            myquery,
            { $set: newvalues },
            { upsert: true, returnNewDocument: true }, 
            (err, _book) => {
                if (err) console.log(err);
                // todo, fix this!
                db.collection('books').find(myquery).toArray((err, result) => {
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

        db.collection('books').find({ _id: ObjectId(req.params.id) }).toArray((err, _book) => {
            if (err) console.log(err);
            tmpBook = _book;
        })
        console.log(db.collection('books').remove({_id : ObjectId(req.params.id)}, (err, _book) => {
            if (err) console.log(err);
            res.send(tmpBook);
        }));
        // if(_book.length !== 0) {
        //     books = books.filter( book => book.BOOK_ID !== req.params.id);
        //     newvalues.RESPONSE = ['Success','Book removed!'];
        //     _book = newvalues;
        // } else {
        //     _book = Object.create(book);
        //     Object.assign(_book, book);
        //     newvalues.RESPONSE = ['Error','Book could not be removed!'];
        // }
        // res.json(
        //     _book
        // );
    } else {
        sendUserError('Error: Parameter Missing. Book Id required.  DELETE /API/Book/:id', res);
    }
});

server.post('/API/Vote', (req, res) => {
    if(req.body.BOOK_ID !== undefined) {
        let _book = books.filter( book => book.BOOK_ID === req.body.BOOK_ID);
        if(_book.length !== 0) {
            if(req.body.VOTE !== undefined) {                    
                if(req.body.VOTE === 'UP') {
                    newvalues.VOTES.UP++;
                    newvalues.RESPONSE = ['Success','You up voted a book!'];
                } else if ( req.body.VOTE === 'DOWN' ) {
                    newvalues.VOTES.DOWN++;
                    newvalues.RESPONSE = ['Success','You down voted a book!'];
                } else {
                    newvalues.RESPONSE = ['Success','Your vote did not count!'];
                }
            } else {
                return sendUserError('Error: Parameter Missing. Book Id required.  POST /API/Vote', res);
            }
        } else {
            _book = Object.create(book);
            Object.assign(_book, book);
            newvalues.RESPONSE = ['Error','Could not cast your vote!'];
        }
        res.json(
            _book
        );           
    } else {
        return sendUserError('Error: Parameter Missing. Book Id required.', res);
    }
});
 
