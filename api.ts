import express from 'express'
import cors from 'cors'
import { photoRouter } from './src/routers/Photo-router'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/photos', photoRouter)

const port =5001
app.listen(port, ()=>{
    console.log("listening on port", port)
})