// Always start at top on reload
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

const PASSWORD_ENABLED = true;
const SITE_PASSWORD = "diana";

// PSS-Daten — alle 22 Patientensicherheitssignale
// Felder: number, title, date, url, content
const PSS_DATA = [
  {
    number: "PSS 01",
    title: "Luft statt Kontrastmittel bei der Herzkatheteruntersuchung",
    date: "10/2023",
    url: "https://www.tk.de/resource/blob/2151500/3f87e322fcc15c1a12e9861a800251b5/tk-pat-sich-info-nr-01-herzkatheter-data.pdf",
    content: `Unter Bedeutung findet sich, daß der im Fall geschilderte Fehler zu schwersten Schäden beim Patienten mit tödlichem Ausgang führte. Geäußert wird die Sorge, die Gefahr, daß intrakardial Luft statt Kontrastmittel verabreicht wird, könnte auch in anderen Einrichtungen bestehen. Ohne sichere Schutzmaßnahmen könnte sich dieser Schaden immer wieder ereignen.

Zielgruppe: Alle Einrichtungen mit Herzkatheterplätzen.
Fall 2021-0035: Luftinjektion führt zu Herzstillstand mit nachfolgender Hirnschädigung und Tod.

Durch das Thema PSS 1 erfährt man immerhin noch, daß offenkundig versehentlich Luft statt Kontrastmittel im Rahmen einer Herzkatheteruntersuchung injiziert wurde, mit nachfolgend tödlichem Ausgang. Auf der Internetseite der Deutschen Gesellschaft für Patientensicherheit findet sich die Erläuterung, die dem PSS Nr. 1 auf der TK-Seite fehlt: Bei einer Herzkatheteruntersuchung wurde versehentlich Luft statt Kontrastmittel injiziert, wodurch es zu einem Herzstillstand und schließlich zum Tod kam. Ursächlich hierfür war ein fehlender technischer Schutz vor Luftinjektionen.

Leider zeigt das PSS Nr. 1 eben genau das nicht, weil man als Leser überhaupt nicht erfährt, was genau passiert ist. Genauso wenig findet sich eine Angabe darüber, ob es sich um ein häufigeres oder seltenes Problem im Rahmen von Herzkatheteruntersuchungen handelt.

In Deutschland sind Luftembolien im Rahmen von Herzkathetern extrem selten. Die Verfahren gehören zu den häufigsten in Deutschland (0,9–1,1 Millionen pro Jahr), sind insgesamt sehr sicher mit niedrigen Komplikationsraten (0,1–0,3%) behaftet. Im Vergleich zu anderen Komplikationen spielen Luftembolien statistisch eine untergeordnete Rolle.

Bei der Kontrastmittelgabe werden mehrere Sicherheitsmaßnahmen routinemäßig umgesetzt: Anwendung von strengen Standardprotokollen und Checks vor jeder Injektion, vollständige Entlüftung von Spritzen und Leitungssystemen, Verwendung von geschlossenen Systemen mit automatischen Injektoren, die Luft detektieren oder ausschließen.`
  },
  {
    number: "PSS 02",
    title: "Misoprostol und Komplikationen bei Müttern und Kindern",
    date: "06/2023",
    url: "https://www.tk.de/resource/blob/2151502/86c17154b1edc52cdb515b400e5c49c5/tk-pat-sich-info-nr-02-geburtseinleitung-data.pdf",
    content: `Die beschriebenen Fälle aus der Vergangenheit beschreiben Komplikationen, die sich auch bei allen anderen zur Geburtseinleitung zugelassenen Medikamenten zeigen. Cytotec im Off-Label-Use wies vor allem das Problem der ungenauen Dosierung auf, da es sich nicht sicher teilen und damit nicht sicher dosieren ließ.

Seit 2017 ist das Misoprostol-Präparat Angusta EU-zugelassen und seit ca. 2018 in vielen Kliniken und Kreißsälen regulär im Einsatz – damit fällt der Off-Label-Use von Cytotec weg. Es bietet sich eine bessere Dosierungssicherheit sowie eine höhere Standardisierung und Rechtssicherheit für Kliniken.`
  },
  {
    number: "PSS 03",
    title: "Fremdkörper im Patienten nach operativen Eingriffen",
    date: "10/2023",
    url: "https://www.tk.de/resource/blob/2151504/26b7d9c82bb84bc5754ec2d8f588f9b8/tk-pat-sich-info-nr-03-fremdkoerper-data.pdf",
    content: `Gemeinsam betrachtet mit PSS Nr. 11 – Verbleib von Katheter- bzw. Drainageteilen im Patientenkörper (08/2024).

Trotz aller installierten Maßnahmen und Zählprotokolle werden solche Fälle immer wieder auftreten. Es handelt sich hierbei um ein sog. Never-event, somit ein voll beherrschbares Risiko und damit eine Umkehr der Beweislast.

Die drei Links in PSS Nr. 3 funktionieren nicht. Bei PSS Nr. 11 funktioniert Link 1 nicht, Link 2 führt zu einem Abstract aus 2002 des British Journal of Anaesthesia und Link 3 zeigt einen Artikel von 2010 aus der Zeitschrift für Herz-, Thorax- und Gefäßchirurgie – zugänglich nur gegen ein kostenpflichtiges Abo.`
  },
  {
    number: "PSS 04",
    title: "Verbrennungen von Patienten während der Eingriffe",
    date: "10/2023",
    url: "https://www.tk.de/resource/blob/2151506/b5802ace4a5a5c68c916a253f31d3de8/tk-pat-sich-info-nr-04-verbrennungen-data.pdf",
    content: `Daß nur 2 Fälle beschrieben werden, einer mit Angabe der Jahreszahl, verdeutlicht die Seltenheit solcher Vorfälle.

Auch hier gilt: Bis auf sehr wenige Ausnahmefälle handelt es sich um das sog. vollbeherrschbare Risiko und führt zu einer Umkehr der Beweislast.

Der erste Link funktioniert nicht, der zweite verweist auf einen Artikel von 2019, wo sich ein Anwalt zur rechtlichen Einordnung von Verbrennungen äußert.`
  },
  {
    number: "PSS 05",
    title: "Nicht rechtzeitiges Erkennen von Sepsis",
    date: "06/2023",
    url: "https://www.tk.de/resource/blob/2151508/f278b89c42115e6e51785db5d2b1e764/tk-pat-sich-info-nr-05-sepsis-data.pdf",
    content: `Das nicht oder nicht rechtzeitige Erkennen der Entstehung einer Sepsis ist weltweit eines der dringendsten medizinischen Probleme. Es gibt viele Initiativen hierzu, dennoch stagnieren in Deutschland die Fallzahlen auf sehr hohem Niveau und lassen am ehesten Wissensdefizite oder auch „Lernlücken" in der Aus- und Weiterbildung vermuten – hier müßte man in die Einzelfallanalyse gehen und genau eruieren, wieso es immer wieder zu solchen Verläufen kommen kann.

Von 4 angeführten Links funktioniert nur einer, der Vierte ist nicht korrekt anklickbar angegeben.`
  },
  {
    number: "PSS 06",
    title: "Überdosierung von Methotrexat",
    date: "10/2023",
    url: "https://www.tk.de/resource/blob/2151510/dec8a823ba8a8b234a3be6eaec97476d/tk-pat-sich-info-nr-06-methotrexat-data.pdf",
    content: `Sehr selten vorkommender Behandlungsfehler. Hier wird lediglich ein einziger Fall benannt. Dieser Fall findet sich gleichfalls auch beim APS und unter „Drug Safety Mail 2023-50" auf den Seiten der Arzneimittelkommission der deutschen Ärzteschaft.

Es gibt für Methotrexat Warnhinweise über „Der Arzneimittelbrief 05/2018" und den sog. „Rote Hand-Brief-Methotrexat" vom 25.11.2019. Da Überdosierungen von Methotrexat als medizinischer Notfall gelten, ist Methotrexat als Hochrisikomedikament eingestuft, weshalb Doppelkontrollen und Clinical Decision Support-Systeme zum Einsatz kommen.

Link 1 – die Seite existiert nicht.
Link 2 führt auf die Seite des Bundesinstituts für Arzneimittel und Medizinprodukte, jedoch nicht auf ein zielgerichtetes Thema.
Link 3 – die Seite existiert nicht.`
  },
  {
    number: "PSS 07",
    title: "Vermeidbare Schäden bei Worst Case Diagnosen",
    date: "03/2024",
    url: "https://www.tk.de/resource/blob/2170742/f69756d0ae6fc787b831a39630d72270/tk-pat-sich-info-nr-07-worstcase-data.pdf",
    content: `Worst-Case-Diagnosen im Kontext der Patientensicherheit bezeichnen Situationen, in denen das schlimmste Szenario für einen Patienten eintritt, oft ausgelöst durch vermeidbare Fehler im Diagnose- oder Behandlungsprozeß. Das PSS Nr. 7 führt eine ganz eigene Sicht auf die Bedeutung an.

Von den 5 angeführten, überwiegend nicht funktionierenden Links führt einer auf die Homepage der Fachanwaltskanzlei Quirmbach und Partner, wo man direkt oben rechts im Bild ein rotes Feld für eine Ersteinschätzung anklicken kann.

Grundsätzlich dürfen gesetzliche Krankenkassen zu Anwaltskanzleien verlinken, so lange dies sachlich begründet ist und nicht gegen das Wettbewerbsrecht verstößt (§1, §3 UWG).`
  },
  {
    number: "PSS 08",
    title: "Einsetzen nicht geeigneter Intraokularlinsen",
    date: "03/2024",
    url: "https://www.tk.de/resource/blob/2170744/d7b5cf52f885aea463938c85a8f6e082/tk-pat-sich-info-nr-08-intraokularlinsen-data.pdf",
    content: `Fallbeschreibung 1 und 2 fallen unter das sog. vollbeherrschbare Risiko und sind maximal informationsarm gehalten. Fall Nr. 3 liest sich, als sei hier die abschließende Bewertung eines Gutachtens übernommen worden.

Es findet sich keine weiterführende Literatur oder Links. Das Zielpublikum sollen alle Kliniken und Praxen im Bereich der Augenheilkunde sein, die Linsen implantieren.`
  },
  {
    number: "PSS 09",
    title: "Patiententransport mit unzureichender Sauerstoffversorgung",
    date: "03/2024",
    url: "https://www.tk.de/resource/blob/2178310/b89abcb6f0b5587df728ee596c652983/tk-pat-sich-info-nr-09-transport-ohne-sauerstoff-data.pdf",
    content: `Unter „Quelle" findet sich ein Link zum CIRS-Berlin, hier Fall des Monats Mai 2022 – wozu soll dieser Link dienen?

3 weiterführende Literaturangaben, die nicht verlinkt wurden, aber aus dem Internet stammen.`
  },
  {
    number: "PSS 10",
    title: "Mangelnde oder fehlende Dekubitusprophylaxe",
    date: "03/2024",
    url: "https://www.tk.de/resource/blob/2178312/68f6ed78ff8aed8b680f278e0476487f/tk-pat-sich-info-nr-10-dekubitusprophylaxe-data.pdf",
    content: `Die Fallbeschreibungen lesen sich wie Auszüge aus einem Gutachten.

Weiterführende Verlinkung/Literatur:
Link 1 führt auf eine Pflegeseite für medizinische Laien zum Thema Dekubitus.
Link 2 funktioniert nicht.
Link 3 führt auf eine TK-eigene Seite mit sehr guter Einführung in das Thema Dekubitus für Versicherte/Laien.
Link 4 erklärt gleichfalls, was ein Dekubitus ist.
Link 5 führt zu einem Dekubitusratgeber.
Link 6 führt auf die Seite Pschyrembel-online zur Definition der Braden-Skala – vollständige Inhalte nur gegen kostenpflichtiges Abo.`
  },
  {
    number: "PSS 11",
    title: "Verbleib von Katheter- bzw. Drainageteilen im Patientenkörper",
    date: "08/2024",
    url: "https://www.tk.de/resource/blob/2178316/13317cf0e84e73c27a1cbb84114a8b6a/tk-pat-sich-info-nr-11-katheterteile-im-patienten-data.pdf",
    content: `Gemeinsam betrachtet mit PSS Nr. 3 – Fremdkörper im Patienten nach operativen Eingriffen (10/2023).

Trotz aller installierten Maßnahmen und Zählprotokolle werden solche Fälle immer wieder auftreten. Es handelt sich hierbei um ein sog. Never-event, somit ein voll beherrschbares Risiko und damit eine Umkehr der Beweislast.

Bei PSS Nr. 11 funktioniert Link 1 nicht, Link 2 führt zu einem Abstract aus 2002 des British Journal of Anaesthesia und Link 3 zeigt einen Artikel von 2010 aus der Zeitschrift für Herz-, Thorax- und Gefäßchirurgie – zugänglich nur gegen ein kostenpflichtiges Abo.`
  },
  {
    number: "PSS 12",
    title: "Eingriffsverwechselungen",
    date: "08/2024",
    url: "https://www.tk.de/resource/blob/2180400/ea332abc9981e37fc1e840dbbd7b99a8/tk-pat-sich-info-nr-12-eingriffsverwechselungen-data.pdf",
    content: `Alle geschilderten Beispiele unterliegen dem sog. „Vollbeherrschbaren Risiko" mit Beweislastumkehr. Jahresangaben finden sich nicht.

Link 1: APS, Vermeidung einer Eingriffsverwechselung, 36 Seiten.
Link 2: APS-Never-Event-Liste als Download.
Link 3: Literatur von 2015.
Link 4: funktioniert nicht.
Link 5: Patientensicherheit Schweiz, COM-Check sichere Chirurgie.
Link 6: Warnhinweis – führt auf eine unsichere Webseite.
Link 7: WHO, Surgical Safety Checklist, mehrere Downloads.`
  },
  {
    number: "PSS 13",
    title: "Schadensfallmeldungen im Zusammenhang mit einer Zahnbehandlung",
    date: "09/2024",
    url: "https://www.tk.de/resource/blob/2181806/5bc979e337f555425d2e5521a1b52140/tk-pat-sich-info-nr-13-zahnarzt-data.pdf",
    content: `Fall Nr. 4 ist ein schwerer Behandlungsfehler im Rahmen einer ambulanten Vollnarkose – das Thema Zahnbehandlung spielt hier eine vollkommen untergeordnete Rolle.

Fall Nr. 5 ist nicht vollständig beschrieben – es handelt sich tatsächlich um eine deutlich vorerkrankte Patientin, die bei nachfolgenden Beschwerden nach erfolgter Zahnextraktion zunächst über Tablettenmitgabe an den Ehemann behandelt wurde.

Wichtige Verlinkungen/Literatur:
Link 1 und Link 2 führen auf die gleiche Seite.
Link 3 funktioniert nicht.
Link 4 führt auf eine Seite für Zahnärzte von 2018 mit der Aufzählung von 15 Never-Events in der Zahnheilkunde, gefolgt von jeder Menge Werbung.`
  },
  {
    number: "PSS 14",
    title: "Reduktion von Diagnosefehlern",
    date: "09/2024",
    url: "https://www.tk.de/resource/blob/2181808/8439e48ae4dc8d7a53345a7d9a27439f/tk-pat-sich-info-nr-14-diagnosefehler-data.pdf",
    content: `Wichtige Verlinkungen/Literatur:
Link 1 funktioniert nicht.
Link 2 führt auf die Seite der Patientensicherheit Schweiz, hier auf die Aktionswoche Patientensicherheit 2026 (14.–18.09.2026) – keine Relevanz zum PSS Nr. 14.
Link 3 führt auf eine Seite der WHO.`
  },
  {
    number: "PSS 15",
    title: "Anwendung und Interpretation von CTGs im Rahmen der Geburtshilfe",
    date: "04/2025",
    url: "https://www.tk.de/resource/blob/2194644/52a75abf89da8e39b25ad87d0dec2d18/tk-pat-sich-info-nr-15-ctgs-im-rahmen-der-geburtshilfe-data.pdf",
    content: `Wichtige Verlinkungen/Literatur:
Link 1: S3-Leitlinie Fetale Überwachung in der Schwangerschaft.
Link 2: Nationales Gesundheitsziel 2016 „Gesundheit rund um die Geburt" – funktioniert nicht.
Link 3: Weltgesundheitstag 2025 – keinerlei Bezug zur Anwendung und Interpretation von CTGs im Rahmen der Geburtshilfe erkennbar.
Link 4: WHO-Seite, World-Patient-Safety-Day 17.09.2025 – keinerlei Bezug zum Thema des PSS Nr. 15.`
  },
  {
    number: "PSS 16",
    title: "Erhöhung der Sicherheit während der Schwangerschaft",
    date: "06/2025",
    url: "https://www.tk.de/resource/blob/2197780/b039f91af592ba1360af457f8a1839fd/tk-pat-sich-info-nr-16-erhoehung-der-sicherheit-waehrend-der-schwangerschaft-data.pdf",
    content: `Link 1: Übersichtsarbeit von 2009 im Deutschen Ärzteblatt – zum Zeitpunkt der Veröffentlichung 14 Jahre alt, nur mit Registrierung vollständig lesbar.

Link 2: Deutsches Ärzteblatt 2023, Schwangerschaftsnachsorgeprogramm – das PSS Nr. 16 bezieht sich auf die Sicherheit während der Schwangerschaft, nicht auf eine Nachsorge.

Link 3: Springermedizin, Schwangerschaftsassoziierte Notfälle – ein Kapitel aus einem Buch für Intensivmediziner.

Link 4: Gelbe Liste, Langzeiteffekte hypertensiver Schwangerschaftserkrankungen – kein Bezug zum Thema des PSS Nr. 16.`
  },
  {
    number: "PSS 17",
    title: "Erhöhung der Sicherheit während der Geburt",
    date: "07/2025",
    url: "https://www.tk.de/resource/blob/2200188/97efb60190822aa35ab10efaff522df1/tk-pat-sich-info-nr-17-erhoehung-der-sicherheit-waehrend-der-geburt-data.pdf",
    content: `Fall 1 – Fehler bei der Entbindung: Keinerlei Informationen zum Jahr der Entbindung, Größe der Geburtsklinik, Anzahl möglicherweise vorausgegangener Schwangerschaften, Alter der Schwangeren, evtl. Risikofaktoren. Keine Angabe, mit welchen Medikamenten eingeleitet wurde, wie lange die Entbindung dauerte, wie die CTGs aussahen.

Fall 2 – Fehlende Aufklärung und zu späte ärztliche Betreuung bei bekannter Risikogeburt: Keinerlei Informationen zum Jahr der Entbindung, Größe der Geburtsklinik, Alter der werdenden Mutter, Anzahl vorangegangener Schwangerschaften und Entbindungen.

Fall 3 – Patientin stirbt an Blutung wegen zu später Verlegung vom Geburtshaus ins Krankenhaus: Als Ursache wird hier eine Uterusatonie nur vermutet. Bei einer Frau, die unter der Geburt oder unmittelbar danach verstirbt, handelt es sich nicht um eine natürliche Todesursache – die Staatsanwaltschaft schaltet sich ein, es wird ein rechtsmedizinisches Gutachten in Auftrag gegeben.

Fall 4 – Geburtseinleitung: Keinerlei Informationen zu Geburtsjahr, Klinik, Patientin, Schwangerschaftswoche zum Zeitpunkt der Einleitung, welche Art von Diabetes vorlag. Keine Angaben zur Dauer der Einleitung und zum kindlichen Outcome.

Fall 5 – Fehlerhafte Geburtsüberwachung: Maximal minimalistische Falldarstellung ohne jegliche Angabe zum Outcome des Kindes.

Wichtige Verlinkungen/Literatur:
Link 1 führt auf die TK-eigene Seite „Häufige Komplikationen während der Geburt" – als Information für medizinische Laien gedacht.
Link 2–6 sind ausnahmslos verlinkte Leitlinien zu geburtshilflichen Themen, wobei Link 5 keine zugehörige Verlinkung aufweist.`
  },
  {
    number: "PSS 18",
    title: "Sichere Gesundheitsversorgung von Kindern",
    date: "09/2025",
    url: "https://www.tk.de/resource/blob/2203520/db59dd5fd7c236cf68ee3b872e812904/tk-pat-sich-info-nr-18-sichere-gesundheitsversorgung-von-kindern-data.pdf",
    content: `PSS Nr. 18 hat den gleichen Kinderfall wie PSS Nr. 7 – dieser hätte wahrscheinlich auch unter Berücksichtigung aller Laborparameter in die PSS Nr. 5 eingeordnet werden können.

Fall 4 – Schwerhörigkeit bei Kind mehr als 2 Jahre nicht erkannt: Das Kind hätte so oder so Hörgeräte benötigt. Unklar bleibt, um welche Art der Hörstörung es überhaupt geht.

Fall 7 – Unzureichende Überwachung eines Säuglings im Rahmen einer PEG-Anlage: Es handelt sich hier um den Fall meiner eigenen Tochter, der wesentlich mehr gravierende Fehler beinhaltet, als verkürzt dargestellt. Siehe dazu die Fallbeschreibung unter „Fall Anni".

Wichtige Verlinkungen/Literatur:
Link 1 – Welttag der Patientensicherheit.
Link 2 – Ratgeber des APS, „Sicher im Krankenhaus" – kein Bezug zum Thema des PSS Nr. 18.
Link 3 – Ärztezeitung online, kurzer Artikel von 2012 aus Oxford.
Link 4 – Artikel aus 2011 über Medikationsfehler – 15 Jahre alt zum Zeitpunkt der Veröffentlichung.
Link 5 – Deutsche Gesellschaft für Kinderchirurgie.
Link 6 – Eltern-Bildung – kurzer Artikel, der am Zielpublikum vorbeigeht.
Link 7 – Einladung zu einem Webinar von 2022 – drei Jahre vor Erscheinen des PSS Nr. 18.
Link 8 – Abstract einer pädiatrischen Studie in Australien, nicht frei zugänglich.
Link 9 – TK-eigene Seite „Bauchschmerzen im Kindesalter" – Informationsseite für medizinische Laien.`
  },
  {
    number: "PSS 19",
    title: "Thrombosen sicher erkennen und vermeiden",
    date: "10/2025",
    url: "https://www.tk.de/resource/blob/2205038/5c0051c35c45e8bbcaf52eededf7a221/tk-pat-sich-info-nr-19-thrombosen-data.pdf",
    content: `Wichtige Verlinkungen/Literatur:
Link 1–3: Leitlinien.
Link 4: Informationsbroschüre für Patienten.
Link 5: Informationsmaterial für Patienten.
Link 6: Ärztezeitung, inhaltsarmer Artikel von 2007.
Link 7: Pharmazeutische Zeitung, inhaltsarmer Artikel von 2006.`
  },
  {
    number: "PSS 20",
    title: "Sichere Indikationsstellung",
    date: "11/2025",
    url: "https://www.tk.de/resource/blob/2207908/d904b31356514610c3c1699e9c42d6da/tk-pat-sich-info-nr-20-indikationsstellung-data.pdf",
    content: `Empfehlungen und Informationen vom Aktionsbündnis Patientensicherheit: 5 Verlinkungen zum APS.

Weitere Verlinkungen/Literatur:
Link 6: Bayrisches Ärzteblatt 2016.
Link 7: Schweizerische Ärztezeitung 2012.
Link 8: Link funktioniert nicht.
Link 9: Gebührenpflichtige Lernplattform Thieme via medici.`
  },
  {
    number: "PSS 21",
    title: "Kritische Ereignisse im Zusammenhang mit Tumorerkrankungen",
    date: "02/2026",
    url: "https://www.tk.de/resource/blob/2211862/9c1454f405a324292d2ee01f5e4f3c3d/tk-pat-sich-info-nr-21-kritische-ereignisse-im-zusammenhang-mit-tumorerkrankungen-data.pdf",
    content: `Unter Bedeutung wird auf zahlreiche Fallbeispiele innerhalb der TK-Schadensfallmeldungen hingewiesen. Auf Quellenangaben und nähere Angaben zu Fallzahlen wird verzichtet.

Die nachfolgenden 7 Fälle beziehen sich jedoch nur auf „Unterlassung oder unvollständige Befunderhebung" und „Fehleinschätzung von Befunden" – was ein individuelles Fehlverhalten darstellt.

Fall 1 (Keine Befundübermittlung trotz Verdacht auf Brustkrebs), Fall 2 (Implantat nach Brustkrebs-Op freiliegend), Fall 3 (Klinikum hat vergessen über Tumor zu informieren), Fall 4 (Hirntumor 3 Jahre lang nicht erkannt), Fall 5 (Verzögerte Diagnostik eines Plattenepithelkarzinoms), Fall 6 (Tumor bei kindlicher U-Untersuchung nicht erkannt) und Fall 7 (Rektum-Karzinom nicht erkannt) – alle weisen erhebliche Lücken in der Falldarstellung auf. Die Fallbeschreibung von Fall 7 endet inmitten eines Satzes.

Wichtige Verlinkungen/Literatur: 13 Links, darunter Kongressankündigungen und Homepages von Fachgesellschaften – überwiegend ohne direkten inhaltlichen Bezug zu den geschilderten Fällen.`
  },
  {
    number: "PSS 22",
    title: "Arzneimitteltherapiesicherheit: Reduktion von Verordnungsfehlern",
    date: "03/2026",
    url: "https://www.tk.de/resource/blob/2213880/698a10602db9a9a4f1df79b60c83ec5b/tk-pat-sich-info-nr-22-arzneimitteltherapiesicherheit---reduktion-von-verordnungsfehlern-data.pdf",
    content: `Bereits unter Bedeutung und Einleitung fallen mehrere Dinge auf: „Das BfArM verzeichnet jährlich rund 1.000 Meldungen zu Medikationsfehlern." Eine Jahres- und Quellenangabe fehlt.

Besondere Aufmerksamkeit erregt, daß die Autorin des PSS Nr. 22 ihre eigene Veröffentlichung von 2014 als Referenz anführt und diese am Ende des PSS Nr. 22 sogar als weiterführende Literatur verlinkt. Es handelt sich um eine 14 Jahre alte Veröffentlichung mit noch älteren Daten aus Schweizer Kliniken – nicht repräsentativ für die aktuelle Situation in Deutschland.

Für Unklare Verordnungen, Doppelverordnungen sowie Falsche Applikationsform finden sich keine Fallbeispiele.

Während die TK mit der ePA, TK Safe und dem E-Rezept die digitale Transformation eingeführt hat, verharrt das PSS Nr. 22 noch in der Ära der Handschriftlichkeit. 2026 verhindert man Medikations- und Verordnungsfehler am wirksamsten mit mehreren Sicherheitsbarrieren: Elektronische Verordnung mit Entscheidungsunterstützung (CPOE + CDSS), strukturierte Medikationsabgleiche, Barcode-Scanning vor Abgabe und Verabreichung, Standardisierung, Doppelkontrollen bei Hochrisiko-Medikamenten sowie aktive Einbeziehung der Patienten.

Wichtige Verlinkungen/Literatur: 7 Links, darunter APS-Empfehlungen, BfArM-Seiten und veraltete Artikel aus 2012 und 2014.`
  },
  {
    number: "PSS 23",
    title: "Schlaganfall sicher erkennen und behandeln",
    date: "05/2026",
    url: "https://www.tk.de/resource/blob/2217060/c8d6b8d0f50d57f8871aecfcbe967a49/tk-pat-sich-info-nr-23-arzneimitteltherapiesicherheit---schlaganfall-sicher-erkennen-und-behandeln-data.pdf",
    content: `Unter Thema/Bedeutung findet sich eine stark verkürzte und laienhafte „Einführung" ohne Quellen- oder Literaturangabe. Gleichfalls wird nicht auf die unterschiedlichen Schlaganfallformen, -ursachen und Risiken hingewiesen. Die Zielgruppe sollen Gesundheitseinrichtungen sein, die in die Diagnostik und Therapie von Schlaganfällen eingebunden sind, vornehmlich Ärzte.

Es werden 9 „Fallstricke" ohne Quellenangabe aufgelistet. Es werden 4 Fälle aus dem Behandlungsfehlerregister angeführt. Über welchen Zeitraum diese erhoben wurden und aus welchem Behandlungsjahr sie stammen, bleibt unklar.

Fall Nr. 1 – Dreistündige Verzögerung der Erstdiagnose bei Verdacht auf einen Schlaganfall: Hier bleibt vollkommen unklar, um welche Art von Schlaganfall es sich handelt und ob das Zeitfenster für eine Thrombolyse eine Rolle gespielt hat. Unklar bleibt, ob die sich in der Folge zeigende linksseitige Halbseitenlähmung vermeidbar gewesen wäre, wenn eine Therapie früher zum Einsatz gekommen wäre. Gleichfalls fehlen Informationen zu sonstigen Erkrankungen und ggf. Medikamenteneinnahme des Versicherten.

Fall Nr. 2 – Keine diagnostischen Maßnahmen innerhalb von 5 Stunden trotz Verdacht auf TIA/Schlaganfall: Daß ein Patient trotz auffälliger Symptomatik ohne neurologische Untersuchung 5 Stunden in einer Klinik gewartet hat und dann in einem Taxi nach Hause fuhr, zeigt eine grob behandlungsfehlerhafte Organisationsstruktur. Im weiteren Verlauf zeigten sich mehrere Hirninfarkte sowie eine hochgradige Verengung der rechten Halsschlagader – auch hier muß man sich die Frage stellen, ob der sich später zeigende Schaden bereits vorhanden war oder sich durch die ausbleibende Diagnostik verschlimmert hat.

Fall 3 – Bildgebung erst nach 3 Stunden trotz typischer Symptome: Keine Informationen zum Alter oder medizinischer Vorgeschichte der Patientin, dem Behandlungsjahr. Bei einer offenkundig deutlich verzögerten Untersuchung zeigte ein MRT einen ausgedehnten ischämischen Infarkt – welche Therapie erhielt die Patientin anschließend? Hat der Zeitverlust zu einem größeren, womöglich vermeidbaren Schaden geführt?

Fall 4 – Schlaganfall bei jungem Menschen zunächst nicht erkannt: Offenbar handelt es sich um einen 26-jährigen Patienten unter Cannabiseinfluß. Unklar bleibt, ob und welche Art von Schlaganfall der Patient erlitten hat und ob eine verspätete Diagnose zu einem bei rechtzeitiger Diagnose vermeidbaren Schaden geführt hat.

Unter Anregung/Prävention finden sich 31 Fragen, die man durchgehen soll.

Wichtige Verlinkungen/Literatur:
Link 1: S2e-Leitlinie zur Akuttherapie des ischämischen Schlaganfalls, 163 Seiten.
Link 2: S2k-Leitlinie zur Sekundärprophylaxe ischämischer Schlaganfall und TIA – bezieht sich auf Therapien nach erfolgtem Schlaganfall zur Vermeidung eines erneuten Ereignisses. Das PSS Nr. 23 bezieht sich aber auf die sichere Erkennung und nicht auf die Sekundärprophylaxe.
Link 3: DEGAM, S3-Leitlinie Schlaganfall, 186 Seiten.
Link 4: Deutsche Schlaganfallgesellschaft – ESO-Zertifizierungsantrag als PDF.
Link 5: Deutsche Schlaganfallgesellschaft, Schlaganfallregister.
Link 6: Deutsches Ärzteblatt online 2021 – Qualitätssichernde Maßnahmen und Sterblichkeit nach Schlaganfall – das PSS Nr. 23 bezieht sich auf die sichere Erkennung, nicht auf die Sterblichkeit danach.
Link 7: Deutsche Schlaganfallbegleitung, Björn Steiger-Stiftung – Informationsseite für medizinische Laien.

Hinweis auf den Bundesweiten Aktionstag gegen den Schlaganfall (10. Mai 2026) sowie den 2. Deutschen Schlaganfallkongreß DSG26 – anläßlich dieses Aktionstages hätte man präventiv und für Versicherte sehr gut den TK-eigenen Beitrag zum Thema Schlaganfall nutzen und ggf. um das diesjährige Thema „unsichtbare Schlaganfall-Folgen" erweitern können.

Hinweis: Seit Mai 2026 werden die PSS nicht mehr in der Reihenfolge ihrer Erscheinung angezeigt, sondern sind thematisch unter medizinischen Fachrichtungen zu finden.`
  }
];

