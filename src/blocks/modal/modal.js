class Modal {
    constructor() {
        this.modalBlock //активное модальное окно
        this.activeBtn //активная кнопка вызова окна (кнопка по которой было вызвано модальное окно)
        this.linksModal //все ссылки в модальном окне

        this.onChange = this.keyClick.bind(this) //для передачи this в метод

        this.init()
    }
    showModal(modalName) {
        this.modalBlock = document.getElementById(modalName)
        const modalWrapper = this.modalBlock.querySelector('.modal__wrapper')
        this.linksModal = modalWrapper.querySelectorAll('a[href]:not([disabled]), input:not([disabled]), textarea:not([disabled]), button:not([disabled])')

        this.modalBlock.classList.add('modal--active')
        modalWrapper.focus()

        document.body.style.cssText = `
            width: ${document.body.clientWidth}px;
            overflow: hidden;`

        document.addEventListener('keydown', this.onChange)
    }
    hideModal() {
        this.modalBlock.classList.remove('modal--active')
        this.modalBlock = null

        document.body.style.cssText = ''

        if ( this.activeBtn ) {
            this.activeBtn.focus()
            this.activeBtn = null
        }

        document.removeEventListener('keydown', this.onChange)
    }
    keyClick(e) {
        console.log('click')
        if (this.modalBlock && e.code === `Escape`) this.hideModal()

        if ( e.shiftKey && e.key === 'Tab') this.prevElementFocus(e)
        else if (e.key === 'Tab') this.nextElementFocus(e)
    }
    nextElementFocus(e) {
        if ( document.activeElement === this.linksModal[this.linksModal.length - 1] ) {
            e.preventDefault()

            this.linksModal[0].focus()
        }
    }
    prevElementFocus(e) {
        if ( document.activeElement === this.linksModal[0] ) {
            e.preventDefault()

            this.linksModal[this.linksModal.length - 1].focus()
        }
    }

    init() {
        document.addEventListener('click', ({target}) => {
            const   btnCallModal = target.closest('[data-open-modal]'),
                    btnCloseModal = target.closest('[data-close-modal]')

            if ( btnCallModal ) {
                this.activeBtn = btnCallModal
                this.showModal(btnCallModal.getAttribute('aria-controls'))
            }
            if ( this.modalBlock && ( btnCloseModal || target.matches('.modal--active') )) {
                this.hideModal()
            }
        })
    }
}


const modal = new Modal()