### Features

- ability to dynamically reload i18n strings without reloading the application

### Example


```javascript
var Application = require("mojo-application"),
views = require("mojo-views"),
paperclip = require("mojo-paperclip"),
i18n = require("mojo-i18n");

var app = new Application();
app.use(views, paperclip, i18n);

var view = new views.Base({
  message: "hello",
  paper: "{{ message | t | titlecase }}!"
});

// dynamically set the i18n translations
app.set("i18n.translations", {
  "en-us": {
    hello: "hello"
  },
  "es-ES": {    
    hello : "hola"
  }
});

app.set("i18n.locale", "en-ES");

console.log(view.render()); // Hola!

app.set("i18n.locale", "en-us");

console.log(view.render()); // Hello!


```
