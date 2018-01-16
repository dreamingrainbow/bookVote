const mongoose = require('mongoose')

module.exports = {
  vote: async (req, res) => {
    // Implement Vote API End Point
    res.status(200).send('Vote endpoint')
  }
}

// Old Code
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