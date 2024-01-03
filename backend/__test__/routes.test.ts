import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("Should send back data", async () => {
    const res = await supertest(app).get("/");
    expect(res.status).toBe(200)
    expect(res.text).toEqual("Hello World!");
  });
});
