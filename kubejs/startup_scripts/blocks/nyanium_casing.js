
StartupEvents.registry('block', event => {

    function nyan_casing(id, name, texture){
        event.create(id)
            .displayName(name)
            .hardness(5)
            .resistance(10)
            .lightLevel(0)
            .soundType('metal')
            .requiresTool(true)
            .tagBlock('mineable/pickaxe')
            .tagBlock('minecraft:needs_iron_tool')
            .textureAll(`kubejs:block/casings/nyanium/${texture}`);
        };

    nyan_casing('nyanium_machine_casing', 'Nyanium Casing', 'casing');
    nyan_casing('nyanium_pipe_casing', 'Nyanium Pipe Casing', 'pipe_casing');
    nyan_casing('nyanium_gearbox', 'Nyanium Gearbox Casing', 'gearbox');

    event.create('nyanium_machine_firebox_casing', 'gtceu:active')
        .displayName('Nyanium Firebox Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .firebox('kubejs:block/casings/nyanium/casing',
                'kubejs:block/casings/nyanium/firebox_casing',
                'kubejs:block/casings/nyanium/casing');

    event.create('nyanium_machine_engine_intake_casing', 'gtceu:active')
        .displayName('Nyinsane Engine Intake Casing')
        .hardness(5)
        .resistance(10)
        .soundType('metal')
        .tagBlock('mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(false)
        .simple('kubejs:block/casings/nyanium/engine_intake_casing');

});