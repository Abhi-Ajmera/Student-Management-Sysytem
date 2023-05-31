<?php
include ("Connection.php");

$data = file_get_contents("php://input");
$mydata = json_decode($data,true);
$id = $mydata['sid'];

// delete
if(!empty($id)){
$sql = "DELETE FROM student WHERE Id = {$id}";
if($conn->query($sql) == True){
    echo 'Student Data Deleted Successfully';
} else {
    echo 'Unable to Delete Student Data';
}
}
else{
    echo 'ERROR : Invalid Id';
}
?>