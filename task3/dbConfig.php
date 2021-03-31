<?php
	// Database configuration 
	$dbHost     = "127.0.0.1"; 
	$dbUsername = "new"; 
	$dbPassword = "password"; 
	$dbName     = "jquery"; 
	 
	
	$conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName); 
	 
	
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

?>
