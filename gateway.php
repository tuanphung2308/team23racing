<?php
require('includes/config.php');

//collect values from the url
<<<<<<< HEAD

//if id is number and the active token is not empty carry on

if ($_GET["job"] == "puser")
{
	echo json_encode( $_SESSION['username']);
}
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

//if id is number and the active token is not empty carry on
>>>>>>> origin/master
if ($_GET["job"] == "create")
{
	$answer = trim($_GET['a']);
	$question = ($_GET['q']);
	$useranswer = ($_GET['ua']);
	$accuracy = ($_GET['cc']);
	//update users record set the active column to Yes where the memberID and active value match the ones provided in the array
<<<<<<< HEAD
	$stmt = $db->prepare("INSERT INTO playSession(question, answer, username, uAnswer, accuracy, totalQues, correctAnswer, difficulty, level) VALUES(:qString, :aString, :user, :uanswer, :acc, :total, :ca, :diff, :level)");
=======
<<<<<<< HEAD
	$stmt = $db->prepare("INSERT INTO playSession(question, answer, username, uAnswer, accuracy, totalQues, correctAnswer, difficulty) VALUES(:qString, :aString, :user, :uanswer, :acc, :total, :ca, :diff)");
=======
	$stmt = $db->prepare("INSERT INTO playSession(question, answer, username, uAnswer, accuracy, totalQues) VALUES(:qString, :aString, :user, :uanswer, :acc, :total)");
>>>>>>> origin/master
>>>>>>> origin/master
	$stmt->execute(array(
		':qString' => $question,
		':aString' => $answer,
		':user' => $_SESSION['username'],
		':uanswer' => $useranswer,
		':acc' => $accuracy,
<<<<<<< HEAD
		':total' => trim($_GET['total']),
		':ca' => trim($_GET['ca']),
		':diff' => trim($_GET['diff']),
		':level' => trim($_GET['lv'])
	));
}

