import Credentials from '../types/Credentials'
import User from '../types/User'

export const credentials: Credentials = {
  email: 'test.user@email.com',
  password: 'password1234',
}

export const user: User = {
  token: 'token123',
  email: credentials.email,
  id: 'user123',
}
