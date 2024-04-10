<?php
session_start();

$_SESSION['last_page'] = 'signin';

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Require the database connection
    $mysqli = require __DIR__ . "/database.php";

    // Prepared statement to avoid SQL Injection
    $sql = "SELECT * FROM user WHERE email = ?";

    // Prepare the statement
    $stmt = $mysqli->prepare($sql);

    if ($stmt) {
        // Bind the email parameter
        $stmt->bind_param("s", $_POST["email"]);

        // Execute the query
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        // Fetch the user data
        $user = $result->fetch_assoc();

        // Close the statement
        $stmt->close();

        // Verify if user exists and the password is correct
        if ($user && password_verify($_POST["password"], $user["password_hash"])) {
            // Regenerate the session ID for security purposes
            session_regenerate_id();

            // Store user information in session variables
            $_SESSION['user_id'] = $user['id']; // Replace 'id' with the actual user ID field from your database
            $_SESSION['email'] = $user['email'];

            // Redirect to the user's account page or homepage
            header('Location: ../index.php'); // Assuming you have renamed index.html to index.php
            exit;
        } else {
            $is_invalid = true;
        }
    } else {
        echo "Statement preparation failed: " . $mysqli->error;
    }

    // Close the database connection
    $mysqli->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Durham University Merchandise Store</title>
    <link rel="stylesheet" href="../styles/pages/registration.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/173383e162.js" crossorigin="anonymous"></script>

</head>
<body>
    <div class="container">
        <div class="form-box">
            <h1 id="title">Sign In</h1>

            <?php if ($is_invalid): ?>
                <p><em>Invalid email address or password.</em></p>
            <?php endif; ?>

            <form method="post">
                <div class="input-group">

                    <div class="input-field">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" id="email" name="email" placeholder="Email" value="<?= htmlspecialchars($_POST["email"]??"")?>">
                    </div>

                    <div class="input-field">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" id="password" name="password" placeholder="Password">
                    </div>

                    <p>Lost password <a href="#">Click Here!</a></p>

                </div>

                <div class="btn-field">
                    <button type="button" id="signupBtn">Sign up</button>
                    <button type="submit" id="signinBtn" class="disable">Sign in</button>
                </div>

            </form>
        </div>
    </div>

    <script>

        let signupBtn = document.getElementById("signupBtn");
        let signinBtn = document.getElementById("signinBtn");
        let nameField = document.getElementById("nameField");
        let title = document.getElementById("title");


        signupBtn.onclick = function() {
            window.location.href = '../registration.html'; // Redirect to the login.php page
        };

    </script>
</body>
</html>