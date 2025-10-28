import request from "supertest";

import destroyTestingDiContext from "../testing/destroyTestingDiContext.js";
import { createApp } from "../common/createApp.js";

import SERVERS_MOCK from "../__mocks__/servers.js";
import { initContext } from "../context.js";

let app;
let tesingDiContext;

beforeAll(async () => {
  app = await createApp();
  process.env.NODE_ENV = "test";
  tesingDiContext = await initContext();
});

beforeEach(async () => {
  await tesingDiContext.dbClient.builder("servers").truncate();

  await tesingDiContext.dbClient.builder("servers").insert(SERVERS_MOCK);
});

afterAll(async () => {
  destroyTestingDiContext();
});

describe("Servers API", () => {
  let newServerId: number;

  it("should get all servers", async () => {
    const res = await request(app).get("/servers");

    expect(res.status).toBe(200);

    expect(res.body).toStrictEqual(SERVERS_MOCK);
  });

  // it("should create a server", async () => {
  //   const res = await request(app)
  //     .post("/servers")
  //     .send({ name: "Test Server", distance: 999 });

  //   expect(res.status).toBe(200);
  //   expect(res.body.name).toBe("Test Server");
  //   newServerId = res.body.id;
  // });

  // it("should update a server", async () => {
  //   const res = await request(app)
  //     .put(`/servers/${newServerId}`)
  //     .send({ name: "Updated Server", distance: 123 });
  //   expect(res.status).toBe(200);
  //   expect(res.body.name).toBe("Updated Server");
  // });

  // it("should delete a server", async () => {
  //   const res = await request(app).delete(`/servers/${newServerId}`);
  //   expect(res.status).toBe(200);
  // });
});
