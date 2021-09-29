export enum Stage {
    BETA,
    PROD
}

export interface StageConfig {
    readonly stage: Stage,
    readonly stageName: string,
    readonly accountId: string
}

export const STAGES: StageConfig[] = [

    // Beta
    {
        stage: Stage.BETA,
        stageName: 'beta',
        accountId: '295714456510',
    },

    // Prod
    {
        stage: Stage.PROD,
        stageName: 'prod',
        accountId: '295714456510'
    }

]
