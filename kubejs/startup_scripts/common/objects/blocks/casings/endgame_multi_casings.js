StartupEvents.registry('block', event => {

    // === Abydos Multis ===
    event.create('noble_mixing_casing')
        .hardness(5)
        .resistance(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/abydos_multis/noble_mixing_casing');

    event.create('quake_proof_casing')
        .hardness(5)
        .resistance(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/abydos_multis/quake_proof_casing');

    event.create('titanic_blasting_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/abydos_multis/titanic_blasting_casing');

    event.create('superdense_assembly_control_casing', 'gtceu:active')
        .displayName('Superdense Assembly Control Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .bloom('kubejs:block/casings/abydos_multis/superdense_assembly_control_casing');

    event.create('superdense_assembly_machine_casing')
        .displayName('Superdense Assembly Machine Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/abydos_multis/superdense_assembly_machine_casing');

    event.create('superdense_machine_casing')
        .displayName('Superdense Machine Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/abydos_multis/superdense_machine_casing');
    
    event.create('superalloy_casing')
        .hardness(5)
        .resistance(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/abydos_multis/superalloy_casing');

    // === Nether Multis ===
    event.create('extreme_temperature_smelting_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/nether_multis/extreme_temperature_smelting_casing');

    event.create('subzero_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/nether_multis/subzero_casing');

    event.create('reinforced_cryostone_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/nether_multis/reinforced_cryostone_casing');

    event.create('reinforced_brimstone_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/nether_multis/reinforced_brimstone_casing');
    
    event.create('heart_of_the_flame')
        .hardness(5)
        .resistance(10)
        .lightLevel(10)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/nether_multis/heart_of_the_flame');

    // === End Multis ===
    event.create('draneko_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/end_multis/draneko_casing');

    event.create('abyssal_drill_1')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/end_multis/abyssal_drill_casing');

    event.create('abyssal_drill_2')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/end_multis/abyssal_drill_casing_2');

    event.create('cattomolymer_casing')
        .displayName('Cattomolymer Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/end_multis/cattomolymer_casing');

    event.create('draco_ware_casing')
        .hardness(5)
        .resistance(10)
        .lightLevel(3)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/end_multis/draco_ware_casing');

    event.create('abyssal_inductor_hull')
        .hardness(5)
        .resistance(10)
        .lightLevel(3)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/end_multis/abyssal_inductor');

    event.create('draco_assembly_grating')
        .hardness(5)
        .resistance(10)
        .lightLevel(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/end_multis/draco_assembly_grating');

    event.create('draco_resilient_fusion_glass')
        .hardness(2)
        .resistance(2)
        .soundType('glass')
        .transparent(true)
        .defaultTranslucent() 
        .requiresTool(false)
        .textureAll('kubejs:block/casings/end_multis/draco_resilient_fusion_glass');

});