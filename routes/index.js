const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/bookControllers");

router.post("/add", bookControllers.addBook);
router.get("/add", bookControllers.getAllBooks);
router.get("/add/:bookId", bookControllers.getBooksById);
router.put("/add/:bookId", bookControllers.editBookById);
router.delete("/add/:bookId", bookControllers.deleteById);

module.exports = router;
