<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?php if (!empty($arResult)):?>

<!--    <pre>--><?php //=print_r($arResult)?><!--</pre>-->
<?php

foreach($arResult as $arItem):
	if($arParams["MAX_LEVEL"] == 1 && $arItem["DEPTH_LEVEL"] > 1) 
		continue;
?>
	<?php if($arItem["SELECTED"]):?>
		<a href="<?=$arItem["LINK"]?>" class="selected"><?=$arItem["TEXT"]?></a>
	<?php else:?>
		<a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a>
	<?php endif?>
	
<?php endforeach?>
<!--    <a href="#Work">WORK</a>-->
<!--    <a href="#About">ABOUT</a>-->
<!--    <a href="#Blog">BLOG</a>-->
<!--    <a href="#Contact">CONTACT</a>-->

<?php endif?>



