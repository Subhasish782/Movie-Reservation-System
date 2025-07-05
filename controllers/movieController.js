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
