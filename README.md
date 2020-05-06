# MovieCollections Client
App to collect which movies/series that you have seen and want to see.
Auth with AWS Cognito, backend with serverless and AWS lambda. Frontend (this repo) with react and material design. 

## TODO / Features 
* Forgot password 
* Think about UX - should movies/series be seperated or not
* Fix mobile view 
* User feedback when loading movies the first time 
* Save user settings / user settings page 
* Create specific lists with movies/series 
* Add friends and share lists

* Deployment 
    - Caching 
    - Launch to aws s3 bucket with correct route 53 settings
    - Use Circle CI (or similar) to push the build to the s3 bucket 


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
