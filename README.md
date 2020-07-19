# war-two-planets

Nodejs console app to solve GeekTrust backend problem at https://www.geektrust.in/coding-problem/backend/war

# Problem Statement

The coding challenge is set in the planet of Lengaburu in the distant galaxy of Tara B. There has been peace for decades but now the evil Queen Al Falcone of Falicornia dares attack Lengaburu.

The app helps King Shan decide what forces to deploy to match Al Falcone's attack.

# Building the app

1. Extract the contents of the zip file war.zip into a folder named 'war'.
2. Open a terminal window and change into this directory 'war' i.e. cd war .
3. Install nodejs and npm package manager if not already installed.
4. Type 'npm install' in the terminal, this step will :
   a. Install all application dependencies using npm package manager.
   b. Check application source code for linting errors using 'ESLint'.
   c. Run unit test cases for application using 'Jest' testing framework.
   d. The build step will fail if there are any linting errors or unit test case failures.
   e. Clean up any contents in war/build directory if it exists.
   f. Build TypeScript source code into JavaScript code using 'tsc' which is TypeScript compiler. Output will be stored in war/build directory.

# Running the app

1. Open a terminal window and change into the directory 'war' which has the source code with package.json file i.e. Type 'cd war' .
2. Type 'npm start path_of_input_file' eg. 'npm start src/testInputs/warInput.txt' .
   The input file should have enemy forces listed in this format: FALICORNIA_ATTACK 250H 50E 20AT 15SG
   This will execute the application and it will read this file and output to the console, the recommended forces that should be deployed and outcome of the war in this format:

# Unit Testing

To run unit tests :

1. Open a terminal window and change into the directory 'war' which has the source code with package.json file i.e. cd war
2. Type 'npm test' in the terminal. It will run all unit tests with code coverage report using Jest Framework.

# Dependency Injection

Application uses 'TypeDI' libarary for dependency injection.

# Documentation

The application is documented using 'compodoc' npm package.
To view the documentation :

1. Open a terminal window and change into the directory 'war' which has the source code with package.json file i.e. cd war
2. Type 'npm run serve:doc' in the terminal.
3. Launch http://127.0.0.1:8080 in your browser.

# Design considerations

The app has been built keeping in mind most probable future requirement changes that I could think of.

Currently the app reads input from a file based on file name passed as command line argument and writes output to console.
But by coding to interfaces and using dependency injection with the help of library TypeDI, the app supports reading and writing to other sources.

The App is flexible to accept any number of unique combatant codes when a concrete implementation of ArmyProvider is added which returns the unit count of forces in home army that can tackle these additional invading forces.

The App uses Rule Pipeline Design, decorating rules one after another, to provide flexibility of adding and removing rules possible when requirements change.
The Rules also make use of template method pattern to ensure that concrete rules adhere to the logic structure we want.
