<?php
session_start();
if (!isset($_SESSION['office'])) {
  header("Location: office_login.php");
  exit;
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Office Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h2>Welcome, <?= $_SESSION['office'] ?></h2>
    <p>This is the office dashboard.</p>
    <a href="logout.php">Logout</a>
  </div>
</body>
</html>