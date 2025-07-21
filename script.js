let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const slideInterval = 5000; // Ganti gambar setiap 5 detik (5000 milidetik)

        function showNextSlide() {
            // Sembunyikan slide yang sedang aktif
            slides[currentSlide].classList.remove('active');
            
            // Pindah ke slide berikutnya, kembali ke awal jika sudah di akhir
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Tampilkan slide baru
            slides[currentSlide].classList.add('active');
        }

        // Tampilkan slide pertama saat halaman dimuat
        slides[0].classList.add('active');

        // Mulai interval untuk menggeser slide secara otomatis
        setInterval(showNextSlide, slideInterval);

        const downloadsGrid = document.querySelector('.downloads-grid');
        const downloadGroup = document.querySelector('.download-group');
        if (downloadsGrid && downloadGroup) {
            downloadsGrid.classList.add('has-group');
        }
        // Logika untuk Tombol Dropdown Tabel
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

// --- Logika untuk Paginasi Tabel ---
const table = document.querySelector('.collaboration-table');
if (table) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const rowsPerPage = 5; // Atur jumlah baris per halaman di sini
    let currentPage = 1;
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    function displayPage(page) {
        // Sembunyikan semua baris
        rows.forEach(row => row.style.display = 'none');

        // Tampilkan baris untuk halaman saat ini
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageRows = rows.slice(startIndex, endIndex);
        pageRows.forEach(row => row.style.display = ''); // '' akan mengembalikan ke default (table-row)

        // Update info halaman dan status tombol
        pageInfo.textContent = `Halaman ${page} dari ${totalPages}`;
        prevButton.disabled = page === 1;
        nextButton.disabled = page === totalPages;
    }

    // Event listener untuk tombol
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    // Tampilkan halaman pertama saat dimuat
    if(totalPages > 0) {
        displayPage(1);
    } else {
        // Sembunyikan paginasi jika tidak ada data
        document.querySelector('.pagination-container').style.display = 'none';
    }
}


// --- Logika untuk Filter Tabel dengan tbody ---
const experienceSection = document.querySelector('.experience-section');
if (experienceSection) {
    const filterButtons = experienceSection.querySelectorAll('.filter-btn');
    const allTbody = experienceSection.querySelectorAll('.collaboration-table tbody');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update tampilan tombol aktif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const range = button.dataset.range;

            // Sembunyikan semua tbody terlebih dahulu
            allTbody.forEach(tbody => tbody.style.display = 'none');

            if (range === 'all') {
                // Tampilkan semua jika tombol "Semua" diklik
                allTbody.forEach(tbody => tbody.style.display = ''); // '' mengembalikan ke default
            } else {
                // Tampilkan hanya tbody yang sesuai
                const targetTbody = document.getElementById(`data-${range}`);
                if (targetTbody) {
                    targetTbody.style.display = '';
                }
            }
        });
    });

    // Inisialisasi: Tampilkan semua data saat pertama kali dimuat
    allTbody.forEach(tbody => tbody.style.display = '');
}


