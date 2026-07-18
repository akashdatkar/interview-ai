const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
// Require all the routes here
const authRouter=require('./routes/auth.routs');
const interviewRouter = require("./routes/interview.route")

const app=express();


app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow the deployed frontend origin (set FRONTEND_URL in env)
let frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
// If FRONTEND_URL was provided without protocol, default to https
if (!/^https?:\/\//i.test(frontendOrigin)) {
    frontendOrigin = `https://${frontendOrigin}`;
}

app.use(cors({
    origin: frontendOrigin,
    credentials: true, // Allow cookies to be sent
}));

// Use the routes here
app.use('/api/auth', authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app; 
