<?php

class Config
{
    private static $configCache = [];

    public static function get($parameter)
    {
        session_start();
        
        if (!isset(self::getCurrentConfiguration()[$parameter])) {
            throw new Exception('Parameter ' . $parameter . ' does not exists');
        }
        return self::getCurrentConfiguration()[$parameter];
    }

    private static function getCurrentConfiguration()
    {
        if (empty(self::$configCache)) {
            $configDir = __DIR__ . '/../core/';
            $configMain = $configDir . 'config.php';
            if (is_file($configMain)) {
                require_once $configMain;
            } else {
                throw new Exception('Unable to find configuration file');
            }
            if (empty($config) || !is_array($config)) {
                throw new Exception('Unable to load configuration');
            }
            self::$configCache = $config;
        }
        return self::$configCache;
    }
}
?>