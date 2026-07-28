<?php
define('LOG_PASSWORD', require __DIR__ . '/log-config.php');

session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (($_POST['pw'] ?? '') === LOG_PASSWORD) {
        $_SESSION['log_auth'] = true;
    } else {
        $error = true;
    }
}
if (!($_SESSION['log_auth'] ?? false)):
?><!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Besucherprotokoll</title>
<style>
body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f5f5f3}
form{background:#fff;padding:2rem;border-radius:12px;border:0.5px solid #ddd;min-width:280px}
h1{font-size:18px;font-weight:500;margin:0 0 1.5rem}
label{display:block;font-size:13px;color:#666;margin-bottom:4px}
input{width:100%;box-sizing:border-box;padding:8px 12px;border:0.5px solid #ccc;border-radius:6px;font-size:14px;margin-bottom:1rem}
button{width:100%;padding:9px;background:#003e63;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer}
.err{color:#c0392b;font-size:13px;margin-bottom:1rem}
</style>
</head>
<body>
<form method="post">
<h1>Besucherprotokoll</h1>
<?php if (!empty($error)): ?><p class="err">Falsches Passwort.</p><?php endif; ?>
<label>Passwort</label>
<input type="password" name="pw" autofocus>
<button type="submit">Öffnen</button>
</form>
</body>
</html>
<?php
    exit;
endif;

// --- Parse log ---
$logfile = __DIR__ . '/visits.log';
$raw = [];
if (file_exists($logfile)) {
    foreach (file($logfile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $l) {
        $p = explode("\t", $l);
        if (count($p) < 5) continue;
        $ts = DateTime::createFromFormat('d.m.Y, H:i', $p[0]);
        $isDE = str_contains($p[2], 'Deutschland');
        $raw[] = [
            'time'   => $p[0],
            'ip'     => $p[1],
            'city'   => $p[2],
            'page'   => $p[3],
            'device' => $p[4],
            'ts'     => $ts ? $ts->getTimestamp() : 0,
            'de'     => $isDE,
        ];
    }
}

// --- Group into sessions (same IP within 30 min) ---
$sessions = [];
foreach ($raw as $e) {
    $found = false;
    foreach ($sessions as &$s) {
        if ($s['ip'] === $e['ip'] && abs($s['last_ts'] - $e['ts']) <= 1800) {
            if (!in_array($e['page'], $s['pages'])) $s['pages'][] = $e['page'];
            if ($e['ts'] > $s['last_ts']) { $s['last_ts'] = $e['ts']; $s['time_end'] = $e['time']; }
            $found = true;
            break;
        }
    }
    unset($s);
    if (!$found) {
        $sessions[] = [
            'time'     => $e['time'],
            'time_end' => $e['time'],
            'ip'       => $e['ip'],
            'city'     => $e['city'],
            'pages'    => [$e['page']],
            'device'   => $e['device'],
            'ts'       => $e['ts'],
            'last_ts'  => $e['ts'],
            'de'       => $e['de'],
        ];
    }
}

// Newest first
usort($sessions, fn($a, $b) => $b['ts'] - $a['ts']);

$human   = array_filter($sessions, fn($s) => $s['de'] || count($s['pages']) > 1);
$bots    = array_filter($sessions, fn($s) => !$s['de'] && count($s['pages']) === 1);
$cities  = array_unique(array_map(fn($s) => explode(',', $s['city'])[0], $human));
sort($cities);

$total   = count($human);
$cityCount = count($cities);
$last    = $human ? reset($human)['time'] : '–';
?><!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Besucherprotokoll · Dr. Diana Rameil</title>
<style>
*{box-sizing:border-box}
body{font-family:system-ui,sans-serif;margin:0;padding:2rem;background:#f5f5f3;color:#1a1a18;min-height:100vh}
.wrap{max-width:960px;margin:0 auto}
h1{font-size:20px;font-weight:500;margin:0 0 4px}
.sub{font-size:13px;color:#888;margin:0 0 1.5rem}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:1.5rem}
.stat{background:#fff;border-radius:8px;padding:1rem;border:0.5px solid #e0e0db}
.stat-n{font-size:24px;font-weight:500}
.stat-l{font-size:12px;color:#888;margin-top:2px}
.filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1rem;align-items:center}
.filters span{font-size:12px;color:#888}
.btn{padding:4px 12px;border-radius:20px;border:0.5px solid #ccc;background:#fff;font-size:12px;cursor:pointer;color:#333}
.btn.active{background:#003e63;color:#fff;border-color:#003e63}
table{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;border:0.5px solid #e0e0db;overflow:hidden;font-size:13px;margin-bottom:1.5rem}
thead{background:#f9f9f7}
th{text-align:left;padding:10px 14px;color:#888;font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:0.5px solid #e0e0db}
td{padding:10px 14px;border-bottom:0.5px solid #f0f0ec;vertical-align:middle}
tr:last-child td{border-bottom:none}
tr.hidden{display:none}
.city-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500;background:#e8f4fb;color:#185fa5}
.pages{display:flex;flex-wrap:wrap;gap:4px}
.page-tag{display:inline-block;padding:1px 6px;border-radius:3px;font-size:11px;background:#f0f0ec;color:#555}
.bot-section summary{font-size:13px;color:#aaa;cursor:pointer;padding:8px 0;user-select:none}
.bot-section table{opacity:.6}
.none{text-align:center;padding:3rem;color:#aaa;font-size:14px}
</style>
</head>
<body>
<div class="wrap">
<h1>Besucherprotokoll</h1>
<p class="sub">Dr. Diana Rameil · patientensicherheit-gkv.de</p>

<div class="stats">
  <div class="stat"><div class="stat-n"><?= $total ?></div><div class="stat-l">Echte Besuche</div></div>
  <div class="stat"><div class="stat-n"><?= $cityCount ?></div><div class="stat-l">Verschiedene Orte</div></div>
  <div class="stat"><div class="stat-n"><?= $last !== '–' ? substr($last, 0, 6) : '–' ?></div><div class="stat-l">Zuletzt aufgerufen</div></div>
</div>

<div class="filters">
  <span>Ort:</span>
  <button class="btn active" onclick="filter(this,'all')">Alle</button>
  <?php foreach ($cities as $c): ?>
  <button class="btn" onclick="filter(this,'<?= htmlspecialchars($c) ?>')"><?= htmlspecialchars($c) ?></button>
  <?php endforeach; ?>
</div>

<table id="mainTable">
<thead><tr><th>Datum / Uhrzeit</th><th>Ort</th><th>Seiten besucht</th><th>Gerät</th></tr></thead>
<tbody>
<?php if (empty($human)): ?>
<tr><td colspan="4" class="none">Noch keine Besuche aufgezeichnet.</td></tr>
<?php else: foreach ($human as $s):
  $cityShort = explode(',', $s['city'])[0]; ?>
<tr data-city="<?= htmlspecialchars($cityShort) ?>">
  <td><?= htmlspecialchars($s['time']) ?><?php if ($s['time_end'] !== $s['time']): ?><br><span style="color:#aaa;font-size:11px">bis <?= htmlspecialchars(substr($s['time_end'], 12, 5)) ?></span><?php endif; ?></td>
  <td><span class="city-tag"><?= htmlspecialchars($s['city']) ?></span></td>
  <td><div class="pages"><?php foreach ($s['pages'] as $pg): ?><span class="page-tag"><?= htmlspecialchars($pg) ?></span><?php endforeach; ?></div></td>
  <td><?= htmlspecialchars($s['device']) ?></td>
</tr>
<?php endforeach; endif; ?>
</tbody>
</table>

<?php if (!empty($bots)): ?>
<details class="bot-section">
  <summary>Automatische Aufrufe / Bots ausblenden (<?= count($bots) ?>)</summary>
  <table>
  <thead><tr><th>Datum / Uhrzeit</th><th>Ort</th><th>Seite</th><th>Gerät</th></tr></thead>
  <tbody>
  <?php foreach ($bots as $s): ?>
  <tr>
    <td><?= htmlspecialchars($s['time']) ?></td>
    <td><?= htmlspecialchars($s['city']) ?></td>
    <td><?= htmlspecialchars(implode(', ', $s['pages'])) ?></td>
    <td><?= htmlspecialchars($s['device']) ?></td>
  </tr>
  <?php endforeach; ?>
  </tbody>
  </table>
</details>
<?php endif; ?>

</div>
<script>
function filter(btn, city) {
  document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#mainTable tbody tr[data-city]').forEach(row => {
    row.classList.toggle('hidden', city !== 'all' && row.dataset.city !== city);
  });
}
</script>
</body>
</html>
