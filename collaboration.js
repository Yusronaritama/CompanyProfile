// --- Logika untuk Pengalaman Kolaborasi (Filter, Sort, & Paginasi) ---

// Dataset Anda (tidak perlu diubah)
const collaborationData = {
    "2020-2029": [
        { company: 'Black Rider (Balikpapan)', type: 'Aplikasi Ojek Online. Tahap 2.', year: 2025 },
        { company: 'Borneo Vision (Balikpapan)', type: 'Joni Robotics', year: 2025 },
        { company: 'Joni Robotics (Balikpapan)', type: 'Web Murah', year: 2025 },
        { company: 'M Interior', type: 'M Interior Accounting (MIA). Tahap 1.', year: 2023 },
        { company: 'PT. Pollux Solusi Integrasi (Jakarta)', type: 'Produk Software Akuntansi Online. Tahap 1.', year: 2021 },
        { company: 'PT. Telkomsel, Kalimantan Timur.', type: 'L21 Massive (New Site 4G LTE 2100)', year: 2021 }
    ],
    "2010-2019": [
        { company: 'Bandung Digital Valley (Bandung)', type: 'Riset dan Pengembangan', year: 2019 },
        { company: 'Cocowork (Jakarta)', type: 'Survey', year: 2019 },
        { company: 'PT. Bank Sinarmas Tbk (Jakarta)', type: 'Collateral Management System', year: 2018 },
        { company: 'Pemerintah NKRI (Jakarta)', type: 'LPSE', year: 2018 },
        { company: 'Black Rider (Balikpapan)', type: 'Aplikasi Ojek Online (Tahap 1)', year: 2016 },
        { company: 'PT. Sefas Pelindotama (Balikpapan)', type: 'IT Support. Supply Manpower.', year: 2014 },
        { company: 'PT. Alatas Marine (Balikpapan)', type: 'Web Company Profile', year: 2012 },
        { company: 'Borneo Media Online (Balikpapan)', type: 'Produk Software Desktop', year: 2012 },
        { company: 'PT. Bumi Liputan Jaya (Balikpapan)', type: 'Software Logistik', year: 2012 },
        { company: 'LPK Borneo Media (Balikpapan)', type: 'Modul Pelatihan, Tahap 1.', year: 2011 },
        { company: 'PT. Trans Pyramid (Balikpapan)', type: 'Upgrade Transmisi Indosat, Pulang Pisau, Kalteng.', year: 2011 },
        { company: 'Pemerintah Kota Balikpapan', type: 'LPSE', year: 2010 }
    ],
    "2000-2009": [
        { company: 'Cybernet Media (Balikpapan)', type: 'Warung Internet', year: 2009 },
        { company: 'PT. Benawa Raya (Banjarbaru)', type: 'Software Distributor Gas', year: 2008 },
        { company: 'PT. Inti Pratama (Balikpapan)', type: 'Web Template Company Profile', year: 2008 },
        { company: 'Cyber Data Media (Jogjakarta)', type: 'Produk Software Desktop, Cyber Store', year: 2008 },
        { company: 'PT. Bentang Pustaka (Jogjakarta)', type: 'Aplikasi Chat Internal', year: 2008 },
        { company: 'PT. Indosat (Pontianak)', type: 'Network Management System (NMS)', year: 2007 },
        { company: 'PT. Indosat (Banjarmasin)', type: 'Network Management System (NMS)', year: 2007 },
        { company: 'PT. XL (Jogjakarta)', type: 'Installasi BTS (RBS-Minilink)', year: 2007 },
        { company: 'PT. Indosat (Balikpapan)', type: 'Installasi Server NMS', year: 2006 },
        { company: 'PT. Telkomsel (Balikpapan)', type: 'Network Management System (NMS)', year: 2006 },
        { company: 'PT. Bima Nusa Internasional (Samarinda)', type: 'Software Logistik', year: 2006 },
        { company: 'PT. XL Axiata (Bali)', type: 'Installasi BTS (RBS-Minilink)', year: 2006 },
        { company: 'PT. Telkomsel (Banjarmasin)', type: 'Radio Frequency Interference (RFI)', year: 2006 },
        { company: 'PT. Gunung Garuda Steel (Bekasi)', type: 'Human Resource Information System (HRIS)', year: 2005 },
        { company: 'PT. Satunol Mikrosistem (Jakarta)', type: 'Sistem Monitoring Hardware', year: 2005 },
        { company: 'PT. Indosat (Jakarta)', type: 'Network Management System (NMS)', year: 2005 },
        { company: 'Universitas Tridharma (Balikpapan)', type: 'IT Support (PKPS BBM)', year: 2005 },
        { company: 'Dinas Kependudukan dan Catatan Sipil (Balikpapan)', type: 'Sistem Kependudukan (Simduk)', year: 2004 },
        { company: 'Melati Katering (Jogjakarta)', type: 'Software Penjualan Katering', year: 2004 },
        { company: 'Toko Komputer Amacom (Jogjakarta)', type: 'Software Penjualan Komputer', year: 2003 },
        { company: 'Toko Setia Hati Computer (Jogjakarta)', type: 'Software Penjualan Komputer', year: 2003 },
        { company: 'Hotel Hendri (Bangka Belitung)', type: 'Sistem Reservasi Hotel', year: 2003 },
        { company: 'PT. Elexmedia Computindo (Jakarta)', type: 'Software Akuntansi', year: 2003 },
        { company: 'Pangjati Rustic Furniture (Klaten)', type: 'Website Produk', year: 2000 }
    ]
};

