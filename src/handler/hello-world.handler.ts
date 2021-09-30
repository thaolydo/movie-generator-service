import 'source-map-support/register';

export const handler = async (handlerInput: any) => {
    console.info("HelloWorld lambda was invoked by API Gateway with input:", JSON.stringify(handlerInput));

    // Build response
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*' // replace with hostname of frontend (CloudFront)
        },
        body: JSON.stringify({
            message: 'success',
        }),
    };
    return response;
}