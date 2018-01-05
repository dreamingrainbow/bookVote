![book vote](https://i.imgur.com/sWNedkn.png)

# What is our MVP?

☑️ **HOMEPAGE**

**SEARCH**
* ☑️ Search Field  
┗ ☑️ Filters: Subject | Title | Author | ISBN
* ☑️ Search Results  
┗ ☑️ In order (descending) by votes

**BOOKS**
* ☑️ Add
* ☑️ Delete
* ☑️ Update

☑️ **VOTES**

**USER**
* ☑️ Register
* ❌ Verify
* ☑️ Login

# Secondary (Optional)

**SEARCH**
* Search Results  
┗ ❌ Book Images

**USER**
* ❌ Comments
* ❌ Book Reviews

**MISC**
* ❌ Styling
* ❌ Amazon Referral Links
* ❌ Migrate to Redux

# API End Points

### Search — Returns books from search query
```
/API/Search/{All|ISBN|TITLE|SUBJECT|AUTHOR}/:query
```

### Books — Returns an array of all books in the database
```
/API/Books/
  return Array of Book Objects
    {
      BOOK_ID: STRING,
      ISBN: STRING,
      SUBJECT: STRING,
      AUTHOR: STRING,
      VOTES: { UP: 0, DOWN: 0 }
     }
```

### Books — Return, update, or delete book by ID
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

### Voting System
```
/API/Vote
  POST
    {
      bookId,
      userId,
      up | down
    }
```

### Users — Add user
```
/API/User/Add
```

### Users — Delete user
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

# The Team
### Sean Valdivia
* Home Page Components
* Front End
### Anthony Tweed
* Sign In / Sign Up
* Front End
### Frank Faustino
* Wiki
* Search
* Front End
### Neil Barduson
* Server setup
* MongoDB Integration
### Michael Dennis
* Organizor
* Initial API Development