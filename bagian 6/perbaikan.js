
const TARIF_PAJAK = 0.11;
const harga = { kopi: 20000, teh: 7500, roti: 15000 };
let keranjang = ["kopi", "teh", "roti", "teh"];
let jumlahMember = "5";

const pelanggan = {
  nama: "rina",
  saldo: 100000,

  // Bayar belanja. Seharusnya saldo tersisa 70000.
  bayar(jumlah) {
    // FIX 1: Gunakan this.saldo agar mengakses saldo milik pelanggan.
    this.saldo -= jumlah;
    return this.saldo;
  },
};

// Subtotal: Seharusnya 50000.
let subtotal = 0;

// FIX 2: Gunakan < agar perulangan berhenti pada indeks terakhir yang valid.
for (let i = 0; i < keranjang.length; i++) {
  // FIX 3: Batas perulangan mencegah harga[undefined] yang membuat subtotal NaN.
  subtotal += harga[keranjang[i]];
}

// Persen diskon: Seharusnya diskon 5000.
let persen;

// FIX 4: Periksa batas subtotal terbesar terlebih dahulu agar diskon 10% tidak terlewat.
if (subtotal >= 50000) {
  persen = 10;
} else if (subtotal >= 25000) {
  persen = 5;
} else {
  persen = 0;
}

let diskon = (subtotal * persen) / 100;

// Promo hari: Seharusnya 3000.
let hari = "jumat";
let promo;

switch (hari) {
  case "jumat":
    promo = 3000;
    // FIX 5: break mencegah kasus Jumat berlanjut ke promo Sabtu/Minggu.
    break;
  case "sabtu":
  case "minggu":
    promo = 5000;
    break;
  default:
    promo = 0;
}

// Pajak 11% dari subtotal - diskon - promo. Seharusnya 4620.
// FIX 6: Hitung seluruh nilai setelah potongan sebelum dikalikan tarif pajak.
let pajak = (subtotal - diskon - promo) * TARIF_PAJAK;

// Total. Seharusnya 46620.
let total = subtotal - diskon - promo + pajak;

// Uang bayar: "100.000" menjadi 100000.
// FIX 7: Hapus titik pemisah ribuan sebelum mengubah teks menjadi angka.
let uangBayarTeks = "100.000";
let uangBayar = Number(uangBayarTeks.replace(/\./g, ""));
let kembalian = uangBayar - total;

// Status. Seharusnya "Lunas".
// FIX 8: Gunakan >= untuk membandingkan uang bayar dengan total, bukan assignment.
let status;
if (uangBayar >= total) {
  status = "Lunas";
} else {
  status = "Kurang";
}

// Nama rapi. Seharusnya "Rina".
// FIX 9: slice(1) mengambil sisa nama tanpa huruf pertama agar tidak menggandakan huruf.
let namaRapi =
  pelanggan.nama.slice(0, 1).toUpperCase() + pelanggan.nama.slice(1);

// Keranjang: hapus "teh" pertama, lalu tambah "air" di akhir.
// FIX 10: splice(1, 1) menghapus satu elemen pada indeks 1 dari array asli.
keranjang.splice(1, 1);

// FIX 11: push menambahkan "air" ke akhir, bukan ke awal.
keranjang.push("air");

// Member bertambah 1. Seharusnya 6.
// FIX 12: Ubah teks "5" menjadi angka sebelum menambahkan 1.
let jumlahMemberBaru = Number(jumlahMember) + 1;

// Rata-rata per item ditambah biaya kemasan 10. Seharusnya 11665.
// FIX 13: toFixed menghasilkan string, jadi ubah kembali ke Number sebelum penjumlahan.
let rataRata = Number((total / 4).toFixed(2));
let rataRataTotal = rataRata + 10;

// Format rupiah. Seharusnya "Rp 53380".
// FIX 14: return diperlukan agar function mengembalikan hasil format.
function formatRupiah(angka) {
  return "Rp " + angka;
}

console.log(subtotal, diskon, promo, pajak, total);
console.log(uangBayar, kembalian, status);
console.log(namaRapi);
console.log(keranjang);
console.log(jumlahMemberBaru);
console.log(rataRataTotal);
console.log(formatRupiah(kembalian));
console.log(pelanggan.bayar(30000));

// FIX 15: Gunakan for...in untuk mengulang properti object harga.
for (let kunci in harga) {
  console.log(kunci + ": " + harga[kunci]);
}

