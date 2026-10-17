//potongan A
// Tebakan: 8
console.log("  Hai Kawan  ".trim().length);
// Hasil asli: 9

// Tebakan: KOPI
console.log("Kopi Susu".toUpperCase().slice(0, 4));
// Hasil asli: KOPI

// Tebakan: 3
console.log("a,b,c".split(",").length);
// Hasil asli: 3

// Tebakan: bonana
console.log("banana".replace("a", "o"));
// Hasil asli: bonana

// Tebakan: bonono
console.log("banana".replaceAll("a", "o"));
// Hasil asli: bonono

// Tebakan: 42
console.log(parseInt("42px"));
// Hasil asli: 42

// Tebakan: NaN
console.log(Number("42px"));
// Hasil asli: NaN

// Tebakan: 3
console.log(parseInt("3.99"));
// Hasil asli: 3

// Tebakan: number
console.log(typeof (3.14159).toFixed(2));
// Hasil asli: string

// Tebakan: 0.30
console.log((0.1 + 0.2).toFixed(2));
// Hasil asli: 0.30

// Tebakan:  "1010"
console.log("10" + 5 * 2);
// Hasil asli: 1010

// Tebakan: true
console.log(!0 && !"");
// Hasil asli: true

//potongan B
let angka = [10, 20, 30, 40];

let potongan = angka.slice(1, 3);
let hapus = angka.splice(1, 2);

// Tebakan: [20, 30]
console.log(potongan);
// Hasil asli: [20, 30]

// Tebakan: [20, 30]
console.log(hapus);
// Hasil asli: [20, 30]

// Tebakan: [10, 40]
console.log(angka);
// Hasil asli: [10, 40]

function ganda(n) {
  return n * 2;
}

function cetak(n) {
  console.log(n * 2);
}

// Tebakan: 10
console.log(ganda(4) + ganda(1));
// Hasil asli: 10

// Tebakan: 8 lalu undefined
console.log(cetak(4));
// Hasil asli:
// 8
// undefined

const toko = {
  nama: "Senja",
  stok: 5,

  jual(n) {
    this.stok -= n;
    return this.stok;
  },
};

toko.jual(2);

// Tebakan: 2
console.log(toko.jual(1));
// Hasil asli: 2

// Tebakan: true
console.log("stok" in toko);
// Hasil asli: true

// Tebakan: nama, stok, jual
for (let k in toko) {
  console.log(k);
}
// Hasil asli:
// nama
// stok
// jual

//potongan C
let hasil = "";

for (let i = 1; i <= 6; i++) {
  if (i === 2) {
    continue;
  }

  if (i === 5) {
    break;
  }

  hasil += i;
}

// Tebakan: "134"
console.log(hasil);
// Hasil asli: 134

let n = 3;
let kali = 1;

while (n > 0) {
  kali *= n;
  n--;
}

// Tebakan: 6
console.log(kali);
// Hasil asli: 6

let x = 0;

do {
  x += 5;
} while (x < 3);

// Tebakan: 5
console.log(x);
// Hasil asli: 5

for (let huruf of "ABC") {
  console.log(huruf + huruf.toLowerCase());
}
// Tebakan:
// Aa
// Bb
// Cc

// Hasil asli:
// Aa
// Bb
// Cc

// ========================================
// 1. Function declaration vs function expression
// ========================================

// Function declaration bisa dipanggil sebelum didefinisikan.
console.log("Declaration:", sapa()); // Hasil: Halo!

function sapa() {
  return "Halo!";
}

// Function expression menggunakan const tidak bisa dipanggil
// sebelum baris deklarasinya dijalankan.
// Jika diaktifkan sebelum deklarasi, akan muncul ReferenceError:
// Cannot access 'salam' before initialization

// console.log(salam());

// FIX: Deklarasikan function expression terlebih dahulu.
const salam = function () {
  return "Selamat pagi!";
};

console.log("Expression:", salam()); // Hasil: Selamat pagi!


// ========================================
// 2. slice tidak mengubah array, splice mengubah array
// ========================================

const angkaSlice = [10, 20, 30, 40];
const hasilSlice = angkaSlice.slice(1, 3);

console.log("Hasil slice:", hasilSlice); // [20, 30]
console.log("Asli setelah slice:", angkaSlice); // [10, 20, 30, 40]

const angkaSplice = [10, 20, 30, 40];
const hasilSplice = angkaSplice.splice(1, 2);

console.log("Hasil splice:", hasilSplice); // [20, 30]
console.log("Asli setelah splice:", angkaSplice); // [10, 40]


