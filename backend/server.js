import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import patientRouter from "./routes/patientRoutes.js"

//initialize express app
const app = express();

//function call top connect with DB 
connectDB();

//port number
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mediease-ai-prescription-records-app-1.onrender.com"
  ],
  credentials: true
}));



//API endpoints
app.get('/', (req,res) => res.send("API is Working fine"));
app.use('/api/auth', authRouter);
app.use('/api/patients', patientRouter);


//  Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