/*
====================
CATATAN BUG
====================

1. Jenis: Error saat program berjalan.
   Penyebab: bayar() menggunakan saldo tanpa this.
   Perbaikan: this.saldo mengakses properti milik pelanggan.

2. Jenis: Tidak error, tetapi hasil salah.
   Penyebab: Kondisi i <= keranjang.length membuat perulangan
   melewati indeks terakhir yang valid.
   Perbaikan: Gunakan i < keranjang.length.

3. Jenis: Tidak error langsung, tetapi hasil salah.
   Penyebab: harga[keranjang[i]] menjadi undefined pada indeks
   yang tidak tersedia. Penjumlahan subtotal pun menghasilkan NaN.
   Perbaikan: Hentikan perulangan sebelum indeks di luar array.

4. Jenis: Tidak error, tetapi hasil salah.
   Penyebab: Kondisi >= 25000 diperiksa lebih dahulu sehingga
   subtotal 50000 mendapat diskon 5%, bukan 10%.
   Perbaikan: Periksa batas 50000 terlebih dahulu.

5. Jenis: Tidak error, tetapi hasil salah.
   Penyebab: Tidak ada break setelah kasus Jumat sehingga
   eksekusi berlanjut ke kasus Sabtu dan promo berubah menjadi 5000.
   Perbaikan: Tambahkan break setelah promo Jumat.

6. Jenis: Tidak error, tetapi hasil salah.
   Penyebab: Perkalian dilakukan hanya pada promo karena
   operator * dikerjakan sebelum pengurangan.
   Perbaikan: Gunakan tanda kurung pada seluruh dasar pajak.

7. Jenis: Tidak error, tetapi hasil salah.
   Penyebab: parseInt("100.000") membaca angka sampai titik
   dan menghasilkan 100.
   Perbaikan: Hilangkan titik pemisah ribuan lalu gunakan Number.

8. Jenis: Tidak error, tetapi hasil salah.
   Penyebab: Operator = memberikan nilai ke variabel, bukan
   membandingkan apakah uang bayar cukup.
   Perbaikan: Gunakan >= untuk membandingkan uangBayar dan total.

9. Jenis: Tidak error, tetapi hasil salah.
   Penyebab: slice(0) mengambil seluruh nama setelah huruf pertama
   sehingga huruf pertama menjadi terduplikasi.
   Perbaikan: Gunakan slice(1).

10. Jenis: Tidak error, tetapi hasil salah.
    Penyebab: slice() hanya mengambil bagian array dan tidak
    menghapus elemen dari array aslinya.
    Perbaikan: Gunakan splice(1, 1).

11. Jenis: Tidak error, tetapi hasil salah.
    Penyebab: unshift() menambahkan elemen di awal array,
    padahal "air" harus berada di akhir.
    Perbaikan: Gunakan push().

12. Jenis: Tidak error, tetapi hasil salah.
    Penyebab: jumlahMember berupa string "5", sehingga "5" + 1
    menghasilkan string "51".
    Perbaikan: Ubah jumlahMember menjadi angka dengan Number().

13. Jenis: Tidak error, tetapi hasil salah.
    Penyebab: toFixed() menghasilkan string. Jika ditambah 10,
    hasilnya dapat berupa penggabungan teks, bukan penjumlahan.
    Perbaikan: Bungkus hasil toFixed() dengan Number().

14. Jenis: Tidak error, tetapi hasil salah.
    Penyebab: Function formatRupiah tidak mengembalikan nilai
    sehingga hasil pemanggilannya adalah undefined.
    Perbaikan: Gunakan return.

15. Jenis: Error saat program berjalan.
    Penyebab: for...of mencoba membaca nilai object harga,
    padahal object biasa tidak dapat langsung diiterasi dengan for...of.
    Perbaikan: Gunakan for...in untuk mengambil nama properti object.

====================
JAWABAN PERTANYAAN
====================

1. Kenapa if (uangBayar = total) tidak menimbulkan error?
   Karena = adalah operator assignment yang sah di dalam kondisi.
   Operator tersebut mengisi uangBayar dengan nilai total.
   Nilai total yaitu 46620 bersifat truthy, sehingga kondisi dianggap
   benar dan status menjadi "Lunas". Setelah baris itu dijalankan,
   uangBayar berubah dari 100000 menjadi 46620.
   Karena itu, operator yang benar untuk memeriksa kecukupan uang
   adalah >=, bukan =.

2. Kenapa parseInt("100.000") menghasilkan 100, bukan 100000?
   Karena parseInt membaca angka dari awal teks sampai menemukan
   karakter yang tidak dapat menjadi bagian bilangan bulat.
   Saat menemukan titik, pembacaan berhenti dan hasilnya 100.
   Untuk teks rupiah dengan titik sebagai pemisah ribuan, titik harus
   dihapus dahulu, misalnya:
   Number("100.000".replace(/\./g, "")) menghasilkan 100000.
*/


// ## Cara menjalankan

// 1. Simpan kode sebagai `perbaikan.js`.
// 2. Buka terminal VS Code di folder tempat file disimpan.
// 3. Jalankan:


// node perbaikan.js


// Hasil console yang diharapkan:


// 50000 5000 3000 4620 46620
// 100000 53380 Lunas
// Rina
// [ 'kopi', 'roti', 'teh', 'air' ]
// 6
// 11665
// Rp 53380
// 70000
// kopi: 20000
// teh: 7500
// roti: 15000


