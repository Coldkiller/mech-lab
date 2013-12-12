var p = 'scripts/vendor/';
require(["jquery", p + "dropdown.js",p + "jquery.knob.js", p + "prettify.js", "./scripts/examples.js"], function($, dd, pf, kb , examples) {
  $(document).ready(function(e) {
    prettyPrint();
    examples.bind();
  });
});