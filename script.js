
"use strict";

// ==========================================
// BAGIAN 3: PEMBERSIHAN TRANSAKSI MENTAH
// ==========================================
// Jika transaksiBersih sudah dibuat pada bagian sebelumnya,
// jangan deklarasikan ulang. Gunakan data yang sudah tersedia.

const transaksiBersih = transaksiMentah.map((trx) => ({
    kode: String(trx.kode ?? "").trim().toLowerCase(),
    pelanggan: bersihkanNama(trx.pelanggan),
    hari: String(trx.hari ?? "").trim().toLowerCase(),
    uangBayar: ubahKeAngka(trx.uangBayar),
    voucher: String(trx.voucher ?? "").trim(),
    pesanan: Array.isArray(trx.pesanan)
        ? trx.pesanan.map((item) => ({
            menu: bersihkanNama(item.menu),
            jumlah: ubahKeAngka(item.jumlah)
        }))
        : []
}));

// ==========================================
// OBJECT KASIR
// ==========================================

const kasir = {
    menu: menu,
    saldoKas: 0,
    riwayat: [],
    pecahan: [50000, 20000, 10000, 5000, 2000, 1000],

    // Mencari menu menggunakan for...of.
    cariMenu(nama) {
        for (const item of this.menu) {
            if (
                bersihkanNama(item.nama).toLowerCase() ===
                bersihkanNama(nama).toLowerCase()
            ) {
                return item;
            }
        }

        return null;
    },

    // Menghitung subtotal dan memisahkan item valid
    // dari item yang tidak valid.
    hitungSubtotal(pesanan) {
        let subtotal = 0;
        const itemValid = [];
        const itemTidakValid = [];

        for (const item of pesanan) {
            const namaMenu = bersihkanNama(item.menu);
            const jumlah = ubahKeAngka(item.jumlah);
            const dataMenu = this.cariMenu(namaMenu);

            if (!dataMenu) {
                itemTidakValid.push({
                    menu: namaMenu,
                    alasan: "Menu tidak ditemukan"
                });
                continue;
            }

            if (jumlah <= 0) {
                itemTidakValid.push({
                    menu: namaMenu,
                    alasan: "Jumlah harus lebih dari 0"
                });
                continue;
            }

            if (dataMenu.stok < jumlah) {
                itemTidakValid.push({
                    menu: namaMenu,
                    alasan: "Stok tidak cukup"
                });
                continue;
            }

            itemValid.push({
                menu: dataMenu.nama,
                jumlah: jumlah,
                harga: dataMenu.harga
            });

            subtotal += dataMenu.harga * jumlah;
        }

        return {
            subtotal,
            itemValid,
            itemTidakValid
        };
    },

    // Menghitung promo berdasarkan hari menggunakan switch.
    hitungPromoHari(hari) {
        switch (String(hari ?? "").trim().toLowerCase()) {
            case "jumat":
                return 3000;

            case "sabtu":
            case "minggu":
                return 5000;

            default:
                return 0;
        }
    },

    // Mengambil persentase terbesar antara diskon subtotal
    // dan voucher, kemudian menghitung nominal diskon.
    hitungDiskon(subtotal, persenVoucher) {
        let persenSubtotal;

        if (subtotal >= 100000) {
            persenSubtotal = 15;
        } else if (subtotal >= 50000) {
            persenSubtotal = 10;
        } else if (subtotal >= 25000) {
            persenSubtotal = 5;
        } else {
            persenSubtotal = 0;
        }

        const persenDipakai = Math.max(
            persenSubtotal,
            ubahKeAngka(persenVoucher)
        );

        return Math.round(subtotal * persenDipakai / 100);
    },

    // Menghitung pajak dan mengembalikan angka.
    hitungPajak(nilai, tarif = 0.11) {
        return Math.round(nilai * tarif);
    },

    // Menguraikan kembalian berdasarkan pecahan uang.
    hitungKembalianPecahan(kembalian) {
        if (kembalian < 0) {
            return null;
        }

        let sisa = Math.trunc(kembalian);
        const hasil = {};

        for (const pecahan of this.pecahan) {
            let jumlahLembar = 0;

            while (sisa >= pecahan) {
                sisa -= pecahan;
                jumlahLembar++;
            }

            if (jumlahLembar > 0) {
                hasil[pecahan] = jumlahLembar;
            }
        }

        hasil.sisa = sisa;

        return hasil;
    },

    // Memproses satu transaksi.
    prosesTransaksi(trx) {
        const kode = trx.kode;
        const pelanggan = bersihkanNama(trx.pelanggan);
        const pesanan = Array.isArray(trx.pesanan)
            ? trx.pesanan
            : [];

        // Validasi nama pelanggan.
        if (!pelanggan) {
            const hasil = {
                kode,
                pelanggan,
                status: "DITOLAK",
                alasan: "Nama pelanggan kosong"
            };

            this.riwayat.push(hasil);
            return hasil;
        }

        // Validasi panjang array pesanan.
        if (pesanan.length === 0) {
            const hasil = {
                kode,
                pelanggan,
                status: "DITOLAK",
                alasan: "Pesanan kosong"
            };

            this.riwayat.push(hasil);
            return hasil;
        }

        const ringkasan = this.hitungSubtotal(pesanan);

        // Transaksi ditolak jika tidak ada item yang valid.
        if (ringkasan.itemValid.length === 0) {
            const hasil = {
                kode,
                pelanggan,
                status: "DITOLAK",
                alasan: "Tidak ada item valid"
            };

            this.riwayat.push(hasil);
            return hasil;
        }

        const subtotal = ringkasan.subtotal;
        const promoHari = this.hitungPromoHari(trx.hari);
        const persenVoucher = ambilPersenVoucher(trx.voucher);

        const diskon = this.hitungDiskon(
            subtotal,
            persenVoucher
        );

        // Nilai setelah diskon tidak boleh negatif.
        const nilaiSetelahDiskon = Math.max(
            0,
            subtotal - diskon - promoHari
        );

        const pajak = this.hitungPajak(nilaiSetelahDiskon);
        const total = nilaiSetelahDiskon + pajak;
        const uangBayar = ubahKeAngka(trx.uangBayar);
        const kembalian = uangBayar - total;

        const status = uangBayar >= total
            ? "LUNAS"
            : "KURANG";

        let pecahanKembalian = null;

        // Stok dan saldo hanya berubah jika transaksi lunas.
        if (status === "LUNAS") {
            for (const item of ringkasan.itemValid) {
                const dataMenu = this.cariMenu(item.menu);

                if (dataMenu) {
                    dataMenu.stok -= item.jumlah;
                }
            }

            this.saldoKas += total;

            pecahanKembalian =
                this.hitungKembalianPecahan(kembalian);
        }

        const hasil = {
            kode,
            pelanggan,
            status,
            subtotal,
            promoHari,
            diskon,
            pajak,
            total,
            uangBayar,
            kembalian,
            pecahanKembalian,
            itemValid: ringkasan.itemValid,
            itemTidakValid: ringkasan.itemTidakValid
        };

        this.riwayat.push(hasil);

        return hasil;
    },

    // Mencetak struk transaksi dengan template literal.
    cetakStruk(hasil) {
        if (hasil.status === "DITOLAK") {
            console.log(`
