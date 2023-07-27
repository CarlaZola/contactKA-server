import app from "../../../app"
import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import { Contact, User } from "../../../entities"
import supertest from "supertest"
import { createContactRouteMock, createUserRouteMock, errors, tokenRouteMock } from "../../mocks"


describe("POST --> /contact", () => {
    let connection: DataSource
    let baseURL: string = '/contact'
    let repoUser: Repository<User> 
    let repoContact: Repository<Contact>
    let user: User;
    let contact: Contact
    let contactURL: string
    

    beforeAll(async() => {
        await AppDataSource.initialize()
        .then((res) => {
            connection = res
            repoUser = res.getRepository(User)
            repoContact = res.getRepository(Contact)
        })
        .catch((err) => {
            console.log("Error during Data Source initialization", err)
        })
    })

    beforeEach(async() => {
        const users: User[] = await repoUser.find();
        await repoUser.remove(users);

        const contacts: Contact[] = await repoContact.find();
        await repoContact.remove(contacts);

        user = await repoUser.save(createUserRouteMock.userComplete)
        contact = await repoContact.save(createContactRouteMock.userComplete)

        contactURL = baseURL + `/${contact.id}`
    })

    afterAll(async () => {
        await connection.destroy();
    });


    it("Success - Expected to create a new contact -> Full body", async() => {
        const response = await supertest(app)
        .post(baseURL)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )
        .send({...createContactRouteMock.userComplete2, userId: user.id})

        const { ...bodyEqual} = createContactRouteMock.userComplete2

        expect(response.status).toEqual(201)
        expect(response.body).toEqual(expect.objectContaining(bodyEqual))
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            createdAt: expect.any(String)
        }))
    })

    it("Success - Expected to create a new contact -> Partial body", async() => {
        

        const response = await supertest(app)
        .post(baseURL)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )
        .send({...createContactRouteMock.userWithoutNickname, userId: user.id})

        const { ...bodyEqual} = createContactRouteMock.userWithoutNickname

        expect(response.status).toEqual(201)
        expect(response.body).toEqual(expect.objectContaining(bodyEqual))
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            createdAt: expect.any(String)
        }))
    })
})