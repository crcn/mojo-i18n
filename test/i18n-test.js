var expect = require("expect.js"),
views = require("mojo-views"),
paperclip = require("mojo-paperclip"),
Application = require("mojo-application")
i18n = require("../");


describe("i18n#", function () {

  var app;

  var translations = {
    "en-us": {
      "hello": "hello",
      "message": "hello __fn__, __ln__"
    },
    "es-es": {
      "hello": "hola"
    }
  };

  beforeEach(function () {
    app = new Application();
    app.use(views, paperclip, i18n);
  });

  it("can translate an i18n string", function () {


    app.i18n.setProperties({
      translations: translations,
      locale: "en-us"
    });

    var v = new views.Base({
      message: "hello",
      paper: "{{message|t}}"
    }, app);

    expect(v.render().toString()).to.be("hello");

  });

  it("can dynamically change the locale", function () {
    app.i18n.setProperties({
      translations: translations,
      locale: "en-us"
    });

    var v = new views.Base({
      message: "hello",
      paper: "{{message|t}}"
    }, app);

    expect(v.render().toString()).to.be("hello");
    app.i18n.set("locale", "es-es");
    expect(v.section.toString()).to.be("hola");
  });

  it("can have alternative text in the first param", function () {

    var v = new views.Base({
      message: "blarg",
      paper: "{{message|t('something')}}"
    }, app);

    expect(v.render().toString()).to.be("something");
  });

  it("can have alternative text in the first param", function () {

    app.i18n.setProperties({
      translations: translations,
      locale: "en-us"
    });

    var v = new views.Base({
      message: "message",
      paper: "{{message|t({fn:'a',ln:'b'})}}"
    }, app);

    expect(v.render().toString()).to.be("hello a, b");
  });
});