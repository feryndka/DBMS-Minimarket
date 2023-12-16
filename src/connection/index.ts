import mysql from 'mysql2'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fery@1503',
  database: 'transaction_db'
})

db.connect((err : any) => {
  if (err) return console.log(err) 
  console.log("Connected to Database")
})

export default db