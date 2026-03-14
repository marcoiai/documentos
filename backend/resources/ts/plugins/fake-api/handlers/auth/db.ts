import type { User } from '@db/auth/types'

interface DB {
  userTokens: string[]
  users: User[]
}
export const db: DB = {
  // Use jsonwebtoken pkg
  // Created from https://jwt.io/ using HS256 algorithm
  // We didn't created it programmatically because jsonwebtoken package have issues with esm support. View Issues: https://github.com/auth0/node-jsonwebtoken/issues/655
  // replace with some realistic token
  userTokens: ['0', '1'],

  users: [
    {
      id: 0,
      fullName: 'admin',
      username: 'admin',
      password: 'admin',

      avatar: `${import.meta.env.BASE_URL.replace(/build\/$/g, '') ?? '/'}images/users/avatar-1.png`,
      email: 'admin@test.com',
      role: 'admin',
      abilityRules: [
        {
          action: 'manage',
          subject: 'all',
        },
      ],
    },
    {
      id: 1,
      fullName: 'user',
      username: 'user',
      password: 'user',

      avatar: `${import.meta.env.BASE_URL.replace(/build\/$/g, '') ?? '/'}images/users/avatar-7.png`,
      email: 'user@demo.com',
      role: 'user',
      abilityRules: [
        {
          action: 'read',
          subject: 'AclDemo',
        },
      ],
    },
  ],
}
