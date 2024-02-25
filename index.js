const { createQuestion, saveContact } = require("./contacts.js");

const main = async () => {
  const nama = await createQuestion("Masukkan nama : ");
  const email = await createQuestion("Masukkan email : ");
  saveContact(nama, email);
};

main();

// Menggunakan callback (ada masalah jika callbnyak nya banyak yaitu callback hell)
// rl.question("Masukkan nama : ", (nama) => {
//     // Mengambil data contacts yang sudah ada

//     const fileBuffer = fs.readFileSync("data/contacts.json"); //  readFileSync membaca isi file data/contact.json secara synchronous . jika file tidak ada maka otomatis akan dibuatkan
//     const contacts = JSON.parse(fileBuffer); //  ubah string json ke object, karena isi dari file contacts.josn adalah string json

//     //   Menambahkan data contacs baru
//     const contact = { nama }; // contact =  {nama: nama}
//     contacts.push(contact); // push dengan method array
//     fs.writeFileSync(dataPath, JSON.stringify(contacts)); // masukkan data contact baru dengan writeFileSync dan mengubah string object ke string json

//     rl.close(); // menutup/keluar dari terminal
//   });
