const Movie = require('../models/Movie');
const Reservation = require('../models/Reservation');

exports.getReservationPage = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    const reservations = await Reservation.find({ movieId: movie._id });
    const bookedSeats = reservations.flatMap(r => r.seats);

    res.render('pages/reserve', { movie, bookedSeats });
  } catch (err) {
    res.status(500).send('Error loading reservation page');
  }
};

exports.postReservation = async (req, res) => {
  const movieId = req.params.id;
  const userId = req.session.userId;
  const selectedSeats = req.body.selectedSeats?.split(',') || [];
  const selectedShowtime = req.body.selectedShowtime;

  if (!userId) return res.redirect('/login');

  try {
    const existing = await Reservation.find({ movieId });
    const allBooked = existing.flatMap(r => r.seats);

    const conflict = selectedSeats.some(seat => allBooked.includes(seat));
    if (conflict) {
      req.flash('error', 'Some seats are already booked.');
      return res.redirect(`/reserve/${movieId}`);
    }

    const reservation = new Reservation({
      userId,
      movieId,
      showtime: selectedShowtime,
      seats: selectedSeats
    });

    await reservation.save();
    req.flash('success', 'Reservation successful!');
    res.redirect('/my-bookings');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Reservation failed.');
    res.redirect(`/reserve/${movieId}`);
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.session.userId })
      .populate('movieId')
      .sort({ createdAt: -1 });

    res.render('pages/myBookings', {
      reservations, // ✅ Pass to EJS view
      success: req.flash('success'),
      error: req.flash('error'),
      session: req.session
    });
  } catch (err) {
    console.error("❌ Error fetching reservations:", err);
    req.flash('error', 'Could not load your reservations.');
    res.redirect('/movies');
  }
};



exports.cancelBooking = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId
    });

    if (!reservation) {
      req.flash('error', 'Reservation not found');
      return res.redirect('/my-bookings');
    }

    req.flash('success', 'Reservation cancelled successfully');
    res.redirect('/my-bookings');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to cancel reservation');
    res.redirect('/my-bookings');
  }
};
