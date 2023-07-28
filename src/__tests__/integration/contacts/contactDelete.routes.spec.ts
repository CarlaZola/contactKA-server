import app from "../../../app";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../../../data-source";
import { Contact, User } from "../../../entities";
import supertest from "supertest";
import {
  createContactRouteMock,
  deleteUserRouteMock,
  errors,
  tokenRouteMock,
  updateContactRouteMock,
} from "../../mocks";

describe("DELETE --> /contact", () => {
  let connection: DataSource;
  let baseURL: string = "/contact";
  let repoUser: Repository<User>;
  let repoContact: Repository<Contact>;
  let user: User;
  let contact: Contact;
  let contactURL: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        repoUser = res.getRepository(User);
        repoContact = res.getRepository(Contact);
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const users: User[] = await repoUser.find();
    await repoUser.remove(users);

    user = await repoUser.save(deleteUserRouteMock.userComplete);
    contact = await repoContact.save(createContactRouteMock.userComplete);

    contactURL = baseURL + `/${contact.id}`;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success - Delete contact", async () => {
    const response = await supertest(app)
      .delete(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`);

    expect(response.status).toEqual(204);
    expect(response.body).toStrictEqual({});
  });

  it("Error - Delete contact invalid ID", async () => {
    const response = await supertest(app)
      .get(baseURL + "/456987")
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`);

    expect(response.status).toEqual(404);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.notFoundContact)
    );
  });

  it("Error - Delete contact without token", async () => {
    const response = await supertest(app).delete(contactURL);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.noToken)
    );
  });

  it("Error - Delete contact invalid token", async () => {
    const response = await supertest(app)
      .delete(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.jwtMalformed}`);
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidToken)
    );
  });
});
