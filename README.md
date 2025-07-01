## Library Management API

**Live API Link:** https://library-management-server-iota-bice.vercel.app/

### Steps for Setup

1. Clone this repository using following command

   ```
   git clone https://github.com/jabirsubaktagin16/library-management-server
   ```

2. After cloning the repository use following command to install node packages

   ```
   npm install
   ```

3. Create a `.env` file in the project folder and add following variables to denote some environment properties:
   - `NODE_ENV` : set the value to 'production' or 'development'
   - `PORT`: set the Port number to check the application
   - `DATABASE_URL`: Most importantly set the database url to access the database
4. After installing node packages and environment setup, run following command to test the application

   ```
   npm start
   ```

### API Endpoints and Testing

#### Book

**1. Create Book**

_API Endpoint (Method):_ `/api/books` (POST)

_Request:_

```
{
    "title": "Boundless Horizons",
    "author": "Amelia Grant",
    "genre": "BIOGRAPHY",
    "isbn": "978-1-22222-333-1",
    "description": "The life of an aviator who defied all odds.",
    "copies": 11,
    "available": true
}
```

_Response:_

```
{
    "success": true,
    "message": "Book created successfully",
    "data": {
        "title": "Boundless Horizons",
        "author": "Amelia Grant",
        "genre": "BIOGRAPHY",
        "isbn": "978-1-22222-333-1",
        "description": "The life of an aviator who defied all odds.",
        "copies": 11,
        "available": true,
        "_id": "6862c4d1e550838802308f91",
        "createdAt": "2025-06-30T17:09:38.043Z",
        "updatedAt": "2025-06-30T17:09:38.043Z",
        "__v": 0,
        "id": "6862c4d1e550838802308f91"
    }
}
```

To be noted, while adding the books some validation has been added. The validations are given below:

- Except _description_, all fields are mandatory
- User cannot entry any other genre except some fixed genre, and genres are read as enums
- _isbn_ is unique. If a user tries to entry same isbn to another request, it will throw an error and restrict user from adding new book
- _copies_ can never be negative number, it can be either 0 or more than that. If user tries to enter negative number, it will throw an error and restrict user from adding new book
- _available_ field is by default true

**2. Get All Books**

_API Endpoint (Method):_ `/api/books` (GET)

