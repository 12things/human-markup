class window.HumanMarkup
  @h1_regex = /^(\w.*[^\W])$(\n\n+)/gm
  @h2_regex = /^(\w.*[^\W])$(\n)/gm
  @blockquote_regex = /^"(.*)"(\n*)$/gm
  @quote_regex = /[^(]"(.*)"[^)]/g
  @strong_regex = /([\w ]*[.?])?([\w ]*[!])[^[]/g
  
  constructor: (@input, @html, @output) ->
    @input.on 'keyup', () =>
      @.run()
  
  run: () ->
    @html.text @.process(@input.val())
    @output.html @.process(@input.val())
  
  process: (text) ->
    text = @.markdownBefore text
    
    # Human Markup
    text = @.detectHeadings text
    text = @.detectBlockquotes text
    text = @.detectQuotes text
    text = @.detectBolds text
    
    text = @.markdownAfter text
                
  detectHeadings: (text) ->
    text = text.replace HumanMarkup.h1_regex, "<h1>$1</h1>\n\n"
    text = text.replace HumanMarkup.h2_regex, "<h2>$1</h2>\n\n"

  detectBlockquotes: (text) ->
    text = text.replace HumanMarkup.blockquote_regex, "<blockquote><p>$1</p></blockquote>\n"

  detectQuotes: (text) ->
    text = text.replace HumanMarkup.quote_regex, " <q>$1</q> "

  detectBolds: (text) ->
    text = text.replace HumanMarkup.strong_regex, "$1<strong>$2</strong>"
    
  markdownBefore: (text) ->
    # attacklab: Replace ~ with ~T
    # This lets us use tilde as an escape char to avoid md5 hashes
    # The choice of character is arbitray; anything that isn't
    # magic in Markdown will work.
    text = text.replace(/~/g, "~T")
            
    # attacklab: Replace $ with ~D
    # RegExp interprets $ as a special character
    # when it's in a replacement string
    text = text.replace(/\$/g, "~D")

    # Standardize line endings
    text = text.replace(/\r\n/g, "\n") # DOS to Unix
    text = text.replace(/\r/g, "\n")  # Mac to Unix

    # Make sure text begins and ends with a couple of newlines:
    # text = "\n\n" + text + "\n\n"

    # Strip any lines consisting only of spaces and tabs.
    # This makes subsequent regexen easier to write, because we can
    # match consecutive blank lines with /\n+/ instead of something
    # contorted like /[ \t]*\n+/ .
    text = text.replace(/^[ \t]+$/mg, "");

  markdownAfter: (text) ->
    # attacklab: Restore dollar signs
    text = text.replace(/~D/g, "$$")
    # attacklab: Restore tildes
    text = text.replace(/~T/g, "~");
