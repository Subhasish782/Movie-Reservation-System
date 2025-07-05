const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Movie.deleteMany();

  await Movie.insertMany([
    {
      title: "Oppenheimer",
      description: "Biopic about J. Robert Oppenheimer and the creation of the atomic bomb.",
      posterUrl: "/images/OPPENHEIMER.jpg",
      showtimes: [new Date(), new Date(Date.now() + 2 * 3600000)],
      theater: "PVR Kolkata"
    },
    {
      title: "Spider-Man: No Way Home",
      description: "Peter Parker faces multiversal chaos and past foes.",
      posterUrl: "/images/Spiderman.jpg",
      showtimes: [new Date(), new Date(Date.now() + 3 * 3600000)],
      theater: "INOX City Centre"
    },
    {
      title: "Avatar: The Way of Water",
      description: "Return to Pandora as Jake Sully and Neytiri protect their family.",
      posterUrl:"/images/Avatar The Way of Water.jpg",
      showtimes: [new Date(), new Date(Date.now() + 4 * 3600000)],
      theater: "Cinepolis South City"
    },
    {
      title: "The Batman",
      description: "Batman uncovers corruption in Gotham while pursuing the Riddler.",
      posterUrl: "/images/The Batman.jpg",
      showtimes: [new Date(), new Date(Date.now() + 3600000)],
      theater: "INOX Quest Mall"
    },
    {
      title: "Top Gun: Maverick",
      description: "Pete 'Maverick' Mitchell mentors Top Gun graduates on a high-stakes mission.",
      posterUrl:"/images/Topgun.jpg",
      showtimes: [new Date(), new Date(Date.now() + 5 * 3600000)],
      theater: "PVR Mani Square"
    },
    {
      title: "John Wick: Chapter 4",
      description: "John Wick uncovers a path to defeating The High Table, but must face a new enemy.",
      posterUrl: "/images/John Wick 4.jpg",
      showtimes: [new Date(), new Date(Date.now() + 2 * 3600000)],
      theater: "INOX Highland Park"
    }
  ]);

  console.log("✅ Dummy movies inserted successfully!");
  process.exit();
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1);
});
