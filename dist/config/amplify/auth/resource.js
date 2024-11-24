import { defineAuth } from '@aws-amplify/backend';
import { AnkhConfig } from '../../ankh';
export const auth = defineAuth({ ...AnkhConfig.auth.cognito });
