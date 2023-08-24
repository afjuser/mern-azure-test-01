# mern-azure-test-01

For DEV Environment
1. Add in global package.json for running on dev environment:

 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node ./backend/index.js"
  },


2. Under frontend, set the baseURL to local


For PROD Environment
1. Remove these line of code in global package.json for running on dev environment:

 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node ./backend/index.js"
  },

2. Under frontend, set the baseURL to PROD site