commit_animation_time = 500;

function displayCommit() {
	for(var i = 0; i < Math.min(commits.length, 5); i++) {
		var commit = commits[i];
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
  		$(html).appendTo('#recent_commits');
	}

	endLoadingShowCommits();
}

function displayApiLimit() {
	var html = "<div class='api_limit'>\
  Woops! Github api only provides a limited access rate for unauthorized user. <br>\
  Come <a href='https://github.com/zhaoyan1117?tab=activity'>here</a> to see my recent commits. Thanks!\
  </div>"

	$(html).appendTo('#recent_commits');
	endLoadingShowCommits();
}

function endLoadingShowCommits() {
	$('#recent_commits').slideDown(commit_animation_time);
	setTimeout(function(){$('.refresh_commits').removeClass('loading_spinning');}, commit_animation_time);
	loading_commits = false;
}

function addCommit(commit) {
	commits.push(commit);
	if (commits.length == num_commits) { 
		commits.sort(function(c1, c2) {
			if(new Date(c1.time) > new Date(c2.time)) {return -1;}
			if(new Date(c1.time) < new Date(c2.time)) {return 1;}
			return 0;
		});
		displayCommit(); 
	}
}

function parseCommit(commit) {
	$.ajax({
		type:"GET",
		url:commit.url,
		dataType:"json",
		cache:false,
		success: function(data, textStatus, jqXHR) {
			var parsed = {};
			parsed.sha = data.sha.substr(0,7);
			parsed.commit_url = data.html_url;
			parsed.repo_url = data.html_url.split('/commit')[0];
			parsed.repo_name = data.html_url.split('/').slice(3,5).join('/');
			parsed.message = data.commit.message;
			parsed.time = data.commit.committer.date;
			parsed.relative_time  = new Date(parsed.time).toRelativeTime();
			addCommit(parsed);
		}
	});
}

function updateCommits(events) {
	num_commits = 0;
	events.forEach(function(event) {
		event.payload.commits.forEach(function(commit) {
			if (commit.author.name == 'zhaoyan1117') {num_commits++;}
		});
	});
	events.forEach(function(event) {
		event.payload.commits.forEach(function(commit) {
			if (commit.author.name == 'zhaoyan1117') {
				parseCommit(commit);
			}
		});
	});
}

function showCommits() {
	if (!loading_commits) {
		loading_commits = true;
		$('#recent_commits').slideUp(commit_animation_time);
		setTimeout(function(){$('.refresh_commits').addClass('loading_spinning');}, commit_animation_time);
		$('#recent_commits').html('');

		commits = [];
		$.ajax({
		  type:"GET",
		  url:"https://api.github.com/users/zhaoyan1117/events/public",
		  dataType:"json",
		  cache:false,
		  success: function(data, textStatus, jqXHR){
		  	pushEvents = data.filter(function(e) {return e.type == 'PushEvent'});
		  	updateCommits(pushEvents);
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		  	if (jqXHR.responseJSON.documentation_url == "http://developer.github.com/v3/#rate-limiting") {
		  		displayApiLimit();
		  	}
		  }
		});
	}
}
