import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth'
import listRoute from './routes/list'
import movieRoute from './routes/movie'
import userRoute from './routes/users'

const app = express()
dotenv.config()
app.use(express.json())

let allowCrossDomain = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  )

  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

const port = process.env.PORT || 5000

mongoose
  //@ts-ignore
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log('DB Connection Successfull'))
  .catch((err: String) => {
    console.error(err)
  })

app.use('/api/auth', authRoute)
app.use('/api/lists', listRoute)
app.use('/api/movies', movieRoute)
app.use('/api/users', userRoute)

app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
