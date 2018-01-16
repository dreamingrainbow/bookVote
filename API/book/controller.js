
// const uuid = require('uuid')
// const ObjectId = require('mongodb').ObjectId


// const book = { 
//     BOOK_ID:null,
//     ISBN:null,
//     CATEGORIES: [],
//     SUBCATEGORIES: [],
//     SUBJECT:[],
//     AUTHOR:null,
//     TITLE:null,
//     VOTES:{UP:0,DOWN:0}
//    };

// /* List all books */
// server.get('/API/Books', (req, res) => {
//     db.collection('books').find().toArray(function (err, results) {
//         res.send(results);
//     })
// });


// /* Load a Book by API Book Id */
// server.get('/API/Book/:id', (req, res) => {
//     if (req.params.id !== undefined) {

//         db.collection('books').find({_id : ObjectId(req.params.id)}).toArray((err, _book) => {
//             if(_book.length !== 0) {
//                 _book[0].RESPONSE = ['Success','Book found!'];
//                 _book = _book[0];
//             } else {
//                 _book = Object.create(book);
//                 _book.RESPONSE = ['Error','Book not found!'];
//             }
//             res.send(
//                 _book
//             );
//         });

//     } else {
//         sendUserError('Error: Parameter Missing. Book Id required. GET /API/Book/:id',res);
//     }    
// });

// /* get book by Book Id. */
// server.get('/API/Book/Id/:id', (req, res) => {
//     if (req.params.id !== undefined) {

//         db.collection('books').find({BOOK_ID : req.params.id}).toArray((err, _book) => {
//             if(_book.length !== 0) {
//                 _book[0].RESPONSE = ['Success','Book found!'];
//                 _book = _book[0];
//             } else {
//                 _book = Object.create(book);
//                 _book.RESPONSE = ['Error','Book not found!'];
//             }
//             res.send(
//                 _book
//             );
//         });

//     } else {
//         sendUserError('Error: Parameter Missing. Book Id required. GET /API/Book/:id',res);
//     }    
// });


// /* Add a new Book to the API */
// server.post('/API/Book', (req, res) => {    
//     let _book = Object.create(book);
//     Object.assign(_book, book);
//     const err = [];
//     _book.BOOK_ID = uuid.v4();
    
//     if(req.body.ISBN !== undefined) {
//         _book.ISBN = req.body.ISBN;
//     } else {
//         err.push({status:'Error', message:'Parameter Missing. ISBN required. POST /API/Book'});
//     }
    
//     if(req.body.AUTHOR !== undefined) {
//         _book.AUTHOR = req.body.AUTHOR;
//     } else {
//         err.push({status:'Error', message:'Parameter Missing. Author required. POST /API/Book'});
//     }
    
//     if(req.body.SUBJECT !== undefined) {
//         _book.SUBJECT = req.body.SUBJECT;
//     } else {
//         err.push({status:'Error', message:'Parameter Missing. Subject required. POST /API/Book'});
//     }

//     if(req.body.CATEGORY !== undefined) {
//         _book.CATEGORIES = req.body.CATEGORY;
//     } else {
//         err.push({status:'Error', message:'Parameter Missing. Categories required. POST /API/Book'});
//     }

//     if(req.body.SUBCATEGORY !== undefined) {
//         _book.SUBCATEGORIES = req.body.SUBCATEGORY;
//     } else {
//         err.push({status:'Error', message:'Parameter Missing. Subcategories required. POST /API/Book'});
//     }
//     if(req.body.TITLE !== undefined) {
//         _book.TITLE = req.body.TITLE;
//     } else {
//         err.push({status:'Error', message:'Parameter Missing. Title required. POST /API/Book'});
//     }
//     if(err.length){
//         console.log(err);
//         res.status(422)
//         .send(err);
//         return;
//     } else {
//         db.collection('books').insert(_book)
//         let __book = Object.create(_book);
//         Object.assign(__book, _book);
//         __book.RESPONSE = ['Success','Book added!'];
//         res.json(
//             __book
//         );        
//     }

// });

