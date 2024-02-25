const yargs = require("yargs");
const fs = require("fs");
const validator = require("validator"); // pacakge untuk validator
const chalk = require("chalk"); // package untuk mewarnai tulisan pada terminal

// Menambahkan contact app via terminal menggunakan library yargs
// misal : node app add --name="angger" --email="anggern514@gmail.com" --nohp="085856064117"\

const dataPath = "./data/contacts.json";

const saveContact = (nama, email, nohp) => {
  let contacts = [];
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  if (fileBuffer.trim() === "") {
    contacts = [];
    fs.writeFileSync(dataPath, "[]");
  } else {
    contacts = JSON.parse(fileBuffer);
  }

  // validasi jika nama user jika sudah ada maka tidak boleh ditambahkan
  const duplikasiNama = contacts.some((item) => item.nama === nama);
  if (duplikasiNama) {
    console.log(chalk.red.inverse.bold("Nama yang anda masukkan sudah ada"));
    return false;
  }

  // validasi email menggunakan package validator
  if (email) {
    // email optioanl, cek email ada atau tidak terlebih dahulu
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.bold("Email yang anda masukkan tidak valid")
      );
      return false;
    }
  }

  // validasi no hp menggunakan pacage validator
  if (!validator.isMobilePhone(nohp, "id-ID")) {
    console.log(
      chalk.inverse.bold.red("No handphone yang anda masukkan tidak valid")
    );
    return false;
  }

  const contact = { nama: nama, email, nohp };
  contacts.push(contact);
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
};

yargs.command({
  command: "add", // perintah
  describe: "Add contact", // deskribsi
  builder: {
    name: {
      describe: "Nama contact",
      demandOption: true, // wajib diisi, jika false maka opsional
      type: "string",
    },
    email: {
      describe: "Email contact",
      demandOption: false, //  jika false maka opsional
      type: "string",
    },
    nohp: {
      describe: "no hp contact",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    // Tambahkan ke function wrireFileAsyn agar tersimpan di file contacts.json
    saveContact(argv.name, argv.email, argv.nohp); // sesuai dengan nama builder yg telah dibuat untuk mengambil valuenya
  },
});

yargs.parse();
