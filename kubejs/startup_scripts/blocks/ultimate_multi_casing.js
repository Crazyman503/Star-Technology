StartupEvents.registry('block', event => {
    event.create('noble_mixing_casing')
        .hardness(5)
        .resistance(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/ultimate_multis/noble_mixing_casing');

    event.create('quake_proof_casing')
        .hardness(5)
        .resistance(1)
        .soundType('metal')
        .requiresTool(true)
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .textureAll('kubejs:block/casings/ultimate_multis/quake_proof_casing');

    event.create('titanic_blasting_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/titanic_blasting_casing');

    event.create('extreme_temperature_smelting_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/extreme_temperature_smelting_casing');

    event.create('subzero_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/subzero_casing');

    event.create('reinforced_cryostone_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/reinforced_cryostone_casing');

    event.create('reinforced_brimstone_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/reinforced_brimstone_casing');

    event.create('draneko_casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/draneko_casing');

    event.create('abyssal_drill_1')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/abyssal_drill_casing');

    event.create('abyssal_drill_2')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/abyssal_drill_casing_2');

    event.create('advanced_assembly_casing')
        .displayName('Advanced Assembly Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/advanced_assembly_casing');

    event.create('ionic_engraving_casing')
        .displayName('Ionic Engraving Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/ionic_engraving_casing');

    event.create('aurouric_resilient_casing')
        .displayName('Aurouric Resilient Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/aurouric_resilient_casing');

    event.create('aurouric_polarization_cell', 'gtceu:active')
        .displayName('Aurouric Polarization Cell')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .bloom('kubejs:block/casings/ultimate_multis/aurouric_polarization_cell');

    event.create('atomic_convergence_casing')
        .displayName('Atomic Convergence Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/atomic_convergence_casing');

    event.create('gravitationally_strained_stabilization_casing')
        .displayName('Gravitationally Strained Stabilization Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/gravitationally_strained_stabilization_casing');

    event.create('inoculated_nuclei_seperation_casing')
        .displayName('Inoculated Nuclei Seperation Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/inoculated_nuclei_seperation_casing');

    event.create('subatomically_secure_casing')
        .displayName('Sub-Atomically Secure Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/subatomically_secure_casing');

    event.create('quantumly_resistant_casing')
        .displayName('Quantumly Resistant Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/quantumly_resistant_casing');

    event.create('absolute_annihilation_casing')
        .displayName('Absolute Annihilation Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/absolute_annihilation_casing');

    event.create('tectonic_defiance_casing')
        .displayName('Tectonic Defiance Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/tectonic_defiance_casing');

    event.create('true_revitilization_casing')
        .displayName('True Revitilization Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/true_revitilization_casing');

    event.create('absolute_annihilators')
        .displayName('Absolute Annihilators')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/absolute_annihilators');

    event.create('nuclei_seperators')
        .displayName('Nuclei Seperators')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/nuclei_seperators');

    event.create('superdense_assembly_control_casing', 'gtceu:active')
        .displayName('Superdense Assembly Control Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .bloom('kubejs:block/casings/ultimate_multis/superdense_assembly_control_casing');

    event.create('superdense_assembly_machine_casing')
        .displayName('Superdense Assembly Machine Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/superdense_assembly_machine_casing');

    event.create('superdense_machine_casing')
        .displayName('Superdense Machine Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/superdense_machine_casing');

    event.create('cattomolymer_casing')
        .displayName('Cattomolymer Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .textureAll('kubejs:block/casings/ultimate_multis/cattomolymer_casing');
});