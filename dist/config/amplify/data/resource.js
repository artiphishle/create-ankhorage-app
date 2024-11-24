import { a, defineData } from '@aws-amplify/backend';
const schema = a.schema({
    Ui: a.model({
        id: a.id(),
        name: a.string(),
        conf: a.json(),
        uis: a.hasMany('Ui', 'id'),
    }),
    Page: a
        .model({
        id: a.id(),
        name: a.string(),
        route: a.string(),
        uis: a.hasMany('Ui', 'id'),
    })
        .authorization((allow) => [allow.publicApiKey()]),
});
// defines the data resource to be deployed
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 },
    },
});
//# sourceMappingURL=resource.js.map