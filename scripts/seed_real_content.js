const mongoose = require('mongoose');
require('dotenv').config();

const ContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  section: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
});
ContentSchema.index({ page: 1, section: 1 }, { unique: true });

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

const REAL_CONTENT = [
  {
    page: 'home',
    section: 'all',
    content: {
      hero: {
        badge: "SBK Heights",
        title: "Elevating \nLifestyle",
        subtitle: "Experience a perfect harmony of comfort and architecture. Discover a residential sanctuary designed for those who value quality and community.",
        primaryBtn: "Enquire Now",
        secondaryBtn: "View Project"
      },
      vision: {
        title: "A New Standard of Living",
        about_text: "SBK Heights is a premier residential development designed to offer a blend of modern architectural elegance and everyday functionality.",
        mission_text: "At SBK Heights, we don't just build homes; we curate an elevated lifestyle defined by comfort, security, and proximity to the city's best amenities.",
        quote: "Quality craftsmanship meets timeless architectural design."
      },
      cta: {
        title: "Find Your Dream Home",
        stats: [
          { val: "1/2/3", label: "BHK Units" },
          { val: "24/7", label: "Security" },
          { val: "Gym", label: "Facility" },
          { val: "Garden", label: "Terrace" }
        ]
      }
    }
  },
  {
    page: 'why-choose-us',
    section: 'pillars',
    content: {
      title: "Why SBK Heights",
      subtitle: "Experience a standard of living defined by structural mastery and uncompromised quality.",
      pillars: [
        { title: "Terrace Garden", icon: "park", desc: "A beautifully landscaped retreat on the rooftop, perfect for serene evening walks and community gatherings." },
        { title: "Modern Gym", icon: "fitness_center", desc: "Equipped with state-of-the-art machinery to ensure your wellness journey is never interrupted." },
        { title: "24x7 Security", icon: "security", desc: "Round-the-clock surveillance and professional security personnel protecting your family and peace of mind." },
        { title: "On-Site Stores", icon: "shopping_basket", desc: "Convenient access to daily essentials right within the complex for a truly seamless living experience." }
      ]
    }
  },
  {
    page: 'project',
    section: 'main',
    content: {
      hero: {
        badge: "The Residency",
        title: "SBK Heights \nResidential Suites",
        stats: [
          { label: "Status", val: "Booking Open" },
          { label: "Location", val: "Sector 45, Noida" },
          { label: "Project Type", val: "Luxury Apartments" }
        ]
      },
      units: [
        { 
          type: "3 BHK Floor Plan", 
          area: "1500 sq. ft.", interior: "1500 sq. ft.", beds: "1500 sq. ft.", baths: "1500 sq. ft.", pool: "1500 sq. ft.", additionals: "1500 sq. ft.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAETZiaHLWhJS-Z1O3U2kshGHJ60e-rKO3PuI8mgP9wv19yFa30dhhAWXWGXjONMwUFcjIRwblrJ60OFHwmPPYi__JTA7rTLrrydAqoHiKq2KhnedOumMc-aY7RUYl7RhreY52ACKEv7u7VsO9HseiiHT6qHy7CEVjKMmgg52Wmydmw7dMqL-MNQAFfdqA46-i2hJXT_KE2TJUgQyzD0JXIFw4p89vitsY0h_8c_xtZshL5_ynsBrnp_ObZ4TzX1Nwqz6t_iPU0Mhg"
        },
        { 
          type: "2 BHK Floor Plan", 
          area: "1500 sq. ft.", interior: "1500 sq. ft.", beds: "1500 sq. ft.", baths: "1500 sq. ft.", pool: "1500 sq. ft.", additionals: "1500 sq. ft.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0bqtR812tRLTypFwU69RHC9oX3Kk1jhAuPbl1cCYFtXpA1OSKxfyzGxfnTZMqw8hhtgRGIBAxhyJpn32Gy1ptNq28-G3prjCp3siEvkh2neYMRiiBVxmskJ2OHXHiIcuUEmY6qG43E-d9gUIxsZyTQSEZowBW1LkBkw-MXyJVtVMYBUn0ws1VABBlKLz7FK36kztGEDXB6Szv4qaLRlcyZhVh6jSUD4xRvqQMcNF5Zba4mHF1Tw-lsnWL3kDA-bLwQmF-yEOTF48"
        },
        { 
          type: "1 BHK Floor Plan", 
          area: "1500 sq. ft.", interior: "1500 sq. ft.", beds: "1500 sq. ft.", baths: "1500 sq. ft.", pool: "1500 sq. ft.", additionals: "1500 sq. ft.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0H-gc35SJOz6JTTIr4S42dxYyqWYwacdyQ7lhNfIG6UdMs1eFJGzqmH8lfp397jliXZskQdgBZJrnp3M7cyLNt0pp40y1Xr4zaceW28rgMyRj8n5P1W_6iUgcxg25NwoYY9lyPzDmESKaxVHZOFvIRdLbrwYDLItge74Y_ndF3TstZtZXAgrWtfJqzdZLj7u4vLWZiBj1DyvqiVZbWSvr_odmFWNvQK6lxHJ5m54oJPRCaeqJvvsAW_agBt8CYcuCIPdrevRbe6s"
        }
      ],
      facilities: [
        { name: "Terrace Garden", icon: "park", desc: "Serene green escape with panoramic city views." },
        { name: "Modern Gym", icon: "fitness_center", desc: "Fully equipped wellness studio for residents." },
        { name: "24x7 Security", icon: "security", desc: "Advanced surveillance and on-site guards." },
        { name: "Retail Stores", icon: "shopping_basket", desc: "Daily essentials available within the perimeter." }
      ],
      partners: [
        "Piramal Finance", "Aadhar Housing Finance Ltd", "PNB Housing Finance Limited", "ICICI Home Finance", "GIC Housing Finance Ltd"
      ]
    }
  },
  {
    page: 'about',
    section: 'all',
    content: {
      hero: {
        badge: "The Vertical Monolith",
        title: "Architectural Authority Since 1994.",
      },
      intro: {
        title: "Redefining the Sky’s Limit.",
        paragraph1: "SBK Heights is more than a developer; we are the curators of the modern skyline. Founded on the principle of structural permanence and aesthetic purity, our firm has spent three decades crafting environments that command respect and offer unrivaled luxury.",
        paragraph2: "Our philosophy centers on \"The Vertical Monolith\"—the belief that a building should be a singular, powerful statement of intent. We reject the generic in favor of the monumental.",
      },
      mission: "To architecturally inspire modern urbanity by delivering sustainable, ultra-luxury residential ecosystems that prioritize wellness, security, and unparalleled aesthetic precision. We aim to elevate the standard of living through innovation and uncompromising quality.",
      vision: "To be the global gold standard in vertical luxury development, where our name is synonymous with the future of urban living. We envision a world where architecture and nature coexist in a seamless, elevated harmony of glass, steel, and light.",
      values: [
        { title: "Integrity", icon: "verified", text: "Transparent operations and ethical construction practices are the bedrock of our reputation." },
        { title: "Excellence", icon: "diamond", text: "From the master plan to the final fixture, we pursue a standard that transcends the ordinary." },
        { title: "Innovation", icon: "lightbulb", text: "Integrating cutting-edge smart home technology and engineering feats into every floor." },
        { title: "Sustainability", icon: "eco", text: "Building for tomorrow with eco-conscious materials and energy-efficient vertical landscapes." }
      ],
      legacy: [
        { val: "30+", label: "Years of Legacy", desc: "A history rooted in engineering excellence and uncompromising quality." },
        { val: "12M", label: "Sq Ft Delivered", desc: "Transforming urban landscapes with high-density, high-luxury vertical living." }
      ],
      principles: [
        { title: "Engineering First", text: "Before the first stone is laid, thousands of hours are dedicated to structural analysis. We build for the next century, not just the next decade." },
        { title: "The Editorial Aesthetic", text: "Every SBK project is designed to be visually timeless. We utilize raw materials—glass, steel, and stone—to create an editorial presence in every city." },
        { title: "Global Standards", text: "From London to Dubai, our consultants represent the peak of global architectural talent, ensuring each Heights project is world-class." }
      ]
    }
  },
  {
    page: 'contact',
    section: 'main',
    content: {
      header: { badge: "Visit Our Site", title: "Find Your Dream \nHouse Today." },
      details: { 
        address: "Khasra No. 68, Opposite Sustain Yellow,\nBehind Canara Bank, Sadarpur,\nSector - 45, Noida 201301", 
        phone: "+91 954845754", 
        email: "Ayushbarrr1506@gmail.com" 
      },
      proximity: [
        { cat: "Metro Connectivity", items: [{ n: "Botanical Garden", d: "3.2 Km" }, { n: "Golf Course", d: "2.8 Km" }] },
        { cat: "Malls & Markets", items: [{ n: "R Cube Mall", d: "800 m" }, { n: "Atta Market", d: "5 Km" }, { n: "DLF Mall of India", d: "5.9 Km" }] },
        { cat: "Essential Services", items: [{ n: "Neo Hospital", d: "3.7 Km" }, { n: "Jagran Public School", d: "1.5 Km" }] },
        { cat: "Global Connectivity", items: [{ n: "IGI Airport", d: "25 Km (1 hr)" }, { n: "Greater Noida Exp.", d: "4 Km" }, { n: "Dadri Surajpur", d: "1 Km" }] }
      ]
    }
  }
];

async function runSeed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined");

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, { dbName: 'sbkheights' });
    console.log("Connected.");

    for (const item of REAL_CONTENT) {
      console.log(`Upserting ${item.page}:${item.section}...`);
      await Content.updateOne(
        { page: item.page, section: item.section },
        { $set: item },
        { upsert: true }
      );
    }

    console.log("Content Seeding Successful.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runSeed();
