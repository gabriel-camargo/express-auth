import { body, ValidationChain } from 'express-validator';

export const signUp = (): Array<ValidationChain> => {

  const valitators: Array<ValidationChain> = []

  valitators.push(

    body('name.first_name')
      .isString().withMessage('Nome inválido!')
      .isLength({min: 3, max: 15}).withMessage(
        'O nome deve ter no mínimo 3 caracteres, e no máximo 15 caracteres'
      ),

    body('name.middle_name') 
      .isString().withMessage('Nome inválido!')
      .isLength({min: 3, max: 15}).withMessage(
        'O nome deve ter no mínimo 3 caracteres, e no máximo 15 caracteres'
      ),

    body('name.last_name')
      .isString().withMessage('Nome inválido!')
      .isLength({min: 3, max: 15}).withMessage(
        'O nome deve ter no mínimo 3 caracteres, e no máximo 15 caracteres'
      ),

    body('email')
      .isEmail().withMessage('Email inválido!'),

    body('password')
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 0
      }). withMessage(
        'A sua senha deve ter no mínimo 8 caracteres, e conter ao menos um número, ' + 
        'uma letra maiúscula, e uma letra minúscula.'
      )
      .custom(( value: string, { req }) => {
        if (value !== req.body.confirm_password) {
          throw new Error('A confirmação da senha está incorreta!');
        }

        return true
      }),

    body('confirm_password')
        .isString()
  )

  return valitators
}

export const signIn = (): Array<ValidationChain> => {

  const valitators: Array<ValidationChain> = []

  valitators.push(
    body('email')
      .isEmail().withMessage('Email inválido!'),

    body('password')
        .isString()
        .withMessage('Senha inválida!')
  )

  return valitators
}