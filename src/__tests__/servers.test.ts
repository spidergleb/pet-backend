import request from "supertest";
import app from "../index.js";

import destroyTestingDiContext from "../testing/destroyTestingDiContext.js";
import createTestingDiContext from "../testing/createTestingDiContext.js";

import SERVERS_MOCK from "../__mocks__/servers.js";
import type { DiContext } from "../types/diContext.js";

let diContext: DiContext;

beforeAll(async () => {
  diContext = await createTestingDiContext();
  console.log("🚀 ~ config:", diContext.config);
});

beforeEach(async () => {
  await diContext.dbClient.builder("servers").insert(SERVERS_MOCK);

  await diContext.dbClient.builder("servers").truncate();
});

afterAll(async () => {
  destroyTestingDiContext(diContext);
});

describe("Servers API", () => {
  let newServerId: number;

  it("should get all servers", async () => {
    const res = await request(app).get("/servers");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a server", async () => {
    const res = await request(app)
      .post("/servers")
      .send({ name: "Test Server", distance: 999 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Test Server");
    newServerId = res.body.id;
  });

  it("should update a server", async () => {
    const res = await request(app)
      .put(`/servers/${newServerId}`)
      .send({ name: "Updated Server", distance: 123 });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Server");
  });

  it("should delete a server", async () => {
    const res = await request(app).delete(`/servers/${newServerId}`);
    expect(res.status).toBe(200);
  });
});
