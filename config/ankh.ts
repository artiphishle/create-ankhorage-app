import type { AmplifyAuthProps } from '@/../../node_modules/@aws-amplify/backend-auth/lib/factory.d'
import { v4 } from 'uuid'

interface IAnkhUi {
  readonly id: string
  readonly name: string
  readonly conf?: any
}
interface IAnkhPage {
  readonly id: string
  readonly name: string
  readonly route: string
  readonly uis: IAnkhUi[]
}
interface IAnkhConfig {
  readonly auth: {
    readonly mode: 'IN_APP' | 'ENTIRE'
    readonly cognito: AmplifyAuthProps
  }
  readonly pages: IAnkhPage[]
}

export const AnkhConfig: IAnkhConfig = {
  auth: {
    mode: 'IN_APP',
    cognito: {
      loginWith: {
        email: true,
      },
      userAttributes: {
        'custom:firstName': {
          dataType: 'String',
          mutable: true,
          minLen: 2,
          maxLen: 25,
        },
        'custom:lastName': {
          dataType: 'String',
          mutable: true,
          minLen: 2,
          maxLen: 25,
        },
      },
    },
  },
  pages: [
    {
      id: v4(),
      name: 'Home',
      route: '/',
      uis: [
        {
          id: v4(),
          name: 'Text',
          conf: {
            value: 'HomeText',
          },
        },
      ],
    },
    {
      id: v4(),
      name: 'Profile',
      route: '/profile',
      uis: [
        {
          id: v4(),
          name: 'Profile',
        },
      ],
    },
    {
      id: v4(),
      name: 'Settings',
      route: '/settings',
      uis: [
        {
          id: v4(),
          name: 'Settings',
        },
      ],
    },
  ],
}