const experienceSection = document.querySelector('.experience-section');
if (experienceSection) {
    const tableBody = document.getElementById('collaboration-data-container');
    const filterButtons = experienceSection.querySelectorAll('.filter-btn');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');
    const paginationContainer = experienceSection.querySelector('.pagination-container');

    let currentActiveData = [];
    let currentPage = 1;
    const rowsPerPage = 5; // Anda bisa ubah jumlah data per halaman di sini

    function displayPage() {
        tableBody.innerHTML = '';
        const totalPages = Math.ceil(currentActiveData.length / rowsPerPage);

        if (currentActiveData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Tidak ada data untuk periode ini.</td></tr>';
            paginationContainer.style.display = 'none';
            return;
        }

        paginationContainer.style.display = 'flex';

        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageData = currentActiveData.slice(startIndex, endIndex);

        pageData.forEach((item, index) => {
            const row = document.createElement('tr');
            // Penomoran berdasarkan posisi di halaman saat ini
            const itemNumber = startIndex + index + 1;
            row.innerHTML = `
                <td>${itemNumber}</td>
                <td>${item.company}</td>
                <td>${item.type}</td>
                <td>${item.year}</td>
            `;
            tableBody.appendChild(row);
        });

        pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    function applyFilter(range) {
        if (range === 'all') {
            currentActiveData = Object.values(collaborationData).flat().sort((a, b) => b.year - a.year);
        } else {
            currentActiveData = collaborationData[range] || [];
        }
        currentPage = 1; // Selalu reset ke halaman pertama saat filter berubah
        displayPage();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilter(button.dataset.range);
        });
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage();
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(currentActiveData.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayPage();
        }
    });

    // Inisialisasi: Tampilkan halaman pertama dari semua data saat dimuat
    applyFilter('all');
}

// Logika untuk Tombol Dropdown Tabel (tetap sama)
const toggleButton = document.querySelector('.btn-toggle-table');
if (toggleButton) {
    toggleButton.addEventListener('click', function() {
        const targetId = this.dataset.target;
        const tableContainer = document.querySelector(targetId);

        if (tableContainer) {
            this.classList.toggle('active');
            tableContainer.classList.toggle('show');
        }
    });
}