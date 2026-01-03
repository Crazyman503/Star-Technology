ServerEvents.recipes(event => {
    const id = global.id;
    
    //Controller Blocks
    
    event.recipes.gtceu.assembly_line(id('uhv_auxiliary_boosted_fusion_reactor'))
        .itemInputs('start_core:auxiliary_fusion_coil_mk1', '4x #gtceu:circuits/uev', 'gtceu:gravi_star', 'gtceu:double_zircalloy_4_plate',
                '2x gtceu:uv_field_generator', '64x kubejs:uepic_chip', '32x kubejs:uepic_chip', '32x gtceu:ruthenium_trinium_americium_neutronate_single_wire')
        .inputFluids('gtceu:indium_tin_lead_cadmium_soldering_alloy 1152', 'gtceu:europium 1152')
        .itemOutputs('start_core:uhv_auxiliary_boosted_fusion_reactor')
        .duration(1200)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:uv_fusion_reactor'))
                .EUt(GTValues.VHA[GTValues.UHV])
                .CWUt(144)
            )
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.assembly_line(id('uev_fusion_reactor'))
        .itemInputs('start_core:advanced_fusion_coil', '4x #gtceu:circuits/uiv', 'kubejs:helish_star', 'gtceu:double_magmada_alloy_plate',
                '2x gtceu:uhv_field_generator', '64x kubejs:uepic_chip', '64x kubejs:uepic_chip', '32x gtceu:seaborgium_palladium_enriched_estalt_flerovium_alloy_single_wire')
        .inputFluids('gtceu:indium_tin_lead_cadmium_soldering_alloy 1152', 'gtceu:cerium_tritelluride 1152')
        .itemOutputs('start_core:uev_fusion_reactor')
        .duration(1400)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('start_core:uhv_auxiliary_boosted_fusion_reactor'))
                .EUt(GTValues.VHA[GTValues.UEV])
                .CWUt(160)
            )
        .EUt(GTValues.VHA[GTValues.UEV]);

    event.recipes.gtceu.assembly_line(id('uiv_auxiliary_boosted_fusion_reactor'))
        .itemInputs('start_core:auxiliary_fusion_coil_mk2', '4x #gtceu:circuits/uxv', 'kubejs:dragonic_eye', 'gtceu:double_abyssal_alloy_plate',
                '2x gtceu:uev_field_generator', '64x kubejs:uipic_chip', '32x kubejs:uipic_chip', '32x gtceu:rhenium_super_composite_alloy_single_wire')
        .inputFluids('gtceu:indium_tin_lead_cadmium_soldering_alloy 1152', 'gtceu:polonium_bismide 1152')
        .itemOutputs('start_core:uiv_auxiliary_boosted_fusion_reactor')
        .duration(1600)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('start_core:uev_fusion_reactor'))
                .EUt(GTValues.VHA[GTValues.UIV])
                .CWUt(192)
            )
        .EUt(GTValues.VHA[GTValues.UIV]);

    //Casings/Coil
    
    event.remove({output: 'gtceu:superconducting_coil'});
    const SuperconductingCoil = (tier,SuperCond,quant) => {
        event.recipes.gtceu.assembler(id(`superconducting_coil_${tier}`))
            .itemInputs('gtceu:enriched_naquadah_frame', `16x gtceu:${SuperCond}_double_wire`, '32x gtceu:niobium_titanium_foil')
            .inputFluids('gtceu:trinium 1728')
            .itemOutputs(`${2 ** (quant - 1)}x gtceu:superconducting_coil`)
            .duration(100)
            .EUt(GTValues.VA[GTValues.IV] * (4 ** quant));
    };
    SuperconductingCoil('luv','indium_tin_barium_titanium_cuprate',1);
    SuperconductingCoil('zpm','uranium_rhodium_dinaquadide',2);
    SuperconductingCoil('uv','enriched_naquadah_trinium_europium_duranide',3);    
    SuperconductingCoil('uhv','ruthenium_trinium_americium_neutronate',4);
    SuperconductingCoil('uev','seaborgium_palladium_enriched_estalt_flerovium_alloy',5);
    SuperconductingCoil('uiv','rhenium_super_composite_alloy',6);

    event.recipes.gtceu.assembler(id('auxiliary_boosted_fusion_casing_mk1'))
        .itemInputs('gtceu:uhv_machine_casing', 'start_core:auxiliary_fusion_coil_mk1', '2x kubejs:uhv_voltage_coil', 'gtceu:uv_field_generator', '6x gtceu:zircalloy_4_plate')
        .inputFluids('gtceu:polyether_ether_ketone 576')
        .itemOutputs('2x start_core:auxiliary_boosted_fusion_casing_mk1')
        .duration(100)
        .EUt(GTValues.VHA[GTValues.UHV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.assembler(id('fusion_casing_mk4'))
        .itemInputs('gtceu:uev_machine_casing', 'start_core:advanced_fusion_coil', '2x kubejs:uev_voltage_coil', 'gtceu:uhv_field_generator', '6x gtceu:magmada_alloy_plate')
        .inputFluids('gtceu:polyether_ether_ketone 1152')
        .itemOutputs('2x start_core:fusion_casing_mk4')
        .duration(100)
        .EUt(GTValues.VHA[GTValues.UEV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.assembler(id('auxiliary_fusion_coil_mk1'))
        .itemInputs('3x gtceu:superconducting_coil', '4x gtceu:zpm_field_generator', '2x gtceu:zpm_electric_pump', '4x gtceu:neutron_reflector', '8x #gtceu:circuits/uv', '8x gtceu:zapolgium_small_fluid_pipe', '8x gtceu:zircalloy_4_plate')
        .inputFluids('gtceu:europium 1152')
        .itemOutputs('3x start_core:auxiliary_fusion_coil_mk1')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UHV])
        .cleanroom(CleanroomType.CLEANROOM);

    event.recipes.gtceu.assembler(id('advanced_fusion_coil'))
        .itemInputs('gtceu:fusion_coil', '2x gtceu:uv_field_generator', '1x gtceu:uv_electric_pump', '6x gtceu:neutron_reflector', '4x #gtceu:circuits/uhv', '4x gtceu:mythrolic_alloy_small_fluid_pipe', '4x gtceu:magmada_alloy_plate')
        .inputFluids('gtceu:cerium_tritelluride 576')
        .itemOutputs('start_core:advanced_fusion_coil')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UEV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.assembler(id('auxiliary_boosted_fusion_casing_mk2'))
        .itemInputs('gtceu:uiv_machine_casing', 'start_core:auxiliary_fusion_coil_mk2', '2x kubejs:uiv_voltage_coil', 'gtceu:uev_field_generator', '6x gtceu:abyssal_alloy_plate')
        .inputFluids('gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 576')
        .itemOutputs('2x start_core:auxiliary_boosted_fusion_casing_mk2')
        .duration(100)
        .EUt(GTValues.VHA[GTValues.UIV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.assembler(id('auxiliary_fusion_coil_mk2'))
        .itemInputs('3x start_core:auxiliary_fusion_coil_mk1', '4x gtceu:uhv_field_generator', '2x gtceu:uhv_electric_pump', '8x gtceu:neutron_reflector', '8x #gtceu:circuits/uev', '8x gtceu:nyanium_small_fluid_pipe', '8x gtceu:abyssal_alloy_plate')
        .inputFluids('gtceu:polonium_bismide 1152')
        .itemOutputs('3x start_core:auxiliary_fusion_coil_mk2')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UIV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);
});