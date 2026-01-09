ServerEvents.recipes(event => {

    const id = global.id;
    const scalerMCSF = 64; //Should be 16n variant (cap64)

    // === Material List Loader ===    
    const materialList = (tier, tier1, tier2, primary, support, material, rubberR, rubberF, plastic, lubricant, solder, wireTypeComputational, wireTypeMechanical, cableType, glassType,catalystType, primaryMagnet, secondaryMagnet, fluid, voltageCoil, eut, scaler, coolant, superConductor, cwu) => {
    
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

        const multiplier = (value) => value + scaler * value;

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
                `${scalerMCSF * 0.75}x kubejs:${tier}_transmission_assembly`, 
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
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`, 
                `${16 * scalerMCSF * 0.75}x gtceu:fine_${superConductor}_wire`, 
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

    