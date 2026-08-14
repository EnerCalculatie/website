import fs from 'fs';
import path from 'path';

// --- INSTELLINGEN ---
const DRY_RUN = true; // Zet op false om echt e-mails te versturen
const BATCH_SIZE = 10; // Maximale grootte per run
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_jouw_resend_api_key';
const SENDER_EMAIL = 'Pascal van Eijden <pascal@enercalculatie.nl>';

// Gebruik hardgecodeerde absolute paden (of relatief vanaf dit script)
const CSV_PATH = path.resolve('C:\\Users\\Pascal\\Documents\\workspace-secondbrain\\EnerCalculatie-HQ\\klanten\\_bronnen\\belijst-2026-07-19.csv');
const UITSLUITLIJST_PATH = path.resolve('C:\\Users\\Pascal\\Documents\\workspace-secondbrain\\EnerCalculatie-HQ\\klanten\\_bronnen\\uitsluitlijst.md');

// Haal uitsluitingen (bedrijven & domeinen) uit de markdown tabel
function parseUitsluitlijst(markdown) {
  const uitsluitingen = [];
  const lijnen = markdown.split('\n');
  let inTable = false;
  
  for (const lijn of lijnen) {
    if (lijn.includes('| Bedrijf | Persoon |')) {
      inTable = true;
      continue;
    }
    if (inTable && lijn.startsWith('|') && !lijn.includes('---')) {
      const parts = lijn.split('|').map(p => p.trim());
      if (parts.length > 2 && parts[1]) {
        // Bedrijfsnaam staat in de eerste echte kolom
        uitsluitingen.push(parts[1].toLowerCase());
      }
    }
  }
  return uitsluitingen;
}

// Mail format gebaseerd op 'koude-mail-op-naam.md' (v6)
function generateEmailContent(voornaam) {
  return `Hallo ${voornaam},

Per 1 januari 2027 stopt de salderingsregeling volledig. Vanaf dat moment klopt elke terugverdientijd die nu nog met saldering rekent niet meer, en dat raakt de offertes die u dit najaar de deur uit doet.

Ik ben Pascal van Eijden. Ik bouw EnerCalculatie, software die van een energierekening binnen vijf minuten een onderbouwd adviesrapport maakt, inclusief de nieuwe salderingsregels en de subsidies.

Ik mail u niet om iets te verkopen — probeer het zelf en oordeel. Upload de rekening van een klant, geen account nodig: enercalculatie.nl/gratis. Het rapport staat er in twee minuten, met terugverdientijd en de saldering-2027-vergelijking erin.

Ik hoor graag wat u ervan vindt, en waar uw eigen offerteproces nu vastloopt bij een klus met panelen én een thuisbatterij. Tien minuten telefonisch is genoeg.

Doet u zelf geen thuisbatterijen, laadpalen of warmtepompen? Dan help ik u ook met een tip naar een collega die dat wel doet.

Met vriendelijke groet,
Pascal van Eijden

Liever geen mail meer van mij? Stuur "nee" terug, dan haal ik u van mijn lijst.`;
}

async function sendEmailViaResend(toEmail, subject, text) {
  if (DRY_RUN) {
    console.log(`\n[DRY RUN] Zou e-mail sturen naar: ${toEmail}\n[Onderwerp]: ${subject}`);
    return true;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: toEmail,
        subject: subject,
        text: text
      })
    });
    
    if (response.ok) {
      console.log(`✅ Verzonden naar: ${toEmail}`);
      return true;
    } else {
      console.error(`❌ Fout bij ${toEmail}: ${response.statusText}`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Error bij ${toEmail}:`, err.message);
    return false;
  }
}

async function run() {
  console.log("🚀 Start Outreach Script (v6)");
  
  if (!fs.existsSync(CSV_PATH) || !fs.existsSync(UITSLUITLIJST_PATH)) {
    console.error("❌ Kan belijst-2026-07-19.csv of uitsluitlijst.md niet vinden! Check de paden.");
    return;
  }

  // Parse Uitsluitlijst
  const uitsluitlijst = fs.readFileSync(UITSLUITLIJST_PATH, 'utf-8');
  const uitslotenBedrijven = parseUitsluitlijst(uitsluitlijst);
  console.log(`🛡️  ${uitslotenBedrijven.length} bedrijven op de uitsluitlijst geladen.`);

  // Lees CSV bestand
  const csvData = fs.readFileSync(CSV_PATH, 'utf-8');
  const lijnen = csvData.split('\n').filter(l => l.trim() !== '');
  
  const contacten = lijnen.slice(1).map(lijn => {
    const kolommen = lijn.split(';');
    const voornaamSplit = kolommen[3] ? kolommen[3].split(' ')[0] : '';
    return {
      bedrijf: kolommen[2],
      voornaam: voornaamSplit,
      email: kolommen[6],
      status: kolommen[10] || ''
    };
  });

  let verzondenCount = 0;

  for (const contact of contacten) {
    if (verzondenCount >= BATCH_SIZE) {
      console.log(`\n🛑 BATCH LIMIT (${BATCH_SIZE}) bereikt. Stop script.`);
      break;
    }

    if (!contact.email || !contact.email.includes('@')) continue;
    if (!contact.voornaam) continue; // v6 vereist contactpersoon op naam
    if (contact.status.toLowerCase() === 'benaderd') continue;

    // Controleer uitsluitlijst
    const bedrijfSafe = (contact.bedrijf || "").toLowerCase();
    const isUitgesloten = uitslotenBedrijven.some(b => b && bedrijfSafe.includes(b));
    if (isUitgesloten) {
      console.log(`🚫 Bedrijf overgeslagen (uitsluitlijst): ${contact.bedrijf}`);
      continue;
    }

    const emailContent = generateEmailContent(contact.voornaam);
    const subject = "Vanaf 2027 klopt uw terugverdientijd niet meer"; 

    await sendEmailViaResend(contact.email, subject, emailContent);
    verzondenCount++;
    
    // Voorkom ratelimiting
    if (!DRY_RUN) await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n✅ Script klaar. ${verzondenCount} mails verwerkt (DRY_RUN=${DRY_RUN}).`);
}

run();
