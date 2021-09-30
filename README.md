# Local Dev
## Setup
1. Install AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
1. Configure AWS CLI:
   - `aws configure --profile cecs491b-dev`
   - Enter the access key and secret for the `developer` role
   - Region: `us-west-1`
   - Format: `text`
1. Install NodeJS: https://nodejs.org/en/download
1. Install Angular CLI: `npm i -g @angular/cli`

## Create new API + Lambda
1. Create an empty lambda handler in the `src/handler` folder
2. Add your empty lambda handler to the `lambda-stack.ts` file
3. Create the API manually in the AWS console
   1. Choose HTTP API
   2. Add appropriate route and integration
4. Submit a PR and merge it
5. Create your personal lambda with proper suffix and permissions

## Update and test your personal lambda
Prerequisite: your personal lambda has been created (eg. `GetWatchlist-ly`).

Run the following command to update your changes to your personal lambda:
```
   npm run update -- <handler_name> <username>
```

**Note:**
- Handler name must match with the file name without `.handler.ts` suffix
- Handler name must be lowercase with hyphen delimited

For example:

The following command will update `GetWatchlist-ly` lambda with the changes in `src/handler/get-watchlist.handler.ts`:

```
   npm run update -- get-watchlist ly
```
