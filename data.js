const KNOWLEDGE_BASE = {
    // 1. General Principles
    principles: [
        {
            title: "Aturan 3-3-3",
            content: "Anda hanya bisa bertahan: 3 Menit tanpa udara, 3 Jam tanpa perlindungan, 3 Hari tanpa air, 3 Minggu tanpa makanan."
        },
        {
            title: "Mindset",
            content: "Fokus pada apa yang bisa dikontrol. Jangan panik. Buat keputusan berdasarkan logika, bukan emosi."
        }
    ],

    // 2. Crisis Data (Risks, Strategies, Avoid List)
    crisis: {
        "Pangan": {
            risk: "Kelaparan akut, penurunan fungsi kognitif, kerusuhan perebutan logistik.",
            strategy: "Rasionalisasi stok segera. Amankan sumber pangan alternatif terdekat.",
            avoid: "Jangan makan porsi besar sekaligus. Jangan beritahu stok makanan ke orang asing.",
            checklist: ["Inventarisir makanan", "Pisahkan stok harian & cadangan", "Cari tanaman edible sekitar"]
        },
        "Air": {
            risk: "Dehidrasi fatal (3 hari). Penyakit diare/kolera.",
            strategy: "Konservasi air. Wajib filtrasi dan rebus.",
            avoid: "Jangan minum air banjir/genangan tanpa proses. Jangan boros air untuk cuci.",
            checklist: ["Tampung air hujan", "Buat filter air (pasir/arang)", "Rebus air 3-5 menit"]
        },
        "Kesehatan": {
            risk: "Wabah penyakit menular, infeksi luka sederhana jadi fatal.",
            strategy: "Isolasi mandiri ketat. Higiene ekstrem.",
            avoid: "Jangan sentuh wajah/mata kotor. Jangan abaikan luka kecil.",
            checklist: ["Stok obat rutin", "Siapkan antiseptik darurat (madu/garam)", "Masker/APD saat keluar"]
        },
        "Keamanan": {
            risk: "Penjarahan rumah, kekerasan fisik, penculikan.",
            strategy: "Low profile (Grey Man). Perkuat perimeter rumah.",
            avoid: "Jangan terlihat mencolok/kaya. Jangan buka pintu untuk orang tak dikenal.",
            checklist: ["Palang pintu/jendela", "Siapkan jalur evakuasi", "Senjata pertahanan diri (tumpul)"]
        },
        "Listrik": {
            risk: "Gelap gulita, putus komunikasi, makanan kulkas busuk.",
            strategy: "Hidup analog. Manfaatkan siang hari. Hemat baterai.",
            avoid: "Jangan buka kulkas sering-sering. Jangan main HP untuk hal tak penting.",
            checklist: ["Senter & baterai cadangan", "Lilin/lampu minyak", "Radio baterai"]
        },
        "Ekonomi Mikro": {
            risk: "Hiperinflasi, uang tak laku, kelangkaan barang.",
            strategy: "Simpan aset riil (emas/barang barter). Hemat cash.",
            avoid: "Jangan pegang uang tunai terlalu banyak (devaluasi). Jangan hutang konsumtif.",
            checklist: ["Stok barang barter (rokok/kopi)", "Pecahan uang kecil", "Tukar uang ke barang berguna"]
        },
        "Internet": {
            risk: "Disinformasi (hoax), isolasi informasi, panik massal.",
            strategy: "Cari sumber info resmi (Radio). Verifikasi info.",
            avoid: "Jangan sebar info belum valid. Jangan share lokasi real-time.",
            checklist: ["Radio AM/FM", "Titik kumpul keluarga", "Peta offline/fisik"]
        }
    },

    // 3. Time Scenarios (Priorities)
    timeline: {
        "1 Hari": {
            phase: "Fase Kritis (Shock)",
            priority_24h: "Evaluasi, Kumpul Keluarga, Amankan Aset Vital.",
            strategy: "Fokus pada keamanan langsung dan inventarisasi."
        },
        "7 Hari": {
            phase: "Fase Bertahan (Survival)",
            priority_24h: "Rasionalisasi Makanan/Air, Sanitasi Darurat.",
            strategy: "Mulai pola hidup hemat energi. Bangun rutinitas baru."
        },
        "14 Hari": {
            phase: "Fase Adaptasi",
            priority_24h: "Cari Sumber Baru, Perkuat Shelter, Mental Health.",
            strategy: "Mulai menanam/mencari sumber daya tambahan. Koordinasi lingkungan."
        },
        "1 Bulan": {
            phase: "Fase Jangka Panjang (New Normal)",
            priority_24h: "Sistem Komunitas, Produksi Pangan Mandiri.",
            strategy: "Bangun sistem swasembada & pertahanan komunitas permanen."
        }
    },

    // 4. Food & Energy Sources
    food_sources: {
        "Karbohidrat": ["Beras/Jagung (Stok)", "Singkong/Ubi (Tanam)", "Pisang", "Sagu/Papeda"],
        "Protein": ["Telur (Ternak)", "Ikan (Sungai/Kolam)", "Kacang-kacangan (Stok)", "Serangga (Darurat Ekstrem)"],
        "Energi": ["Matahari (Jemur bahan)", "Kayu Bakar (Memasak)", "Biogas (Kotoran ternak/sampah)"]
    },

    // 5. Water & Sanitation
    water_sanitation: {
        "Sumber": {
            "Hujan": "Tampung langsung dari langit (hindari atap kotor). Paling aman.",
            "Sungai": "Wajib filter + rebus. Risiko kontaminasi hulu tinggi.",
            "Sumur": "Rebus. Aman jika tidak banjir.",
            "Banjir": "JANGAN MINUM kecuali distilasi total."
        },
        "Purifikasi": ["Rebus (Rolling boil 3-5 menit)", "Klorin/Kaporit (Takar dosis)", "SODIS (Jemur botol PET di matahari 6 jam)"],
        "Sanitasi": ["Gali lubang (latrine) min 10m dari sumber air.", "Kubur limbah.", "Cuci tangan pakai abu jika tak ada sabun."]
    },

    // 6. Community Roles
    roles: {
        "Individu": "Jaga kesehatan diri, pelajari skill baru, jangan jadi beban.",
        "Kepala Keluarga": "Ambil keputusan, bagi tugas, jaga moral keluarga.",
        "Komunitas": "Siskamling, Dapur Umum, Barter Market, Informasi Terpusat."
    },

    // 7. Contextual Advice (Location)
    location_advice: {
        "Kota": {
            strategy: "Bug In (Bertahan di dalam).",
            water: "Stok air galon, tadah hujan balkon.",
            food: "Barter barang, cari toko terbengkalai (penjarahan risiko tinggi)."
        },
        "Desa": {
            strategy: "Community Defense.",
            water: "Sumur/Mata air.",
            food: "Kebun & Ternak. Lumbung desa."
        },
        "Pinggiran": {
            strategy: "Hybrid Survival (Semi-Urban).",
            water: "Sumur gali/Bor.",
            food: "Manfaatkan lahan kosong, stok dari kota."
        },
        "Hutan": {
            strategy: "Bushcraft.",
            water: "Mata air/Sungai jernih.",
            food: "Berburu & Meramu (Hati-hati racun)."
        }
    }
};

