const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const flash = require('connect-flash');

dotenv.config();
const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser and method override
app.use(cookieParser());
app.use(methodOverride('_method'));

// Session middleware (required before flash)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Flash middleware
app.use(flash());

// Global variables for all views (flash + session)
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.session = req.session;
  next();
});

//Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

//Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.use('/', require('./routes/mainRoutes'));
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/movieRoutes'));
app.use('/', require('./routes/reservationRoutes'));
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/adminRoutes'));

//Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected✅');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.log('❌ MongoDB connection error:', err));