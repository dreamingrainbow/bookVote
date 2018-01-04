# What is our MVP?

**ISBN**

**TITLE**

**SUBJECT**

**AUTHOR**

**Search | Add | Update | Delete | Vote**

**User | Register | Verify | Login**


# API End Points

```
/API/Search/{All|ISBN|TITLE|SUBJECT|AUTHOR}/:query

/API/Books/
  return Array if Book Objects
    {
      BOOK_ID: STRING,
      ISBN: STRING,
      SUBJECT: STRING,
      AUTHOR: STRING,
      VOTES: { UP: 0, DOWN: 0 }
     }
```
```
/API/Book/:id
  GET/POST/PUT/DELETE
    {
      BOOK_ID: STRING,
      ISBN: STRING,
      SUBJECT: STRING,
      AUTHOR: STRING,
      VOTES: { UP: 0, DOWN: 0 },
      RESPONSE: [Success | Error, "Message"]
     }
```
```
/API/Vote
<<<<<<< HEAD
  POST
    {
      bookId,
      userId,
      up | down
    }
```
```
=======
	POST
		{
		  BOOK_ID,
		  VOTE: up | down
		}

>>>>>>> 9986982b9b305b1911f60fe21337d46166045af9
/API/User/Add
```
```
/API/User/Delete
```
