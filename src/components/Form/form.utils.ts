const emailValid = (email: string) => {
    return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
} 


export function setupListener() {
    const formEl = document.getElementById('contact-form') as HTMLFormElement;
    const inputEls = Array.from<HTMLInputElement | HTMLTextAreaElement>(document.querySelectorAll('input, textarea'));

    setupFormListener(formEl, inputEls);
    setupInputElsListener(inputEls);  
}


export function setupFormListener(formEl: HTMLFormElement, inputEls: Array<HTMLInputElement | HTMLTextAreaElement>) {
    formEl?.addEventListener('submit', (evt) => {
        let isInvalid = false;
        let firstInvalidEl: HTMLInputElement | HTMLTextAreaElement | undefined;

        for (let inputEl of inputEls) {
            if (inputEl.value === '' || (inputEl.name === 'email' && !emailValid(inputEl.value))) {
                inputEl.classList.add('invalid');
                inputEl.classList.add('touched');
                isInvalid = true;
                if (!firstInvalidEl) {
                    firstInvalidEl = inputEl;
                }
            } else {
                inputEl.classList.remove('invalid');
            }

        }

        if (isInvalid) {
            evt.preventDefault();
            firstInvalidEl?.focus();
        }
    });
}

export function setupInputElsListener(inputEls: Array<HTMLInputElement | HTMLTextAreaElement>) {
    window.addEventListener('pageshow', () => {
        for (let inputEl of inputEls) {
            if (inputEl.value === '') {
                inputEl.classList.remove('has-input')
            } else {
                inputEl.classList.add('has-input')
            }
        }
    });

    for (let inputEl of inputEls) {
        inputEl.addEventListener('change', () => {
            if (inputEl.value === '') {
                inputEl.classList.remove('has-input')
            } else {
                inputEl.classList.add('has-input')
            }
        })
        inputEl.addEventListener('blur', () => {
            inputEl.classList.add('touched');
            if (inputEl.value === '' || (inputEl.name === 'email' && !emailValid(inputEl.value))) {
                inputEl.classList.add('invalid');
            } else {
                inputEl.classList.remove('invalid');
            }
        })
        inputEl.addEventListener('input', () => {
            if (inputEl.value === ''|| (inputEl.name === 'email' && !emailValid(inputEl.value))) {
                inputEl.classList.add('invalid');
            } else {
                inputEl.classList.remove('invalid');
            }
        })
    }

}