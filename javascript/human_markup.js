(function() {

  window.HumanMarkup = (function() {

    HumanMarkup.h1_regex = /^([ ]*[^\d\W].*[^\W_])(\n\n+)/gm;

    HumanMarkup.h2_regex = /^([ ]*[^\d\W].*[^\W_])(\n[^*=_-])/gm;

    HumanMarkup.blockquote_regex = /^\s*"(.*)"\s*$/gm;

    HumanMarkup.em_regex = /[^(<](["'„‚‘»›«‹])(.+?)(["'“‘«‹»›])[^)>\n]/g;

    HumanMarkup.strong_regex = /(\w[\w ,'-]*[!])/g;

    function HumanMarkup(input, html, output, options) {
      var _this = this;
      this.input = input;
      this.html = html;
      this.output = output;
      if (options == null) options = {};
      this.options = $.extend({
        typoQuotes: false
      }, options);
      if ((this.input != null) && (this.html != null) && (this.output != null)) {
        this.input.on('keyup', function() {
          return _this.run();
        });
      }
    }

    HumanMarkup.prototype.setOptions = function(options) {
      this.options = options;
    };

    HumanMarkup.prototype.run = function() {
      this.html.text(this.process(this.input.val()));
      return this.output.html(this.process(this.input.val()));
    };

    HumanMarkup.prototype.process = function(text) {
      text = this.detectHeadings(text);
      text = this.detectBlockquotes(text);
      text = this.detectQuotations(text);
      return text = this.detectBolds(text);
    };

    HumanMarkup.prototype.detectHeadings = function(text) {
      text = text.replace(HumanMarkup.h1_regex, "<h1>$1</h1>\n\n");
      return text = text.replace(HumanMarkup.h2_regex, "<h2>$1</h2>\n$2");
    };

    HumanMarkup.prototype.detectBlockquotes = function(text) {
      return text = text.replace(HumanMarkup.blockquote_regex, "<blockquote><p>$1</p></blockquote>\n\n");
    };

    HumanMarkup.prototype.detectQuotations = function(text) {
      var replacement;
      replacement = this.options.typoQuotes ? " „<em>$2</em>“ " : " $1<em>$2</em>$3 ";
      return text = text.replace(HumanMarkup.em_regex, replacement);
    };

    HumanMarkup.prototype.detectBolds = function(text) {
      return text = text.replace(HumanMarkup.strong_regex, "<strong>$1</strong>");
    };

    return HumanMarkup;

  })();

}).call(this);
