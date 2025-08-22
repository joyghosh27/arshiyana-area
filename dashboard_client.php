<?php
session_start();
if (!isset($_SESSION['client'])) {
  header("Location: login.php");
  exit;
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Client Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h2>Welcome, <?= $_SESSION['client'] ?></h2>
    <p>This is the client dashboard.</p>
    <a href="logout.php">Logout</a>
  </div>
</body>
</html>