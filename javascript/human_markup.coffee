class window.HumanMarkup
  @h1_regex = /^([ ]*[^\d\W].*[^\W_])(\n\n+)/gm
  @h2_regex = /^([ ]*[^\d\W].*[^\W_])(\n[^*=_-])/gm
  @blockquote_regex = /^"(.*)"(\n*)$/gm
  @quote_regex = /[^(<]"(.*)"[^)>\n]/g
  @strong_regex = /(\w[\w ,'-]*[!])/g

  constructor: (@input, @html, @output) ->
    if @input? && @html? && @output?
      @input.on 'keyup', () =>
        @.run()
  
  run: () ->
    @html.text @.process(@input.val())
    @output.html @.process(@input.val())
  
  process: (text) ->
    # Human Markup
    text = @.detectHeadings text
    text = @.detectBlockquotes text
    text = @.detectQuotes text
    text = @.detectBolds text
                
  detectHeadings: (text) ->
    text = text.replace HumanMarkup.h1_regex, "<h1>$1</h1>\n\n"
    text = text.replace HumanMarkup.h2_regex, "<h2>$1</h2>\n$2"

  detectBlockquotes: (text) ->
    text = text.replace HumanMarkup.blockquote_regex, "<blockquote><p>$1</p></blockquote>\n\n"

  detectQuotes: (text) ->
    text = text.replace HumanMarkup.quote_regex, " <q>$1</q> "

  detectBolds: (text) ->
    text = text.replace HumanMarkup.strong_regex, "<strong>$1</strong>"
