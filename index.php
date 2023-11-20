<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle(""); ?><?php
$APPLICATION->SetTitle("");
$APPLICATION->ShowPanel(); ?>
<div>
	<table class="navbar">
	<tbody>
	<tr>
		<th width="40%">
 <a href="#Home">
			<?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/header/logo.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Логотип')
                    ); ?> </a>
		</th>
		<th>
			 <?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"main_menu",
	Array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "top",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(0=>"",),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "top",
		"USE_EXT" => "N"
	)
);?>
		</th>
	</tr>
	</tbody>
	</table>
</div>
 <!--Home--> <section class="main" id="Home"><br>
 <br>
 <br>
 <br>
<table>
<thead>
<tr class="text_th">
	<th>
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/header/hello.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Заголовок приветствие')
                    ); ?> <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/header/hellotext.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Текст приветствия')
                    ); ?> <br>
			<div class="mess">
				 <?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/header/button_send.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Кнопка отправки сообщения')
                        ); ?>
			</div>
		</div>
	</th>
	<th>
		<div class="logo_img">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/header/hello_img.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка приветствия')
                    ); ?>
		</div>
	</th>
</tr>
</thead>
</table>
 </section>
<!--Work--> <section id="Work"><br>
 <br>
<h1><br>
 <br>
 <?php $APPLICATION->IncludeFile(
            SITE_TEMPLATE_PATH . '/include/work/head.php',
            array(),
            array('MODE' => 'text', 'NAME' => 'Заголовок Work')
        ); ?>
</h1>
<table class="work_menu">
<tbody>
<tr>
	<th width="80%">
		 <?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"menu_work",
	Array(
		"ALLOW_MULTI_SELECT" => "Y",
		"CHILD_MENU_TYPE" => "left",
		"COMPONENT_TEMPLATE" => "menu_work",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "left",
		"USE_EXT" => "N"
	)
);?>
	</th>
	<th>
        <?php $APPLICATION->IncludeFile(
            SITE_TEMPLATE_PATH . '/include/work/filter.php',
            array(),
            array('MODE' => 'text', 'NAME' => 'Фильтр заголовка Work')
        ); ?>
	</th>
</tr>
</tbody>
</table>


    <?$APPLICATION->IncludeComponent(
        "bitrix:news.list",
        "work",
        Array(
            "ACTIVE_DATE_FORMAT" => "d.m.Y",
            "ADD_SECTIONS_CHAIN" => "N",
            "AJAX_MODE" => "N",
            "AJAX_OPTION_ADDITIONAL" => "",
            "AJAX_OPTION_HISTORY" => "N",
            "AJAX_OPTION_JUMP" => "N",
            "AJAX_OPTION_STYLE" => "Y",
            "CACHE_FILTER" => "N",
            "CACHE_GROUPS" => "Y",
            "CACHE_TIME" => "36000000",
            "CACHE_TYPE" => "A",
            "CHECK_DATES" => "Y",
            "DETAIL_URL" => "",
            "DISPLAY_BOTTOM_PAGER" => "N",
            "DISPLAY_DATE" => "Y",
            "DISPLAY_NAME" => "Y",
            "DISPLAY_PICTURE" => "Y",
            "DISPLAY_PREVIEW_TEXT" => "Y",
            "DISPLAY_TOP_PAGER" => "N",
            "FIELD_CODE" => array(0=>"",1=>"",),
            "FILTER_NAME" => "",
            "HIDE_LINK_WHEN_NO_DETAIL" => "N",
            "IBLOCK_ID" => "3",
            "IBLOCK_TYPE" => "landing",
            "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
            "INCLUDE_SUBSECTIONS" => "Y",
            "MESSAGE_404" => "",
            "NEWS_COUNT" => "20",
            "PAGER_BASE_LINK_ENABLE" => "N",
            "PAGER_DESC_NUMBERING" => "N",
            "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
            "PAGER_SHOW_ALL" => "N",
            "PAGER_SHOW_ALWAYS" => "N",
            "PAGER_TEMPLATE" => ".default",
            "PAGER_TITLE" => "Новости",
            "PARENT_SECTION" => "",
            "PARENT_SECTION_CODE" => "",
            "PREVIEW_TRUNCATE_LEN" => "",
            "PROPERTY_CODE" => array(0=>"",1=>"",),
            "SET_BROWSER_TITLE" => "N",
            "SET_LAST_MODIFIED" => "N",
            "SET_META_DESCRIPTION" => "N",
            "SET_META_KEYWORDS" => "N",
            "SET_STATUS_404" => "N",
            "SET_TITLE" => "N",
            "SHOW_404" => "N",
            "SORT_BY1" => "SORT",
            "SORT_BY2" => "SORT",
            "SORT_ORDER1" => "ASC",
            "SORT_ORDER2" => "ASC",
            "STRICT_SECTION_CHECK" => "N"
        )
    );?>

 <br>
