<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("Forbidden");
}

// Sanitize and validate form inputs
$name = trim($_POST['name'] ?? '');
$userEmail = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$userEmail || !$message) {
    exit("All fields are required.");
}

if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.sendgrid.net';
    $mail->SMTPAuth = true;
    $mail->Username = 'apikey'; 
    $mail->Password = getenv('SENDGRID_API_KEY');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ];

    // Verified sender
    $mail->setFrom('illiashapshalov38@gmail.com', 'Portfolio Contact Form');

    // Recipient: my Gmail
    $mail->addAddress('illiashapshalov38@gmail.com');

    // Reply to visitor
    $mail->addReplyTo($userEmail, $name);

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'New Message from Portfolio';
    $mail->Body = "
        <strong>Name:</strong> {$name}<br>
        <strong>Email:</strong> {$userEmail}<br><br>
        <strong>Message:</strong><br>{$message}
    ";

    $mail->send();

    // Confirmation page
    echo '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Message Sent</title>
    <style>
        body { 
            display:flex; 
            justify-content:center; 
            align-items:center; 
            height:100vh; 
            font-family: Arial, sans-serif;
            flex-direction: column;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin-top: 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007BFF;
            border: none;
            border-radius: 5px;
            text-decoration: none;
        }
        .btn:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <h1>Message successfully sent!</h1>
    <a class="btn" href="index.html">Back to Portfolio</a>
</body>
</html>
';

} catch (Exception $e) {
    http_response_code(500);
    echo "Mailer Error: {$mail->ErrorInfo}";
}