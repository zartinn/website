const fs = require('fs');
const iconsDir = './src/assets/icons/';
const outputPath = `${iconsDir}index.ts`;

let imports = '';

let iconArray = 'const icons = [\n';

fs.readdirSync(iconsDir).forEach(file => {
  if (file.match(/\.svg$/)) {
    // Convert filename to camelCase for variable name
    const iconName = file.replace('.svg', '').replace(/-([a-z])/g, g => g[1].toUpperCase());

    // Convert camelCase back to regular words for alt text
    const altText = iconName.replace(/([A-Z])/g, ' $1').toLowerCase();

    imports += `import ${iconName} from './${file}';\n`;
    iconArray += `  { img: ${iconName}, alt: "${altText}" },\n`; 
  }
});

iconArray += '];\n\nexport default icons;';

fs.writeFileSync(outputPath, imports + iconArray);