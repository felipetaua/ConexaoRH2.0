document.addEventListener('DOMContentLoaded', () => {
    const scheduleBtn = document.getElementById('schedule-interview-btn');
    const scheduleModal = document.getElementById('schedule-interview-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveInterviewBtn = document.getElementById('save-interview-btn');
    const interviewForm = document.querySelector('#schedule-interview-modal form');

    const openModal = () => {
        if (scheduleModal) scheduleModal.classList.add('open');
    };

    const closeModal = () => {
        if (scheduleModal) {
            scheduleModal.classList.remove('open');
            if (interviewForm) interviewForm.reset(); 
            toggleInterviewFields(); 
        }
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

    // --- LÓGICA DO CALENDÁRIO (FullCalendar) ---
    const calendarEl = document.getElementById('calendar');

    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'pt-br',
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek'
            },
            buttonText: {
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                list: 'Lista'
            },
            events: [
                {
                    title: 'Entrevista: Juliana M.',
                    start: '2025-06-10T14:00:00',
                    color: 'var(--primary-color)'
                },
                {
                    title: 'Entrevista: Carlos E.',
                    start: '2025-06-11T10:30:00',
                    color: 'var(--primary-color)'
                }
            ],
            editable: true,
            selectable: true,
            navLinks: true,
            dayMaxEvents: true, 
        });

        calendar.render();

        const calendarPane = document.getElementById('calendario');
        if (calendarPane) {
            const observer = new MutationObserver(() => {
                if (calendarPane.classList.contains('active')) {
                    setTimeout(() => {
                        calendar.updateSize();
                    }, 150); 
                }
            });

            observer.observe(calendarPane, {
                attributes: true,
                attributeFilter: ['class']
            });
        }

        if (saveInterviewBtn) {
            saveInterviewBtn.addEventListener('click', () => {
                const candidateSelect = document.getElementById('candidate');
                const candidateName = candidateSelect.options[candidateSelect.selectedIndex].text;
                const interviewDate = document.getElementById('interviewDate').value;
                const interviewTime = document.getElementById('interviewTime').value;

                if (!candidateName || candidateName === 'Selecione o candidato' || !interviewDate || !interviewTime) {
                    alert('Por favor, preencha o candidato, a data e o horário da entrevista.');
                    return;
                }

                calendar.addEvent({
                    title: `Entrevista: ${candidateName}`,
                    start: `${interviewDate}T${interviewTime}`,
                    allDay: false,
                    color: 'var(--primary-color)'
                });

                closeModal();
            });
        }
    }
});