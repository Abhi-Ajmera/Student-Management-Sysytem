<?php
include ("Connection.php");
// php://include - Read only stream allows us to read raw data from request body 
// json_decode - convert json to php
// json_encode - convert php data to json

$data = file_get_contents("php://input");
$mydata = json_decode($data,true);

$id = $mydata['id'];
$name = $mydata['name'];
$fname = $mydata['fName'];
$email = $mydata['mail'];
$number = $mydata['number'];

// Insert
// if(!empty($name) && !empty($email) && !empty($number)){
// $sql = "INSERT INTO student (Name,FatherName, Email, Mobile) VALUES ('$name','$fname','$email','$number')";
// if($conn->query($sql) == True){
//     echo '<i class="bi bi-check2-circle"></i> Student Data Saved Successfully';
// } else {
//     echo '<i class="bi bi-exclamation-circle"></i> Student Data Saving Failed';
// }
// }
// else{
//     echo '<i class="bi bi-exclamation-circle"></i> ERROR : Input All Fields';
// }

// Insert or update
if(!empty($name) && !empty($email) && !empty($number)){
$sql = "INSERT INTO student (Id,Name,FatherName, Email, Mobile) VALUES ('$id','$name','$fname','$email','$number') ON DUPLICATE KEY UPDATE Name = '$name' ,FatherName = '$fname' ,Email = '$email' ,Mobile = '$number'";
if($conn->query($sql) == True){
    echo '<i class="bi bi-check2-circle"></i> Student Data Saved Successfully';
} else {
    echo '<i class="bi bi-exclamation-circle"></i> Student Data Saving Failed';
}
}
else{
    echo '<i class="bi bi-exclamation-circle"></i> ERROR : Input All Fields';
}
?>