const UI_DATA = {
    crisisOptions: [
        { id: "Pangan", icon: "🍙", label: "Pangan" },
        { id: "Air", icon: "💧", label: "Air Bersih" },
        { id: "Kesehatan", icon: "🩹", label: "Kesehatan" },
        { id: "Listrik", icon: "⚡", label: "Listrik Mati" },
        { id: "Keamanan", icon: "🛡️", label: "Kerusuhan" },
        { id: "Ekonomi Mikro", icon: "📉", label: "Ekonomi" },
        { id: "Internet", icon: "📡", label: "Komunikasi" }
    ],
    timeOptions: [
        { id: "1 Hari", label: "1 - 3 Hari (Fase Akut)" },
        { id: "7 Hari", label: "1 Minggu (Fase Stabilisasi)" },
        { id: "14 Hari", label: "2 Minggu (Fase Adaptasi)" },
        { id: "1 Bulan", label: "1 Bulan+ (Jangka Panjang)" }
    ],
    locationTypes: [
        { id: "Kota", label: "Perkotaan Padat" },
        { id: "Desa", label: "Pedesaan" },
        { id: "Pinggiran", label: "Pinggiran Kota" },
        { id: "Hutan", label: "Terpencil/Hutan" }
    ],
    climates: [
        { id: "Hujan", label: "Sering Hujan" },
        { id: "Kemarau", label: "Kemarau/Kering" },
        { id: "Normal", label: "Pancaroba" }
    ],
    incomeSources: [
        { id: "Gaji", label: "Gaji Tetap Bulanan" },
        { id: "Harian", label: "Upah Harian" },
        { id: "Usaha", label: "Usaha Sendiri" },
        { id: "Tidak Tetap", label: "Serabutan/Tidak Tetap" }
    ],
    skills: [
        "P3K/Medis", "Bertani", "Tukang",
        "Memasak", "Bela Diri", "Mekanik",
        "Navigasi", "Menjahit"
    ],
    assets: [
        "Sumur Air", "Halaman Luas", "Genset/Solar",
        "Kendaraan", "Senjata", "Stok Makanan"
    ],
    communities: [
        { id: "Aktif", label: "Aktif & Kompak" },
        { id: "Pasif", label: "Ada tapi Pasif" },
        { id: "Tidak Ada", label: "Individualis / Tidak Ada" }
    ]
};
