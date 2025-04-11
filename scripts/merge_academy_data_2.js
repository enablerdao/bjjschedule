const fs = require('fs');
const path = require('path');

// ファイルパスを設定
const originalDataPath = path.join(__dirname, '../data/honolulu_bjj_data.json');
const additionalDataPath = path.join(__dirname, '../data/additional_honolulu_academies_2.json');
const outputPath = path.join(__dirname, '../data/honolulu_bjj_data_merged_2.json');

// データを読み込む
const originalData = JSON.parse(fs.readFileSync(originalDataPath, 'utf8'));
const additionalData = JSON.parse(fs.readFileSync(additionalDataPath, 'utf8'));

// データをマージする
const mergedData = {
  academies: [...originalData.academies, ...additionalData.academies],
  classes: [...originalData.classes, ...additionalData.classes]
};

// マージしたデータを保存する
fs.writeFileSync(outputPath, JSON.stringify(mergedData, null, 2));

// 結果を表示
console.log(`データをマージしました。アカデミー数: ${mergedData.academies.length}, クラス数: ${mergedData.classes.length}`);