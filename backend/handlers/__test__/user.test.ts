// INTERGRATION TESTING
import request from "supertest";
import app from "../../server";
import prisma from "../../db";

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

  it("should throw an error for user already exist", async () => {
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

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Account already exist");
  });
});

// describe("POST /signin", () => {
//   it("should signin user", async () => {});
//   it("should throw an error for user not found", async () => {});
//   it("should throw an error for incorrect password", async () => {});
//   it("should throw an error for incorrect email", async () => {});
// });
