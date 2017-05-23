# Frontend-Demo
A single page app using AngularJS that presents a lists of tasks for the user to complete.

## Prerequisites
**[Node.js](https://nodejs.org/en/download/)**, **[git](https://git-scm.com/downloads)**

## Running the Application

Run the following commands in the project directory
```
npm install
npm start
```

then visit [localhost:3000](http://localhost:3000) in your browser

## Package Information
Typically, AngularJs projects are structured by type, for example
```
app/
----- controllers/
----- directives/
----- services/
views/
```

But because this project will be extended in the future, I chose to organize my project by feature. 
That way, as my project grows, I can quickly locate the target file. For example:
```
app/
----- dashboard/
----- messageboard/
----- sidebar/
```

### Gulpfile.js

The gulpfile contains different tasks used to develop, build, and serve the application. 
Rather than hardcode filepaths into the gulpfile, filepaths are referenced in scripts.json, 
styles.json, and html.json.

#### scripts.json
Contains the paths to javascript files that should be minified and included in the build

#### styles.json
Contains the paths to sass files that should be compiled and included in the build

#### html.json
Contains the paths to the html files that should be included in the build
