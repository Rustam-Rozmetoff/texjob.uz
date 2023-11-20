<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Page\Asset;

global $APPLICATION;
?>

<!doctype html>
<html xml:lang="<?php echo LANGUAGE_ID; ?>" lang="<?php echo LANGUAGE_ID; ?>">
<head>
    <?php
    Asset::getInstance()->addString('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/asset/css/app.css');
    Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . '/asset/js/combo.js');
    $APPLICATION->ShowHead();
    ?>
    <title><?php $APPLICATION->ShowTitle(); ?></title>
</head>
