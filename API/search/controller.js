const mongoose = require('mongoose')

module.exports = {
  search: async (req, res) => {
    // Implement Search API End Point
    res.status(200).send('Search endpoint')
  }
}

// Old Code
// server.post('/API/Search', (req, res) => {
//     let q = {};
//     if(req.body.CATEGORY)
//         q.CATEGORIES = req.body.CATEGORY;
//     if(req.body.SUBCATEGORY)
//         q.SUBCATEGORIES = req.body.SUBCATEGORY;
//     if(req.body.SUBJECT)
//         q.SUBJECT = { $regex : req.body.SUBJECT, $options: 'i' };
//     if(req.body.AUTHOR)
//         q.AUTHOR = { $regex : req.body.AUTHOR, $options: 'i' };
//     if(req.body.TITLE)
//         q.TITLE = { $regex : req.body.TITLE, $options: 'i' };
//     if(req.body.ISBN)
//         q.ISBN = req.body.ISBN;
//     console.log(q);
//     db.collection('books').find(q).sort({ "VOTES.UP" : -1 }).toArray((err, _book) => {
//         if(_book.length === 0) {
//             _book = Object.create(_book);
//             _book.RESPONSE = ['Error','No Books found fitting your search!'];
//         }
//         res.send(
//             _book
//         );
//     });
// });