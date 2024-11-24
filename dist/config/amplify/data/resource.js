"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const backend_1 = require("@aws-amplify/backend");
const schema = backend_1.a.schema({
    Ui: backend_1.a.model({
        id: backend_1.a.id(),
        name: backend_1.a.string(),
        conf: backend_1.a.json(),
        uis: backend_1.a.hasMany('Ui', 'id')
    }),
    Page: backend_1.a.model({
        id: backend_1.a.id(),
        name: backend_1.a.string(),
        route: backend_1.a.string(),
        uis: backend_1.a.hasMany('Ui', 'id')
    })
        .authorization(allow => [allow.publicApiKey()])
});
// defines the data resource to be deployed
exports.data = (0, backend_1.defineData)({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 }
    }
});
