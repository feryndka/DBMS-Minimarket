import express, { Application } from 'express'
import transactionRouter from "./router/transactionRouter"

const app : Application = express()
app.use(express.json()) // Body Parser
const PORT : number = 5000

app.use("/api", transactionRouter)

app.listen(PORT, () => {
  console.log(`[SERVER] Server Running on Port : ${PORT}`)
})