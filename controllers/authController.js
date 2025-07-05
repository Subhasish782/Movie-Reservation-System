const User = require('../models/User');

// Show login page
exports.getLogin = (req, res) => {
  res.render('pages/login');
};

// Show register page
exports.getRegister = (req, res) => {
  res.render('pages/register');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/login');
  }

  req.session.userId = user._id;
  req.session.role = user.role;
  req.flash('success', 'Logged in successfully');
  res.redirect('/movies');
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    req.flash('success', 'Registration successful! Please login.');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', 'Registration failed. Email may already be in use.');
    res.redirect('/register');
  }
};

exports.logout = (req, res) => {
  req.flash('success', 'Logged out successfully.');
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
};

