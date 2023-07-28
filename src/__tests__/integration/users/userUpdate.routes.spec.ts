import app from "../../../app";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../../../data-source";
import { User } from "../../../entities";
import supertest from "supertest";
import { updateUserRouteMock, errors, tokenRouteMock } from "../../mocks";

describe("PATCH --> /client", () => {
  let connection: DataSource;
  let baseURL: string = "/client";
  let repoUser: Repository<User>;
  let user: User;
  let userURl: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        repoUser = res.getRepository(User);
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const users: User[] = await repoUser.find();
    await repoUser.remove(users);

    user = await repoUser.save(updateUserRouteMock.userTemplate);

    userURl = baseURL + `/${user.id}`;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success - Updated user -> full body", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userComplete);

    const { password, ...bodyEqual } = updateUserRouteMock.userComplete;

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

  it("Success - Updated user -> partial body", async () => {
    const response = await supertest(app)
      .patch(userURl)
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

  it("Error - Update user with invalid ID", async () => {
    const response = await supertest(app)
      .patch(baseURL + `/456789`)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userComplete);

    expect(response.status).toEqual(404);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.notFoundUser)
    );
  });

  it("Error - Update user without token", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .send(updateUserRouteMock.userComplete);

    expect(response.status).toEqual(401);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.noToken)
    );
  });

  it("Error - Update user cellphone with invalid format -> (xx) xxxxx-xxxx", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userInvalidPhone);

    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidPhone)
    );
  });

  it("Error - Update user with invalid token", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .set("Authorization", `Bearer ${tokenRouteMock.jwtMalformed}`)
      .send(updateUserRouteMock.userComplete);

    expect(response.status).toEqual(401);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidToken)
    );
  });

  it("Error - Update user with email already exists", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userUniqueEmail);

    expect(response.status).toEqual(409);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.emailExists)
    );
  });

  it("Error - Update user with invalid email", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userInvalidEmail);

    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidEmail)
    );
  });

  it("Error - Update user with full_name already exists", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userUniqueName);

    expect(response.status).toEqual(409);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.nameExists)
    );
  });

  it("Error - Update user with invalid full_name", async () => {
    const response = await supertest(app)
      .patch(userURl)
      .set("Authorization", `Bearer ${tokenRouteMock.genToken(user.id)}`)
      .send(updateUserRouteMock.userInvalidName);

    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(
      expect.objectContaining(errors.invalidName)
    );
  });
});
