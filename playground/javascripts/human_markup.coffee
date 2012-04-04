class HumanMarkup
  @heading_regex = /([\w ,\.-_!?]*)\n\n/g
  
  constructor: (@input, @html, @output) ->
    @input.on 'keyup', () =>
      @.run()
    
  run: () ->
    @html.text @.process(@input.val())
    @output.html @.process(@input.val())
    
  process: (input) ->
    result = input
    result = @.detectHeading result
    
    result
  
  detectHeading: (input) ->
    output = input.replace HumanMarkup.heading_regex, "<h1>$1</h1>\n"
    output

$ ->
  new HumanMarkup($('#input'), $('#html'), $('#output'))