"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const backend_1 = require("@aws-amplify/backend");
const ankh_1 = require("../../ankh");
exports.auth = (0, backend_1.defineAuth)(Object.assign({}, ankh_1.AnkhConfig.auth.cognito));
