const express = require("express");

const { addBook, updateBook, deleteBook, getBookById, getAllBooks, searchBook, invalidRouteHandle, getAllBooksAdmin } = require("../controller/bookController");
const router = express.Router();

router.route("/books").get(getAllBooksAdmin);
router.route("/books/:id").get(getAllBooks);
router.route("/addBook").post(addBook);
router.route("/book/:_id/:id").put(updateBook);
router.route("/book/:_id/:id").delete(deleteBook);
router.route("/book/:_id/:id").get(getBookById);
router.route("/search/:id/:key").get(searchBook);
router.route("*").get(invalidRouteHandle);

module.exports = router;