
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
