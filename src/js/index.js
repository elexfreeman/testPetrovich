var rest_server = 'http://test.kluatr.ru/api/user/login';
/*навешиваем слушателя на кнпку*/
document.getElementById("login-button").addEventListener("click", login, true);

/*событие обработки логина*/
function login(e) {
    var xhr = new XMLHttpRequest();
    var body = 'email=' + encodeURIComponent(document.getElementById("login").value) +
        '&password=' + encodeURIComponent(document.getElementById("pass").value);

    xhr.open("POST", rest_server, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    /*событие изменения статуса запроса*/
    xhr.onreadystatechange = function () {
        /*4: request finished and response is ready*/
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                /*все норм логин прошел*/
                loginComplete(JSON.parse(this.responseText).data);
            } else if (xhr.status === 400) {
                /*неверныйй логин*/
                loginError();
            } else {
                /*чтото с конектом или сервером или еще чего*/
                xhrError();
            }
        }
    };

    /*отправляем запрос*/
    xhr.send(body);
}

/*срабатывает если логин удачный*/
function loginComplete(user) {
    document.getElementById("login-done").classList.remove("hide");
    document.getElementById("login-form").classList.add("hide");
    document.getElementById("user-name").innerHTML += user.name;
}

/*срабатывает при ошибке ввода*/
function loginError() {
    document.getElementById("error-msg").classList.remove("hide");
}

/*в случае обрыва соединения или сервер не отвечает и тп*/
function xhrError() {
    alert("Что-то пошло не так")
}