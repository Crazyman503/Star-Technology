ServerEvents.recipes(event => {
    const id = global.id;

    const assemblyMaterials = (scale, tier, tier1, tier2, primary, secondary, mechanicalWire, cable, pipe, superConductor, catalyst, senMat, senFoil, frame, eut) => {
        const componentTypesAssemblyLine = (type, inputs, fluids, circuit) => {

            const COMPONENT_NEXUS_HAS_CIRCUIT = false;

            let nexusRecipe = event.recipes.gtceu.component_nexus(id(`${tier}_${type}`))
                                .itemInputs(inputs)
                                .inputFluids(fluids)
                                .inputFluids(`gtceu:naquadria 576`)
                                .itemOutputs(`gtceu:${tier}_${type}`)
                                .duration(600)
                                .cleanroom(CleanroomType.getByName('stabilized'))
                                .EUt(eut);

            if (tier === 'uv') {
                nexusRecipe = nexusRecipe.inputFluids(`gtceu:naquadria 576`);
            }

            if (COMPONENT_NEXUS_HAS_CIRCUIT) {
                nexusRecipe.circuit(circuit);
            }
        }

        componentTypesAssemblyLine('electric_motor', [
                `1x gtceu:long_magnetic_samarium_rod`,
                `4x gtceu:long_${primary}_rod`,
                `4x gtceu:${primary}_ring`,
                `8x gtceu:${primary}_round`,
                `64x gtceu:fine_${mechanicalWire}_wire`,
                `2x gtceu:${cable}_single_cable`
            ],[
                `gtceu:soldering_alloy ${72*(2**scale)}`,
                `gtceu:lubricant ${125*(2**scale)}`
            ], 0);

        componentTypesAssemblyLine('electric_pump', [
                `1x gtceu:${tier}_electric_motor`,
                `1x gtceu:${pipe}_normal_fluid_pipe`,
                `2x gtceu:${primary}_plate`,
                `8x gtceu:${primary}_screw`,
                `${2*(scale+1)}x gtceu:silicone_rubber_ring`,
                `1x gtceu:${secondary}_rotor`,
                `2x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${72*(2**scale)}`,
                `gtceu:lubricant ${125*(2**scale)}`
            ], 1);

        componentTypesAssemblyLine('conveyor_module', [
                `2x gtceu:${tier}_electric_motor`,
                `2x gtceu:${primary}_plate`,
                `4x gtceu:${primary}_ring`,
                `16x gtceu:${primary}_round`,
                `4x gtceu:${primary}_screw`,
                `2x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${72*(2**scale)}`,
                `gtceu:lubricant ${125*(2**scale)}`,
                `gtceu:styrene_butadiene_rubber ${scale*1152}`
            ], 2);

        componentTypesAssemblyLine('electric_piston', [
                `1x gtceu:${tier}_electric_motor`,
                `4x gtceu:${primary}_plate`,
                `4x gtceu:${primary}_ring`,
                `16x gtceu:${primary}_round`,
                `4x gtceu:${primary}_rod`,
                `1x gtceu:${secondary}_gear`,
                `2x gtceu:small_${secondary}_gear`,
                `2x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${72*(2**scale)}`,
                `gtceu:lubricant ${125*(2**scale)}`
            ], 3);

        componentTypesAssemblyLine('robot_arm', [
                `4x gtceu:long_${primary}_rod`,
                `1x gtceu:${primary}_gear`,
                `3x gtceu:small_${primary}_gear`,
                `2x gtceu:${tier}_electric_motor`,
                `1x gtceu:${tier}_electric_piston`,
                `1x #gtceu:circuits/${tier}`,
                `2x #gtceu:circuits/${tier1}`,
                `4x #gtceu:circuits/${tier2}`,
                `4x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${576*scale}`,
                `gtceu:lubricant ${125*(2**scale)}`
            ], 4);

        componentTypesAssemblyLine('field_generator', [
                `1x gtceu:${frame}_frame`,
                `6x gtceu:${frame}_plate`,
                catalyst,
                `2x gtceu:${tier}_emitter`,
                `2x #gtceu:circuits/${tier}`,
                `128x gtceu:fine_${superConductor}_wire`,
                `4x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${576*scale}`
            ], 5);

        componentTypesAssemblyLine('emitter', [
                `1x gtceu:${frame}_frame`,
                `1x gtceu:${tier}_electric_motor`,
                `4x gtceu:long_${senMat}_rod`,
                catalyst,
                `2x #gtceu:circuits/${tier}`,
                `96x gtceu:${senFoil}_foil`,
                `4x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${144*(2**scale)}`
            ], 6);

        componentTypesAssemblyLine('sensor', [
                `1x gtceu:${frame}_frame`,
                `1x gtceu:${tier}_electric_motor`,
                `4x gtceu:${senMat}_plate`,
                catalyst,
                `2x #gtceu:circuits/${tier}`,
                `96x gtceu:${senFoil}_foil`,
                `4x gtceu:${cable}_single_cable`
            ], [
                `gtceu:soldering_alloy ${144*(2**scale)}`
            ], 7);

        }

    assemblyMaterials(1, // scale
        'luv', 'iv', 'ev', // tier, tier1, tier2
        'hsss', 'hsss', // primary, secondary
        'ruridit', // mechanicalWire
        'niobium_titanium', // cable
        'niobium_titanium', // pipe
        'indium_tin_barium_titanium_cuprate', // superConductor
        'gtceu:quantum_star', // catalyst
        'ruridit', // senMat
        'palladium', // senFoil
        'hsss', // frame
        6000 // eut (IV, 73.24% amp)
    );

    assemblyMaterials(2, // scale
        'zpm', 'luv', 'iv', // tier, tier1, tier2
        'osmiridium', 'osmiridium', // primary, secondary
        'europium', // mechanicalWire
        'vanadium_gallium', // cable
        'polybenzimidazole', // pipe
        'uranium_rhodium_dinaquadide', // superConductor
        '2x gtceu:quantum_star', // catalyst
        'osmiridium', // senMat
        'trinium', // senFoil
        'naquadah_alloy', // frame
        24000 // eut (LuV, 73.24% amp)
    );
    
    assemblyMaterials(3,
        'uv', 'zpm', 'luv',
        'tritanium', 'naquadah_alloy',
        'americium',
        'yttrium_barium_cuprate',
        'naquadah',
        'enriched_naquadah_trinium_europium_duranide',
        'gtceu:gravi_star',
        'tritanium',
        'naquadria',
        'tritanium',
        100000 // eut (ZPM, 76.29% amp)
    );

});