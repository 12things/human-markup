class HumanMarkup
  @h1_regex = /^(\w.*[^\W])$(\n\n+)/gm
  @h2_regex = /^(\w.*[^\W])$(\n)/gm
  @p_regex = /^(\w.*[\W])$(\n+)$/gm
  @strong_regex = /([\w ]*[.?])?([\w ]*[!])/g
  
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
    text = @.detectParagraphs text
    text = @.detectBolds text

    text = @.markdownAfter text
                
  detectHeadings: (text) ->
    text = text.replace HumanMarkup.h1_regex, "<h1>$1</h1>\n\n"
    text = text.replace HumanMarkup.h2_regex, "<h2>$1</h2>\n\n"

  detectParagraphs: (text) ->
    text = text.replace HumanMarkup.p_regex, "<p>$1</p>\n"

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


$ ->
  window.hm = new HumanMarkup($('#input'), $('#html'), $('#output'))
  
  converter = new Markdown.Converter()
  
  markdown = """
# Hi, I'm Markdown

What can **I do** for *you*?

## Lists
### Unordered

- one
- two
- three

### Ordered

1. eins
2. zwei
3. drei

## Links
Wanna  [google](http://google.com/ "Looking for something?") something? Are you speaking german? Try [this][de].

## Quotes

> Email-style angle brackets
are used for blockquotes.  
You don't have to repeat them on every line. 

> > And, they can be nested.

> #### Headers in blockquotes
> 
> * You can quote a list.
> * Etc.

## Images
![12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")

Psst: they work reference style like links, too.

## Horizontal rules

This rule rules
***
This does, too:

---

## Line Breaks
If a line  
ends with  
two spaces  

## Code
`<header>` is a new HTML5 tag.


[de]: http://google.de/  "German Google"
"""
  window.resetMd = () ->    
    $('#input-md').val markdown
    html = converter.makeHtml($('#input-md').val())
    $('#html-md').text html
    $('#output-md').html html
  
  resetMd()

  humanMarkup = """
This is a Heading

Here comes a paragraph.

And another paragraph.

This is a secondary Heading
Cause the paragraph comes right away.

This should be bold! This should be normal. Bold! Normal? Works.


"""
  window.resetHuman = () ->    
    $('#input').val humanMarkup
    hm.run()

  resetHuman()
  
  $('#input-md').on 'keyup', () ->
    html = converter.makeHtml($('#input-md').val())
    console.log html
    $('#html-md').text html
    $('#output-md').html html