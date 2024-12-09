import type { AmplifyAuthProps } from '@aws-amplify/backend-auth/lib/factory.d';
import {
  Appbar,
  Button,
  Card,
  Dialog,
  IconButton,
  Snackbar,
  TextInput,
  type AppbarProps,
  type ButtonProps,
  type CardProps,
  type DialogProps,
  type IconButtonProps,
  type SnackbarProps,
  type TextInputProps,
} from 'react-native-paper';
import { type ReactVideoProps } from 'react-native-video';
import { v4 } from 'uuid';

import AnkhUiList, { type AnkhUiListProps } from '@/lib/ui/components/List';
import VideoPlayer from '@/lib/ui/components/VideoPlayer';
import React from 'react';

enum EAnkhUi {
  Appbar = 'Appbar',
  Button = 'Button',
  Card = 'Card',
  Dialog = 'Dialog',
  IconButton = 'IconButton',
  AnkhUiList = 'AnkhUiList',
  Snackbar = 'Snackbar',
  TextInput = 'TextInput',
  VideoPlayer = 'VideoPlayer',
}
type UiPropsMap = {
  [EAnkhUi.Appbar]: AppbarProps;
  [EAnkhUi.Button]: ButtonProps;
  [EAnkhUi.Card]: CardProps;
  [EAnkhUi.Dialog]: DialogProps;
  [EAnkhUi.IconButton]: IconButtonProps;
  [EAnkhUi.AnkhUiList]: AnkhUiListProps;
  [EAnkhUi.Snackbar]: SnackbarProps;
  [EAnkhUi.TextInput]: TextInputProps;
  [EAnkhUi.VideoPlayer]: ReactVideoProps;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AnkhUiMap: Record<EAnkhUi, React.ComponentType<any>> = {
  [EAnkhUi.Appbar]: Appbar,
  [EAnkhUi.Button]: Button,
  [EAnkhUi.Card]: Card,
  [EAnkhUi.Dialog]: Dialog,
  [EAnkhUi.IconButton]: IconButton,
  [EAnkhUi.AnkhUiList]: AnkhUiList,
  [EAnkhUi.Snackbar]: Snackbar,
  [EAnkhUi.TextInput]: TextInput,
  [EAnkhUi.VideoPlayer]: VideoPlayer,
};
export type IAnkhUi = {
  [K in keyof UiPropsMap]: {
    id: string;
    ui: K;
    props?: UiPropsMap[K];
    uis?: IAnkhUi[];
  };
}[keyof UiPropsMap]; // Flatten into a union

export enum EAnkhAuthMode {
  Entire = 'ENTIRE',
  InApp = 'IN_APP',
}

export interface IAnkhPage {
  readonly id: string;
  readonly name: string;
  readonly route: string;
  readonly title: string;
  readonly uis?: IAnkhUi[];
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
    },
    {
      id: v4(),
      name: 'profile',
      route: '/profile',
      title: 'Profile',
      icon: 'account',
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
          ui: EAnkhUi.VideoPlayer,
          props: {
            source: {
              uri: 'http://localhost:8081/assets/videos/lesson-01.mp4',
            },
          },
        },
        {
          id: v4(),
          ui: EAnkhUi.AnkhUiList,
          props: {
            id: v4(),
            items: [
              {
                description: 'Lorem ipsum and dollar Schein.',
                title: 'Uno',
                icon: { left: 'play-circle' },
              },
              {
                description: 'Billie Gates wieder besser jetzt.',
                title: 'Dos',
                icon: { left: 'play-circle' },
              },
              {
                description: 'Die drei bäumen sich auf zu einer Triangle.',
                title: 'Tree',
                icon: { left: 'play-circle' },
              },
              {
                description: 'Der Rosenquark ist ein essbarer Stein.',
                title: 'Quark',
                icon: { left: 'play-circle' },
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
    },
  ],
};