- Here the endpoint supports filtering, and sorting. For example a query can be following:
  `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### Query Parameters:

- `filter`: Filter by genre
- `sort`: `asc` or `desc`
- `limit`: Number of results (default: 10)

_Response:_

```
{
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
        {
            "_id": "686028ffc79d25b1e4c858bb",
            "title": "The Theory of Everything",
            "author": "Stephen Hawking",
            "genre": "SCIENCE",
            "isbn": "9780553380163",
            "description": "An overview of cosmology and black holes.",
            "copies": 5,
            "available": true,
            "createdAt": "2025-06-28T17:40:15.743Z",
            "updatedAt": "2025-06-28T17:40:15.743Z",
            "__v": 0,
            "id": "686028ffc79d25b1e4c858bb"
        },
        {
            "_id": "6860efc6fc22315501ee8505",
            "title": "A Quantum Journey",
            "author": "Dr. Samuel Price",
            "genre": "SCIENCE",
            "isbn": "978-0-98765-432-1",
            "description": "An accessible guide to the strange world of quantum mechanics.",
            "copies": 12,
            "available": true,
            "createdAt": "2025-06-29T07:48:22.928Z",
            "updatedAt": "2025-06-29T07:48:22.928Z",
            "__v": 0,
            "id": "6860efc6fc22315501ee8505"
        },
        {
            "_id": "6860efd2fc22315501ee8507",
            "title": "Winds of Eldoria",
            "author": "Kara L. Winters",
            "genre": "FANTASY",
            "isbn": "978-1-11223-334-4",
            "description": "A tale of magic, prophecy, and the struggle to save a realm.",
            "copies": 5,
            "available": false,
            "createdAt": "2025-06-29T07:48:34.673Z",
            "updatedAt": "2025-06-29T07:48:34.673Z",
            "__v": 0,
            "id": "6860efd2fc22315501ee8507"
        },
        {
            "_id": "6860eff2fc22315501ee850b",
            "title": "Echoes of War",
            "author": "Michael Branson",
            "genre": "HISTORY",
            "isbn": "978-1-99887-776-3",
            "description": "Personal accounts from soldiers in World War II.",
            "copies": 10,
            "available": true,
            "createdAt": "2025-06-29T07:49:06.138Z",
            "updatedAt": "2025-06-29T07:49:06.138Z",
            "__v": 0,
            "id": "6860eff2fc22315501ee850b"
        },
        {
            "_id": "6860effffc22315501ee850d",
            "title": "The Last Observatory",
            "author": "Naomi Patel",
            "genre": "SCIENCE",
            "isbn": "978-1-55678-910-2",
            "description": "Discoveries from the world's most remote telescope.",
            "copies": 7,
            "available": true,
            "createdAt": "2025-06-29T07:49:19.101Z",
            "updatedAt": "2025-06-29T07:49:19.101Z",
            "__v": 0,
            "id": "6860effffc22315501ee850d"
        },
        {
            "_id": "686133ad3ede052d225b1037",
            "title": "Under the Mango Tree",
            "author": "Priya Desai",
            "genre": "FICTION",
            "isbn": "978-1-44321-223-9",
            "description": "A coming-of-age story set in rural India.",
            "copies": 1,
            "available": true,
            "createdAt": "2025-06-29T12:38:05.370Z",
            "updatedAt": "2025-06-29T17:43:48.619Z",
            "__v": 0,
            "id": "686133ad3ede052d225b1037"
        },
        {
            "_id": "686133b83ede052d225b1039",
            "title": "The Alchemist's Secret",
            "author": "Leonard Voss",
            "genre": "FANTASY",
            "isbn": "978-1-00011-223-8",
            "description": "A hidden manuscript that could change the course of magic.",
            "copies": 4,
            "available": false,
            "createdAt": "2025-06-29T12:38:16.702Z",
            "updatedAt": "2025-06-29T12:38:16.702Z",
            "__v": 0,
            "id": "686133b83ede052d225b1039"
        },
        {
            "_id": "686133c23ede052d225b103b",
            "title": "Charting the Heavens",
            "author": "Dr. Fiona Mercer",
            "genre": "SCIENCE",
            "isbn": "978-1-77777-888-4",
            "description": "A history of astronomy from ancient times to today.",
            "copies": 0,
            "available": false,
            "createdAt": "2025-06-29T12:38:26.955Z",
            "updatedAt": "2025-06-29T15:51:57.631Z",
            "__v": 0,
            "id": "686133c23ede052d225b103b"
        },
        {
            "_id": "68617d994da2bb6d4d4ffade",
            "title": "The Silent Witness",
            "author": "Derek Holloway",
            "genre": "NON_FICTION",
            "isbn": "978-1-66666-555-2",
            "description": "A true crime investigation that shook a community.",
            "copies": 3,
            "available": false,
            "createdAt": "2025-06-29T17:53:29.108Z",
            "updatedAt": "2025-06-29T17:53:29.108Z",
            "__v": 0,
            "id": "68617d994da2bb6d4d4ffade"
        }
    ]
}
```

**3. Get Book by ID**

_API Endpoint (Method):_ `/api/books/:bookId` (GET)

_Response:_

```
{
    "success": true,
    "message": "Book retrieved successfully",
    "data": {
        "_id": "6862c4d1e550838802308f91",
        "title": "Boundless Horizons",
        "author": "Amelia Grant",
        "genre": "BIOGRAPHY",
        "isbn": "978-1-22222-333-1",
        "description": "The life of an aviator who defied all odds.",
        "copies": 11,
        "available": true,
        "createdAt": "2025-06-30T17:09:38.043Z",
        "updatedAt": "2025-06-30T17:09:38.043Z",
        "__v": 0,
        "id": "6862c4d1e550838802308f91"
    }
}
```

**4. Update Book**

_API Endpoint (Method):_ `/api/books/:bookId` (PUT)

_Request:_

```
{
	"copies":  15
}
```

_Response:_

```
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "6862c4d1e550838802308f91",
        "title": "Boundless Horizons",
        "author": "Amelia Grant",
        "genre": "BIOGRAPHY",
        "isbn": "978-1-22222-333-1",
        "description": "The life of an aviator who defied all odds.",
        "copies": 15,
        "available": true,
        "createdAt": "2025-06-30T17:09:38.043Z",
        "updatedAt": "2025-06-30T17:24:06.994Z",
        "__v": 0,
        "id": "6862c4d1e550838802308f91"
    }
}
```

**5. Delete Book**

_API Endpoint (Method):_ `/api/books/:bookId` (PUT)
_Response:_

```
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

To be noted, while deleting the books some validation has been added. The validations are given below:

- If a book does not exist it will send a response mentioning that the book does not exist
- If a book is borrowed and the book is deleted, then all borrowed history of the book will be deleted as well.

#### Borrow

**1. Borrow a Book**

_API Endpoint (Method):_ `/api/borrow` (POST)

Some business logics that were implemented to handle properly are given below:

- Verify the book has enough available copies. If a book doesn't have enough copies it will throw an error mentioning the book doesn't have enough copies.
- Requested quantity from the book’s copies will be deducted.
- If copies become 0, `available` will be updated to `false`. This mechanism has been implemented using static method

_Request:_

```
{
	"book":  "6862c4d1e550838802308f91",
	"quantity":  3,
	"dueDate":  "2025-07-10"
}
```

_Response:_

```
{
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
        "book": "6862c4d1e550838802308f91",
        "quantity": 3,
        "dueDate": "2025-07-10T00:00:00.000Z",
        "_id": "6863e5c99eccc173b84406d0",
        "createdAt": "2025-07-01T13:42:33.489Z",
        "updatedAt": "2025-07-01T13:42:33.489Z",
        "__v": 0,
        "id": "6863e5c99eccc173b84406d0"
    }
}
```

**2. Borrowed Books Summary**

_API Endpoint (Method):_ `/api/borrow` (GET)

Here, a summary of borrowed books will be returned, that includes:

- Total borrowed quantity per book (`totalQuantity`)
- Book details: `title` and `isbn`

_Response:_

```
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 3,
            "book": {
                "title": "Boundless Horizons",
                "isbn": "978-1-22222-333-1"
            }
        },
        {
            "totalQuantity": 5,
            "book": {
                "title": "Under the Mango Tree",
                "isbn": "978-1-44321-223-9"
            }
        }
    ]
}
```
