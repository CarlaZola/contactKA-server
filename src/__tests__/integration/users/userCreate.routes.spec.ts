import request from "supertest"
import app from "../../../app"
import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import { User } from "../../../entities"
import supertest from "supertest"
import { createUserRouteMock, errors } from "../../mocks"

describe("/POST --> users", () => {
    const baseURL: string = "/client"
    let connection: DataSource
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

    it("Success - Expected to create a new user -> Full body", async () => {
        const response = await supertest(app)
        .post(baseURL)
        .send(createUserRouteMock.userComplete)

        const {password, ...bodyEqual} = createUserRouteMock.userComplete

        expect(response.status).toEqual(201)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toEqual(expect.objectContaining(bodyEqual))
        expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              createdAt: expect.any(String),
              deletedAt: null,
            })
          );
    })


    it("Success - Expected to create a new user -> Partial body - without nickname", async () => {
        const response = await supertest(app)
        .post(baseURL)
        .send(createUserRouteMock.userWithoutNickname)

        const {full_name, phone, email } = createUserRouteMock.userWithoutNickname

        expect(response.status).toEqual(201)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            full_name:  full_name,
            phone: phone,
            email :email,
            createdAt: expect.any(String),
            deletedAt: null
        }))
    })


    it("Error - Invalid format phone -> (xx) xxxxx-xxxx", async () => {
        const response = await supertest(app)
        .post(baseURL)
        .send(createUserRouteMock.userInvalidPhone)

        expect(response.status).toEqual(400)
        expect(response.body).toEqual(expect.objectContaining(errors.invalidPhone))

    })

    it("Error - Invalid email", async () => {
        const response = await supertest(app)
        .post(baseURL)
        .send(createUserRouteMock.userInvalidEmail)

        expect(response.status).toEqual(400)
        expect(response.body).toEqual(expect.objectContaining(errors.invalidEmail))
    })

    it("Error - Email already exists", async () => {
        const user = repoUser.create(createUserRouteMock.userUniqueEmail)
        await repoUser.save(user)

        const response = await supertest(app)
        .post(baseURL)
        .send(createUserRouteMock.userUniqueEmail)


        expect(response.status).toEqual(409)
        expect(response.body).toStrictEqual(errors.emailExists)


    })

    it("Error - Name already exists", async () => {
        const user = repoUser.create(createUserRouteMock.userUniqueName)
        await repoUser.save(user)

        const response = await supertest(app)
        .post(baseURL)
        .send(createUserRouteMock.userUniqueName2)

        expect(response.status).toEqual(409)
        expect(response.body).toStrictEqual(errors.nameExists)
    })

})