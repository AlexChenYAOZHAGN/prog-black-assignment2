<?php
session_start();
// Inside signup.php
$_SESSION['last_page'] = 'signup';
$_SESSION['user_id'] = $mysqli->insert_id; // Gets the last inserted ID
$_SESSION['name'] = $_POST["name"]; // Store the name the user signed up with

// Turn on error reporting for debugging purposes
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Input validation
    if (empty(trim($_POST["name"]))) {
        die("Name is required");
    }

    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        die("Valid email is required");
    }

    if (strlen($_POST["password"]) < 8) {
        die("Password must be at least eight characters");
    }

    if (!preg_match("/[a-z]/i", $_POST["password"])) {
        die("Password must contain at least one letter");
    }

    if (!preg_match("/[0-9]/", $_POST["password"])) {
        die("Password must contain at least one number");
    }

    if ($_POST["password"] !== $_POST["password_confirmation"]) {
        die("Password must match");
    }

    // Hash the password
    $password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // Database connection
    $mysqli = require __DIR__ . "/database.php";
    if (!$mysqli) {
        die("Database connection failed");
    }

    // Prepare the SQL statement
    $sql = "INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)";
    try {
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("sss", $_POST["name"], $_POST["email"], $password_hash);
        $stmt->execute();
        
        // Set a success message in a cookie that expires in 60 seconds
        setcookie("signup_success", "1", time() + 60, "/");

        // Redirect to another page on successful signup
        header('Location: ../index.php');
        exit;
    } catch (mysqli_sql_exception $exception) {
        // Handle duplicate entry for email
        if ($exception->getCode() == 1062) {
            die("Error occurred: The email address has already been taken.");
        } else {
            die("Error occurred: " . $exception->getMessage());
        }
    } finally {
        $stmt->close();
    }
}

// Close the connection
$mysqli->close();
?>


