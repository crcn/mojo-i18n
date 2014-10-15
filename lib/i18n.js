var bindable = require("bindable");

function I18n () {
  bindable.Object.call(this);
}

module.exports = bindable.Object.extend(I18n, {
  t: function (string, params) {

    var translation = this.get(["translations", String(this.locale)].concat(string.split(".")));

    if (translation && params) {
      for (var key in params) {
        translation = translation.replace(new RegExp("__" + key + "__", "g"), params[key]);
      }
    }

    return translation;
  }
});