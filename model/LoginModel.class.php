<?php
class LoginModel
{
    /*
     *
     * вход в админку*/

    public static function logIn()
    {
        if ($_GET['out'] == 'login') {
            self::sessionDie();
        }

        if (!isset($_SESSION['login'])) {
            header('Location: /?path=login');
            die;
        }
    }
    /*
     *
     * проверка пользователя */

    public function userCheck($login, $password)
    {
        $sql = "SELECT * FROM users WHERE login_ = :log_ AND password_ = :pass  LIMIT 1";
        $password = md5($password);

        return db::getInstance()->Check($sql, array('log_' =>  $login, 'pass' => $password));
    }
    /*
     *
     * удаление сессии */

    public function sessionDie()
    {
        if (session_id()) {
            unset($_COOKIE['login']);
            setcookie('login', null, -1, '/');
            unset($_COOKIE['password']);
            setcookie('password', null, -1, '/');
            session_destroy();
            header('Location: /?path=login');
        }
    }
}
