const yargs = require("yargs");
const fs = require("fs");
const validator = require("validator"); // pacakge untuk validator
const chalk = require("chalk"); // package untuk mewarnai tulisan pada terminal

const { alertSucces, alertError, alertWarning } = require("./libs/alert");
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
    alertWarning("Nama yang anda masukkan sudah ada");
    return false;
  }

  // validasi email menggunakan package validator
  if (email) {
    // email optioanl, cek email ada atau tidak terlebih dahulu
    if (!validator.isEmail(email)) {
      alertError("Email yang anda masukkan tidak valid");

      return false;
    }
  }

  // validasi no hp menggunakan pacage validator
  if (!validator.isMobilePhone(nohp, "id-ID")) {
    alertError("No handphone yang anda masukkan tidak valid");

    return false;
  }

  const contact = { nama: nama, email, nohp };
  contacts.push(contact);
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  alertSucces("contact berhasil ditambahkan");
};

const getContact = () => {
  let contacts = [];
  const getContactFromFileContact = fs.readFileSync(dataPath, "utf-8");

  // cek apakah isi file getContactFromFileContact kosong
  if (getContactFromFileContact.trim() === "") {
    contacts = [];
  } else {
    contacts = JSON.parse(getContactFromFileContact);
  }

  return contacts;
};

const showAllContact = () => {
  const data = getContact();
  if (data.length > 0) {
    data.map((item, index) => {
      alertSucces(` ${index + 1}. nama: ${item.nama}`);
    });
  } else {
    alertWarning("Contact kosong");
  }
};
const detailContact = (name) => {
  const data = getContact();
  if (data.length > 0) {
    const detail = data.find(
      (item) => item.nama.toLowerCase() === name.toLowerCase()
    );
    if (detail) {
      alertSucces(`nama: ${detail.nama} `);
      alertSucces(`nohp: ${detail.nohp} `);
      if (detail.email) {
        alertSucces(`email: ${detail.email} `);
      }
    } else {
      alertWarning(`${name} tidak ada dalam list contact`);
    }
  }
};
const deleteContact = (name) => {
  const data = getContact();
  if (data.length > 0) {
    const contact = data.filter((item) => item.nama !== name);

    // Validasi apakah hasil filter ada atau tidak
    // Mengunakan kondisi length data dan length contact jika sama maka artinya data filter by nama tidak ditemukan
    if (data.length === contact.length) {
      // maka timpa isi file dengan hasil filter
      // console.log("nama tidak ada yang sama ");
      fs.writeFileSync(dataPath, JSON.stringify(data));
      alertWarning("Nama tidak ada dalam list contact");
    } else {
      // console.log("nama ada yang sama");
      fs.writeFileSync(dataPath, JSON.stringify(contact));
      alertSucces(`Nama ${name} berhasil dihapus dari list contact`);
    }
  }
};
// Command add contact
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

// Command show all contact
yargs.command({
  command: "list",
  describe: "Show all contact",
  // fungsi handler akan dijalankan jika perintah list dipanggil/ditrigger
  handler: () => {
    showAllContact();
  },
});

// Command show detaill contact
yargs.command({
  command: "detail",
  describe: "show detail contact berdasarkan nama",
  builder: {
    name: {
      demandOption: true,
      describe: "Delete contact",
      type: "string",
    },
  },
  handler: (argv) => {
    detailContact(argv.name);
  },
});

// Command delete items contact
yargs.command({
  command: "delete",
  describe: "Delete item contact berdasarkan nama",
  builder: {
    name: {
      demandOption: true,
      describe: "Hapus contact",
      type: "string",
    },
  },
  handler: (argv) => {
    deleteContact(argv.name);
  },
});
yargs.parse();
