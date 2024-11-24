import { defineAuth } from '@aws-amplify/backend';
import { AnkhConfig } from '../../ankh';
export const auth = defineAuth(Object.assign({}, AnkhConfig.auth.cognito));
//# sourceMappingURL=resource.js.map