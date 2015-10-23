var num = 0;
$(document).ready(function() {

	new WOW().init();

	getAssignments();


	$("#addAssignment").submit(function() {
		return false;
	});

	$("#submit").button().click(addAssignment);

	function addAssignment() {
		var data = $("#addAssignment input").serializeArray();
		NProgress.start();
		$.post($("#addAssignment").attr('action'), data, function(json) {
			NProgress.done();
			if (json.status == "fail") {
				alert(json.message);
			}
			if (json.status == "success") {
				alert(json.message);
				clearInputs();
				getAssignments();
			}
		}, "json");
	}

	function getAssignments() {
		NProgress.start();
		$.getJSON('assignments.php?action=getAssignments', function(json) {
			NProgress.done();
			if (json.assignments.length > 0) {
				$("#all").empty();
				$("#toSubmit").empty();
			}
			$.each(json.assignments, function(i) {
				if (earlierThan(this.fdate)) { // earlierThan() is from kM.js
					if (num % 2) {
						var info = '<div data-wow-delay="' + num / 10 + 's" class="wow fadeInLeft text-right"><h3>Course name: ' + this.fcourse + ',  ' + this.fcode + '<h4><p>Assignment name: ' + this.fname + ', Due date: ' + this.fdate + '</p></div>';
					} else {
						var info = '<div data-wow-delay="' + num / 10 + 's" class="wow fadeInRight text-left"><h3>Course name: ' + this.fcourse + ',  ' + this.fcode + '<h4><p>Assignment name: ' + this.fname + ', Due date: ' + this.fdate + '</p></div>';
					}
					$('#toSubmit').append(info);
					num++;
				}
				if (i % 2) {
					var info = '<div data-wow-delay="' + i / 10 + 's" class="wow fadeInLeft text-right"><h3>Course name: ' + this.fcourse + ',  ' + this.fcode + '<h4><p>Assignment name: ' + this.fname + ', Due date: ' + this.fdate + '</p></div>';
				} else {
					var info = '<div data-wow-delay="' + i / 10 + 's" class="wow fadeInRight text-left"><h3>Course name: ' + this.fcourse + ',  ' + this.fcode + '<h4><p>Assignment name: ' + this.fname + ', Due date: ' + this.fdate + '</p></div>';
				}
				$('#all').append(info);
				i++;
			});
			loadNumToSub();
		});
	}

	function clearInputs() {
		$("#text1").val('');
		$("#text2").val('');
		$("#text3").val('');
		$("#text4").val('');
	}

	function loadNumToSub() {
		$("#numToSub").text(num);
	}

});