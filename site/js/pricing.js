$(document).ready(function () {
    const items = document.querySelectorAll('.faq .item');

    function toggleAccordion() {
        const itemToggle = this.classList.contains('active');

        for (i = 0; i < items.length; i++) {
            items[i].classList.remove("active");
        }

        if (!itemToggle) {
            this.classList.add('active');
        }
    }

    items.forEach((item) => item.addEventListener('click', toggleAccordion));
});


