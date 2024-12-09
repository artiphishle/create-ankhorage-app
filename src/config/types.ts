import React from 'react';
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
import AnkhUiList, { type AnkhUiListProps } from '@/lib/ui/components/List';
import VideoPlayer from '@/lib/ui/components/VideoPlayer';

export enum EAnkhUi {
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
export interface IAnkhConfig {
  readonly brand: IAnkhBrand;
  readonly auth: {
    readonly mode: EAnkhAuthMode;
    readonly cognito: AmplifyAuthProps;
  };
  readonly pages: IAnkhPage[];
}
