// Google Apps Script for RSVP form submissions
// Deploy as Web App: Execute as "Me", Access "Anyone"
// Set the deployed URL as VITE_GOOGLE_SCRIPT_URL environment variable

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Pricing: €90.50 per person
  // 0-3: free, 4-9: 50%, 10+: full price
  const PRICE_PER_PERSON = 90.5;

  // Count children by age group for pricing
  const children = data.children || [];
  const children0to3 = children.filter(c => c.ageGroup === '0-3').length;
  const children4to9 = children.filter(c => c.ageGroup === '4-9').length;
  const children10plus = children.filter(c => c.ageGroup === '10+').length;

  // Calculate adults (total guests minus all children)
  const adults = data.guestCount - children.length;

  // Calculate total price
  // Adults + Children 10+: full price | Children 4-9: 50% | Children 0-3: free
  const totalPrice = data.attending === 'yes'
    ? (adults * PRICE_PER_PERSON) +
      (children10plus * PRICE_PER_PERSON) +
      (children4to9 * PRICE_PER_PERSON * 0.5)
    : 0;

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
    adults,                  // Adults count
    totalPrice,              // Total price (€)
    songsFormatted,          // Song requests
    data.dietary || ''       // Dietary restrictions
  ]);

  // Update summary in row 1 (assumes headers in row 1, data starts row 2)
  updateSummary(sheet);

  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function updateSummary(sheet) {
  const summarySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Summary');
  if (!summarySheet) return;

  const dataSheet = sheet;
  const lastRow = dataSheet.getLastRow();
  if (lastRow < 2) return; // No data yet

  // Get all data (skip header row)
  const data = dataSheet.getRange(2, 1, lastRow - 1, 13).getValues();

  // Calculate totals for "yes" responses only
  let totalGuests = 0;
  let totalAdults = 0;
  let totalChildren0to3 = 0;
  let totalChildren4to9 = 0;
  let totalChildren10plus = 0;
  let totalPrice = 0;
  let attendingCount = 0;
  let notAttendingCount = 0;

  data.forEach(row => {
    const attending = row[2]; // Column C
    if (attending === 'yes') {
      attendingCount++;
      totalGuests += row[3] || 0;        // Guest count
      totalChildren0to3 += row[6] || 0;  // Children 0-3
      totalChildren4to9 += row[7] || 0;  // Children 4-9
      totalChildren10plus += row[8] || 0; // Children 10+
      totalAdults += row[9] || 0;         // Adults
      totalPrice += row[10] || 0;         // Price
    } else if (attending === 'no') {
      notAttendingCount++;
    }
  });

  // Write summary
  summarySheet.getRange('A1:B9').setValues([
    ['Metric', 'Value'],
    ['RSVPs Attending', attendingCount],
    ['RSVPs Not Attending', notAttendingCount],
    ['Total Guests', totalGuests],
    ['Adults', totalAdults],
    ['Children 0-3 (free)', totalChildren0to3],
    ['Children 4-9 (50%)', totalChildren4to9],
    ['Children 10+ (full)', totalChildren10plus],
    ['Total Price (€)', totalPrice.toFixed(2)]
  ]);
}
