StartupEvents.registry('item', event => {

    //MISC
    event.create('naquadic_netherite_fibers')
        .rarity('rare')
        .tooltip(Text.translate('item.kubejs.naquadic_netherite_fibers.tooltip'))
        .texture('kubejs:item/misc/coin');

    event.create('coin')
        .rarity('epic')
        .tooltip(Text.translate('item.kubejs.coin.tooltip'))
        .texture('kubejs:item/misc/coin');

    event.create('zalloyic_empty_mold')
        .texture('kubejs:item/misc/zalloyic_empty_mold');

    event.create('zalloyic_fluid_mold')
        .texture('kubejs:item/misc/zalloyic_fluid_mold');

    //Tier Multiblocks
    event.create('multiblock_upgrade_kit')
        .tooltip(Text.translate('item.kubejs.multiblock_upgrade_kit.tooltip'))
        .texture('kubejs:item/misc/upgrade_kit');

});