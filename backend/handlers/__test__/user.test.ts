import app from "../../server";
import request from "supertest";
// import { createJWT } from "../../modules/auth";
import { PrismaClient } from "@prisma/client";
// import { createNewUser } from "../user";

const prismaMock = new PrismaClient();

jest.mock("../../db");
jest.mock("../../server");
jest.mock("../user");

// beforeEach(async () => {
//   await prismaMock.$transaction([
//     prismaMock.user.deleteMany(),
//   ])
// })

describe("POST /user", () => {
  it("should create a new user", async () => {
    const newUser = await prismaMock.user.create({
      data: {
        firstName: "Bob",
        lastName: "Man",
        color: "#802828",
        email: "bobman@test.com",
        password: "password",
      },
    });
    const res = await request(app).post("/user").send(newUser)

    expect(res.status).toBe(200);
  });

  // it("should throw an error for missing firstName", async () => {});
  // it("should throw an error for missing lastName", async () => {});
  // it("should throw an error for missing color", async () => {});
  // it("should throw an error for missing email", async () => {});
  // it("should throw an error for missing password", async () => {});

  // it("should throw an error for user already exist", async () => {});
});

// describe("POST /signin", () => {
//   it("should signin user", async () => {});

//   it("should throw an error for user not found", async () => {});
//   it("should throw an error for incorrect password", async () => {});
//   it("should throw an error for incorrect email", async () => {});
// });
