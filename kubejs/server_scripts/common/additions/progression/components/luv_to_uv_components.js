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

    const preUHVmaterialList = (scale, tier, tier1, tier2, primary, secondary, mechanicalWire, cable, pipe, superConductor, catalyst, catalystQuant, senMat, senFoil, frame, eut) => {

        const multiplier = (value) => value + scaler * value;
        const partialMultiplier = (value, fraction) => value + scale * fraction;
        const exponentialMultiplier = (base) => base * (2 ** scale);

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

    