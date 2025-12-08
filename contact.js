document.addEventListener("DOMContentLoaded", () => {
    function setupDropdown(config) {
        const container = document.getElementById(config.containerId);
        const displayBtn = container ? container.querySelector(config.displayClass) : null;
        const textSpan = container ? container.querySelector(config.textId) : null;
        const dropdownList = container ? container.querySelector(config.listClass) : null;
        const hiddenInput = document.getElementById(config.inputId);

        if (container && displayBtn && dropdownList) {
            displayBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                document.querySelectorAll('.inquiry-dropdown-list.show, .occasion-dropdown-list.show').forEach(list => {
                    if (list !== dropdownList) {
                        list.classList.remove('show');
                        list.parentElement.classList.remove('open');
                    }
                });
                dropdownList.classList.toggle('show');
                container.classList.toggle('open');
            });
            dropdownList.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    const selectedItem = e.target;
                    const value = selectedItem.dataset.value;
                    const text = selectedItem.textContent;

                    if (textSpan) textSpan.textContent = text;
                    displayBtn.style.color = 'var(--text)';

                    if (hiddenInput) hiddenInput.value = value;

                    dropdownList.classList.remove('show');
                    container.classList.remove('open');

                    dropdownList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                    selectedItem.classList.add('selected');

                    e.stopPropagation();
                }
            });
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    dropdownList.classList.remove('show');
                    container.classList.remove('open');
                }
            });
        }
    }
    setupDropdown({
        containerId: 'inquiry-type',
        displayClass: '.inquiry-display',
        textId: '#inquiry-text-display',
        listClass: '.inquiry-dropdown-list',
        inputId: 'inquiry-hidden-input'
    });
    setupDropdown({
        containerId: 'occasion-type',
        displayClass: '.occasion-display',
        textId: '#occasion-text-display',
        listClass: '.occasion-dropdown-list',
        inputId: 'occasion-hidden-input'
    });
});