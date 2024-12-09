import { AmplifyAuthProps } from '@aws-amplify/backend-auth/lib/factory.d';
import { AppbarProps, ButtonProps, CardProps, DialogProps, IconButtonProps, SnackbarProps, TextInputProps } from 'react-native-paper';
import { ReactVideoProps } from 'react-native-video';
import { AnkhUiListProps } from '@/lib/ui/components/List';
import React from 'react';

declare enum EAnkhUi {
    Appbar = "Appbar",
    Button = "Button",
    Card = "Card",
    Dialog = "Dialog",
    IconButton = "IconButton",
    AnkhUiList = "AnkhUiList",
    Snackbar = "Snackbar",
    TextInput = "TextInput",
    VideoPlayer = "VideoPlayer"
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
declare const AnkhUiMap: Record<EAnkhUi, React.ComponentType<any>>;
type IAnkhUi = {
    [K in keyof UiPropsMap]: {
        id: string;
        ui: K;
        props?: UiPropsMap[K];
        uis?: IAnkhUi[];
    };
}[keyof UiPropsMap];
declare enum EAnkhAuthMode {
    Entire = "ENTIRE",
    InApp = "IN_APP"
}
interface IAnkhPage {
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
        primary: {
            text: string;
            bg: string;
        };
        default: {
            text: string;
            bg: string;
        };
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
declare const AnkhConfig: IAnkhConfig;

export { AnkhConfig, AnkhUiMap, EAnkhAuthMode, type IAnkhPage, type IAnkhUi };
