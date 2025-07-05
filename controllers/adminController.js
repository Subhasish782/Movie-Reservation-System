const Reservation = require('../models/Reservation');
const Movie = require('../models/Movie');
const User = require('../models/User');

exports.getAddMovieForm = (req, res) => {
  res.render('pages/addMovie');
};

exports.createMovie = async (req, res) => {
  try {
    const { title, description, theater, showtimes } = req.body;

    const movie = new Movie({
      title,
      description,
      theater,
      showtimes: showtimes.split(',').map(t => new Date(t.trim())),
      posterUrl: req.file.path
    });

    await movie.save();
    res.redirect('/movies');
  } catch (err) {
    res.status(500).send("Failed to create movie");
  }
};
exports.getDashboard = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('movieId')
      .populate('userId')
      .sort({ createdAt: -1 });

    res.render('pages/dashboard', { reservations });
  } catch (err) {
    res.status(500).send('Error loading dashboard');
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.status(500).send('Delete failed');
  }
};

