<?php
$EmailTo = "reservations@ocama.com";

$Name = trim($_POST['Name'] ?? '');
$Email = trim($_POST['Email'] ?? '');
// $Tel = trim($_POST['Tel'] ?? '');
$City = trim($_POST['City'] ?? '');
$Message = trim($_POST['Message'] ?? '');

if ($Name === '' || $Email === '' || $Message === '' || !filter_var($Email, FILTER_VALIDATE_EMAIL)) {
    header("Location: error.htm");
    exit;
}

$Subject = "Website inquiry from $Name";

$Body = "Name: $Name\n";
$Body .= "City: $City\n";
// $Body .= "Tel: $Tel\n";
$Body .= "Email: $Email\n";
$Body .= "Message: $Message\n";

$headers = [];
$headers[] = "From: OCAMA Website <reservations@ocama.com>";
$headers[] = "Reply-To: $Name <$Email>";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$success = mail($EmailTo, $Subject, $Body, implode("\r\n", $headers));

if ($success) {
    header("Location: contactthanks.php");
} else {
    header("Location: error.htm");
}
exit;
?>