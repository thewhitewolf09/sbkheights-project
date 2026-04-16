const mongoose = require('mongoose');
const dns = require('dns');

// Force Node to use reliable DNS for SRV lookups
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn("Could not set custom DNS servers", e);
}

const MONGODB_URI = "mongodb+srv://sumitramprakashnirmal_db_user:Xe6HMEhqnqB1iR5d@sbkheights.trept1x.mongodb.net/sbkheights?retryWrites=true&w=majority&appName=sbkheights";

const ContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  section: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function seed() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    const legalContent = {
      updated: "April 16, 2026",
      privacy: [
        { 
          title: "I. Privacy Governance & Protcol", 
          content: "At SBK Heights, developed by Shree BK Infratech LLP, we respect your architectural and digital privacy. This policy outlines how we curate, utilize, and protect your personal data in accordance with Indian Data Protection laws and the Real Estate (Regulation and Development) Act, 2016." 
        },
        { 
          title: "II. Information Collection Framework", 
          content: "We collect different categories of personal information to provide a luxury property experience:\n\n• Identity Data: Full name, maiden name, username, marital status, and gender.\n• Contact Data: Billing address, permanent residence details, email address, and telephone numbers.\n• Financial Data: Bank account details and payment identifiers relevant to property bookings and luxury real estate transactions.\n• Interaction Data: Details provided via enquiry forms, callback requests, and site visit logs." 
        },
        { 
          title: "III. Strategic Utilization of Data", 
          content: "We implement your data primarily for:\n\n• Performance of Contract: Processing transactions and managing property possession details.\n• Legitimate Interest: Optimizing our digital interfaces and providing personalized architectural updates.\n• Communication: Scheduling site visits, providing pricing details, and coordinating with financial partners for home loans." 
        },
        { 
          title: "IV. Data Encryption & Security", 
          content: "Our digital infrastructure uses high-fidelity encryption (SSL/TLS) to secure your communications. We implement strict organizational measures to prevent unauthorized access or structural data breaches. Your transaction details are stored in secured, firewalled environments." 
        },
        { 
          title: "V. Disclosure of Information", 
          content: "We do not sell your personal data. Disclosure is limited to trusted partners (architects, financial institutions, RERA authorities) required to facilitate your home-buying journey, or when demanded by structural or legal audits under Indian Law." 
        },
        { 
          title: "VI. User Sovereignty & Rights", 
          content: "You have the right to access, rectify, or request the deletion of your personal records. For any governance queries or to withdraw communication consent, contact our legal desk at shreebkinfratech@gmail.com." 
        }
      ],
      terms: [
        { 
          title: "I. Acceptance of Service Framework", 
          content: "By accessing the SBK Heights digital platform, you acknowledge and agree to be bound by these governance frameworks. These terms govern your interaction with both our digital interface and our physical project representations." 
        },
        { 
          title: "II. Intellectual Property Rights", 
          content: "Unless otherwise stated, Shree BK Infratech LLP and its licensors own the intellectual property for all architectural renderings, structural concepts, and digital material on this website. All rights are reserved for personal, non-commercial use only. Unauthorized digital harvesting is strictly prohibited." 
        },
        { 
          title: "III. Architectural Disclaimer (RERA)", 
          content: "The vertical monolith and all aesthetic renderings displayed herein are artistic conceptualizations intended for visualization purposes only. Final structural execution, dimensions, amenities, and project specifics are subject to the sanctioned plans and RERA (Real Estate Regulatory Authority) protocols. Final sale transitions are governed solely by the signed Agreement for Sale." 
        },
        { 
          title: "IV. Communication & Lead Consent", 
          content: "Submitting an enquiry constitutes your explicit consent to receive direct project communications (Phone, SMS, Email, WhatsApp) from our representatives. This interaction protocol is essential for providing accurate pricing and construction updates." 
        },
        { 
          title: "V. Limitation of Liability", 
          content: "Shree BK Infratech LLP, its directors, and officers shall not be held liable for discrepancies arising from subjective interpretations of artistic renders or technical fluctuations in digital data. We strive for absolute accuracy, but conceptual renders are not contractual guarantees." 
        },
        { 
          title: "VI. Governing Jurisdiction", 
          content: "These terms are governed by the laws of India. Any legal disputes or structural challenges arising from these frameworks shall be subject to the exclusive jurisdiction of the courts located in Gautam Buddh Nagar, Noida, Uttar Pradesh." 
        }
      ]
    };

    console.log("Updating Comprehensive CMS Legal Suite...");
    await Content.findOneAndUpdate(
      { page: 'legal', section: 'all' },
      { content: legalContent },
      { upsert: true, new: true }
    );

    console.log("Ultimate Legal documentation deployed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
