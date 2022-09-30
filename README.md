# About

A full-stack app for adopting pets. Includes search, user/pet management and admin functionalities.

Built as a graduation project for Israel Tech Challenge (itc) https://www.itc.tech/full-stack-development/

You can find the deployed version here: https://app.danielhaiem.com/ (works universally) or https://petadoption-app-peqh.onrender.com and https://petadoption-app.netlify.app/ (do not work on apple devices due to 3rd party cookie limitations)

Please note, there is a response delay of up to 30 seconds for the first request that comes in after a period of inactivity due to free tier limitations of back-end hosting.

# Tech Stack

React, TypeScript (front-end & back-end), Bootstrap UI, Node.js (Express), MongoDB (Mongoose).

# To Run

In order to run this application you need to add an .env file to the server folder. Please contact me on LinkedIn, www.linkedin.com/in/danielhaiem, so that I can provide you with the secret keys to add to the .env file that are needed to run the back-end. Thanks!

Open a new terminal:

```
npm install
```

Back-end (from main):
In the terminal:

```
cd server
npx nodemon server.ts
```

Front-end (from main):
In a new terminal:

```
cd client
npm start
```
