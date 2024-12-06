import { AmplifyAuthProps } from '@/../../node_modules/@aws-amplify/backend-auth/lib/factory.d';

declare enum EAnkhAuthMode {
    Entire = "ENTIRE",
    InApp = "IN_APP"
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

export { AnkhConfig, EAnkhAuthMode, type IAnkhPage };
