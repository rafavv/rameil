<?php
header('Content-Type: image/gif');
echo base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

$page = isset($_GET['p']) ? preg_replace('/[^a-z0-9\/_-]/i', '', $_GET['p']) : '?';
$ip   = $_SERVER['REMOTE_ADDR'] ?? '';
$ua   = $_SERVER['HTTP_USER_AGENT'] ?? '';

$city    = 'unbekannt';
$country = '';
if ($ip && $ip !== '127.0.0.1') {
    $geo = @file_get_contents("http://ip-api.com/json/{$ip}?fields=city,country,status&lang=de");
    if ($geo) {
        $d = json_decode($geo, true);
        if (($d['status'] ?? '') === 'success') {
            $city    = $d['city'] ?? 'unbekannt';
            $country = $d['country'] ?? '';
        }
    }
}

$browser = 'Unbekannt';
if (str_contains($ua, 'Edg'))    $browser = 'Edge';
elseif (str_contains($ua, 'OPR')) $browser = 'Opera';
elseif (str_contains($ua, 'Chrome')) $browser = 'Chrome';
elseif (str_contains($ua, 'Firefox')) $browser = 'Firefox';
elseif (str_contains($ua, 'Safari'))  $browser = 'Safari';

$device = preg_match('/Mobile|Android|iPhone|iPad/i', $ua) ? 'Mobile' : 'Desktop';

$line = implode("\t", [
    date('d.m.Y, H:i'),
    $ip,
    $city . ($country ? ', ' . $country : ''),
    $page,
    $device . ' · ' . $browser,
]) . "\n";

file_put_contents(__DIR__ . '/visits.log', $line, FILE_APPEND | LOCK_EX);
