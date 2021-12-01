import DynamoDB, { Converter, DeleteItemInput, PutItemInput, QueryInput } from "aws-sdk/clients/dynamodb";

export class WatchlistDao {

    private client: DynamoDB;

    private static readonly TABLE_NAME = `watchlist-${process.env.STAGE_NAME}`;

    constructor() {
        this.client = new DynamoDB({
            region: 'us-west-1',
            params: {
                TableName: WatchlistDao.TABLE_NAME,
            }
        });
    }

    getWatchlist(email: string): Promise<string[]> {
        console.log(`Getting watchlist for email '${email}'`);
        const params: QueryInput = {
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': {
                    S: email
                }
            },
            TableName: WatchlistDao.TABLE_NAME
        };

        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.client.query(params).promise();
                resolve(res.Items!.map(item => item.movieId.S!));

            } catch (err) {
                console.error(err);
                reject(`Unable to retrieve watchlist for email '${email}'`);
            }
        });
    }

    addToWatchlist(email: string, movieId: string): Promise<void> {
        console.log(`Adding movie id '${movieId}' to watchlist for email '${email}'`);

        const params: PutItemInput = {
            Item: Converter.marshall({ email, movieId }),
            ConditionExpression: 'attribute_not_exists(email)',
            TableName: WatchlistDao.TABLE_NAME
        };

        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.client.putItem(params).promise();
                console.log(`Successfully adding new movie id to watchlist.`);
                resolve();

            } catch (err) {
                console.error(err);
                reject(`Unable to add movie id '${movieId}' to watchlist for email '${email}'`);
            }
        });
    }

    removeFromWatchlist(email: string, movieId: string): Promise<void> {
        console.log(`Removing movie id '${movieId}' to watchlist for email '${email}'`);

        const params: DeleteItemInput = {
            Key: Converter.marshall({ email, movieId }),
            ConditionExpression: 'attribute_exists(email)',
            TableName: WatchlistDao.TABLE_NAME
        };

        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.client.deleteItem(params).promise();
                console.log(`Successfully remove movie id from watchlist.`)
                resolve();

            } catch (err) {
                console.error(err);
                reject(`Unable to remove movie id '${movieId}' from watchlist for email '${email}'`);
            }
        });
    }

}