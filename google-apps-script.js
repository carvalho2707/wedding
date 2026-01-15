// Google Apps Script for RSVP form submissions
// Deploy as Web App: Execute as "Me", Access "Anyone"
// Set the deployed URL as VITE_GOOGLE_SCRIPT_URL environment variable

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Count children by age group for pricing
  // 0-3: free, 4-9: 50%, 10+: full price
  const children = data.children || [];
  const children0to3 = children.filter(c => c.ageGroup === '0-3').length;
  const children4to9 = children.filter(c => c.ageGroup === '4-9').length;
  const children10plus = children.filter(c => c.ageGroup === '10+').length;

  // Format children as "Name (0-3), Name (4-9), ..."
  const childrenFormatted = children.length > 0
    ? children.map(c => `${c.name} (${c.ageGroup})`).join(', ')
    : '';

  // Format songs as comma-separated list
  const songsFormatted = data.songs && data.songs.length > 0
    ? data.songs.join(', ')
    : '';

  sheet.appendRow([
    new Date(),              // Timestamp
    data.name,               // Main guest name
    data.attending,          // Yes/No
    data.guestCount,         // Total guest count
    data.partner || '',      // Partner name
    childrenFormatted,       // Children (Name + Age group)
    children0to3,            // Children 0-3 (free)
    children4to9,            // Children 4-9 (50%)
    children10plus,          // Children 10+ (full price)
    songsFormatted,          // Song requests
    data.dietary || ''       // Dietary restrictions
  ]);

  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