<div class="work_but" style="width: 70%">
	 <?php $APPLICATION->IncludeFile(
            SITE_TEMPLATE_PATH . '/include/work/button_more.php',
            array(),
            array('MODE' => 'text', 'NAME' => 'Кнопка Ещё')
        ); ?>
</div>
 <br>
<table>
<tbody>
<tr>
	<td>
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/work/img7.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 7 Work down')
                    ); ?>
		</div>
	</td>
	<td>
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/work/img8.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 8 Work down')
                    ); ?>
		</div>
	</td>
	<td>
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/work/img9.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 9 Work down')
                    ); ?>
		</div>
	</td>
	<td>
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/work/img10.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 10 Work down')
                    ); ?>
		</div>
	</td>
	<td>
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/work/img11.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 11 Work down')
                    ); ?>
		</div>
	</td>
	<td>
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/work/img12.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 12 Work down')
                    ); ?>
		</div>
	</td>
</tr>
</tbody>
</table>
 </section>
<!--About--> <section id="About"><br>
 <br>
 <br>
<div>
 <br>
 <br>
	<h1>
	<?php $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . '/include/about/head.php',
                array(),
                array('MODE' => 'text', 'NAME' => 'Заголовок О нас')
            ); ?> </h1>
	 <?php $APPLICATION->IncludeFile(
            SITE_TEMPLATE_PATH . '/include/about/head_text.php',
            array(),
            array('MODE' => 'text', 'NAME' => 'Текст заголовка О нас')
        ); ?> <br>
</div>
<table style="padding-bottom: 100px">
<thead>
<tr class="text_about">
	<td>
		<div class="logo_img">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/about/img1.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 1 О нас')
                    ); ?>
		</div>
	</td>
	<td>
		<div class="logo_img">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/about/img2.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка 2 О нас')
                    ); ?>
		</div>
	</td>
	<td>
		<div style="justify-content: left; margin-left: 50px;">
			<h3>
			<?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/about/text1.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Подзаголовок коротко')
                        ); ?> </h3>
		</div>
 <br>
		<div style="width: 350px">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/about/text2.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Текст подзаголовка коротко')
                    ); ?>
		</div>
 <br>
		<div style="justify-content: left; margin-left: 50px;">
			<h4>
			<?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/about/author.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Автор')
                        ); ?> </h4>
		</div>
	</td>
</tr>
</thead>
</table>
 </section>
<!--Blog--> <section id="Blog"><br>
 <br>
 <br>
<div>
 <br>
 <br>
	<h1>
	<?php $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . '/include/blog/head.php',
                array(),
                array('MODE' => 'text', 'NAME' => 'Заголовок Blog')
            ); ?> </h1>
	<h4 style="width:30%">
	<?php $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . '/include/blog/head_text.php',
                array(),
                array('MODE' => 'text', 'NAME' => 'Текст заголовка Blog')
            ); ?> </h4>
 <br>
