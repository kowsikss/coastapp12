
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/").then(() => console.log("MongoDB Connected"))
// .catch(err => console.error("MongoDB connection error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Trip Advisor Schema
// const tripAdvisorSchema = new mongoose.Schema({
//   placeName: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   numberOfDays: { type: Number, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// const TripAdvisor = mongoose.model('TripAdvisor', tripAdvisorSchema);

// // Routes

// // Signup
// app.post('/api/signup', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body)

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Login
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Error logging in' });
//   }
// });

// // Trip Advisor Form Submission
// app.post('/api/trip', async (req, res) => {
//   const { placeName, startDate, numberOfDays, userId } = req.body;

//   try {
//     const trip = new TripAdvisor({ placeName, startDate, numberOfDays, userId });
//     await trip.save();
//     res.status(201).json({ message: 'Trip saved successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error saving trip' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema (Signup & Login)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Trip Advisor Schema
const tripAdvisorSchema = new mongoose.Schema({
  placeName: { type: String, required: true },
  startDate: { type: Date, required: true },
  numberOfDays: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const TripAdvisor = mongoose.model('TripAdvisor', tripAdvisorSchema);

// Volunteer Schema for Eco Initiatives
const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  place: { type: String, required: true },
  address: { type: String, required: true },
  event: { type: String, required: true },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

// Routes

// Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Trip Advisor Form Submission
app.post('/api/trip', async (req, res) => {
  const { placeName, startDate, numberOfDays, userId } = req.body;

  try {
    const trip = new TripAdvisor({ placeName, startDate, numberOfDays, userId });
    await trip.save();
    res.status(201).json({ message: 'Trip saved successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error saving trip' });
  }
});

// Register Volunteer for Eco Initiatives
app.post('/api/volunteer', async (req, res) => {
  const { name, age, mobile, place, address, event } = req.body;

  try {
    const newVolunteer = new Volunteer({ name, age, mobile, place, address, event });
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer Registered Successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering volunteer.' });
  }
});

// Fetch All Volunteers
app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching volunteers.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
