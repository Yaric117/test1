'use strict'

class FormInModal {
    constructor(clickClass, tamplateForm, url = '') {

        this.modalClass = '.modal-window'; //класс основного модального окна
        this.modalContClass = '.modal-window-container'; //класс контейнера основного модального окна
        this.modalBtnCloseClass = '.modal-window-close'; //класс кнопки "Закрыть" основного модального окна
        this.clickClass = clickClass; //класс кнопки действия
        this.formClass = '.subscribe-form'; // класс формы
        this.url = url;
        this.animClass = 'anim-modal-window'; // класс анимации модального окна (без точки)
        this.modalAnswerClass = '.form-modal'; // класс модального окна ответа
        this.formContent = tamplateForm;

        this.callMethods();

    }

    modalForm() {

        let modal = document.querySelector(this.modalClass),
            btn = document.querySelector(this.clickClass);

        if (modal && btn) {
            let modalContainer = modal.querySelector(this.modalContClass),
                modalClose = modal.querySelector(this.modalBtnCloseClass);

            btn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.classList.add(this.animClass);
                modalContainer.innerHTML = this.formContent;

                /* FETCH */
                const myForm = document.querySelector(this.formClass);
                let siteUrl = this.url;
                myForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    let msg = confirm("Опубликовать?");
                    if (msg) {
                        preload();
                        const formData = new FormData(myForm);
                        fetch(siteUrl, {
                            method: 'post',
                            body: formData
                        }).then(function (response) {
                            preloadDelete();
                            if (response.status !== 200) {
                                alert('Форма не отправлена!')
                            }
                            return response.text();

                        }).then(function (data) {
                            window.location.reload();

                        }).catch(function (error) {
                            console.error(error);
                        })
                    }
                });


                // прелоад

                const preload = () => {
                    let elemPreload = document.querySelector('.preload');
                    if (elemPreload) {
                        elemPreload.style.opacity = '1';
                    }
                }

                //отмена прелоад

                const preloadDelete = () => {
                    let elemPreload = document.querySelector('.preload');
                    if (elemPreload) {
                        elemPreload.style.opacity = '0';
                    }
                }
            })

            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
                modal.classList.remove(this.animClass);
                modalContainer.innerHTML = '';
            })
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 27) {
                    modal.style.display = 'none';
                    modal.classList.remove(this.animClass);
                    modalContainer.innerHTML = '';
                }
            })
        } else {

            return false;
        }
    }

    callMethods() {
        this.modalForm();
    }
}