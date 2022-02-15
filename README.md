# App

This is a basic app implementation to demonstrate how frontend and backend work together in a common environment.

## Setup

In order to run the application, you need to follow several steps:

- Download the ZIP file or pull the repo on your local machine;
- You need to have PHP 8.0 and Node.js 14.17 installed and configured!
- When you are ready with the tools installed, you can proceed to the further steps;

**_NOTE:_** [ IMPORTANT ] Before starting up the API service, you have to copy/paste the following file:

```~/app/backend/database/database.sqlite.example```

... and rename the copied file to

```~/app/backend/database/database.sqlite```

... in order to have a working database!

- When ready with the previous step, you can open the Terminal and navigate to the backend directory of the project:

```sh
$ cd ~/app/backend
```

- Now you can install the ```composer dependencies``` by running this:

```sh
$ composer install
```

- If there are no errors on the console output, you can then execute the following command:

```sh
$ php artisan serve --port=8080
```

- This way you will run the API service which will be used with the frontend communication;

- After that, you can proceed by opening a new Terminal window and navigate to the frontend directory of the project:

```sh
$ cd ~/app/frontend
```

- You have to install the ```npm dependencies``` by running this:

```sh
$ npm install
```

- If there are no errors on the console output, you can then execute the following command:

```sh
$ npm run dev
```

... by default you should see the Node.js server is running on ```http://localhost:3000``` or in case this port has been already used, it may differ from the example above!

- Now you can visit [localhost:3000](http://localhost:3000) to access the frontend.

There shouldn't be any errors related, but in case there are some, please let me know :)
