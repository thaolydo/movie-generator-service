import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { StageConfig } from "../stage-config";

import * as path from 'path';
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { CorsHttpMethod, HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";

export class LambdaStack extends Stack {

    private stageConfig: StageConfig;

    private static readonly SOURCE_DIR = path.join(__dirname, '..', '..', 'src');

    constructor(scope: Construct, id: string, stageConfig: StageConfig, props?: StackProps) {
        super(scope, id, props);

        this.stageConfig = stageConfig;

        const stageName = stageConfig.stageName;

        const helloWorldLambda = new NodejsFunction(this, `hello-world-lambda-${stageName}`, {
            functionName: `HelloWorld-${stageName}`,
            handler: 'handler',
            entry: path.join(LambdaStack.SOURCE_DIR, 'handler', 'hello-world.handler.ts'),
            bundling: {
                sourceMap: true
            },
        });

        const helloWorldApi = new HttpApi(this, `hello-world-api-${stageName}`, {
            apiName: `HelloWorldHttpApi-${this.stageConfig.stageName}`,
            corsPreflight: {
                allowOrigins: ['*'],
                allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST, CorsHttpMethod.DELETE, CorsHttpMethod.PUT],
                allowHeaders: ['*'],
                exposeHeaders: ['*']
            },
        });

        helloWorldApi.addRoutes({
            path: '/',
            methods: [HttpMethod.GET],
            integration: new LambdaProxyIntegration({ handler: helloWorldLambda }),
        });

    }

}
