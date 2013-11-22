$(document).ready(function () {
  $("#search-icon").click(function() {
  	var search_form = $("#search form")
	if (typeof is_down === 'undefined') {is_down = false}
	if (!is_down) {
	    search_form.slideDown(function() {
			$(this).find("input[type=text]").focus();
	    })
	    is_down = true;
	} else {
		search_form.slideUp(function() {
	      $(this).find("input[type=text]").focus();
	    })
		is_down = false;
	};      
    return false;
  });
});