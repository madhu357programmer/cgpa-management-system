//home/jinodaya/Desktop/final1/cgpa final/check-files.js
const fs = require('fs');
const path = require('path');

const files = ['mainlogin.html', 'hod.html', 'view-staff.html', 'reset-password.html', 'index.html'];

console.log("Checking files in current directory:");
files.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${file}: ${exists ? '✅ Found' : '❌ NOT FOUND'}`);
  
  if (exists) {
    // Check if the file contains the correct logout link
    const content = fs.readFileSync(file, 'utf8');
    if (file === 'mainlogin.html') {
      // mainlogin.html should not have logout links
    } else {
      const hasCorrectLogout = content.includes('href="#" onclick="logout()"');
      const hasOldLogout = content.includes('mainlogin.html');
      
      if (hasCorrectLogout) {
        console.log(`  ✅ Logout link is correct`);
      } else if (hasOldLogout) {
        console.log(`  ⚠️  Found old logout link to mainlogin.html, should use onclick="logout()"`);
      }
    }
  }
});