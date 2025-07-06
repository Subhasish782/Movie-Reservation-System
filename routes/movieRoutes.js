// const express = require('express');
// const router = express.Router();
// const movieController = require('../controllers/movieController');


// router.get('/movies', movieController.getAllMovies);

// module.exports = router;

const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const multer = require("multer");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

router.get("/add", movieController.getAddMovie);
router.post("/add", upload.single("poster"), movieController.postAddMovie);
router.get("/movies", movieController.getAllMovies);

module.exports = router;
