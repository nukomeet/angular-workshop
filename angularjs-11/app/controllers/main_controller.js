export default class MainController {
  constructor(basic, $filter) {
    this.title = $filter('uppercase')("My favourite title");
    this.message = basic.makeWidget();

    this.tasks = [
      "Do laundry",
      "Buy socks",
      "Buy milk",
      "Laminate kitchen",
      "Buy apples"
    ];

    this.tasks2 = [
      { "name": "Do laundry", "done": false },
      { "name": "Buy socks", "done": false },
      { "name": "Buy milk", "done": false },
      { "name": "Laminate kitchen", "done": false },
      { "name": "Buy apples", "done": false }
    ];
  }

  foo() {
    return "This is Foo";
  }

  boo() {
    return "This is here: " + this.message;
  }

  alertMe() {
    this.title = "Hello Tomek";

  }
};
