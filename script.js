let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const slideInterval = 5000; // Ganti gambar setiap 5 detik (5000 milidetik)

        function showNextSlide() {
            
            slides[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.add('active');
        }

        
        slides[0].classList.add('active');

        
        setInterval(showNextSlide, slideInterval);

        const downloadsGrid = document.querySelector('.downloads-grid');
        const downloadGroup = document.querySelector('.download-group');
        if (downloadsGrid && downloadGroup) {
            downloadsGrid.classList.add('has-group');
        }
        


// --- Logika untuk Paginasi Tabel ---
const table = document.querySelector('.collaboration-table');
if (table) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const rowsPerPage = 10; // jumlah baris per halaman
    let currentPage = 1;
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    function displayPage(page) {
        
        rows.forEach(row => row.style.display = 'none');

        
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




    


