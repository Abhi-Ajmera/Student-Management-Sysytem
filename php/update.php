<?php
include ("Connection.php");

$data = file_get_contents("php://input");
$mydata = json_decode($data,true);
$id = $mydata['sid'];

// delete
if(!empty($id)){
$sql = "SELECT * FROM student WHERE Id = {$id}";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

echo json_encode($row);
}
?>