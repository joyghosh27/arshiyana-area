<?php
require 'db_connect.php';
session_start();
$msg = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login_id = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Direct match against stored password (no hashing)
    $stmt = $conn->prepare(
        "SELECT * FROM office_users 
         WHERE email = ? AND password = ?"
    );
    $stmt->bind_param("ss", $login_id, $password);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        $row = $res->fetch_assoc();
        $_SESSION['office'] = $row['email']; // username column নেই, তাই email ব্যবহার করছি
        header("Location: dashboard_office.php");
        exit;
    } else {
        $msg = "User not found or incorrect password!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Office Login | Ashiyana</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
    /* Reset and Base Styles */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        --warning-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        
        --text-primary: #1a202c;
        --text-secondary: #4a5568;
        --text-light: #718096;
        --bg-primary: #ffffff;
        --bg-secondary: #f7fafc;
        
        --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.05);
        --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.1);
        --shadow-xl: 0 25px 50px rgba(0, 0, 0, 0.15);
        
        --border-radius-sm: 8px;
        --border-radius-md: 16px;
        --border-radius-lg: 24px;
        --border-radius-xl: 32px;
    }

    body {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
        color: var(--text-primary);
        background: 
            linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%),
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        padding: clamp(1rem, 4vw, 2rem);
        overflow-x: hidden;
    }

    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(102,126,234,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
        animation: gridMove 20s linear infinite;
        opacity: 0.5;
        z-index: -1;
    }

    @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
    }

    .login-container {
        display: flex;
        width: clamp(90%, 95vw, 1200px);
        max-width: 1200px;
        border-radius: var(--border-radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-xl);
        position: relative;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .login-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--primary-gradient);
        z-index: 10;
    }

    .welcome-section {
        flex: 1;
        background: var(--primary-gradient);
        padding: clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 3rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .welcome-section::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
        pointer-events: none;
    }

    .welcome-section h1 {
        font-family: 'Playfair Display', serif;
        font-size: clamp(2rem, 6vw, 3.5rem);
        font-weight: 800;
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
        line-height: 1.2;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        position: relative;
        color: white;
    }

    .welcome-section h1::after {
        content: '';
        position: absolute;
        bottom: clamp(-8px, -2vw, -12px);
        left: 50%;
        transform: translateX(-50%);
        width: clamp(60px, 15vw, 100px);
        height: 3px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 3px;
        box-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
    }

    .welcome-section p {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        line-height: 1.6;
        max-width: clamp(300px, 80%, 450px);
        text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        color: rgba(255, 255, 255, 0.9);
    }

    .form-section {
        flex: 1;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(25px);
        padding: clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 3rem);
        position: relative;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
    }

    .logo {
        position: absolute;
        top: clamp(15px, 3vw, 25px);
        right: clamp(15px, 3vw, 25px);
        max-width: clamp(80px, 15vw, 140px);
        filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.1));
        user-select: none;
    }

    h2 {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1.8rem, 5vw, 2.5rem);
        font-weight: 700;
        margin-bottom: clamp(2rem, 5vw, 3rem);
        color: var(--text-primary);
        position: relative;
        display: inline-block;
    }

    h2::after {
        content: '';
        position: absolute;
        bottom: clamp(-6px, -1.5vw, -10px);
        left: 0;
        width: clamp(50px, 12vw, 80px);
        height: 3px;
        background: var(--primary-gradient);
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    .form-group {
        margin-bottom: clamp(1.5rem, 4vw, 2rem);
        position: relative;
    }

    .form-group label {
        display: block;
        margin-bottom: clamp(0.5rem, 2vw, 0.8rem);
        font-size: clamp(0.9rem, 2.5vw, 1rem);
        color: var(--text-primary);
        font-weight: 600;
        letter-spacing: 0.5px;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: clamp(1rem, 3vw, 1.2rem) clamp(1rem, 3vw, 1.5rem);
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: var(--border-radius-md);
        color: var(--text-primary);
        font-size: clamp(0.9rem, 2.5vw, 1rem);
        font-family: 'Inter', sans-serif;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-sm);
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
        outline: none;
        border-color: #667eea;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), var(--shadow-md);
        transform: translateY(-2px);
    }

    button {
        width: 100%;
        background: var(--primary-gradient);
        color: white;
        border: none;
        padding: clamp(1rem, 3vw, 1.2rem) clamp(2rem, 5vw, 3rem);
        border-radius: 50px;
        font-size: clamp(1rem, 2.5vw, 1.1rem);
        font-weight: 600;
        cursor: pointer;
        margin-top: clamp(1rem, 3vw, 1.5rem);
        margin-bottom: clamp(2rem, 4vw, 2.5rem);
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
        font-family: 'Inter', sans-serif;
        letter-spacing: 0.5px;
        position: relative;
        overflow: hidden;
    }

    button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: all 0.6s ease;
    }

    button:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-xl);
    }

    button:hover::before {
        left: 100%;
    }

    .links {
        text-align: center;
    }

    .links a {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: clamp(0.85rem, 2vw, 0.95rem);
        display: block;
        margin-bottom: clamp(0.8rem, 2vw, 1rem);
        transition: all 0.3s ease;
        position: relative;
        font-weight: 500;
    }

    .links a::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: var(--primary-gradient);
        transition: width 0.3s ease;
        border-radius: 2px;
    }

    .links a:hover {
        color: #667eea;
    }

    .links a:hover::after {
        width: 120%;
    }

    .error-message {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
        padding: clamp(0.8rem, 2vw, 1rem) clamp(1rem, 3vw, 1.2rem);
        border-radius: var(--border-radius-sm);
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
        font-size: clamp(0.85rem, 2vw, 0.9rem);
        border-left: 4px solid #dc2626;
        box-shadow: var(--shadow-sm);
        font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .login-container {
            flex-direction: column;
            width: 95%;
            max-width: 500px;
        }
        
        h2 {
            text-align: center;
            display: block;
        }
        
        h2::after {
            left: 50%;
            transform: translateX(-50%);
        }
    }

    @media (max-width: 480px) {
        .login-container {
            width: 100%;
            margin: 1rem;
        }
    }
</style>

</head>
<body>
    <div class="login-container">
        <div class="welcome-section">
            <h1>Office Portal</h1>
            <p>Welcome to the Ashiyana staff portal. Please log in with your office credentials to access the management dashboard.</p>
        </div>
        <div class="form-section">
            <img src="Final-logo.png" alt="Ashiyana Logo" class="logo">
            <h2>Office Login</h2>
            
            <?php if (!empty($msg)) echo "<div class='error-message'>$msg</div>"; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label for="username">Email</label>
                    <input type="text" id="username" name="username" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <button type="submit">Login</button>
            </form>
            
            <div class="links">
                <a href="overview.html">Back to Login Portal</a>
                <a href="index.html">Back to Home</a>
            </div>
        </div>
    </div>
    <script src="toggle_mode.js"></script>
</body>
</html>