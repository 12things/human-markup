(function() {

  $(function() {
    var converter, humanMarkup, markdown;
    window.hm = new HumanMarkup($('#input'), $('#html'), $('#output'));
    converter = new Markdown.Converter();
    markdown = "# This is plain markdown stuff\n\nWhat can **I do** for *you*?\n\n## Lists\n### Unordered\n\n- one\n- two\n- three\n\n### Ordered\n\n1. eins\n2. zwei\n3. drei\n\n## Links\nWanna  [google](http://google.com/ \"Looking for something?\") something? Are you speaking german? Try [this][de].\n\n## Quotes\n\n> Email-style angle brackets\nare used for blockquotes.  \nYou don't have to repeat them on every line. \n\n> > And, they can be nested.\n\n> #### Headers in blockquotes\n> \n> * You can quote a list.\n> * Etc.\n\n## Images\n![12sites](http://12sites.de/assets/12sites_large.png \"Visit 12sites\")\n\nPsst: they work reference style like links, too.\n\n## Horizontal rules\n\nThis rule rules\n***\nThis does, too:\n\n---\n\n## Line Breaks\nIf a line  \nends with  \ntwo spaces  \n\n## Code\n`<header>` is a new HTML5 tag.\n\n\n[de]: http://google.de/  \"German Google\"\n\n";
    humanMarkup = "This is human markup\n\n\"Here comes a blockquote.\"\n\nAnd \"this is an inline\" quote.\n\nThis is a secondary Heading\nCause the paragraph comes right away.\n\nThis should be bold! This should be normal. Bold! Normal? Works.\n\n";
    window.resetHuman = function() {
      var html;
      $('#input').val(humanMarkup + markdown);
      hm.run();
      $('#input-md').val($('#html').text());
      html = converter.makeHtml($('#input-md').val());
      $('#html-md').text(html);
      return $('#output-md').html(html);
    };
    resetHuman();
    $('#input').on('keyup', function() {
      var html;
      $('#input-md').val($('#html').text());
      html = converter.makeHtml($('#input-md').val());
      $('#html-md').text(html);
      return $('#output-md').html(html);
    });
    return $('#input-md').on('keyup', function() {
      var html;
      html = converter.makeHtml($('#input-md').val());
      console.log(html);
      $('#html-md').text(html);
      return $('#output-md').html(html);
    });
  });

}).call(this);
