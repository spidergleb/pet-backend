import { Server } from "../types/server.js";
import { v4 as generateId } from "uuid";

const SERVERS_MOCK: Server[] = [
  { id: 1, name: "United States #40", distance: 1652 },
  { id: 2, name: "United Kingdom #41", distance: 961 },
  { id: 3, name: "Japan #95", distance: 1820 },
  { id: 4, name: "Japan #31", distance: 1498 },
  { id: 5, name: "Latvia #33", distance: 1221 },
  { id: 6, name: "Latvia #43", distance: 1051 },
  { id: 7, name: "Singapore #87", distance: 968 },
  { id: 8, name: "Singapore #70", distance: 1604 },
  { id: 9, name: "Japan #20", distance: 108 },
  { id: 10, name: "Japan #36", distance: 72 },
  { id: 11, name: "Latvia #78", distance: 130 },
  { id: 12, name: "United States #71", distance: 200 },
  { id: 13, name: "Germany #34", distance: 620 },
  { id: 14, name: "Latvia #80", distance: 1859 },
  { id: 15, name: "United Kingdom #68", distance: 1311 },
];

export default SERVERS_MOCK;
