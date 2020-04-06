'use strict'
//сортировка
const sort = document.querySelector('.form-sort');
const siteUrl = '';
if (sort) {
    sort.addEventListener('change', () => {
        //sort.submit();
        //e.preventDefault();
        let formData = new FormData(sort);
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
                document.location.reload(true);
            }).catch((err) => {
                alert('Error')
            });
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
let patternName = '^[A-Za-zА-Яа-яЁё\\s]+$';
const tamplateFormAdd = `
<form class='row justify-content-center mt-5 subscribe-form' action='' method="POST">
    <div class='col-md-8'>
        <div class='form-group'>
            <input id='name' class='form-control' name='name' type='text' required pattern="${patternName}" placeholder="*Ваше имя:">
            <small id="emailHelp" class="form-text text-muted">Только русские буквы.</small>
        </div>
        <div class='form-group'>
            <input id='email' class='form-control' name='email' type='email' required placeholder="*email:">
        </div>
        <div class='form-group d-none'>
            <input class='form-control' name='surname' type='text'>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" name='text' required placeholder="*Текст задачи (не больше 300 символов):" rows="3" maxlength="300"></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary">
        <span class="spinner-border spinner-border-sm preload" role="status" aria-hidden="true"></span>
           Создать задачу
        </button>
    </div>
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
    <form class='row justify-content-center mt-5 subscribe-form' action='' method="POST">
        <div class='col-md-8'>
            <div class='form-group'>
                <input id='name' class='form-control' name='name-edit' type='text' required pattern="${patternName}"
                    value="${caption}">
            </div>
            <div class='form-group'>
                <input id='email' class='form-control' name='email-edit' type='email' required value="${email}">
            </div>
            <div class='form-group d-none'>
                <input class='form-control' name='surname' type='text'>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" name='text-edit' required rows="3"
                    maxlength="300">${txt}</textarea>
            </div>
            <div class="form-group form-check">
                <input name='end' type='checkbox' class="form-check-input" id='end' ${attr}>
                <label for="end">Задание выполнено</label>
            </div>
            <input class='subscribe-form-input f-item' type='hidden' name='id' value="${elem[i].getAttribute('id')}">
            <span class='preload'></span>
            <button type="submit" class="btn btn-primary">
            <span class="spinner-border spinner-border-sm preload" role="status" aria-hidden="true"></span>
            Сохранить</button>
        </div>
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