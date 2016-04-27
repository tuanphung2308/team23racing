<?php require('includes/config.php'); 

//if not logged in redirect to login page
if(!$user->is_logged_in()){ header('Location: login.php'); } 
?>


<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
</head>
<body class="home">
<table border=1 id ="kek">
</table>
<script language="javascript" type="text/javascript">
<!--
var obj;
var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
obj = JSON.parse(this.responseText);
console.log(obj[0]);
document.write("<title>Display progress</title>");
document.write("<h1>Display children progress</h1>");
document.write("<p><a href='memberpage.php'>Try out the game!</a></p>");
document.write("<p><a href='logout.php'>Logout</a></p>");
document.write();
document.write("<table border=1>");
document.write("<tr><td>SessionID</td><td>Question</td><td>Answer</td><td>User Input</td><td>Accuracy</td><td>Total Question</td>");
for (var i=0; i< obj[0].length; i++) {
	var arrQues = (obj[0][i].question.replace(/p/g, '+')).replace(/,/g, '<br/>');
	var arrAnswer = obj[0][i].answer.replace(/,/g, '<br/>');
	var arrUA = obj[0][i].uAnswer.replace(/,/g, '<br/>');
  	document.write("<tr><td>" + obj[0][i].sessionID + "</td>");
  	document.write("<td>" + arrQues + "</td>");
  	document.write("<td>" + arrAnswer + "</td>");
  	document.write("<td>" + arrUA + "</td>");
  	document.write("<td>" + obj[0][i].accuracy +' %' + "</td>");
  	document.write("<td>" + obj[0][i].totalQues + "</td></tr>");
}
document.write("</table>");
};
oReq.open("get", "gateway.php?job=loadChildTab", true);
oReq.send();

//-->
</script>
</body>
</html>