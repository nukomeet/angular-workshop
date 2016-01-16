# AngularJS 1.x Workshop

An intensive, practical introduction to AngularJS 1.x.

Slides are [here][10]

## Prerequisites

  * [Node][P:01]

[P:01]: https://nodejs.org/en/

## AngularJS 00 : Setup

A [polyfill][1] is a piece of code that provides the technology that you expect the browser to provide natively. A shim that mimics a future API providing fallback functionality to older browsers

[JSPM][3] is (another) JavaScript Package Manager. It uses [SystemJS][4], an universal module loader for JavaScript: it can load [CommonJS modules][5], [AMD][6] and globals. It can also translate from ES6 to ES5, i.e. we don't need another tool for that.

### Example

  * start with a blank HTML file
    http://bit.ly/formation-angularjs
  * add some content

    ```
    <h1>Hello Zaiste</h1>
    ```

  * install JSPM

    ```
    npm install jspm
    ```

  * initialize the project

    ```
    jspm init
    ```

  * add JSPM initialization at the bottom

    ```
    <script src="jspm_packages/system.js" charset="utf-8"></script>
    <script src="config.js" charset="utf-8"></script>
    <script type="text/javascript">
      System.import("app/main");
    </script>
    ```

  * add `app/main.js` with `console.log("Hello World")`
  * `jspm install jquery`
  * import jQuery

    ```
    import $ from 'jquery';
    $('h1').css({'color': 'red'});
    ```

### Exercise

  * install `fetch` polyfill
  * fetch current Paris weather from [OpenWeatherMap API][00:7]

## AngularJS 01 : Bindings

Curly braces in AngularJS represent **binding**, they render expressions out:
* `{{ "This is foo" }}` string values
* `{{ 1 + 3 }}` arithmetic expressions

Binding with object's property: AngularJS engine will *watch* for changes to each defined property.

`ng-model` directive creates a binding between an object and the view layer element (`input`, `select`, `textarea`, etc.). It is a representation of a view model i.e. an abstraction of the view exposing public properties and commands.

`ng-bind` directive can be used to render a property value from a binding instead of curly braces.

To bootstrap the framework we need AngularJS script and `ng-app` attribute on `<html>` tag.


### Example

  * start with JSPM stub
  * `jspm install angular`
  * import AngularJS

    ```
    import angular from 'angular';
    ```
  * bootstrap Angular with `ng-app` directive
  * create some binding using `ng-model` directive

    ```
    <input type="text" name="name" value="" ng-model="foo.name">
    <input type="text" name="name" value="" ng-model="foo.class">

    <div class="callout {{ foo.class }}">
      <h1>Hello {{ foo.name }}</h1>
    </div>
    ```

### Exercise

  * replace curly brackets bindings with `ng-bind` directive, what is different ?

## AngularJS 02 : Controllers

Controllers are used to set up initial state or to add behavior to modify the current state.

`ng-controller="MainController as propertyName"` binds methods and properties directly onto the controller using `this`. Controller's properties will be available in the view through `propertyName`.

### Example

  * start with JSPM
  * `jspm install angular`
  * import AngularJS

    ```
    import angular from 'angular';
    ```
  * define a controller in `app/main.js`

    ```
    class MainController {
      constructor() {
        this.title = "This is my favorite title";
      }
    }
    ```
  * use `ng-controller` to add a controller to the view; use `as` to define an **alias** for it i.e. a more convenient name to use in the view

    ```
    <body ng-controller='MainController as mc'>
    ```
  * define a module with `angular.module` and attach defined controller to it

    ```
    angular.module('app', [])
      .controller('MainController', MainController);
    ```
  `angular.module` defines where controllers will be stored; 1st parameter is the name of the module, 2nd parameter is a list of dependencies.
  * make sure module name must match up with `ng-app` value

  ```
  <html ng-app='app'>
  ```

### Exercise

  * add a method named `foo()` to the controller which returns a string and display it using `ng-bind`

## AngularJS 03 : `ngClick`

`ngClick` allows to specify a custom behavior when an element is clicked.

### Example

  * start from [AngularJS 02 : Controllers]
  * use `ng-click` to add a button with associated behavior

  ```
  <button class="button" ng-click="mc.alertMe()">Alert me</button>
  ```
  * add `alertMe()` method to `MainController`

  ```
  class MainController {
    ...
    alertMe() {
      alert("Hello World");
    }
  }
  ```

### Exercise

  * use `ng-click` to change the current title

## AngularJS 04 : `ngIf` / `ngShow` / `ngHide`

`ngIf` directive removes or re-creates an DOM element based on an expression.

`ngShow` and `ngHide` show and hide elements based on an expression using CSS and without modifying DOM

### Example

  * add `ngIf` directive to the view

  ```
  <button class="button" ng-click="foo.toggle = !foo.toggle">Show</button>
  <div id="toggler" ng-if="foo.toggle">
    Lorem ipsum sit arithmetic
  </div>
  ```