const documents = [
  {
    title: "Startseite Homepage und Gliederung",
    path: "content/startseite-und-gliederung.txt",
  },
  {
    title: "Lebenslauf Diana",
    path: "content/profil-lebenslauf.txt",
  },
  {
    title: "Anni neu",
    path: "content/fall-anni.txt",
  },
  {
    title: "Patientensicherheit aktuell",
    path: "content/patientensicherheit-aktuell.txt",
  },
  {
    title: "Ansatz und Analyse PSS",
    path: "content/pss-analyse.txt",
  },
  {
    title: "Aufgaben Patientensicherheitsbeauftragte und Projekte",
    path: "content/projekte.txt",
  },
  {
    title: "Abschluss",
    path: "content/abschluss-kontakt.txt",
  },
];

const passwordScreen = document.querySelector("#passwordScreen");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordHint = document.querySelector("#passwordHint");
const siteShell = document.querySelector("#siteShell");

function unlockSite() {
  passwordScreen.hidden = true;
  siteShell.hidden = false;
  sessionStorage.setItem("dr-site-unlocked", "true");
  markActiveNav();
  initMenu();
  initContactForm();
  loadTextBlocks();
  loadPssAccordions();
  mountDocumentList();
  initHeroSlider();
  observeReveals();
}

if (!PASSWORD_ENABLED || sessionStorage.getItem("dr-site-unlocked") === "true") {
  unlockSite();
}

passwordForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value === SITE_PASSWORD) {
    unlockSite();
    return;
  }

  passwordHint.textContent = "Das Passwort stimmt noch nicht.";
  passwordInput.select();
});

async function loadTextBlocks() {
  const blocks = document.querySelectorAll("[data-content]");

  await Promise.all(
    [...blocks].map(async (block) => {
      const path = block.dataset.content;

      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const text = await response.text();
        block.textContent = text.trim();
      } catch (error) {
        block.textContent = `Originaltext konnte nicht geladen werden: ${path}`;
      }
    }),
  );
}

function mountDocumentList() {
  const list = document.querySelector("#documentList");
  if (!list || list.children.length) return;

  documents.forEach((documentItem) => {
    const card = document.createElement("article");
    card.className = "document-card reveal";

    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = documentItem.title;
    const meta = document.createElement("span");
    meta.textContent = "Unveränderter Rohtext";
    copy.append(title, meta);

    const link = document.createElement("a");
    link.href = documentItem.path;
    link.textContent = "Öffnen";

    card.append(copy, link);
    list.append(card);
  });
}

function loadPssAccordions() {
  const container = document.querySelector("[data-pss-source]");
  if (!container || container.dataset.loaded === "true") return;

  const items = PSS_DATA;
  if (!items || !items.length) {
    container.textContent = "Keine PSS-Daten gefunden.";
    return;
  }

  container.dataset.loaded = "true";
  container.innerHTML = "";

  items.forEach((item) => {
      const details = document.createElement("details");
      details.className = "analysis-pss-item reveal";

      const summary = document.createElement("summary");
      const label = document.createElement("span");
      label.textContent = item.number;
      const title = document.createElement("strong");
      title.textContent = item.title;
      summary.append(label, title);

      const content = document.createElement("div");
      content.className = "analysis-pss-content";

      const text = document.createElement("p");
      text.textContent = item.content;
      content.append(text);

      if (item.url) {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = "TK-Dokument öffnen (PDF)";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "pss-source-link";
        content.append(link);
      }

      details.append(summary, content);
      container.append(details);
    });

    observeReveals();
}

