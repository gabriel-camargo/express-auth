"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
require("colors");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.json());
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";
app.get("/", (_req, res) => {
    return res.send("API Running :D");
});
app.listen(PORT, () => console.log(` 📡 Backend server: `.inverse.yellow.bold +
    ` Running in ${ENV} mode on port ${PORT}`));
