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