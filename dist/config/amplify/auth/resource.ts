import { defineAuth } from '@aws-amplify/backend';
import { AnkhConfig } from '../../ankh';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const auth = defineAuth({ ...AnkhConfig.auth.cognito } as any);
