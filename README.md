### CI
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.org/adioss/MyWebAppBootstrap.svg?branch=master)](https://travis-ci.org/adioss/MyWebAppBootstrap)
[![Dependency Status](https://www.versioneye.com/user/projects/5a6e6fe00fb24f381441d08d/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/5a6e6fe00fb24f381441d08d)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c0e8fde1cc774fa28ec8c1dbb16be95f)](https://www.codacy.com/app/adioss/MyWebAppBootstrap?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=adioss/MyWebAppBootstrap&amp;utm_campaign=Badge_Grade)
[![Sonarcloud quality gate](https://sonarcloud.io/api/badges/gate?key=com.adioss.bootstrap:web)](https://sonarcloud.io/dashboard?id=com.adioss.bootstrap:web)
[![Sonarcloud lines](https://sonarcloud.io/api/badges/measure?key=com.adioss.bootstrap:web&metric=lines)](https://sonarcloud.io/dashboard?id=com.adioss.bootstrap:web)
[![Sonarcloud Coverage](https://sonarcloud.io/api/badges/measure?key=com.adioss.bootstrap:web&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=com.adioss.bootstrap%3Aweb)
[![Sonarcloud Tech Debt](https://sonarcloud.io/api/badges/measure?key=com.adioss.bootstrap:web&metric=sqale_debt_ratio)](https://sonarcloud.io/project/issues?facetMode=effort&id=com.adioss.bootstrap%3Aweb&resolved=false&types=CODE_SMELL)

### CD 
https://mywebappbootstrap.herokuapp.com
* users:
    * admin/admin
    * test/test

My simple webapp bootstrap V2:

* backend
    * spring boot
    * basic auth
* frontend
    * React / Redux / Webpack / Babel
    * semantic-ui for responsiveness
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
   * udpate npm libs
        * ncu -u

* Configuration
   * -Dspring.profiles.active=dev as VM arguments
