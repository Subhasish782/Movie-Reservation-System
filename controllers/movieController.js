const Movie = require('../models/Movie');

// GET /movies - show all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.render('pages/movies', { movies });
  } catch (err) {
    res.status(500).send('Error loading movies');
  }
};

exports.getAddMovie = (req, res) => {
  res.render("pages/movie");
};

exports.postAddMovie = async (req, res) => {
  try {
    const { title, description, genre, theater, showtimes } = req.body;

    const newMovie = new Movie({
      title,
      description,
      genre,
      theater,
      showtimes: showtimes.split(",").map(t => new Date(t.trim())),
      posterUrl: req.file.path
    });

    await newMovie.save();
    req.flash("success", "Movie added successfully!");
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to add movie.");
    res.redirect("/movies/add");
  }
};