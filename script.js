// FILTER FADE ANIMATION

function hideCardWithFade(card) {
    if (!card) return;
    
    if (card.classList.contains('hidden')) return;

    card.classList.add('fade-out')

    const onTransitionEnd = (e) => {
        if (e.propertyName === 'opacity') {
            card.classList.add('hidden');
            card.classList.remove('fade-out');
            card.removeEventListener('transitionend', onTransitionEnd);
        }
    };

    card.addEventListener('transitionend', onTransitionEnd);
}

function showCardWithFade(card) {
    if (!card) return;

    if (!card.classList.contains('hidden') && !card.classList.contains('fade-out')) return;

    card.classList.remove('hidden');
    card.classList.add('fade-out');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            card.classList.remove('fade-out');
        });
    });
}



// FILTER LOGIC

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter_btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');

            const category = (button.getAttribute('data-category') || '').toLowerCase();

            cards.forEach(card => {
                const cardCats = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/).filter(Boolean);

                if (category === 'all' || cardCats.includes(category)) {
                    if (card.classList.contains('hidden')) showCardWithFade(card);
                } else {
                    if (!card.classList.contains('hidden')) hideCardWithFade(card);
                }
            });
        });
    });

    const allBtn = document.querySelector('.filter_btn[data-category="all"]');
    if (allBtn) allBtn.click();
});

// TOGGLE MOBILE MENU

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile_menu_toggle');
    const navLinks = document.querySelector('.nav_links');

    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isExpanded));
        navLinks.classList.toggle('active');
    });
});

// FAQ ACCORDION

document.addEventListener('click', (e) => {
    if (e.target.closest('.faq_question')) {
        const btn = e.target.closest('.faq_question');
        const item = btn.closest('.faq_item');
        const allItems = Array.from(document.querySelectorAll('.faq_item'));

        allItems.forEach(it => {
            if (it !== item) it.classList.remove('active');
        });

        item.classList.toggle('active');
    }
});

// BACK TO TOP

(function() {
    const backBtn = document.getElementById('back_to_top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 320) backBtn.classList.add('visible');
        else backBtn.classList.remove('visible');
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    });
})();

// FILTER LOGIC FOR SUPPORT PAGES

document.addEventListener('DOMContentLoaded', () => {
    const ctaMenuButtons = document.querySelectorAll('.cta_menu_btn');

    if (ctaMenuButtons.length === 0) return;

    const cards = document.querySelectorAll('.grid_layout .card');

    ctaMenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            ctaMenuButtons.forEach(b => {
                b.classList.remove('active');
            });

            button.classList.add('active');

            const category = (button.getAttribute('data-category') || '').toLowerCase();

            cards.forEach(card => {
                const cardCats = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/).filter(Boolean);

                if (category === 'all' || cardCats.includes(category)) {
                    if (card.classList.contains('hidden')) showCardWithFade(card);
                } else {
                    if (!card.classList.contains('hidden')) hideCardWithFade(card);
                }
            });
        });
    });

    const allBtn = document.querySelector('.cta_menu_btn[data-category="all"]');
    if (allBtn) allBtn.classList.add('active');
});

// EXPANDABLE TEXT

.card_content package.extended {
    -webkit-line-clamp: unset;
}