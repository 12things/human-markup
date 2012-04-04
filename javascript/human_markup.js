(function() {

  window.HumanMarkup = (function() {

    HumanMarkup.h1_regex = /^(\w.*[^\W])$(\n\n+)/gm;

    HumanMarkup.h2_regex = /^(\w.*[^\W])$(\n)/gm;

    HumanMarkup.p_regex = /^(\w.*[\W])$(\n+)$/gm;

    HumanMarkup.strong_regex = /([\w ]*[.?])?([\w ]*[!])/g;

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
      return text = text.replace(HumanMarkup.p_regex, "<p>$1</p>\n");
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

}).call(this);
