const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
// Require all the routes here
const authRouter=require('./routes/auth.routs');
const interviewRouter = require("./routes/interview.route")

const app=express();


app.use(express.json());
app.use(cookieParser());

// Allow actual browser origins so cross-domain login/register works with credentials.
app.use(cors({
  origin: true,
  credentials: true,
}));

// Use the routes here
app.use('/api/auth', authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app; 
