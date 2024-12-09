import { defineAuth } from '@aws-amplify/backend';
import { AnkhConfig } from '@/config/ankh';

export const auth = defineAuth({ ...AnkhConfig.auth.cognito });
