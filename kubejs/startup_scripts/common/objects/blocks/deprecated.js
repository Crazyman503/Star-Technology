StartupEvents.registry('block', event => {

    event.create('austenitic_stainless_steel_304_casing')
        .hardness(2)
        .resistance(3)
        .lightLevel(0)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/deprecated/casing-austenitic-stainless-steel-304');

    event.create('inconel_625_casing')
        .hardness(2)
        .resistance(3)
        .lightLevel(0)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/deprecated/casing-inconel-625');

});