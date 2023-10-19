const Book = require("../models/bookModel");

//getAllBooksAdmin
exports.getAllBooksAdmin = async (req, res) => {
    try {
        let books = await Book.find();
        if (books.length > 0) {
            res.send(books);
        }
        else {
            res.send({ result: "No book found !!" })
        }
    }
    catch (error) {
        console.log("error ", error)
    }
}

//getAllBooks
exports.getAllBooks = async (req, res) => {
    try {
        let books = await Book.find({ UserId: req.params.id });
        if (books.length > 0) {
            res.send(books);
        }
        else {
            res.send({ result: "No book found !!" })
        }
    }
    catch (error) {
        console.log("error ", error)
    }
}

//getBookById
exports.getBookById = async (req, res) => {
    try {
        let result = await Book.findOne({ "$and": [{ _id: req.params._id }, { UserId: req.params.id }] })
        if (result) {
            res.send(result);
        }
        else {
            res.send({ result: "No record found !! " })
        }
    } catch (error) {
        console.log("error ", error)
    }

}


//addBook
exports.addBook = async (req, res) => {
    try {
        console.log("req.body = ", req.body)
        var data = req.body;
        var bookdata = await Book.create(data);
        res.status(200).json({
            status: "OK",
            data
        })
        console.log("Addbook = ", bookdata);
    } catch (error) {
        console.log("error = ", error)
    }
}

//updateBook
exports.updateBook = async (req, res) => {
    try {
        let result = await Book.updateOne(
            { "$and": [{ _id: req.params._id }, { UserId: req.params.id }] },
            {
                $set: req.body
            }
        )
        console.log(req.body);
        console.log(result);
        res.status(200).send(result);
    }
    catch (error) {
        console.log("error ", error)
    }
}

//deleteBook
exports.deleteBook = async (req, res) => {
    try {
        let result = await Book.findOne({ "$and": [{ _id: req.params._id }, { UserId: req.params.id }] })
        const deleteBook = await Book.deleteOne(result);
        res.send(deleteBook);
    }
    catch (error) {
        console.log("error ", error)
    }
}

//seachBook
exports.searchBook = async (req, res) => {
    try {
        let result = await Book.find({
            "$and": [{ UserId: req.params.id }, {
                "$or": [
                    { Booktitle: { $regex: req.params.key } },
                    { Bookpages: { $regex: req.params.key } },
                    { Bookdescription: { $regex: req.params.key } },
                    { Bookauthor: { $regex: req.params.key } },
                    { Bookprice: { $regex: req.params.key } },
                    { Bookimage: { $regex: req.params.key } },

                ]
            }]

        });
        res.send(result);
    } catch (error) {
        console.log("error ", error)
    }
}

//seachBookAdmin
exports.searchBookAdmin = async (req, res) => {
    try {
        let result = await Book.find({
            "$or": [
                { Booktitle: { $regex: req.params.key } },
                { Bookpages: { $regex: req.params.key } },
                { Bookdescription: { $regex: req.params.key } },
                { Bookauthor: { $regex: req.params.key } },
                { Bookprice: { $regex: req.params.key } },
                { Bookimage: { $regex: req.params.key } },
            ]
        });
        res.send(result);
    } catch (error) {
        console.log("error ", error)
    }
}

//invalidRouteHandle 
exports.invalidRouteHandle = (req, res) => {
    try {
        console.log("this is called of books");
        res.end(`404 page not found`);
    } catch (error) {
        console.log("error ", error)
    }
}