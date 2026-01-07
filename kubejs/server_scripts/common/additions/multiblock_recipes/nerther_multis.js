ServerEvents.recipes(event => {
    const id = global.id;
    
    // === Hell Forge ===
    event.recipes.gtceu.assembly_line(id('heart_of_the_flame'))
        .itemInputs(
            'kubejs:husk_brick', '2x kubejs:hell_core', '6x gtceu:dense_ancient_netherite_plate', '24x gtceu:pure_netherite_screw'
        )
        .inputFluids(
            'start_core:flamewake_solvent 500000'
        )
        .itemOutputs('kubejs:heart_of_the_flame')
        .duration(6000)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('kubejs:husk_of_the_flame'))
                .EUt(GTValues.VHA[GTValues.UHV])
                .CWUt(192)
            )
        .EUt(GTValues.VHA[GTValues.UEV]);

    event.recipes.gtceu.assembly_line(id('hellforge'))
        .itemInputs(
            'gtceu:calamatium_frame', '12x #gtceu:circuits/uev', '32x kubejs:uhv_high_strength_panel', '8x gtceu:neutronium_huge_fluid_pipe',
            '32x gtceu:uhv_field_generator', '24x gtceu:uhv_electric_pump', '4x gtceu:calamatium_rotor', '32x gtceu:isovol_screw'
        )
        .inputFluids(
            'start_core:flamewake_solvent 240000',
            'gtceu:utopian_akreyrium 60000'
        )
        .itemOutputs('start_core:hellforge')
        .duration(2800)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('kubejs:heart_of_the_flame'))
                .EUt(GTValues.VA[GTValues.UHV])
                .CWUt(192)
            )
        .EUt(GTValues.VA[GTValues.UEV]);

    // === Cryostate ===

    event.recipes.gtceu.assembly_line(id('cryostate_quantum_chiller'))
        .itemInputs(
            'gtceu:isovol_frame', '12x #gtceu:circuits/uev', '32x kubejs:uhv_high_strength_panel', '8x gtceu:neutronium_huge_fluid_pipe', '32x gtceu:uhv_field_generator',
            '24x gtceu:uhv_electric_pump', '4x gtceu:isovol_rotor', '32x gtceu:calamatium_screw'
        )
        .inputFluids(
            'gtceu:liquid_helium 1000000',
            'gtceu:utopian_akreyrium 60000'
        )
        .itemOutputs('gtceu:cryostate_quantum_chiller')
        .duration(1800)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:mega_vacuum_freezer'))
                .EUt(GTValues.VA[GTValues.UHV])
                .CWUt(192)
            )
        .EUt(GTValues.VA[GTValues.UEV]);

});