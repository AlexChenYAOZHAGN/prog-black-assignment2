<?php

$mysqli = require __DIR__ . "/database.php";

// Check if the email parameter is provided in the query string
if (isset($_GET["email"])) {
    $email = $_GET["email"];

    // Use prepared statement to avoid SQL Injection
    $stmt = $mysqli->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $is_available = $result->num_rows === 0;

    // Close the statement and database connection as they are no longer needed
    $stmt->close();
    $mysqli->close();

    // Set the header to indicate a JSON response
    header("Content-Type: application/json");

    // Echo the availability as a JSON response
    echo json_encode(["available" => $is_available]);
} else {
    echo json_encode(["error" => "No email parameter provided"]);
}

?>