### Exercise

  * extract the expression into a method in `MainController` which toggles `div` visibility
  * reimplement the example using `ngShow` or `ngHide`, check CSS attributes for `div#toggler` element

## AngularJS 05 : `ngRepeat`

`ngRepeat` directive allows to iterate over a collection.

`ngRepeat` provide special properties for each iterated element

* `$index` : `integer` current element
* `$first` : `boolean` `true` if current element is first element
* `$middle` : `boolean` `true` if current element is last element
* `$last` : `boolean` `true` if current element is last element
* `$even` : `boolean` `true` if current element has even index
* `$odd` : `boolean` `true` if current element has odd index

### Example

  * initialize `tasks` collection in `MainController`

  ```
  class MainController {
    constructor() {
      ...
      this.tasks = [
        "Do laundry",
        "Buy socks",
        "Buy milk",
        "Laminate kitchen",
        "Buy apples"
      ];
    }
  }
  ```

  * add `ng-repeat` directive to iterate over a collection in the view

  ```
  <ul ng-repeat="task in mc.tasks">
    <li ng-bind="task"></li>
  </ul>
  ```


### Exercise

  * add CSS class to differentiate even and odd elements from a collection
  * display first element in bold
  * create a form for adding tasks and use `ng-click` to submit it

## AngularJS 06 : Using standard filters on the view

* `json` serializes an object into a JSON
* `uppercase` `lowercase` transforms string into uppercase or lowercase
* `currency` formats `number` as a currency
* `date:format` formats a `date` as a string based on given format

### Example

  * make the title uppercase

    ```
    <div ng-bind="mc.title | uppercase"></div>
    ```

  * add a field `price` with value `1234.50` and a field `today` with current date to `MainController`

    ```
    class MainController {
      constructor() {
        ...
        this.price = 1234.527;
        this.today = Date.now();
      }
    }
    ```
  * format `price` field as a currency

    ```
    <div ng-bind="price | currency"></div>
    ```
  * format `today` field as a date

    ```
    <div ng-bind="today | date:'fullDate'"></div>
    ```

### Exercise

  * format `price` using EUR
  * format `price` to 2 decimal digits
  * format `today` so it displays only day name

## AngularJS 07 : Dependency injection using `$filter`

[Dependency injection][07:00] is a software design pattern that deals with how components get hold of their dependencies. The Angular injector subsystem is in charge of creating components, resolving their dependencies, and providing them to other components as requested.

`$filter` is a service provided by AngularJS used for formatting data that can be used in controllers through DI.

Injections in AngularJS happen through constructor.

[07:00]: https://en.wikipedia.org/wiki/Dependency_injection

### Example

  * inject `$filter` into `MainController`

    ```
    class MainController {
      constructor($filter) {
        this.title = $filter('uppercase')("This is a simple title");
        ...
      }
    }
    ```

### Exercise

  * use `$filter`'s `filter` filter to select a subset of tasks (named **To Buy**) to buy and display that list


## AngularJS 08 : Realtime search with `ngRepeat` using `filter` filter 1

### Example

  * add `filter` filter on the view and connect it with `search` model using `ng-model`

    ```
    <input ng-model="search.name" type="text" />
    <ul ng-repeat="task in mc.tasks | filter:search">
      <li ng-bind="task"></li>
    </ul>
    ```

### Exercise

  * replace strings from `tasks` collection with objects having two fields `name` and `done` i.e. `Buy socks` becomes `{ "name": "Buy socks", "done": "false"}`


## AngularJS 09 : Realtime search with `ngRepeat` using `filter` filter 2

### Example

  * we change previous example to deal with JavaScript objects

    ```
    <input ng-model="search.name" type="text" />
    <input type="checkbox" ng-model="search.done"/>
    <ul ng-repeat="task in mc.tasks | filter:search ">
      <li>
        <input type="checkbox" ng-model="task.done" />
        <span ng-bind="task.name"></span>
      </li>
    </ul>
    ```

### Exercise

  * add an input to specify a limit of tasks to display, use its value for `limitTo` filter

## AngularJS 10 : Project organization

There are 3 major directory structures for AngularJS applications:

  * **Basic Structure** files are directly placed in `app` folder
  * **Standard Structure** files are grouped by their purposes (separation of concerns). Once each concern grows big enough it will be more convenient to group files as modules/components.
  * **Modular Structure** we distinguish `shared` and `components` directories. Each component is a independent set of files: its static views, directives, services etc. In that structure a component can be seen as a small MVC application.


### Example

### Exercise

  * create `SecondController` that displays `I'm second` from its property `desc` on a `div` inside `body`
  * create a module named `controllers` inside `controllers/index.js` and include it in `app` module inside `main.js`

## AngularJS 11 : Creating filters

  * start from [AngularJS 02 : Controllers]
  * define a filter in `app/filters.js`

  ```
  let reverse = () => {
    return (text) => {
      return text.split("").reverse().join("");
    }
  }
  export { reverse };
  ```
  * attach defined filter to the module

  ```
  import { reverse } from './filters';
  angular.module('app', [])
    .filter('reverse', reverse);
  ```

