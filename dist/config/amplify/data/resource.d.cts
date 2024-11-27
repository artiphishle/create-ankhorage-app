import * as _aws_amplify_plugin_types from '@aws-amplify/plugin-types';
import * as _aws_amplify_graphql_api_construct from '@aws-amplify/graphql-api-construct';
import * as _aws_amplify_data_schema_types from '@aws-amplify/data-schema-types';
import * as _aws_amplify_data_schema_dist_esm_Authorization from '@aws-amplify/data-schema/dist/esm/Authorization';
import * as _aws_amplify_data_schema from '@aws-amplify/data-schema';
import { ClientSchema } from '@aws-amplify/backend';

declare const schema: _aws_amplify_data_schema.ModelSchema<{
    types: {
        Ui: _aws_amplify_data_schema.ModelType<{
            fields: {
                id: _aws_amplify_data_schema.ModelField<_aws_amplify_data_schema.Nullable<string>, never, undefined>;
                name: _aws_amplify_data_schema.ModelField<_aws_amplify_data_schema.Nullable<string>, never, undefined>;
                conf: _aws_amplify_data_schema.ModelField<_aws_amplify_data_schema.Nullable<_aws_amplify_data_schema.Json>, never, undefined>;
                uis: _aws_amplify_data_schema.ModelRelationshipField<_aws_amplify_data_schema.ModelRelationshipTypeArgFactory<"Ui", _aws_amplify_data_schema.ModelRelationshipTypes.hasMany, true>, "Ui", "required", undefined>;
            };
            identifier: _aws_amplify_data_schema.ModelDefaultIdentifier;
            secondaryIndexes: [];
            authorization: [];
            disabledOperations: [];
        }, never>;
        Page: _aws_amplify_data_schema.ModelType<_aws_amplify_data_schema_types.SetTypeSubArg<{
            fields: {
                id: _aws_amplify_data_schema.ModelField<_aws_amplify_data_schema.Nullable<string>, never, undefined>;
                name: _aws_amplify_data_schema.ModelField<_aws_amplify_data_schema.Nullable<string>, never, undefined>;
                route: _aws_amplify_data_schema.ModelField<_aws_amplify_data_schema.Nullable<string>, never, undefined>;
                uis: _aws_amplify_data_schema.ModelRelationshipField<_aws_amplify_data_schema.ModelRelationshipTypeArgFactory<"Ui", _aws_amplify_data_schema.ModelRelationshipTypes.hasMany, true>, "Ui", "required", undefined>;
            };
            identifier: _aws_amplify_data_schema.ModelDefaultIdentifier;
            secondaryIndexes: [];
            authorization: [];
            disabledOperations: [];
        }, "authorization", (_aws_amplify_data_schema.Authorization<"public", undefined, false> & {
            to: <SELF extends _aws_amplify_data_schema.Authorization<any, any, any>>(this: SELF, operations: _aws_amplify_data_schema_dist_esm_Authorization.Operation[]) => Omit<SELF, "to">;
        })[]>, "authorization">;
    };
    authorization: [];
    configuration: any;
}, never>;
type Schema = ClientSchema<typeof schema>;
declare const data: _aws_amplify_plugin_types.ConstructFactory<_aws_amplify_graphql_api_construct.AmplifyGraphqlApi>;

export { type Schema, data };
