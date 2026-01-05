StartupEvents.registry('block', event => {

    event.create('high_steam_machine_casing')
		.hardness(5)
		.resistance(1)
		.soundType('stone')
		.requiresTool(true)
		.tagBlock("mineable/pickaxe")
		.tagBlock('minecraft:needs_iron_tool')
		.textureAll('kubejs:block/casings/basic/high_steam_machine_casing');

    event.create('wood_casing')
        .hardness(5)
        .resistance(1)
        .soundType('wood')
        .requiresTool(true)
        .tagBlock('mineable/axe')
        .tagBlock('minecraft:needs_stone_tool')
        .textureAll('kubejs:block/casings/basic/casing-wood');

    event.create('peek_casing')
        .hardness(5)
        .resistance(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/basic/machine_casing_peek');

    event.create('fluix_steel_casing')
        .hardness(5)
        .resistance(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/basic/fluix_casing');

});