import angular from 'angular';

import BasicService from '../services/basic_service';
import MainController from './main_controller';
import SecondController from './second_controller';

angular.module('controllers', [])
  .controller('MainController', MainController)
  .controller('SecondController', SecondController)
  .service('basic', BasicService);
