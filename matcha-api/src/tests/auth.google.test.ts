import request from "supertest";
import app from "@/app";
import User from "@/models/User";

// --- Préparer un mock de verifyIdToken que l’on peut contrôler ---
const mockVerifyIdToken = jest.fn();

jest.mock("google-auth-library", () => {
  return {
    OAuth2Client: jest.fn().mockImplementation(() => ({
      verifyIdToken: mockVerifyIdToken,
    })),
  };
});

describe("POST /api/auth/google", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    mockVerifyIdToken.mockReset(); 
  });

  it("devrait créer un nouvel utilisateur Google et retourner un JWT", async () => {
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => ({
        email: "googleuser@example.com",
        given_name: "Alice",
        family_name: "Martin",
        picture: "https://example.com/avatar.png",
      }),
    });

    const res = await request(app)
      .post("/api/auth/google")
      .send({ idToken: "fake-token" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("googleuser@example.com");

    const user = await User.findOne({ email: "googleuser@example.com" });
    expect(user).not.toBeNull();
  });

  it("devrait retourner 401 si Google renvoie un token invalide", async () => {
    // cette fois le mock renvoie un payload vide
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => null,
    });

    const res = await request(app)
      .post("/api/auth/google")
      .send({ idToken: "bad-token" });

    expect(res.status).toBe(401);
  });
});
