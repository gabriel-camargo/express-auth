"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const server_1 = __importDefault(require("./server"));
server_1.default.app.listen(server_1.default.port, () => console.log(`📡 Backend server: `.inverse.yellow.bold +
    ` Running in ${server_1.default.mode} mode on port ${server_1.default.port}`));
