
export type User = {
  handle: string,
  name: string,
  email: string
}

export type RegisterCredentials = Pick<User, 'handle' | 'email' | 'name'> & {
  password: string
  password_confirmation: string
}

export type LoginCredentials = Pick<User, 'email'> & {
  password: string
}