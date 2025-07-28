document.addEventListener('DOMContentLoaded', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.navbar-nav');
    
    // --- Mobile Menu Toggler ---
    if (toggler && navMenu) {
        toggler.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });
    }
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main > section[id]'); // Wählt alle Sections in <main> aus
    const navLinks = document.querySelectorAll('.main-header .navbar-nav .nav-link');

    const observer = new IntersectionObserver((entries) => {
        let activeSectionId = null;

        // Finde die letzte sichtbare Section
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSectionId = entry.target.getAttribute('id');
            }
        });

        // Setze den Active-Status für alle Links
        navLinks.forEach(link => {
            const linkHrefId = link.getAttribute('href').substring(1);
            // Mache den Link nur dann aktiv, wenn seine Section sichtbar ist
            // UND diese Section nicht die Hero-Section ist.
            if (activeSectionId && linkHrefId === activeSectionId && activeSectionId !== 'hero') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

    }, { 
        rootMargin: '-40% 0px -60% 0px' // Aktiviert einen Link, wenn sein Section-Anfang die obere 40% des Bildschirms erreicht
    });

    if (sections.length > 0) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- Tab-Funktionalität & Höhen-Anpassung ---
    const tabsWrapper = document.querySelector('.tabs-wrapper');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContent = document.querySelector('.tab-content');

    function alignTabHeight() {
        if (tabsWrapper && tabButtons.length > 0 && tabContent && window.innerWidth > 992) {
            // Setze die Höhe des Inhalts-Containers auf die Höhe der Button-Leiste
            tabContent.style.height = tabsWrapper.querySelector('.tab-buttons').offsetHeight + 'px';
        } else if (tabContent) {
            // Auf Mobilgeräten Höhe zurücksetzen
            tabContent.style.height = 'auto';
        }
    }

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                const targetPane = document.querySelector('#' + tabId);

                // Active-Status für Buttons umschalten
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Active-Status für Inhalte umschalten
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });

        document.fonts.ready.then(() => {
            alignTabHeight();
        });
        
        // Passt die Höhe weiterhin an, wenn die Fenstergröße geändert wird.
        window.addEventListener('resize', alignTabHeight);
        
    }
});