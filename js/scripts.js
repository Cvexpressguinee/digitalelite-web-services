document.addEventListener("DOMContentLoaded", function() {
    // Éléments du modal
    const btnCommander = document.getElementById('btn-commander');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');

    // Vérification de l'existence des éléments
    if (btnCommander && modal && modalClose) {
        // Ouvrir le modal
        btnCommander.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Empêcher le défilement
        });

        // Fermer le modal avec le bouton X
        modalClose.addEventListener('click', function() {
            closeModal();
        });

        // Fermer le modal en cliquant en dehors
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Fermer le modal avec la touche Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    } else {
        console.error("Éléments manquants : Vérifiez l'existence des boutons/modal");
    }

    // Fonction pour fermer le modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactiver le défilement
    }

    // Animation smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Effet de parallaxe sur le hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Animation des blocs d'offres au scroll
    const offerBlocks = document.querySelectorAll('.offer-block');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    offerBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(50px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(block);
    });
});
