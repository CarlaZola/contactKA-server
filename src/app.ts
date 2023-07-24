import "reflect-metadata"
import "express-async-errors"
import  express, { json }  from "express"
import clientRoutes from "./routes/user.routes"
import { handleErrors } from "./error"
import loginRoutes from "./routes/login.routes"


const app = express()
app.use(json())


app.use('/client', clientRoutes)
app.use('/login', loginRoutes)

app.use(handleErrors)


export default app