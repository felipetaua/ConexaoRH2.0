document.addEventListener('DOMContentLoaded', () => {
    const scheduleBtn = document.getElementById('schedule-interview-btn');
    const scheduleModal = document.getElementById('schedule-interview-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    const openModal = () => {
        if (scheduleModal) scheduleModal.classList.add('open');
    };

    const closeModal = () => {
        if (scheduleModal) scheduleModal.classList.remove('open');
    };

    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    if (scheduleModal) {
        scheduleModal.addEventListener('click', (event) => {
            if (event.target === scheduleModal) {
                closeModal();
            }
        });
    }

    const presentialCheckbox = document.getElementById('presential-interview');
    const interviewLinkGroup = document.getElementById('interview-link-group');
    const interviewAddressGroup = document.getElementById('interview-address-group');

    const toggleInterviewFields = () => {
        if (presentialCheckbox && interviewLinkGroup && interviewAddressGroup) {
            if (presentialCheckbox.checked) {
                interviewLinkGroup.classList.add('hidden');
                interviewAddressGroup.classList.remove('hidden');
            } else {
                interviewLinkGroup.classList.remove('hidden');
                interviewAddressGroup.classList.add('hidden');
            }
        }
    };

    if (presentialCheckbox) {
        presentialCheckbox.addEventListener('change', toggleInterviewFields);
    }

    toggleInterviewFields();
});