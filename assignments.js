$(document).ready(function() {
	$(function() {
		$("#tabs").tabs();
	});

	getAssignments();

	$("#addAssignment").submit(function() {
		return false;
	});

	$("#submit").button().click(addAssignment);

	$("#text4").datepicker({
		dateFormat: "yy-mm-dd"
	});


	function addAssignment() {
		var data = $("#addAssignment :input").serializeArray();
		alert(data);
		$.post($("#addAssignment").attr('action'), data, function(json) {
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
		$.getJSON('assignments.php?action=getAssignments', function(json) {
			if (json.assignments.length > 0) {
				$("#all").empty();
				$("#toSubmit").empty();
			}
			$.each(json.assignments, function() {
				var info = '<h3>Course name: ' + this.fcourse + ',  ' + this.fcode + '<h4><p>Assignment name: ' + this.fname + ', Due date: ' + this.fdate + '</p>';
				if (earlierThan(this.fdate)) { // earlierThan() is from kM.js
					$('#toSubmit').append(info);
				}
				/*if (date.getFullYear() < this.fdate.substring(0, 4)) {
					$('#toSubmit').append(info);
				}
				else if(date.getFullYear() == this.fdate.substring(0, 4)){
					if (date.getMonth()+1 < this.fdate.substring(5, 7)) {
						$('#toSubmit').append(info);
					}
					else if(date.getMonth()+1 == this.fdate.substring(5, 7)) {
						if(date.getDate() <= this.fdate.substring(8, 10)){
							$('#toSubmit').append(info);
						}
					}
				}*/
				//alert(this.fdate.substring(8, 10));
				$('#all').append(info);
			});
		});
	}
	function hhh(){ alert("aaa");}
	function clearInputs() {
		$("#text1").val('');
		$("#text2").val('');
		$("#text3").val('');
		$("#text4").val('');
	}
});