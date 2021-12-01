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

        // Watchlist API
        const getWatchlistLambda = new NodejsFunction(this, `get-watchlist-lambda-${stageName}`, {
            functionName: `GetWatchlist-${stageName}`,
            handler: 'handler',
            entry: path.join(LambdaStack.SOURCE_DIR, 'handler', 'get-watchlist.handler.ts'),
            bundling: {
                sourceMap: true
            },
        });
        const addToWatchlistLambda = new NodejsFunction(this, `add-to-watchlist-lambda-${stageName}`, {
            functionName: `AddToWatchlist-${stageName}`,
            handler: 'handler',
            entry: path.join(LambdaStack.SOURCE_DIR, 'handler', 'add-to-watchlist.handler.ts'),
            bundling: {
                sourceMap: true
            },
        });
        const removeFromWatchlistLambda = new NodejsFunction(this, `remove-from-watchlist-lambda-${stageName}`, {
            functionName: `RemoveFromWatchlist-${stageName}`,
            handler: 'handler',
            entry: path.join(LambdaStack.SOURCE_DIR, 'handler', 'remove-from-watchlist.handler.ts'),
            bundling: {
                sourceMap: true
            },
        });

        const watchlistApi = new HttpApi(this, `watchlist-api-${stageName}`, {
            apiName: `Watchlist-${this.stageConfig.stageName}`,
            corsPreflight: {
                allowOrigins: ['*'],
                allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST, CorsHttpMethod.DELETE],
                allowHeaders: ['*'],
                exposeHeaders: ['*']
            },
        });

        watchlistApi.addRoutes({
            path: '/',
            methods: [HttpMethod.GET],
            integration: new LambdaProxyIntegration({ handler: getWatchlistLambda }),
        });
        watchlistApi.addRoutes({
            path: '/',
            methods: [HttpMethod.POST],
            integration: new LambdaProxyIntegration({ handler: addToWatchlistLambda }),
        });
        watchlistApi.addRoutes({
            path: '/',
            methods: [HttpMethod.DELETE],
            integration: new LambdaProxyIntegration({ handler: removeFromWatchlistLambda }),
        });

    }

}
