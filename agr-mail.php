<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

try {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    //Recipients
    $mail->setFrom('agr@allgoodroofing.com');     // Add a recipient
    $mail->addAddress('agr@allgoodroofing.com');     // Add a recipient
    $mail->addAddress('daniel.tsosie@gmail.com');     // Add a recipient

    //Content
    $mail->isHTML(false);                                  // Set email format to HTML
    $mail->Subject = 'Website Submission';
    $mail->Body    = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Please email agr@allgoodroofing.com with the error. Mailer Error: ', $mail->ErrorInfo;
}
