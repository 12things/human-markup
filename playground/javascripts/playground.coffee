$ ->
  window.hm = new HumanMarkup($('#input'), $('#html'), $('#output'))
  
  converter = new Markdown.Converter()
  
  markdown = """
# This is plain markdown stuff

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

  humanMarkup = """
This is human markup

"Here comes a blockquote."

And "this is an inline" quote.

This is a secondary Heading
Cause the paragraph comes right away.

This should be bold! This should be normal. Bold! Normal? Works.


"""
  window.resetHuman = () ->    
    $('#input').val humanMarkup+markdown
    hm.run()
    $('#input-md').val $('#html').text()
    html = converter.makeHtml($('#input-md').val())
    $('#html-md').text html
    $('#output-md').html html

  resetHuman()
  
  $('#input').on 'keyup', () ->
    $('#input-md').val $('#html').text()
    html = converter.makeHtml($('#input-md').val())
    $('#html-md').text html
    $('#output-md').html html
    
  # 
  # window.resetMd = () ->
  #   $('#input-md').val markdown
  #   html = converter.makeHtml($('#input-md').val())
  #   $('#html-md').text html
  #   $('#output-md').html html
  # 
  # resetMd()

  
  $('#input-md').on 'keyup', () ->
    html = converter.makeHtml($('#input-md').val())
    console.log html
    $('#html-md').text html
    $('#output-md').html html