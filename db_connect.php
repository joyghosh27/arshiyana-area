<?php
$servername = "localhost";
$username   = "root";      // XAMPP default
$password   = "";          // XAMPP default
$dbname     = "ashiyana_design_world";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
