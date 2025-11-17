if (global.packmode !== 'hard'){

ServerEvents.recipes(event => {
    const id = global.id;

    event.shaped('gtceu:void_extractor',[
        'ABC',
        'ADE',
        'FGC'],{
        A: 'gtceu:soul_infused_hex_wire',
        B: 'gtceu:lv_electric_pump',
        C: 'gtceu:lv_electric_piston',
        D: 'gtceu:hp_steam_miner',
        E: '#gtceu:circuits/lv',
        F: 'gtceu:lv_robot_arm',
        G: 'gtceu:lv_conveyor_module'
    }).id('start:shaped/void_extractor');

    event.shaped('gtceu:void_excavator',[
        'ABC',
        'ADE',
        'FGC'],{
        A: 'gtceu:twinite_hex_wire',
        B: 'gtceu:luv_electric_pump',
        C: 'gtceu:luv_electric_piston',
        D: 'gtceu:luv_large_miner',
        E: '#gtceu:circuits/luv',
        F: 'gtceu:luv_robot_arm',
        G: 'gtceu:luv_conveyor_module'
    }).id('start:shaped/void_excavator');

    event.recipes.gtceu.assembly_line(id('ancient_refinement_center'))
        .itemInputs('gtceu:uhv_machine_hull', '12x #gtceu:circuits/uev', '4x gtceu:uhv_robot_arm', '4x gtceu:uhv_electric_pump',
            '2x gtceu:uhv_conveyor_module', '2x gtceu:zircalloy_4_gear', '4x gtceu:small_pure_netherite_gear', '12x gtceu:ancient_runicalium_single_wire')
        .inputFluids('gtceu:utopian_akreyrium 5000','gtceu:indium_tin_lead_cadmium_soldering_alloy 2880')
        .itemOutputs('gtceu:ancient_refinement_center')
        .duration(1200)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:void_excavator'))
                .EUt(GTValues.VHA[GTValues.UHV])
                .CWUt(144)
            )
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.void_excavation(id('mining'))
        .inputFluids('gtceu:drilling_fluid 5000')
        .chancedOutput('2x gtceu:raw_coal', 4000, 1000)
        .chancedOutput('2x minecraft:raw_gold', 4000, 750)
        .chancedOutput('1x gtceu:raw_sodalite', 3000, 1000)
        .chancedOutput('3x gtceu:raw_pentlandite', 3000, 500)
        .chancedOutput('1x gtceu:raw_realgar', 6000, 1200)
        .chancedOutput('2x gtceu:raw_silver', 3500, 750)
        .outputFluids('gtceu:rare_ore_residue 400', 'gtceu:raw_ore_slurry 600')
        .duration(640)
        .EUt(GTValues.VA[GTValues.LV]);

    event.recipes.gtceu.aqueous_void_excavation(id('mining'))
        .inputFluids('gtceu:drilling_fluid 20000')
        .outputFluids('gtceu:rare_ore_residue 4000', 'gtceu:raw_ore_slurry 6000')
        .duration(960)
        .EUt(GTValues.VA[GTValues.HV]);

    });

}