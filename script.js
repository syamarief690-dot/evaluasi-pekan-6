
/*
========================================
BAGIAN 4: LAPORAN HARIAN
========================================
Laporan dibuat setelah seluruh transaksi percobaan
pertama selesai diproses.
*/

const laporan = {
    jumlahTransaksi: kasir.riwayat.length,

    jumlahLunas: 0,
    jumlahKurang: 0,
    jumlahDitolak: 0,

    pendapatan: 0,
    rataRata: 0,
    transaksiTerbesar: null,

    penjualanPerMenu: {},
    menuTerlaris: "",

    daftarDitolak: [],
    kodeLunas: [],
    ringkasanKode: "",

    menuStokMenipis: []
};

// Menghitung jumlah transaksi dan mengumpulkan data laporan.
for (const trx of kasir.riwayat) {
    if (trx.status === "LUNAS") {
        laporan.jumlahLunas++;

        laporan.pendapatan += trx.total;

        // Menyimpan transaksi dengan total terbesar.
        if (
            laporan.transaksiTerbesar === null ||
            trx.total > laporan.transaksiTerbesar.total
        ) {
            laporan.transaksiTerbesar = trx;
        }

        // Mengumpulkan kode transaksi lunas.
        laporan.kodeLunas.push(trx.kode);

        // Membuat ringkasan kode menggunakan +=.
        if (laporan.ringkasanKode !== "") {
            laporan.ringkasanKode += ", ";
        }

        laporan.ringkasanKode += trx.kode;

        // Menghitung jumlah menu yang terjual.
        for (const item of trx.itemValid) {
            // Pemeriksaan properti memakai operator in.
            if (!(item.menu in laporan.penjualanPerMenu)) {
                laporan.penjualanPerMenu[item.menu] = 0;
            }

            // Bracket notation untuk mengakses properti.
            laporan.penjualanPerMenu[item.menu] += item.jumlah;
        }
    } else if (trx.status === "KURANG") {
        laporan.jumlahKurang++;
    } else if (trx.status === "DITOLAK") {
        laporan.jumlahDitolak++;

        laporan.daftarDitolak.push({
            kode: trx.kode,
            alasan: trx.alasan
        });
    }
}

// Menghitung rata-rata pendapatan per transaksi lunas.
laporan.rataRata = laporan.jumlahLunas > 0
    ? Math.round(laporan.pendapatan / laporan.jumlahLunas)
    : 0;

// Mencari menu terlaris.
let jumlahTerbanyak = 0;

for (const namaMenu in laporan.penjualanPerMenu) {
    const jumlah = laporan.penjualanPerMenu[namaMenu];

    if (jumlah > jumlahTerbanyak) {
        jumlahTerbanyak = jumlah;
        laporan.menuTerlaris = namaMenu;
    }
}

// Mencari menu yang stoknya kurang dari 3.
for (const item of kasir.menu) {
    if (item.stok < 3) {
        laporan.menuStokMenipis.push(item.nama);
    }
}

// ========================================
// CETAK LAPORAN HARIAN
// ========================================

console.log(`
============================================
${"LAPORAN HARIAN " + kedai.nama.toUpperCase()}
============================================
Jumlah transaksi : ${laporan.jumlahTransaksi}
Transaksi lunas   : ${laporan.jumlahLunas}
Transaksi kurang  : ${laporan.jumlahKurang}
Transaksi ditolak : ${laporan.jumlahDitolak}

Pendapatan        : ${formatRupiah(laporan.pendapatan)}
Rata-rata lunas   : ${formatRupiah(laporan.rataRata)}

Transaksi terbesar:
${laporan.transaksiTerbesar
        ? `Kode              : ${laporan.transaksiTerbesar.kode}
Pelanggan         : ${laporan.transaksiTerbesar.pelanggan}
Total             : ${formatRupiah(laporan.transaksiTerbesar.total)}`
        : "Belum ada transaksi lunas"}

Menu terlaris     : ${laporan.menuTerlaris || "Belum ada penjualan"}
Jumlah terjual    : ${jumlahTerbanyak} item
============================================
`);

// ========================================
// PENJUALAN PER MENU: FOR...IN
// ========================================

console.log("=== PENJUALAN PER MENU ===");

for (const namaMenu in laporan.penjualanPerMenu) {
    console.log(
        `${namaMenu}: ${laporan.penjualanPerMenu[namaMenu]} terjual`
    );
}

// Menampilkan Object.keys dan Object.values.
console.log("\n=== OBJECT.KEYS ===");
console.log(Object.keys(laporan.penjualanPerMenu));

console.log("\n=== OBJECT.VALUES ===");
console.log(Object.values(laporan.penjualanPerMenu));

// ========================================
// DAFTAR TRANSAKSI DITOLAK
// ========================================

console.log("\n=== TRANSAKSI DITOLAK ===");

if (laporan.daftarDitolak.length === 0) {
    console.log("Tidak ada transaksi ditolak.");
} else {
    for (const trx of laporan.daftarDitolak) {
        console.log(`${trx.kode}: ${trx.alasan}`);
    }
}

// ========================================
// VALIDASI RINGKASAN KODE
// ========================================

const jumlahKodeRingkasan =
    laporan.ringkasanKode === ""
        ? 0
        : laporan.ringkasanKode.split(", ").length;

const ringkasanSesuai =
    jumlahKodeRingkasan === laporan.jumlahLunas;

console.log("\n=== VALIDASI RINGKASAN KODE ===");
console.log("Ringkasan kode:", laporan.ringkasanKode);
console.log("Jumlah kode:", jumlahKodeRingkasan);
console.log("Jumlah transaksi lunas:", laporan.jumlahLunas);
console.log("Apakah jumlahnya sama?", ringkasanSesuai);

// ========================================
// DEMO ARRAY METHOD
// ========================================

console.log("\n=== DEMO ARRAY METHOD ===");

// includes: memeriksa apakah kode ada di array.
console.log(
    "includes:",
    laporan.kodeLunas.includes("trx-001")
);

// indexOf: mencari posisi kode, dimulai dari indeks 0.
console.log(
    "indexOf:",
    laporan.kodeLunas.indexOf("trx-001")
);

// slice: mengambil dua kode pertama tanpa mengubah array asli.
const duaKodePertama = laporan.kodeLunas.slice(0, 2);

console.log("slice:", duaKodePertama);

// Membuat salinan array sebelum menggunakan splice.
const salinanKode = laporan.kodeLunas.slice();

// splice: menghapus kode pertama dari salinan.
const kodeDihapus = salinanKode.splice(0, 1);

console.log("Kode yang dihapus:", kodeDihapus);
console.log("Array salinan setelah splice:", salinanKode);
console.log("Array kodeLunas asli:", laporan.kodeLunas);

// ========================================
// MENU DENGAN STOK MENIPIS
// ========================================

console.log("\n=== MENU STOK MENIPIS ===");

if (laporan.menuStokMenipis.length === 0) {
    console.log("Tidak ada menu dengan stok kurang dari 3.");
} else {
    for (const namaMenu of laporan.menuStokMenipis) {
        console.log(namaMenu);
    }
}

// Menampilkan seluruh object laporan.
console.log("\n=== OBJECT LAPORAN LENGKAP ===");
console.log(laporan);
