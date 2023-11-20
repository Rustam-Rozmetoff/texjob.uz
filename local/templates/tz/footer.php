<?php

use Bitrix\Main\Page\Asset;



?>
<footer>
    <div style="background-color: #000000;">
        <table>
            <tr>
                <th style="margin: 10px 50px auto; float: left">
                    <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/footer/logo_img.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка логотип Footer')
                    ); ?>
                </th>
                <th style="text-align: left; color: white">
                    <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/footer/text.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Текст Footer')
                    ); ?>
                </th>
                <th style="text-align: right; width: 500px">
                    <div class="back">
                        <?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/footer/back.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Ссылка на верх Footer')
                        ); ?>
                    </div>
                </th>
            </tr>
        </table>
    </div>
</footer>
</body>
</html>