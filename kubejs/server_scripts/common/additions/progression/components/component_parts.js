ServerEvents.recipes(event => {

    const id = global.id;
    const scalerMCSF = 64; //Should be 16n variant (cap64)
    const getDataItem = (cwu) => (cwu >= 160) ? 'start_core:data_dna_disk' : (cwu >=32) ? 'gtceu:data_module' : 'gtceu:data_orb' ;
    
    [
        'computational_matrix','transmission_assembly','precision_drive_mechanism','microfluidic_flow_valve', 
        'super_magnetic_core', 'catalyst_core', 'high_strength_panel', 'micropower_router'
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
                `6x gtceu:fine_${wireTypeComputational}_wire`, 
                `4x gtceu:${primary}_bolt`
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

        // === Multi-Threaded Component Parts ===
        const componentPartsMCSF = (type, outQuant, inputs, fluids, duration) => {

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
                `${6 * scalerMCSF * 0.75}x gtceu:fine_${wireTypeComputational}_wire`, 
                `${4 * scalerMCSF * 0.75}x gtceu:${primary}_bolt`
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

});