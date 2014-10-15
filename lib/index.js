var I18n = require("./i18n");

module.exports = function (app) {

  var i18n;
  app.set("i18n", i18n = new I18n(app));


  // register the modifier
  app.bind("paperclip", { to: function (paperclip) {
    paperclip.modifier("t", function (string, params, alt) {

      // alt = alternative text if translation doesn't exist.
      if (typeof params === "string") {
        alt = params;
      }

      var self = this;

      // wait for any changes to i18n, then update the binding
      this.disposable(i18n.bind("locale", function () {
        self.update();
      }));

      // wait for any changes to i18n, then update the binding
      this.disposable(i18n.bind("translations", function () {
        self.update();
      }));

      return i18n.t(string, params) || alt;
    });
  }}).now();
}