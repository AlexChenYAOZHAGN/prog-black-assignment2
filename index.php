<?php

session_start();

$user = null;

// User is logged in or has just signed up.
if (isset($_SESSION["user_id"])) {
    // User is logged in, retrieve user information
    $mysqli = require __DIR__ . "/phps/database.php";
    $stmt = $mysqli->prepare("SELECT * FROM user WHERE id = ?");
    $stmt->bind_param("i", $_SESSION["user_id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    $mysqli->close();
} elseif (isset($_SESSION['last_page']) && $_SESSION['last_page'] == 'signup') {
    // The user has just signed up but hasn't logged in yet
    $user["name"] = $_SESSION['name'] ?? 'Guest';
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>home</title>
        <link rel="stylesheet" href="styles/general.css">
        <link rel="stylesheet" href="styles/components/header.css">
        <link rel="stylesheet" href="styles/components/product-grid.css">

        <script>
               document.addEventListener('DOMContentLoaded', function() {
            var success = document.cookie.split('; ').find(row => row.startsWith('signup_success='));
            if (success) {
                alert("Signup successful. Welcome!");
                document.cookie = "signup_success=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            }
        });
        </script>
    </head>
    <body>

        <?php if ($user): ?>
            <p>Hello <?= htmlspecialchars($user["name"]) ?></p>
            <p><a href="phps/logout.php">Log out</a></p>
        <?php else: ?>
            <p>
                <a href="registration.html">Sign Up</a> or <a href="phps/login.php">Log In</a>
            </p>
        <?php endif; ?>

        <div class="header"></div>

        <div class="product-grid"></div>

        <div class="pagination"></div>

        <script type="module" src="js/pages/home.js"></script>

    </body>



</html>
