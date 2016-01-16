export default class BasicService {
  constructor() {
    this.widget = "Widget 1";
  }

  makeWidget() {
    return "Making widget: " + this.widget;
  }
}
