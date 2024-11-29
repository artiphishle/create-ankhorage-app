import type { AmplifyAuthProps } from '@/../../node_modules/@aws-amplify/backend-auth/lib/factory.d';
import { v4 } from 'uuid';

export enum EAnkhAuthMode {
  Entire = 'ENTIRE',
  InApp = 'IN_APP',
}
interface IAnkhUi {
  readonly id: string;
  readonly name: string;
  readonly conf?: Record<string, unknown>;
}
interface IAnkhPage {
  readonly id: string;
  readonly name: string;
  readonly route: string;
  readonly title: string;
  readonly uis: IAnkhUi[];
  readonly icon?: string;
}
interface IAnkhConfig {
  readonly auth: {
    readonly mode: EAnkhAuthMode;
    readonly cognito: AmplifyAuthProps;
  };
  readonly pages: IAnkhPage[];
}

export const AnkhConfig: IAnkhConfig = {
  auth: {
    mode: EAnkhAuthMode.InApp,
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
      name: 'index',
      route: '/',
      title: 'Home',
      icon: 'home',
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
      name: 'profile',
      route: '/profile',
      title: 'Profile',
      icon: '',
      uis: [
        {
          id: v4(),
          name: 'Profile',
        },
      ],
    },
    {
      id: v4(),
      name: 'settings',
      route: '/settings',
      title: 'Settings',
      icon: 'cog',
      uis: [
        {
          id: v4(),
          name: 'Settings',
        },
      ],
    },
  ],
};