// /* Update a book */
// server.put('/API/Book/:id', (req, res) => {
//     if (req.params.id !== undefined) {
//         let _book = Object.create(book);
//         Object.assign(_book, book);
//         const myquery = { _id: ObjectId(req.params.id) };
//         const err = [];
//         if(req.body.ISBN !== undefined) {
//             _book.ISBN = req.body.ISBN;
//         } else {
//             err.push({status:'Error', message:'Parameter Missing. ISBN required. POST /API/Book'});
//         }
        
//         if(req.body.AUTHOR !== undefined) {
//             _book.AUTHOR = req.body.AUTHOR;
//         } else {
//             err.push({status:'Error', message:'Parameter Missing. Author required. POST /API/Book'});
//         }
        
//         if(req.body.SUBJECT !== undefined) {
//             _book.SUBJECT = req.body.SUBJECT;
//         } else {
//             err.push({status:'Error', message:'Parameter Missing. Subject required. POST /API/Book'});
//         }

//         if(req.body.CATEGORY !== undefined) {
//             _book.CATEGORIES = req.body.CATEGORY;
//         } else {
//             err.push({status:'Error', message:'Parameter Missing. Categories required. POST /API/Book'});
//         }

//         if(req.body.SUBCATEGORY !== undefined) {
//             _book.SUBCATEGORIES = req.body.SUBCATEGORY;
//         } else {
//             err.push({status:'Error', message:'Parameter Missing. Subcategories required. POST /API/Book'});
//         }
//         if(req.body.TITLE !== undefined) {
//             _book.TITLE = req.body.TITLE;
//         } else {
//             err.push({status:'Error', message:'Parameter Missing. Title required. POST /API/Book'});
//         }
//         // dont do redudant call
//         db.collection('books').findOneAndUpdate(
//             myquery,
//             { $set: newvalues },
//             { upsert: true, returnNewDocument: true }, 
//             (err, _book) => {
//                 if (err) console.log(err);
//                 // todo, fix this!
//                 db.collection('books').find(myquery).toArray((err, result) => {
//                     result.RESPONSE = ['Success', 'Book updated!'];
//                     res.send(result);
//                 })
//             }
//         );
//     } else {
//         sendUserError('Error: Parameter Missing. Book Id required. PUT /API/Book/:id');
//     }
// });

// server.delete('/API/Book/:id', (req, res) => {
//     if (req.params.id !== undefined) {
//         let tmpBook;

//         // find and make a temp copy
//         // return an query error, not console.log it
//         // to add: reference for response for error: ['Error','Book could not be removed!']
//         db.collection('books').find({ _id: ObjectId(req.params.id) }).toArray((err, _book) => {
//             if (err) console.log(err);
//             tmpBook = _book;
//         })
//         db.collection('books').remove({_id : ObjectId(req.params.id)}, (err, _book) => {
//             if (err) console.log(err);
//             tmpBook.RESPONSE = ['Success', 'Book removed!'];
//             res.send(tmpBook);
//         });
//     } else {
//         sendUserError('Error: Parameter Missing. Book Id required.  DELETE /API/Book/:id', res);
//     }
// });

// server.post('/API/Vote', (req, res) => {
//     if(req.body.BOOK_ID !== undefined) {
//         const myquery = { BOOK_ID: req.body.BOOK_ID };
//         let newvalues;
//         switch(req.body.VOTE){
//             case 'UP':
//                 newvalues = { "VOTES.UP" : 1 }
//             break;
//             case 'DOWN':
//                 newvalues = { "VOTES.DOWN" : 1  }
//             break;
//         }
        
//         db.collection('books').findOneAndUpdate(
//             myquery,
//             { $inc: newvalues },
//             { upsert: true, returnNewDocument: true },
//             (err, _book) => {
//                 if (err) console.log(err);
//                 // todo, fix this!
//                 db.collection('books').find(myquery).toArray((err, result) => {
//                     result = result.pop();
//                     if(req.body.VOTE === 'UP') {
//                         result.RESPONSE = ['Success','You up voted a book!'];
//                     } else if ( req.body.VOTE === 'DOWN' ) {
//                         result.RESPONSE = ['Success','You down voted a book!'];
//                     } else {
//                         result.RESPONSE = ['Success','Your vote did not count!'];
//                     }   
//                     res.send(result);
//                 })
//             }
//         );      
//     } else {
//         return sendUserError('Error: Parameter Missing. Book Id required.', res);
//     }
// });
 
