(function() {

  $(function() {
    module("human-markup", {
      setup: function() {
        return this.hm = new HumanMarkup();
      },
      teardown: function() {
        return this.hm = null;
      }
    });
    test("should be defined globally", function() {
      return ok(this.hm, 'HumanMarkup is defined');
    });
    test("should turn big headings into h1", function() {
      equal(this.hm.process('I am Heading\n\n'), '<h1>I am Heading</h1>\n\n');
      equal(this.hm.process('I am Heading\n\nBlahblah'), '<h1>I am Heading</h1>\n\nBlahblah');
      return equal(this.hm.process('I am Heading\n\n\n\n'), '<h1>I am Heading</h1>\n\n');
    });
    test("should turn smaller headings into h2", function() {
      equal(this.hm.process('I am not Heading yet\n'), 'I am not Heading yet\n');
      return equal(this.hm.process('I am Heading\nBlahblah'), '<h2>I am Heading</h2>\n\nBlahblah');
    });
    test("should turn quoted lines into blockquotes", function() {
      equal(this.hm.process('"I am Blockquote"'), '<blockquote><p>I am Blockquote</p></blockquote>\n\n');
      return equal(this.hm.process('"I am Blockquote"\n\n'), '<blockquote><p>I am Blockquote</p></blockquote>\n\n');
    });
    test("should turn inline quotation marks into em", function() {
      equal(this.hm.process('Bla bla bla "I am Quote" bla bla.'), 'Bla bla bla "<em>I am Quote</em>" bla bla.');
      equal(this.hm.process('Bla bla bla "I am Quote" bla bla.\n\n'), 'Bla bla bla "<em>I am Quote</em>" bla bla.\n\n');
      equal(this.hm.process('\nBla bla bla "I am Quote" bla bla'), '\nBla bla bla "<em>I am Quote</em>" bla bla');
      equal(this.hm.process('Bla bla bla "I am Quote" bla "I am another" bla.'), 'Bla bla bla "<em>I am Quote</em>" bla "<em>I am another</em>" bla.');
      equal(this.hm.process('Bla "Bla" bla "bla" bla "bla" blubb "blubb"'), 'Bla "<em>Bla</em>" bla "<em>bla</em>" bla "<em>bla</em>" blubb "<em>blubb</em>"');
      return equal(this.hm.process('"Bla" "Blubb".'), '"<em>Bla</em>" "<em>Blubb</em>".');
    });
    test("should turn quotation marks into typographic ones", function() {
      this.hm.setOptions({
        typoQuotes: true
      });
      return equal(this.hm.process('Bla bla bla "I am Quote" bla bla.'), 'Bla bla bla „<em>I am Quote</em>“ bla bla.');
    });
    return test("should turn sentences with exclamation marks into bold", function() {
      equal(this.hm.process('I am bold!'), '<strong>I am bold!</strong>');
      equal(this.hm.process('I am bold, too!'), '<strong>I am bold, too!</strong>');
      equal(this.hm.process('I am semi-bold!'), '<strong>I am semi-bold!</strong>');
      equal(this.hm.process('I am under_bold!'), '<strong>I am under_bold!</strong>');
      equal(this.hm.process('I\'m bold, too!'), '<strong>I\'m bold, too!</strong>');
      equal(this.hm.process('Bla bla bla. I am bold! Bla bla.'), 'Bla bla bla. <strong>I am bold!</strong> Bla bla.');
      equal(this.hm.process('I am bold! Bla bla bla. Bla bla.'), '<strong>I am bold!</strong> Bla bla bla. Bla bla.');
      return equal(this.hm.process('Bla bla bla. Bla bla. I am bold!'), 'Bla bla bla. Bla bla. <strong>I am bold!</strong>');
    });
  });

}).call(this);
