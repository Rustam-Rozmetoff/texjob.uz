<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?php if (!empty($arResult)):?>


<?php
$count = 0;
foreach($arResult as $arItem):
	if($arParams["MAX_LEVEL"] == 1 && $arItem["DEPTH_LEVEL"] > 1) 
		continue;
?>
	<?php if($count == 0):?>
		<a href="<?=$arItem["LINK"]?>" class="active"><?=$arItem["TEXT"]?></a>
	<?php else:?>
		<a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a>
	<?php endif?>
	<?php $count++; ?>
<?php endforeach?>

<?php endif?>
<!--<a href="#Work" class="active">ALL</a>-->
<!--<a href="#Work">BRANDING</a>-->
<!--<a href="#Work">ELUSTRATION</a>-->
<!--<a href="#Work">WEB</a>-->

