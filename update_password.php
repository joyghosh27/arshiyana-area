<?php
require 'db_connect.php';
session_start();

if (!isset($_SESSION['reset_email'])) {
    header("Location: forgot_password.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_SESSION['reset_email'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    if ($new_password !== $confirm_password) {
        echo "<script>alert('Passwords do not match!'); window.location.href='reset_password.php';</script>";
        exit;
    }

    // Update password directly (without hashing)
    $stmt = $conn->prepare("UPDATE clients SET password = ? WHERE email = ?");
    $stmt->bind_param("ss", $new_password, $email);

    if ($stmt->execute()) {
        unset($_SESSION['reset_email']);
        echo "<script>alert('Password updated successfully!'); window.location.href='login.php';</script>";
    } else {
        echo "Something went wrong!";
    }
}
?>
