ServerEvents.recipes(event => {
    const id = global.id;

    const AssemblyHelix = (output,inputs,fluids,EUt) => {

        event.recipes.gtceu.assembly_line(id(output))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`start_core:${output}`)
            .duration(800)
            .EUt(EUt);

    };

    AssemblyHelix('uv_supreme_thread_helix',['gtceu:void_frame', '4x #gtceu:circuits/uhv', '4x gtceu:uv_field_generator', '64x gtceu:uhpic_chip', '2x gtceu:uv_conveyor_module', '2x gtceu:uv_electric_pump', '32x gtceu:void_foil'], ['gtceu:naquadria 6912', 'gtceu:polybenzimidazole 4608'], GTValues.VA[GTValues.UHV]);
    AssemblyHelix('uev_supreme_thread_helix',['gtceu:draco_abyssal_frame', '4x #gtceu:circuits/uiv', '4x gtceu:uev_field_generator', '64x kubejs:uepic_chip', '2x gtceu:uev_conveyor_module', '2x gtceu:uev_electric_pump', '2x kubejs:uev_high_strength_panel', '32x gtceu:draco_abyssal_foil', '2x start_core:uv_supreme_thread_helix', '2x start_core:uv_supreme_thread_helix', '2x start_core:uv_supreme_thread_helix', '2x start_core:uv_supreme_thread_helix'], ['gtceu:isovol 13824', 'gtceu:polyether_ether_ketone 4608'], GTValues.VA[GTValues.UIV]);
    AssemblyHelix('uhv_overdrive_thread_helix',['gtceu:mythrolic_alloy_frame', '6x #gtceu:circuits/uev', '3x gtceu:uhv_field_generator', '32x kubejs:uepic_chip', '2x gtceu:uhv_conveyor_module', '2x gtceu:uhv_electric_pump', '2x kubejs:uhv_high_strength_panel', '32x gtceu:mythrolic_alloy_foil'], ['gtceu:naquadria 13824', 'gtceu:polyether_ether_ketone 4608'], GTValues.VA[GTValues.UEV]);
    AssemblyHelix('uhv_coprocessor_thread_helix',['gtceu:magmada_alloy_frame', '6x #gtceu:circuits/uev', '3x gtceu:uhv_field_generator', '32x kubejs:uepic_chip', '2x gtceu:uhv_conveyor_module', '2x gtceu:uhv_electric_pump', '2x kubejs:uhv_high_strength_panel', '32x gtceu:magmada_alloy_foil'], ['gtceu:naquadria 13824', 'gtceu:polyether_ether_ketone 4608'], GTValues.VA[GTValues.UEV]);
    AssemblyHelix('uhv_weaving_thread_helix',['gtceu:starium_alloy_frame', '6x #gtceu:circuits/uev', '3x gtceu:uhv_field_generator', '32x kubejs:uepic_chip', '2x gtceu:uhv_conveyor_module', '2x gtceu:uhv_electric_pump', '2x kubejs:uhv_high_strength_panel', '32x gtceu:starium_alloy_foil'], ['gtceu:naquadria 13824', 'gtceu:polyether_ether_ketone 4608'], GTValues.VA[GTValues.UEV]);

    // === Need KOMARU ===
    // uiv+

});