import 'source-map-support/register';
import { WatchlistDao } from '../accessors/watchlist.dao';

const watchlistDao = new WatchlistDao();

export const handler = async (handlerInput: any) => {
    console.log("RemoveFromWatchlist lambda was invoked by API Gateway with input:", JSON.stringify(handlerInput));

    // Extract info
    const queryParams = handlerInput.queryStringParameters;
    const email = queryParams.email;
    const movieId = queryParams.movieId;

    await watchlistDao.removeFromWatchlist(email, movieId);

    // Build response
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'success',
        }),
    };
    return response;
}