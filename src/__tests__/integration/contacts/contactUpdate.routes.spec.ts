import app from "../../../app";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../../../data-source";
import { Contact, User } from "../../../entities";
import supertest from "supertest";
import {
  createUserRouteMock,
  errors,
  tokenRouteMock,
  updateContactRouteMock,
  updateUserRouteMock,
} from "../../mocks";

describe("PATCH --> /contacts", () => {
  let connection: DataSource;
  let repoContact: Repository<Contact>;
  let repoUser: Repository<User>;
  let baseURL: string = "/contact";
  let contactURL: string;
  let user: User;
  let contact: Contact;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        repoContact = res.getRepository(Contact);
        repoUser = res.getRepository(User);
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const contacts: Contact[] = await repoContact.find();
    await repoContact.remove(contacts);

    contact = await repoContact.save(updateContactRouteMock.userTemplate);
    user = await repoUser.save(createUserRouteMock.userComplete);

    contactURL = baseURL + `/${contact.id}`;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success - Updated contact -> full body", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateContactRouteMock.userComplete2);

    const { ...bodyEqual } = updateContactRouteMock.userComplete2;

    expect(response.status).toEqual(200);
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        ...bodyEqual,
        id: user.id,
      })
    );
  });

  it("Success - Updated contact -> partial body", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userPartial);

    const { ...bodyEqual } = updateUserRouteMock.userPartial;

    expect(response.status).toEqual(200);
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        ...bodyEqual,
        id: user.id,
      })
    );
  });

  it("Error - Update contact with invalid ID", async () => {
    const response = await supertest(app)
      .patch(baseURL + `/456789`)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateContactRouteMock.userComplete2);

    expect(response.status).toEqual(404);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.notFoundContact)
    );
  });

  it("Error - Update contact without token", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .send(updateContactRouteMock.userComplete2);

    expect(response.status).toEqual(401);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.noToken)
    );
  });

  it("Error - Update contact cellphone with invalid format -> (xx) xxxxx-xxxx", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateContactRouteMock.userInvalidPhone);

    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidPhone)
    );
  });

  it("Error - Update user with invalid token", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.jwtMalformed}`)
      .send(updateContactRouteMock.userComplete2);

    expect(response.status).toEqual(401);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidToken)
    );
  });

  it("Error - Update contact with email already exists", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateContactRouteMock.userUniqueEmail);

    expect(response.status).toEqual(409);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.emailExists)
    );
  });

  it("Error - Update user with invalid email", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateContactRouteMock.userInvalidEmail);

    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidEmail)
    );
  });

  it("Error - Update contact with full_name already exists", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateContactRouteMock.userUniqueName);

    expect(response.status).toEqual(409);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.nameExists)
    );
  });

  it("Error - Update contact with invalid full_name", async () => {
    const response = await supertest(app)
      .patch(contactURL)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateContactRouteMock.userInvalidName);

    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidName)
    );
  });
});
