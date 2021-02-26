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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const bcrypt = __importStar(require("bcryptjs"));
class UserService {
    static create(userParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = new schema_1.default(userParams);
            const user = yield document.save();
            return user;
        });
    }
    static find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield schema_1.default.findOne(query);
            if (!document) {
                throw new Error("Usuário não encontrado");
            }
            return document;
        });
    }
    static hashPassword(password) {
        return bcrypt.hashSync(password, 8);
    }
    static isPasswordValid(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
    updateUser(id, user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: id };
            const document = yield schema_1.default.findOneAndUpdate(query, user_params);
            return document;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: id };
            yield schema_1.default.deleteOne(query);
        });
    }
}
exports.default = UserService;
