<?php


class Model
{
    private static $table;

    function __construct($table)
    {
        $this->set($table);
    }

    public function set($table)
    {
        self::$table = $table;
    }

    public static function setRowCount()
    {
        $table = self::$table;
        $rowCount = db::getInstance()->Query("SELECT 1 FROM $table");
        return $rowCount->rowCount();
    }

    public static function setRowVew()
    {
        $rowView = 3;
        return $rowView;
    }

    public static function setPagination()
    {
        $paginationCount = ceil(self::setRowCount() / self::setRowVew());
        return $paginationCount;
    }

    //показываем записи задач
    function showTask()

    {
        $table = self::$table;
        $start = $_GET['id'] * self::setRowVew() - self::setRowVew() . ',';
        $rowView = self::setRowVew();
        $sql = "SELECT * FROM $table ORDER BY id DESC LIMIT $rowView";

        if ($_GET['id']) {
            $sql = "SELECT * FROM $table ORDER BY id DESC LIMIT $start $rowView";
        }

        return db::getInstance()->Select($sql);
    }

    //показываем пагинацию
    function paginationTask()
    {
        $count = 1;
        $arr = [];
        while ($count <= (self::setPagination())) {
            array_push($arr, $count);
            $count++;
        }
        return $arr;
    }

    //добавление задачи
    function addTask()
    {

        if (!empty($_POST['surname'])) {
            exit;
        }
        $table = self::$table;

        $caption = strip_tags($_POST['name']);
        $caption = htmlspecialchars($caption);
        //$caption = mysql_escape_string($caption);

        $email = strip_tags($_POST['email']);
        $email = htmlspecialchars($email);
        //$email = mysql_escape_string($email);

        $text = strip_tags($_POST['text']);
        $text = htmlspecialchars($text);
        //$text = mysql_escape_string($text);

        $sql = "INSERT INTO $table SET caption=:task, email=:email, txt=:txt";

        if (!empty($caption) || !empty($email) || !empty($text)) {

            return db::getInstance()->Query($sql, array('task' =>  $caption, 'email' => $email, 'txt' => $text));
        }
    }

    public function editTask()
    {
        if (!empty($_POST['surname'])) {
            exit;
        }
        $table = self::$table;
        $id = $_POST['id'];
        $end = $_POST['end'];

        $caption = strip_tags($_POST['name-edit']);
        $caption = htmlspecialchars($caption);
        //$caption = mysql_escape_string($caption);

        $email = strip_tags($_POST['email-edit']);
        $email = htmlspecialchars($email);
        //$email = mysql_escape_string($email);

        $text = strip_tags($_POST['text-edit']);
        $text = htmlspecialchars($text);
        //$text = mysql_escape_string($text);

        $sql = "UPDATE $table SET caption=:task, email=:email, txt=:txt, `status`=:st WHERE id = :id";

        if (!empty($caption) || !empty($email) || !empty($text) || !empty($end)) {
            if (!empty($end)) {
                $end = 1;
            }

            return db::getInstance()->Query($sql, array('task' =>  $caption, 'email' => $email, 'txt' => $text, 'st' => $end, 'id' => $id));
        }
    }

    public function dellTask()
    {
        $table = self::$table;
        $del = $_POST['dell'];
        $id = $_POST['id'];

        $sql = "DELETE FROM  $table WHERE id = :id";
        if (!empty($del)) {
            return db::getInstance()->Query($sql, array('id' => $id));
        }
    }
}
