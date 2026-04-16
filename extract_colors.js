const fs = require('fs');

const html = fs.readFileSync('stitch_home.html', 'utf8');
const match = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*</);
if (match) {
    let jsonStr = match[1].replace(/'/g, '"').replace(/([a-zA-Z0-9_-]+)\s*:/g, '"$1":').replace(/",\s*\}/g, '"}');
    // It's not valid JSON strictly because of JS syntax, let's just parse it using eval
    const config = eval('(' + match[1] + ')');
    const colors = config.theme.extend.colors;
    
    let cssVars = `@import "tailwindcss";\n\n@theme inline {\n`;
    for (const [key, value] of Object.entries(colors)) {
        cssVars += `  --color-${key}: ${value};\n`;
    }
    cssVars += `  --font-headline: "Noto Serif", serif;\n`;
    cssVars += `  --font-body: "Manrope", sans-serif;\n`;
    cssVars += `  --font-label: "Manrope", sans-serif;\n`;
    cssVars += `}\n\n`;
    cssVars += `body {\n  background-color: var(--color-background);\n  color: var(--color-on-background);\n  font-family: var(--font-body);\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n`;
    cssVars += `h1, h2, h3, h4, h5, h6 {\n  font-family: var(--font-headline);\n}\n`;

    fs.writeFileSync('src/app/globals.css', cssVars);
    console.log("Updated globals.css with exact Stitch colors and fonts.");
} else {
    console.log("Could not find tailwind config in HTML.");
}
