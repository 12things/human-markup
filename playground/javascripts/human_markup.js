(function() {
  var HumanMarkup;

  HumanMarkup = (function() {

    HumanMarkup.h1_regex = /^(\w.*[^\W])$(\n\n+)/gm;

    HumanMarkup.h2_regex = /^(\w.*[^\W])$(\n)/gm;

    HumanMarkup.p_regex = /^(\w.*[\W])$(\n\n+)/gm;

    HumanMarkup.strong_regex = /([\w ]*[.?])?([\w. ]*[!])/g;

    function HumanMarkup(input, html, output) {
      var _this = this;
      this.input = input;
      this.html = html;
      this.output = output;
      this.input.on('keyup', function() {
        return _this.run();
      });
    }

    HumanMarkup.prototype.run = function() {
      this.html.text(this.process(this.input.val()));
      return this.output.html(this.process(this.input.val()));
    };

    HumanMarkup.prototype.process = function(text) {
      text = this.markdownBefore(text);
      text = this.detectHeadings(text);
      text = this.detectParagraphs(text);
      text = this.detectBolds(text);
      return text = this.markdownAfter(text);
    };

    HumanMarkup.prototype.detectHeadings = function(text) {
      text = text.replace(HumanMarkup.h1_regex, "<h1>$1</h1>\n\n");
      return text = text.replace(HumanMarkup.h2_regex, "<h2>$1</h2>\n\n");
    };

    HumanMarkup.prototype.detectParagraphs = function(text) {
      return text = text.replace(HumanMarkup.p_regex, "<p>$1</p>\n\n");
    };

    HumanMarkup.prototype.detectBolds = function(text) {
      return text = text.replace(HumanMarkup.strong_regex, "$1<strong>$2</strong>");
    };

    HumanMarkup.prototype.markdownBefore = function(text) {
      text = text.replace(/~/g, "~T");
      text = text.replace(/\$/g, "~D");
      text = text.replace(/\r\n/g, "\n");
      text = text.replace(/\r/g, "\n");
      return text = text.replace(/^[ \t]+$/mg, "");
    };

    HumanMarkup.prototype.markdownAfter = function(text) {
      text = text.replace(/~D/g, "$$");
      return text = text.replace(/~T/g, "~");
    };

    return HumanMarkup;

  })();

  $(function() {
    var converter, humanMarkup, markdown;
    window.hm = new HumanMarkup($('#input'), $('#html'), $('#output'));
    converter = new Markdown.Converter();
    markdown = "# Hi, I'm Markdown\n\nWhat can **I do** for *you*?\n\n## Lists\n### Unordered\n\n- one\n- two\n- three\n\n### Ordered\n\n1. eins\n2. zwei\n3. drei\n\n## Links\nWanna  [google](http://google.com/ \"Looking for something?\") something? Are you speaking german? Try [this][de].\n\n## Quotes\n\n> Email-style angle brackets\nare used for blockquotes.  \nYou don't have to repeat them on every line. \n\n> > And, they can be nested.\n\n> #### Headers in blockquotes\n> \n> * You can quote a list.\n> * Etc.\n\n## Images\n![12sites](http://12sites.de/assets/12sites_large.png \"Visit 12sites\")\n\nPsst: they work reference style like links, too.\n\n## Horizontal rules\n\nThis rule rules\n***\nThis does, too:\n\n---\n\n## Line Breaks\nIf a line  \nends with  \ntwo spaces  \n\n## Code\n`<header>` is a new HTML5 tag.\n\n\n[de]: http://google.de/  \"German Google\"";
    window.resetMd = function() {
      var html;
      $('#input-md').val(markdown);
      html = converter.makeHtml($('#input-md').val());
      $('#html-md').text(html);
      return $('#output-md').html(html);
    };
    resetMd();
    humanMarkup = "This is a Heading\n\nHere comes a paragraph.\n\nAnd another paragraph.\n\nThis is a secondary Heading\nCause the paragraph comes right away.\n\nThis should be bold! This should be normal. Bold! Normal? Works.\n\n";
    window.resetHuman = function() {
      $('#input').val(humanMarkup);
      return hm.run();
    };
    resetHuman();
    return $('#input-md').on('keyup', function() {
      var html;
      html = converter.makeHtml($('#input-md').val());
      console.log(html);
      $('#html-md').text(html);
      return $('#output-md').html(html);
    });
  });

}).call(this);
