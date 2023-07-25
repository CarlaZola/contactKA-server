import app from "../../../app"
import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import { User } from "../../../entities"
import supertest from "supertest"
import { deleteUserRouteMock, errors, tokenRouteMock } from "../../mocks"


describe("DELETE --> /client", () => {
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

        user = await repoUser.save(deleteUserRouteMock.userComplete)

        userURl = baseURL + `/${user.id}`
    })

    afterAll(async () => {
        await connection.destroy();
    });

    it("Success - Delete user", async () => {
        const response = await supertest(app)
        .delete(userURl)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )

        expect(response.status).toEqual(204)
        expect(response.body).toStrictEqual({})
    })

    it("Error - Delete user invalid ID", async () => {
        const response = await supertest(app)
        .delete(baseURL+'/456987')
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )

        expect(response.status).toEqual(404)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.notFoundUser))
    })

    it("Error - Delete user without token", async() => {
        const response =  await supertest(app)
        .delete(userURl)

        expect(response.status).toBe(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.noToken));
    })

    it("Error - Delete user invalid token", async() => {
        const response =  await supertest(app)
        .delete(userURl)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.jwtMalformed}`
        )
        expect(response.status).toBe(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.invalidToken));
    })

})