import { defineBackend } from '@aws-amplify/backend';
import { auth } from '@config/amplify/auth/resource';
// import { data } from './data/resource';

defineBackend({ auth /*,data*/ });
