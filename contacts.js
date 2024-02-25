// urutan pengimporan yang baik adalah core module,local module,thirdparty module/node_modules

const fs = require("fs"); // fs merupakan salah satu core module yang dilimiki oleh node js yang berfungsi untuk membaca atau membuat file.
const readline = require("readline"); // readline adalah salah satu core module/module bawaan dari node js yang digunakan untuk membaca atau menyimpan inputan dari terminal

// membuat interface input dan output dari module readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// membuat folder jika belum ada
const dirPath = "./data";
// menggunakan module fs.existsSync untuk cek apakah sudah ada folder
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath); // jika belum ada maka buatkan foldernya menggunakan fs.mkdir secara synchronous
}

// Membuat file jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8"); // jika file belum ada maka buat file dengan nilai awal array kosong dan yang disimpan adalah string(utf-8)
}

// Membuat promise agar question bisa dijalankan dengan async await
const createQuestion = (question) => {
  return new Promise((resolve, rejects) => {
    try {
      rl.question(question, (data) => {
        // hasil dari inputan dapat diambil valuenya dengan callback di parameter kedua dari question module readline
        resolve(data);
      });
    } catch (error) {
      rejects(error.message);
    }
  });
};

const saveContact = (nama, email) => {
  let contacts = [];
  // Mengambil data contacts yang sudah ada pada file
  const fileBuffer = fs.readFileSync(dataPath, "utf-8"); //  readFileSync membaca isi file data/contact.json secara synchronous . jika file tidak ada maka otomatis akan dibuatkan

  // Cek apakah ada isinya didalam file contacst.json menggunakan method trim() yang akan mengecek apakah ada string kosong
  if (fileBuffer.trim() === "") {
    contacts = [];
    fs.writeFileSync(dataPath, "[]");
  } else {
    contacts = JSON.parse(fileBuffer); //  ubah string json ke object, karena isi dari file contacts.josn adalah string json
  }
  // Menambahkan data contacs baru
  const contact = { nama: nama, email }; // contact =  {nama: nama}
  contacts.push(contact); // push dengan method array
  fs.writeFileSync(dataPath, JSON.stringify(contacts)); // masukkan data contact baru dengan writeFileSync dan mengubah string object ke string json

  rl.close(); // menutup/keluar dari terminal
};

module.exports = { createQuestion, saveContact };
