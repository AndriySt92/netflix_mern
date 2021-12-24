import express from "express"
import mongoose from 'mongoose'
import dotenv from "dotenv"
import authRoute from './routes/auth'

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000

mongoose
    //@ts-ignore
  .connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err: String) => {
    console.error(err);
  });

  app.use("/api/auth", authRoute);

app.listen(port, () => {
 console.log(`server is listening on ${port}`);
});  