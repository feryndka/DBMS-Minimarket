import express, { Router, Request, Response } from "express";
// Import DB Connection
import db from "./../connection/index";
import util from 'util'
const query : any = util.promisify(db.query).bind(db) // Handle Rollback Transaction
const router: Router = express.Router();

router.get("/admin", async(req : Request, res : Response): Promise<any> => {
  try {
    const findUser = await query(`SELECT * FROM admin`)

    res.status(200).send({
      error: false,
      message: "Success",
      data: findUser
    })
  } catch (err) {
    console.log(err)
  }
})

router.post("/admin-login", async(req : Request, res : Response): Promise<any> => {
  try {
    const { username, password }: {username: string, password: string} = req.body
    const findUser = await query(`SELECT * FROM admin WHERE username='${username}' AND password='${password}'`)

    if (!findUser.length) return res.status(400).send({
      error: true,
      message: 'Login Failed',
      data: null
    })

    res.status(200).send({
      error: false,
      message: "Login Success",
      data: findUser[0]
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/admin-transaction', async(req: Request, res: Response): Promise<void> => {
  try {
      const {startdate, enddate} = req.query
      const findTransactions = await query(`SELECT * FROM transactions WHERE createdAt >= '${startdate}' AND createdAt <= '${enddate}'`)
      
      res.status(200).send({
          error: false, 
          message: 'Get All Transaction Success!', 
          data: findTransactions
      })
  } catch (error) {
      console.log(error)
  }
})

router.get('/admin-income', async(req: Request, res: Response): Promise<void> => {
  try {
      const {startdate, enddate} = req.query
      const findTotal = await query(`SELECT SUM(total) as total FROM transactions WHERE createdAt >= '${startdate}' AND createdAt <= '${enddate}';`)

      res.status(200).send({
          error: false, 
          message: 'Get Total Income Success!', 
          data: findTotal
      })
  } catch (error) {
      console.log(error)
  }
})

export default router;