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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor() {
        var _a;
        dotenv_1.config();
        this.app = express_1.default();
        this.port = process.env.PORT || 5000;
        this.mode = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
        this.isDev = this.mode !== `production`;
        this.database();
        this.middlewares();
        this.routes();
    }
    database() {
        mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}` +
            `@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (!err) {
                console.log('connected to database!');
            }
        });
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.json());
    }
    routes() {
        this.app.get("/", (_req, res) => {
            return res.json("API Running 😎");
        });
    }
}
exports.default = new App();
