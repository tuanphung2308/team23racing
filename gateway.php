<?php
require('includes/config.php');

//collect values from the url

//if id is number and the active token is not empty carry on

if ($_GET["job"] == "puser")
{
	echo json_encode( $_SESSION['username']);
}
if ($_GET["job"] == "create")
{
	$answer = trim($_GET['a']);
	$question = ($_GET['q']);
	$useranswer = ($_GET['ua']);
	$accuracy = ($_GET['cc']);
	//update users record set the active column to Yes where the memberID and active value match the ones provided in the array
	$stmt = $db->prepare("INSERT INTO playSession(question, answer, username, uAnswer, accuracy, totalQues, correctAnswer, difficulty, level) VALUES(:qString, :aString, :user, :uanswer, :acc, :total, :ca, :diff, :level)");
	$stmt->execute(array(
		':qString' => $question,
		':aString' => $answer,
		':user' => $_SESSION['username'],
		':uanswer' => $useranswer,
		':acc' => $accuracy,
		':total' => trim($_GET['total']),
		':ca' => trim($_GET['ca']),
		':diff' => trim($_GET['diff']),
		':level' => trim($_GET['lv'])
	));
}

if  ($_GET["job"] == "gmoney") //get money
{
	$query1 = $db->prepare("SELECT money FROM members WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$carvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	echo json_encode($carvalue[0]['money']);
}

if  ($_GET["job"] == "umoney") //update money
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

if  ($_GET["job"] == "ufuser") //update car sets
{
	$stmt = $db->prepare("UPDATE members SET firstTimeUser = 0 WHERE username=:user");
	$stmt->execute(array(
		':user' => $_SESSION['username']
	));
}

if  ($_GET["job"] == "gfuser")
{
	$query1 = $db->prepare("SELECT firstTimeUser FROM members WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$carvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	echo json_encode($carvalue[0]['firstTimeUser']);
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

if  ($_GET["job"] == "update")
{
	$answer = trim($_GET['a']);
	$question = ($_GET['q']);
	$useranswer = ($_GET['ua']);
	$accuracy = ($_GET['cc']);
	$score = trim($_GET['sc']);
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$maxvalue[] = $query1->fetch(PDO::FETCH_ASSOC);
	$stmt = $db->prepare("UPDATE playsession SET question=:qString, correctAnswer=:ca, difficulty=:diff, answer=:aString, accuracy=:acc, uAnswer=:uanswer, totalQues = :total, level = :level, score = :sc WHERE username=:user AND sessionID=:lastID");
	$stmt->execute(array(
		':qString' => $question,
		':aString' => $answer,
		':lastID' => $maxvalue[0]['MAX(sessionID)'],
		':acc' => $accuracy,
		':uanswer' => $useranswer,
		':user' => $_SESSION['username'],
		':total' => trim($_GET['total']),
		':ca' => trim($_GET['ca']),
		':diff' => trim($_GET['diff']),
		':level' => trim($_GET['lv']),
		':sc' => $score
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
	if ($lastTotal[0]['totalQues'] < 10 && $query2->rowCount() > 0){
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
	$query1 = $db->prepare("SELECT MAX(sessionID) FROM playsession WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$lastsession[] = $query1->fetch(PDO::FETCH_ASSOC);
	$query2 =  $db->prepare("SELECT * FROM playsession WHERE username=:user AND sessionID=:lastID");
	$query2->execute(array(
		':user' => $_SESSION['username'],
		':lastID' => $lastsession[0]['MAX(sessionID)']));
	$lastAcc[] = $query2->fetch(PDO::FETCH_ASSOC);
	echo json_encode($lastAcc[0]);
}
if  ($_GET["job"] == "loadChildTab") { //load last session
	$query1 = $db->prepare("SELECT * FROM members WHERE username=:user");
	$query1->execute(array(':user' => $_SESSION['username']));
	$parentOf[] = $query1->fetch(PDO::FETCH_ASSOC);
	$query2 =  $db->prepare("SELECT * FROM playsession WHERE username=:user");
	$query2->execute(array(':user' => $parentOf[0]['parentOf']));
	$lastAcc[] = $query2->fetchAll();
	echo json_encode($lastAcc);
}

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
?>