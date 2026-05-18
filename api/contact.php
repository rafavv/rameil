<?php
/**
 * Kontaktformular-Endpunkt
 * Loswebos-Server · info@patientensicherheit-gkv.de
 *
 * SMTP-Zugangsdaten in config.php (liegt ausserhalb des Web-Root oder direkt neben dieser Datei).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Konfiguration laden
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Server configuration missing']);
    exit;
}
$cfg = require $configFile;

// Honeypot: stilles Abbrechen wenn ausgefuellt
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// Eingaben bereinigen
$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

// Pflichtfelder pruefen
if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Bitte alle Felder ausfüllen.']);
    exit;
}

// E-Mail-Format pruefen
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Bitte eine gültige E-Mail-Adresse angeben.']);
    exit;
}

// PHPMailer (falls verfuegbar) oder php mail() als Fallback
$usePHPMailer = file_exists(__DIR__ . '/phpmailer/PHPMailer.php');

if ($usePHPMailer) {
    require __DIR__ . '/phpmailer/Exception.php';
    require __DIR__ . '/phpmailer/PHPMailer.php';
    require __DIR__ . '/phpmailer/SMTP.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = $cfg['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $cfg['smtp_user'];
        $mail->Password   = $cfg['smtp_pass'];
        $mail->SMTPSecure = $cfg['smtp_secure']; // 'ssl' oder 'tls'
        $mail->Port       = (int) $cfg['smtp_port'];
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom($cfg['smtp_from'], 'Dr. Diana Rameil – Website');
        $mail->addAddress($cfg['smtp_to']);
        $mail->addReplyTo($email, $name);

        $mail->Subject = 'Kontaktanfrage von ' . $name;
        $mail->Body    =
            "Name:    " . $name    . "\n" .
            "E-Mail:  " . $email   . "\n\n" .
            "Nachricht:\n" . $message;

        $mail->send();
        echo json_encode(['ok' => true]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'E-Mail konnte nicht gesendet werden.']);
    }
} else {
    // Fallback: php mail() – funktioniert nur wenn der Server SMTP-Relay eingerichtet hat
    $to      = $cfg['smtp_to'];
    $subject = 'Kontaktanfrage von ' . $name;
    $body    = "Name:    $name\nE-Mail:  $email\n\nNachricht:\n$message";
    $headers = implode("\r\n", [
        'From: ' . $cfg['smtp_from'],
        'Reply-To: ' . $email,
        'Content-Type: text/plain; charset=UTF-8',
    ]);

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['ok' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'E-Mail konnte nicht gesendet werden.']);
    }
}
