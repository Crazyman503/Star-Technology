// const $RockBreakerCondition = Java.loadClass('com.gregtechceu.gtceu.common.recipe.RockBreakerCondition')  

ServerEvents.recipes(event => {
    const id = global.id;

    event.replaceInput({id: 'create:crafting/kinetics/goggles'}, '#forge:plates/gold', 'gtceu:copper_plate');

    event.replaceInput({ id: 'gtceu:macerator/macerate_nether_star_lens' }, '#forge:lenses/white', 'gtceu:nether_star_lens');

    event.replaceInput({ input: 'farmersdelight:onion'}, 'farmersdelight:onion', '#forge:crops/onion');
    
    event.replaceInput({ input: 'farmersdelight:onion'}, 'farmersdelight:onion', '#forge:crops/onion');

    ['tiled','framed','horizontal_framed','vertical_framed'].forEach(type => {
        event.remove({ id: `create:smelting/glass_pane_from_${type}_glass_pane`})
    });

    event.remove({ id: 'create:splashing/stained_glass'});

    //Recipe conflict fix: ethane+chlorine
    event.remove({id: 'gtceu:chemical_reactor/vinyl_chloride_from_ethane'})
    event.recipes.gtceu.chemical_reactor(id('vinyl_chloride_from_ethane'))
        .inputFluids('gtceu:chlorine 4000', 'gtceu:ethane 1000')
        .outputFluids('gtceu:vinyl_chloride 1000','gtceu:hydrochloric_acid 3000')
        .duration(160)
        .EUt(30)
        .circuit(2);

    event.remove({id: 'gtceu:large_chemical_reactor/vinyl_chloride_from_ethane'})
    event.recipes.gtceu.large_chemical_reactor(id('vinyl_chloride_from_ethane'))
        .inputFluids('gtceu:chlorine 4000', 'gtceu:ethane 1000')
        .outputFluids('gtceu:vinyl_chloride 1000','gtceu:hydrochloric_acid 3000')
        .duration(160)
        .EUt(30)
        .circuit(2);

    event.recipes.gtceu.mixer(id('naquadic_netherite'))
        .itemInputs('3x gtceu:naquadah_dust', '5x gtceu:pure_netherite_dust', '2x gtceu:caesium_dust', '5x gtceu:cerium_dust')
        .inputFluids('gtceu:fluorine 12000', 'gtceu:oxygen 32000')
        .itemOutputs('59x gtceu:naquadic_netherite_dust')
        .duration(7600)
        .EUt(6400);

    event.recipes.gtceu.mixer(id('weapon_grade_naquadah'))
        .itemInputs('4x gtceu:pure_netherite_dust', '6x gtceu:trinaquadalloy_dust')
        .inputFluids('gtceu:naquadria 1008', 'gtceu:fluorine 12000')
        .itemOutputs('29x gtceu:weapon_grade_naquadah_dust')
        .duration(1200)
        .EUt(346000);

    event.recipes.gtceu.alloy_smelter(id('rubber_sheet_from_thermal'))
        .itemInputs('2x thermal:cured_rubber')
        .notConsumable('gtceu:plate_casting_mold')
        .itemOutputs('gtceu:rubber_plate')
        .duration(10)
        .EUt(7);

    event.recipes.gtceu.extruder(id('rubber_sheet_from_thermal_extruder'))
        .itemInputs('thermal:cured_rubber')
        .notConsumable('gtceu:plate_extruder_mold')
        .itemOutputs('gtceu:rubber_plate')
        .duration(5)
        .EUt(56);

    event.recipes.gtceu.extractor(id('rubber_fluid_from_thermal'))
        .itemInputs('thermal:cured_rubber')
        .outputFluids('gtceu:rubber 144')
        .duration(5)
        .EUt(30);

    ['blackstone','calcite','tuff','dripstone_block'].forEach(stone => {
    event.recipes.gtceu.rock_breaker(id(`${stone}`))
        .notConsumable(`minecraft:${stone}`)
        .itemOutputs(`minecraft:${stone}`)
        .duration(16)
        .EUt(7)
        .addDataString('fluidA', 'minecraft:lava')
        .addDataString('fluidB', 'minecraft:water');
    });

    // Andesite Alloy compression
    event.shapeless('9x create:andesite_alloy', ['create:andesite_alloy_block']).id('start:shapeless/andesite_alloy_block_decomp');

    //Added Tools
    const plungerMats = ['rubber', 'polyethylene', 'polytetrafluoroethylene', 'silicone_rubber', 'styrene_butadiene_rubber', 'polybenzimidazole' ];
    const malletMats = ['perfluoroelastomer_rubber' ];

    //Mallet + Plunger
    plungerMats.forEach(material => {
        event.shaped(Item.of(`gtceu:${material}_plunger`), [
                'WPP',
                ' SP',
                'S F'
            ], {
                W: '#forge:tools/wire_cutters',
                F: '#forge:tools/files',
                P: `gtceu:${material}_plate`,
                S: `#forge:rods`
            }).id(`start:shaped/${material}_plunger`);
    });

    malletMats.forEach(material => {
        event.shaped(Item.of(`gtceu:${material}_mallet`), [
                'II ',
                'IIS',
                'II '
            ], {
                I: `gtceu:${material}_ingot`,
                S: 'minecraft:stick'
            }).id(`start:shaped/${material}_mallet`);
    });

    [1,2,4].forEach(size => {
        event.remove({id: `functionalstorage:oak_drawer_alternate_x${size}`});
    });

    event.replaceInput({id: 'enderchests:ender_pouch'}, 'minecraft:leather', 'gtceu:carbon_fiber_plate');

    event.recipes.gtceu.mixer(id('birmabright'))
        .itemInputs('7x gtceu:aluminium_dust', '2x gtceu:magnesium_dust', '1x gtceu:manganese_dust')
        .itemOutputs('10x gtceu:birmabright_dust')
        .duration(350)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(3);

    event.recipes.gtceu.mixer(id('duralumin'))
        .itemInputs('4x gtceu:aluminium_dust', '3x gtceu:copper_dust', '1x gtceu:magnesium_dust', '1x gtceu:manganese_dust')
        .itemOutputs('9x gtceu:duralumin_dust')
        .duration(400)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(4);

    event.recipes.gtceu.mixer(id('beryllium_aluminium_alloy'))
        .itemInputs('7x gtceu:beryllium_dust', '1x gtceu:aluminium_dust')
        .itemOutputs('8x gtceu:beryllium_aluminium_alloy_dust')
        .duration(310)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(1);

    event.recipes.gtceu.mixer(id('hydronalium'))
        .itemInputs('6x gtceu:aluminium_dust', '3x gtceu:magnesium_dust', '1x gtceu:manganese_dust')
        .itemOutputs('10x gtceu:hydronalium_dust')
        .duration(410)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(2);

    event.recipes.gtceu.mixer(id('elgiloy'))
        .itemInputs('4x gtceu:cobalt_dust', '2x gtceu:chromium_dust', '1x gtceu:nickel_dust', '1x gtceu:steel_dust', '1x gtceu:molybdenum_dust', '1x gtceu:manganese_dust')
        .itemOutputs('10x gtceu:elgiloy_dust')
        .duration(420)
        .EUt(GTValues.VHA[GTValues.HV]);

    event.recipes.gtceu.mixer(id('beryllium_bronze'))
        .itemInputs('10x gtceu:copper_dust', '1x gtceu:beryllium_dust')
        .itemOutputs('11x gtceu:beryllium_bronze_dust')
        .duration(290)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(1);

    event.recipes.gtceu.mixer(id('silicon_bronze'))
        .itemInputs('32x gtceu:copper_dust', '2x gtceu:silicon_dust', '1x gtceu:manganese_dust')
        .itemOutputs('35x gtceu:silicon_bronze_dust')
        .duration(600)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(1);

    event.recipes.gtceu.mixer(id('kovar'))
        .itemInputs('18x gtceu:iron_dust', '11x gtceu:nickel_dust', '6x gtceu:cobalt_dust')
        .itemOutputs('35x gtceu:kovar_dust')
        .duration(450)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(3);

    event.recipes.gtceu.mixer(id('zamak'))
        .itemInputs('1x gtceu:zinc_dust', '4x gtceu:aluminium_dust', '3x gtceu:copper_dust')
        .itemOutputs('8x gtceu:zamak_dust')
        .duration(350)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(3);

    event.recipes.gtceu.mixer(id('tumbaga'))
        .itemInputs('20x gtceu:copper_dust', '6x gtceu:gold_dust', '1x gtceu:silver_dust')
        .itemOutputs('27x gtceu:tumbaga_dust')
        .duration(470)
        .EUt(GTValues.VHA[GTValues.HV])
        .circuit(4);

    //B(SiO)7 Foil
    event.recipes.gtceu.bender(id('borosilicate_glas_foil'))
        .itemInputs('gtceu:borosilicate_glass_ingot')
        .itemOutputs('4x gtceu:borosilicate_glas_foil')
        .circuit(10)
        .duration(32)
        .EUt(30);

    // NtSiC line
    event.remove({output: 'gtceu:hot_neutronium_silicon_carbide_ingot'});

    event.recipes.gtceu.mixer(id('neutronium_silicon_carbide_dust'))
        .itemInputs('2x gtceu:neutronium_dust','7x gtceu:silicon_carbide_dust','3x gtceu:niobium_nitride_dust','3x gtceu:graphene_dust')
        .itemOutputs('15x gtceu:neutronium_silicon_carbide_dust')
        .duration(465)
        .circuit(2)
        .EUt(GTValues.VHA[GTValues.ZPM]);

    event.recipes.gtceu.heat_chamber(id('hot_neutronium_silicon_carbide'))
        .itemInputs('gtceu:neutronium_silicon_carbide_dust')
        .inputFluids('gtceu:polyether_ether_ketone 36')
        .itemOutputs('gtceu:hot_neutronium_silicon_carbide_ingot')
        .duration(200)
        .EUt(GTValues.VA[GTValues.ZPM]);

    ['iron','steel','neodymium','samarium','zapolgium','pure_netherite','holmium'].forEach(Magnetic=>{
    event.remove({id: `gtceu:alloy_smelter/alloy_smelt_magnetic_${Magnetic}_dust_to_block`});
    });

    // Mycelium Leather
    event.recipes.create.pressing('kubejs:compressed_mycelium', 'kubejs:mycelium_growth').id('start:pressing/compressed_mycelium');
    event.smoking('kubejs:smoked_mycelium', 'kubejs:compressed_mycelium').id('start:smoking/smoked_mycelium');
    event.recipes.create.pressing('minecraft:leather', 'kubejs:smoked_mycelium').id('start:pressing/mycelium_leather');

    // Warping recipes
    [{input: 'architects_palette:abyssaline_lamp', output: 'architects_palette:hadaline_lamp'},
    {input: 'architects_palette:abyssaline_pillar', output: 'architects_palette:hadaline_pillar'},
    {input: 'architects_palette:abyssaline_bricks', output: 'architects_palette:hadaline_bricks'},
    {input: 'architects_palette:chiseled_abyssaline_bricks', output: 'architects_palette:chiseled_hadaline_bricks'},
    {input: 'architects_palette:sunstone', output: 'architects_palette:moonstone'},
    {input: 'gtceu:steel_ingot', output: 'architects_palette:unobtanium'},
    {input: 'minecraft:granite', output: 'architects_palette:onyx'},
    {input: '#minecraft:logs', output: 'architects_palette:twisted_log'},
    {input: 'architects_palette:abyssaline', output: 'architects_palette:hadaline'},
    {input: 'architects_palette:abyssaline_tiles', output: 'architects_palette:hadaline_tiles'},
    {input: '#minecraft:planks', output: 'architects_palette:twisted_planks'},
    {input: 'minecraft:diorite', output: 'architects_palette:nebulite'},
    {input: 'architects_palette:rotten_flesh_block', output: 'architects_palette:entrails'},
    {input: 'minecraft:polished_blackstone', output: 'architects_palette:craterstone'},
    {input: 'minecraft:andesite', output: 'architects_palette:esoterrack'},
    {input: 'minecraft:polished_blackstone_bricks', output: 'architects_palette:moonshale_bricks'},
    {input: 'minecraft:basalt', output: 'architects_palette:moonshale'},
    {input: '#minecraft:saplings', output: 'architects_palette:twisted_sapling'},
    {input: '#minecraft:leaves', output: 'architects_palette:twisted_leaves'}
    ].forEach(prop => {
        event.recipes.create.haunting(Item.of(prop.output), Item.of(prop.input)).id(`start:haunting/${prop.output.split(':')[1]}`);
    });

    event.remove({id: 'gtceu:electrolyzer/decomposition_electrolyzing_sodalite'}); //Moves to LV but at same total EU cost
    event.recipes.gtceu.electrolyzer(id('sodalite_decomposition'))
        .itemInputs('11x gtceu:sodalite_dust')
        .itemOutputs('3x gtceu:aluminium_dust','3x gtceu:silicon_dust','4x gtceu:sodium_dust')
        .outputFluids('gtceu:chlorine 1000')
        .duration(13.2 * 20 * 2)
        .EUt(30);

    event.remove({id:'gtceu:compressor/compress_plate_dust_obsidian'});
    event.recipes.gtceu.compressor(id('obsidian_plate'))
        .itemInputs('gtceu:obsidian_dust')
        .itemOutputs('gtceu:obsidian_plate')
        .duration(1600)
        .EUt(30);

    event.recipes.gtceu.circuit_assembler(id('data_dna_disk'))
        .itemInputs('kubejs:runic_convergence_printed_circuit_board','2x #gtceu:circuits/uhv','24x kubejs:qram_chip', 
            '16x kubejs:3d_nor_chip','16x kubejs:3d_nand_chip','32x gtceu:fine_europium_wire')
        .inputFluids('gtceu:indium_tin_lead_cadmium_soldering_alloy 144')
        .itemOutputs('start_core:data_dna_disk')
        .duration(400)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
        .EUt(GTValues.V[GTValues.UHV]);

    event.recipes.gtceu.circuit_assembler(id('component_data_core'))
        .itemInputs('kubejs:awakened_draconic_wetware_printed_circuit_board','2x #gtceu:circuits/uiv','56x kubejs:qram_chip', 
            '48x kubejs:3d_nor_chip','48x kubejs:3d_nand_chip','32x gtceu:fine_polonium_bismide_wire')
        .inputFluids('gtceu:naquadated_soldering_alloy 1152')
        .itemOutputs('start_core:component_data_core')
        .duration(400)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
        .EUt(GTValues.V[GTValues.UIV]);

    event.recipes.gtceu.assembler(id('redstone_variadic_interface'))
        .itemInputs('gtceu:luv_machine_hull', '2x gtceu:hpic_chip', 'gtceu:redstone_plate', 'gtceu:advanced_item_detector_cover',
            'gtceu:advanced_fluid_detector_cover', 'gtceu:advanced_energy_detector_cover')
        .itemOutputs('start_core:redstone_variadic_interface')
        .inputFluids('gtceu:soldering_alloy 288')
        .duration(600)
        .circuit(4)
        .EUt(GTValues.V[GTValues.EV]);

    // event.remove({id: 'gtceu:macerator/macerate_naquadah_refined_ore_to_dust'});
    // event.recipes.gtceu.macerator(id('macerate_refined_naquadah_ore_to_dust'))
    //     .itemInputs('gtceu:refined_naquadah_ore')
    //     .itemOutputs('gtceu:naquadah_dust')
    //     .chancedOutput('gtceu:enriched_naquadah_dust', 350, 125)
    //     .duration(400)
    //     .EUt(2);

    //rutile fix
    event.remove({ id: 'gtceu:electric_blast_furnace/rutile_from_ilmenite' })
    event.recipes.gtceu.electric_blast_furnace(id('electric_blast_furnace/rutile_from_ilmenite'))
        .itemInputs('10x gtceu:ilmenite_dust', '2x gtceu:carbon_dust')
        .itemOutputs('2x gtceu:wrought_iron_ingot','2x gtceu:rutile_dust')
        .outputFluids('gtceu:carbon_monoxide 2000')
        .blastFurnaceTemp(1700)
        .duration(1600)
        .EUt(480);

    //Indium Line Fix (DONT TOUCH VALUES)
    const InRemoval = ['gtceu:mixer/indium_concentrate','gtceu:chemical_reactor/indium_concentrate_separation','gtceu:large_chemical_reactor/indium_concentrate_separation',
        'gtceu:chemical_reactor/indium_concentrate_separation_4x','gtceu:large_chemical_reactor/indium_concentrate_separation_4x']
    
    InRemoval.forEach(RecipeId => {
        event.remove({id: RecipeId})
    });

    event.recipes.gtceu.mixer(id('indium_concentrate_fix'))
        .itemInputs('gtceu:purified_sphalerite_ore', 'gtceu:purified_galena_ore')
        .inputFluids('gtceu:sulfuric_acid 2000')
        .outputFluids('gtceu:indium_concentrate 1000')
        .duration(60)
        .EUt(150);

    event.recipes.gtceu.chemical_reactor(id('indium_concentrate_separation_fix'))
        .itemInputs('2x gtceu:aluminium_dust')
        .inputFluids('gtceu:indium_concentrate 2000', 'gtceu:oxygen 6000')
        .itemOutputs('5x gtceu:indium_oxide_dust', '14x gtceu:aluminium_sulfite_dust')
        .outputFluids('gtceu:lead_zinc_solution 1000', 'gtceu:diluted_sulfuric_acid 1000')
        .duration(240)
        .EUt(600);

    event.recipes.create.item_application('minecraft:mycelium', ['minecraft:grass_block', 'exnihilosequentia:mycelium_spores']).id('start:item_application/mycelium');

    // StarT Core Cell* Emptying
    ['drum','fluid_cell'].forEach(container=>{
        ['enriched_naquadah','neutronium'].forEach(type=>{

            event.shapeless(Item.of(`start_core:${type}_${container}`), [
                Item.of(`start_core:${type}_${container}`)
            ]);

        });
    });

    //NPK Re-add

    event.recipes.gtceu.large_chemical_reactor(id('npk_solution'))
        .itemInputs('15x gtceu:apatite_dust', '5x gtceu:potassium_dust')
        .inputFluids('gtceu:sulfur_trioxide 288', 'gtceu:nitrogen 1000', 'gtceu:distilled_water 2200')
        .circuit(24)
        .outputFluids('gtceu:npk_solution 6400')
        .EUt(280)
        .duration(120);

    //NPK Decomp
    event.remove({ id:'gtceu:electrolyzer/decomposition_electrolyzing_npk_solution' });
    event.recipes.gtceu.electrolyzer(id('npk_solution_decomposition'))
        .inputFluids('gtceu:npk_solution 6400')
        .itemOutputs('15x gtceu:apatite_dust', '5x gtceu:potassium_dust')
        .outputFluids('gtceu:sulfur_trioxide 288', 'gtceu:nitrogen 1000', 'minecraft:water 2200')
        .duration(33.6 * 20)
        .EUt(60);

    // Mushroom Decomp

    event.shapeless(Item.of('3x minecraft:brown_mushroom'), ['minecraft:brown_mushroom_block', '#forge:tools/mortars']).id('start:shapeless/brown_mushroom');
    event.recipes.gtceu.macerator(id('brown_mushrooms'))
        .itemInputs('minecraft:brown_mushroom_block')
        .itemOutputs('3x minecraft:brown_mushroom')
        .chancedOutput('minecraft:brown_mushroom', 2500, 0)
        .duration(45)
        .EUt(8);

    event.shapeless(Item.of('3x minecraft:red_mushroom'), ['minecraft:red_mushroom_block', '#forge:tools/mortars']).id('start:shapeless/red_mushroom');
    event.recipes.gtceu.macerator(id('red_mushrooms'))
        .itemInputs('minecraft:red_mushroom_block')
        .itemOutputs('3x minecraft:red_mushroom')
        .chancedOutput('minecraft:red_mushroom', 2500, 0)
        .duration(45)
        .EUt(8);

    //Tom's / Chipped Fixes

    event.replaceInput({id: 'chipped:benches/mechanist_workbench'}, 'minecraft:tnt', 'minecraft:red_concrete');

    event.shaped('toms_storage:ts.adv_wireless_terminal', [
        ' P ',
        'PTP',
        ' P '
    ], {
        P: 'gtceu:steel_plate',
        T: 'toms_storage:ts.wireless_terminal'
    }).id('start:shaped/advanced_wireless_terminal');

    //Treated Wood Fixes/Additions
    event.remove({id: 'gtceu:macerator/macerate_treated_wood_chest_boat'})
    event.recipes.gtceu.macerator(id('treated_wood_chest_boat'))
        .itemInputs('gtceu:treated_wood_chest_boat')
        .itemOutputs('5x gtceu:treated_wood_dust', '8x gtceu:wood_dust')
        .duration(1274)
        .EUt(2);
    event.recipes.gtceu.macerator(id('treated_wood_planks'))
        .itemInputs('gtceu:treated_wood_planks')
        .itemOutputs('gtceu:treated_wood_dust')
        .duration(98)
        .EUt(2);
    event.recipes.create.filling('gtceu:treated_wood_planks', [Fluid.of('gtceu:creosote', 125), '#minecraft:planks']).id('start:filling/treated_wood_planks');

    event.replaceOutput({ type: 'gtceu:cutter'}, 'ae2:certus_quartz_crystal', '2x ae2:certus_quartz_crystal');

    const nuggetFixMod = (mod) => {
    event.replaceOutput({output: `${mod}:copper_nugget`},`${mod}:copper_nugget`,`gtceu:copper_nugget`);
    event.replaceOutput({output: `${mod}:zinc_nugget`},`${mod}:zinc_nugget`,`gtceu:zinc_nugget`);
    event.replaceOutput({output: `${mod}:brass_nugget`},`${mod}:brass_nugget`,`gtceu:brass_nugget`);
    event.replaceInput({input: `${mod}:copper_nugget`},`${mod}:copper_nugget`,`gtceu:copper_nugget`);
    event.replaceInput({input: `${mod}:zinc_nugget`},`${mod}:zinc_nugget`,`gtceu:zinc_nugget`);
    event.replaceInput({input: `${mod}:brass_nugget`},`${mod}:brass_nugget`,`gtceu:brass_nugget`);
    }
    nuggetFixMod('create');nuggetFixMod('thermal');nuggetFixMod('exnihilosequentia');

    // Effortless Building Upgrade Accessibility
    const reachUpgrade = (type,mat,dye,core) => {
    event.remove({output: `effortlessbuilding:reach_upgrade${type}`});
    event.shaped(Item.of(`effortlessbuilding:reach_upgrade${type}`), [
        ' D ',
        'MCM',
        ' D '
    ], {
        D: `${dye}`,
        M: `${mat}`,
        C: `${core}`
    }).id(`start:shaped/reach_upgrade${type}`);
    }
    reachUpgrade('1','minecraft:slime_ball','minecraft:lime_dye',`minecraft:ender_pearl`);
    reachUpgrade('2','minecraft:glowstone_dust','minecraft:orange_dye',`effortlessbuilding:reach_upgrade1`);
    reachUpgrade('3','minecraft:amethyst_shard','minecraft:purple_dye',`effortlessbuilding:reach_upgrade2`);

    event.recipes.gtceu.alloy_blast_smelter(id('indium_tin_lead_cadmium_soldering_alloy'))
        .itemInputs('14x gtceu:indium_dust', '3x gtceu:tin_dust', '2x gtceu:lead_dust', '1x gtceu:cadmium_dust')
        .outputFluids('gtceu:indium_tin_lead_cadmium_soldering_alloy 2880')
        .duration(280)
        .blastFurnaceTemp(3000)
        .EUt(GTValues.VH[GTValues.ZPM])
        .circuit(14);

    event.recipes.gtceu.alloy_blast_smelter(id('naquadated_soldering_alloy'))
        .itemInputs('3x gtceu:tin_dust', '18x gtceu:indium_dust', '6x gtceu:silver_dust',
             '4x gtceu:lutetium_dust', '3x gtceu:cerium_dust', '3x gtceu:naquadah_dust',
             '1x gtceu:trinium_dust', '2x gtceu:lead_dust')
        .outputFluids('gtceu:naquadated_soldering_alloy 5760')
        .duration(2250)
        .blastFurnaceTemp(8980)
        .EUt(GTValues.VH[GTValues.UHV])
        .circuit(8);

    event.shaped('bingus:floppa_orb', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: '#minecraft:fishes',
        B: 'minecraft:amethyst_shard',
        C: 'minecraft:emerald'
    }).id('start:shaped/floppa_orb');

    event.shaped('2x minecraft:sponge', [
        'CMC',
        'CTC',
        'CMC'
    ], {
        C: 'minecraft:yellow_carpet',
        T: 'kubejs:meshblock',
        M: 'minecraft:string'
    });

    // REMOVING LARGE BOILERS BECAUSE ALL OUR FOOD KEEPS BLOWING UP
    event.remove({ id: /gtceu:.*_large_boiler/});
});

if (global.packmode == 'default'){ //To easy in HM (has its own thing) and for Abydos makes player switch it upa bit
    (() => {   

BlockEvents.rightClicked('minecraft:grass_block', event => {
    if (event.player.isCrouching() && event.player.getMainHandItem() == null) {
        if (Math.random() < 0.75) {
            event.block.popItemFromFace(Item.of('exnihilosequentia:stone_pebble'), 'up');
        }
        if (Math.random() < 0.5) {
            event.block.popItemFromFace(Item.of('exnihilosequentia:andesite_pebble'), 'up');
        }
        if (Math.random() < 0.5) {
            event.block.popItemFromFace(Item.of('exnihilosequentia:granite_pebble'), 'up');
        }
        if (Math.random() < 0.5) {
            event.block.popItemFromFace(Item.of('exnihilosequentia:diorite_pebble'), 'up');
        }
    } 
});
})()
}