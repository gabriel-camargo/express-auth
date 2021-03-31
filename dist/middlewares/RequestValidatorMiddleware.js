"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class RequestValidatorMiddleware {
    validate(schemas) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all(schemas.map((schema) => schema.run(req)));
                const result = express_validator_1.validationResult(req);
                if (result.isEmpty()) {
                    return next();
                }
                const errors = result.array();
                return res.status(422).json({
                    errors: errors,
                    message: 'Falha na validação. Por favor, verifique os dados enviados e tente novamente.'
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Falha na validação. Por favor, verifique os dados enviados e tente novamente.'
                });
            }
        });
    }
}
exports.default = new RequestValidatorMiddleware();
