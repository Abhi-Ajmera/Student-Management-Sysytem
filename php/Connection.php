<?php
$conn = new mysqli("localhost","root","","schoolregistration");

if($conn -> connect_error) {
    die("Connection failed");
}
?>