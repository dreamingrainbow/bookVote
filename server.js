const {isNullOrUndefined} = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('node-uuid');
const { createEngine } = require('express-react-views');
const server = express();
server.use(bodyParser.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};
const books = [];
const book = { 
    BOOK_ID:null,
    ISBN:null,
    SUBJECT:null,
    AUTHOR:null,
    TITLE:null,
    VOTES:{UP:0,DOWN:0}
   };
books.push(book);

server.get('/', (req, res) => {
    res.send('You Have Reached the API');
});

server.get('/API/Search/:filter/:query', (req, res) => {
    res.send('You Have Reached the API Search');
});

server.get('/API/Books', (req, res) => {
    res.json(books);
});

server.get('/API/Book/:id', (req, res) => {
    if (req.param.id !== undefined) {
        let _book = books.filter( book => book.BOOK_ID === id);
        if(_book.length !== 0) {
            _book[0].RESPONSE = ['Success','Book found!'];
            _book = _book[0];
        } else {
            _book = Object.create(book);
            _book[0].RESPONSE = ['Error','Book not found!'];
        }
        res.json(
            _book
        );
    } else {
        sendUserError('Error: Parameter Missing. Book Id required.',res);
    }    
});

server.post('/API/Book', (req, res) => {    
    let _book = Object.create(book);
    _book.BOOK_ID = uuid.v4();
        if(req.body.ISBN !== undefined) {
            _book.ISBN = req.body.ISBN;
        } else {
            return sendUserError('Error: Parameter Missing. ISBN required.', res);
        }
        if(req.body.AUTHOR !== undefined) {
            _book.AUTHOR = req.body.AUTHOR;
        } else {
            return sendUserError('Error: Parameter Missing. Author required.', res);
        }
        if(req.body.SUBJECT !== undefined) {
            _book.SUBJECT = req.body.SUBJECT;
        } else {
            return sendUserError('Error: Parameter Missing. Subject required.', res);
        }
        if(req.body.TITLE !== undefined) {
            _book.TITLE = req.body.TITLE;
        } else {
            return sendUserError('Error: Parameter Missing. Title required.', res);
        }
        _book.RESPONSE = ['Success','Book added!'];
        books.push(_book);
    res.json(
        _book
    );
});

server.put('/API/Book/:id', (req, res) => {
    if (req.param.id !== undefined) {
        let _book = books.filter( book => book.BOOK_ID === id);
        if(_book.length !== 0) {
            if(req.body.ISBN !== undefined) {
                _book.ISBN = req.body.ISBN;
            }
            if(req.body.AUTHOR !== undefined) {
                _book.AUTHOR = req.body.AUTHOR;
            }
            if(req.body.SUBJECT !== undefined) {
                _book.SUBJECT = req.body.SUBJECT;
            }
            if(req.body.TITLE !== undefined) {
                _book.TITLE = req.body.TITLE;
            }
            _book[0].RESPONSE = ['Success','Book update completed!'];
            _book = _book[0];
        } else {
            _book = Object.create(book);
            _book[0].RESPONSE = ['Error','Book could not be updated!'];
        }
        res.json(
            _book
        );
    } else {
        sendUserError('Error: Parameter Missing. Book Id required.');
    }
});

server.delete('/API/Book/:id', (req, res) => {
    res.json(
        { 
            BOOK_ID:null,
            ISBN:null,
            SUBJECT:null,
            AUTHOR:null,
            VOTES:{UP:0,DOWN:0},
            RESPONSE: ['Success' | 'Error', "Message"]  
        }
    );
});

server.post('/API/Vote', (req, res) => {
    res.json(
        { 
            BOOK_ID:null,
            ISBN:null,
            SUBJECT:null,
            AUTHOR:null,
            VOTES:{UP:0,DOWN:0},
            RESPONSE: ['Success' | 'Error', "Message"]  
        }
    );
});

        
server.listen(3333, err => {
    if (err) console.log(err);
    console.log(`server is listening on port 3333`);
});