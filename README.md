# MovieCollections Client
App to collect which movies/series that you have seen and want to see.

## Features 
* Login / Signup (AWS Cognito)
    - Login
    - Signup with email verification
    - Resend verification code 
    - User feedback when loggin in / signup 
    - TODO: forgot password 
    
* Watchlist 
    - V1 layout (movie cards) 
    - Connect to imdb data 
    - Add movie (from Movie Search)
    - Delete movie
    - TODO: Update movie 
    - TODO: View layout switch (list and cards)
    - TODO Think about UX - should movies/series be seperated or not
           (Switch for showing if a movie is watched or not?)
    - TODO: User feedback when loading 
           
* Movie Search
    - Search with dummy data 
    - Connect to imdb data base 
    - Create custom dropdown menu with movie info 
    - TODO: Dropdown menu - listen to click outside menu 
    - TODO: User feedback when loading 

* General App
    - Navigation bar 
    - Setup connection to Lambda/ApiGateway so requests can be done 
    - TODO: Add tests
    - TODO: Make the app more mobile friendly

* CI/CD 
    - Launch to aws s3 bucket with correct route 53 settings
    - TODO: Use Circle CI (or similar) to push the build to the s3 bucket 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
