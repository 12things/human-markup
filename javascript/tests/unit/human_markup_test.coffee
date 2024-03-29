$ ->
  module("human-markup", {
    setup: () ->
      @hm = new HumanMarkup()
    
    teardown: () ->
      @hm = null
  })

  test "should be defined globally", () ->
    ok @hm, 'HumanMarkup is defined'

  test "should turn big headings into h1", () ->
    equal @hm.process('I am Heading\n\n'), '<h1>I am Heading</h1>\n\n'
    equal @hm.process('I am Heading\n\nBlahblah'), '<h1>I am Heading</h1>\n\nBlahblah'
    equal @hm.process('I am Heading\n\n\n\n'), '<h1>I am Heading</h1>\n\n'

  test "should turn smaller headings into h2", () ->
    equal @hm.process('I am not Heading yet\n'), 'I am not Heading yet\n'
    equal @hm.process('I am Heading\nBlahblah'), '<h2>I am Heading</h2>\n\nBlahblah'

  test "should turn quoted lines into blockquotes", () ->
    equal @hm.process('"I am Blockquote"'), '<blockquote><p>I am Blockquote</p></blockquote>\n\n'
    equal @hm.process('"I am Blockquote"\n\n'), '<blockquote><p>I am Blockquote</p></blockquote>\n\n'

  test "should turn inline quotation marks into em", () ->
    equal @hm.process('Bla bla bla "I am Quote" bla bla.'), 'Bla bla bla "<em>I am Quote</em>" bla bla.'
    equal @hm.process('Bla bla bla "I am Quote" bla bla.\n\n'), 'Bla bla bla "<em>I am Quote</em>" bla bla.\n\n'
    equal @hm.process('\nBla bla bla "I am Quote" bla bla'), '\nBla bla bla "<em>I am Quote</em>" bla bla'
    
    equal @hm.process('Bla bla bla "I am Quote" bla "I am another" bla.'), 'Bla bla bla "<em>I am Quote</em>" bla "<em>I am another</em>" bla.'    
    equal @hm.process('Bla "Bla" bla "bla" bla "bla" blubb "blubb"'), 'Bla "<em>Bla</em>" bla "<em>bla</em>" bla "<em>bla</em>" blubb "<em>blubb</em>"'
    equal @hm.process('"Bla" "Blubb".'), '"<em>Bla</em>" "<em>Blubb</em>".'
    
  test "should turn quotation marks into typographic ones", () ->
    @hm.setOptions {typoQuotes: true}
    equal @hm.process('Bla bla bla "I am Quote" bla bla.'), 'Bla bla bla „<em>I am Quote</em>“ bla bla.'


  test "should turn sentences with exclamation marks into bold", () ->
    equal @hm.process('I am bold!'), '<strong>I am bold!</strong>'
    equal @hm.process('I am bold, too!'), '<strong>I am bold, too!</strong>'    
    equal @hm.process('I am semi-bold!'), '<strong>I am semi-bold!</strong>'    
    equal @hm.process('I am under_bold!'), '<strong>I am under_bold!</strong>'
    equal @hm.process('I\'m bold, too!'), '<strong>I\'m bold, too!</strong>'    
    equal @hm.process('Bla bla bla. I am bold! Bla bla.'), 'Bla bla bla. <strong>I am bold!</strong> Bla bla.'
    equal @hm.process('I am bold! Bla bla bla. Bla bla.'), '<strong>I am bold!</strong> Bla bla bla. Bla bla.'
    equal @hm.process('Bla bla bla. Bla bla. I am bold!'), 'Bla bla bla. Bla bla. <strong>I am bold!</strong>'


