import request from "supertest"
import app from "../../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"


describe("/POST --> user", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {
            console.log("Error during Data Source initialization", err)
        })
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("Expected to create a new user", async () => {
        
    })

})