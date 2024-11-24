"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backend_1 = require("@aws-amplify/backend");
const resource_1 = require("./auth/resource");
// import { data } from './data/resource';
(0, backend_1.defineBackend)({ auth: resource_1.auth /*,data*/ });
