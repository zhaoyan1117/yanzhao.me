$(document).ready(function () {
  $("a.tag").click(function() {
    var googleCseUrl = "http://www.google.com/cse?cx=005533343238920809320%3Aewfdhtvdox4&ie=UTF-8&sa=Search"
    var uriEncodedTag = encodeURI($(this).text());
    var tagUrl = googleCseUrl + "&q=" + uriEncodedTag;
    window.location.href = tagUrl;
  });
});
