# The GeekHUB

The Geek Hub is an online social-media platform for developers and programmers including but not limited to authentication, profiles and forum posts. Users are allowed to create their portfolio by adding their personal and professional details. Users can also create small posts and like/dislike and comment on other posts.

This application is a full stack application developed using the MERN stack i.e. it uses the popular MongoDB database with Mongoose schemas, the backend web framework Express.js, the frontend library React.js that was created by Facebook and Node.js.

## DEMO LINK

[https://go-geeks.herokuapp.com/](https://go-geeks.herokuapp.com/)

## QUICK START

- Clone the repository **'The GeekHUB'** by clicking on the Clone button `https://github.com/verma-anushka/The-GeekHUB.git`. Alternatively, download the repository.
- Navigate to the folder `$ cd The-GeekHUB`

### CLIENT SETUP

- Navigate to the **client** folder `$ cd client`
- Install all the required dependencies `$ npm install`

- To run the frontend of the application: `$ npm start`
- Inside your browser, navigate to the link localhost:3000

### SERVER SETUP

- Navigate to the **server** folder `$ cd server`
- Install all the required dependencies `$ npm install`

- Inside the directory, create a keys_dev.js file `$mkdir keys_dev.js`. This file should contain the following keys:
  <pre>
    module.exports = {
        MONGO_URI: "",
        JWT_SECRET: "",
        JWT_ACCOUNT_ACTIVATION: "",
        JWT_RESET_PASSWORD: "",
        EMAIL_TO: "",
        EMAIL_FROM: "noreply@gogeeks.com",
        SENDGRID_API_KEY: "",
        GOOGLE_CLIENT_ID: "",
        FACEBOOK_CLIENT_ID: "",
        CLOUDINARY_NAME: "",
        CLOUDINARY_API_KEY: "",
        CLOUDINARY_API_SECRET: "",
        GCP_API_KEY: ""
    };
  </pre>

  - To run the backend of the application: `$ node app.js` or `$ nodemon app.js`
  - The server is running on port 8080.

## FEATURES

- **Authentication**
  - JWT OAuth
  - Google OAuth
  - Facebook Auth
  - Email verification
  - Reset Password
- **CRUD** operations for all pages
  - **Create** new profile, posts, comments
  - **Read** user profiles, posts, comments
  - **Update** profile, posts
  - **Delete** new profile, posts
- **Pleasant UX**

## TO-DO

- [x] Google & FaceBook OAuth
- [x] Image upload using React
- [x] Search user
- [ ] Tag user in comments
- [ ] Download profile (resume)
- [ ] Chat functionality

## LEARNING POINTS

- JWT Authentication
- File upload using React
- Creating easy to use APIs
- Working with React and Redux store

## TECH STACK

- **CLIENT-SIDE:**
  - **REACT JS** - An open-source JavaScript library for building user interfaces.
  - **Redux** - An open-source JavaScript library for managing application state.
  - **SCSS** - Lastest major syntax of Sass (known as Sassy CSS) which is a superset of CSS3's syntax.
- **SERVER-SIDE:**
  - **NODE JS** - JavaScript runtime environment that executes JavaScript code outside of a browser.
  - **ExpressJS** - Web application framework for Node.js for building web applications and APIs.
  - **MONGO-DB** - Cross-platform document-oriented database program.
- **DEPLOYMENT:**

  - **HEROKU** - Ccloud platform as a service supporting several programming languages.
  - **GIT** - Version-control system for tracking changes in source code.

- **TESTING:**
  - **POSTMAN** - Popular API client that makes it easy to create, share, test and document APIs.

## NODE PACKAGES/ LIBRARIES USED:

- **CLIENT-SIDE:**

  - axios
  - classnames
  - react-moment
  - react-redux
  - redux-thunk
  - validator

- **SERVER-SIDE:**
  - bcryptjs
  - body-parser
  - express
  - jsonwebtoken
  - mongoose
  - nodemon
  - passport
  - passport-jwt
  - validator

#### DEVELOPMENT ENVIRONMENT: Visual Studio Code - Editor

#### VERSION: 1.0

#### CONTRIBUTE: Issues, PRs, and all your suggestions and discussions are very welcome!
