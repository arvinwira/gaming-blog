// cypress/e2e/SIT_ChronicReload.cy.js

describe('SIT - Alur Website Chronic Reload', () => {

    /**
     * Skenario 1: Navigasi Halaman Statis
     * Tujuan: Memastikan routing Next.js dan halaman statis utama terintegrasi
     * dan dapat dimuat.
     */
    describe('Skenario 1: Navigasi Halaman Statis', () => {
      it('Harus bisa memuat homepage dan bernavigasi ke halaman About & Contact', () => {
        // 1. Kunjungi Homepage
        cy.visit('http://localhost:3000/'); // Selalu gunakan URL lengkap di tes pertama
        
        // Verifikasi integrasi data: Cek apakah section "Featured Posts" ada
        cy.contains('h2', 'Featured Posts').should('be.visible');
  
        // 2. Navigasi ke Halaman About
        cy.contains('a', 'About').click();
        cy.url().should('include', '/about');
        // Verifikasi halaman About memuat
        cy.contains('h1', 'About Chronic Reload').should('be.visible');
  
        // 3. Navigasi ke Halaman Contact
        cy.contains('a', 'Contact').click();
        cy.url().should('include', '/contact');
        // Verifikasi halaman Contact memuat
        cy.contains('h1', 'Get In Touch').should('be.visible');
      });
    });
  
    /**
     * Skenario 2: Alur Membaca Blog (Integrasi Data Post)
     * Tujuan: Menguji alur dari Homepage -> Halaman Post -> Komponen Post
     * (Reading Progress Bar, More Posts).
     */
    describe('Skenario 2: Alur Membaca Blog', () => {
      it('Harus bisa membuka post dan memverifikasi komponen halaman post', () => {
        cy.visit('http://localhost:3000/');
  
        cy.wait(1000);

        // 1. Klik post pertama di "Recent Posts"
        cy.contains('h2', 'Recent Posts')
          .parent() // Dapatkan section "Recent Posts"
          .find('a[href*="/blog/"]') // Temukan link post di dalamnya
          .first() // Ambil yang pertama
          .click();
  
        // 2. Verifikasi Halaman Blog Post
        cy.url().should('include', '/blog/');
        cy.get('h1').should('be.visible'); // Cek judul post ada
  
        // 3. Verifikasi Integrasi Komponen: Reading Progress Bar
        // Cek progress bar ada
        cy.get('div[class*="fixed top-0"]').should('be.visible');
        
        // 4. Scroll ke bawah dan cek integrasi progress bar
        cy.scrollTo('bottom', { duration: 1000 }); // Scroll pelan
        
  
        // 5. Verifikasi Integrasi Komponen: "You May Also Like"
        cy.contains('h2', 'You May Also Like').should('be.visible');
        cy.contains('h2', 'You May Also Like')
          .parent()
          .find('a[href*="/blog/"]')
          .should('have.length.at.least', 1); // Pastikan ada setidaknya 1 post
      });
    });
  
    /**
     * Skenario 3: Integrasi Filter Kategori
     * Tujuan: Menguji integrasi state (URL query params) dengan data
     * yang ditampilkan di halaman Kategori.
     */
    describe('Skenario 3: Alur Filter Kategori', () => {
      it('Harus memfilter post saat kategori di klik', () => {
        cy.visit('http://localhost:3000/categories');
        cy.contains('h1', 'Categories').should('be.visible');
  
        // 1. Klik sebuah kategori (Ganti 'Indie' jika perlu)
        cy.contains('Indie', { matchCase: false }).click();

        // 2. Verifikasi integrasi URL (URL harus berisi query param)
        cy.url().should('include', '?category=Indie');
  
        // 3. Verifikasi integrasi data yang ditampilkan
        // Cek setiap card post yang tampil, pastikan memiliki tag 'Review'
        cy.get('a[href*="/blog/"]').each(($card) => {
          cy.wrap($card).find('span').should('contain', 'Indie');
        });
  
        // 4. Verifikasi tombol "All Posts"
        cy.contains('All Posts', { matchCase: false }).click();
        cy.url().should('not.include', '?category=');
      });
    });
  

    
  });