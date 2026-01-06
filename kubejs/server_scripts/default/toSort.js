ServerEvents.recipes(event => {
    const id = global.id;

    if (global.packmode !== 'hard'){(() => { 
    event.shaped(Item.of('gtceu:wood_plate'), [
        'SSS'
    ], {
        S: '#minecraft:wooden_slabs'
    }).id('start:shaped/wood_plate');

    event.shaped(Item.of('gtceu:treated_wood_plate'), [
        'SSS'
    ], {
        S: 'gtceu:treated_wood_slab'
    }).id('start:shaped/treated_wood_plate');

    // glass tube shenanigans
    event.shaped(Item.of('2x gtceu:glass_tube'), [
        '   ',
        'PPP',
        'PPP'
    ], {
        P: 'minecraft:glass_pane'
    }).id('start:shaped/glass_tube');

    event.shaped(Item.of('8x gtceu:compressed_fireclay'), [
        'DDD',
        'DMD',
        'DDD'
    ], {
        'D': 'gtceu:fireclay_dust',
        'M': 'gtceu:brick_wooden_form'
    }).keepIngredient('gtceu:brick_wooden_form').id('start:shaped/compressed_fireclay');

    event.recipes.create.pressing('gtceu:rubber_plate', 'thermal:cured_rubber').id('start:pressing/rubber_plate');

    event.recipes.gtceu.fluid_solidifier(id('raw_rubber'))
        .inputFluids('thermal:latex 250')
        .itemOutputs('thermal:rubber')
        .duration(120)
        .EUt(8);

    event.recipes.gtceu.extractor(id('latex_extraction'))
        .itemInputs('thermal:rubber')
        .outputFluids('thermal:latex 250')
        .duration(120)
        .EUt(8);

    event.recipes.gtceu.chemical_reactor(id('latex_rubber'))
        .itemInputs('3x thermal:rubber', 'gtceu:sulfur_dust')
        .outputFluids('gtceu:rubber 576')
        .duration(240)
        .EUt(8);

    event.replaceInput({ id: 'thermal:tools/satchel'},
        '#thermal:rockwool',
        '#minecraft:wool'
    );

    event.replaceInput({ id: 'thermal:tools/satchel'},
        '#thermal:rockwool',
        '#minecraft:wool'
    );

    event.recipes.create.pressing('gtceu:compressed_fireclay', 'gtceu:fireclay_dust').id('start:pressing/compressed_fireclay');

    event.recipes.create.pressing('gtceu:compressed_clay', 'minecraft:clay').id('start:pressing/compressed_clay');

    event.shapeless('4x minecraft:clay_ball', ['minecraft:clay']).id('start:shapeless/clay_decomp');

    event.shaped('8x gtceu:compressed_clay', [
		'CCC',
		'CMC',
		'CCC'
	], {
		C: 'minecraft:clay_ball',
		M: 'gtceu:brick_wooden_form'
	}).keepIngredient('gtceu:brick_wooden_form').id('start:shaped/compressed_clay');

    event.remove({id: 'minecraft:brick'});

    event.smelting('minecraft:brick', 'gtceu:compressed_clay').id(`start:smelting/brick`);

    event.campfireCooking('gtceu:wrought_iron_ingot', 'minecraft:iron_ingot', 0, 400);

    event.campfireCooking('minecraft:glass', 'gtceu:glass_dust', 0, 300);

    event.replaceInput({ id: 'gtceu:shaped/bronze_primitive_blast_furnace' },
        '#forge:plates/iron',
        'gtceu:wrought_iron_plate'
    );
    event.replaceInput({ id: 'gtceu:shaped/bronze_primitive_blast_furnace' },
        '#forge:rods/iron',
        'gtceu:wrought_iron_rod'
    );
    event.replaceInput({ id: 'gtceu:shaped/bronze_primitive_blast_furnace' },
        'gtceu:iron_screw',
        'gtceu:wrought_iron_screw'
    );

    
    event.recipes.gtceu.mixer(id('ender_air_mix'))
        .itemInputs('mysticalagriculture:end_agglomeratio')
        .inputFluids('gtceu:nether_air 6000')
        .outputFluids('gtceu:ender_air 6000')
        .duration(1200)
        .EUt(256);

    event.recipes.gtceu.large_chemical_reactor(id('easy_netherrack'))
        .itemInputs('16x minecraft:redstone')
        .inputFluids('minecraft:lava 32000')
        .itemOutputs('32x minecraft:netherrack')
        .duration(2400)
        .EUt(20)
        .circuit(0);

    event.recipes.gtceu.large_chemical_reactor(id('easy_endstone'))
        .itemInputs('16x minecraft:glowstone_dust')
        .inputFluids('minecraft:lava 32000')
        .itemOutputs('32x minecraft:end_stone')
        .duration(2400)
        .EUt(20)
        .circuit(0);

    event.shaped(Item.of('gtceu:rubber_plate'), [
        'H',
        'R',
        'R'
    ], {
        H: '#forge:tools/hammers',
        R: 'thermal:cured_rubber'
    }).id('start:shaped/rubber_plate');

    event.shaped(Item.of('create_new_age:carbon_brushes'), [
        'SCS',
        'KsK',
        'SSS'
    ], {
        S: 'gtceu:steel_plate',
        C: '#gtceu:circuits/lv',
        K: 'minecraft:charcoal',
        s: 'create:shaft'
    }).id('start:shaped/carbon_brushes');

    event.shaped(Item.of('create_new_age:magnetite_block'), [
        'SMS',
        'MSM',
        'SMS'
    ], {
        S: 'minecraft:stone',
        M: 'gtceu:magnetite_dust'
    }).id('start:shaped/magnetite_block');

    event.shaped(Item.of('3x create_new_age:redstone_magnet'), [
        'MRM',
        'RBR',
        'MRM'
    ], {
        B: 'create_new_age:magnetite_block',
        R: 'minecraft:redstone',
        M: 'gtceu:magnetite_dust'
    }).id('start:shaped/redstone_magnet');

    event.shaped(Item.of('3x create:belt_connector'), [
        'RRR'
    ], {
        R: 'gtceu:rubber_plate'
    }).id('start:shaped/belt_connector');

    event.shaped(Item.of('4x create_new_age:netherite_magnet'), [
        'MNM',
        'NEN',
        'MNM'
    ], {
        M: 'create_new_age:fluxuated_magnetite',
        N: 'gtceu:neodymium_ingot',
        E: 'gtceu:energium_dust'
    }).id('start:shaped/neodymium_magnet');

    event.shaped(Item.of('16x minecraft:stick'), [
        'L',
        'L'
    ], {
        L: '#minecraft:logs'
    }).id('start:shaped/bulk_stick');

    event.shaped(Item.of('4x minecraft:chest'), [
        'LLL',
        'L L',
        'LLL'
    ], {
        L: '#minecraft:logs'
    }).id('start:shaped/bulk_chest');

    event.shaped('gtceu:ulv_fluid_input', [
        'G',
        'C',
        'B'
    ], {
        G: 'minecraft:glass',
        C: 'gtceu:bronze_machine_casing',
        B: 'minecraft:bucket'
    });

    event.recipes.gtceu.assembler(id('multiblock_upgrade_kit'))
        .itemInputs('thermal:lumium_glass', '#gtceu:circuits/ev', '2x gtceu:double_signalum_plate', '12x gtceu:cobalt_foil')
        .itemOutputs('kubejs:multiblock_upgrade_kit')
        .duration(800)
        .EUt(GTValues.V[GTValues.HV]);

    [
        'bender', 'centrifuge', 'electrolyzer', 'extruder', 'forming_press', 'lathe', 'mixer', 'ore_washer', 'sifter', 'thermal_centrifuge', 'wiremill', 'macerator', 'autoclave'
    ].forEach(machine=> {
        event.recipes.create.item_application(`gtceu:t_large_${machine}`, [`gtceu:hv_${machine}`, 'kubejs:multiblock_upgrade_kit']).id(`start:item_application/large_${machine}`);
    });
    event.recipes.create.item_application('gtceu:large_rock_crusher', ['gtceu:hv_rock_crusher', 'kubejs:multiblock_upgrade_kit']).id('start:item_application/large_rock_crusher');
    
    event.shaped('gtceu:super_electric_ore_factory', [
        'GCG',
        'PHP',
        'BPB'
    ], {
        G: 'gtceu:blue_steel_gear',
        P: 'gtceu:black_steel_plate',
        C: '#gtceu:circuits/hv',
        B: 'gtceu:gold_single_cable',
        H: 'gtceu:hv_machine_hull'
    });

    event.shaped('gtceu:super_cutter', [
        'CBC',
        'TSS',
        'PVB'
    ], {
        S: 'gtceu:blue_steel_buzz_saw_blade',
        T: 'gtceu:hv_cutter',
        C: '#gtceu:circuits/ev',
        B: 'gtceu:gold_single_cable',
        P: 'gtceu:hv_electric_pump',
        V: 'gtceu:hv_conveyor_module'
    });

    event.shaped('gtceu:super_implosion_compressor', [
        'PRP',
        'CIC',
        'BTB'
    ], {
        P: 'gtceu:dense_obsidian_plate',
        R: 'kubejs:highly_enriched_uranium_fuel_rod',
        C: '#gtceu:circuits/luv',
        I: 'gtceu:implosion_compressor',
        B: 'gtceu:niobium_titanium_double_cable',
        T: 'gtceu:iv_electric_piston'
    });

    event.shaped('gtceu:super_ebf', [
        'BPB',
        'CFC',
        'RSR'
    ], {
        P: 'gtceu:double_black_steel_plate',
        R: 'gtceu:small_tungsten_spring',
        C: '#gtceu:circuits/iv',
        F: 'gtceu:electric_blast_furnace',
        B: 'gtceu:aluminium_double_cable',
        S: 'gtceu:ev_sensor'
    });

    event.recipes.gtceu.assembly_line(id('super_vacuum_freezer'))
        .itemInputs('gtceu:aluminium_frame','2x #gtceu:circuits/luv','4x gtceu:double_kanthal_plate','2x gtceu:iv_fluid_regulator',
            '8x gtceu:stainless_steel_tiny_fluid_pipe','4x gtceu:niobium_titanium_screw')
        .inputFluids('gtceu:soldering_alloy 432')
        .itemOutputs('gtceu:super_vacuum_freezer')
        ["scannerResearch(java.util.function.UnaryOperator)"](
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:vacuum_freezer'))
                .duration(1800)
                .EUt(GTValues.VHA[GTValues.EV])
        )
        .duration(400)
        .EUt(GTValues.VHA[GTValues.IV]);

    event.recipes.gtceu.assembly_line(id('super_abs'))
        .itemInputs('gtceu:zpm_alloy_smelter','2x #gtceu:circuits/zpm','2x gtceu:double_naquadah_plate','2x gtceu:zpm_emitter',
            '4x gtceu:europium_spring','8x gtceu:vanadium_gallium_single_cable','4x gtceu:naquadria_screw')
        .inputFluids('gtceu:soldering_alloy 1008', 'gtceu:polybenzimidazole 432')
        .itemOutputs('gtceu:super_abs')
        .stationResearch(
        researchRecipeBuilder => researchRecipeBuilder
            .researchStack(Item.of('gtceu:alloy_blast_smelter'))
            .EUt(GTValues.VHA[GTValues.LuV])
            .CWUt(12)
        )
        .duration(400)
        .EUt(GTValues.VHA[GTValues.ZPM]);       

    // Coil Changes

    event.remove({output: /gtceu:.*coil_block/});

    event.recipes.gtceu.assembler(id('molybdenum_disilicide_coil_block'))
        .itemInputs('32x gtceu:molybdenum_disilicide_ring','16x gtceu:graphene_foil')
        .inputFluids('gtceu:hsla_steel 144')
        .itemOutputs('gtceu:molybdenum_disilicide_coil_block')
        .duration(500)
        .EUt(1920);

    // Cupronickel / Kanthal no Changes

    event.recipes.gtceu.assembler(id('cupronickel_coil_block'))
        .itemInputs('8x gtceu:cupronickel_double_wire','8x gtceu:bronze_foil')
        .inputFluids('gtceu:tin_alloy 144')
        .itemOutputs('gtceu:cupronickel_coil_block')
        .duration(200)
        .EUt(30);

    event.recipes.gtceu.assembler(id('kanthal_coil_block'))
        .itemInputs('8x gtceu:kanthal_double_wire','8x gtceu:aluminium_foil')
        .inputFluids('gtceu:copper 144')
        .itemOutputs('gtceu:kanthal_coil_block')
        .duration(300)
        .EUt(120);

    // Nichrome, RTM, HSS-G

    event.recipes.gtceu.assembler(id('nichrome_coil_block'))
        .itemInputs('8x gtceu:nichrome_double_wire','8x gtceu:stainless_steel_foil','4x gtceu:borosilicate_glas_foil')
        .inputFluids('gtceu:aluminium 144')
        .itemOutputs('gtceu:nichrome_coil_block')
        .duration(400)
        .EUt(480);

    event.recipes.gtceu.assembler(id('rtm_alloy_coil_block'))
        .itemInputs('8x gtceu:rtm_alloy_double_wire','8x gtceu:vanadium_steel_foil','8x gtceu:borosilicate_glas_foil')
        .inputFluids('gtceu:nichrome 144')
        .itemOutputs('gtceu:rtm_alloy_coil_block')
        .duration(500)
        .EUt(1920);
    
    event.recipes.gtceu.assembler(id('hssg_coil_block'))
        .itemInputs('8x gtceu:hssg_double_wire','8x gtceu:tungsten_carbide_foil','16x gtceu:borosilicate_glas_foil')
        .inputFluids('gtceu:tungsten 144')
        .itemOutputs('gtceu:hssg_coil_block')
        .duration(600)
        .EUt(7680);

    // Naquadah, Trinium, Tritanium

    event.recipes.gtceu.assembler(id('naquadah_coil_block'))
        .itemInputs('gtceu:hssg_frame','8x gtceu:naquadah_double_wire','8x gtceu:osmium_foil','8x gtceu:niobium_nitride_foil')
        .inputFluids('gtceu:tungsten_steel 144')
        .itemOutputs('gtceu:naquadah_coil_block')
        .duration(700)
        .EUt(30720);

    event.recipes.gtceu.assembler(id('trinium_coil_block'))
        .itemInputs('gtceu:hsse_frame','8x gtceu:trinium_double_wire','8x gtceu:enriched_naquadah_foil','16x gtceu:niobium_nitride_foil')
        .inputFluids('gtceu:naquadah 144')
        .itemOutputs('gtceu:trinium_coil_block')
        .duration(800)
        .EUt(122880);

    event.recipes.gtceu.assembler(id('tritanium_coil_block'))
        .itemInputs('gtceu:trinaquadalloy_frame','8x gtceu:tritanium_double_wire','8x gtceu:naquadria_foil','32x gtceu:niobium_nitride_foil')
        .inputFluids('gtceu:trinium 144')
        .itemOutputs('gtceu:tritanium_coil_block')
        .duration(900)
        .EUt(491520);

    // Zalloy, Magmada, Abyssal

    event.recipes.gtceu.assembler(id('zalloy_coil_block'))
        .itemInputs('gtceu:neutronium_frame','8x gtceu:zalloy_double_wire','8x gtceu:zirconium_foil',
            '32x gtceu:fine_ruthenium_trinium_americium_neutronate_wire','16x gtceu:neutronium_silicon_carbide_foil')
        .inputFluids('gtceu:tritanium 144')
        .itemOutputs('kubejs:zalloy_coil_block')
        .duration(1000)
        .EUt(1966080);

    event.recipes.gtceu.assembler(id('magmada_alloy_coil_block'))
        .itemInputs('gtceu:ancient_netherite_frame','8x gtceu:magmada_alloy_double_wire','8x gtceu:pure_netherite_foil',
            '32x gtceu:fine_seaborgium_palladium_enriched_estalt_flerovium_alloy_wire','32x gtceu:neutronium_silicon_carbide_foil')
        .inputFluids('gtceu:adamantine 144')
        .itemOutputs('kubejs:magmada_alloy_coil_block')
        .duration(1100)
        .EUt(7864320);

    event.recipes.gtceu.assembler(id('abyssal_alloy_coil_block'))
        .itemInputs('gtceu:draconyallium_frame','8x gtceu:abyssal_alloy_double_wire','8x gtceu:nyanium_foil',
            '32x gtceu:fine_rhenium_super_composite_alloy_wire','64x gtceu:neutronium_silicon_carbide_foil')
        .inputFluids('gtceu:void 144')
        .itemOutputs('kubejs:abyssal_alloy_coil_block')
        .duration(1200)
        .EUt(31457280);

    // Bulk Blast Chiller and RHF Adjustments
    event.remove({output:'gtceu:mega_vacuum_freezer'});
    event.remove({output:'gtceu:mega_blast_furnace'});

    event.recipes.gtceu.assembly_line(id('mega_vacuum_freezer'))
        .itemInputs('gtceu:aluminium_frame','2x #gtceu:circuits/uv','4x gtceu:dense_rhodium_plated_palladium_plate','2x gtceu:luv_field_generator',
            '4x gtceu:niobium_titanium_normal_fluid_pipe','32x gtceu:fine_indium_tin_barium_titanium_cuprate_wire','6x gtceu:hsse_screw')
        .inputFluids('gtceu:soldering_alloy 1152')
        .itemOutputs('gtceu:mega_vacuum_freezer')
        .stationResearch(
        researchRecipeBuilder => researchRecipeBuilder
            .researchStack(Item.of('gtceu:super_vacuum_freezer'))
            .EUt(GTValues.VHA[GTValues.ZPM])
            .CWUt(24)
        )
        .duration(400)
        .EUt(GTValues.VHA[GTValues.UV]);

    event.recipes.gtceu.assembly_line(id('mega_blast_furnace'))
        .itemInputs('gtceu:tungsten_carbide_frame','2x #gtceu:circuits/uhv','4x gtceu:dense_naquadah_alloy_plate','2x gtceu:zpm_field_generator',
            '4x gtceu:naquadah_spring','32x gtceu:fine_uranium_rhodium_dinaquadide_wire','6x gtceu:hsss_screw')
        .inputFluids('gtceu:soldering_alloy 1152')
        .itemOutputs('gtceu:mega_blast_furnace')
        .stationResearch(
        researchRecipeBuilder => researchRecipeBuilder
            .researchStack(Item.of('gtceu:super_ebf'))
            .EUt(GTValues.VHA[GTValues.UV])
            .CWUt(64)
        )
        .duration(400)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.shaped(Item.of('gtceu:large_barrel'), [
        'PSP',
        'IBI',
        'PSP'
    ], {
        P: 'gtceu:treated_wood_planks',
        S: 'gtceu:treated_wood_rod',
        B: 'gtceu:ulv_barrel',
        I: 'gtceu:wrought_iron_plate'
    }).id('start:shaped/large_barrel');

    event.shaped(Item.of('gtceu:large_stone_barrel'), [
        'PSP',
        'IBI',
        'PSP'
    ], {
        P: 'minecraft:stone',
        S: 'gtceu:treated_wood_rod',
        B: 'gtceu:ulv_stone_barrel',
        I: 'gtceu:wrought_iron_plate'
    }).id('start:shaped/large_stone_barrel');

    event.shaped(Item.of('gtceu:industrial_barrel'), [
        'LSL',
        'PEP', 
        'CHC'
    ], {
        L: 'gtceu:gold_single_cable',
        S: 'gtceu:kanthal_spring',
        P: 'gtceu:hv_electric_pump',
        E: 'gtceu:hv_emitter',
        C: '#gtceu:circuits/hv',
        H: 'gtceu:hv_machine_hull'
    }).id('start:shaped/industrial_barrel');

    event.shaped(Item.of('thermal:redstone_servo', 1), [
        'RPR',
        ' I ',
        'RPR'
    ], {
        R: 'minecraft:redstone',
        P: 'gtceu:iron_plate',
        I: 'minecraft:iron_ingot'
    }
    ).id('start:shaped/redstone_servo');

    event.shaped(Item.of('thermal:fluid_cell_frame'), [
        'BTB',
        'TGT',
        'BTB'
    ], {
        B: 'gtceu:bronze_plate',
        T: 'gtceu:tin_plate',
        G: '#forge:glass'
    }).id('start:shaped/fluid_cell_frame');

    event.smelting('minecraft:slime_ball', 'thermal:slime_mushroom_spores').id('start:smelting/slitake');

    ['input_bus', 'output_bus', 'input_hatch', 'output_hatch'].forEach(type => {
        assembler(`me_${type}`, `gtceu:me_${type}`, [`gtceu:ev_${type}`, '#gtceu:circuits/ev', 'ae2:fluix_smart_cable'], 8192);
    });

    ['lv', 'mv', 'hv', 'ev', 'iv', 'luv', 'zpm', 'uv', 'uhv', 'uev', 'uiv'].forEach(voltage => {
        let cable = (voltage) => {
            let mat;
            switch(voltage) {
                case 'lv': {mat = 'tin'; break}
                case 'mv': {mat = 'copper'; break}
                case 'hv': {mat = 'gold'; break}
                case 'ev': {mat = 'aluminium'; break}
                case 'iv': {mat = 'platinum'; break}
                case 'luv': {mat = 'niobium_titanium'; break}
                case 'zpm': {mat = 'vanadium_gallium'; break}
                case 'uv': {mat = 'yttrium_barium_cuprate'; break}
                case 'uhv': {mat = 'europium'; break}
                case 'uev': {mat = 'cerium_tritelluride'; break}
                case 'uiv': {mat = 'polonium_bismide'; break}
            }
            return mat
        };
        event.shaped(`gtceu:${voltage}_me_assembler`, [
            'ABC',
            'DED',
            'FFG'],{
            A: `gtceu:${voltage}_emitter`,
            B: `gtceu:${voltage}_conveyor_module`,
            C: `#gtceu:circuits/${voltage}`,
            D: `gtceu:${voltage}_robot_arm`,
            E: `gtceu:${voltage}_machine_hull`,
            F: `gtceu:${cable(voltage)}_single_cable`,
            G: `gtceu:${voltage}_electric_motor`
        }).id(`start:shaped/${voltage}_me_assembler`);        
    });

    event.shaped('2x kubejs:fluix_steel_casing', [
        'ABA',
        'ACA',
        'ADA'],{
        A: 'gtceu:double_fluix_steel_plate',
        B: '#forge:tools/hammers',
        C: 'gtceu:fluix_steel_frame',
        D: '#forge:tools/wrenches'
    });

    event.recipes.gtceu.assembler(id('fluix_steel_casing'))
        .itemInputs('6x gtceu:double_fluix_steel_plate', 'gtceu:fluix_steel_frame')
        .itemOutputs('2x kubejs:fluix_steel_casing')
        .duration(50)
        .EUt(16);

    event.recipes.gtceu.assembler(id('large_me_assembler'))
        .itemInputs('kubejs:fluix_steel_casing', '2x gtceu:iv_robot_arm', 'gtceu:iv_emitter', '2x #gtceu:circuits/iv',
            '16x gtceu:fine_vanadium_gallium_wire', '8x gtceu:uranium_triplatinum_single_wire')
        .itemOutputs('gtceu:large_me_assembler')
        .duration(600)
        .EUt(8192);

    event.shaped(Item.of('gtceu:greenhouse'), [
        'WAW',
        'MHM',
        'SCS'
    ], {
        W: 'gtceu:fertilizer',
        A: 'gtceu:iron_axe',
        M: 'gtceu:lv_electric_motor',
        H: 'gtceu:lv_machine_hull',
        S: 'gtceu:steel_plate',
        C: '#gtceu:circuits/mv'
    }).id('start:shaped/greenhouse');

    [
        {voltage: 'lv', metal: 'steel', glass: '#forge:glass', cable: 'tin'},
        {voltage: 'mv', metal: 'aluminium', glass: '#forge:glass', cable: 'copper'},
        {voltage: 'hv', metal: 'stainless_steel', glass: 'gtceu:tempered_glass', cable: 'gold'},
        {voltage: 'ev', metal: 'titanium', glass: 'gtceu:tempered_glass', cable: 'aluminium'},
        {voltage: 'iv', metal: 'tungsten_steel', glass: 'gtceu:laminated_glass', cable: 'platinum'},
        {voltage: 'luv', metal: 'rhodium_plated_palladium', glass: 'gtceu:laminated_glass', cable: 'niobium_titanium'},
        {voltage: 'zpm', metal: 'naquadah_alloy', glass: 'gtceu:fusion_glass', cable: 'vanadium_gallium'},
        {voltage: 'uv', metal: 'darmstadtium', glass: 'gtceu:fusion_glass', cable: 'yttrium_barium_cuprate'},
    ].forEach(tier=> {
        event.shaped(`gtceu:${tier.voltage}_mystical_greenhouse`, [
            'CGE',
            'PHP',
            'CMC'
        ], {
            C: `#gtceu:circuits/${tier.voltage}`,
            G: tier.glass,
            E: `gtceu:${tier.voltage}_emitter`,
            P: `gtceu:${tier.metal}_plate`,
            H: `gtceu:${tier.voltage}_machine_hull`,
            M: `gtceu:${tier.voltage}_electric_pump`,
            C: `gtceu:${tier.cable}_single_cable`
        }).id(`start:shaped/${tier.voltage}_mystical_greenhouse`);
    });

    [
        {voltage: 'lv', metal: 'tin', glass: '#forge:glass', cable: 'tin'},
        {voltage: 'mv', metal: 'bronze', glass: '#forge:glass', cable: 'copper'},
        {voltage: 'hv', metal: 'steel', glass: 'gtceu:tempered_glass', cable: 'gold'},
        {voltage: 'ev', metal: 'stainless_steel', glass: 'gtceu:tempered_glass', cable: 'aluminium'},
        {voltage: 'iv', metal: 'tungsten_steel', glass: 'gtceu:laminated_glass', cable: 'platinum'},
        {voltage: 'luv', metal: 'rhodium_plated_palladium', glass: 'gtceu:laminated_glass', cable: 'niobium_titanium'},
        {voltage: 'zpm', metal: 'naquadah_alloy', glass: 'gtceu:fusion_glass', cable: 'vanadium_gallium'},
        {voltage: 'uv', metal: 'darmstadtium', glass: 'gtceu:fusion_glass', cable: 'yttrium_barium_cuprate'},
    ].forEach(tier=> {
        event.shaped(`gtceu:${tier.voltage}_essence_burner`, [
            'CRE',
            'GHG',
            'CPC'
        ], {
            C: `#gtceu:circuits/${tier.voltage}`,
            R: `gtceu:${tier.metal}_rotor`,
            G: tier.glass,
            E: `gtceu:${tier.voltage}_emitter`,
            H: `gtceu:${tier.voltage}_machine_hull`,
            P: `gtceu:${tier.voltage}_electric_pump`,
            C: `gtceu:${tier.cable}_single_cable`
        }).id(`start:shaped/${tier.voltage}_essence_burner`);
    });

    event.shaped(Item.of('gtceu:essence_replicator'), [
        'PSP',
        'EHE',
        'CSC'
    ], {
        P: 'gtceu:double_invar_plate',
        S: '#gtceu:circuits/hv',
        E: 'gtceu:mv_emitter',
        H: 'gtceu:heatproof_machine_casing',
        C: 'gtceu:gold_single_cable'
    }).id('start:shaped/essence_replicator');

    event.shaped(Item.of('gtceu:essence_enchancer'), [
        'SAP',
        'EHE',
        'CAC'
    ], {
        P: 'gtceu:double_stainless_steel_plate',
        A: '#gtceu:circuits/ev',
        S: 'gtceu:hv_sensor',
        E: 'gtceu:hv_emitter',
        H: 'gtceu:clean_machine_casing',
        C: 'gtceu:aluminium_single_cable'
    }).id('start:shaped/essence_enhancer');




    })()}

});