$(document).ready(function () {

	$(".project_name").hover(
		function(){
			var project_list_response_time = 200;
			var desc = $(this).data('desc');

			$(".project_name").not(this).stop(true, false).animate({
				opacity: 0.25
			}, project_list_response_time);

			$(desc).css({opacity: 0.0, visibility: "visible"}).stop(true, false).animate({
				opacity: 1.0
			}, project_list_response_time);
		},
		function() {
			var project_list_response_time = 200;
			var desc = $(this).data('desc');

			$(".project_name").not(this).stop(true, false).animate({
				opacity: 1
			}, project_list_response_time);

			$(desc).stop(true, false).animate({
				opacity: 0.0
			}, project_list_response_time).css({visibility: "hidden"});
		}
	);

	loading_commits = false;
	$(".refresh_commits").click(showCommits);

	$(".refresh_commits").hover(function() {
		if (!loading_commits) {
			$(this).css({"color": "#268ED4"});
		}
	}, function(){
		$(this).css({"color": "black"});
	});

});
