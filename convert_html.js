const fs = require('fs');

function htmlToJsx(html) {
    return html
        .replace(/class=/g, "className=")
        .replace(/for=/g, "htmlFor=")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<br>/g, "<br/>")
        .replace(/<img([^>]+?)>/g, (match, p1) => {
             if(p1.endsWith('/')) return match;
             return `<img${p1}/>`;
        })
        .replace(/<input([^>]+?)>/g, (match, p1) => {
             if(p1.endsWith('/')) return match;
             return `<input${p1}/>`;
        });
}

const html = fs.readFileSync('stitch_home.html', 'utf8');

const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/);
if (mainMatch) {
    let mainContent = htmlToJsx(mainMatch[1]);
    let pageTsx = `export default function Home() {\n  return (\n    <>\n${mainContent}\n    </>\n  );\n}\n`;
    fs.writeFileSync('src/app/page.tsx', pageTsx);
    console.log('Saved page.tsx');
}

const navMatch = html.match(/<nav[\s\S]*?>([\s\S]*?)<\/nav>/);
if (navMatch) {
    let navContent = htmlToJsx(navMatch[0]); // include the nav tags
    navContent = navContent.replace('href="#"', 'href="/"');
    let navTsx = `"use client";\nimport Link from "next/link";\n\nexport default function Navbar() {\n  return (\n${navContent}\n  );\n}\n`;
    fs.writeFileSync('src/components/layout/Navbar.tsx', navTsx);
    console.log('Saved Navbar.tsx');
}

const footerMatch = html.match(/<footer[\s\S]*?>([\s\S]*?)<\/footer>/);
if (footerMatch) {
    let footerContent = htmlToJsx(footerMatch[0]);
    let footerTsx = `import Link from "next/link";\n\nexport default function Footer() {\n  return (\n${footerContent}\n  );\n}\n`;
    fs.writeFileSync('src/components/layout/Footer.tsx', footerTsx);
    console.log('Saved Footer.tsx');
}
