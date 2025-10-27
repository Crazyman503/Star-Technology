ServerEvents.recipes(event => {
    const id = global.id;

    event.shaped(Item.of('gtceu:hydroponic_garden'), [
        'ABB',
        'CDA',
        'CEF'
    ], {
        A: 'gtceu:tungsten_single_cable',
        B: '#gtceu:circuits/iv',
        C: 'gtceu:iv_electric_pump',
        D: 'gtceu:greenhouse',
        E: 'gtceu:iv_field_generator',
        F: 'gtceu:iv_robot_arm'
    }).id('start:shaped/hydroponic_garden');

    global.farmCropList.forEach(crop => {
        event.recipes.gtceu.hydroponic_garden(id(`${crop.name.split(':')[1]}${(!crop.name.startsWith('minecraft')) ? '_' + crop.name.split(':')[0] : ''}_harvest_npk`))
            .notConsumable(`8x ${(crop.seed) ? crop.seed : crop.name}`)
            .inputFluids('minecraft:water 500')
            .itemOutputs(`64x ${crop.name}`)
            .chancedOutput(`32x ${(crop.seed) ? crop.seed : crop.name}`, 5000, 0)
            .duration(600)
            .EUt(global.vha['lv'])
            .circuit(0);

        event.recipes.gtceu.hydroponic_garden(id(`${crop.name.split(':')[1]}${(!crop.name.startsWith('minecraft')) ? '_' + crop.name.split(':')[0] : ''}_harvest_nrf`))
            .notConsumable(`8x ${(crop.seed) ? crop.seed : crop.name}`)
            .inputFluids('minecraft:water 500', 'gtceu:nutrient_rich_fertilizer_solution 100')
            .itemOutputs(`128x ${crop.name}`)
            .chancedOutput(`64x ${(crop.seed) ? crop.seed : crop.name}`, 5000, 0)
            .duration(300)
            .EUt(global.vha['lv'])
            .circuit(1);

        event.recipes.gtceu.hydroponic_garden(id(`${crop.name.split(':')[1]}${(!crop.name.startsWith('minecraft')) ? '_' + crop.name.split(':')[0] : ''}_harvest_biostimulating`))
            .notConsumable(`8x ${(crop.seed) ? crop.seed : crop.name}`)
            .inputFluids('minecraft:water 500', 'gtceu:biostimulating_mixture 100')
            .itemOutputs(`256x ${crop.name}`)
            .chancedOutput(`128x ${(crop.seed) ? crop.seed : crop.name}`, 5000, 0)
            .duration(150)
            .EUt(global.vha['lv'])
            .circuit(2);

    });

    // Nutrient Rich Fertilizer Solution (NRF Solution)
    event.recipes.gtceu.large_chemical_reactor(id('nutrient_rich_fertilizer_solution'))
        .itemInputs('gtceu:tiny_phosphate_dust','gtceu:small_bone_dust')
        .inputFluids('minecraft:water 900','gtceu:npk_solution 100')
        .outputFluids('gtceu:nutrient_rich_fertilizer_solution 1000')
        .duration(200)
        .EUt(global.vha['ev']);

    event.recipes.gtceu.large_chemical_reactor(id('nutrient_rich_fertilizer_solution_36x'))
        .itemInputs('4x gtceu:phosphate_dust','9x gtceu:bone_dust')
        .inputFluids('minecraft:water 32400','gtceu:npk_solution 3600')
        .outputFluids('gtceu:nutrient_rich_fertilizer_solution 36000')
        .duration(200 * 36)
        .EUt(global.vha['ev']);

    // Biostimulating Mixture
    event.recipes.gtceu.extractor(id('seaweed_oil'))
        .itemInputs('minecraft:kelp')
        .outputFluids('gtceu:seaweed_oil 36')
        .duration(100)
        .EUt(global.vha['hv']);

    event.recipes.gtceu.distillery(id('distill_nutrient_rich_fertilizer_solution'))
        .inputFluids('gtceu:nutrient_rich_fertilizer_solution 100')
        .outputFluids('gtceu:liquefied_nutrient_paste 80')
        .chancedOutput('gtceu:fertilizer', 5000, 0)
        .duration(300)
        .EUt(global.vha['hv']);

    event.recipes.gtceu.large_chemical_reactor(id('silicic_acid'))
        .itemInputs('gtceu:silicon_dioxide_dust')
        .inputFluids('minecraft:water 1000')
        .outputFluids('gtceu:silicic_acid 1000')
        .duration(247)
        .EUt(global.vha['mv']);

    event.recipes.gtceu.large_chemical_reactor(id('biostimulating_mixture'))
        .inputFluids('gtceu:silicic_acid 150', 'gtceu:seaweed_oil 250', 'gtceu:liquefied_nutrient_paste 325', 'gtceu:mutagen 25', 'gtceu:glycerol 250')
        .outputFluids('gtceu:biostimulating_mixture 1000')
        .duration(160)
        .EUt(global.vha['iv']);

    //Phyto Soil
    event.remove({output: 'thermal:phytosoil'});
    event.shaped('thermal:phytosoil', [
        'CAC',
        'ADA',
        'CAC'
    ], {
        C: 'gtceu:charcoal_dust',
        A: 'gtceu:small_apatite_dust',
        D: 'minecraft:dirt'
    }).id(id('phytosoil'));

});