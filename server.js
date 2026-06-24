// server.ts
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";

// contact.ts
import { Router } from "express";
import { Resend } from "resend";

// emailUtils.ts
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// contact.ts
var resend = new Resend(process.env.RESEND_API_KEY);
var router = Router();
router.post("/contact", async (req, res) => {
  const { firstName, lastName, email, company, message, subject } = req.body || {};
  if (subject) {
    return res.status(200).json({ message: "Bericht succesvol verzonden." });
  }
  const missingFields = [];
  if (!firstName) missingFields.push("firstName");
  if (!lastName) missingFields.push("lastName");
  if (!email) missingFields.push("email");
  if (!message) missingFields.push("message");
  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Niet alle verplichte velden zijn ingevuld: ${missingFields.join(", ")}.` });
  }
  try {
    const { data, error } = await resend.emails.send({
      // BELANGRIJK: Vervang 'info@enercalculatie.nl' door het e-mailadres waar je de aanvragen wilt ontvangen.
      to: ["info@enercalculatie.nl"],
      // BELANGRIJK: Vervang 'website@enercalculatie.nl' door een geverifieerd domein in Resend.
      // Voor testen kun je 'onboarding@resend.dev' gebruiken.
      from: "EnerCalculatie Website <website@enercalculatie.nl>",
      subject: "Aanvraag via website",
      replyTo: email,
      html: `
        <h1>Nieuwe contactaanvraag</h1>
        <p><strong>Naam:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Bedrijf:</strong> ${company ? escapeHtml(company) : "Niet opgegeven"}</p>
        <hr>
        <p><strong>Bericht:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `
    });
    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (_exception) {
    res.status(500).json({ error: "Er is een onverwachte fout opgetreden." });
  }
});
var contact_default = router;

// leadMagnet.ts
import { Router as Router2 } from "express";
import { Resend as Resend2 } from "resend";
var resend2 = new Resend2(process.env.RESEND_API_KEY);
var router2 = Router2();
router2.post("/lead-magnet", async (req, res) => {
  const { email, company } = req.body || {};
  if (company) {
    return res.status(200).json({ message: "Aanmelding succesvol verwerkt." });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ error: "Vul een geldig e-mailadres in." });
  }
  try {
    const { error: leadError } = await resend2.emails.send({
      to: [email],
      from: "EnerCalculatie <info@enercalculatie.nl>",
      subject: "Uw ROI-gids voor installateurs",
      html: `
        <h1>Bedankt voor uw aanmelding</h1>
        <p>Hierbij de ROI-gids met rekenmethodes en voorbeeldberekeningen voor de terugverdientijd van zonnepanelen, thuisbatterijen en warmtepompen \u2014 als bijlage bij deze e-mail.</p>
        <p>Vragen over een specifiek dossier? Antwoord gerust op deze e-mail.</p>
      `,
      attachments: [
        {
          filename: "EnerCalculatie-ROI-gids.pdf",
          path: "https://www.enercalculatie.nl/roi-gids.pdf"
        }
      ]
    });
    if (leadError) return res.status(400).json(leadError);
    const { data, error } = await resend2.emails.send({
      to: ["info@enercalculatie.nl"],
      from: "EnerCalculatie Website <website@enercalculatie.nl>",
      subject: "Nieuwe aanmelding ROI-gids",
      replyTo: email,
      html: `
        <h1>Nieuwe aanmelding ROI-gids voor installateurs</h1>
        <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      `
    });
    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (_exception) {
    res.status(500).json({ error: "Er is een onverwachte fout opgetreden." });
  }
});
var leadMagnet_default = router2;

// newsletter.ts
import { Router as Router3 } from "express";
var router3 = Router3();
router3.post("/newsletter", async (req, res) => {
  const { email, company } = req.body || {};
  if (company) {
    return res.status(200).json({ message: "Inschrijving succesvol verwerkt." });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ error: "Vul een geldig e-mailadres in." });
  }
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  const templateId = process.env.BREVO_TEMPLATE_ID;
  if (!apiKey || !listId || !templateId) {
    return res.status(500).json({ error: "Nieuwsbrief-inschrijving is momenteel niet beschikbaar." });
  }
  try {
    const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        email,
        includeListIds: [Number(listId)],
        templateId: Number(templateId),
        redirectionUrl: "https://www.enercalculatie.nl/nieuwsbrief-bevestigd"
      })
    });
    if (!response.ok && response.status !== 400) {
      const errorBody = await response.json().catch(() => null);
      return res.status(502).json({ error: errorBody?.message || "Inschrijven via Brevo is mislukt." });
    }
    res.status(200).json({ message: "Check uw inbox om de inschrijving te bevestigen." });
  } catch (_exception) {
    res.status(500).json({ error: "Er is een onverwachte fout opgetreden." });
  }
});
var newsletter_default = router3;

// server.ts
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
app.set("trust proxy", 1);
app.use(express.json());
var formLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  // Default-handler stuurt plain text, terwijl de frontend altijd response.json() parsed.
  handler: (_req, res) => {
    res.status(429).json({ error: "Te veel aanvragen. Probeer het over een paar minuten opnieuw." });
  }
});
app.use("/api", formLimiter, contact_default);
app.use("/api", formLimiter, leadMagnet_default);
app.use("/api", formLimiter, newsletter_default);
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    const isHttps = req.header("x-forwarded-proto") === "https";
    const host = req.header("host") || "";
    const isOwnDomain = host === "enercalculatie.nl" || host === "www.enercalculatie.nl";
    const canonicalHost = isOwnDomain && !host.startsWith("www.") ? `www.${host}` : host;
    if (!isHttps || host !== canonicalHost) {
      return res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
    }
    next();
  });
  app.use(express.static(path.join(__dirname, "dist")));
  const prerenderedRoutes = {
    "/": "index.html",
    "/privacy": "privacy.html",
    "/nieuwsbrief-bevestigd": "nieuwsbrief-bevestigd.html",
    "/voorwaarden": "voorwaarden.html",
    "/verwerkersovereenkomst": "verwerkersovereenkomst.html",
    "/blog": "blog.html",
    "/blog/salderingsregeling-2027": "blog-salderingsregeling-2027.html",
    "/blog/btw-zonnepanelen": "blog-btw-zonnepanelen.html",
    "/blog/terugleverkosten-thuisbatterij": "blog-terugleverkosten-thuisbatterij.html",
    "/blog/isde-subsidie-warmtepompen": "blog-isde-subsidie-warmtepompen.html",
    "/blog/warmtepomp-rendement-aannames": "blog-warmtepomp-rendement-aannames.html",
    "/rekentool-zonnepanelen": "rekentool-zonnepanelen.html",
    "/rekentool-thuisbatterij": "rekentool-thuisbatterij.html",
    "/rekentool-warmtepomp": "rekentool-warmtepomp.html",
    "/rekentool-airco": "rekentool-airco.html",
    "/rekentool-laadpaal": "rekentool-laadpaal.html"
  };
  const legacyRedirects = {
    "/kennisbank": "/blog",
    "/kennisbank/salderingsregeling-2027": "/blog/salderingsregeling-2027",
    "/kennisbank/btw-zonnepanelen": "/blog/btw-zonnepanelen",
    "/kennisbank/terugleverkosten-thuisbatterij": "/blog/terugleverkosten-thuisbatterij"
  };
  app.get(Object.keys(legacyRedirects), (req, res) => {
    res.redirect(301, legacyRedirects[req.path]);
  });
  app.get("*", (req, res) => {
    const file = prerenderedRoutes[req.path] ?? "404.html";
    const status = prerenderedRoutes[req.path] ? 200 : 404;
    res.status(status).sendFile(path.join(__dirname, "dist", file));
  });
} else {
  app.get("/", (req, res) => {
    res.send("\u2705 EnerCalculatie Backend API draait succesvol! Open http://localhost:3000 in je browser om de website te bekijken.");
  });
}
var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`\u2705 Backend server luistert op http://localhost:${port}`);
});
