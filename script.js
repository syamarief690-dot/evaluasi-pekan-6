
const kedai = {
    nama: "Kedai AMS",
    pemilik: "Arief Syam",
    kota: "Yogyakarta",
    tahunBerdiri: 2022,
    sedangBuka: true,
    nomorWhatsApp: "081234567890",
    website: null,
    jamOperasional: {
        buka: "08:00",
        tutup: "22:00"
    }
};

const menu = [
    {
        nama: "Kopi Susu",
        kategori: "Minuman",
        harga: 15000,
        stok: 20
    },
    {
        nama: "Kopi Hitam",
        kategori: "Minuman",
        harga: 10000,
        stok: 15
    },
    {
        nama: "Teh Manis",
        kategori: "Minuman",
        harga: 5000,
        stok: 25
    },
    {
        nama: "Nasi Goreng",
        kategori: "Makanan",
        harga: 20000,
        stok: 10
    },
    {
        nama: "Mie Goreng",
        kategori: "Makanan",
        harga: 18000,
        stok: 8
    },
    {
        nama: "Roti Bakar",
        kategori: "Camilan",
        harga: 12000,
        stok: 12
    },
    {
        nama: "Kentang Goreng",
        kategori: "Camilan",
        harga: 10000,
        stok: 0
    },
    {
        nama: "Jus Alpukat",
        kategori: "Minuman",
        harga: 14000,
        stok: 7
    }
];

const transaksiMentah = [
    {
        kode: "trx-001",
        pelanggan: " rina WULANDARI ",
        hari: " jumat ",
        uangBayar: "150.000",
        voucher: " diskon10 ",
        pesanan: [
            { menu: " kopi SUSU", jumlah: "2" },
            { menu: "NASI GORENG ", jumlah: "3" }
        ]
    },
    {
        kode: "trx-002",
        pelanggan: "budi santoso",
        hari: "sabtu",
        uangBayar: "75000",
        voucher: " ",
        pesanan: [
            { menu: "teh MANIS ", jumlah: "2" },
            { menu: " Roti Bakar", jumlah: "2" }
        ]
    },
    {
        kode: "trx-003",
        pelanggan: " SITI AMINAH ",
        hari: "senin",
        uangBayar: "10000",
        voucher: "diskon10",
        pesanan: [
            { menu: "Nasi Goreng", jumlah: "1" }
        ]
    },
    {
        kode: "trx-004",
        pelanggan: "   ",
        hari: "minggu",
        uangBayar: "50000",
        voucher: "",
        pesanan: [
            { menu: "Kopi Hitam", jumlah: "2" }
        ]
    },
    {
        kode: "trx-005",
        pelanggan: "andi pratama",
        hari: "rabu",
        uangBayar: "100000",
        voucher: "HEMAT5",
        pesanan: [
            { menu: "Kopi Susu", jumlah: "1" },
            { menu: "Menu Tidak Ada", jumlah: "2" },
            { menu: "Kentang Goreng", jumlah: "1" },
            { menu: "Teh Manis", jumlah: "0" }
        ]
    },
    {
        kode: "trx-006",
        pelanggan: "dewi lestari",
        hari: "kamis",
        uangBayar: "90000",
        voucher: "",
        pesanan: []
    }
];




"use strict";

// 1. Function declaration
// Membersihkan spasi dan merapikan huruf pada nama pelanggan.
function bersihkanNama(teks) {
    return String(teks ?? "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .replace(/\b[a-z]/g, huruf => huruf.toUpperCase());
}

// 2. Function expression
// Mengubah teks menjadi angka dan mengembalikan 0 jika tidak valid.
const ubahKeAngka = function (teks) {
    const angka = Number(
        String(teks ?? "")
            .replace(/\./g, "")
            .replace(/\s/g, "")
    );

    return Number.isFinite(angka) ? angka : 0;
};

// 3. Arrow function
// Mengambil angka persen jika kode voucher diawali kata DISKON.
const ambilPersenVoucher = (kode) => {
    const kodeBersih = String(kode ?? "")
        .trim()
        .replace(/\s+/g, "")
        .toUpperCase();

    const hasil = kodeBersih.match(/^DISKON(\d+(?:\.\d+)?)$/);

    return hasil ? Number(hasil[1]) : 0;
};

// 4. Function declaration
// Mengubah angka menjadi format rupiah dengan titik pemisah ribuan.
function formatRupiah(angka) {
    const nilai = Number(angka);

    if (!Number.isFinite(nilai)) {
        return "Rp 0";
    }

    const teksAngka = String(Math.trunc(nilai));
    const angkaAbsolut = teksAngka.replace(/^-/, "");
    const angkaBerformat = angkaAbsolut.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
    );

    return nilai < 0
        ? `Rp -${angkaBerformat}`
        : `Rp ${angkaBerformat}`;
}

// ========================================
// PENGUJIAN FUNCTION PEMBERSIH DATA
// ========================================

// Pengujian bersihkanNama()
console.log("=== UJI BERSIHKAN NAMA ===");

const ujiNama = [
    "  rina   WULANDARI ",
    "",
    "  bUDI santoso  "
];

ujiNama.forEach(input => {
    console.log(
        JSON.stringify(input),
        "→",
        JSON.stringify(bersihkanNama(input))
    );
});

// Pengujian ubahKeAngka()
console.log("\n=== UJI UBAH KE ANGKA ===");

const ujiAngka = [
    "150.000",
    "75000",
    "abc"
];

ujiAngka.forEach(input => {
    console.log(
        JSON.stringify(input),
        "→",
        ubahKeAngka(input)
    );
});

// Pengujian ambilPersenVoucher()
console.log("\n=== UJI AMBIL PERSEN VOUCHER ===");

const ujiVoucher = [
    " diskon10 ",
    "PROMO5",
    ""
];

ujiVoucher.forEach(input => {
    console.log(
        JSON.stringify(input),
        "→",
        ambilPersenVoucher(input)
    );
});

// Pengujian formatRupiah()
console.log("\n=== UJI FORMAT RUPIAH ===");

const ujiRupiah = [
    1250000,
    500,
    0
];

ujiRupiah.forEach(input => {
    console.log(
        input,
        "→",
        formatRupiah(input)
    );
});

// === UJI BERSIHKAN NAMA ===
// "  rina   WULANDARI " → "Rina Wulandari"
// "" → ""
// "  bUDI santoso  " → "Budi Santoso"

// === UJI UBAH KE ANGKA ===
// "150.000" → 150000
// "75000" → 75000
// "abc" → 0

// === UJI AMBIL PERSEN VOUCHER ===
// " diskon10 " → 10
// "PROMO5" → 0
// "" → 0

// === UJI FORMAT RUPIAH ===
// 1250000 → Rp 1.250.000
// 500 → Rp 500
// 0 → Rp 0
