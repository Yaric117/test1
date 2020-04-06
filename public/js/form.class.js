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
                modal.style.display = 'block';
                modal.classList.add(this.animClass);
                modalContainer.innerHTML = this.formContent;

                this.fetch();

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

    /* FETCH */

    fetch() {

        const myForm = document.querySelector(this.formClass);
        let siteUrl = this.url;
        if (myForm) {
            myForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let msg = confirm("Опубликовать?");
                if (msg) {
                    this.preload();
                    const formData = new FormData(myForm);
                    fetch(siteUrl, {
                        method: 'post',
                        body: formData
                    }).then(function (response) {

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
        }
    }

    // прелоад

    preload() {
        let elemPreload = document.querySelector('.preload');
        if (elemPreload) {
            elemPreload.style.opacity = '1';
        }
    }

    callMethods() {
        this.modalForm();
    }
}


class ReviewsForm extends FormInModal {
    constructor() {
        super();
    }

    fetch() {
        const myForm = document.querySelector(this.formClass);
        let siteUrl = this.url;
        myForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let msg = confirm("Опубликовать?");
            if (msg) {
                this.preload();
                const formData = new FormData(myForm);
                formData.append('stars', this.stars());
                fetch(siteUrl, {
                    method: 'post',
                    body: formData
                }).then(function (response) {
                    this.preloadDelete();
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
    }

    stars() {
        let elem = document.querySelectorAll('.stars-cont'),
            elem2 = document.querySelectorAll('.star');
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener('click', () => {
                elem2.forEach(element => {
                    if (element.classList.contains('star-select')) {
                        element.classList.remove('star-select')
                    }

                });
                for (let j = i + 1; j < elem.length; j++) {

                    elem2[j].classList.add('star-select')

                }

                console.log(i + 1);
                return (i + 1);
            })
        }
    }
}