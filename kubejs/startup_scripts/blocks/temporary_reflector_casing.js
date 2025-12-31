//Will need to be moved to core for stat assignment
StartupEvents.registry('block', event => {

    ['basic','advanced','complex','reinforced','borealic','dragonic','prismalic'].forEach(reflector => {
        event.create(`${reflector}_reflector_casing`/*, 'gtceu:active'*/)
            .hardness(5)
            .resistance(10)
            .soundType('metal')
            .tagBlock('mineable/pickaxe')
            .tagBlock('minecraft:needs_iron_tool')
            .requiresTool(false)
            /*bloom*/.textureAll(`kubejs:item/neutron_reflector/${reflector}`);//temporary texture for now, will be ctm and bloom in final state
    });

});