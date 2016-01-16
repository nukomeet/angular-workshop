import angular from 'angular';

import './controllers/index';
import { reverse, boo } from './filters';

angular.module('app', ['controllers'])
  .filter('reverse', reverse)
  .filter('boo', boo);
