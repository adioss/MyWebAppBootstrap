# README #

My simple webapp bootstrap V2:

* backend
    * spring boot
    * basic auth
* frontend
    * React / Redux / Webpack / Babel
    * pureCSS for responsiveness
    * tooling(jest/enzyme)

### What is this repository for? ###

* My own project quick boot/capitalisation

### How do I get set up? ###
* Summary of set up
   * mvn clean package
   * Start main...

* Some useful commands
   * launch hot-reload (http://localhost:3000)
        * npm start
   * launch test (and watch changes)
        * npm run test 
        * npm run test:watch

* Configuration
   * -Dspring.profiles.active=dev as VM arguments

### CI
Travis CI : [![Build Status](https://travis-ci.org/adioss/MyWebAppBootstrap.svg?branch=master)](https://travis-ci.org/adioss/MyWebAppBootstrap)

### CD 
https://mywebappbootstrap.herokuapp.com
* users:
    * admin/admin
    * test/test
