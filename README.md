<h1 align="center">
    <br>
        <a href="https://github.com/NolanTan/Capstone-1">
            <img src="lsm/frontend/lsm-app/lsm-logo.png" alt="LSM" width="400">
        </a>
    <br>
        LSM-tree Education Application
    <br><br>
</h1>

## Info
    CS 495: Capstone II
    Advisor: Dr. Holliday
    Author: Nolan Flinchum
    Version: 1/27/2024

## Description
    An LSM-tree is a data structure with performance characteristics that make it very attractive
    to store date with more write intensive throughput. It uses a memory component and disk
    components to store data in a hierarchical manner. It also employs several optimizations to
    improve read and write performance.

    This project aims to create a web application to educate users on LSM-trees. 

## Dependencies
    If this is your first time running the program, read the following:

    In the lsm/ directory, run the command
        `npm install`
    to install dependencies needed to run Jest, the JS testing framework.
    
    In the lsm/backend/ directory, run the command 
        `npm install` 
    to install dependencies needed to run the backend.
    
    In the lsm/frontend/lsm-app/ directory, run 
        `npm install` 
    to install dependencies needed to run the frontend.

## Testing
    Use `npm test` to run tests. Files for testing should be kept in the lsm/tests/ directory.

## Usage
    To run the application, you'll need to use two separate terminals.
    
    Backend:
        In one terminal, navigate to the lsm/backend directory and run the command
            `npm start`
        to run the backend.
    
    Frontend:
        In the other terminal, navigate to the lsm/frontend/lsm-app directory and run the command
            `npm run dev`
        to run the frontend.

## More Info
    This project is currently in development. It employs the MERN stack and uses Jest for testing.

    Currently working on:
        - Compaction
        - Bloom filters
        - Deleting scripts
        - Learning Jest
        - More...

## Questions?
    If you have any questions about this project, feel free to reach out

    Email: nolan@flinchum.net or ntflinchum1@catamount.wcu.edu
    Discord: nolantan