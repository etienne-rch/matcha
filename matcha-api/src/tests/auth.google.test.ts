import { OAuth2Client } from "google-auth-library";
import request from "supertest";
import app from "@/app";
import User from "@/models/User";

describe("POST /api/auth/google", () => {
  let mockVerifyIdToken: jest.Mock;

  beforeEach(async () => {
    // Clean the users collection before each test
    await User.deleteMany({});

    // Create a mock for verifyIdToken
    mockVerifyIdToken = jest.fn();

    // Replace the real method with the mock
    jest
      .spyOn(OAuth2Client.prototype, "verifyIdToken")
      .mockImplementation(mockVerifyIdToken);
  });

  afterEach(() => {
    // Reset all mocks after each test
    jest.restoreAllMocks();
  });

  it("should create a new Google user and return a JWT", async () => {
    // Simulate a valid payload returned by Google
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

    // Verify that the user was actually created
    const user = await User.findOne({ email: "googleuser@example.com" });
    expect(user).not.toBeNull();
  });

  it("should return 401 if Google returns an invalid token", async () => {
    // Simulate an invalid token
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => null,
    });

    const res = await request(app)
      .post("/api/auth/google")
      .send({ idToken: "bad-token" });

    expect(res.status).toBe(401);
  });
});
