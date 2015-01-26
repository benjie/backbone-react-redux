HomeView = React.createClass
  displayName: "HomeView"

  getInitialState: ->
    randomNumber: @randomNumber()

  randomNumber: ->
    Math.floor(Math.random() * 100) + 1

  newNumber: (e) ->
    @setState
      randomNumber: @randomNumber()
    return

  render: ->
    <div>
      <h1>Hello World!</h1>
      <p onClick={@newNumber}>
        Random number: {@state.randomNumber} (click for another)
      </p>
      <textarea defaultValue="Notes..." />
    </div>

AboutView = Backbone.View.extend
  template: _.template """
    <h1>About</h1>
    <p>
      <img src="http://www.reactiongifs.com/r/1gjdAX7.gif">
    </p>
    """

  render: ->
    @$el.html @template()
    return

AppRouter = Backbone.Router.extend
  initialize: ->
    @$rootEl = $("#content")
    @rootEl = @$rootEl[0]
    return

  setView: (view) ->
    if @view
      if @view instanceof Backbone.View
        @view.remove()
      else
        React.unmountComponentAtNode(@rootEl)
    @view = view
    if @view instanceof Backbone.View
      @view.render()
      @$rootEl.append(@view.el)
    else
      React.render(@view, @rootEl)
    return

  # ----------

  routes:
    '': 'homeRoute'
    'about': 'aboutRoute'

  homeRoute: ->
    @setView new HomeView()

  aboutRoute: ->
    @setView new AboutView()

appRouter = new AppRouter()
Backbone.history.start()
