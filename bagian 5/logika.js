// 1. Menghitung faktorial
function hitungFaktorial(n) {
    if (n < 0) {
        return null;
    }

    let hasil = 1;

    for (let i = 1; i <= n; i++) {
        hasil *= i;
    }

    return hasil;
}

console.log("=== HITUNG FAKTORIAL ===");
console.log("5 =", hitungFaktorial(5));   // 120
console.log("0 =", hitungFaktorial(0));   // 1
console.log("1 =", hitungFaktorial(1));   // 1
console.log("-3 =", hitungFaktorial(-3)); // null


// 2. Mengecek palindrom tanpa reverse()
function cekPalindrom(teks) {
    const kata = teks.trim().toLowerCase();

    if (kata === "") {
        return false;
    }

    let kiri = 0;
    let kanan = kata.length - 1;

    while (kiri < kanan) {
        if (kata[kiri] !== kata[kanan]) {
            return false;
        }

        kiri++;
        kanan--;
    }

    return true;
}

console.log("\n=== CEK PALINDROM ===");
console.log('"Katak" =', cekPalindrom("Katak"));     // true
console.log('" Malam " =', cekPalindrom(" Malam ")); // true
console.log('"Kopi" =', cekPalindrom("Kopi"));       // false
console.log('"" =', cekPalindrom(""));               // false


// 3. Menghitung huruf vokal
function hitungVokal(teks) {
    const kata = teks.toLowerCase();
    let jumlah = 0;

    for (const huruf of kata) {
        if ("aiueo".includes(huruf)) {
            jumlah++;
        }
    }

    return jumlah;
}

console.log("\n=== HITUNG VOKAL ===");
console.log('"Kedai Senja" =', hitungVokal("Kedai Senja")); // 5
console.log('"RHYTHM" =', hitungVokal("RHYTHM"));           // 0
console.log('"Aiueo" =', hitungVokal("Aiueo"));             // 5


// 4. Mencari angka terbesar dan indeksnya
function cariTerbesar(daftar) {
    if (daftar.length === 0) {
        return null;
    }

    let nilaiTerbesar = daftar[0];
    let indeksTerbesar = 0;

    for (let i = 1; i < daftar.length; i++) {
        if (daftar[i] > nilaiTerbesar) {
            nilaiTerbesar = daftar[i];
            indeksTerbesar = i;
        }
    }

    return {
        nilai: nilaiTerbesar,
        indeks: indeksTerbesar
    };
}

console.log("\n=== CARI TERBESAR ===");
console.log("[12, 45, 7, 45, 30] =", cariTerbesar([12, 45, 7, 45, 30]));
console.log("[3] =", cariTerbesar([3]));
console.log("[] =", cariTerbesar([]));


// 5. Menghapus duplikat tanpa mengubah array asli
function hapusDuplikat(daftar) {
    const hasil = [];

    for (const item of daftar) {
        if (!hasil.includes(item)) {
            hasil.push(item);
        }
    }

    return hasil;
}

console.log("\n=== HAPUS DUPLIKAT ===");

const angkaAsli = [1, 2, 2, 3, 1];
const hasilAngka = hapusDuplikat(angkaAsli);

console.log("Hasil angka:", hasilAngka); // [1, 2, 3]
console.log("Array asli:", angkaAsli);   // [1, 2, 2, 3, 1]

const hurufAsli = ["a", "b", "a"];
console.log("Hasil huruf:", hapusDuplikat(hurufAsli)); // ["a", "b"]

const daftarKosong = [];
console.log("Array kosong:", hapusDuplikat(daftarKosong)); // []


// 6. Mengecek bilangan prima
function cekBilanganPrima(n) {
    if (n < 2 || !Number.isInteger(n)) {
        return false;
    }

    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

console.log("\n=== CEK BILANGAN PRIMA ===");
console.log("2 =", cekBilanganPrima(2));   // true
console.log("17 =", cekBilanganPrima(17)); // true
console.log("15 =", cekBilanganPrima(15)); // false
console.log("1 =", cekBilanganPrima(1));   // false
console.log("0 =", cekBilanganPrima(0));   // false