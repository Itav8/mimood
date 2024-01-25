// UNIT TESTING
// import bcrypt from "bcrypt";
// import * as authHandlers from "../auth";

jest.mock("../auth");

// const mockedHashPassword = authHandlers.hashPassword as unknown as jest.Mock<
//   typeof authHandlers.hashPassword
// >;

describe("auth", () => {
  // it("should compare passwords", async () => {});

  // it("should create a hash password", async () => {
  //   bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");

  //   const mockPassword = "jfaklf";
  //   const hashedPassword = await hashPassword(mockPassword);

  //   expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 5);
  //   expect(hashedPassword).toBe("hashedPassword");
  // });
});
