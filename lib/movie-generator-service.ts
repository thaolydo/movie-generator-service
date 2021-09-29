import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { StageConfig } from './stage-config';
import { LambdaStack } from './service-stack/lambda-stack';

export class MovieGeneratorService extends Stage {

    constructor(scope: Construct, id: string, stageConfig: StageConfig, props?: StageProps) {
        super(scope, id, props);

        const stageName = stageConfig.stageName;

        const lambdaStack = new LambdaStack(this, `lambda-stack-${stageName}`, stageConfig, {
            stackName: `LambdaStack-${stageName}`,
            env: props?.env
        });

    }

}
