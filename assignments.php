<?php
error_reporting(E_ALL ^ E_DEPRECATED);
if($_GET){
  if($_GET['action'] == 'getAssignments'){
	$query = "SELECT course_name, course_code, assignment_name, due_date from assignments order by due_date ASC ";
	$result = db_connection($query);
	
	$assignments = array();
	
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		array_push($assignments, array('fcourse' => $row['course_name'], 'fcode' => $row['course_code'], 'fname' => $row['assignment_name'], 'fdate' => $row['due_date']));
	}
	echo json_encode(array("assignments" => $assignments));
	exit;
  }
}
function db_connection($query) {
		mysql_connect('127.0.0.1', 'root', 'Saber92759275')
			OR die(fail('Could not connect to database.'));
		mysql_select_db('assignments');

		return mysql_query($query);
}

if($_POST){	
	if ($_POST['action'] == 'addAssignment') {
	
		$fcourse = htmlspecialchars($_POST['course_name']);
		$fcode = htmlspecialchars($_POST['course_code']);
		$fname = htmlspecialchars($_POST['assignment_name']);
		$fdate = htmlspecialchars($_POST['due_date']);
		/*if(preg_match('/[^\w\s]/i', $fname) || preg_match('/[^\w\s]/i', $lname)) {
			fail('Invalid name provided.');
		}
		if( empty($fname) || empty($lname) ) {
			fail('Please enter a first and last name.');
		}
		if( empty($gender) ) {
			fail('Please select a gender.');
		}
		if( empty($minutes) || empty($seconds) ) {
			fail('Please enter minutes and seconds.');
		}*/
		
		//$time = $minutes.":".$seconds;

		$query = "INSERT INTO assignments SET course_name='$fcourse', course_code='$fcode', assignment_name='$fname', due_date='$fdate'";
		$result = db_connection($query);
		
		if ($result) {
			$msg = "Assignment: ".$fcode." ".$fname." added successfully" ;
			success($msg);
		} else {
			fail('Insert failed.');
		}
		exit;
	}
}

function fail($message) {
		die(json_encode(array('status' => 'fail', 'message' => $message)));
}

function success($message) {
		die(json_encode(array('status' => 'success', 'message' => $message)));
}

?>