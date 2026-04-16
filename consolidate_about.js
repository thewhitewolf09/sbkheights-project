const fs = require('fs');

const aboutPath = 'src/app/about/page.tsx';
const missionPath = 'src/app/mission-vision/page.tsx';
const teamPath = 'src/app/team/page.tsx';

let aboutContent = fs.readFileSync(aboutPath, 'utf8');
const missionContent = fs.readFileSync(missionPath, 'utf8');
const teamContent = fs.readFileSync(teamPath, 'utf8');

// Extract all sections inside the fragments
function extractSections(content) {
    const startIdx = content.indexOf('<section');
    const endMatch = content.match(/<\/section>\s*<\/>/);
    if (startIdx !== -1 && endMatch) {
        return content.substring(startIdx, endMatch.index + 9);
    }
    return '';
}

const missionSections = extractSections(missionContent);
const teamSections = extractSections(teamContent);

// We want to insert missionSections and teamSections before the final closing fragment `</>` in aboutPage
if(missionSections && teamSections) {
   let modifiedAbout = aboutContent.replace(/<\/section>\s*<\/>/, `</section>\n\n  {/* Mission & Vision Sections */}\n${missionSections}\n\n  {/* Team Sections */}\n${teamSections}\n\n  </>`);
   fs.writeFileSync(aboutPath, modifiedAbout);
   console.log('Successfully consolidated into about page.');
} else {
   console.log('Failed to extract sections.');
}
