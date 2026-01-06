
ServerEvents.recipes(event => {

    const id = global.id;

    // Runic Convergence Infusion Production

    /*
        *Nr*(SO₄)₃(OH)₂ - Netherite Trisulfate Complex
        [*Nr*(NH₃)₆]SO₄ - Netherite Hexammine Sulfate
        *Nr*₂N₃O₄ - Voidic Nitride
        *Nr*(OH)₄ - Netherite Tetrahydroxide
        *Nr*FSi₂O₄ - Astral Fluorosilicate
        *Nr*₃N₃Si₂BO8F - Primordial Nitrosilicate
        2Mg₃N₂ - Magnesium Nitride
        *Nr*₃Mg₆N₇Si₂BO8F - Runic Convergence Infusion
    */

    const lcr = event.recipes.gtceu.large_chemical_reactor;

    lcr(id('netherite_trisulfate_complex'))
        .itemInputs('gtceu:pure_netherite_dust')
        .inputFluids('gtceu:sulfuric_acid 3000', 'minecraft:water 2000')
        .outputFluids('gtceu:netherite_trisulfate_complex 1000', 'gtceu:hydrogen 8000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);
    
    lcr(id('netherite_hexammine_sulfate'))
        .inputFluids('gtceu:netherite_trisulfate_complex 1000', 'gtceu:ammonia 6000', 'gtceu:hydrogen 6000')
        .itemOutputs('30x gtceu:netherite_hexammine_sulfate_dust')
        .outputFluids('gtceu:sulfuric_acid 2000', 'minecraft:water 2000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);
    
    lcr(id('voidic_nitride'))
        .itemInputs('30x gtceu:netherite_hexammine_sulfate_dust')
        .inputFluids('gtceu:nitrobenzene 8000', 'gtceu:hydrogen 16000')
        .outputFluids('gtceu:voidic_nitride 1000', 'gtceu:ammonia 8000', 'gtceu:phenol 6000', 'gtceu:sulfuric_acid 1000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);

    lcr(id('netherite_tetrahydroxide'))
        .itemInputs('15x gtceu:calcium_hydroxide_dust')
        .inputFluids('gtceu:netherite_trisulfate_complex 1000', 'gtceu:hydrogen 4000')
        .itemOutputs('9x gtceu:netherite_tetrahydroxide_dust', '18x gtceu:calcium_sulfate_dust')  // * 6
        .outputFluids('minecraft:water 4000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);

    lcr(id('astral_fluorosilicate'))
        .itemInputs('9x gtceu:netherite_tetrahydroxide_dust', '2x gtceu:silicon_dioxide_dust')
        .inputFluids('gtceu:hydrofluoric_acid 4000')
        .outputFluids('gtceu:astral_fluorosilicate 1000', 'minecraft:water 4000', 'gtceu:hydrofluoric_acid 3000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);

    event.recipes.gtceu.mixer(id('primordial_nitrosilicate'))
        .inputFluids('gtceu:voidic_nitride 1000', 'gtceu:astral_fluorosilicate 1000')
        .outputFluids('gtceu:primordial_nitrosilicate 1000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);

    lcr(id('magnesium_nitride'))
        .itemInputs('3x gtceu:magnesium_dust')
        .inputFluids('gtceu:nitrogen 2000')
        .outputFluids('gtceu:magnesium_nitride 1000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);

    event.recipes.gtceu.advanced_chemistry(id('runic_convergence_infusion'))
        .inputFluids('gtceu:primordial_nitrosilicate 1000', 'gtceu:magnesium_nitride 1000')
        .outputFluids('gtceu:runic_convergence_infusion 1000')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ZPM]);

    /*
    ** Runic Plating Engraving
    ** ========================
    ** Runic Convergence Infusion Mechanic
    ** You can set amount of infusion to consume via circuit
    ** Higher consumption, lower chance of consuming the singularity, higher energy usage
    */

    [
        { singularity: 'nebular', plate: 'enriched_naquadah', plating: 'runic_engraved_plating', tier: 2, duration_multiplier: 1.6 },
        { singularity: 'zenith', plate: 'naquadah', plating: 'runic_pathway_engraved_plating', tier: 1, duration_multiplier: 1.3 },
        { singularity: 'hyperion', plate: 'naquadah_alloy', plating: 'runic_stabilization_plating', tier: 2.5, duration_multiplier: 2.1 },
        { singularity: 'spectral', plate: 'naquadria', plating: 'runic_energized_plating', tier: 3, duration_multiplier: 1.4 },
        { singularity: 'astral', plate: 'trinaquadalloy', plating: 'runic_transportation_engraved_plating', tier: 3, duration_multiplier: 1.8 },
    ].forEach(foo => {
        const { singularity, plate, plating, tier, duration_multiplier } = foo;

        for (let i = 1; i <= 4; i++) {
            // Each option adds 25 seconds
            let duration = 2000 * duration_multiplier + (i - 1) * 200;
            // Each option adds 20% more energy consumption
            let eut = GTValues.V[GTValues.LuV + Math.floor(tier)] * .45
            // Each option decreases the chance of consuming the singularity by 25%
            let chance = 10000 - (i - 1) * 2500;
            // Each option increases the infusion consumption by 1 mB
            let consumption = i * i - 2*i + 2; // [1,2,3,4] => [1,2,5,10]

            event.recipes.gtceu.runic_circuitry_assembling_station(id(`${singularity}_${plating}_option_${i}`))
                .itemInputs(`gtceu:dense_${plate}_plate`)
                .chancedInput(`kubejs:singularity_${singularity}`, chance, 0)
                .perTick(true)
                .inputFluids(`gtceu:runic_convergence_infusion ${consumption}`)
                .perTick(false)
                .itemOutputs(`kubejs:${plating}`)
                // .blastFurnaceTemp(10500 + (tier >= 2.5) ? 1000 : 0)  // Has no Use
                .duration(duration)
                .EUt(eut)
                .circuit(i);
        }

    });

    event.recipes.gtceu.mixer(id('runic_laser_source_base_dust'))
        .itemInputs('2x gtceu:naquadic_netherite_dust', '10x gtceu:tritanium_dust', '5x gtceu:trinium_dust')
        .itemOutputs('17x gtceu:runic_laser_source_base_dust')
        .duration(12000)
        .EUt(GTValues.VHA[GTValues.UV]);

    // === Runic Tablet ===

    event.recipes.gtceu.assembler(id('runic_tablet'))
        .itemInputs('kubejs:runic_tablet_1','kubejs:runic_tablet_2','kubejs:runic_tablet_3','kubejs:runic_tablet_4','kubejs:runic_tablet_5','kubejs:runic_tablet_6')
        .inputFluids('gtceu:naquadria 21600')
        .itemOutputs('kubejs:runic_tablet_complete')
        .duration(400)
        .EUt(GTValues.VHA[GTValues.UHV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    for (let i = 1; i <= 6; i++) {
        let o = (i === 6) ? 1 : i + 1;
    event.recipes.gtceu.scanner(`runic_tablet_${i}_to_${o}`)
        .itemInputs(`16x gtceu:ancient_runicalium_foil`,`1x kubejs:runic_tablet_${i}`) //Gives more control over tablet type (reduced exploration rng)
        .inputFluids('gtceu:naquadria 1080')        
        .itemOutputs(`kubejs:runic_tablet_${o}`)
        .duration(600)
        .EUt(GTValues.VHA[GTValues.UV]);
    };

    // === Rune Infusion ===
    
    const runeCombining = (type) => {
    event.recipes.gtceu.runic_inscribe_manipulate(id(`runic_energized_${type}_plating`))
        .itemInputs('3x kubejs:runic_engraved_plating', 'kubejs:runic_energized_plating', `kubejs:runic_${type}_engraved_plating`)
        .perTick(true)
        .inputFluids('gtceu:intangibility_infusion 1', 'gtceu:paradoxicity_infusion 1', 'gtceu:causality_infusion 1')
        .perTick(false)
        .itemOutputs(`kubejs:runic_energized_${type}_plating`)
        .duration(6000)
        .EUt(GTValues.VA[GTValues.UHV]);
    }
    runeCombining('transportation');
    runeCombining('pathway');

    event.recipes.gtceu.runic_inscribe_manipulate(id('runic_pathway_casing'))
        .itemInputs('gtceu:void_frame', '12x gtceu:dense_naquadah_plate', '6x kubejs:runic_pathway_engraved_plating')
        .inputFluids('gtceu:naquadria 2592', 'gtceu:utopian_akreyrium 864')
        .itemOutputs('kubejs:runic_pathway_casing')
        .duration(4000)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.runic_inscribe_manipulate(id('runic_stabilization_casing'))
        .itemInputs('gtceu:void_frame', '12x gtceu:dense_naquadah_alloy_plate', '6x kubejs:runic_stabilization_plating')
        .inputFluids('gtceu:naquadria 2592', 'gtceu:utopian_akreyrium 864')
        .itemOutputs('kubejs:runic_stabilization_casing')
        .duration(4000)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.runic_inscribe_manipulate(id('runic_transportation_casing'))
        .itemInputs('gtceu:void_frame', '12x gtceu:dense_trinaquadalloy_plate', '6x kubejs:runic_transportation_engraved_plating')
        .inputFluids('gtceu:naquadria 2592', 'gtceu:utopian_akreyrium 864')
        .itemOutputs('kubejs:runic_transportation_casing')
        .duration(4000)
        .EUt(GTValues.VA[GTValues.UHV]);

    // === Controller ===

    event.recipes.gtceu.assembly_line(id('runic_inscribe_manipulate'))
        .itemInputs('gtceu:ancient_runicalium_frame', '2x kubejs:uhv_catalyst_core','16x kubejs:uhv_high_strength_panel', '4x #gtceu:circuits/uev', '64x kubejs:uepic_chip', '64x kubejs:uepic_chip',
             '64x kubejs:uepic_chip', '8x gtceu:uhv_field_generator', '8x gtceu:uhv_electric_piston', '16x gtceu:uhv_emitter', '12x kubejs:uhv_precision_drive_mechanism','2x gtceu:uhv_fluid_regulator')
        .inputFluids('gtceu:hsse 25920', 'gtceu:hssg 25920', 'gtceu:hsss 25920')
        .itemOutputs('gtceu:runic_inscribe_manipulate')
        .duration(32000)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('kubejs:runic_tablet_complete'))
                .EUt(GTValues.VHA[GTValues.UV])
                .CWUt(144)
            )
        .EUt(GTValues.VHA[GTValues.UHV]);

});