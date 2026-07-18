const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
// Require all the routes here
const authRouter=require('./routes/auth.routs');
const interviewRouter = require("./routes/interview.route")

const app=express();


app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow deployed frontend origin(s) from env
const rawFrontends = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = rawFrontends
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map((origin) => (/^https?:\/\//i.test(origin) ? origin : `https://${origin}`));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Use the routes here
app.use('/api/auth', authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app; 
