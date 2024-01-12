// UNIT TESTING
import { hashPassword } from "../auth";

describe("auth", () => {
  // it("should compare passwords", async () => {});

  it("should create a hash password", async () => {
    const password = "jfaklf";

    const result = await hashPassword(password);

    expect(typeof result).toBe('string');
  });
});
