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
const jwt = __importStar(require("jsonwebtoken"));
const service_1 = require("./../modules/common/service");
const service_2 = __importDefault(require("./../modules/users/service"));
class AuthController {
    static dashboard(req, res) {
        res.status(200).send({ 'message': 'welcome@' });
    }
}
AuthController.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send();
    }
    const user_filter = { email };
    service_2.default.filterUser(user_filter, (err, user_data) => {
        var _a;
        if (err) {
            service_1.mongoError(err, res);
        }
        else {
            if (user_data) {
                if (!service_2.default.isPasswordValid(password, user_data.password)) {
                    res.status(401).send();
                }
                const token = jwt.sign({
                    userId: user_data._id,
                    username: user_data.email
                }, (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : '', {
                    expiresIn: "1h"
                });
                res.status(200).send({ token });
            }
            else {
                res.status(404).send();
            }
        }
    });
});
AuthController.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_params = {
        name: {
            first_name: req.body.name.first_name,
            middle_name: req.body.name.middle_name,
            last_name: req.body.name.last_name
        },
        email: req.body.email,
        password: req.body.password,
        modification_notes: [{
                modified_on: new Date(Date.now()),
                modification_note: 'New user created'
            }]
    };
    user_params.password = service_2.default.hashPassword(user_params.password);
    try {
        const newUser = yield service_2.default.createUser(user_params);
        service_1.successResponse('create user successfull (async)', newUser, res);
    }
    catch (error) {
        console.log('error', error);
        res.status(500).send({
            'error': true,
            'message': 'error'
        });
    }
});
exports.default = AuthController;
