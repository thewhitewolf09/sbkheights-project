const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn("DNS fallback failed", e);
}

const MONGODB_URI = "mongodb+srv://sumitramprakashnirmal_db_user:Xe6HMEhqnqB1iR5d@sbkheights.trept1x.mongodb.net/?retryWrites=true&w=majority&appName=sbkheights";

const ContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  section: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function deployLegal() {
  try {
    console.log("Connecting to Database 'sbkheights'...");
    await mongoose.connect(MONGODB_URI, { dbName: 'sbkheights' });
    console.log("Connected.");

    const legalData = {
      updated: "April 16, 2026",
      privacy: [
        {
          title: "Introduction to Privacy Governance",
          content: "Welcome to SBK Heights. At Shree BK Infratech LLP, we are committed to providing luxury residential solutions while maintaining the highest standards of digital privacy. This policy outlines our protocols for data collection, usage, and security in compliance with the Information Technology Act, 2000 and the RERA (Real Estate Regulatory Authority) regulations."
        },
        {
          title: "Consent & Information Collection",
          content: "We collect personally identifiable information only when you voluntarily provide it through our enquiry forms, callback requests, or site visit registrations. This includes your Name, Email Address, Contact Number, and specific property preferences. By submitting your details, you explicitly consent to our data processing protocols."
        },
        {
          title: "Strategic Use of Information",
          content: "Your data is used specifically to facilitate your home-buying journey at SBK Heights. This includes coordinating site inspections, providing accurate pricing frameworks, sharing construction milestone updates, and assisting with home loan documentation through our banking partners."
        },
        {
          title: "Digital Security & Encryption",
          content: "All communication between your device and our servers is secured using SSL/TLS encryption. We store your data in firewalled, access-controlled environments to prevent unauthorized structural or digital breaches. We do not sell or trade your data with third-party marketing firms."
        },
        {
          title: "Regulatory Compliance & Disclosure",
          content: "Shree BK Infratech LLP may disclose information if required by the Real Estate Regulatory Authority (RERA) or other legal audits. We retain your information for the duration required to satisfy the project's communication and regulatory requirements under Indian Law."
        },
        {
          title: "Your Rights & Administrative Desk",
          content: "You Maintain the right to access, update, or request the deletion of your personal records from our database. To withdraw your communication consent or for any legal queries, please reach out to our legal desk at shreebkinfratech@gmail.com."
        }
      ],
      terms: [
        {
          title: "Acceptance of Framework",
          content: "Engagement with the SBK Heights website implies absolute acceptance of these terms. These frameworks govern the usage of all digital assets, floor plans, and project representations provided by Shree BK Infratech LLP."
        },
        {
          title: "Project Visualizations & Disclaimers",
          content: "All 3D renderings, artistic impressions, and floor plan layouts are for conceptual visualization only. Final project dimensions, structural specifications, and amenities are subject to change as per the developer's discretion and the final sanctioned plans by the authorities/RERA. The Agreement for Sale shall be the final document governing the purchase."
        },
        {
          title: "Communication & Callback Consent",
          content: "By expressing interest in SBK Heights, you consent to receive direct project updates, pricing details, and promotional materials via Phone, SMS, and WhatsApp from our authorized representatives, notwithstanding any DND registrations."
        },
        {
          title: "Intellectual Property Ownership",
          content: "All architectural designs, structural models, logos, and digital branding associated with SBK Heights are the exclusive intellectual property of Shree BK Infratech LLP. High-fidelity reproduction or commercial harvesting of these assets is strictly prohibited."
        },
        {
          title: "Liability & Governance",
          content: "Shree BK Infratech LLP is not liable for any discrepancies arising from subjective interpretations of conceptual renderings or technical data fluctuations. Our liability is limited to the terms specifically mentioned in the project's legal allotment documents."
        },
        {
          title: "Jurisdictional Compliance",
          content: "These terms and all structural engagements are governed by the laws of India. Any and all disputes arising from these frameworks shall be subject to the exclusive jurisdiction of the courts located in Gautam Buddh Nagar, Noida, Uttar Pradesh."
        }
      ]
    };

    console.log("Seeding CMS record { page: 'legal', section: 'all' }...");
    const result = await Content.findOneAndUpdate(
      { page: 'legal', section: 'all' },
      { content: legalData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (result) {
      console.log("Success: Legal documentation suite deployed.");
      console.log("- Privacy Sections:", result.content.privacy.length);
      console.log("- Terms Sections:", result.content.terms.length);
    } else {
      console.error("Failure: Could not update record.");
    }

    process.exit(0);
  } catch (err) {
    console.error("Fatal Error during deployment:", err);
    process.exit(1);
  }
}

deployLegal();
