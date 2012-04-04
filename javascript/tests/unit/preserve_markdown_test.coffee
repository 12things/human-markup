$ ->
  module("preserve-markdown", {
    setup: () ->
      @hm = new HumanMarkup()
    
    teardown: () ->
      @hm = null
  })

  test "should preserve #'s", () ->
    s='# I am not Heading\n\n'
    equal @hm.process(s), s
    s='## I am not Heading\n\n'
    equal @hm.process(s), s
    s='### I am not Heading\n\n'
    equal @hm.process(s), s
    s='#### I am not Heading\n\n'
    equal @hm.process(s), s
    s='##### I am not Heading\n\n'
    equal @hm.process(s), s
    s='###### I am not Heading\n\n'
    equal @hm.process(s), s

  test "should preserve ==='s", () ->
    s='I am not Heading\n==='
    equal @hm.process(s), s
    s='I am not Heading\n===\nBla'
    equal @hm.process(s), s
    s='I am not Heading\n===\n\n'
    equal @hm.process(s), s

  test "should preserve ---'s", () ->
    s='I am not Heading\n---'
    equal @hm.process(s), s
    s='I am not Heading\n---\nBla'
    equal @hm.process(s), s
    s='I am not Heading\n---\n\n'
    equal @hm.process(s), s

  test "should preserve hr's", () ->
    s='I am not Heading\n***'
    equal @hm.process(s), s
    s='I am not Heading\n***\nBla'
    equal @hm.process(s), s
    s='I am not Heading\n***\n\n'
    equal @hm.process(s), s

    s='I am not Heading\n___'
    equal @hm.process(s), s
    s='I am not Heading\n___\nBla'
    equal @hm.process(s), s
    s='I am not Heading\n___\n\n'
    equal @hm.process(s), s

  test "should preserve unordered lists", () ->
    s='- one\n- two\n- three'
    equal @hm.process(s), s
    s='* one\n* two\n* three'
    equal @hm.process(s), s
    s='- one\n- two\n- three\nBla'
    equal @hm.process(s), s
    s='* one\n* two\n* three\nBla'
    equal @hm.process(s), s
    s='- one\n- two\n- three\n\n'
    equal @hm.process(s), s
    s='* one\n* two\n* three\n\n'
    equal @hm.process(s), s
    s=""""
    *  A list item.

       With multiple paragraphs.

    *  Bar
    """
    equal @hm.process(s), s
    

  test "should preserve ordered lists", () ->
    s='1. one\n1. two\n1. three'
    equal @hm.process(s), s
    s='4. one\n7. two\n9. three'
    equal @hm.process(s), s
    s=""""
    1. A list item.

       With multiple paragraphs.

    1.Bar
    """
    
  test "should preserve mixed nested lists", () ->
    s="""
    *   Abacus
        * answer
    *   Bubbles
        1.  bunk
        2.  bupkis
            * BELITTLER
        3. burper
    *   Cunning
    """
    equal @hm.process(s), s

  test "should preserve unordered lists", () ->
    s='- one\n- two\n- three'
    equal @hm.process(s), s
    s='* one\n* two\n* three'
    equal @hm.process(s), s
    
  test "shoud preserve quotes", () ->
    s="""
    > Email-style angle brackets
    are used for blockquotes.  
    You don't have to repeat them on every line. 

    > > And, they can be nested.

    > #### Headers in blockquotes
    > 
    > * You can quote a list.
    > * Etc.
    """
    equal @hm.process(s), s
    s="> This is not a heading\n\n"
    equal @hm.process(s), s
    
  test "should preserve images", () ->
    s='![12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")'
    equal @hm.process(s), s
    s='![12sites][12s]'
    equal @hm.process(s), s
    s='[12sites]: http://12sites.de/assets/12sites_large.png "Visit 12sites"'
    equal @hm.process(s), s

    s='![12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n'
    equal @hm.process(s), s
    s='![12sites][12s]\n'
    equal @hm.process(s), s
    s='[12sites]: http://12sites.de/assets/12sites_large.png "Visit 12sites"\n'
    equal @hm.process(s), s

    s='![12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n\n'
    equal @hm.process(s), s
    s='![12sites][12s]\n\n'
    equal @hm.process(s), s
    s='[12sites]: http://12sites.de/assets/12sites_large.png "Visit 12sites"\n\n'
    equal @hm.process(s), s

  test "should preserve links", () ->
    s='[12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")'
    equal @hm.process(s), s
    s='[12sites][12s]'
    equal @hm.process(s), s
    s='[12sites]: http://12sites.de/assets/12sites_large.html "Visit 12sites"'
    equal @hm.process(s), s

    s='[12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n'
    equal @hm.process(s), s
    s='[12sites][12s]\n'
    equal @hm.process(s), s
    s='[12sites]: http://12sites.de/assets/12sites_large.html "Visit 12sites"\n'
    equal @hm.process(s), s

    s='[12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n\n'
    equal @hm.process(s), s
    s='[12sites][12s]\n\n'
    equal @hm.process(s), s
    s='[12sites]: http://12sites.de/assets/12sites_large.html "Visit 12sites"\n\n'
    equal @hm.process(s), s


