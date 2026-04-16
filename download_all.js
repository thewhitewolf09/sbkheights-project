const fs = require('fs');
const https = require('https');

const dataStr = fs.readFileSync('C:/Users/Cograd/.gemini/antigravity/brain/ac17e9ba-1545-440d-90b6-615ed5c7b561/.system_generated/steps/5/output.txt', 'utf8');

// The output.txt had some prefix because of my view_file output format, wait, output.txt was directly from the tool call.
// Let's find the JSON part.
let jsonStart = dataStr.indexOf('{"screens"');
if(jsonStart === -1) {
   console.log("Could not find JSON in output.txt");
   process.exit(1);
}
const jsonEnd = dataStr.lastIndexOf('}') + 1;
const jsonStr = dataStr.substring(jsonStart, jsonEnd);

const data = JSON.parse(jsonStr);

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
         fs.writeFileSync(filename, html);
         resolve(html);
      });
    }).on('error', reject);
  });
}

function htmlToJsx(html) {
    return html
        .replace(/class=/g, "className=")
        .replace(/for=/g, "htmlFor=")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<br>/g, "<br/>")
        .replace(/<img([^>]+?)>/g, (match, p1) => {
             if(p1.endsWith('/') || p1.endsWith('/>')) return match;
             return `<img${p1}/>`;
        })
        .replace(/<input([^>]+?)>/g, (match, p1) => {
             if(p1.endsWith('/') || p1.endsWith('/>')) return match;
             return `<input${p1}/>`;
        });
}

async function processScreens() {
    const pageMap = {
       "About Us - SBK Heights": "src/app/about/page.tsx",
       "Mission & Vision - SBK Heights": "src/app/mission-vision/page.tsx",
       "The Project - SBK Heights": "src/app/project/page.tsx",
       "Gallery - SBK Heights": "src/app/gallery/page.tsx",
       "Contact Us - SBK Heights": "src/app/contact/page.tsx",
       "Our Team - SBK Heights": "src/app/team/page.tsx",
       "Legal - SBK Heights": "src/app/privacy/page.tsx" // Let's use this for both or just privacy
    };

    for (const screen of data.screens) {
       if (pageMap[screen.title]) {
           let url = screen.htmlCode.downloadUrl;
           console.log(`Downloading ${screen.title}...`);
           let html = await download(url, `temp_${screen.title.replace(/ /g, '_')}.html`);
           
           const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/);
           if (mainMatch) {
               let mainContent = htmlToJsx(mainMatch[1]);
               let pageName = screen.title.split(' - ')[0].replace(/ /g, '');
               let pageTsx = `export default function ${pageName}Page() {\n  return (\n    <>\n${mainContent}\n    </>\n  );\n}\n`;
               fs.writeFileSync(pageMap[screen.title], pageTsx);
               console.log(`Saved ${pageMap[screen.title]}`);
           } else {
               console.log(`No <main> tag found in ${screen.title}`);
           }
       }
    }
}

processScreens();
