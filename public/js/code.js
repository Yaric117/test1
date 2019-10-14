//'use strict'
//сортировка
const sort = document.querySelector('.form-sort');
const siteUrl = '';
if (sort) {
    sort.addEventListener('change', () => {
        sort.submit();
    });
}

//модальное окно
const modalWindow = (modalClass, modalContClass, modalBtnCloseClass, imgIcoClass = '', animClass = 'anim-modal-window') => {
    let modal = document.querySelector(modalClass)

    if (modal) {
        let imgIco = document.querySelectorAll(imgIcoClass),
            modalContainer = modal.querySelector(modalContClass),
            modalClose = modal.querySelector(modalBtnCloseClass)
        for (let i = 0; i < imgIco.length; i++) {
            imgIco[i].addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.classList.add(animClass)
                modalContainer.innerHTML = `<img src='${imgIco[i].src}'>`;
            })
        }
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.classList.remove(animClass)
            modalContainer.innerHTML = '';
        })
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                modal.style.display = 'none';
                modal.classList.remove(animClass)
                modalContainer.innerHTML = '';
            }
        })
    } else {
        return false
    }
}

//форма добавления задания;
let patternName = '[A-Za-zА-Яа-яЁё]{2,}';
const tamplateFormAdd = `
        <form class='subscribe-form f-col' action='' method="POST">
            <div class='input-container f-item-cont'>
                <input id='name' class='subscribe-form-input f-item' name='name' type='text' required
            pattern="${patternName}" placeholder="*Ваше имя:">
                <input id='email' class='subscribe-form-input f-item' name='email' type='email' required
            placeholder="*email:" >
                <input class='subscribe-form-input f-item' name='surname' type='text'>
                <textarea class='subscribe-form-input f-item' name='text' required placeholder="*Текст задачи (не больше 300 символов):" rows="80" maxlength="300"></textarea>
            </div>
                <span class='preload'></span>
            <input class='subscribe-form-buttom' type='submit'>
          </form>`;


new FormInModal('#add', tamplateFormAdd);

//редактирование задания;
const editTask = () => {
    let elem = document.querySelectorAll('.item-edit');
    for (let i = 0; i < elem.length; i++) {
        let caption = elem[i].querySelector('.item-caption').innerHTML,
            email = elem[i].querySelector('.item-email').innerHTML,
            txt = elem[i].querySelector('.item-text').innerHTML,
            btn = elem[i].querySelector('.btn'),
            btnId = btn.getAttribute('id'),
            status = elem[i].querySelector('.status'),
            attr = '';
        if (status.innerHTML !== '') {
            attr = 'checked';
        }
        const tamplateFormEdit = `
            <form class='subscribe-form f-col' action='' method="POST">
                <div class='input-container f-item-cont'>
                    <input id='name' class='subscribe-form-input f-item' name='name-edit'required type='text'  pattern="${patternName}" value="${caption}">
                    <input id='email' class='subscribe-form-input f-item' name='email-edit' required type='email' value="${email}">
                    <input class='subscribe-form-input f-item' name='surname' type='text'>
                    <textarea class='subscribe-form-input f-item'  name='text-edit' required placeholder="*Текст задачи (не больше 300 символов):" rows="80" maxlength="300">${txt}</textarea>
                    <input class='subscribe-form-input f-item' type='hidden' name='id' value="${elem[i].getAttribute('id')}">
                    <div class='f-item chek-edit'>
                         <input name='end' type='checkbox' id='end' ${attr}>
                         <label for="end">Задание выполнено</label>
                    </div>
                </div>
                    <span class='preload'></span>
                <input class='subscribe-form-buttom' type='submit'>
              </form>`;

        new FormInModal(`#${btnId}`, tamplateFormEdit);
    }
}

editTask();

//удаление
const dell = document.querySelectorAll('.dell');

if (dell) {
    for (let i = 0; i < dell.length; i++) {
        let dataId = dell[i].getAttribute('id-data');
        dell[i].addEventListener('click', () => {
            //e.preventDefault();
            let message = confirm('Удалить выбранный элемент?')
            if (message) {
                let formData = new FormData();
                formData.append('dell', 'delete');
                formData.append('id', dataId);
                fetch(siteUrl, {
                        method: 'post',
                        body: formData
                    })
                    .then((response) => {
                        if (response.status !== 200) {
                            alert('Ошибка отправки данных!')
                        }
                        return response.text();
                    }).then((data) => {
                        window.location.reload();
                    }).catch((err) => {
                        alert('Error')
                    });
            }

        });
    }

}