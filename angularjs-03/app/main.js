import angular from 'angular';

class MainController {
  constructor() {
    this.list = [];
  }

  addItem() {
    this.list.push(this.item);
    this.item = '';
  }

};

angular.module('app', [])
  .controller('MainController', MainController);
