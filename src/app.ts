import "reflect-metadata"
import "express-async-errors"
import  express, { json }  from "express"


const app = express()

app.use(json())


export default app