<?php
spl_autoload_register("gbStandardAutoload");

function gbStandardAutoload($className)
{
    $dirs = [
        'controller',
        'model',
        'core'
    ];
    $found = false;
    foreach ($dirs as $dir) {
        $fileName = __DIR__ . '/../' . $dir . '/' . $className . '.class.php';
        if (is_file($fileName)) {

            require_once($fileName);
            $found = true;
        }
    }
		
    if (!$found) {
        throw new Exception('Unable to load ' . $className);
    }
    return true;
}

