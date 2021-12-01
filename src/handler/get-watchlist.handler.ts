import 'source-map-support/register';
import { WatchlistDao } from '../accessors/watchlist.dao';

const watchlistDao = new WatchlistDao();

export const handler = async (handlerInput: any) => {
    console.log("GetWatchlist lambda was invoked by API Gateway with input:", JSON.stringify(handlerInput));

    // Extract info
    const queryParams = handlerInput.queryStringParameters;
    const email = queryParams.email;

    const watchlist = await watchlistDao.getWatchlist(email);

    // Build response
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            watchlist: watchlist,
        }),
    };
    return response;
}