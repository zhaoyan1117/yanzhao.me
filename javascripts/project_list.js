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


	function displayCommit(commit) {

		var html = "<div class='each_commit'> \
    <div class='commit_title'> \
      <a href='" + commit.commit_url + "'><div class='commit_sha'>" + commit.sha + "</div></a> \
      <time class='commit_time' datetime='" + commit.time + "'>" + commit.relative_time + "</time> \
      <a href='" + commit.repo_url + "'> \
        <div class='commit_repo_name'>" + commit.repo_name + "</div> \
      </a> \
    </div> \
    <div class='commit_message'>" + commit.message + "</div>\
  </div>"

  		$(html).hide().appendTo('#recent_commits').fadeIn(500);

	}


	function parseCommit(commit) {
		$.ajax({
			type:"GET",
			url:commit.url,
			dataType:"json",
			success: function(data, textStatus, jqXHR) {
				var parsed = {};
				parsed.sha = data.sha.substr(0,7);
				parsed.commit_url = data.html_url;
				parsed.repo_url = data.html_url.split('/commit')[0];
				parsed.repo_name = data.html_url.split('/').slice(3,5).join('/');
				parsed.message = data.commit.message;
				parsed.time = data.commit.committer.date;
				parsed.relative_time  = new Date(parsed.time).toRelativeTime();
				displayCommit(parsed);
			}
		});
	}

	function updateCommits(events) {
		events.forEach(function(event) {
			event.payload.commits.forEach(function(commit) {
				if (commit.author.name == 'zhaoyan1117') {
					parseCommit(commit);
				}
			});
		});
	}

	function showCommits() {
	    $.ajax({
	      type:"GET",
	      url:"https://api.github.com/users/zhaoyan1117/events/public",
	      dataType:"json",
	      success: function(data, textStatus, jqXHR){
	      	pushEvents = data.filter(function(e) {return e.type == 'PushEvent'});
	      	updateCommits(pushEvents);
	      }
	    });
	}

	showCommits();

});
