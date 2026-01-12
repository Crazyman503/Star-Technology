ServerEvents.recipes(event => {
    const id = global.id;

    [
        'gtceu:circuit_assembler/quantum_mainframe_zpm','gtceu:circuit_assembler/quantum_mainframe_zpm_soldering_alloy',
        'gtceu:circuit_assembler/quantum_mainframe_zpm_asmd','gtceu:circuit_assembler/quantum_mainframe_zpm_asmd_soldering_alloy',
        'gtceu:circuit_assembler/crystal_computer_zpm','gtceu:circuit_assembler/crystal_computer_zpm_soldering_alloy',
        'gtceu:assembly_line/crystal_mainframe_uv', 'gtceu:research_station/1_x_gtceu_crystal_processor_computer',
        'gtceu:assembly_line/wetware_super_computer_uv','gtceu:research_station/1_x_gtceu_wetware_processor_assembly',
        'gtceu:assembly_line/wetware_mainframe_uhv', 'gtceu:research_station/1_x_gtceu_wetware_processor_computer'
    ].forEach( idRemoved => {
        event.remove({ id: idRemoved });
    });

    const asmdDiode = 'gtceu:advanced_smd_diode';
    const asmdInductor = 'gtceu:advanced_smd_inductor';
    const asmdTransistor = 'gtceu:advanced_smd_transistor';
    const asmdResistor = 'gtceu:advanced_smd_resistor';
    const asmdCapacitor = 'gtceu:advanced_smd_capacitor';

    const lsmdDiode = 'kubejs:living_smd_diode';
    const lsmdInductor = 'kubejs:living_smd_inductor';
    const lsmdTransistor = 'kubejs:living_smd_transistor';
    const lsmdResistor = 'kubejs:living_smd_resistor';
    const lsmdCapacitor = 'kubejs:living_smd_capacitor';

    const assemblyLineCircuitNoRS = (type, mod, inputs, fluids, eut, dura, toScan) => {
        event.recipes.gtceu.assembly_line(id(type))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`${mod}:${type}`)
            ["scannerResearch(java.util.function.UnaryOperator)"](
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(toScan))
                    .duration(dura * 2)
                    .EUt(eut/4)
                )
            .duration(dura)
            .EUt(eut);
    };

    const assemblyLineCircuitRS = (type, mod, inputs, fluids, eut, dura, from, cwu, eutFrom) => {
        event.recipes.gtceu.assembly_line(id(type))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`${mod}:${type}`)
            .duration(dura)
            .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(from)
                .EUt(eutFrom)
                .CWUt(cwu)
            )
            .EUt(eut);
    };

    //Rebalancing
    assemblyLineCircuitNoRS('quantum_processor_mainframe', 'gtceu', [
            '2x gtceu:hssg_frame',
            '2x gtceu:quantum_processor_computer',
            '24x gtceu:ram_chip',
            '2x gtceu:hpic_chip',
            `8x ${asmdInductor}`,
            `16x ${asmdCapacitor}`,
            `8x ${asmdDiode}`,
            '8x gtceu:platinum_single_wire'
        ],'gtceu:soldering_alloy 576', 30720, 600, 'gtceu:quantum_processor_computer'
    );

    assemblyLineCircuitNoRS('crystal_processor_computer', 'gtceu', [
            'gtceu:multilayer_fiber_reinforced_printed_circuit_board',
            '2x gtceu:crystal_processor_assembly',
            `4x ${asmdDiode}`,
            '24x gtceu:ram_chip',
            '16x gtceu:nor_memory_chip',
            '32x gtceu:nand_memory_chip',
            '24x gtceu:fine_niobium_titanium_wire'
        ], 'gtceu:soldering_alloy 576', 30720, 400,'gtceu:crystal_processor_assembly'
    );

    assemblyLineCircuitRS('crystal_processor_mainframe', 'gtceu', [
            '2x gtceu:hsse_frame',
            '2x gtceu:crystal_processor_computer',
            '32x gtceu:ram_chip',
            '4x gtceu:hpic_chip',
            `12x ${asmdInductor}`,
            `24x ${asmdCapacitor}`,
            `12x ${asmdDiode}`,
            `16x ${asmdTransistor}`,
            '12x gtceu:niobium_titanium_single_wire',
            '4x gtceu:yttrium_barium_cuprate_plate'
        ], 'gtceu:soldering_alloy 1152', 61440, 1000, 'gtceu:crystal_processor_computer', 16, 38400
    );

    assemblyLineCircuitRS('wetware_processor_computer', 'gtceu', [
            'gtceu:wetware_printed_circuit_board',
            '2x gtceu:wetware_processor_assembly',
            `8x ${asmdDiode}`,
            '32x gtceu:ram_chip',
            '24x gtceu:nor_memory_chip',
            '48x gtceu:nand_memory_chip',
            '32x gtceu:fine_yttrium_barium_cuprate_wire',
            '2x gtceu:europium_plate'
        ], [
            'gtceu:soldering_alloy 1152',
            'gtceu:polybenzimidazole 576'
        ], 64000, 600, 'gtceu:wetware_processor_assembly', 64, 38400
    );

    assemblyLineCircuitRS('wetware_processor_mainframe', 'gtceu', [ 
            '2x gtceu:tritanium_frame',
            '2x gtceu:wetware_processor_computer',
            '48x gtceu:ram_chip',
            '2x gtceu:uhpic_chip',
            `24x ${asmdInductor}`,
            `32x ${asmdCapacitor}`,
            `24x ${asmdDiode}`,
            `24x ${asmdResistor}`,
            `24x ${asmdTransistor}`,
            '16x gtceu:yttrium_barium_cuprate_single_wire',
            '4x gtceu:europium_plate'
        ],[
            'gtceu:soldering_alloy 2304',
            'gtceu:polybenzimidazole 1152'
        ], 300000, 1400, 'gtceu:wetware_processor_computer', 96, 64000
    );

    //Runics
    assemblyLineCircuitRS('runic_wetware_processor_assembly', 'kubejs', [
            'kubejs:runic_convergence_printed_circuit_board',
            'gtceu:wetware_processor_assembly',
            '4x gtceu:ancient_runicalium_bolt',
            '8x kubejs:qram_chip',
            `4x ${asmdInductor}`,
            `8x ${asmdCapacitor}`,
            '16x gtceu:fine_europium_wire'
        ],[
            'gtceu:indium_tin_lead_cadmium_soldering_alloy 288',
            'gtceu:polyether_ether_ketone 72',
            'gtceu:runic_convergence_infusion 50'
        ], 240000, 400, 'gtceu:ancient_runicalium_screw', 128, 120000);

    assemblyLineCircuitRS('runic_wetware_processor_computer', 'kubejs', [
            'kubejs:runic_convergence_printed_circuit_board',
            '2x kubejs:runic_wetware_processor_assembly',
            `12x ${asmdDiode}`,
            '16x kubejs:qram_chip',
            '4x kubejs:3d_nor_chip',
            '8x kubejs:3d_nand_chip',
            '32x gtceu:fine_europium_wire',
            '2x gtceu:ancient_runicalium_plate'
        ],[
            'gtceu:indium_tin_lead_cadmium_soldering_alloy 576',
            'gtceu:polyether_ether_ketone 216',
            'gtceu:runic_convergence_infusion 75'
        ], 240000, 800, 'kubejs:runic_wetware_processor_assembly', 128, 160000
    );

    assemblyLineCircuitRS('runic_wetware_processor_mainframe', 'kubejs', [
            '2x gtceu:ancient_runicalium_frame',
            '2x kubejs:runic_wetware_processor_computer',
            '24x kubejs:qram_chip',
            '4x gtceu:uhpic_chip',
            `48x ${asmdInductor}`,
            `64x ${asmdCapacitor}`,
            `48x ${asmdDiode}`,
            `48x ${asmdResistor}`,
            `48x ${asmdTransistor}`,
            '24x gtceu:europium_single_wire',
            '64x gtceu:polyether_ether_ketone_foil',
            '4x gtceu:ancient_runicalium_plate'
        ], [
            'gtceu:indium_tin_lead_cadmium_soldering_alloy 1152',
            'gtceu:polyether_ether_ketone 432',
            'gtceu:runic_convergence_infusion 150'
        ], 600000, 1800, 'kubejs:runic_wetware_processor_computer', 160, 400000
    );

    // === Boards and Wafers ===
    event.recipes.gtceu.runic_circuitry_assembling_station(id('runic_convergence_circuit_board'))
        .itemInputs(`128x gtceu:wetware_circuit_board`,'6x #gtceu:circuits/luv','kubejs:runic_engraved_plating')
        .perTick(true)
        .inputFluids(`gtceu:runic_convergence_infusion 5`)
        .perTick(false)
        .itemOutputs(`128x kubejs:runic_convergence_circuit_board`)
        .duration(1800)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.chemical_reactor(id('uepic_wafer'))
        .itemInputs('gtceu:uhpic_wafer','4x gtceu:silicon_carbide_over_bismuth_tritelluride_dust')
        .inputFluids('gtceu:neutronium 576')
        .itemOutputs('kubejs:uepic_wafer')
        .duration(1200)
        .EUt(GTValues.VA[GTValues.ZPM])
        .cleanroom(CleanroomType.CLEANROOM);

    event.recipes.gtceu.cutter(id('uepic_chip'))
        .itemInputs('kubejs:uepic_wafer')
        .itemOutputs('2x kubejs:uepic_chip')
        .duration(900)
        .EUt(GTValues.VA[GTValues.ZPM])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.draco_infusion(id('uipic_wafer'))
        .itemInputs('kubejs:uepic_wafer','1x gtceu:draconyallium_foil','16x gtceu:silicon_carbide_over_bismuth_tritelluride_dust',
            'gtceu:naquadah_foil','gtceu:neutronium_foil','4x kubejs:draconic_stem_cells','gtceu:vanadium_gallium_foil')
        .inputFluids('gtceu:pure_dragon_breath 2000')
        .itemOutputs('kubejs:uipic_wafer')
        .duration(3600)
        .EUt(GTValues.VA[GTValues.UV]);

    event.recipes.gtceu.cutter(id('uipic_chip'))
        .itemInputs('kubejs:uipic_wafer')
        .itemOutputs('2x kubejs:uipic_chip')
        .duration(900)
        .EUt(GTValues.VA[GTValues.UV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.cutter(id('draco_soc'))
        .itemInputs('kubejs:draco_advanced_soc_wafer')
        .itemOutputs('6x kubejs:draco_advanced_soc')
        .duration(1800)
        .EUt(GTValues.VA[GTValues.UV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.cutter(id('draco_wafer'))
        .itemInputs('kubejs:draco_boule')
        .itemOutputs('64x kubejs:draco_wafer', '64x kubejs:draco_wafer')
        .duration(3200)
        .EUt(GTValues.VA[GTValues.ZPM])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.circuit_assembler(id('3d_nand_chip'))
        .itemInputs('64x gtceu:nand_memory_chip', '12x gtceu:cerium_tritelluride_bolt', '2x #gtceu:circuits/iv')
        .inputFluids('gtceu:indium_tin_lead_cadmium_soldering_alloy 216')
        .itemOutputs('6x kubejs:3d_nand_chip')
        .duration(600)
        .EUt(GTValues.VA[GTValues.ZPM])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.circuit_assembler(id('3d_nor_chip'))
        .itemInputs('64x gtceu:nor_memory_chip', '12x gtceu:cerium_tritelluride_bolt', '2x #gtceu:circuits/iv')
        .inputFluids('gtceu:indium_tin_lead_cadmium_soldering_alloy 216')
        .itemOutputs('6x kubejs:3d_nor_chip')
        .duration(600)
        .EUt(GTValues.VA[GTValues.ZPM])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.chemical_reactor(id('qram'))
        .itemInputs('gtceu:ram_wafer','2x gtceu:silicon_carbide_over_bismuth_tritelluride_dust')
        .inputFluids('gtceu:radon 250')
        .itemOutputs('kubejs:qram_wafer')
        .duration(1500)
        .EUt(GTValues.VA[GTValues.UV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    event.recipes.gtceu.cutter(id('qram_chip'))
        .itemInputs('kubejs:qram_wafer')
        .itemOutputs('12x kubejs:qram_chip')
        .duration(900)
        .EUt(GTValues.VHA[GTValues.UHV] * .6)
        .cleanroom(CleanroomType.STERILE_CLEANROOM);

    const WAFER_DURATION = {
        silicon: 20,
        phosphorous: 50,
        naquadah: 200,
        neutronium: 500,
        draconic: 900
    }
    
    const WAFER_QUANTITY = {
        silicon: 64,
        phosphorous: 32,
        naquadah: 8,
        neutronium: 4,
        draconic: 1
    }

    const dracoWaferEngraving = (modID, output, waferTier, lens, lensIsTag) => {
        

        let duration = WAFER_DURATION[waferTier];
        let quantity = WAFER_QUANTITY[waferTier];

        event.recipes.gtceu.laser_engraver(id(`engrave_${output}_draco`))
            .itemInputs('kubejs:draco_wafer')
            .notConsumable((lensIsTag) ? `#forge:lenses/${lens}` : `gtceu:${lens}_lens`)
            .itemOutputs(`${quantity}x ${modID}:${output}_wafer`)
            .duration(duration)
            .EUt(GTValues.VA[GTValues.LuV])
            .cleanroom(CleanroomType.CLEANROOM);
        
    }

    dracoWaferEngraving('gtceu', 'cpu', 'silicon', 'light_blue', true);
    dracoWaferEngraving('gtceu', 'ram', 'silicon', 'green', true);
    dracoWaferEngraving('gtceu', 'ilc', 'silicon', 'red', true);
    dracoWaferEngraving('gtceu', 'simple_soc', 'silicon', 'cyan_glass', false);
    dracoWaferEngraving('gtceu', 'soc', 'phosphorous', 'yellow_glass', false);
    dracoWaferEngraving('gtceu', 'advanced_soc', 'naquadah', 'purple', true);
    dracoWaferEngraving('gtceu', 'highly_advanced_soc', 'neutronium', 'black_glass', false);
    dracoWaferEngraving('gtceu', 'nand_memory', 'phosphorous', 'gray_glass', false);
    dracoWaferEngraving('gtceu', 'nor_memory', 'phosphorous', 'pink_glass', false);
    dracoWaferEngraving('gtceu', 'ulpic', 'silicon', 'blue', true);
    dracoWaferEngraving('gtceu', 'lpic', 'silicon', 'orange_glass', false);
    dracoWaferEngraving('gtceu', 'mpic', 'phosphorous', 'brown_glass', false);
    dracoWaferEngraving('kubejs', 'draco_advanced_soc', 'draconic', 'echo_shard', false);

});