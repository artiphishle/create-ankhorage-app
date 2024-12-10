import {
  type AppbarProps,
  type ButtonProps,
  type CardProps,
  type DialogProps,
  type IconButtonProps,
  type SnackbarProps,
  type TextInputProps,
} from 'react-native-paper';
import type { AmplifyAuthProps } from '@aws-amplify/backend-auth/lib/factory.d';
import type { ReactVideoProps } from 'react-native-video';
import type { AnkhUiListProps } from '@/lib/ui/components/List';

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
    readonly primary: { text: string; bg: string };
    readonly default: { text: string; bg: string };
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
