<?php

class LoginController extends Controller
{
    public function index()
    {
        $login = $_POST['login'];
        $password = $_POST['password'];
        $chek = $_POST['save'];

        if (!empty($chek)) {
            setcookie("login", $login, time() + (60 * 60 * 24 * 30));
            setcookie("password", $password, time() + (60 * 60 * 24 * 30));
        }
        if (!empty($_COOKIE['login']) && !empty($_COOKIE['password'])) {
            $login = $_COOKIE['login'];
            $password = $_COOKIE['password'];
        }

        $user = LoginModel::userCheck($login, $password);

        if ($user) {
            $_SESSION['login'] = $user;
            header('Location: /?path=admin');
        } else {
            $btn = $_POST['btn'];
            echo self::render(__DIR__ . '/../view/login.html');
            if ($btn && !$user) :
                echo "<p style='text-align:center; color:red;'>Неправильные логин или пароль!</p>";
            endif;
?>
            </div>
            </body>

            </html>
<?php
            die;
        }
    }
}
