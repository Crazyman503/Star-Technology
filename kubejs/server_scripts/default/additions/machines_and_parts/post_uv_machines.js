ServerEvents.recipes(event => {
    const id = global.id;

    // event.remove({ output: /gtceu:uv.*/, type: "minecraft:crafting_shaped" });
    event.remove({ not: { output: 'gtceu:uhv_ultimate_battery' }, output: /gtceu:uhv.*/ });
    event.remove({ not: { input: 'gtceu:uhv_ultimate_battery' }, input: /gtceu:uhv.*/ });
    event.remove({ output: /gtceu:uev.*/ });
    event.remove({ input: /gtceu:uev.*/ });
    event.remove({ output: /gtceu:uiv.*/ });
    event.remove({ input: /gtceu:uiv.*/ });
    event.remove({ output: /gtceu:uxv.*/ });
    event.remove({ input: /gtceu:uxv.*/ });
    event.remove({ output: /gtceu:opv.*/ });
    event.remove({ input: /gtceu:opv.*/ });
    event.remove({ not: { output: 'gtceu:max_battery' }, output: /gtceu:max.*/ });
    event.remove({ not: { input: 'gtceu:max_battery' }, input: /gtceu:max.*/ });
    event.remove({ output: `gtceu:uv_input_hatch` });
    event.remove({ output: `gtceu:uv_input_bus` });
    event.remove({ output: `gtceu:uv_dual_input_hatch` });
    event.remove({ output: `gtceu:uv_output_hatch` });
    event.remove({ output: `gtceu:uv_output_bus` });
    event.remove({ output: `gtceu:uv_dual_output_hatch` });

    global.not_hardmode(() => {
        const components = global.componentMaterials;

        function postUVMachines(tierKey) {
            const tierData = components[tierKey];

            if (!tierData) return;

            const {
                tiers: { tier, tier0, tier1 },
                materials: { tierMaterial, wire, elctrlyzWire, tierFluid, plastic, cable, cable1, primMagnet, pipeMaterial, glass, buzz, chip, math }
            } = tierData;

            // Machines
            event.shaped(Item.of(`gtceu:${tier}_machine_casing`), [
                'PPP',
                'PWP',
                'PPP'
            ], {
                P: `gtceu:${tierMaterial}_plate`,
                W: '#forge:tools/wrenches'
            }).id(`start:shaped/${tier}_machine_casing`);

            event.recipes.gtceu.assembler(id(`${tier}_machine_casing`))
                .itemInputs(`8x gtceu:${tierMaterial}_plate`)
                .circuit(8)
                .itemOutputs(`gtceu:${tier}_machine_casing`)
                .duration(50)
                .EUt(16);

            event.shaped(Item.of(`gtceu:${tier}_machine_hull`), [
                '   ',
                'LPL',
                'CMC'
            ], {
                P: `gtceu:${tierMaterial}_plate`,
                L: `gtceu:${plastic}_plate`,
                C: `gtceu:${cable}_single_cable`,
                M: `gtceu:${tier}_machine_casing`
            }).id(`start:shaped/${tier}_machine_hull`);

            event.recipes.gtceu.assembler(id(`${tier}_machine_hull`))
                .itemInputs(`gtceu:${tier}_machine_casing`, `2x gtceu:${cable}_single_cable`)
                .inputFluids(`gtceu:${plastic} 288`)
                .itemOutputs(`gtceu:${tier}_machine_hull`)
                .duration(50)
                .EUt(16);

            event.shaped(Item.of(`gtceu:${tier}_electric_furnace`), [
                'IWI',
                'WHW',
                'CWC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                W: `gtceu:${wire}_double_wire`,
                C: `gtceu:${cable}_single_cable`,
                H: `gtceu:${tier}_machine_hull`
            }).id(`start:shaped/${tier}_electric_furnace`);

            event.shaped(Item.of(`gtceu:${tier}_alloy_smelter`), [
                'IWI',
                'WHW',
                'CWC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                W: `gtceu:${wire}_quadruple_wire`,
                C: `gtceu:${cable}_single_cable`,
                H: `gtceu:${tier}_machine_hull`
            }).id(`start:shaped/${tier}_alloy_smelter`);

            event.shaped(Item.of(`gtceu:${tier}_arc_furnace`), [
                'CGC',
                'IHI',
                'PPP'
            ], {
                I: `#gtceu:circuits/${tier}`,
                G: `gtceu:graphite_dust`,
                C: `gtceu:${cable}_quadruple_cable`,
                H: `gtceu:${tier}_machine_hull`,
                P: `gtceu:${tierMaterial}_plate`
            }).id(`start:shaped/${tier}_arc_furnace`);

            event.shaped(Item.of(`gtceu:${tier}_assembler`), [
                'AIA',
                'VHV',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                C: `gtceu:${cable}_single_cable`,
                H: `gtceu:${tier}_machine_hull`,
                A: `gtceu:${tier}_robot_arm`,
                V: `gtceu:${tier}_conveyor_module`
            }).id(`start:shaped/${tier}_assembler`);

            event.shaped(Item.of(`gtceu:${tier}_autoclave`), [
                'PGP',
                'PHP',
                'IUI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                G: `${glass}`,
                H: `gtceu:${tier}_machine_hull`,
                P: `gtceu:${tierMaterial}_plate`,
                U: `gtceu:${tier}_electric_pump`
            }).id(`start:shaped/${tier}_autoclave`);

            event.shaped(Item.of(`gtceu:${tier}_bender`), [
                'SPS',
                'IHI',
                'MCM'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                P: `gtceu:${tierMaterial}_plate`,
                M: `gtceu:${tier}_electric_motor`,
                S: `gtceu:${tier}_electric_piston`
            }).id(`start:shaped/${tier}_bender`);

            event.shaped(Item.of(`gtceu:${tier}_brewery`), [
                'GUG',
                'CHC',
                'ISI'
            ], {
                G: `${glass}`,
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                U: `gtceu:${tier}_electric_pump`,
                S: `gtceu:${wire}_spring`
            }).id(`start:shaped/${tier}_brewery`);

            event.shaped(Item.of(`gtceu:${tier}_canner`), [
                'CUC',
                'IHI',
                'GGG'
            ], {
                G: `${glass}`,
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                U: `gtceu:${tier}_electric_pump`
            }).id(`start:shaped/${tier}_canner`);

            event.shaped(Item.of(`gtceu:${tier}_centrifuge`), [
                'IMI',
                'CHC',
                'IMI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                M: `gtceu:${tier}_electric_motor`
            }).id(`start:shaped/${tier}_centrifuge`);

            event.shaped(Item.of(`gtceu:${tier}_chemical_bath`), [
                'VGC',
                'UGV',
                'IHI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                U: `gtceu:${tier}_electric_pump`,
                V: `gtceu:${tier}_conveyor_module`,
                G: `${glass}`
            }).id(`start:shaped/${tier}_chemical_bath`);

            event.shaped(Item.of(`gtceu:${tier}_chemical_reactor`), [
                'ERE',
                'CMC',
                'IHI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                E: `gtceu:${plastic}_large_fluid_pipe`,
                R: `gtceu:${tierMaterial}_rotor`,
                M: `gtceu:${tier}_electric_motor`
            }).id(`start:shaped/${tier}_chemical_reactor`);

            event.shaped(Item.of(`gtceu:${tier}_compressor`), [
                ' I ',
                'SHS',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                S: `gtceu:${tier}_electric_piston`
            }).id(`start:shaped/${tier}_compressor`);

            event.shaped(Item.of(`gtceu:${tier}_cutter`), [
                'CIG',
                'VHB',
                'ICM'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                V: `gtceu:${tier}_conveyor_module`,
                M: `gtceu:${tier}_electric_motor`,
                G: `${glass}`,
                B: `gtceu:${buzz}_buzz_saw_blade`
            }).id(`start:shaped/${tier}_cutter`);

            event.shaped(Item.of(`gtceu:${tier}_distillery`), [
                'GSG',
                'IHI',
                'CUC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `${glass}`,
                S: `gtceu:${wire}_spring`,
                U: `gtceu:${tier}_electric_pump`
            }).id(`start:shaped/${tier}_distillery`);

            event.shaped(Item.of(`gtceu:${tier}_electrolyzer`), [
                'WGW',
                'WHW',
                'ICI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `${glass}`,
                W: `gtceu:${elctrlyzWire}_single_wire`
            }).id(`start:shaped/${tier}_electrolyzer`);

            event.shaped(Item.of(`gtceu:${tier}_electromagnetic_separator`), [
                'VCW',
                'CHG',
                'ICW'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `gtceu:${primMagnet}_rod`,
                W: `gtceu:${cable}_octal_wire`,
                V: `gtceu:${tier}_conveyor_module`
            }).id(`start:shaped/${tier}_electromagnetic_separator`);

            event.shaped(Item.of(`gtceu:${tier}_extractor`), [
                'GIG',
                'SHU',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `${glass}`,
                U: `gtceu:${tier}_electric_pump`,
                S: `gtceu:${tier}_electric_piston`
            }).id(`start:shaped/${tier}_extractor`);

            event.shaped(Item.of(`gtceu:${tier}_extruder`), [
                'WWI',
                'SHE',
                'WWI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                S: `gtceu:${tier}_electric_piston`,
                W: `gtceu:${wire}_quadruple_wire`,
                E: `gtceu:${pipeMaterial}_normal_fluid_pipe`
            }).id(`start:shaped/${tier}_extruder`);

            event.shaped(Item.of(`gtceu:${tier}_fermenter`), [
                'CUC',
                'GHG',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `${glass}`,
                U: `gtceu:${tier}_electric_pump`
            }).id(`start:shaped/${tier}_fermenter`);

            event.shaped(Item.of(`gtceu:${tier}_fluid_heater`), [
                'WGW',
                'UHU',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `${glass}`,
                U: `gtceu:${tier}_electric_pump`,
                W: `gtceu:${wire}_quadruple_wire`
            }).id(`start:shaped/${tier}_fluid_heater`);

            event.shaped(Item.of(`gtceu:${tier}_fluid_solidifier`), [
                'UGU',
                'CHC',
                'IRI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `${glass}`, R: 'minecraft:chest',
                U: `gtceu:${tier}_electric_pump`
            }).id(`start:shaped/${tier}_fluid_solidifier`);

            event.shaped(Item.of(`gtceu:${tier}_forge_hammer`), [
                'CSC',
                'IHI',
                'CRC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                S: `gtceu:${tier}_electric_piston`,
                R: 'minecraft:anvil'
            }).id(`start:shaped/${tier}_forge_hammer`);

            event.shaped(Item.of(`gtceu:${tier}_forming_press`), [
                'CSC',
                'IHI',
                'CSC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                S: `gtceu:${tier}_electric_piston`
            }).id(`start:shaped/${tier}_forming_press`);

            event.shaped(Item.of(`gtceu:${tier}_lathe`), [
                'CIC',
                'MHR',
                'ICS'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                S: `gtceu:${tier}_electric_piston`,
                M: `gtceu:${tier}_electric_motor`,
                R: 'gtceu:tungsten_grinding_head'
            }).id(`start:shaped/${tier}_lathe`);

            event.shaped(Item.of(`gtceu:${tier}_scanner`), [
                'IEI',
                'CHC',
                'ISI'
            ], {
                I: `#gtceu:circuits/${tier0}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                E: `gtceu:${tier}_emitter`,
                S: `gtceu:${tier}_sensor`
            }).id(`start:shaped/${tier}_scanner`);

            event.shaped(Item.of(`gtceu:${tier}_mixer`), [
                'GRG',
                'GMG',
                'IHI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                G: `${glass}`,
                R: `gtceu:${tierMaterial}_rotor`,
                M: `gtceu:${tier}_electric_motor`
            }).id(`start:shaped/${tier}_mixer`);

            event.shaped(Item.of(`gtceu:${tier}_ore_washer`), [
                'RGR',
                'IMI',
                'CHC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `${glass}`,
                R: `gtceu:${tierMaterial}_rotor`,
                M: `gtceu:${tier}_electric_motor`
            }).id(`start:shaped/${tier}_ore_washer`);

            event.shaped(Item.of(`gtceu:${tier}_packer`), [
                'RIR',
                'AHV',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                A: `gtceu:${tier}_robot_arm`,
                V: `gtceu:${tier}_conveyor_module`,
                R: 'minecraft:chest'
            }).id(`start:shaped/${tier}_packer`);

            event.shaped(Item.of(`gtceu:${tier}_polarizer`), [
                'WGW',
                'CHC',
                'WGW'
            ], {
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                G: `gtceu:${primMagnet}_rod`,
                W: `gtceu:${cable}_octal_wire`
            }).id(`start:shaped/${tier}_polarizer`);

            event.shaped(Item.of(`gtceu:${tier}_laser_engraver`), [
                'SES',
                'IHI',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                E: `gtceu:${tier}_emitter`,
                S: `gtceu:${tier}_electric_piston`
            }).id(`start:shaped/${tier}_laser_engraver`);

            event.shaped(Item.of(`gtceu:${tier}_sifter`), [
                'CFC',
                'SHS',
                'IFI'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                F: `gtceu:item_filter`,
                S: `gtceu:${tier}_electric_piston`
            }).id(`start:shaped/${tier}_sifter`);

            event.shaped(Item.of(`gtceu:${tier}_thermal_centrifuge`), [
                'IMI',
                'WHW',
                'CMC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                M: `gtceu:${tier}_electric_motor`,
                W: `gtceu:${wire}_quadruple_wire`
            }).id(`start:shaped/${tier}_thermal_centrifuge`);

            event.shaped(Item.of(`gtceu:${tier}_wiremill`), [
                'MCM',
                'IHI',
                'MCM'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                M: `gtceu:${tier}_electric_motor`
            }).id(`start:shaped/${tier}_wiremill`);

            event.shaped(Item.of(`gtceu:${tier}_circuit_assembler`), [
                'AIE',
                'VHV',
                'CIC'
            ], {
                I: `#gtceu:circuits/${tier0}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                A: `gtceu:${tier}_robot_arm`,
                V: `gtceu:${tier}_conveyor_module`,
                E: `gtceu:${tier}_emitter`
            }).id(`start:shaped/${tier}_circuit_assembler`);

            event.shaped(Item.of(`gtceu:${tier}_macerator`), [
                'SMR',
                'CCH',
                'IIC'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                S: `gtceu:${tier}_electric_piston`,
                M: `gtceu:${tier}_electric_motor`,
                R: 'gtceu:tungsten_grinding_head'
            }).id(`start:shaped/${tier}_macerator`);

            event.shaped(Item.of(`gtceu:${tier}_gas_collector`), [
                'BFB',
                'UHU',
                'BIB'
            ], {
                I: `#gtceu:circuits/${tier}`,
                H: `gtceu:${tier}_machine_hull`,
                U: `gtceu:${tier}_electric_pump`,
                F: 'gtceu:fluid_filter',
                B: 'minecraft:iron_bars'
            }).id(`start:shaped/${tier}_gas_collector`);

            event.shaped(Item.of(`gtceu:${tier}_rock_crusher`), [
                'SMR',
                'CHC',
                'GGG'
            ], {
                H: `gtceu:${tier}_machine_hull`,
                C: `gtceu:${cable}_single_cable`,
                S: `gtceu:${tier}_electric_piston`,
                M: `gtceu:${tier}_electric_motor`,
                R: 'gtceu:tungsten_grinding_head',
                G: `${glass}`
            }).id(`start:shaped/${tier}_rock_crusher`);

            event.shaped(Item.of(`gtceu:${tier}_muffler_hatch`), [
                'HM',
                'PR'
            ], {
                H: `gtceu:${tier}_machine_hull`,
                M: `gtceu:${tier}_electric_motor`,
                P: `gtceu:${pipeMaterial}_normal_fluid_pipe`,
                R: `gtceu:${tierMaterial}_rotor`
            }).id(`start:shaped/${tier}_muffler_hatch`);

            [
                { amps: '1a', cableThickness: 'single' },
                { amps: '2a', cableThickness: 'double' },
                { amps: '4a', cableThickness: 'quadruple' },
                { amps: '16a', cableThickness: 'hex' }
            ].forEach(transformerData => {
                event.shaped(Item.of(`gtceu:${tier}_transformer_${transformerData.amps}`), [
                    'CLL',
                    'UH ',
                    'CLL'
                ], {
                    H: `gtceu:${tier}_machine_hull`,
                    L: `gtceu:${cable}_${transformerData.cableThickness}_cable`,
                    U: `gtceu:${cable1}_${transformerData.cableThickness}_cable`,
                    C: `${chip}_chip`
                }).id(`start:shaped/${tier}_transformer_${transformerData.amps}`);
            });

            [
                { size: '4x', cableThickness: 'quadruple' },
                { size: '8x', cableThickness: 'octal' },
                { size: '16x', cableThickness: 'hex' }
            ].forEach(bufferData => {
                event.shaped(Item.of(`gtceu:${tier}_battery_buffer_${bufferData.size}`), [
                    '   ',
                    'WCW',
                    'WHW'
                ], {
                    H: `gtceu:${tier}_machine_hull`,
                    W: `gtceu:${wire}_${bufferData.cableThickness}_wire`,
                    C: 'minecraft:chest'
                }).id(`start:shaped/${tier}_battery_buffer_${bufferData.size}`);
            });

            event.shaped(Item.of(`gtceu:${tier}_charger_4x`), [
                'WRW',
                'WHW',
                'CIC'
            ], {
                H: `gtceu:${tier}_machine_hull`,
                W: `gtceu:${wire}_quadruple_wire`,
                R: 'minecraft:chest',
                I: `#gtceu:circuits/${tier}`,
                C: `gtceu:${cable}_single_cable`
            }).id(`start:shaped/${tier}_charger_4x`);

            [
                { type: 'input', powerTr: 'single_cable', math4a: '4', laserType: 'target', laserPart: 'sensor' },
                { type: 'output', powerTr: 'spring', math4a: '1', laserType: 'source', laserPart: 'emitter' }
            ].forEach(energyIOData => {
                event.recipes.gtceu.assembly_line(id(`${tier}_energy_${energyIOData.type}_hatch`))
                    .itemInputs(`gtceu:${tier}_machine_hull`, `4x gtceu:${cable}_${energyIOData.powerTr}`, `2x ${chip}_chip`, `#gtceu:circuits/${tier}`, `2x kubejs:${tier}_voltage_coil`)
                    .inputFluids(`gtceu:sodium_potassium ${math * 4000 + 12000}`, `gtceu:indium_tin_lead_cadmium_soldering_alloy ${1440 * (2 ** math)}`)
                    .itemOutputs(`gtceu:${tier}_energy_${energyIOData.type}_hatch`)
                    .stationResearch(
                        researchRecipeBuilder => researchRecipeBuilder
                            .researchStack(Item.of(`gtceu:${tier1}_energy_${energyIOData.type}_hatch`))
                            .EUt(122880 * (4 ** math))
                            .CWUt(math * 64 + 64))
                    .duration(800)
                    .EUt(491520 * (4 ** math));

                event.recipes.gtceu.assembler(id(`${tier}_energy_${energyIOData.type}_hatch_4a`))
                    .itemInputs(`gtceu:${tier}_energy_${energyIOData.type}_hatch`, `2x gtceu:${cable}_quadruple_wire`, `2x gtceu:${tierMaterial}_plate`)
                    .itemOutputs(`gtceu:${tier}_energy_${energyIOData.type}_hatch_4a`)
                    .duration(100)
                    .EUt(122880 * energyIOData.math4a * (4 ** math));

                event.recipes.gtceu.assembler(id(`${tier}_energy_${energyIOData.type}_hatch_16a`))
                    .itemInputs(`gtceu:${tier}_transformer_1a`, `gtceu:${tier}_energy_${energyIOData.type}_hatch_4a`, `2x gtceu:${cable}_octal_wire`, `4x gtceu:${tierMaterial}_plate`)
                    .itemOutputs(`gtceu:${tier}_energy_${energyIOData.type}_hatch_16a`)
                    .duration(200)
                    .EUt(491520 * (4 ** math));

                event.recipes.gtceu.assembler(id(`${tier}_substation_${energyIOData.type}_hatch_64a`))
                    .itemInputs(`gtceu:${tier}_transformer_16a`, `gtceu:${tier}_energy_${energyIOData.type}_hatch_16a`, `2x gtceu:${cable}_hex_wire`, `6x gtceu:${tierMaterial}_plate`)
                    .itemOutputs(`gtceu:${tier}_substation_${energyIOData.type}_hatch_64a`)
                    .duration(400)
                    .EUt(491520 * (4 ** math));

                event.recipes.gtceu.assembler(id(`${tier}_256a_laser_${energyIOData.laserType}_hatch`))
                    .itemInputs(`gtceu:${tier}_machine_hull`, 'gtceu:diamond_lens', `gtceu:${tier}_${energyIOData.laserPart}`, `gtceu:${tier}_electric_pump`, `4x gtceu:${cable}_single_cable`)
                    .itemOutputs(`gtceu:${tier}_256a_laser_${energyIOData.laserType}_hatch`)
                    .duration(300).circuit(1)
                    .EUt(491520 * (4 ** math));

                event.recipes.gtceu.assembler(id(`${tier}_1024a_laser_${energyIOData.laserType}_hatch`))
                    .itemInputs(`gtceu:${tier}_machine_hull`, '2x gtceu:diamond_lens', `2x gtceu:${tier}_${energyIOData.laserPart}`, `2x gtceu:${tier}_electric_pump`, `4x gtceu:${cable}_double_cable`)
                    .itemOutputs(`gtceu:${tier}_1024a_laser_${energyIOData.laserType}_hatch`)
                    .duration(600).circuit(2)
                    .EUt(491520 * (4 ** math));

                event.recipes.gtceu.assembler(id(`${tier}_4096a_laser_${energyIOData.laserType}_hatch`))
                    .itemInputs(`gtceu:${tier}_machine_hull`, '4x gtceu:diamond_lens', `4x gtceu:${tier}_${energyIOData.laserPart}`, `4x gtceu:${tier}_electric_pump`, `4x gtceu:${cable}_quadruple_cable`)
                    .itemOutputs(`gtceu:${tier}_4096a_laser_${energyIOData.laserType}_hatch`)
                    .duration(1200).circuit(3)
                    .EUt(491520 * (4 ** math));
            });

            // Parallel Hatches
            event.shaped(Item.of(`start_core:${tier}_parallel_hatch`), [
                'SCE',
                'CHC',
                'BCB'
            ], {
                S: `gtceu:${tier}_sensor`,
                E: `gtceu:${tier}_emitter`,
                C: `#gtceu:circuits/${tier0}`,
                H: `gtceu:${tier}_machine_hull`,
                B: `gtceu:${cable}_double_cable`
            }).id(`start:shaped/${tier}_parallel_hatch`);

            event.recipes.gtceu.assembler(id(`${tier}_absolute_parallel_hatch`))
                .itemInputs(
                    `start_core:${tier}_parallel_hatch`,
                    `4x gtceu:${tier}_sensor`,
                    `4x gtceu:${tier}_emitter`,
                    `2x #gtceu:circuits/${tier0}`,
                    `4x ${chip}_chip`)
                .inputFluids(`gtceu:${tierFluid} 576`)
                .itemOutputs(`start_core:${tier}_absolute_parallel_hatch`)
                .duration(320)
                .EUt(GTValues.VA[GTValues[tier.toUpperCase()]]);
        }

        postUVMachines('uhv');
        postUVMachines('uev');
        postUVMachines('uiv');

        //UV/UHV Regular IO, No UEV or higher as they all scale the same as UHV as of current
        [
            { tier: "uv", lowerTier: "lv", mod: 0, pipeMaterial: 'naquadah', frameMaterial: 'naquadah_alloy' },
            { tier: "uhv", lowerTier: "mv", mod: 1, pipeMaterial: 'zapolgium', frameMaterial: 'neutronium' }
        ].forEach(tierData => {
            [
                { typeIO: 'input', circ: '1' },
                { typeIO: 'output', circ: '2' }
            ].forEach(ioData => {
                event.recipes.gtceu.assembler(id(`${tierData.tier}_${ioData.typeIO}_bus`))
                    .itemInputs(`gtceu:${tierData.tier}_machine_hull`, `gtceu:${tierData.lowerTier}_super_chest`)
                    .inputFluids(`gtceu:polyether_ether_ketone ${324 + (tierData.mod * 36)}`)
                    .itemOutputs(`gtceu:${tierData.tier}_${ioData.typeIO}_bus`)
                    .duration(300)
                    .EUt(GTValues.VA[GTValues[tierData.tier.toUpperCase()]])
                    .circuit(ioData.circ);

                event.recipes.gtceu.assembler(id(`${tierData.tier}_${ioData.typeIO}_hatch`))
                    .itemInputs(`gtceu:${tierData.tier}_machine_hull`, `gtceu:${tierData.lowerTier}_super_tank`)
                    .inputFluids(`gtceu:polyether_ether_ketone ${324 + (tierData.mod * 36)}`)
                    .itemOutputs(`gtceu:${tierData.tier}_${ioData.typeIO}_hatch`)
                    .duration(300)
                    .EUt(GTValues.VA[GTValues[tierData.tier.toUpperCase()]])
                    .circuit(ioData.circ);

                event.recipes.gtceu.assembler(id(`${tierData.tier}_dual_${ioData.typeIO}_hatch`))
                    .itemInputs(`gtceu:${tierData.tier}_${ioData.typeIO}_bus`, `gtceu:${tierData.tier}_${ioData.typeIO}_hatch`, `gtceu:${tierData.pipeMaterial}_nonuple_fluid_pipe`, `3x gtceu:${tierData.frameMaterial}_frame`)
                    .inputFluids(`gtceu:polyether_ether_ketone ${1296 + (tierData.mod * 144)}`)
                    .itemOutputs(`gtceu:${tierData.tier}_dual_${ioData.typeIO}_hatch`)
                    .duration(300)
                    .EUt(GTValues.VA[GTValues[tierData.tier.toUpperCase()]])
                    .circuit(ioData.circ);
            });

            event.shaped(Item.of(`gtceu:${tierData.tier}_dual_input_hatch`), [
                'S',
                'H'
            ], {
                S: '#forge:tools/screwdrivers',
                H: `gtceu:${tierData.tier}_dual_output_hatch`
            }).id(`start:shaped/${tierData.tier}_dual_input_hatch_flip`);

            event.shaped(Item.of(`gtceu:${tierData.tier}_dual_output_hatch`), [
                'S',
                'H'
            ], {
                S: '#forge:tools/screwdrivers',
                H: `gtceu:${tierData.tier}_dual_input_hatch`
            }).id(`start:shaped/${tierData.tier}_dual_output_hatch_flip`);

            event.shaped(Item.of(`gtceu:${tierData.tier}_input_hatch`), [
                'S',
                'H'
            ], {
                S: '#forge:tools/screwdrivers',
                H: `gtceu:${tierData.tier}_output_hatch`
            }).id(`start:shaped/${tierData.tier}_input_hatch`);

            event.shaped(Item.of(`gtceu:${tierData.tier}_output_hatch`), [
                'S',
                'H'
            ], {
                S: '#forge:tools/screwdrivers',
                H: `gtceu:${tierData.tier}_input_hatch`
            }).id(`start:shaped/${tierData.tier}_output_hatch`);

            event.shaped(Item.of(`gtceu:${tierData.tier}_input_bus`), [
                'S',
                'H'
            ], {
                S: '#forge:tools/screwdrivers',
                H: `gtceu:${tierData.tier}_output_bus`
            }).id(`start:shaped/${tierData.tier}_input_bus`);

            event.shaped(Item.of(`gtceu:${tierData.tier}_output_bus`), [
                'S',
                'H'
            ], {
                S: '#forge:tools/screwdrivers',
                H: `gtceu:${tierData.tier}_input_bus`
            }).id(`start:shaped/${tierData.tier}_output_bus`);
        });

        [
            { type: '4x', pipe: 'quadruple' },
            { type: '9x', pipe: 'nonuple' }
        ].forEach(hatchScaleData => {
            event.shaped(Item.of(`gtceu:uhv_input_hatch_${hatchScaleData.type}`), [
                'P',
                'H'
            ], {
                H: `gtceu:uhv_input_hatch`,
                P: `gtceu:zapolgium_${hatchScaleData.pipe}_fluid_pipe`
            }).id(`start:shaped/uhv_input_hatch_${hatchScaleData.type}`);

            event.shaped(Item.of(`gtceu:uhv_input_hatch_${hatchScaleData.type}`), [
                'S',
                'H'
            ], {
                S: `#forge:tools/screwdrivers`,
                H: `gtceu:uhv_output_hatch_${hatchScaleData.type}`
            }).id(`start:shaped/uhv_input_hatch_${hatchScaleData.type}_flip`);

            event.shaped(Item.of(`gtceu:uhv_output_hatch_${hatchScaleData.type}`), [
                'H',
                'P'
            ], {
                H: `gtceu:uhv_output_hatch`,
                P: `gtceu:zapolgium_${hatchScaleData.pipe}_fluid_pipe`
            }).id(`start:shaped/uhv_output_hatch_${hatchScaleData.type}`);

            event.shaped(Item.of(`gtceu:uhv_output_hatch_${hatchScaleData.type}`), [
                'S',
                'H'
            ], {
                S: `#forge:tools/screwdrivers`,
                H: `gtceu:uhv_input_hatch_${hatchScaleData.type}`
            }).id(`start:shaped/uhv_output_hatch_${hatchScaleData.type}_flip`);
        });

        // UHV Containers
        event.shaped('gtceu:uhv_quantum_chest', [
            'CPC',
            'PHP',
            'CFC'
        ], {
            C: '#gtceu:circuits/uhv',
            P: 'gtceu:dense_neutronium_plate',
            H: 'gtceu:uhv_machine_hull',
            F: 'gtceu:zpm_field_generator'
        }).id(id('uhv_quantum_chest'));

        event.shaped('gtceu:uhv_quantum_tank', [
            'CFC',
            'PHP',
            'CMC'
        ], {
            C: '#gtceu:circuits/uhv',
            P: 'gtceu:dense_neutronium_plate',
            H: 'gtceu:uhv_hermetic_casing',
            F: 'gtceu:zpm_field_generator',
            M: 'gtceu:uhv_electric_pump'
        }).id(id('uhv_quantum_tank'));

        event.shaped('gtceu:uhv_hermetic_casing', [
            'PPP',
            'PHP',
            'PPP'
        ], {
            P: 'gtceu:neutronium_plate',
            H: 'gtceu:polyether_ether_ketone_large_fluid_pipe'
        }).id(id('uhv_hermetic_casing'));
    });
});