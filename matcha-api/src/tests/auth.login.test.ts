import request from "supertest";
import app from "@/app";
import User from "@/models/User";
import bcrypt from "bcrypt";

// ⚙️ Préparer un utilisateur test dans la base
beforeAll(async () => {
  const passwordHash = await bcrypt.hash("Password123!", 10);
  await User.create({
    email: "test@example.com",
    passwordHash,
    firstName: "Jean",
    lastName: "Dupont",
    consentAccepted: true,
  });
});

describe("POST /api/auth/login", () => {
  it("devrait retourner 200 et un JWT si les identifiants sont corrects", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "Password123!" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("devrait retourner 401 si le mot de passe est incorrect", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "WrongPassword123!" });

    expect(res.status).toBe(401);
  });

  it("devrait retourner 400 si les données ne respectent pas la validation", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "not-an-email", password: "123" });

    expect(res.status).toBe(400);
  });
});
