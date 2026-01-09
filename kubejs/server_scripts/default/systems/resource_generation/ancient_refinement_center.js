global.not_hardmode(() => {

    ServerEvents.recipes(event => {
        const id = global.id;

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

        event.recipes.gtceu.aqueous_void_excavation(id('mining'))
            .inputFluids('gtceu:drilling_fluid 25000')
            .outputFluids('gtceu:rare_ore_residue 4000', 'gtceu:raw_ore_slurry 6000')
            .duration(320)
            .EUt(GTValues.VA[GTValues.EV]);

        event.recipes.gtceu.bulk_void_excavation(id('mining'))
            .inputFluids('gtceu:drilling_fluid 50000')
            .itemOutputs('20x gtceu:raw_coal', '17x minecraft:raw_gold', '9x gtceu:raw_sodalite', 
                '10x gtceu:raw_pentlandite', '18x gtceu:raw_realgar', '16x gtceu:raw_silver')
            .outputFluids('gtceu:rare_ore_residue 4000', 'gtceu:raw_ore_slurry 6000')
            .duration(6400)
            .EUt(GTValues.VA[GTValues.LV]);

        event.recipes.gtceu.bulk_rock_filtrator(id('gravel_geodes'))
            .itemInputs('320x minecraft:gravel')
            .inputFluids('gtceu:distilled_water 10000')
            .itemOutputs('8x kubejs:diamond_geode', '8x kubejs:emerald_geode', '9x kubejs:ruby_geode', 
                '8x kubejs:realgar_geode', '8x kubejs:green_sapphire_geode', '8x kubejs:sapphire_geode', 
                '7x kubejs:quartzite_geode')
            .duration(12000)
            .EUt(GTValues.VHA[GTValues.LV]);

        event.recipes.gtceu.bulk_rock_filtrator(id('sand_geodes'))
            .itemInputs('320x minecraft:sand')
            .inputFluids('gtceu:distilled_water 10000')
            .itemOutputs('7x kubejs:blue_topaz_geode', '7x kubejs:topaz_geode', '10x kubejs:apatite_geode', 
                '6x kubejs:spessartine_geode', '8x kubejs:monazite_geode', '8x kubejs:certus_quartz_geode')
            .duration(9600)
            .EUt(GTValues.VHA[GTValues.MV]);

    });
});