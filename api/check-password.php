<?php
/**
 * Seitenschutz-Endpunkt
 * Prueft das Zugangspasswort serverseitig, damit es nicht im Client-Code steht.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$configFile = __DIR__ . '/site-password.php';
$expected = file_exists($configFile) ? (string) require $configFile : '';

$input = json_decode((string) file_get_contents('php://input'), true);
$given = (string) ($input['password'] ?? '');

$ok = $expected !== '' && hash_equals($expected, $given);

echo json_encode(['ok' => $ok]);
