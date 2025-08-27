const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx and .ts files
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Fix version-specific imports
  const versionRegex = /@([^"']+)@[\d\.]+"$/gm;
  const fixedContent = content.replace(/from\s+["']([^"']+)@[\d\.]+["']/g, (match, packageName) => {
    changed = true;
    return `from "${packageName}"`;
  });
  
  if (changed) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed imports in: ${filePath}`);
  }
}

// Main execution
const componentsDir = path.join(__dirname, 'components');
if (fs.existsSync(componentsDir)) {
  const tsxFiles = findTsxFiles(componentsDir);
  
  console.log(`Found ${tsxFiles.length} TypeScript files`);
  
  tsxFiles.forEach(filePath => {
    fixImportsInFile(filePath);
  });
  
  console.log('Import fixing completed!');
} else {
  console.log('Components directory not found');
}