# My planner application frontend

## Setup


Install Node.js and npm from https://nodejs.org


Clone project
```sh
$ git clone https://github.com/Idzanavi/my_planner_frontend.git
$ cd my_planner_frontend
```


Setup project
```sh
npm install
```


Compile and run for development
```sh
npm run serve
```


Compile and minify for production
```sh
npm run build
```


Lint and fix files
```sh
npm run lint
```


If you have error `Error: error:0308010C:digital envelope routines::unsupported` the following commands may help:

For Unix-like:
```sh
export NODE_OPTIONS=--openssl-legacy-provider
```

For Windows:
```sh
set NODE_OPTIONS=--openssl-legacy-provider
```

For PowerShell
```sh
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```


