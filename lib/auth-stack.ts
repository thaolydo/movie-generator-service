import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
import { StageConfig } from "./stage-config";

export class AuthStack extends Stack {

    private stageConfig: StageConfig;

    constructor(scope: Construct, id: string, stageConfig: StageConfig, props?: StackProps) {
        super(scope, id, props);

        this.stageConfig = stageConfig;
        new CfnOutput(this, `tmp`, {
            value: 'ly'
        })
    }

}
