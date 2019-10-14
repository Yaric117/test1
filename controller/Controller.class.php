<?php

class Controller
{

    public function index()
    { }

    //сортировка элемертов
    public function sort($arr, $sort)
    {
        function build_sorter($key)
        {
            return function ($a, $b) use ($key) {
                return strnatcmp($a[$key], $b[$key]);
            };
        }
        
        usort($arr, build_sorter($sort));
        return $arr;
    }

    //рендер шаблонов
    public static function render($file, $variables = [])
    {
        //если файл не существует, выкидываем ошибку
        if (!is_file($file)) {
            echo 'Template file "' . $file . '" not found';
            exit();
        }

        //если файл пустой, выкидываем ошибку
        if (filesize($file) === 0) {
            echo 'Template file "' . $file . '" is empty';
            exit();
        }

        //получаем содержимое шаблона
        $templateContent = file_get_contents($file);

        //если переменны не заданны, возвращаем шаблон как есть
        if (empty($variables)) {
            return $templateContent;
        }

        //проходимся по всем переменным
        foreach ($variables as $key => $value) {
            //преобразуе ключ из key в {{KEY}}
            $key = '{{' . strtoupper($key) . '}}';

            //заменяем все ключи в шаблоне
            $templateContent = str_replace($key, $value, $templateContent);
        }

        //возвращаем получившийся шаблон
        return $templateContent;
    }
}
