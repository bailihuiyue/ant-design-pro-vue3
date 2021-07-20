class App {
  /**
   * elements
   */
  get heading() { return $('h1'); }

  /**
   * methods
   */
  open(path = '/') {
    browser.url(path);
  }
}

export default new App();
