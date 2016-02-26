$(document).ready(function(){
	$('#links').fadeIn(1500, function(){
		$('#invite').fadeIn(2000, function(){
			$('#motivation').fadeIn(1000, function(){
				$('#share').fadeIn(1000);
			});
		});
	});
});

var myDataRef = new Firebase('https://couchbed.firebaseio.com/');
myDataRef.on('child_added', function(snapshot) {
	var review = snapshot.val();
	displayChatMessage(review);
});

$('#nameInput').keypress(function (e) { // Change focus on return
	if (e.keyCode == 13) {
		$('#messageInput:text:visible:last').focus();
	}
});

$('#messageInput').keypress(function (e) {
	if (e.keyCode == 13) {
		submit();
	}
});

function submit(){
	var date = new Date();
	var dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();
	var name = $('#nameInput').val();
	if (!name) name="Satisfied Customer"
	var text = $('#messageInput').val();
	if (!text) return alert("Write your story!");
	myDataRef.push({name: name, experience: text, time:dateStr});
	$('#messageInput').val('');
}



function displayChatMessage(review) {
	var text = review.experience;
	var name = review.name;
	var time = review.time;
	var rev = document.createElement('div'); rev.className = "review";
	var revInfo = document.createElement('div'); revInfo.className="rev-info";
	revInfo.innerHTML="<span class='rev-name'>"+name+"</span> @ <span class='rev-time'>"+time+"</span>"
	var revText = document.createElement('div'); revText.className="rev-text";
	revText.innerHTML = text;
	rev.appendChild(revInfo);
	rev.appendChild(revText);
	$('#reviews').prepend(rev);
	$('#reviews').scrollTop(0);
};

function leaveInput(el) {
	if (el.value.length > 0) {
			if (!el.classList.contains('active')) {
					el.classList.add('active');
			}
	} else {
			if (el.classList.contains('active')) {
					el.classList.remove('active');
			}
	}
}

var inputs = document.getElementsByClassName("m-input");
for (var i = 0; i < inputs.length; i++) {
		var el = inputs[i];
		el.addEventListener("blur", function() {
				leaveInput(this);
		});
}