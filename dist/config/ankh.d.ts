interface AmplifyAuthProps {
    loginWith: {
        email: boolean;
    };
    userAttributes: Record<string, {
        dataType: string;
        mutable: boolean;
        minLen?: number;
        maxLen?: number;
    }>;
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
    readonly uis: IAnkhUi[];
}
interface IAnkhConfig {
    readonly auth: {
        readonly mode: 'IN_APP' | 'ENTIRE';
        readonly cognito: AmplifyAuthProps;
    };
    readonly pages: IAnkhPage[];
}
declare const AnkhConfig: IAnkhConfig;

export { type AmplifyAuthProps, AnkhConfig, type IAnkhPage };
