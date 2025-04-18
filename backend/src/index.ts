import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import express, { Request, Response } from 'express'
import { productRouter } from './routers/productRouter'
import mongoose from 'mongoose'
import { userRouter } from './routers/userRouter'

dotenv.config()

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://savatonuser:ztXJ0GAUqhoe1MKHN@savaton.txz2hhj.mongodb.net/savatondb?retryWrites=true&w=majority&appName=Savaton'
const INDEXFRONTEND = process.env.NODE_ENV === 'development' ? 'http://localhost:5173/' : 'savaton-mern-72vfe3qt4-liubomyr-vernyks-projects.vercel.app'

mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })

const app = express()
app.use(
  cors({
    credentials: true,
    origin: [INDEXFRONTEND],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
// app.use('/api/orders', orderRouter)
// app.use('/api/seed', seedRouter)
// app.use('/api/keys', keyRouter)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

export const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
