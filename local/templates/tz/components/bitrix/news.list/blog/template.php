<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<!---->
<?//foreach($arResult["ITEMS"] as $arItem):?>
<!--	--><?//
//	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
//	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
//	?>
<!--	<p class="news-item" id="--><?php //=$this->GetEditAreaId($arItem['ID']);?><!--">-->
<!--		--><?//if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
<!--			--><?//if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
<!--				<a href="--><?php //=$arItem["DETAIL_PAGE_URL"]?><!--"><img-->
<!--						class="preview_picture"-->
<!--						border="0"-->
<!--						src="--><?php //=$arItem["PREVIEW_PICTURE"]["SRC"]?><!--"-->
<!--						width="--><?php //=$arItem["PREVIEW_PICTURE"]["WIDTH"]?><!--"-->
<!--						height="--><?php //=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?><!--"-->
<!--						alt="--><?php //=$arItem["PREVIEW_PICTURE"]["ALT"]?><!--"-->
<!--						title="--><?php //=$arItem["PREVIEW_PICTURE"]["TITLE"]?><!--"-->
<!--						style="float:left"-->
<!--						/></a>-->
<!--			--><?//else:?>
<!--				<img-->
<!--					class="preview_picture"-->
<!--					border="0"-->
<!--					src="--><?php //=$arItem["PREVIEW_PICTURE"]["SRC"]?><!--"-->
<!--					width="--><?php //=$arItem["PREVIEW_PICTURE"]["WIDTH"]?><!--"-->
<!--					height="--><?php //=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?><!--"-->
<!--					alt="--><?php //=$arItem["PREVIEW_PICTURE"]["ALT"]?><!--"-->
<!--					title="--><?php //=$arItem["PREVIEW_PICTURE"]["TITLE"]?><!--"-->
<!--					style="float:left"-->
<!--					/>-->
<!--			--><?//endif;?>
<!--		--><?//endif?>
<!--		--><?//if($arParams["DISPLAY_DATE"]!="N" && $arItem["DISPLAY_ACTIVE_FROM"]):?>
<!--			<span class="news-date-time">--><?//echo $arItem["DISPLAY_ACTIVE_FROM"]?><!--</span>-->
<!--		--><?//endif?>
<!--		--><?//if($arParams["DISPLAY_NAME"]!="N" && $arItem["NAME"]):?>
<!--			--><?//if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
<!--				<a href="--><?//echo $arItem["DETAIL_PAGE_URL"]?><!--"><b>--><?//echo $arItem["NAME"]?><!--</b></a><br />-->
<!--			--><?//else:?>
<!--				<b>--><?//echo $arItem["NAME"]?><!--</b><br />-->
<!--			--><?//endif;?>
<!--		--><?//endif;?>
<!--		--><?//if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
<!--			--><?//echo $arItem["PREVIEW_TEXT"];?>
<!--		--><?//endif;?>
<!--		--><?//if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
<!--			<div style="clear:both"></div>-->
<!--		--><?//endif?>
<!--		--><?//foreach($arItem["FIELDS"] as $code=>$value):?>
<!--			<small>-->
<!--			--><?php //=GetMessage("IBLOCK_FIELD_".$code)?><!--:&nbsp;--><?php //=$value;?>
<!--			</small><br />-->
<!--		--><?//endforeach;?>
<!--		--><?//foreach($arItem["DISPLAY_PROPERTIES"] as $pid=>$arProperty):?>
<!--			<small>-->
<!--			--><?php //=$arProperty["NAME"]?><!--:&nbsp;-->
<!--			--><?//if(is_array($arProperty["DISPLAY_VALUE"])):?>
<!--				--><?php //=implode("&nbsp;/&nbsp;", $arProperty["DISPLAY_VALUE"]);?>
<!--			--><?//else:?>
<!--				--><?php //=$arProperty["DISPLAY_VALUE"];?>
<!--			--><?//endif?>
<!--			</small><br />-->
<!--		--><?//endforeach;?>
<!--	</p>-->
<?//endforeach;?>
<!---->


<table style="padding-bottom: 100px">
    <thead>
    <tr>
        <?php foreach($arResult["ITEMS"] as $arItem):?>
        <?php
        $this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
        $this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
        ?>
        <th>
            <div class="blog_img" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
                <img width="300" alt="blog" src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>">
            </div>
        </th>
        <?php endforeach;?>
    </tr>
    <tr>
        <?php foreach($arResult["ITEMS"] as $arItem):?>
        <td>
            <div style="width: 300px; padding-right: 20px">
                <h3></h3><?echo $arItem["NAME"]?>
                <h5><?echo $arItem["PREVIEW_TEXT"];?></h5>

                <?foreach($arItem["FIELDS"] as $code=>$value):?>
                    <small>
                        <?=GetMessage("IBLOCK_FIELD_".$code)?>:&nbsp;<?=$value;?>
                    </small><br />
                <?endforeach;?>
                <?foreach($arItem["DISPLAY_PROPERTIES"] as $pid=>$arProperty):?>
                    <small>
                        <?=$arProperty["NAME"]?>:&nbsp;
                        <?if(is_array($arProperty["DISPLAY_VALUE"])):?>
                            <?=implode("&nbsp;/&nbsp;", $arProperty["DISPLAY_VALUE"]);?>
                        <?else:?>
                            <?=$arProperty["DISPLAY_VALUE"];?>
                        <?endif?>
                    </small><br />
                <?endforeach;?>
            </div>
        </td>
        <?php endforeach;?>
    </tr>
    </thead>
</table>