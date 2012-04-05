(function() {

  window.HumanMarkup = (function() {

    HumanMarkup.h1_regex = /^([ ]*[^\d\W].*[^\W_])(\n\n+)/gm;

    HumanMarkup.h2_regex = /^([ ]*[^\d\W].*[^\W_])(\n[^*=_-])/gm;

    HumanMarkup.blockquote_regex = /^"(.*)"(\n*)$/gm;

    HumanMarkup.cite_regex = /[^(<]"(.*)"[^)>\n]/g;

    HumanMarkup.strong_regex = /(\w[\w ,'-]*[!])/g;

    function HumanMarkup(input, html, output) {
      var _this = this;
      this.input = input;
      this.html = html;
      this.output = output;
      if ((this.input != null) && (this.html != null) && (this.output != null)) {
        this.input.on('keyup', function() {
          return _this.run();
        });
      }
    }

    HumanMarkup.prototype.run = function() {
      this.html.text(this.process(this.input.val()));
      return this.output.html(this.process(this.input.val()));
    };

    HumanMarkup.prototype.process = function(text) {
      text = this.detectHeadings(text);
      text = this.detectBlockquotes(text);
      text = this.detectCites(text);
      return text = this.detectBolds(text);
    };

    HumanMarkup.prototype.detectHeadings = function(text) {
      text = text.replace(HumanMarkup.h1_regex, "<h1>$1</h1>\n\n");
      return text = text.replace(HumanMarkup.h2_regex, "<h2>$1</h2>\n$2");
    };

    HumanMarkup.prototype.detectBlockquotes = function(text) {
      return text = text.replace(HumanMarkup.blockquote_regex, "<blockquote><p>$1</p></blockquote>\n\n");
    };

    HumanMarkup.prototype.detectCites = function(text) {
      return text = text.replace(HumanMarkup.cite_regex, " <cite>$1</cite> ");
    };

    HumanMarkup.prototype.detectBolds = function(text) {
      return text = text.replace(HumanMarkup.strong_regex, "<strong>$1</strong>");
    };

    return HumanMarkup;

  })();

}).call(this);
