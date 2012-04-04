(function() {
  var HumanMarkup;

  HumanMarkup = (function() {

    HumanMarkup.heading_regex = /([\w ,\.-_!?]*)\n\n/g;

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

    HumanMarkup.prototype.process = function(input) {
      var result;
      result = input;
      result = this.detectHeading(result);
      return result;
    };

    HumanMarkup.prototype.detectHeading = function(input) {
      var output;
      output = input.replace(HumanMarkup.heading_regex, "<h1>$1</h1>\n");
      return output;
    };

    return HumanMarkup;

  })();

  $(function() {
    var converter, filling, html;
    new HumanMarkup($('#input'), $('#html'), $('#output'));
    converter = new Markdown.Converter();
    filling = "# Hi, I'm Markdown\n\nWhat can **I do** for *you*?\n\n## Lists\n### Unordered\n\n- one\n- two\n- three\n\n### Ordered\n\n1. eins\n2. zwei\n3. drei\n\n## Links\nWanna  [google](http://google.com/ \"Looking for something?\") something? Are you speaking german? Try [this][de].\n\n## Quotes\n\n> Email-style angle brackets\nare used for blockquotes.  \nYou don't have to repeat them on every line. \n\n> > And, they can be nested.\n\n> #### Headers in blockquotes\n> \n> * You can quote a list.\n> * Etc.\n\n## Horizontal rules\n\nThis rule rules\n***\nThis does, too:\n\n---\n\n## Line Breaks\nIf a line  \nends with  \ntwo spaces  \n\n## Code\n`<header>` is a new HTML5 tag.\n\n\n[de]: http://google.de/  \"German Google\"";
    $('#input-md').val(filling);
    html = converter.makeHtml($('#input-md').val());
    $('#html-md').text(html);
    $('#output-md').html(html);
    return $('#input-md').on('keyup', function() {
      html = converter.makeHtml($('#input-md').val());
      console.log(html);
      $('#html-md').text(html);
      return $('#output-md').html(html);
    });
  });

}).call(this);
