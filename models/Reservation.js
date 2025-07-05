const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  showtime: Date,
  seats: [String] 
}, { timestamps: true });


module.exports = mongoose.model('Reservation', reservationSchema);
