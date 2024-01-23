import request from "supertest";
import app from "../../server";
import prisma from "../../db";
import * as userHandlers from "../user";

jest.mock("../user");

const mockedCreateNewUser = userHandlers.createNewUser as unknown as jest.Mock<
  typeof userHandlers.createNewUser
>;
const mockedSignin = userHandlers.signin as unknown as jest.Mock<
  typeof userHandlers.signin
>;

// Intergration Test
const actualUserHandlers = jest.requireActual("../user");

beforeEach(() => {
  mockedCreateNewUser.mockImplementation((req, res): any => {
    return actualUserHandlers.createNewUser(req, res);
  });
});

describe("POST /user", () => {
  it("should create a new user", async () => {
    const mockPayload = {
      firstName: "Bob",
      lastName: "Man",
      color: "#732424",
      email: "bobman@test.com",
      password: "password",
    };

    const res = await request(app)
      .post("/user")
      .send(mockPayload)
      .set("Accept", "application/json");

    // Cleanup
    await prisma.userEnergyLevel.deleteMany({
      where: {
        userId: res.body.userId,
      },
    });

    await prisma.user.delete({
      where: {
        id: res.body.userId,
      },
    });

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(mockPayload.firstName);
    expect(res.body.lastName).toBe(mockPayload.lastName);
    expect(res.body.email).toBe(mockPayload.email);
  });

  it("should throw an error for missing firstName", async () => {
    const mockPayload = {
      lastName: "Man",
      color: "#732424",
      email: "bobman@test.com",
      password: "password",
    };

    const res = await request(app)
      .post("/user")
      .send(mockPayload)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required field(s)");
  });

  it("should throw an error for missing email", async () => {
    const mockPayload = {
      firstName: "Bob",
      lastName: "Man",
      color: "#732424",
      password: "password",
    };

    const res = await request(app)
      .post("/user")
      .send(mockPayload)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required field(s)");
  });
  // Unit Test
  it("should throw an error for user already exist", async () => {
    mockedCreateNewUser.mockImplementation((req, res): any => {
      res.status(409).json({ status: 409, message: "Account already exist" });
    });

    const mockPayload = {
      firstName: "Bob",
      lastName: "Man",
      color: "#732424",
      email: "bobman@test.com",
      password: "password",
    };

    const res = await request(app)
      .post("/user")
      .send(mockPayload)
      .set("Accept", "application/json");

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Account already exist");
  });
});

describe("POST /signin", () => {
  it("should signin user", async () => {
    mockedSignin.mockImplementation((req, res): any => {
      res.json({ token: "mockToken" });
    });

    const mockPayload = {
      email: "bobman@test.com",
      password: "password",
    };

    const res = await request(app)
      .post("/signin")
      .send(mockPayload)
      .set("Accept", "application/json");

    expect(res.body.token).toBeTruthy();
  });

  it("should throw an error for invalid email or password", async () => {
    mockedSignin.mockImplementation((req, res): any => {
      res.status(401).json({ message: "Invalid username or password" });
    });

    const mockPayload = {
      email: "bobman@test.com",
      password: "password",
    };

    const res = await request(app)
      .post("/signin")
      .send(mockPayload)
      .set("Accept", "application/json");

    expect(res.status).toBe(401)
    expect(res.body.message).toBe("Invalid username or password");
  });
});
