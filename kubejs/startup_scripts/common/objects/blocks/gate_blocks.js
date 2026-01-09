
StartupEvents.registry('block', event => {

    const GateRingBlocks = (gate,type,side,front) => {

        event.create(gate+'_stargate_'+type+'_block').hardness(5).resistance(10).soundType('metal')
        .tagBlock('mineable/pickaxe').tagBlock('minecraft:needs_netherite_tool')
        .texture('up', `kubejs:block/stargate/${gate}_stargate_block_tops`)
        .texture('down', `kubejs:block/stargate/${gate}_stargate_block_tops`)
        .texture('east', `kubejs:block/stargate/${gate}_stargate_block_${side}`)
        .texture('west', `kubejs:block/stargate/${gate}_stargate_block_${side}`)
        .texture('south', `kubejs:block/stargate/${gate}_stargate_block_${side}`)
        .texture('north', `kubejs:block/stargate/${gate}_stargate_block_${front}`);

    }//possible moving these textures to a model ".model('modelpath')" would be a good thing, for helpers todo?

    // === ASG ===
    GateRingBlocks('ancient','ring','ring','ring');
    GateRingBlocks('ancient','base','ring','base');
    GateRingBlocks('ancient','chevron','chevron','chevron');

    // === DSG ===
    GateRingBlocks('draconic','ring','ring','ring');
    GateRingBlocks('draconic','base','ring','base');
    GateRingBlocks('draconic','chevron','chevron','chevron');

});