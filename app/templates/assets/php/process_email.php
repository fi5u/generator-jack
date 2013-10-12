<?php
    $body_message = "";

    foreach ($_POST as $key => $value) {
        if ($key !== "mailto" && $key !== "subject") {
            $body_message .= $key .": ". $value . "\n";
        }
    }

    $mail_to = $_POST['mailto'];
    $subject = $_POST['subject'];

    $headers = "From: ". $_POST['email'] ."\r\n";
    $headers .= "Reply-To: ". $_POST['email'] ."\r\n";

    mail($mail_to, $subject, $body_message, $headers);

    echo json_encode( array("success" => "true") );
?>