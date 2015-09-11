# README #

My simple webapp bootstrap:
    backend: spring boot + mongo
    frontend: angular(v1) + bootstrap + browserify + tooling(grunt, karma, jasmine)

### What is this repository for? ###

* My own project quick boot/capitalisation


### How do I get set up? ###
* Install archetype
    checkout
    mvn archetype:create-from-project
    mvn install
    mvn archetype:generate -DarchetypeCatalog=local
* Summary of set up
    mvn clean package
    Start main...

* Some ueful commands
    mvn frontend:install-node-and-npm
    mvn frontend:npm

    {path}\node_modules\.bin>browserify.cmd {path}\src\main\resources\static\js\app.js -o {path}\src\main\resources\static\js\app.bundle.js
    grunt --gruntfile {path}\Gruntfile.js browserify:js
    grunt watch

* Configuration
    --spring.profiles.active=dev in program arguments

* Dependencies
* Database configuration
    mongod --dbpath {path}\db --port 12345


* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
