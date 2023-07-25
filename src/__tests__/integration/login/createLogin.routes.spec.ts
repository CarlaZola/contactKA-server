import app from "../../../app"
import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import { User } from "../../../entities"
import supertest from "supertest"
import { createLoginRouteMock, errors } from "../../mocks"



describe("POST -> /login", () => {
    let connection: DataSource
    let baseURL: string = "/login"
    let repoUser: Repository<User> 
    
    beforeAll(async() => {
        await AppDataSource.initialize()
        .then((res) => {
            connection = res
            repoUser = res.getRepository(User)
        })
        .catch((err) => {
            console.log("Error during Data Source initialization", err)
        })
    })

    beforeEach(async () => {
        const users: User[] = await repoUser.find()
        await repoUser.remove(users)
    })

    afterAll(async () => {
        await connection.destroy()
    })


    it("Success - Login", async () => {
        const login = repoUser.create(createLoginRouteMock.loginSuccess)
        await repoUser.save(login)

        const response = await supertest(app)
        .post(baseURL)
        .send(createLoginRouteMock.loginSuccess)

        expect(response.status).toEqual(200)
        expect(response.body).toStrictEqual(expect.objectContaining({
            token: expect.any(String)
        }))

    })

    it("Error - Invalid data -> email", async() => {
        const login = repoUser.create(createLoginRouteMock.loginSuccess)
        await repoUser.save(login)

        const response = await supertest(app)
        .post(baseURL)
        .send(createLoginRouteMock.userInvalidCredential1)

        expect(response.status).toEqual(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.invalidCredentials))
    })

    it("Error - Invalid data -> password", async() => {
        const login = repoUser.create(createLoginRouteMock.loginSuccess)
        await repoUser.save(login)

        const response = await supertest(app)
        .post(baseURL)
        .send(createLoginRouteMock.userInvalidCredential2)

        expect(response.status).toEqual(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.invalidCredentials))
    })
})