// ========================================
// 3. for...in menghasilkan indeks,
//    for...of menghasilkan nilai
// ========================================

const buah = ["apel", "jeruk", "mangga"];

console.log("Dengan for...in:");
for (const indeks in buah) {
  console.log(indeks, typeof indeks);
}
// Hasil:
// 0 string
// 1 string
// 2 string

console.log("Dengan for...of:");
for (const nilai of buah) {
  console.log(nilai, typeof nilai);
}
// Hasil:
// apel string
// jeruk string
// mangga string


// ========================================
// 4. toFixed menghasilkan string
// ========================================

const angkaDesimal = (5).toFixed(1);

console.log("Hasil toFixed:", angkaDesimal); // "5.0"
console.log("Tipe data:", typeof angkaDesimal); // string
console.log("(5).toFixed(1) + 1:", (5).toFixed(1) + 1); // "5.01"
console.log("Jika diubah ke Number:", Number(angkaDesimal) + 1); // 6


// ========================================
// 5. Membuktikan nilai Falsy dan Truthy
// ========================================

const nilaiFalsy = [false, 0, "", null, undefined, NaN];

console.log("Pengujian nilai Falsy:");
for (const nilai of nilaiFalsy) {
  if (nilai) {
    console.log("Masuk if:", nilai);
  } else {
    console.log("Tidak masuk if:", String(nilai));
  }
}
// Semua nilai di atas tidak masuk ke blok if.

console.log("Pengujian nilai Truthy:");
const nilaiTruthy = ["0", [], {}];

for (const nilai of nilaiTruthy) {
  if (nilai) {
    console.log("Masuk if:", nilai);
  } else {
    console.log("Tidak masuk if:", nilai);
  }
}
// Semua nilai di atas masuk ke blok if.

/*
JAWABAN 7.3

1. Pada Potongan A, kenapa "10" + 5 * 2 menghasilkan "1010"?

   JavaScript mengerjakan perkalian terlebih dahulu karena
   operator * memiliki prioritas lebih tinggi daripada +.
   Jadi, 5 * 2 menghasilkan angka 10.
   Setelah itu, "10" + 10 menggabungkan string "10" dengan
   angka 10 menjadi string "1010".

2. Pada Potongan B, kenapa potongan dan hapus memiliki isi
   yang sama, tetapi efeknya pada angka berbeda?

   slice(1, 3) mengambil elemen indeks 1 sampai sebelum indeks 3
   dan menghasilkan array baru tanpa mengubah array asli.
   splice(1, 2) mengambil dua elemen mulai indeks 1 sekaligus
   menghapusnya dari array asli.
   Karena itu, potongan dan hapus sama-sama berisi [20, 30],
   tetapi angka tetap [10, 20, 30, 40] setelah slice dan menjadi
   [10, 40] setelah splice.

3. Pada Potongan B, kenapa console.log(cetak(4)) mencetak
   dua baris? Dari mana undefined berasal?

   Function cetak(4) menjalankan console.log(n * 2), sehingga
   angka 8 dicetak terlebih dahulu.
   Function cetak tidak memiliki return, jadi hasil pemanggilan
   function adalah undefined.
   Kemudian console.log di bagian luar mencetak undefined.
   Jadi, dua baris yang terlihat adalah 8 dan undefined.

4. Pada Potongan C, kenapa hasil bernilai "134"?

   Putaran i = 1:
   Tidak ada continue atau break. Angka 1 ditambahkan ke hasil,
   sehingga hasil menjadi "1".

   Putaran i = 2:
   Kondisi i === 2 benar. continue melewati penambahan angka 2.
   Hasil tetap "1".

   Putaran i = 3:
   Tidak ada continue atau break. Angka 3 ditambahkan,
   sehingga hasil menjadi "13".

   Putaran i = 4:
   Angka 4 ditambahkan, sehingga hasil menjadi "134".

   Putaran i = 5:
   Kondisi i === 5 benar. break menghentikan perulangan.
   Angka 5 tidak ditambahkan dan putaran i = 6 tidak dijalankan.
   Jadi, nilai akhir hasil adalah string "134".

5. Pada Potongan C, kenapa do...while menjalankan blok
   satu kali meskipun kondisi x < 3 bernilai false?

   do...while menjalankan blok terlebih dahulu, kemudian
   memeriksa kondisi.
   Awalnya x = 0. Blok dijalankan dan x ditambah 5,
   sehingga x menjadi 5.
   Setelah itu, kondisi x < 3 diperiksa dan hasilnya false.
   Perulangan berhenti, tetapi satu kali eksekusi sudah terjadi.
   Karena itu, nilai akhir x adalah 5.
*/