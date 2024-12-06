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
export interface IAnkhPage {
  readonly id: string;
  readonly name: string;
  readonly route: string;
  readonly title: string;
  readonly uis: IAnkhUi[];
  readonly icon?: string;
}
interface IAnkhTheme {
  readonly name: string;
  readonly colors: {
    primary: { text: string; bg: string };
    default: { text: string; bg: string };
  };
  readonly active?: boolean;
  readonly logo?: string;
}
interface IAnkhBrand {
  readonly logo?: string;
  readonly themes: IAnkhTheme[];
}
interface IAnkhConfig {
  readonly brand: IAnkhBrand;
  readonly auth: {
    readonly mode: EAnkhAuthMode;
    readonly cognito: AmplifyAuthProps;
  };
  readonly pages: IAnkhPage[];
}

const COLORS = {
  WHITE: '#fff',
  RED: '#cf1444',
  BLACK: '#000',
};

export const AnkhConfig: IAnkhConfig = {
  brand: {
    themes: [
      {
        name: 'light',
        colors: {
          default: {
            text: COLORS.BLACK,
            bg: COLORS.WHITE,
          },
          primary: {
            text: COLORS.WHITE,
            bg: COLORS.RED,
          },
        },
        active: true,
        logo: 'logo.jpg',
      },
    ],
  },
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
      icon: 'account',
      uis: [
        {
          id: v4(),
          name: 'Profile',
        },
      ],
    },
    {
      id: v4(),
      name: 'lesson',
      route: '/lesson/1',
      title: 'Lesson 1',
      icon: 'school',
      uis: [
        {
          id: v4(),
          name: 'card',
          conf: {
            title: 'Title here',
            content: '<video />',
            actions: [
              {
                name: 'markAsComplete',
                onClick: true,
              },
            ],
          },
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
