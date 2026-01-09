ServerEvents.recipes(event => {
    const id = global.id;


    // === Abyssal Room ===
    event.recipes.gtceu.assembly_line(id('abyssal_containment_room'))
        .itemInputs(
            'gtceu:draco_abyssal_frame','8x kubejs:draco_ware_casing','4x kubejs:abyssal_inductor','12x kubejs:uiv_computational_matrix',
            '2x kubejs:uiv_micropower_router','8x kubejs:uiv_microfluidic_flow_valve','64x gtceu:fine_rhenium_super_composite_alloy_wire','4x gtceu:uiv_field_generator',
            '64x kubejs:uepic_chip','64x kubejs:uepic_chip','64x kubejs:uepic_chip','32x kubejs:uepic_chip'
        )
        .inputFluids(
            'gtceu:indium_tin_lead_cadmium_soldering_alloy 46080',
            'gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 8640',
            'gtceu:perfluoroelastomer_rubber 5760'
        )
        .itemOutputs('start_core:abyssal_containment_room')
        .duration(800)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('kubejs:abyssal_inductor_hull'))
                .EUt(GTValues.VHA[GTValues.UIV])
                .CWUt(224)
            )
        .EUt(GTValues.VA[GTValues.UXV]);

    // === CHEF ===
    event.recipes.gtceu.assembly_line(id('ultimate_ebf'))
        .itemInputs('gtceu:abyssal_alloy_frame', '8x #gtceu:circuits/uiv', '4x gtceu:dense_draco_abyssal_plate', '6x gtceu:uiv_field_generator',
            '4x gtceu:uiv_conveyor_module', '8x gtceu:borealic_steel_gear', '4x gtceu:uiv_electric_motor', '18x gtceu:small_ultispestalloy_cmsh_gear',
            '4x gtceu:lepton_resonant_thallium_antimonide_spring', '4x kubejs:uiv_microfluidic_flow_valve', '32x gtceu:fine_rhenium_super_composite_alloy_wire', '16x gtceu:zeroidic_trinate_steel_screw')
        .inputFluids('gtceu:naquadated_soldering_alloy 24768',
            'gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 19008',
            'start_core:corefire_nectar 100000',
            'gtceu:dragon_breath 12500')
        .itemOutputs('gtceu:ultimate_ebf')
        .duration(1800)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:mega_blast_furnace'))
                .EUt(GTValues.VHA[GTValues.UIV])
                .CWUt(192)
            )
        .EUt(GTValues.VHA[GTValues.UXV]);

    // === Part Hub ===
    event.recipes.gtceu.assembly_line(id('component_part_hub'))
        .itemInputs('8x gtceu:component_part_assembly', '6x kubejs:uev_computational_matrix', '4x kubejs:draco_ware_casing', '8x kubejs:uev_high_strength_panel',
            '4x gtceu:uev_robot_arm', '4x gtceu:uev_field_generator', '24x gtceu:void_screw', '64x kubejs:uepic_chip')
        .inputFluids('gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 14400', 'gtceu:utopian_akreyrium 10000', 'gtceu:tungsten_disulfide 7200',  'gtceu:indium_tin_lead_cadmium_soldering_alloy 5600')
        .itemOutputs('gtceu:component_part_hub')
        .duration(2400)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:component_part_assembly'))
                .EUt(GTValues.VHA[GTValues.UEV])
                .CWUt(192)
            )
        .EUt(GTValues.VHA[GTValues.UIV]);
    
});