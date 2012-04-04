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
    var converter;
    new HumanMarkup($('#input'), $('#html'), $('#output'));
    converter = new Markdown.Converter();
    return $('#input-md').on('keyup', function() {
      var html;
      html = converter.makeHtml($('#input-md').val());
      console.log(html);
      $('#html-md').text(html);
      return $('#output-md').html(html);
    });
  });

}).call(this);
