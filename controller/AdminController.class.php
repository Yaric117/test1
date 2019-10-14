<?php

class AdminController extends Controller
{

    public function index()
    {
        LoginModel::logIn();

        switch ($_POST['sort']) {
            case 'caption':
                setcookie('sort', '', time() - 3600);
                setcookie('sort', 'caption', time() + 3600, '/');
                //header("Refresh:0");
                break;
            case 'email':
                setcookie('sort', '', time() - 3600);
                setcookie('sort', 'email', time() + 3600, '/');
                //header("Refresh:0");
                break;
            case 'status':
                setcookie('sort', '', time() - 3600);
                setcookie('sort', 'status', time() + 3600, '/');
                //header("Refresh:0");
                break;
        }

        $a = $_COOKIE['sort'];
        echo self::render(__DIR__ . '/../view/admin/header.html'); //header

        $q = new Model('task');
        $q->addTask();
        $q->editTask();
        $q->dellTask();
        $render = self::sort($q->showTask(), $a);
        ?>
            <div class='content-task'>
                <?php foreach ($render as $key) :
                            $status = '';
                            if ($key['status'] != 0) :
                                $status = 'решена';
                            endif;
                            echo self::render(__DIR__ . '/../view/admin/index.html', [
                                'CAPTION' => $key['caption'],
                                'EMAIL' => $key['email'],
                                'TEXT' => $key['txt'],
                                'ID' => $key['id'],
                                'STATUS' => $status
                            ]);
                        endforeach;
                        ?>
            </div>
            <div class='pagination-container'>

                <?php foreach ($q->paginationTask() as $key) :
                            echo self::render(__DIR__ . '/../view/pagination.html', [
                                'PAGINATION' => $key,
                                'URL' => '?path=admin/' . $key
                            ]);
                        endforeach ?>
            </div>


        <?php
                $selCap = '';
                $selEmail = '';
                $selSt = '';

                switch ($a) {
                    case 'caption':
                        $selCap = 'selected';
                        $selEmail = '';
                        $selSt = '';
                        break;
                    case 'email':
                        $selCap = '';
                        $selEmail = 'selected';
                        $selSt = '';
                        break;
                    case 'status':
                        $selCap = '';
                        $selEmail = '';
                        $selSt = 'selected';
                        break;
                }

                echo self::render(__DIR__ . '/../view/footer.html', [
                    'SELECCAP' => $selCap,
                    'SELECEMAIL' => $selEmail,
                    'SELECST' =>  $selSt

                ]); //footer
            }
        }