if  ($_GET["job"] == "gmoney") //get car sets
{
	$query1 = $db->prepare("SELECT money FROM members WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$carvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	echo json_encode($carvalue[0]['money']);
}

if  ($_GET["job"] == "umoney") //update car sets
{
	$carr = trim($_GET['mon']);
	$stmt = $db->prepare("UPDATE members SET money =:carr WHERE username=:user");
	$stmt->execute(array(
		':carr' => $carr,
		':user' => $_SESSION['username']
	));
}

if  ($_GET["job"] == "gcs") //get car sets
{
	$query1 = $db->prepare("SELECT carArray FROM members WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$carvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	echo json_encode($carvalue[0]['carArray']);
}

if  ($_GET["job"] == "ucs") //update car sets
{
	$carr = trim($_GET['carr']);
	$stmt = $db->prepare("UPDATE members SET carArray =:carr WHERE username=:user");
	$stmt->execute(array(
		':carr' => $carr,
		':user' => $_SESSION['username']
	));
}

if  ($_GET["job"] == "gcar")
{
	$query1 = $db->prepare("SELECT selectedCar FROM members WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$carvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	echo json_encode($carvalue[0]['selectedCar']);
}

if  ($_GET["job"] == "ucar")
{
	$carid = trim($_GET['cid']);
	$stmt = $db->prepare("UPDATE members SET selectedCar =:cid WHERE username=:user");
	$stmt->execute(array(
		':cid' => $carid,
		':user' => $_SESSION['username']
	));
}

=======
<<<<<<< HEAD
		':total' => trim($_GET['total']),
		':ca' => trim($_GET['ca']),
		':diff' => trim($_GET['diff'])
=======
		':total' => trim($_GET['total'])
>>>>>>> origin/master
	));
}
>>>>>>> origin/master
if  ($_GET["job"] == "update")
{
	$answer = trim($_GET['a']);
	$question = ($_GET['q']);
	$useranswer = ($_GET['ua']);
	$accuracy = ($_GET['cc']);
<<<<<<< HEAD
	$score = trim($_GET['sc']);
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$maxvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	$stmt = $db->prepare("UPDATE playsession SET question=:qString, correctAnswer=:ca, difficulty=:diff, answer=:aString, accuracy=:acc, uAnswer=:uanswer, totalQues = :total, level = :level, score = :sc WHERE username=:user AND sessionID=:lastID");
=======
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$maxvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
<<<<<<< HEAD
	$stmt = $db->prepare("UPDATE playsession SET question=:qString, correctAnswer=:ca, difficulty=:diff, answer=:aString, accuracy=:acc, uAnswer=:uanswer, totalQues = :total WHERE username=:user AND sessionID=:lastID");
=======
	$stmt = $db->prepare("UPDATE playsession SET question=:qString, answer=:aString, accuracy=:acc, uAnswer=:acc, totalQues = :total WHERE username=:user AND sessionID=:lastID");
>>>>>>> origin/master
>>>>>>> origin/master
	$stmt->execute(array(
		':qString' => $question,
		':aString' => $answer,
		':lastID' => $maxvalue[0]['MAX(sessionID)'],
		':acc' => $accuracy,
		':uanswer' => $useranswer,
		':user' => $_SESSION['username'],
<<<<<<< HEAD
		':total' => trim($_GET['total']),
		':ca' => trim($_GET['ca']),
		':diff' => trim($_GET['diff']),
		':level' => trim($_GET['lv']),
		':sc' => $score
=======
<<<<<<< HEAD
		':total' => trim($_GET['total']),
		':ca' => trim($_GET['ca']),
		':diff' => trim($_GET['diff'])
=======
		':total' => trim($_GET['total'])
>>>>>>> origin/master
>>>>>>> origin/master
	));
}
if  ($_GET["job"] == "load") {
	//$lastSessionID = $db->query("SELECT MAX(sessionID) FROM playsession");
	//$row[] = $lastSessionID->fetch();
	//$maxvalue = $row[0]['MAX(sessionID)'];
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$maxvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	$query2 =  $db->prepare("SELECT totalQues FROM playsession WHERE username=:user AND sessionID=:lastID");
	$query2->execute(array(
		':user' => $_SESSION['username'],
		':lastID' => $maxvalue[0]['MAX(sessionID)']));
	$lastTotal[] = $query2->fetch(PDO::FETCH_ASSOC);
<<<<<<< HEAD
	if ($lastTotal[0]['totalQues'] < 10 && $query2->rowCount() > 0){
=======
<<<<<<< HEAD
	if ($lastTotal[0]['totalQues'] < 10 && $query2->rowCount() > 0){
=======
	if ($lastTotal[0]['totalQues'] < 10){
>>>>>>> origin/master
>>>>>>> origin/master
		echo json_encode("update");
	} else {
		echo json_encode("create");
	}
}
if  ($_GET["job"] == "getlastperform") {
	//$lastSessionID = $db->query("SELECT MAX(sessionID) FROM playsession");
	//$row[] = $lastSessionID->fetch();
	//$maxvalue = $row[0]['MAX(sessionID)'];
	$query1 = $db->prepare("SELECT sessionID FROM playsession WHERE username = :user ORDER BY sessionID DESC LIMIT 1,1");
	$query1->execute(array(':user' => $_SESSION['username']));
	$lastsession[] = $query1->fetch(PDO::FETCH_ASSOC);
	$query2 =  $db->prepare("SELECT accuracy FROM playsession WHERE username=:user AND sessionID=:lastID");
	$query2->execute(array(
		':user' => $_SESSION['username'],
		':lastID' => $lastsession[0]['sessionID']));
	$lastAcc[] = $query2->fetch(PDO::FETCH_ASSOC);
	echo json_encode($lastAcc[0]['accuracy']);
}

if  ($_GET["job"] == "sp") //save progress
{
	$stmt = $db->prepare("UPDATE members SET starArray=:uprogress WHERE username=:user");
	$stmt->execute(array(
		':user' => $_SESSION['username'],
		':uprogress' => trim($_GET['pro'])
	));
}

if  ($_GET["job"] == "lp") //save progress
{
	$query1 = $db->prepare("SELECT starArray FROM members WHERE username = :user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$starArray[] = $query1->fetch(PDO::FETCH_ASSOC);
	echo json_encode($starArray[0]['starArray']);
}

if  ($_GET["job"] == "delete") //save progress
{
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$maxvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	$query2 =  $db->prepare("DELETE FROM playsession WHERE username=:user AND sessionID=:lastID");
	$query2->execute(array(
		':user' => $_SESSION['username'],
		':lastID' => $maxvalue[0]['MAX(sessionID)']));
}

if  ($_GET["job"] == "lls") { //load last session
<<<<<<< HEAD
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
=======
<<<<<<< HEAD
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
=======
	$query1 = $db->prepare("SELECT sessionID FROM playsession WHERE username = :user ORDER BY sessionID DESC LIMIT 1,1");
>>>>>>> origin/master
>>>>>>> origin/master
	$query1->execute(array(':user' => $_SESSION['username']));
	$lastsession[] = $query1->fetch(PDO::FETCH_ASSOC);
	$query2 =  $db->prepare("SELECT * FROM playsession WHERE username=:user AND sessionID=:lastID");
	$query2->execute(array(
		':user' => $_SESSION['username'],
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
		':lastID' => $lastsession[0]['MAX(sessionID)']));
	$lastAcc[] = $query2->fetch(PDO::FETCH_ASSOC);
	echo json_encode($lastAcc[0]);
}
<<<<<<< HEAD

if  ($_GET["job"] == "loadlevel") { //load last session
	//$lastSessionID = $db->query("SELECT MAX(sessionID) FROM playsession");
	//$row[] = $lastSessionID->fetch();
	//$maxvalue = $row[0]['MAX(sessionID)'];
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$maxvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	$query2 =  $db->prepare("SELECT level FROM playsession WHERE username=:user AND sessionID=:lastID");
	$query2->execute(array(
		':user' => $_SESSION['username'],
		':lastID' => $maxvalue[0]['MAX(sessionID)']));
	$lastTotal[] = $query2->fetch(PDO::FETCH_ASSOC);
	echo json_encode($lastTotal[0]['level']);
}
=======
=======
		':lastID' => $lastsession[0]['sessionID']));
	$lastAcc[] = $query2->fetch(PDO::FETCH_ASSOC);
	echo json_encode($lastAcc[0]);
}
=======
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
>>>>>>> origin/master
>>>>>>> origin/master
>>>>>>> origin/master
?>