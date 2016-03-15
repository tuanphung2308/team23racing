<?php
require('includes/config.php');

//collect values from the url
$answer = trim($_GET['a']);
echo('a is: ' + a);
$question = trim($_GET['q']);

//if id is number and the active token is not empty carry on

	//update users record set the active column to Yes where the memberID and active value match the ones provided in the array
	$stmt = $db->prepare("INSERT INTO playSession(question, answer) VALUES(:qString, :aString)");
	$stmt->execute(array(
		':qString' => $answer,
		':aString' => $question
	));

	//if the row was updated redirect the user
	/*if($stmt->rowCount() == 1){

		//redirect to login page
		header('Location: login.php?action=active');
		exit;

	} else {
		echo "Your account could not be activated."; 
	}*/
?>