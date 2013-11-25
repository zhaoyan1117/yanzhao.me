$(document).ready(function () {
	$(".project_name").hover(function() {
		var e = $(this).data('desc');
	    if ($(e).css('visibility')=='hidden'){
	        $(e).css('visibility', 'visible');
	    } else {
	        $(e).css('visibility', 'hidden');
	    }
	});
});