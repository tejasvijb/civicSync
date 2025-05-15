import { LoginType, UserType } from '../app/utils/validations';
import api from './api';

const URLS = {
  login: 'users/login',
  register: 'users/register'
}

export type LoginInfoAPI = {
  "accessToken": string,
}

export type RegisterInfoAPI = {
  "_id": string,
  "email": string,
}

export type UserWithoutConfirmPassword = Omit<UserType, 'confirmPassword'>;


export const userLogin = (body: LoginType) => {
  return api.post<LoginInfoAPI>(URLS.login, body)
}

export const userRegister = (body: UserWithoutConfirmPassword) => {
  return api.post<RegisterInfoAPI>(URLS.register, body)
}


