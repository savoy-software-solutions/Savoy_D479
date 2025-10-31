// FILTER FADE ANIMATION

function hideCardWithFade(card) {
    if (!card) return;
    card.classList.add('fade-out');
    const onTransitionEnd = (e) => {
        if (e.propertyName === 'opacity') {
            card.classList.add('hidden');
            card.removeEventListener('transitionend', onTransitionEnd);
            card.classList.remove('fade-out');
        }
    };
    card.addEventListener('transitioned', onTransitionEnd);
}

function showCardWithFade(card) {
    if (!card) return;
    card.classList.remove('hidden');
    card.offsetHeight;
    card.classList.remove('fade-out');
}

// FILTER LOGIC

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter_btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(b => {b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');

            const category = (button.getAttribute('data_category') || '').toLowerCase();

            cards.forEach(card => {
                const cardCats = (card.getAttribute('data_category') || '').toLowerCase().split(/\s+/).filter(Boolean);

                if (category === 'all' || cardCats.includes(category)) {
                    if (card.classList.contains('hidden')) showCardWithFade(card);
                } else {
                    if (!card.classList.contains('hidden')) hideCardWithFade(card);
                }
            });
        });
    });

    document.querySelectorAll('.filter_btn[data_category="all"]').forEach(b => b.click());
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

    backBtn.addEventListener('clicki', () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    });
})();