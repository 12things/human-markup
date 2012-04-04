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
  
  converter = new Markdown.Converter()
  
  filling = """
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
  $('#input-md').val filling
  html = converter.makeHtml($('#input-md').val())
  $('#html-md').text html
  $('#output-md').html html
    
  $('#input-md').on 'keyup', () ->
    html = converter.makeHtml($('#input-md').val())
    console.log html
    $('#html-md').text html
    $('#output-md').html html