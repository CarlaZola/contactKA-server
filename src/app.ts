import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { json } from "express";
import clientRoutes from "./routes/user.routes";
import { handleErrors } from "./error";
import loginRoutes from "./routes/login.routes";
import { contactRoutes } from "./routes/contact.routes";

const app = express();
app.use(json());
app.use(cors({})); 

app.use("/client", clientRoutes);
app.use("/login", loginRoutes);
app.use("/contact", contactRoutes);

app.use(handleErrors);

export default app;
