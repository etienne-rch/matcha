import bcrypt from "bcrypt";
import request from "supertest";
import app from "@/app";
import User from "@/models/User";

// ⚙️ Prepare a test user in the database
beforeAll(async () => {
  const passwordHash = await bcrypt.hash("Password123!", 10);
  await User.create({
    email: "test@example.com",
    passwordHash,
    firstName: "John",
    lastName: "Doe",
    consentAccepted: true,
  });
});

describe("POST /api/auth/login", () => {
  it("should return 200 and a JWT if the credentials are correct", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "Password123!" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should return 401 if the password is incorrect", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "WrongPassword123!" });

    expect(res.status).toBe(401);
  });

  it("should return 400 if the data does not pass validation", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "not-an-email", password: "123" });

    expect(res.status).toBe(400);
  });
});
