<?php
		
	// Include database connectivity
	
	include_once('dbConfig.php');

	if (isset($_POST['minAge']) && isset($_POST['maxAge'])) {

		$minAge = $_POST['minAge'];
		$maxAge = $_POST['maxAge'];
		$query = "SELECT * FROM products WHERE price BETWEEN {$minAge} AND {$maxAge}";
	}
	else{
		$minAge = "";
		$maxAge = "";
		$query = "SELECT * FROM products ORDER BY id ASC";
	}

	$results = mysqli_query($conn, $query);
	
	if (mysqli_num_rows($results) > 0) {

		$output = "";
		
		while($row = mysqli_fetch_array($results)){

		$output.="<tr align='text-center'>
		           <td>{$row["id"]}</td>
		           <td>{$row["name"]}</td>
		           <td>{$row["price"]}</td>
		           <td>{$row["product_code"]}</td>
		           <td>{$row["qty"]}</td>
		           <td>{$row["description"]}</td>
		        </tr>";
		}

		echo $output;

	}else{
		echo "<h3>No record found</h3>";
	}
	
?>