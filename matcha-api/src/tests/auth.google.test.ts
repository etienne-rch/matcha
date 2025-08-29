import request from "supertest";
import app from "@/app";
import User from "@/models/User";

// On mock la librairie Google
jest.mock("google-auth-library", () => {
  return {
    OAuth2Client: jest.fn().mockImplementation(() => ({
      verifyIdToken: jest.fn().mockResolvedValue({
        getPayload: () => ({
          email: "googleuser@example.com",
          given_name: "Alice",
          family_name: "Martin",
          picture: "https://example.com/avatar.png",
        }),
      }),
    })),
  };
});

describe("POST /api/auth/google", () => {
  it("devrait créer un nouvel utilisateur Google et retourner un JWT", async () => {
    const res = await request(app)
      .post("/api/auth/google")
      .send({ idToken: "fake-token" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("googleuser@example.com");

    // Vérifier que l’utilisateur a bien été créé en base
    const user = await User.findOne({ email: "googleuser@example.com" });
    expect(user).not.toBeNull();
  });

  it("devrait retourner 401 si Google renvoie un token invalide", async () => {
    const { OAuth2Client } = require("google-auth-library");
  
    (OAuth2Client as jest.Mock).mockImplementation(() => ({
      verifyIdToken: jest.fn().mockRejectedValue(new Error("Invalid token")), 
    }));
  
    const res = await request(app)
      .post("/api/auth/google")
      .send({ idToken: "bad-token" });
  
    expect(res.status).toBe(401);
  });
});
