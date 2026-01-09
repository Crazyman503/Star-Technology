ServerEvents.recipes(event => {

    const id = global.id;
    const scalerMCSF = 64; //Should be 16n variant (cap64)
    const getDataItem = (cwu) => (cwu >= 160) ? 'start_core:data_dna_disk' : (cwu >=32) ? 'gtceu:data_module' : 'gtceu:data_orb' ;
    
    // === Fixing LuV - UV Scaling ===

    [
        'assembly_line/electric_motor_uv','research_station/1_x_gtceu_zpm_electric_motor',
        'assembly_line/electric_motor_zpm','scanner/1_x_gtceu_luv_electric_motor',
        'assembly_line/electric_motor_luv','scanner/1_x_gtceu_iv_electric_motor',
        'assembly_line/electric_pump_uv','research_station/1_x_gtceu_zpm_electric_motor',
        'assembly_line/electric_pump_zpm','scanner/1_x_gtceu_luv_electric_pump',
        'assembly_line/electric_pump_luv','scanner/1_x_gtceu_iv_electric_pump',
        'assembly_line/field_generator_zpm','research_station/1_x_gtceu_luv_field_generator'
    ].forEach(removalID => {
        event.remove({id: `gtceu:${removalID}`});
    });
    
    const rsComponent = (tier, tier1, type, inputs, fluids, eut, cwu, rsEUt) => {

        event.recipes.gtceu.assembly_line(id(`${type}_uv`))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`gtceu:${tier}_${type}`)
            .stationResearch(
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(`gtceu:${tier1}_${type}`))
                    .EUt(rsEUt)
                    .CWUt(cwu)
                )
            .duration(600)
            .EUt(eut);

    };

    rsComponent('uv', 'zpm', 'electric_motor', [
            'gtceu:long_magnetic_samarium_rod',
            '4x gtceu:long_tritanium_rod',
            '4x gtceu:tritanium_ring',
            '8x gtceu:tritanium_round',
            '64x gtceu:fine_americium_wire',
            '2x gtceu:yttrium_barium_cuprate_single_cable'
        ],[
            'gtceu:soldering_alloy 576',
            'gtceu:lubricant 1000',
            'gtceu:naquadria 576'
        ], 100000, 32, 128000
    );

    rsComponent('uv', 'zpm', 'electric_pump', [
            'gtceu:uv_electric_motor',
            'gtceu:naquadah_normal_fluid_pipe',
            '2x gtceu:tritanium_plate',
            '8x gtceu:tritanium_screw',
            '8x gtceu:silicone_rubber_ring',
            'gtceu:naquadah_alloy_rotor',
            '2x gtceu:yttrium_barium_cuprate_single_cable'
        ], [
            'gtceu:soldering_alloy 576',
            'gtceu:lubricant 1000',
            'gtceu:naquadria 576'
        ], 100000, 32, 128000
    );
    
    rsComponent('zpm', 'luv', 'field_generator', [
            'gtceu:naquadah_alloy_frame',
            '6x gtceu:naquadah_alloy_plate',
            '2x gtceu:quantum_star',
            '2x gtceu:zpm_emitter',
            '2x #gtceu:circuits/zpm',
            '64x gtceu:fine_uranium_rhodium_dinaquadide_wire',
            '64x gtceu:fine_uranium_rhodium_dinaquadide_wire',
            '4x gtceu:vanadium_gallium_single_cable'
        ], [
            'gtceu:soldering_alloy 1152'
        ], 24000, 4, 16000
    );

    const scanComponent = (tier, tier1, type, inputs, fluids) => {

        event.recipes.gtceu.assembly_line(id(`${type}_${tier}`))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`gtceu:${tier}_${type}`)
            ["scannerResearch(java.util.function.UnaryOperator)"](
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(`gtceu:${tier1}_${type}`))
                    .duration(900)
                    .EUt(1920)
            )
            .duration(600)
            .EUt(6000);

    };

    scanComponent('zpm', 'luv', 'electric_motor', [
            'gtceu:long_magnetic_samarium_rod',
            '4x gtceu:long_osmiridium_rod',
            '4x gtceu:osmiridium_ring',
            '8x gtceu:osmiridium_round',
            '64x gtceu:fine_europium_wire',
            '2x gtceu:vanadium_gallium_single_cable'
        ], [
            'gtceu:soldering_alloy 288',
            'gtceu:lubricant 500'
    ]);
    
    scanComponent('zpm', 'luv', 'electric_pump', [
            'gtceu:zpm_electric_motor',
            'gtceu:polybenzimidazole_normal_fluid_pipe',
            '2x gtceu:osmiridium_plate',
            '8x gtceu:osmiridium_screw',
            '6x gtceu:silicone_rubber_ring',
            'gtceu:osmiridium_rotor',
            '2x gtceu:vanadium_gallium_single_cable'
        ], [
            'gtceu:soldering_alloy 288',
            'gtceu:lubricant 500'
    ]);
    
    scanComponent('luv', 'iv', 'electric_motor', [
            'gtceu:long_magnetic_samarium_rod',
            '4x gtceu:long_hsss_rod',
            '4x gtceu:hsss_ring',
            '8x gtceu:hsss_round',
            '64x gtceu:fine_ruridit_wire',
            '2x gtceu:niobium_titanium_single_cable'
        ], [
            'gtceu:soldering_alloy 144',
            'gtceu:lubricant 250'
    ]);
    
    scanComponent('luv', 'iv', 'electric_pump', [
            'gtceu:luv_electric_motor',
            'gtceu:niobium_titanium_normal_fluid_pipe',
            '2x gtceu:hsss_plate',
            '8x gtceu:hsss_screw',
            '4x gtceu:silicone_rubber_ring',
            'gtceu:hsss_rotor',
            '2x gtceu:niobium_titanium_single_cable'
        ], [
            'gtceu:soldering_alloy 144',
            'gtceu:lubricant 250'
    ]);


    // === Controller Blocks === 
    event.recipes.gtceu.assembly_line(id('component_part_assembly'))
        .itemInputs('gtceu:uv_assembler','8x gtceu:uv_robot_arm','8x gtceu:uv_conveyor_module',
            '8x gtceu:uv_electric_pump', '4x #gtceu:circuits/uhv', '6x #gtceu:circuits/uv', '8x #gtceu:circuits/zpm')
        .inputFluids('gtceu:soldering_alloy 12528', 'gtceu:lubricant 2500')
        .itemOutputs('gtceu:component_part_assembly')
        .duration(1800)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:uv_assembler'))
                .EUt(GTValues.VHA[GTValues.UV])
                .CWUt(96)
            )
        .EUt(GTValues.VHA[GTValues.UV]);

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

    // === Draco-QMDs ===
    const dracoQMD = (nameType, type, quantity, inputs, polymerAmount, cwu) => {

        event.recipes.gtceu.component_part_assembly(id(`draconic_qmd_${nameType}`))
            .itemInputs(inputs)
            .inputFluids(`gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${polymerAmount}`)
            .itemOutputs(`${quantity}x kubejs:draconic_qmd_${type}`)
            .duration(15 * quantity)
            .stationResearch(
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(`gtceu:advanced_smd_${type}`))
                    .EUt(GTValues.VHA[GTValues.UHV] * .8)
                    .CWUt(cwu)
                )
            .EUt(GTValues.VHA[GTValues.UHV]);

        let dataItem = getDataItem(cwu);
        
        event.recipes.gtceu.research_station(`1_x_gtceu_advanced_smd_${nameType}`)
            .itemInputs(dataItem)
            .itemInputs(`gtceu:advanced_smd_${type}`)
            .itemOutputs(Item.of(`${dataItem}`, `{assembly_line_research:{research_id:"1x_gtceu_advanced_smd_${type}",research_type:"gtceu:component_part_assembly"}}`))
            .CWUt(cwu)
            .totalCWU(cwu * 120 * 20)
            .EUt(GTValues.VHA[GTValues.UHV] / 4);

        if(nameType != 'diode_nt'){

            event.recipes.gtceu.stocking_component_part_assembly(id(`draconic_qmd_${nameType}`))
                .itemInputs(inputs)
                .inputFluids(`gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${polymerAmount}`)
                .itemOutputs(`${quantity}x kubejs:draconic_qmd_${type}`)
                .duration(15 * quantity)
                .EUt(GTValues.VHA[GTValues.UHV])
                .scannerResearch(`kubejs:draconic_qmd_${type}`)
                .cleanroom(CleanroomType.getByName('stabilized'));

            event.recipes.gtceu.scanner(id(`1_x_kubejs_draconic_qmd_${type}_scpa`))
                .itemInputs('gtceu:data_stick')
                .itemInputs(`kubejs:draconic_qmd_${type}`)
                .chancedOutput(Item.of(`gtceu:data_stick`, `{assembly_line_research:{research_id:"1x_kubejs_draconic_qmd_${type}",research_type:"gtceu:stocking_component_part_assembly"}}`), 5000, 0)
                .duration(20 * 120)
                .EUt(GTValues.VHA[GTValues.UEV]);

        }
    };

    dracoQMD('inductor', 'inductor', 16, [
            'gtceu:neutronium_ring', 
            '4x gtceu:fine_naquadria_wire', 
            'gtceu:ferrosilite_dust'
        ], 144, 180
    );
    
    dracoQMD('transistor', 'transistor', 16, [
            'gtceu:pure_netherite_foil', 
            '8x gtceu:fine_tritanium_wire', 
            'gtceu:aurourium_foil'
        ], 144, 180
    );

    dracoQMD('capacitor', 'capacitor', 16, [
            '2x gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate_foil', 
            '2x gtceu:zalloy_foil', 
            'gtceu:cerium_tritelluride_foil'
        ], 108, 180
    );

    dracoQMD('resistor', 'resistor', 16, [
            'gtceu:diamane_dust', 
            '6x gtceu:fine_yttrium_barium_cuprate_wire', 
            '4x gtceu:bismuth_iridate_foil'
        ], 144, 180
    );

    dracoQMD('diode_nt', 'diode', 24, [
            '2x gtceu:silicon_carbide_over_bismuth_tritelluride_dust', 
            'kubejs:neutronium_chip', 
            '8x gtceu:fine_stellarium_wire'
        ], 288, 156
    );

    dracoQMD('diode_dr', 'diode', 32, [
        '2x gtceu:silicon_carbide_over_bismuth_tritelluride_dust', 
        'kubejs:draco_chip',
        '8x gtceu:fine_stellarium_wire'
        ], 288, 180
    );

    const dracoQMDInMCSF = (type, outQuant, inputs, fluids, duration) => {

        // Redundant parameter drac (boolean). Removed it.

        event.recipes.gtceu.component_part_synthesis_forge(id(`${type}`))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`${scalerMCSF * outQuant}x kubejs:${type}`)
            .duration(scalerMCSF * duration)
            .stationResearch(
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(`kubejs:${type}`))
                    .EUt(GTValues.VHA[GTValues.UHV])
                    .CWUt(320)
            )            
            .EUt(GTValues.VHA[GTValues.UHV])
            .cleanroom(CleanroomType.getByName('stabilized'));

        event.recipes.gtceu.research_station(`1_x_kubejs_${type}`)
            .itemInputs('start_core:component_data_core')
            .itemInputs(`kubejs:${type}`)
            .itemOutputs(Item.of(`start_core:component_data_core`, `{assembly_line_research:{research_id:"1x_kubejs_${type}",research_type:"gtceu:component_part_synthesis_forge"}}`))
            .CWUt(320)
            .totalCWU(384000) // 320 CWU * 60 seconds * 20 ticks
            .EUt(GTValues.VHA[GTValues.UHV]);
    
    }
    
    dracoQMDInMCSF('draconic_qmd_inductor', 16, [
            `${scalerMCSF * .75}x gtceu:neutronium_ring`, 
            `${scalerMCSF * .75 * 4}x gtceu:fine_naquadria_wire`, 
            `${scalerMCSF * .75}x gtceu:ferrosilite_dust`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 144}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_transistor`, 16, [
            `${scalerMCSF * .75}x gtceu:pure_netherite_foil`, 
            `${scalerMCSF * .75 * 8}x gtceu:fine_tritanium_wire`, 
            `${scalerMCSF * .75}x gtceu:aurourium_foil`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 144}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_capacitor`, 16, [
            `${scalerMCSF * .75 * 2}x gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate_foil`, 
            `${scalerMCSF * .75 * 2}x gtceu:zalloy_foil`, 
            `${scalerMCSF * .75}x gtceu:cerium_tritelluride_foil`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 108}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_resistor`, 16, [
            `${scalerMCSF * .75}x gtceu:diamane_dust`, 
            `${scalerMCSF * .75 * 6}x gtceu:fine_yttrium_barium_cuprate_wire`, 
            `${scalerMCSF * .75 * 4}x gtceu:bismuth_iridate_foil`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 144}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_diode`, 32, [
            `${scalerMCSF * .75 * 2}x gtceu:silicon_carbide_over_bismuth_tritelluride_dust`, 
            `${scalerMCSF * .75}x kubejs:draco_chip`, 
            `${scalerMCSF * .75 * 8}x gtceu:fine_stellarium_wire`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 288}`
        ], 480
    );

    [
        'computational_matrix','transmission_assembly','precision_drive_mechanism','microfluidic_flow_valve', 'super_magnetic_core', 'catalyst_core', 'high_strength_panel', 'micropower_router'
    ].forEach(type => {

        event.recipes.gtceu.assembler(`ruined_${type}_duplication`)
            .itemInputs(`kubejs:ruined_${type}`,'4x gtceu:dense_enriched_naquadah_plate', '16x gtceu:fine_ancient_runicalium_wire') //Yes I know dense stacks to 7, but multis exist
            .inputFluids('gtceu:naquadria 1440')
            .itemOutputs(`2x kubejs:ruined_${type}`)
            .duration(1200)
            .EUt(GTValues.VA[GTValues.UHV]);

    });

    // === Material List Loader ===    
    const materialList = (tier, tier1, tier2, primary, support, material, rubberR, rubberF, plastic, lubricant, solder, wireTypeComputational, wireTypeMechanical, cableType, glassType,catalystType, primaryMagnet, secondaryMagnet, fluid, voltageCoil, eut, scaler, coolant, superConductor, cwu) => {
    
        // === Component Parts ===
        const componentParts = (type, inputs, fluids, duration, researched) => {
            event.recipes.gtceu.component_part_assembly(id(`${tier}_${type}`))
                .itemInputs(inputs)
                .inputFluids(fluids)
                .itemOutputs(`kubejs:${tier}_${type}`)
                .duration(duration)
                .stationResearch(
                    researchRecipeBuilder => researchRecipeBuilder
                        .researchStack(Item.of(researched))
                        .EUt(eut / 4)
                        .CWUt(cwu)
                    )
                .EUt(eut);
            
            let dataItem = getDataItem(cwu);

            event.recipes.gtceu.research_station(`1_x_${researched.replace(':','_')}_cpa`)
                .itemInputs(dataItem)
                .itemInputs(researched)
                .itemOutputs(Item.of(`${dataItem}`, `{assembly_line_research:{research_id:"1x_${researched.replace(':','_')}",research_type:"gtceu:component_part_assembly"}}`))
                .CWUt(cwu)
                .totalCWU(cwu * (scaler * 30 + 120) * 20)
                .EUt(eut / 4);

            event.recipes.gtceu.stocking_component_part_assembly(id(`${tier}_${type}`))
                .itemInputs(inputs)
                .inputFluids(fluids)
                .itemOutputs(`kubejs:${tier}_${type}`)
                .duration(duration)
                .EUt(eut)
                .scannerResearch(`kubejs:${tier}_${type}`)
                .cleanroom(CleanroomType.getByName('stabilized')); //Cleanroom has to be AFTER research

            event.recipes.gtceu.scanner(id(`1_x_kubejs_${tier}_${type}_scpa`))
                .itemInputs('gtceu:data_stick')
                .itemInputs(`kubejs:${tier}_${type}`)
                .chancedOutput(Item.of(`gtceu:data_stick`, `{assembly_line_research:{research_id:"1x_kubejs_${tier}_${type}",research_type:"gtceu:stocking_component_part_assembly"}}`), 2000, 0)
                .duration(duration * 6)
                .EUt(eut / 4);
        };

        let coilMod = (tier == 'uhv') ? 'gtceu' : 'kubejs' ;
        
        componentParts('voltage_coil', [
                `gtceu:${material}_tiny_fluid_pipe`, 
                `gtceu:long_magnetic_${primaryMagnet}_rod`, 
                `32x gtceu:fine_${voltageCoil}_wire`
            ], [
                `gtceu:${coolant} 1000`
            ], 200, `${coilMod}:${tier1}_voltage_coil`
        );

        let priorTier = (tier == 'uhv') ? 'ruined' : tier1;
        const multiplier = (value) => value + scaler * value;
        const partialMultiplier = (value, fraction) => value + scaler * fraction;

        componentParts('computational_matrix', [
                `gtceu:${primary}_frame`, 
                `1x #gtceu:circuits/${tier}`, 
                `2x #gtceu:circuits/${tier1}`, 
                `3x #gtceu:circuits/${tier2}`, 
                `4x gtceu:fine_${wireTypeComputational}_wire`, 
                `${2*(2**scaler)}x kubejs:qram_chip`
            ], [
                `gtceu:sterilized_growth_medium ${multiplier(250)}`, 
                `gtceu:${solder} ${multiplier(72)}`
            ], 400, `kubejs:${priorTier}_computational_matrix`
        );
            
        componentParts('transmission_assembly', [
                `gtceu:${material}_frame`, 
                `gtceu:${tier1}_electric_motor`, 
                `2x gtceu:${primary}_rod`, 
                `2x gtceu:${primary}_ring`, 
                `4x gtceu:${primary}_round`, 
                `16x gtceu:fine_${wireTypeMechanical}_wire`
            ], [
                `gtceu:${lubricant} ${multiplier(250)}`
            ], 320, `kubejs:${priorTier}_transmission_assembly`
        );
            
        componentParts('precision_drive_mechanism', [
                `gtceu:${primary}_frame`, 
                `gtceu:${tier1}_electric_motor`, 
                `#gtceu:circuits/${tier1}`, 
                `gtceu:${support}_gear`, 
                `gtceu:small_${primary}_gear`, 
                `8x gtceu:${primary}_round`
            ], [
                `gtceu:${lubricant} ${multiplier(250)}`, 
                `gtceu:${rubberF} 1728`
            ], 480, `kubejs:${priorTier}_precision_drive_mechanism`
        );
            
        componentParts('microfluidic_flow_valve', [
                `gtceu:${tier1}_fluid_regulator`, 
                `gtceu:${material}_small_fluid_pipe`, 
                `2x gtceu:${primary}_plate`, 
                `4x gtceu:${primary}_round`, 
                `4x gtceu:${rubberR}_ring`, 
                `2x gtceu:${primary}_ring`
            ], [
                `gtceu:${plastic} ${multiplier(396)}`
            ], 320, `kubejs:${priorTier}_microfluidic_flow_valve`
        );
            
        componentParts('super_magnetic_core', [
                `gtceu:long_magnetic_${primaryMagnet}_rod`, 
                `2x gtceu:magnetic_${secondaryMagnet}_rod`, 
                `3x gtceu:${primary}_rod`, 
                `24x gtceu:fine_${wireTypeMechanical}_wire`, 
                `2x gtceu:${material}_tiny_fluid_pipe`
            ], [
                `gtceu:${coolant} 2500`
            ], 300, `kubejs:${priorTier}_super_magnetic_core`
        );
            
        componentParts('catalyst_core', [
                `4x gtceu:${primary}_rod`, 
                glassType, 
                catalystType, 
                `32x gtceu:fine_${superConductor}_wire`, 
                `gtceu:${tier1}_emitter`, 
                `4x gtceu:${support}_ring`
            ], [
                `gtceu:${fluid} 576`
            ], 480, `kubejs:${priorTier}_catalyst_core`
        );
            
        componentParts('high_strength_panel', [
                `gtceu:dense_${primary}_plate`, 
                `#gtceu:circuits/${tier1}`, 
                `4x gtceu:${support}_screw`
            ], [
                `gtceu:${material} 288`, 
                `gtceu:${plastic} ${partialMultiplier(396, 36)}`
            ], 200, `kubejs:${priorTier}_high_strength_panel`
        );
        
        componentParts('micropower_router', [
                `gtceu:${cableType}_double_cable`, 
                `4x gtceu:${cableType}_single_cable`, 
                `2x gtceu:${primary}_plate`, 
                `32x gtceu:fine_${wireTypeComputational}_wire`
            ], [
                `gtceu:${rubberF} 720`
            ], 240, `kubejs:${priorTier}_micropower_router`
        );

    // === Components ===
        const components = (type, inputs, fluids, duration) => {

            event.recipes.gtceu.assembly_line(id(`${tier}_${type}`))
                .itemInputs(inputs)
                .inputFluids(fluids)
                .itemOutputs(`gtceu:${tier}_${type}`)
                .stationResearch(
                    researchRecipeBuilder => researchRecipeBuilder
                        .researchStack(Item.of(`gtceu:${tier1}_${type}`))
                        .EUt(eut / 4)
                        .CWUt(cwu)
                    )
                .duration(duration)
                .EUt(eut);

        };

        const exponentialMultiplier = (base) => base * (2 ** scaler);

        components('electric_motor', [
                `kubejs:${tier}_super_magnetic_core`,
                `2x gtceu:long_${primary}_rod`, 
                `kubejs:${tier}_transmission_assembly`, 
                `kubejs:${tier}_micropower_router`, 
                `64x gtceu:fine_${wireTypeMechanical}_wire`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${multiplier(500)}`, 
                `gtceu:${fluid} 576`
            ], 600
        );
        
        components('electric_pump', [
                `gtceu:${tier}_electric_motor`, 
                `gtceu:${material}_normal_fluid_pipe`, 
                `kubejs:${tier}_microfluidic_flow_valve`, 
                `kubejs:${tier}_micropower_router`, 
                `8x gtceu:${rubberR}_ring`, 
                `gtceu:${support}_rotor`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${multiplier(500)}`, 
                `gtceu:${fluid} 576`
            ], 600
        );
        
        components('conveyor_module', [
                `2x gtceu:${tier}_electric_motor`, 
                `kubejs:${tier}_high_strength_panel`, 
                `kubejs:${tier}_precision_drive_mechanism`, 
                `4x gtceu:${primary}_ring`, 
                `kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${multiplier(500)}`, 
                `gtceu:${rubberF} 3456`, 
                `gtceu:${fluid} 576`
            ], 600
        );
        
        components('electric_piston', [
                `gtceu:${tier}_electric_motor`, 
                `2x kubejs:${tier}_high_strength_panel`, 
                `1x kubejs:${tier}_transmission_assembly`, 
                `kubejs:${tier}_micropower_router`, 
                `gtceu:${support}_gear`, 
                `gtceu:small_${primary}_gear`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${multiplier(500)}`, 
                `gtceu:${fluid} 576`
            ], 600
        );
        
        components('robot_arm', [
                `4x gtceu:long_${primary}_rod`, 
                `kubejs:${tier}_precision_drive_mechanism`, 
                `kubejs:${tier}_transmission_assembly`, 
                `gtceu:${tier}_electric_motor`, 
                `gtceu:${tier}_electric_piston`, 
                `2x kubejs:${tier}_computational_matrix`, 
                `2x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(864)}`, 
                `gtceu:${lubricant} ${multiplier(500)}`, 
                `gtceu:${fluid} 576`
            ], 600
        );
       
        components('field_generator', [
                `gtceu:${primary}_frame`, 
                `2x kubejs:${tier}_high_strength_panel`, 
                `kubejs:${tier}_catalyst_core`, 
                `2x gtceu:${tier}_emitter`, 
                `1x kubejs:${tier}_computational_matrix`, 
                `64x gtceu:fine_${superConductor}_wire`, 
                `2x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(864)}`, 
                `gtceu:${fluid} 576`
            ], 600
        );
        
        components('emitter', [
                `gtceu:${primary}_frame`, 
                `gtceu:${tier}_electric_motor`, 
                `4x gtceu:long_${primary}_rod`, 
                `1x kubejs:${tier}_catalyst_core`, 
                `1x kubejs:${tier}_computational_matrix`, 
                `64x gtceu:${material}_foil`, 
                `1x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${multiplier(500)}`, 
                `gtceu:${fluid} 576`
            ], 600
        );
        
        components('sensor', [
                `gtceu:${primary}_frame`, 
                `gtceu:${tier}_electric_motor`, 
                `4x gtceu:${primary}_plate`, 
                `1x kubejs:${tier}_catalyst_core`, 
                `1x kubejs:${tier}_computational_matrix`, 
                `64x gtceu:${material}_foil`, 
                `1x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${multiplier(500)}`, 
                `gtceu:${fluid} 576`
            ], 600
        );

        event.recipes.gtceu.assembler(id(`${tier}_fluid_regulator`))
            .itemInputs(`gtceu:${tier}_electric_pump`, `2x #gtceu:circuits/${tier}`)
            .itemOutputs(`gtceu:${tier}_fluid_regulator`)
            .duration(50)
            .EUt(eut)
            .circuit(1);

        //Multi-Threaded UHV+
        const componentsMCSF = (type, inputs, fluids, duration) => {

            // Removed redundant parameter circuit

            event.recipes.gtceu.component_synthesis_forge(id(`${tier}_${type}`))
                .itemInputs(inputs)
                .inputFluids(fluids)
                .itemOutputs(`${scalerMCSF}x gtceu:${tier}_${type}`)
                .duration(scalerMCSF * duration)
                .stationResearch(
                    researchRecipeBuilder => researchRecipeBuilder
                        .researchStack(Item.of(`gtceu:${tier}_${type}`))
                        .EUt(eut)
                        .CWUt(320)
                )            
                .EUt(eut)
                .cleanroom(CleanroomType.getByName('stabilized'));

            event.recipes.gtceu.research_station(`1_x_gtceu_${tier}_${type}_mcsf`)
                .itemInputs('start_core:component_data_core')
                .itemInputs(`gtceu:${tier}_${type}`)
                .itemOutputs(Item.of(`start_core:component_data_core`, `{assembly_line_research:{research_id:"1x_gtceu_${tier}_${type}",research_type:"gtceu:component_synthesis_forge"}}`))
                .CWUt(320)
                .totalCWU(384000) // 320 CWU * 60 seconds * 20 ticks
                .EUt(eut);

        };

        componentsMCSF('electric_motor', [
                `${scalerMCSF * 0.75}x kubejs:${tier}_super_magnetic_core`, 
                `${2 * scalerMCSF * 0.75}x gtceu:long_${primary}_rod`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_transmission_assembly`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeMechanical}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeMechanical}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeMechanical}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeMechanical}_wire`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(500)}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );
        
        componentsMCSF('electric_pump', [
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`, 
                `${scalerMCSF * 0.75}x gtceu:${material}_normal_fluid_pipe`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_microfluidic_flow_valve`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`, 
                `${8 * scalerMCSF * 0.75}x gtceu:${rubberR}_ring`, 
                `${scalerMCSF * 0.75}x gtceu:${support}_rotor`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier}`, 
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(500)}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );
        
        componentsMCSF('conveyor_module', [
                `${2 * scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_high_strength_panel`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_precision_drive_mechanism`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_ring`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(500)}`, 
                `gtceu:${rubberF} ${scalerMCSF * 0.75 * 3456}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );
        
        componentsMCSF('electric_piston', [
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`, 
                `${2 * scalerMCSF * 0.75}x kubejs:${tier}_high_strength_panel`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_transmission_assembly`, `${scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`, `${scalerMCSF * 0.75}x gtceu:${support}_gear`, `${scalerMCSF * 0.75}x gtceu:small_${primary}_gear`,
                `${scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`, 
                `${scalerMCSF * 0.75}x gtceu:${support}_gear`, 
                `${scalerMCSF * 0.75}x gtceu:small_${primary}_gear`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(500)}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );
        
        componentsMCSF('robot_arm', [
                `${4 * scalerMCSF * 0.75}x gtceu:long_${primary}_rod`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_precision_drive_mechanism`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_transmission_assembly`, 
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`, 
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_piston`, 
                `${2 * scalerMCSF * 0.75}x kubejs:${tier}_computational_matrix`, 
                `${2 * scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier(864)}`, 
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(500)}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );
       
        componentsMCSF('field_generator', [
                `${scalerMCSF * 0.75}x gtceu:${primary}_frame`, 
                `${2 * scalerMCSF * 0.75}x kubejs:${tier}_high_strength_panel`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_catalyst_core`, 
                `${2 * scalerMCSF * 0.75}x gtceu:${tier}_emitter`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_computational_matrix`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superconductor}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superconductor}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superconductor}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superconductor}_wire`, 
                `${2 * scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier(864)}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );
        
        componentsMCSF('emitter', [
                `${scalerMCSF * 0.75}x gtceu:${primary}_frame`, 
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`, 
                `${4 * scalerMCSF * 0.75}x gtceu:long_${primary}_rod`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_catalyst_core`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_computational_matrix`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(500)}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );
        
        componentsMCSF('sensor', [
                `${scalerMCSF * 0.75}x gtceu:${primary}_frame`, 
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_plate`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_catalyst_core`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_computational_matrix`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${16 * scalerMCSF * 0.75}x gtceu:${material}_foil`, 
                `${scalerMCSF * 0.75}x kubejs:${tier}_micropower_router`
            ], [
                `gtceu:${solder} ${scalerMCSF * 0.75 * exponentialMultiplier(288)}`, 
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(500)}`, 
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 600
        );

        //Multi-Threaded UHV+ Parts
        const componentPartsMCSF = (type, outQuant, inputs, fluids, duration) => {

            // Removed redundant parameter drac

            event.recipes.gtceu.component_part_synthesis_forge(id(`${tier}_${type}`))
                .itemInputs(inputs)
                .inputFluids(fluids)
                .itemOutputs(`${scalerMCSF * outQuant}x kubejs:${tier}_${type}`)
                .duration(scalerMCSF * duration)
                .stationResearch(
                    researchRecipeBuilder => researchRecipeBuilder
                        .researchStack(Item.of(`kubejs:${tier}_${type}`))
                        .EUt(eut)
                        .CWUt(320)
                )            
                .EUt(eut)
                .cleanroom(CleanroomType.getByName('stabilized'));

            event.recipes.gtceu.research_station(`1_x_kubejs_${tier}_${type}_mcsf`)
                .itemInputs('start_core:component_data_core')
                .itemInputs(`kubejs:${tier}_${type}`)
                .itemOutputs(Item.of(`start_core:component_data_core`, `{assembly_line_research:{research_id:"1x_kubejs_${tier}_${type}",research_type:"gtceu:component_part_synthesis_forge"}}`))
                .CWUt(320)
                .totalCWU(320 * 60 * 20)
                .EUt(eut);

        };

       componentPartsMCSF('voltage_coil', 1, [
                `${scalerMCSF * 0.75}x gtceu:${material}_tiny_fluid_pipe`, 
                `${scalerMCSF * 0.75}x gtceu:long_magnetic_${primaryMagnet}_rod`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${voltageCoil}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${voltageCoil}_wire`
            ], [
                `gtceu:${coolant} ${scalerMCSF * 0.75 * 1000}`
            ], 200
        );

        componentPartsMCSF('computational_matrix', 1, [
                `${scalerMCSF * 0.75}x gtceu:${primary}_frame`, 
                `${scalerMCSF * 0.75}x #gtceu:circuits/${tier}`, 
                `${2 * scalerMCSF * 0.75}x #gtceu:circuits/${tier1}`, 
                `${3 * scalerMCSF * 0.75}x #gtceu:circuits/${tier2}`, 
                `${4 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeComputational}_wire`, 
                `${scalerMCSF * exponentialMultiplier(0.75)}x kubejs:qram_chip`, 
                `${scalerMCSF * exponentialMultiplier(0.75)}x kubejs:qram_chip`
            ], [
                `gtceu:sterilized_growth_medium ${scalerMCSF * 0.75 * multiplier(250)}`, 
                `gtceu:${solder} ${scalerMCSF * 0.75 * multiplier(72)}`
            ], 400
        );
        
        componentPartsMCSF('transmission_assembly', 1, [
                `${scalerMCSF * 0.75}x gtceu:${material}_frame`, 
                `${scalerMCSF * 0.75}x gtceu:${tier1}_electric_motor`, 
                `${2 * scalerMCSF * 0.75}x gtceu:${primary}_rod`, 
                `${2 * scalerMCSF * 0.75}x gtceu:${primary}_ring`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_round`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeMechanical}_wire`
            ], [
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(250)}`
            ], 320
        );
        
        componentPartsMCSF('precision_drive_mechanism', 1, [
                `${scalerMCSF * 0.75}x gtceu:${primary}_frame`, 
                `${scalerMCSF * 0.75}x gtceu:${tier1}_electric_motor`, 
                `${scalerMCSF * 0.75}x #gtceu:circuits/${tier1}`, 
                `${scalerMCSF * 0.75}x gtceu:${support}_gear`, 
                `${scalerMCSF * 0.75}x gtceu:small_${primary}_gear`, 
                `${8 * scalerMCSF * 0.75}x gtceu:${primary}_round`
            ], [
                `gtceu:${lubricant} ${scalerMCSF * 0.75 * multiplier(250)}`, 
                `gtceu:${rubberF} ${scalerMCSF * 0.75 * 1728}`
            ], 480
        );
        
        componentPartsMCSF('microfluidic_flow_valve', 1, [
                `${scalerMCSF * 0.75}x gtceu:${tier1}_fluid_regulator`, 
                `${scalerMCSF * 0.75}x gtceu:${material}_small_fluid_pipe`, 
                `${2 * scalerMCSF * 0.75}x gtceu:${primary}_plate`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_round`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${rubberR}_ring`, 
                `${2 * scalerMCSF * 0.75}x gtceu:${primary}_ring`
            ], [
                `gtceu:${plastic} ${scalerMCSF * 0.75 * partialMultiplier(396, 36)}`
            ], 320
        );
        
        componentPartsMCSF('super_magnetic_core', 1, [
                `${scalerMCSF * 0.75}x gtceu:long_magnetic_${primaryMagnet}_rod`, 
                `${2 * scalerMCSF * 0.75}x gtceu:magnetic_${secondaryMagnet}_rod`, 
                `${3 * scalerMCSF * 0.75}x gtceu:${primary}_rod`, 
                `${12 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeMechanical}_wire`, 
                `${12 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeMechanical}_wire`, 
                `${2 * scalerMCSF * 0.75}x gtceu:${material}_tiny_fluid_pipe`
            ], [
                `gtceu:${coolant} ${scalerMCSF * 0.75 * 2500}`
            ], 300
        );
        
        componentPartsMCSF('catalyst_core', 1, [
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_rod`, 
                `${scalerMCSF * 0.75}x ${glassType}`, 
                `${scalerMCSF * 0.75 * catalystType[0]}x ${catalystType.split(" ")[1]}`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`, 
                `${scalerMCSF * 0.75}x gtceu:${tier1}_emitter`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${support}_ring`
            ], [
                `gtceu:${fluid} ${scalerMCSF * 0.75 * 576}`
            ], 480
        );
        
        componentPartsMCSF('high_strength_panel', 1, [
                `${scalerMCSF * 0.75}x gtceu:dense_${primary}_plate`, 
                `${scalerMCSF * 0.75}x #gtceu:circuits/${tier1}`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${support}_screw`
            ], [
                `gtceu:${material} ${scalerMCSF * 0.75 * 288}`, 
                `gtceu:${plastic} ${scalerMCSF * 0.75 * partialMultiplier(396, 36)}`
            ], 200
        );
    
        componentPartsMCSF('micropower_router', 1, [
                `${scalerMCSF * 0.75}x gtceu:${cableType}_double_cable`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${cableType}_single_cable`, 
                `${2 * scalerMCSF * 0.75}x gtceu:${primary}_plate`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeComputational}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeComputational}_wire`
            ], [
                `gtceu:${rubberF} ${scalerMCSF * 0.75 * 720}`
            ], 240
        );

    };

    materialList('uhv', 'uv', 'zpm', // tier, tier1 tier2 
        'zalloy', 'zircalloy_4', // primary, support
        'neutronium', // material
        'styrene_butadiene_rubber', 'perfluoroelastomer_rubber', // rubberR, rubberF
        'polyether_ether_ketone', // plastic
        'lubricant', // lubricant
        'indium_tin_lead_cadmium_soldering_alloy', //solder
        'iron_selenide_over_strontium_titanium_oxide', 'zirconium', //wireTypeComputational, writeTypeMechanical
        'zirconium_selenide_diiodide', // cable 
        'gtceu:fusion_glass', // glass
        '2x gtceu:gravi_star', // catalyst
        'pure_netherite', 'samarium', // primaryMagnet, secondaryMagnet
        'naquadria', // fluid
        'thorium_plut_duranide_241', // voltageCoil
        GTValues.VHA[GTValues.UHV], // EUt
        1, // scaler
        'liquid_helium', // coolant
        'ruthenium_trinium_americium_neutronate', // superconductor
        128 // CWU/t
    );

    materialList('uev', 'uhv', 'uv', // tier, tier1 tier2
        'starium_alloy', 'magmada_alloy', // primary, support
        'mythrolic_alloy', // material
        'styrene_butadiene_rubber', 'perfluoroelastomer_rubber', // rubberR, rubberF
        'polyether_ether_ketone', // plastic
        'tungsten_disulfide', // lubricant
        'indium_tin_lead_cadmium_soldering_alloy', // solder
        'astatine_bis_tritelluride_cobo_selenium_over_iron_titanium_oxide', 'adamantine', // wireTypeComputational, wireTypeMechanical
        'astatium_bioselex_carbonite', // cable
        'gtceu:fusion_glass', // glass
        '2x kubejs:helish_star', // catalyst
        'zapolgium', 'pure_netherite', // primaryMagnet, secondaryMagnet
        'isovol', // fluid
        'aurourium', // voltageCoil
        GTValues.VHA[GTValues.UEV], // EUt 
        2, // scaler
        'superstate_helium_3', // coolant 
        'seaborgium_palladium_enriched_estalt_flerovium_alloy', // superconductor 
        160 // CWU/t
    );

    materialList('uiv', 'uev', 'uhv', // tier, tier1 tier2
        'ohmderblux_alloy', 'abyssal_alloy', // primary, support
        'chaotixic_alloy', // material
        'perfluoroelastomer_rubber', 'perfluoroelastomer_rubber', // rubberR, rubberF 
        'poly_34_ethylenedioxythiophene_polystyrene_sulfate', // plastic
        'tungsten_disulfide', // lubricant
        'naquadated_soldering_alloy', // solder
        'polonium_flux', 'xeproda', // wireTypeComputational, wireTypeMechanical
        'hafnide_ito_ceramic', // cable
        'kubejs:draco_resilient_fusion_glass', // glass 
        '1x kubejs:dragonic_eye', // catalyst
        'zapolgium', 'pure_netherite', // primaryMagnet, secondaryMagnet
        'calamatium', // fluid
        'magmada_alloy', // voltageCoil
        GTValues.VHA[GTValues.UIV], // EUt
        3, // scaler
        'superstate_helium_3', // coolant 
        'rhenium_super_composite_alloy', // superconductor 
        192 // CWU/t
    );

    const preUHVmaterialList = (scale, tier, tier1, tier2, primary, secondary, mechanicalWire, cable, pipe, superConductor, catalyst, catalystQuant, senMat, senFoil, frame, eut) => {

        const multiplier = (value) => value + scaler * value;
        const partialMultiplier = (value, fraction) => value + scaler * fraction;
        const exponentialMultiplier = (base) => base * (2 ** scaler);

        const componentsMCSF_preUHV = (type, inputs, fluids) => {

            // removed redundant circuit parameter

            let mcsfRecipe = event.recipes.gtceu.component_synthesis_forge(id(`${tier}_${type}`))
                    .itemInputs(inputs)
                    .inputFluids(fluids)
                    .itemOutputs(`${scalerMCSF}x gtceu:${tier}_${type}`)
                    .duration(scalerMCSF * 600)
                    .stationResearch(
                        researchRecipeBuilder => researchRecipeBuilder
                            .researchStack(Item.of(`gtceu:${tier}_${type}`))
                            .EUt(eut)
                            .CWUt(320)
                    )            
                    .EUt(eut)
                    .cleanroom(CleanroomType.getByName('stabilized'));

            if (tier == 'uv'){
                mcsfRecipe.inputFluids(`gtceu:naquadria ${scalerMCSF * 0.75 * 576}`);
            }

            event.recipes.gtceu.research_station(`1_x_gtceu_${tier}_${type}_mcsf`)
                .itemInputs('start_core:component_data_core')
                .itemInputs(`gtceu:${tier}_${type}`)
                .itemOutputs(Item.of(`start_core:component_data_core`, `{assembly_line_research:{research_id:"1x_gtceu_${tier}_${type}",research_type:"gtceu:component_synthesis_forge"}}`))
                .CWUt(320)
                .totalCWU(384000) // 320 CWU/t, 60 seconds, 20 ticks
                .EUt(eut * 4);

        };

        componentsMCSF_preUHV('electric_motor', [
                `${scalerMCSF * 0.75}x gtceu:long_magnetic_samarium_rod`,
                `${4 * scalerMCSF * 0.75}x gtceu:long_${primary}_rod`,
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_ring`,
                `${8 * scalerMCSF * 0.75}x gtceu:${primary}_round`,
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${mechanicalWire}_wire`,
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${mechanicalWire}_wire`,
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${mechanicalWire}_wire`,
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${mechanicalWire}_wire`,
                `${2 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * exponentialMultiplier(72)}`,
                `gtceu:lubricant ${scalerMCSF * 0.75 * exponentialMultiplier(125)}`
            ]
        );

        componentsMCSF_preUHV('electric_pump', [
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`,
                `${scalerMCSF * 0.75}x gtceu:${pipe}_normal_fluid_pipe`,
                `${2 * scalerMCSF * 0.75}x gtceu:${primary}_plate`,
                `${8 * scalerMCSF * 0.75}x gtceu:${primary}_screw`,
                `${scalerMCSF * 0.75 * 2 * (scale + 1)}x gtceu:silicone_rubber_ring`,
                `${scalerMCSF * 0.75}x gtceu:${secondary}_rotor`,
                `${2 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * exponentialMultiplier(72)}`,
                `gtceu:lubricant ${scalerMCSF * 0.75 * exponentialMultiplier(125)}`
            ]
        );

        componentsMCSF_preUHV('conveyor_module', [
                `${2 * scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`,
                `${2 * scalerMCSF * 0.75}x gtceu:${primary}_plate`,
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_ring`,
                `${16 * scalerMCSF * 0.75}x gtceu:${primary}_round`,
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_screw`,
                `${2 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * exponentialMultiplier(72)}`,
                `gtceu:lubricant ${scalerMCSF * 0.75 * exponentialMultiplier(125)}`,
                `gtceu:styrene_butadiene_rubber ${scalerMCSF * 0.75 * scale * 1152}`
            ]
        );

        componentsMCSF_preUHV('electric_piston', [
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`,
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_plate`,
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_ring`,
                `${16 * scalerMCSF * 0.75}x gtceu:${primary}_round`,
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_rod`,
                `${scalerMCSF * 0.75}x gtceu:${secondary}_gear`,
                `${2 * scalerMCSF * 0.75}x gtceu:small_${secondary}_gear`,
                `${2 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * exponentialMultiplier(72)}`,
                `gtceu:lubricant ${scalerMCSF * 0.75 * exponentialMultiplier(125)}`
            ]
        );

        componentsMCSF_preUHV('robot_arm',[
                `${4 * scalerMCSF * 0.75}x gtceu:long_${primary}_rod`,
                `${scalerMCSF * 0.75}x gtceu:${primary}_gear`,
                `${3 * scalerMCSF * 0.75}x gtceu:small_${primary}_gear`,
                `${2 * scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`,
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_piston`,
                `${scalerMCSF * 0.75}x #gtceu:circuits/${tier}`,
                `${2 * scalerMCSF * 0.75}x #gtceu:circuits/${tier1}`,
                `${4 * scalerMCSF * 0.75}x #gtceu:circuits/${tier2}`,
                `${4 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * 576 * scale}`, 
                `gtceu:lubricant ${scalerMCSF * 0.75 * exponentialMultiplier(125)}`
            ]
        );

        componentsMCSF_preUHV('field_generator', [
                `${scalerMCSF * 0.75}x gtceu:${frame}_frame`,
                `${6 * scalerMCSF * 0.75}x gtceu:${frame}_plate`,
                `${scalerMCSF * catalystQuant * 0.75}x gtceu:${catalyst}`,
                `${2 * scalerMCSF * 0.75}x gtceu:${tier}_emitter`,
                `${2 * scalerMCSF * 0.75}x #gtceu:circuits/${tier}`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${16 *  scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`,
                `${4 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * 576 * scale}`
            ]
        );

        componentsMCSF_preUHV('emitter', [
                `${scalerMCSF * 0.75}x gtceu:${frame}_frame`,
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`,
                `${4 * scalerMCSF * 0.75}x gtceu:long_${senMat}_rod`,
                `${scalerMCSF * catalystQuant * 0.75}x gtceu:${catalyst}`,
                `${2 * scalerMCSF * 0.75}x #gtceu:circuits/${tier}`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${4 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * exponentialMultiplier(144)}`
            ]
        );

        componentsMCSF_preUHV('sensor', [
                `${scalerMCSF * 0.75}x gtceu:${frame}_frame`,
                `${scalerMCSF * 0.75}x gtceu:${tier}_electric_motor`,
                `${4 * scalerMCSF * 0.75}x gtceu:${senMat}_plate`,
                `${scalerMCSF * catalystQuant * 0.75}x gtceu:${catalyst}`,
                `${2 * scalerMCSF * 0.75}x #gtceu:circuits/${tier}`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${16 * scalerMCSF * 0.75}x gtceu:${senFoil}_foil`,
                `${4 * scalerMCSF * 0.75}x gtceu:${cable}_single_cable`],
            [
                `gtceu:soldering_alloy ${scalerMCSF * 0.75 * exponentialMultiplier(144)}`
            ]
        );

    }

    preUHVmaterialList(1,                              // scale
        'luv', 'iv', 'ev',                             // tier, tier1 tier2
        'hsss', 'hsss',                                // primary, secondary
        'ruridit',                                     // mechanicalWire
        'niobium_titanium',                            // cable
        'niobium_titanium',                            // pipe
        'indium_tin_barium_titanium_cuprate',          // superConductor
        'quantum_star', 1,                             // catalyst, catalystQuant
        'ruridit', 'palladium',                        // senMat, senFoil
        'hsss',                                        // frame
        6000                                           // eut
    );

    preUHVmaterialList(2,                              // scale
        'zpm', 'luv', 'iv',                            // tier, tier1 tier2
        'osmiridium', 'osmiridium',                    // primary, secondary
        'europium',                                    // mechanicalWire
        'vanadium_gallium',                            // cable
        'polybenzimidazole',                           // pipe
        'uranium_rhodium_dinaquadide',                 // superConductor
        'quantum_star', 2,                             // catalyst, catalystQuant
        'osmiridium', 'trinium',                       // senMat, senFoil
        'naquadah_alloy',                              // frame
        24000                                          // eut
    );

    preUHVmaterialList(3,                              // scale 
        'uv', 'zpm', 'luv',                            // tier, tier1 tier2
        'tritanium', 'naquadah_alloy',                 // primary, secondary
        'americium',                                   // mechanicalWire
        'yttrium_barium_cuprate',                      // cable
        'naquadah',                                    // pipe
        'enriched_naquadah_trinium_europium_duranide', // superConductor
        'gravi_star', 1,                               // catalyst, catalystQuant
        'tritanium', 'naquadria',                      // senMat, senFoil
        'tritanium',                                   // frame
        100000                                         // eut
    );

});

    