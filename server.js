// server.ts
import "dotenv/config";
import express from "express";

// contact.ts
import { Router } from "express";
import { Resend } from "resend";
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
        <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Bedrijf:</strong> ${company || "Niet opgegeven"}</p>
        <hr>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });
    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (exception) {
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
    const { data, error } = await resend2.emails.send({
      to: ["info@enercalculatie.nl"],
      from: "EnerCalculatie Website <website@enercalculatie.nl>",
      subject: "Nieuwe aanmelding ROI-gids",
      replyTo: email,
      html: `
        <h1>Nieuwe aanmelding ROI-gids voor installateurs</h1>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
      `
    });
    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (exception) {
    res.status(500).json({ error: "Er is een onverwachte fout opgetreden." });
  }
});
var leadMagnet_default = router2;

// server.ts
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
app.use(express.json());
app.use("/api", contact_default);
app.use("/api", leadMagnet_default);
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    const isHttps = req.header("x-forwarded-proto") === "https";
    const host = req.header("host") || "";
    const canonicalHost = host.replace(/^www\./, "");
    if (!isHttps || host !== canonicalHost) {
      return res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
    }
    next();
  });
  app.use(express.static(path.join(__dirname, "dist")));
  const prerenderedRoutes = {
    "/": "index.html",
    "/privacy": "privacy.html",
    "/voorwaarden": "voorwaarden.html",
    "/verwerkersovereenkomst": "verwerkersovereenkomst.html",
    "/kennisbank": "kennisbank.html",
    "/kennisbank/salderingsregeling-2027": "kennisbank-salderingsregeling-2027.html"
  };
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
