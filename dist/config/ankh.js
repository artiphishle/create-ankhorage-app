"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnkhConfig = void 0;
const uuid_1 = require("uuid");
exports.AnkhConfig = {
    auth: {
        mode: 'IN_APP',
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
            id: (0, uuid_1.v4)(),
            name: 'Home',
            route: '/',
            uis: [
                {
                    id: (0, uuid_1.v4)(),
                    name: 'Text',
                    conf: {
                        value: 'HomeText',
                    },
                },
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Profile',
            route: '/profile',
            uis: [
                {
                    id: (0, uuid_1.v4)(),
                    name: 'Profile',
                },
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Settings',
            route: '/settings',
            uis: [
                {
                    id: (0, uuid_1.v4)(),
                    name: 'Settings',
                },
            ],
        },
    ],
};
//# sourceMappingURL=ankh.js.map