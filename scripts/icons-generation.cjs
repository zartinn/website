const fs = require('fs');
const iconsDir = './src/assets/icons/technologies/';
const outputPath = `${iconsDir}index.ts`;

let imports = '';

let iconArray = 'const icons = [\n';

// Sort files based on numerical prefix
const sortedFiles = fs.readdirSync(iconsDir).sort((a, b) => {
  const numA = parseInt(a.split('-')[0], 10);
  const numB = parseInt(b.split('-')[0], 10);
  return numA - numB;
});

sortedFiles.forEach(file => {
  if (file.match(/\.svg$/)) {
    // Strip off 'icon-' prefix and '.svg' extension
    const cleanName = file.replace(/^\d+-icon-/, '').replace('.svg', '');
    
    // Convert filename to camelCase for variable name
    const iconName = cleanName.replace(/-([a-z])/g, g => g[1].toUpperCase());

    // Generate readable text for the icon
    const readableText = cleanName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Generate alt text with 'icon' word included
    const altText = `${readableText} Icon`;
    
    imports += `import ${iconName} from './${file}';\n`;
    iconArray += `  { img: ${iconName}, alt: "${altText}", text: "${readableText}" },\n`; 
  }
});

iconArray += '];\n\nexport default icons;';

fs.writeFileSync(outputPath, imports + iconArray);