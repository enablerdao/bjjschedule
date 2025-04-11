const fs = require('fs');
const path = require('path');

// Read the existing data
const honoluluDataPath = path.join(__dirname, '../data/honolulu_bjj_data.json');
const honoluluData = JSON.parse(fs.readFileSync(honoluluDataPath, 'utf8'));

// Read the new academies data
const newAcademiesPath = path.join(__dirname, '../data/new_academies/hawaii_additional_academies.json');
const newAcademiesData = JSON.parse(fs.readFileSync(newAcademiesPath, 'utf8'));

// Read the new classes data
const newClassesPath = path.join(__dirname, '../data/new_academies/hawaii_additional_classes.json');
const newClassesData = JSON.parse(fs.readFileSync(newClassesPath, 'utf8'));

// Add the new academies to the existing data
honoluluData.academies = [...honoluluData.academies, ...newAcademiesData.academies];

// Add the new classes to the existing data
honoluluData.classes = [...honoluluData.classes, ...newClassesData.classes];

// Write the updated data back to the file
fs.writeFileSync(honoluluDataPath, JSON.stringify(honoluluData, null, 2), 'utf8');

console.log(`Added ${newAcademiesData.academies.length} new academies and ${newClassesData.classes.length} new classes to the database.`);