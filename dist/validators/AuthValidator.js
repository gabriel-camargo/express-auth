"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AuthValidator {
    signUp() {
        const valitators = [];
        valitators.push(express_validator_1.body('name.first_name')
            .isString().withMessage('Nome inválido!')
            .isLength({
            min: 3,
            max: 15
        }).withMessage('O nome deve ter no mínimo 3 caracteres, e no máximo 15 caracteres'), express_validator_1.body('name.middle_name')
            .isString().withMessage('Nome inválido!')
            .isLength({
            min: 3,
            max: 15
        }).withMessage('O nome deve ter no mínimo 3 caracteres, e no máximo 15 caracteres'), express_validator_1.body('name.last_name')
            .isString().withMessage('Nome inválido!')
            .isLength({
            min: 3,
            max: 15
        }).withMessage('O nome deve ter no mínimo 3 caracteres, e no máximo 15 caracteres'), express_validator_1.body('email')
            .isEmail().withMessage('Email inválido!'), express_validator_1.body('password')
            .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 0
        }).withMessage('A sua senha deve ter no mínimo 8 caracteres, e conter ao menos um número, ' +
            'uma letra maiúscula, e uma letra minúscula.')
            .custom((value, { req }) => {
            if (value !== req.body.confirm_password) {
                throw new Error('A confirmação da senha está incorreta!');
            }
            return true;
        }), express_validator_1.body('confirm_password')
            .isString());
        return valitators;
    }
    signIn() {
        const valitators = [];
        valitators.push(express_validator_1.body('email')
            .isEmail().withMessage('Email inválido!'), express_validator_1.body('password')
            .isString()
            .withMessage('Senha inválida!'));
        return valitators;
    }
}
exports.default = new AuthValidator();
