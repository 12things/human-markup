(function() {

  $(function() {
    module("preserve-markdown", {
      setup: function() {
        return this.hm = new HumanMarkup();
      },
      teardown: function() {
        return this.hm = null;
      }
    });
    test("should preserve #'s", function() {
      var s;
      s = '# I am not Heading\n\n';
      equal(this.hm.process(s), s);
      s = '## I am not Heading\n\n';
      equal(this.hm.process(s), s);
      s = '### I am not Heading\n\n';
      equal(this.hm.process(s), s);
      s = '#### I am not Heading\n\n';
      equal(this.hm.process(s), s);
      s = '##### I am not Heading\n\n';
      equal(this.hm.process(s), s);
      s = '###### I am not Heading\n\n';
      return equal(this.hm.process(s), s);
    });
    test("should preserve ==='s", function() {
      var s;
      s = 'I am not Heading\n===';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n===\nBla';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n===\n\n';
      return equal(this.hm.process(s), s);
    });
    test("should preserve ---'s", function() {
      var s;
      s = 'I am not Heading\n---';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n---\nBla';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n---\n\n';
      return equal(this.hm.process(s), s);
    });
    test("should preserve hr's", function() {
      var s;
      s = 'I am not Heading\n***';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n***\nBla';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n***\n\n';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n___';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n___\nBla';
      equal(this.hm.process(s), s);
      s = 'I am not Heading\n___\n\n';
      return equal(this.hm.process(s), s);
    });
    test("should preserve unordered lists", function() {
      var s;
      s = '- one\n- two\n- three';
      equal(this.hm.process(s), s);
      s = '* one\n* two\n* three';
      equal(this.hm.process(s), s);
      s = '- one\n- two\n- three\nBla';
      equal(this.hm.process(s), s);
      s = '* one\n* two\n* three\nBla';
      equal(this.hm.process(s), s);
      s = '- one\n- two\n- three\n\n';
      equal(this.hm.process(s), s);
      s = '* one\n* two\n* three\n\n';
      equal(this.hm.process(s), s);
      s = "\"\n*  A list item.\n\n   With multiple paragraphs.\n\n*  Bar";
      return equal(this.hm.process(s), s);
    });
    test("should preserve ordered lists", function() {
      var s;
      s = '1. one\n1. two\n1. three';
      equal(this.hm.process(s), s);
      s = '4. one\n7. two\n9. three';
      equal(this.hm.process(s), s);
      return s = "\"\n1. A list item.\n\n   With multiple paragraphs.\n\n1.Bar";
    });
    test("should preserve mixed nested lists", function() {
      var s;
      s = "*   Abacus\n    * answer\n*   Bubbles\n    1.  bunk\n    2.  bupkis\n        * BELITTLER\n    3. burper\n*   Cunning";
      return equal(this.hm.process(s), s);
    });
    test("should preserve unordered lists", function() {
      var s;
      s = '- one\n- two\n- three';
      equal(this.hm.process(s), s);
      s = '* one\n* two\n* three';
      return equal(this.hm.process(s), s);
    });
    test("shoud preserve quotes", function() {
      var s;
      s = "> Email-style angle brackets\nare used for blockquotes.  \nYou don't have to repeat them on every line. \n\n> > And, they can be nested.\n\n> #### Headers in blockquotes\n> \n> * You can quote a list.\n> * Etc.";
      equal(this.hm.process(s), s);
      s = "> This is not a heading\n\n";
      return equal(this.hm.process(s), s);
    });
    test("should preserve images", function() {
      var s;
      s = '![12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")';
      equal(this.hm.process(s), s);
      s = '![12sites][12s]';
      equal(this.hm.process(s), s);
      s = '[12sites]: http://12sites.de/assets/12sites_large.png "Visit 12sites"';
      equal(this.hm.process(s), s);
      s = '![12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n';
      equal(this.hm.process(s), s);
      s = '![12sites][12s]\n';
      equal(this.hm.process(s), s);
      s = '[12sites]: http://12sites.de/assets/12sites_large.png "Visit 12sites"\n';
      equal(this.hm.process(s), s);
      s = '![12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n\n';
      equal(this.hm.process(s), s);
      s = '![12sites][12s]\n\n';
      equal(this.hm.process(s), s);
      s = '[12sites]: http://12sites.de/assets/12sites_large.png "Visit 12sites"\n\n';
      return equal(this.hm.process(s), s);
    });
    return test("should preserve links", function() {
      var s;
      s = '[12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")';
      equal(this.hm.process(s), s);
      s = '[12sites][12s]';
      equal(this.hm.process(s), s);
      s = '[12sites]: http://12sites.de/assets/12sites_large.html "Visit 12sites"';
      equal(this.hm.process(s), s);
      s = '[12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n';
      equal(this.hm.process(s), s);
      s = '[12sites][12s]\n';
      equal(this.hm.process(s), s);
      s = '[12sites]: http://12sites.de/assets/12sites_large.html "Visit 12sites"\n';
      equal(this.hm.process(s), s);
      s = '[12sites](http://12sites.de/assets/12sites_large.png "Visit 12sites")\n\n';
      equal(this.hm.process(s), s);
      s = '[12sites][12s]\n\n';
      equal(this.hm.process(s), s);
      s = '[12sites]: http://12sites.de/assets/12sites_large.html "Visit 12sites"\n\n';
      return equal(this.hm.process(s), s);
    });
  });

}).call(this);
