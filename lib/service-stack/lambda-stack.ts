import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
import { StageConfig } from "../stage-config";

import * as path from 'path';
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

export class LambdaStack extends Stack {

    private stageConfig: StageConfig;

    private static readonly SOURCE_DIR = path.join(__dirname, '..', '..', 'src');

    constructor(scope: Construct, id: string, stageConfig: StageConfig, props?: StackProps) {
        super(scope, id, props);

        this.stageConfig = stageConfig;

        const stageName = stageConfig.stageName;

        // const helloWorldLambda = new NodejsFunction(this, `hello-world-lambda-${stageName}`, {
        //     functionName: `HelloWorld-${stageName}`,
        //     handler: 'handler',
        //     entry: path.join(LambdaStack.SOURCE_DIR, 'handler', 'hello-world.handler.ts'),
        //     bundling: {
        //         sourceMap: true
        //     },
        // });

        new CfnOutput(this, `tmp`, {
            value: 'ly',
        });
    }

}