</div>
 <br>
 <?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"blog",
	Array(
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"ADD_SECTIONS_CHAIN" => "N",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "N",
		"DISPLAY_DATE" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array(0=>"DATE_CREATE",1=>"",),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => "2",
		"IBLOCK_TYPE" => "landing",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array(0=>"AUTHOR",1=>"",),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "SORT",
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "ASC",
		"STRICT_SECTION_CHECK" => "N"
	)
);?> </section>
<!--Contact--> <section id="Contact"><br>
 <br>
 <br>
<div style="padding-bottom: 70px">
 <br>
 <br>
	<h1>
	<?php $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . '/include/contact/head.php',
                array(),
                array('MODE' => 'text', 'NAME' => 'Заголовок Contact')
            ); ?> </h1>
	 <?php $APPLICATION->IncludeFile(
            SITE_TEMPLATE_PATH . '/include/contact/head_text.php',
            array(),
            array('MODE' => 'text', 'NAME' => 'Текст заголовка Contact')
        ); ?> <br>
</div>
<table style="padding-bottom: 150px">
<tbody>
<tr>
	<td style="padding-right: 10px">
		<div>
			<h1>
			<?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/contact/mess_text.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Заголовок сообщения Contact')
                        ); ?> </h1>
			<form action="#Contact" method="post">
				 <?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/contact/mess_name.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Имя сообщения Contact')
                        ); ?> <br>
				 <?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/contact/mess_email.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Email сообщения Contact')
                        ); ?> <br>
				 <?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/contact/message.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Текст сообщения Contact')
                        ); ?> <br>
				 <?php $APPLICATION->IncludeFile(
                            SITE_TEMPLATE_PATH . '/include/contact/button_send.php',
                            array(),
                            array('MODE' => 'text', 'NAME' => 'Кнопка отправки сообщения Contact')
                        ); ?>
			</form>
		</div>
	</td>
	<td>
		<div class="logo_img">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/logo_img_send.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка логотип отправки сообщения Contact')
                    ); ?>
		</div>
	</td>
</tr>
</tbody>
</table>
<table style="padding-bottom: 50px; justify-content: center; display: flex; width: 70%">
<tbody>
<tr>
	<th style="horiz-align: center; width: 200px">
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/adres_img.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка логотип адреса Contact')
                    ); ?>
		</div>
	</th>
	<th style="horiz-align: center; width: 200px">
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/tel_img.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка логотип телефона Contact')
                    ); ?>
		</div>
	</th>
	<th style="horiz-align: center; width: 200px">
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/email_img.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка логотип Email Contact')
                    ); ?>
		</div>
	</th>
</tr>
<tr>
	<td style="padding-right: 10px; text-align: center">
		<div style="font-size: 12px">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/adres_txt.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Адрес почтовый Contact')
                    ); ?>
		</div>
	</td>
	<td style="padding-right: 10px; text-align: center">
		<div style="font-size: 12px">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/tel_txt.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Телефоны Contact')
                    ); ?>
		</div>
	</td>
	<td style="padding-right: 10px; text-align: center">
		<div style="font-size: 12px">
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/email_txt.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Email адрес Contact')
                    ); ?>
		</div>
	</td>
</tr>
</tbody>
</table>
<table style="padding-bottom: 50px; justify-content: center; display: flex; width: 70%">
<tbody>
<tr>
	<th style="horiz-align: center; width: 100px">
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/facebook.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка Facebook Contact')
                    ); ?>
		</div>
	</th>
	<th style="horiz-align: center; width: 100px">
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/twitter.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка Twitter Contact')
                    ); ?>
		</div>
	</th>
	<th style="horiz-align: center; width: 100px">
		<div>
			 <?php $APPLICATION->IncludeFile(
                        SITE_TEMPLATE_PATH . '/include/contact/telegram.php',
                        array(),
                        array('MODE' => 'text', 'NAME' => 'Картинка Telegram Contact')
                    ); ?>
		</div>
	</th>
</tr>
</tbody>
</table>
 </section><?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>