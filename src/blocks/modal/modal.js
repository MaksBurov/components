class Modal {
    constructor() {
        this.modalBlock
        this.activeBtn
        // this.activeModal
        this.linksModal

        this.init()
    }
    showModal(modalName) {
        this.modalBlock = document.getElementById(modalName)

        const   modalWrapper = this.modalBlock.querySelector('.modal__wrapper'),
                linksModal = modalWrapper.querySelectorAll('a[href]:not([disabled]), input:not([disabled]), textarea:not([disabled]), button:not([disabled])')

        this.modalBlock.classList.add('modal--active')
        modalWrapper.focus()

        document.body.style.cssText = `
            width: ${document.body.clientWidth}px;
            overflow: hidden;`
    }
    hideModal() {
        this.modalBlock.classList.remove('modal--active')
        document.body.style.cssText = ''

        if ( this.activeBtn ) {
            this.activeBtn.focus()
            this.activeBtn = null
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
            if ( btnCloseModal ) {
                this.hideModal()
            }


        })

        document.addEventListener('keyup', e => {
            console.log(document.activeElement)
        })
    }
}

const modal = new Modal()