### Exercise

  * create a filter name `startsWithK` that is compatible with `ngRepeat` where we only want to show names from a collection starting with `K`
  * use the following `this.friends` collection

    ```
    this.friends = [
      {
        "name": "Andrew Kazinski",
      },
      {
        "name": "Andrew Kazinski",
      },
      {
        "name": "Andrew Kazinski",
      },
    ];
    ```
  * use the `startsWithK` filter on the view


## AngularJS 12: Constructor function & Service

```
function BasicService() {
  this.widget = 'Widget 1';
}

BasicService.prototype.makeWidget = function() {
  return "Preparing " + this.name
}

service = new BasicService();
```

When you use `new` on a function, JavaScript will create a variable `this` and assign it an empty object. Then, it will augment this variable with defined variables and/or with methods you assigned to the prototype. Lastly, it returns `this` out of the function.

Use `.service` on a module to tell Angular that passed function is a *constructor function*.

### Exercise

  * start from [AngularJS 02 : Controllers](#AngularJS 02 : Controllers)
  * define a service in `app/main.js`

    ```
    export default class WidgetService {
      constructor() {
        this.widget = "Widget 1";
      }

      makeWidget() {
        return "Making widget: " + this.widget;
      }
    }
    ```

  * attach defined service to the module

    ```
    angular.module('app', [])
      .controller('MainController', MainController)
      .service('widget', WidgetService)
    ```

  * inject `widget` service inside `MainController`

    ```
    class MainController
      constructor(basic) {
        this.message = basic.makeWidget();
      }
    ```

## AngularJS 13: Using services / $http

### Exercise

  * get your projects from Github using the following API:
    ```
    https://api.github.com/users/{username}/repos
    ```

## AngularJS 14: RESTful API

`Task` model

  * `id`
  * `status` enum { open, closed }
  * `name`
  * `created_at` DateTime

Create an API using preferred programming language that implements a CRUD operations for `Task` model

  * `GET /tasks` get all tasks
  * `GET /tasks/:id` get a single task
  * `POST /tasks` create a new task
  * `PUT /tasks/:id` update a single task
  * `DELETE /tasks/:id` delete a single tasks

API should use JSON as its format.

Create a dedicated service called `TaskService` that wraps `$http` and allows to call CRUD action from defined API.

Create a form on the view and connect its submission with `TaskService`.

## AngularJS 15: Promises

## AngularJS 16: Module pattern & Factory

Module pattern involves returning an object (defining your public API) from the function.

```
function widgetFactory() {
  return {
    name: 'Widget 1',
    makeWidget: function() {
      return "Preparing... " + this.name;
    }
  }
}
```

To create an instance of an object using our factory, we just invoke the (factory) function.

```
widget = widgetFactory();
```

Use `.factory` on a module to tell Angular that passed function is a factory (module pattern).

## AngularJS 17: Config

We define a state for a controller using `.config` which allows to configure the

## AngularJS 18: Directive

## AngularJS 19: Router

It is preferred to use one controller per application state instead of using it
on an element.

`ui.router` needs to be added as a dependency.

application before it boots up.

`$stateProvider` on which we define our states.

Each state has a name and its configuration.

```
$stateProvider.state("main", {
  url: "",
  controller: "MainController",
  templateUrl: "templates/main.html"

})
```


`ui-view` places a template based on given application state.


## Module : Project

### `TasksController` : `v1`

  * Define a controller
  * Define a template
  * Display JSON from memory

### Create your own API : `v2`

  * Define `GET /tasks` for fetching all tasks
    ```
    http GET localhost:9292/tasks
    ```
  * Define `POST /tasks` for creating a task
    ```
    http POST localhost:9292/tasks name="This is example" state=open
    ```
  * Install `angular-resource`
    ```
    jspm install angular-resource
    ```
  * Use `$resource` to fetch data from the API
  * Create `services` module and add as a dependency to `controllers`

### Router using `ui-router`

  * By default there is `ngRoute`
  * `ui-router` is a better alternative, it supports states and nested views
  * Install `ui-router`
    ```
    jspm install angular-ui-router
    ```
  * Add `ui-router` as a dependency
  * Define two routes using Angular module `.config`: `/` and `/tasks` for dashboard and task list respectively
  * Extract `index` into `tasks` and `home` templates and move them to `view` directory

### Creating new task

### Single view with `TaskController`

  * Define view for a single task
  * Define `get` for `TaskService`
  * Define router's state
  * Use `ui-sref` for state management

### Creating tasks

### Editing tasks


[1]: https://en.wikipedia.org/wiki/Polyfill
[3]: http://jspm.io/
[4]: https://github.com/systemjs/systemjs
[5]: http://spinejs.com/docs/commonjs
[6]: https://en.wikipedia.org/wiki/Asynchronous_module_definition
[00:7]: http://api.openweathermap.org/data/2.5/weather
[10]: https://s3.amazonaws.com/nukomeet/angular-1x-workshop.pdf
