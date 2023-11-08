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
    const formContainer = document.getElementById('contact-form');
    const loadingContainer = document.getElementById('contact-loading');
    const successContainer = document.getElementById('contact-success');
    const errorContainer = document.getElementById('contact-error');
    
    formEl?.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        let isInvalid = false;
        let firstInvalidEl: HTMLInputElement | HTMLTextAreaElement | undefined;

        let formValues: any = {};
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
                formValues[inputEl.name] = inputEl.value;
            }

        }

        if (isInvalid) {
            firstInvalidEl?.focus();
        } else {
            loadingContainer?.classList.remove('hidden');
            loadingContainer?.classList.add('flex');
            formContainer?.classList.add('hidden');

            let success;
            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(formValues),
                    headers: {
                        'Content-Type': 'application/json', // Set the Content-Type to 'application/json'
                    },
                });
                success = res.status === 201;
            } catch (e) {
                success = false;
                console.log('Error while doing /api/contact request');
            }

            loadingContainer?.classList.add('hidden');
            loadingContainer?.classList.remove('flex');

            if (success) {
                successContainer?.classList.remove('hidden');
            } else {
                errorContainer?.classList.remove('hidden');
            }
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