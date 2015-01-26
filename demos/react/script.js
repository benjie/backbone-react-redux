var DOM = React.DOM;

var HomeView = React.createClass({
  displayName: "HomeView",

  getInitialState: function() {
    return {
      randomNumber: this.randomNumber()
    }
  },

  randomNumber: function() {
    return Math.floor(Math.random() * 100) + 1;
  },

  newNumber: function(e) {
    this.setState({
      randomNumber: this.randomNumber()
    });
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Hello World!"), 
        React.createElement("p", {onClick: this.newNumber}, 
          "Random number: ", this.state.randomNumber, " (click for another)"
        ), 
        React.createElement("textarea", null, "Notes...")
      )
    );
  }
});

var AboutView = Backbone.View.extend({
  template: _.template('<h1>About</h1><p><img src="http://www.reactiongifs.com/r/1gjdAX7.gif"></p>'),

  render: function() {
    this.$el.html(this.template());
  }
});

var AppRouter = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $("#content");
    this.rootEl = this.$rootEl[0];
  },

  setView: function(view) {
    if (this.view) {
      if (this.view instanceof Backbone.View) {
        this.view.remove();
      } else {
        React.unmountComponentAtNode(this.rootEl);
      }
    }
    this.view = view;
    if (this.view instanceof Backbone.View) {
      this.view.render();
      this.$rootEl.append(this.view.el);
    } else {
      React.render(this.view, this.rootEl);
    }
  },

  // ----------

  routes: {
    '': 'homeRoute',
    'about': 'aboutRoute'
  },

  homeRoute: function() {
    this.setView(new HomeView())
  },

  aboutRoute: function() {
    this.setView(new AboutView())
  }
});

var appRouter = new AppRouter();
Backbone.history.start();
