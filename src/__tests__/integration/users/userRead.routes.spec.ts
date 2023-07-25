import app from "../../../app"
import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import { User } from "../../../entities"
import supertest from "supertest"
import { readUserRouteMock, errors, tokenRouteMock } from "../../mocks"
import { user } from "../../../schemas/user.schema"
import { array } from "zod"


describe("GET --> /client", () => {
    let connection: DataSource
    let baseURL: string = "/client"
    let repoUser: Repository<User> 
    let user: User;
    let userURl: string


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

    beforeEach(async() => {
        const users: User[] = await repoUser.find();
        await repoUser.remove(users);

        user = await repoUser.save(readUserRouteMock.userComplete)

        userURl = baseURL + `/${user.id}`
    })

    afterAll(async () => {
        await connection.destroy();
    });

    it("Success - List user by ID", async() => {
        const response = await supertest(app)
        .get(userURl)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )

        const { password, ...bodyEqual } = readUserRouteMock.userComplete
        expect(response.status).toEqual(200)
        expect(response.body).toStrictEqual(expect.objectContaining({
            ...bodyEqual,
            contacts: expect.any(Array)
        }))
    })

    it("Error - List user invalid ID", async() => {
        const response = await supertest(app)
        .get(baseURL+'/456987')
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )

        expect(response.status).toEqual(404)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.notFoundUser))
    })

    it("Error - List user without token", async() => {
        const response =  await supertest(app)
        .get(userURl)

        expect(response.status).toBe(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.noToken));
    })

    it("Error - List user invalid token", async() => {
        const response =  await supertest(app)
        .get(userURl)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.jwtMalformed}`
        )
        expect(response.status).toBe(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.invalidToken));
    })

})