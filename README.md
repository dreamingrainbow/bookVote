# What is our MVP?

**HOMEPAGE**

**SEARCH**  
* Search Field  
┗ Filters: Subject | Title | Author | ISBN  
* Search Results  
┗ In order (descending) by votes  

**ADD | UPDATE | DELETE | VOTES**

**USER**
* Register
* Verify
* Login

# Secondary (Optional)

**SEARCH**
* Search Results  
┗ Book Images

**USER**
* Comments
* Book Reviews

# API End Points

```
/API/Search/{All|ISBN|TITLE|SUBJECT|AUTHOR}/:query
```
```
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
  POST
    {
      bookId,
      userId,
      up | down
    }
```
```
/API/User/Add
```
```
/API/User/Delete
```

# Book Object

``` JavaScript
[
    {
        "BOOK_ID": null,
        "ISBN": null,
        "SUBJECT": null,
        "AUTHOR": null,
        "TITLE": null,
        "VOTES": {
            "UP": 0,
            "DOWN": 0
        }
    },
    {
        "BOOK_ID": "47c77d9d-3b2e-4b56-9257-34d63090aa82",
        "ISBN": "SOM-NUM-4555",
        "SUBJECT": "MATH",
        "AUTHOR": "Test_@",
        "TITLE": "Test_@",
        "VOTES": {
            "UP": 0,
            "DOWN": 0
        }
    }
]
```