'use strict';
//import angular from 'angular';


var angular = require('angular');

var app = angular.module('app', []);

require('./controllers/hello-ctrl.js')(app);
