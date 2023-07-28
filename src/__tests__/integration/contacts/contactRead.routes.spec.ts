import app from "../../../app"
import { DataSource, Repository } from "typeorm"
import AppDataSource from "../../../data-source"
import { Contact, User } from "../../../entities"
import supertest from "supertest"
import { createContactRouteMock, createUserRouteMock, errors, readUserRouteMock, tokenRouteMock, updateContactRouteMock, updateUserRouteMock } from "../../mocks"


describe("GET --> /contact", () => {
    let connection: DataSource 
    let user: User
    let contact: Contact
    let repoUser: Repository<User>
    let repoContact: Repository<Contact>
    let baseURL: string = '/contact'
    let contactURL: string


    beforeAll( async() => {
        await AppDataSource.initialize()
        .then((res) => {
            connection = res
            repoUser = res.getRepository(User)
            repoContact = res.getRepository(Contact)

        }).catch((err) => {
            console.log("Error during Data Source initialization", err)
        })
    })
  
    beforeEach(async () => {
        const contacts: Contact[] = await repoContact.find();
        await repoContact.remove(contacts);

        contact = await repoContact.save(createContactRouteMock.userComplete)

        user = await repoUser.save(createUserRouteMock.userComplete)

        contactURL = baseURL + `/${contact.id}`

    })

    afterAll(async() =>{
        await connection.destroy()
    })


    it("Success - List contact by ID", async() => {
        const response = await supertest(app)
        .get(contactURL)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )

        const { ...bodyEqual } = createContactRouteMock.userComplete
        expect(response.status).toEqual(200)
        expect(response.body).toStrictEqual(expect.objectContaining({
            ...bodyEqual
        }))
    })

    it("Error - List contact invalid ID", async() => {
        const response = await supertest(app)
        .get(baseURL+'/456987')
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.genToken(user.id)}`
        )

        expect(response.status).toEqual(404)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.notFoundContact))
    })

    it("Error - List contact without token", async() => {
        const response =  await supertest(app)
        .get(contactURL)

        expect(response.status).toBe(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.noToken));
    })

    it("Error - List contact invalid token", async() => {
        const response =  await supertest(app)
        .get(contactURL)
        .set(
            'Authorization',
            `Bearer ${tokenRouteMock.jwtMalformed}`
        )
        expect(response.status).toBe(401)
        expect(response.body).toStrictEqual(expect.objectContaining(errors.invalidToken));
    })

})