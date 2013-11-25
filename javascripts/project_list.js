$(document).ready(function () {
	$(".project_name").hover(function() {
		var e = $(this).data('desc');
	    if ($(e).css('visibility')=='hidden'){
	        $(e).css('visibility', 'visible');
		    $(".project_name").css('opacity', '0.25');
		    $(this).css('opacity', '1.0');
	    } else {
	        $(e).css('visibility', 'hidden');
		    $(".project_name").css('opacity', '1.0');
	    }
	});
});