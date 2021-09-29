import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { AuthStack } from './auth-stack';
import { StageConfig } from './stage-config';

export class MovieGeneratorService extends Stage {

    constructor(scope: Construct, id: string, stageConfig: StageConfig, props?: StageProps) {
        super(scope, id, props);

        const stageName = stageConfig.stageName;
        const authStack = new AuthStack(this, `auth-stack-${stageName}`, stageConfig, {
            stackName: `AuthStack-${stageName}`,
            env: props?.env
        });

    }

}