function markActiveNav() {
  const page = document.body.dataset.page;
  const currentHref = {
    start: "index.html",
    profil: "profil.html",
    impuls: "impuls.html",
    aktuell: "aktuell.html",
    analyse: "analyse.html",
    konzept: "konzept.html",
    kontakt: "kontakt.html",
  }[page];

  if (!currentHref) return;

  document.querySelectorAll(".main-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentHref) {
      link.classList.add("is-active");
    }
  });
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#mainNav");
  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (event.target.closest(".main-nav") || event.target.closest(".menu-toggle")) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function initHeroSlider() {
  const slides = [...document.querySelectorAll("[data-slide]")];
  const buttons = [...document.querySelectorAll("[data-slide-button]")];
  if (!slides.length || !buttons.length) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (activeIndex < 0) activeIndex = 0;
  let timer;

  const showSlide = (nextIndex) => {
    activeIndex = nextIndex;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);

      const video = slide.querySelector("video");
      if (!video) return;

      if (isActive) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    buttons.forEach((button, index) => {
      button.classList.toggle("is-active", index === activeIndex);
    });
  };

  const startTimer = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, 9000);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showSlide(Number(button.dataset.slideButton));
      startTimer();
    });
  });

  showSlide(activeIndex);
  startTimer();
}

function initContactForm() {
  // Beide Formulare einbinden: Footer-Formular und ggf. separates Kontaktseiten-Formular
  const pairs = [
    { form: "#contactForm",       status: "#formStatus"       },
    { form: "#contactFormFooter", status: "#formStatusFooter" },
  ];

  pairs.forEach(({ form: formSel, status: statusSel }) => {
    const form   = document.querySelector(formSel);
    const status = document.querySelector(statusSel);
    if (!form || !status) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      if (formData.get("website")) return; // Honeypot

      const btn = form.querySelector("button[type=submit]");
      if (btn) btn.disabled = true;
      status.textContent = "Wird gesendet …";
      status.className   = "form-status";

      try {
        const response = await fetch("/api/contact.php", {
          method: "POST",
          body: formData,
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok && data.ok) {
          status.textContent = "Vielen Dank! Ihre Nachricht wurde gesendet.";
          status.classList.add("form-status--ok");
          form.reset();
        } else {
          throw new Error(data.error || "Unbekannter Fehler");
        }
      } catch (err) {
        status.textContent = err.message || "Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut.";
        status.classList.add("form-status--error");
        if (btn) btn.disabled = false;
      }
    });
  });
}

function observeReveals() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.22 },
  );

  reveals.forEach((item) => observer.observe(item));
}
