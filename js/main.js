      const menuBtn = document.getElementById('menu-btn');
      const menuMovil = document.getElementById('mobile-menu');
      const overlay = document.getElementById('menu-overlay');
      const hamburguesa = document.getElementById('icon-hamburger');
      const cerrar = document.getElementById('icon-close');

      function toggleMenu() {
        menuMovil.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
        hamburguesa.classList.toggle('hidden');
        cerrar.classList.toggle('hidden');

        document.body.classList.toggle('overflow-hidden');
      }