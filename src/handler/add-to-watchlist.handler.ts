import 'source-map-support/register';
import { WatchlistDao } from '../accessors/watchlist.dao';

const watchlistDao = new WatchlistDao();

export const handler = async (handlerInput: any) => {
    console.log("AddToWatchlist lambda was invoked by API Gateway with input:", JSON.stringify(handlerInput));

    // Extract info
    const headers = handlerInput.headers;
    const email = headers.email;
    const movieId = headers.movieid;

    await watchlistDao.addToWatchlist(email, movieId);

    // Build response
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'success',
        }),
    };
    return response;
}