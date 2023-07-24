import "reflect-metadata"
import "express-async-errors"
import  express, { json }  from "express"
import clientRoutes from "./routes/user.routes"
import { handleErrors } from "./error"


const app = express()
app.use(json())


app.use('/client', clientRoutes)


app.use(handleErrors)


export default app