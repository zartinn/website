const fs = require('fs');
const iconsDir = './src/assets/icons/';
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
    // Strip numerical prefix and hyphen from filename
    const cleanName = file.replace(/^\d+-/, '');
    
    // Convert filename to camelCase for variable name
    const iconName = cleanName.replace('.svg', '').replace(/-([a-z])/g, g => g[1].toUpperCase());

    // Convert camelCase back to regular words for alt text
    const altText = iconName.replace(/([A-Z])/g, ' $1').toLowerCase();

    imports += `import ${iconName} from './${file}';\n`;
    iconArray += `  { img: ${iconName}, alt: "${altText}" },\n`; 
  }
});

iconArray += '];\n\nexport default icons;';

fs.writeFileSync(outputPath, imports + iconArray);