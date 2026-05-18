<?php
/**
 * SMTP-Konfiguration – NICHT ins Git-Repository einchecken!
 *
 * Bitte die Zugangsdaten des Loswebos-Mailkontos eintragen:
 *   Postfach: info@patientensicherheit-gkv.de
 *
 * Typische Loswebos-SMTP-Einstellungen:
 *   Host:    mail.patientensicherheit-gkv.de  (oder smtp.loswebos.de – bitte im Webmail pruefen)
 *   Port:    587  (STARTTLS)  oder  465 (SSL)
 *   Secure:  'tls' fuer Port 587, 'ssl' fuer Port 465
 */

return [
    'smtp_host'   => 'mail.patientensicherheit-gkv.de', // ggf. anpassen
    'smtp_port'   => 587,
    'smtp_secure' => 'tls',   // 'tls' oder 'ssl'
    'smtp_user'   => 'info@patientensicherheit-gkv.de',
    'smtp_pass'   => 'PS#diana_2026',
    'smtp_from'   => 'info@patientensicherheit-gkv.de',
    'smtp_to'     => 'info@patientensicherheit-gkv.de',
];
