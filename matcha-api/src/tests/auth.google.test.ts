import request from "supertest";
import app from "@/app";
import User from "@/models/User";
import { OAuth2Client } from "google-auth-library";

describe("POST /api/auth/google", () => {
  let mockVerifyIdToken: jest.Mock;

  beforeEach(async () => {
    // Nettoyer la collection des utilisateurs avant chaque test
    await User.deleteMany({});

    // Créer un mock pour verifyIdToken
    mockVerifyIdToken = jest.fn();

    // Remplacer la méthode réelle par le mock
    jest
      .spyOn(OAuth2Client.prototype, "verifyIdToken")
      .mockImplementation(mockVerifyIdToken);
  });

  afterEach(() => {
    // Réinitialiser tous les mocks après chaque test
    jest.restoreAllMocks();
  });

  it("devrait créer un nouvel utilisateur Google et retourner un JWT", async () => {
    // Simuler un payload valide renvoyé par Google
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

    // Vérifier que l’utilisateur a bien été créé
    const user = await User.findOne({ email: "googleuser@example.com" });
    expect(user).not.toBeNull();
  });

  it("devrait retourner 401 si Google renvoie un token invalide", async () => {
    // Simuler un token invalide
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => null,
    });

    const res = await request(app)
      .post("/api/auth/google")
      .send({ idToken: "bad-token" });

    expect(res.status).toBe(401);
  });
});
