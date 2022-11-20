import * as yup from 'yup'

export const registerScreenValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required(),
})

export const loginScreenValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})
