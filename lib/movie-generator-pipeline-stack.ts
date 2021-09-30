import * as cdk from '@aws-cdk/core';

import { CodePipeline, CodePipelineSource, ShellStep } from '@aws-cdk/pipelines';
import { STAGES } from './stage-config';
import { MovieGeneratorService } from './movie-generator-service';

export class MovieGeneratorPipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Construct build command
        const pipeline = new CodePipeline(this, 'MovieGeneratorPipeline', {
            pipelineName: 'MovieGeneratorPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('thaolydo/movie-generator-service', 'main'),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            }),
            crossAccountKeys: true,
        });

        // Add stages
        STAGES.forEach(stageConfig => {

            // Initializez the stage
            console.log(`Adding stage '${stageConfig.stageName}'`);
            const appStage = new MovieGeneratorService(this, `movie-generator-service-${stageConfig.stageName}`, stageConfig, {
                env: {
                    account: stageConfig.accountId,
                    region: 'us-east-1'
                },
            });

            // Add stage to the pipeline
            const stage = pipeline.addStage(appStage);
        });
    }

    getBuildCommand(): string {
        let command = 'npm run build && cd  && npm i';
        STAGES.forEach(stage => {
            command += ` && npm run build-${stage.stageName}`
        });
        command += ' && cd -';
        console.log(`build cmd = ${command}`);
        return command;
    }
}