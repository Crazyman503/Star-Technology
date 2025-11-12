ServerEvents.recipes(event => {
    const id = global.id;

    event.recipes.gtceu.assembler(id('netherite_reinforced_mesh'))
        .itemInputs('1x gtceu:carbon_fiber_mesh', '4x gtceu:netherite_rod', '1x minecraft:netherite_ingot')
        .inputFluids('gtceu:epoxy 288')
        .itemOutputs('kubejs:netherite_reinforced_mesh')
        .duration(100)
        .EUt(GTValues.VA[GTValues.IV]);

    event.recipes.gtceu.mixer(id('new_soldering_alloy'))
        .itemInputs('14x gtceu:indium_dust', '3x gtceu:tin_dust', '2x gtceu:lead_dust', 'gtceu:cadmium_dust')
        .itemOutputs('20x gtceu:indium_tin_lead_cadmium_soldering_alloy_dust')
        .duration(400)
        .EUt(45000);
    
    event.recipes.gtceu.chemical_reactor(id('strontium_oxide'))
        .itemInputs('gtceu:strontium_dust')
        .inputFluids('gtceu:oxygen 1000')
        .itemOutputs('2x gtceu:strontium_oxide_dust')
        .duration(360)
        .EUt(320);

    event.recipes.gtceu.large_chemical_reactor(id('strontium_oxide'))
        .itemInputs('gtceu:strontium_dust')
        .inputFluids('gtceu:oxygen 1000')
        .itemOutputs('2x gtceu:strontium_oxide_dust')
        .duration(360)
        .EUt(320);

    event.recipes.gtceu.chemical_reactor(id('titanium_oxide'))
        .itemInputs('gtceu:titanium_dust')
        .inputFluids('gtceu:oxygen 1000')
        .itemOutputs('2x gtceu:titanium_oxide_dust')
        .duration(360)
        .EUt(320);

    event.recipes.gtceu.large_chemical_reactor(id('titanium_oxide'))
        .itemInputs('gtceu:titanium_dust')
        .inputFluids('gtceu:oxygen 1000')
        .itemOutputs('2x gtceu:titanium_oxide_dust')
        .duration(360)
        .EUt(320);

    event.recipes.gtceu.mixer(id('strontium_titanium_oxide'))
        .itemInputs('gtceu:strontium_oxide_dust', 'gtceu:titanium_oxide_dust')
        .itemOutputs('2x gtceu:strontium_titanium_oxide_dust')
        .duration(400)
        .EUt(420);

    event.recipes.gtceu.chemical_reactor(id('iron_selenide'))
        .itemInputs('gtceu:iron_dust', 'gtceu:selenium_dust')
        .itemOutputs('gtceu:iron_selenide_dust')
        .duration(360)
        .EUt(1460);

    event.recipes.gtceu.large_chemical_reactor(id('iron_selenide'))
        .itemInputs('gtceu:iron_dust', 'gtceu:selenium_dust')
        .itemOutputs('gtceu:iron_selenide_dust')
        .duration(360)
        .EUt(1460);

    event.recipes.gtceu.mixer(id('iron_selenide_over_strontium_titanium_oxide'))
        .itemInputs('gtceu:iron_selenide_dust', 'gtceu:strontium_titanium_oxide_dust')
        .itemOutputs('2x gtceu:iron_selenide_over_strontium_titanium_oxide_dust')
        .duration(1200)
        .EUt(240000);

    event.recipes.gtceu.large_chemical_reactor(id('iron_titanium_oxide'))
        .itemInputs('5x gtceu:ferrosilite_dust', '2x gtceu:titanium_oxide_dust')
        .itemOutputs('4x gtceu:iron_titanium_oxide_dust', '3x gtceu:silicon_dioxide_dust')
        .duration(960)
        .EUt(GTValues.VA[GTValues.LuV]);

    event.recipes.gtceu.mixer(id('astatine_bis_tritelluride_cobo_selenium'))
        .itemInputs('gtceu:astatine_dust', 'gtceu:bismuth_tritelluride_dust', '4x gtceu:cobalt_dust', 'gtceu:selenium_dust')
        .itemOutputs('7x gtceu:astatine_bis_tritelluride_cobo_selenium_dust')
        .duration(360)
        .circuit(3)
        .EUt(GTValues.VHA[GTValues.UV]);

    event.recipes.gtceu.mixer(id('astatine_bis_tritelluride_cobo_selenium_over_iron_titanium_oxide_dust'))
        .itemInputs('gtceu:astatine_bis_tritelluride_cobo_selenium_dust', 'gtceu:iron_titanium_oxide_dust')
        .itemOutputs('2x gtceu:astatine_bis_tritelluride_cobo_selenium_over_iron_titanium_oxide_dust')
        .duration(480)
        .circuit(1)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.large_chemical_reactor(id('tungsten_disulfide'))
        .itemInputs('4x gtceu:tungsten_trioxide_dust')
        .inputFluids('gtceu:hydrogen_sulfide 3000')
        .itemOutputs('3x gtceu:tungsten_disulfide_dust')
        .outputFluids('minecraft:water 3000')
        .duration(480)
        .EUt(GTValues.VHA[GTValues.ZPM]);

        event.remove({output: /gtceu:.*magnetic_holmium.*/});
        event.remove({input: /gtceu:.*magnetic_holmium.*/});
        event.remove({output: /gtceu:.*magnetic_pure_netherite.*/});
        event.remove({input: /gtceu:.*magnetic_pure_netherite.*/});
        event.remove({output: /gtceu:.*magnetic_zapolgium.*/});
        event.remove({input: /gtceu:.*magnetic_zapolgium.*/});

    [
        {type: 'pure_netherite', duration: 200, energy: GTValues.VA[GTValues.LuV]},
        {type: 'zapolgium', duration: 300, energy: GTValues.VA[GTValues.UV]}    
        // Holmium is HM only as of now and wont generate recipes here   
    ].forEach( magIngot => {

        event.recipes.gtceu.polarizer(id(`magnetic_${magIngot.type}_rod`))
            .itemInputs(`gtceu:${magIngot.type}_rod`)
            .itemOutputs(`gtceu:magnetic_${magIngot.type}_rod`)
            .duration(magIngot.duration / 2)
            .EUt(magIngot.energy);

        event.recipes.gtceu.polarizer(id(`long_magnetic_${magIngot.type}_rod`))
            .itemInputs(`gtceu:long_${magIngot.type}_rod`)
            .itemOutputs(`gtceu:long_magnetic_${magIngot.type}_rod`)
            .duration(magIngot.duration)
            .EUt(magIngot.energy);

    });

    [
        { plastic: 'polyether_ether_ketone', scaler: 2 },
        { plastic: 'poly_34_ethylenedioxythiophene_polystyrene_sulfate', scaler: 4 }
    ].forEach( cFiber => {
        event.recipes.gtceu.autoclave(id(`carbon_fibers_${cFiber.plastic}`))
            .itemInputs(`${cFiber.scaler * 8}x gtceu:carbon_dust`)
            .inputFluids(`gtceu:${cFiber.plastic} 9`)
            .itemOutputs(`${32 * cFiber.scaler}x gtceu:carbon_fibers`)
            .duration(37)
            .EUt(1920 * (2 ** cFiber.scaler));
    });

    event.recipes.gtceu.mixer(id('cerium_tritelluride'))
        .itemInputs('gtceu:cerium_dust', '3x gtceu:tellurium_dust')
        .itemOutputs('4x gtceu:cerium_tritelluride_dust')
        .duration(900)
        .circuit(4)
        .EUt((GTValues.VHA[GTValues.UHV]));

    event.recipes.gtceu.mixer(id('polonium_bismide'))
        .itemInputs('gtceu:polonium_dust', 'gtceu:bismuth_dust')
        .itemOutputs('2x gtceu:polonium_bismide_dust')
        .duration(600)
        .circuit(2)
        .EUt((GTValues.VHA[GTValues.UEV]));

    event.recipes.gtceu.advanced_chemistry(id('platinum_yttrium_composite'))
        .itemInputs('4x gtceu:uranium_triplatinum_dust', '26x gtceu:yttrium_barium_cuprate_dust', '12x gtceu:carbon_dust')
        .itemOutputs('22x gtceu:platinum_yttrium_composite_dust', '3x gtceu:uraninite_dust')
        .outputFluids('gtceu:carbon_dioxide 6000')
        .duration(152 * 22)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.advanced_chemistry(id('polonium_iridide_acid'))
        .itemInputs('3x gtceu:iridium_iv_oxide_dust', '2x gtceu:polonium_dust')
        .inputFluids('gtceu:phosphoric_acid 1000')
        .outputFluids('gtceu:polonium_iridide_acid 1000', 'gtceu:oxygen 2000')
        .duration(1123)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.large_chemical_reactor(id('polonium_flux'))
        .itemInputs('22x gtceu:platinum_yttrium_composite_dust')
        .inputFluids('gtceu:polonium_iridide_acid 2000', 'gtceu:hydrogen 10000')
        .itemOutputs('30x gtceu:polonium_flux_dust')
        .outputFluids('minecraft:water 8000')
        .duration(840)
        .EUt(GTValues.VHA[GTValues.UEV]);

    event.recipes.gtceu.mixer(id('hafnide_ito_ceramic'))
        .itemInputs('14x gtceu:hafnide_ceramic_base_dust', '7x gtceu:indium_tin_oxide_dust')
        .itemOutputs('21x gtceu:hafnide_ito_ceramic_dust')
        .duration(856)
        .EUt(GTValues.VHA[GTValues.UEV]);

    event.recipes.gtceu.large_chemical_reactor(id('indium_tin_oxide'))
        .itemInputs('2x gtceu:indium_dust', '2x gtceu:tin_dust')
        .inputFluids('gtceu:oxygen 3000')
        .itemOutputs('7x gtceu:indium_tin_oxide_dust')
        .duration(462)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.assembler(id('extreme_temperature_smelting_casing'))
        .itemInputs('4x gtceu:calamatium_plate', '2x gtceu:astatium_bioselex_carbonite_plate', 'gtceu:enriched_estalt_frame')
        .itemOutputs('2x kubejs:extreme_temperature_smelting_casing')
        .circuit(6)
        .duration(50)
        .EUt(16);

    event.recipes.gtceu.assembler(id('subzero_casing'))
        .itemInputs('4x gtceu:aluminium_plate', '2x gtceu:pure_netherite_plate', 'gtceu:void_frame')
        .itemOutputs('2x kubejs:subzero_casing')
        .circuit(6)
        .duration(50)
        .EUt(16);

    event.recipes.gtceu.assembler(id('draneko_casing'))
        .itemInputs('gtceu:nyanium_frame', '4x gtceu:double_isovol_plate', '2x gtceu:double_nyanium_plate', '6x kubejs:draconic_scale_cells')
        .inputFluids('gtceu:dragon_breath 1750')
        .itemOutputs('2x kubejs:draneko_casing')
        .circuit(6)
        .duration(50)
        .EUt(16);

    const ultimate_casing = (nameCasing,plate,frameMat) => {
        event.recipes.gtceu.assembler(id(`${nameCasing}_casing`))
            .itemInputs(`6x gtceu:double_${plate}_plate`, `gtceu:${frameMat}_frame`)
            .itemOutputs(`2x kubejs:${nameCasing}_casing`)
            .circuit(6)
            .duration(50)
            .EUt(16);
    };

    ultimate_casing('advanced_assembly', 'expetidalloy_d_17', 'isovol');
    ultimate_casing('superdense_machine', 'neutronium', 'zircalloy_4');
    ultimate_casing('aurouric_resilient', 'borealic_steel', 'stellarium');
    ultimate_casing('inoculated_nuclei_seperation', 'ultispestalloy_cmsh', 'zeroidic_trinate_steel');
    ultimate_casing('ionic_engraving', 'trikoductive_neutro_steel', 'expetidalloy_d_17');
    ultimate_casing('atomic_convergence', 'melastrium_mox', 'vastaqalloy_cr_4200x');
    ultimate_casing('gravitationally_strained_stabilization', 'hvga_steel', 'draco_abyssal');
    ultimate_casing('subatomically_secure', 'mythrotight_carbide_steel', 'aerorelient_steel');
    ultimate_casing('quantumly_resistant', 'aerorelient_steel', 'mythrotight_carbide_steel');
    ultimate_casing('absolute_annihilation', 'zeroidic_trinate_steel', 'ultispestalloy_cmsh');
    ultimate_casing('tectonic_defiance', 'vastaqalloy_cr_4200x', 'melastrium_mox');
    ultimate_casing('true_revitilization', 'soul_ascendant_cuperite', 'soul_infused');

    const special_ultimate_casing = (nameCasing,inputs,fluids,researched) => {
        event.recipes.gtceu.assembly_line(id(`${nameCasing}`))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`2x kubejs:${nameCasing}`)
            .duration(400)
            .stationResearch(
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(researched))
                    .EUt(GTValues.VA[GTValues.UEV])
                    .CWUt(216)
                )
            .EUt(GTValues.VHA[GTValues.UIV]);
    };

    special_ultimate_casing('aurouric_polarization_cell',['kubejs:aurouric_resilient_casing', '6x kubejs:uiv_super_magnetic_core', '4x #gtceu:circuits/uiv', 'kubejs:uiv_micropower_router'], ['gtceu:polyether_ether_ketone 5844', 'gtceu:naquadated_soldering_alloy 4780', 'gtceu:draco_abyssal 288'], 'gtceu:electrolytic_cell');
    special_ultimate_casing('absolute_annihilators',['kubejs:absolute_annihilation_casing', '4x gtceu:melastrium_mox_gear', '6x gtceu:small_hvga_steel_gear', '2x gtceu:uiv_electric_motor'], ['gtceu:tungsten_disulfide 5844', 'gtceu:naquadated_soldering_alloy 4780', 'gtceu:starium_alloy 432'], 'gtceu:crushing_wheels');
    special_ultimate_casing('nuclei_seperators',['kubejs:inoculated_nuclei_seperation_casing', '6x gtceu:hvga_steel_plate', '4x gtceu:trikoductive_neutro_steel_gear', '1x gtceu:uiv_electric_motor'], ['gtceu:tungsten_disulfide 5844', 'gtceu:naquadated_soldering_alloy 4780', 'gtceu:mythrolic_alloy 432'], 'gtceu:slicing_blades');

    special_ultimate_casing('draco_assembly_grating',['gtceu:void_frame', '5x gtceu:hvga_steel_rotor', '2x gtceu:uev_electric_motor', '12x gtceu:void_foil'], ['gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 1008', 'gtceu:dragon_breath 1750'], 'gtceu:assembly_line_grating');
    special_ultimate_casing('draco_ware_casing',['gtceu:trikoductive_neutro_steel_frame', '6x kubejs:draconic_brain_matter_cells', '2x #gtceu:circuits/uev', 'gtceu:uev_sensor', '32x gtceu:fine_aurourium_wire', '32x gtceu:fine_magmada_alloy_wire'], ['gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 1008', 'gtceu:dragon_breath 2250'], 'gtceu:high_power_casing');
    special_ultimate_casing('draco_resilient_fusion_glass',['gtceu:fusion_glass', '8x kubejs:draconic_scale_cells', '2x gtceu:uhv_field_generator', '32x gtceu:neutron_reflector'], ['gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 1008', 'gtceu:dragon_breath 1250'], 'gtceu:fusion_glass');
    special_ultimate_casing('abyssal_inductor_hull',['gtceu:abyssal_alloy_frame', '2x kubejs:abyssal_inductor', 'kubejs:uiv_microfluidic_flow_valve', '2x kubejs:voidic_reinforced_mesh', '#gtceu:circuits/uiv', '8x gtceu:polonium_bismide_single_cable'], ['gtceu:naquadated_soldering_alloy 864'], 'kubejs:abyssal_inductor');
    
    special_ultimate_casing('abyssal_inductor',['gtceu:uiv_emitter', '3x gtceu:lepton_resonant_thallium_antimonide_spring', '6x gtceu:draco_abyssal_screw', '6x gtceu:polonium_bismide_single_cable'], ['gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 720', 'gtceu:dragon_breath 175'], 'gtceu:blacklight');

    event.recipes.gtceu.assembler(id('titanic_blasting_casing'))
        .itemInputs('6x gtceu:titan_steel_plate', 'gtceu:naquadah_alloy_frame')
        .itemOutputs('2x kubejs:titanic_blasting_casing')
        .circuit(6)
        .duration(50)
        .EUt(16);

    event.shaped('2x kubejs:superdense_assembly_control_casing', [
        `PGP`,
        `AFA`,
        `PGP`
    ], {
        P: 'gtceu:double_neutronium_plate',
        G: 'gtceu:pure_netherite_gear',
        A: 'gtceu:uhv_robot_arm',
        F: 'gtceu:zircalloy_4_frame'
    });

    event.shaped('2x kubejs:superdense_assembly_machine_casing', [
        `CUC`,
        `SFE`,
        `CMC`
    ], {
        C: '#gtceu:circuits/uv',
        U: 'gtceu:uhpic_chip',
        S: 'gtceu:uhv_sensor',
        E: 'gtceu:uhv_emitter',
        M: 'gtceu:uhv_electric_motor',
        F: 'gtceu:zircalloy_4_frame'
    });

    event.recipes.gtceu.compressor(id('reinforced_brimstone_casing'))
        .itemInputs('16x kubejs:brimstone')
        .itemOutputs('kubejs:reinforced_brimstone_casing')
        .duration(320)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.compressor(id('reinforced_cryostone_casing'))
        .itemInputs('16x kubejs:cryostone')
        .itemOutputs('kubejs:reinforced_cryostone_casing')
        .duration(320)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.autoclave(id('brimstone'))
        .itemInputs('kubejs:brimstone', '64x minecraft:netherrack')
        .inputFluids('gtceu:blaze 500')
        .itemOutputs('kubejs:brimstone')
        .chancedOutput('kubejs:brimstone', 6660, 0)
        .duration(240)
        .EUt(GTValues.VHA[GTValues.LuV]);

    event.recipes.gtceu.autoclave(id('cryostone'))
        .itemInputs('kubejs:cryostone', '64x minecraft:netherrack')
        .inputFluids('gtceu:liquid_helium 500')
        .itemOutputs('kubejs:cryostone')
        .chancedOutput('kubejs:cryostone', 6660, 0)
        .duration(240)
        .EUt(GTValues.VHA[GTValues.LuV]);

    event.recipes.gtceu.mixer(id('thorium_plut_duranide_241'))
        .itemInputs('4x gtceu:thorium_dust', 'gtceu:duranium_dust', '3x gtceu:plutonium_241_dust')
        .itemOutputs('8x gtceu:thorium_plut_duranide_241_dust')
        .circuit(4)
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UV]);

    event.remove({output: 'gtceu:hot_diamane_ingot'});
    event.recipes.gtceu.heat_chamber(id('hot_diamane'))
        .itemInputs('3x gtceu:graphene_dust', '1x gtceu:diamond_dust')
        .inputFluids('gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 36')
        .itemOutputs('1x gtceu:hot_diamane_ingot')
        .duration(140)
        .EUt(GTValues.VHA[GTValues.UV]);

    event.recipes.gtceu.large_chemical_reactor(id('iridium_iv_oxide'))
        .itemInputs('1x gtceu:iridium_dust')
        .inputFluids('gtceu:oxygen 2000')
        .itemOutputs('3x gtceu:iridium_iv_oxide_dust')
        .duration(228)
        .EUt(GTValues.VA[GTValues.LuV]);

    event.recipes.gtceu.large_chemical_reactor(id('bismuth_iii_oxide'))
        .itemInputs('26x gtceu:bismuth_3_nitrate_dust')
        .inputFluids('minecraft:water 3000')
        .itemOutputs('5x gtceu:bismuth_iii_oxide_dust')
        .outputFluids('gtceu:nitric_acid 6000')
        .duration(328)
        .EUt(GTValues.VHA[GTValues.LuV]);

    event.recipes.gtceu.mixer(id('bismuth_iridate'))
        .itemInputs('5x gtceu:bismuth_iii_oxide_dust', '6x gtceu:iridium_iv_oxide_dust')
        .itemOutputs('11x gtceu:bismuth_iridate_dust')
        .duration(412)
        .EUt(GTValues.VA[GTValues.ZPM]);

    event.recipes.gtceu.assembly_line(id('sterile_cleaning_maintenance_hatch'))
        .itemInputs(
            '1x gtceu:uev_machine_hull', '2x gtceu:uev_robot_arm', '1x gtceu:uev_emitter', '3x #gtceu:circuits/uev', 
            '2x gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate_large_fluid_pipe', '1x gtceu:magmada_alloy_rotor', 
            '4x gtceu:blacklight', '4x gtceu:cerium_tritelluride_single_cable'
        )
        .inputFluids(
            'gtceu:indium_tin_lead_cadmium_soldering_alloy 2304',
            'gtceu:perfluoroelastomer_rubber 1152'
        )
        .itemOutputs('start_core:sterile_cleaning_maintenance_hatch')
        .duration(200)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:cleaning_maintenance_hatch'))
                .EUt(GTValues.VHA[GTValues.UEV])
                .CWUt(176)
            )
        .EUt(GTValues.VHA[GTValues.UIV]);
    
    event.recipes.gtceu.assembly_line(id('absolute_stabilization_module'))
        .itemInputs(
            '1x gtceu:uhv_machine_hull', '4x gtceu:uhv_robot_arm', '3x #gtceu:circuits/uhv', 'kubejs:uhv_catalyst_core',
            '6x gtceu:zircalloy_4_screw', '4x gtceu:europium_single_cable'
        )
        .inputFluids(
            'gtceu:indium_tin_lead_cadmium_soldering_alloy 4608',
            'gtceu:polyether_ether_ketone 3456',
            'gtceu:perfluoroelastomer_rubber 2304'
        )
        .itemOutputs('gtceu:uhv_stabilization_module')
        .duration(200)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('gtceu:auto_maintenance_hatch'))
                .EUt(GTValues.VHA[GTValues.UV])
                .CWUt(144)
            )
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.remove({output: 'minecraft:end_crystal'});
    event.remove({input: 'minecraft:end_crystal'});
    event.shaped('minecraft:end_crystal', [
        'GGG',
        'GEG',
        'PCP'
    ], {
        G: 'gtceu:fusion_glass',
        E: 'gtceu:quantum_eye',
        P: 'gtceu:double_void_plate',
        C: 'kubejs:helish_star'
    }).id('start:shaped/end_crystal');

    // Draconic
    event.recipes.gtceu.fermenter(id('dragon_cell_growth'))
        .itemInputs('kubejs:draconic_stem_cells','2x gtceu:void_ring')
        .inputFluids('gtceu:sterilized_growth_medium 50000', 'gtceu:radon 100000', 'gtceu:liquid_ender_air 500000')
        .outputFluids('gtceu:dragon_breath 500')
        .itemOutputs('3x gtceu:tiny_void_dust')
        .duration(2400)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
        .EUt(GTValues.VHA[GTValues.UIV]);

    event.recipes.gtceu.injection_mixer(id('dragon_breath'))
        .itemInputs('gtceu:tiny_draconyallium_dust')
        .inputFluids('gtceu:radon 73250','gtceu:breath_hormone_complex 1750')
        .outputFluids('gtceu:dragon_breath 1250')
        .duration(375)
        .EUt(GTValues.V[GTValues.UIV] * .3)
        .cleanroom($StarTAbyssalContainmentMachine.ABYSSAL_CONTAINMENT_ROOM);

    event.recipes.gtceu.forge_hammer(id('scale_recycling'))
        .itemInputs('mysticalagradditions:dragon_scale')
        .itemOutputs('2x kubejs:draconic_scale_cells')
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.cutter(id('egg_separation'))
        .itemInputs('minecraft:dragon_egg')
        .inputFluids('gtceu:neutronium 50')
        .itemOutputs('kubejs:draconic_embryo','8x kubejs:dragon_egg_shard')
        .duration(1000)
        .cleanroom($StarTAbyssalContainmentMachine.ABYSSAL_CONTAINMENT_ROOM)
        .EUt(GTValues.VHA[GTValues.UIV]);

    event.recipes.gtceu.macerator(id('shard_decomp'))
        .itemInputs('kubejs:dragon_egg_shard')
        .itemOutputs('2x kubejs:draconic_scale_cells','gtceu:small_draconyallium_dust','gtceu:tiny_draconyallium_dust')
        .duration(400)
        .cleanroom($StarTAbyssalContainmentMachine.ABYSSAL_CONTAINMENT_ROOM)
        .EUt(GTValues.VA[GTValues.UHV]);

    event.recipes.gtceu.autoclave(id('embryo_decomp'))
        .itemInputs('kubejs:draconic_embryo')
        .inputFluids('gtceu:nether_star_concentrate 640')
        .itemOutputs('12x kubejs:secreting_draconic_cells','8x kubejs:draconic_stem_cells')
        .duration(600)
        .cleanroom($StarTAbyssalContainmentMachine.ABYSSAL_CONTAINMENT_ROOM)
        .EUt(GTValues.VHA[GTValues.UIV]);

    event.recipes.gtceu.chemical_reactor(id('better_draco_stem_cells'))
        .itemInputs('gtceu:small_draconyallium_dust')
        .inputFluids('gtceu:abyssal_nutrient_blend 500','gtceu:draconic_enrichment_serum 2500')
        .itemOutputs('32x kubejs:draconic_stem_cells')
        .outputFluids('gtceu:condensed_abyssal_nutrient_blend 100')
        .duration(500)
        .cleanroom($StarTAbyssalContainmentMachine.ABYSSAL_CONTAINMENT_ROOM)
        .EUt(GTValues.VHA[GTValues.UIV]);

    event.recipes.gtceu.large_chemical_reactor(id('better_draco_stem_cells'))
        .itemInputs('gtceu:small_draconyallium_dust')
        .inputFluids('gtceu:abyssal_nutrient_blend 500','gtceu:draconic_enrichment_serum 2500')
        .itemOutputs('32x kubejs:draconic_stem_cells')
        .outputFluids('gtceu:condensed_abyssal_nutrient_blend 100')
        .duration(300)
        .cleanroom($StarTAbyssalContainmentMachine.ABYSSAL_CONTAINMENT_ROOM)
        .EUt(GTValues.VHA[GTValues.UIV]);

    event.recipes.gtceu.assembly_line(id('abyssal_containment_room'))
        .itemInputs(
            'gtceu:draco_abyssal_frame','8x kubejs:draco_ware_casing','4x kubejs:abyssal_inductor','12x kubejs:uiv_computational_matrix',
            '2x kubejs:uiv_micropower_router','8x kubejs:uiv_microfluidic_flow_valve','64x gtceu:fine_rhenium_super_composite_alloy_wire','4x gtceu:uiv_field_generator',
            '64x kubejs:uepic_chip','64x kubejs:uepic_chip','64x kubejs:uepic_chip','32x kubejs:uepic_chip'
        )
        .inputFluids(
            'gtceu:indium_tin_lead_cadmium_soldering_alloy 46080',
            'gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate 8640',
            'gtceu:perfluoroelastomer_rubber 5760'
        )
        .itemOutputs('start_core:abyssal_containment_room')
        .duration(800)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of('kubejs:abyssal_inductor_hull'))
                .EUt(GTValues.VHA[GTValues.UIV])
                .CWUt(224)
            )
        .EUt(GTValues.VA[GTValues.UIV]);

    // Lepton TlSb
    event.recipes.gtceu.mixer(id('thallium_antimonide'))
        .itemInputs('gtceu:thallium_dust','gtceu:antimony_dust')
        .itemOutputs('2x gtceu:thallium_antimonide_dust')
        .duration(160)
        .EUt(GTValues.VHA[GTValues.UV] * 3);

    event.recipes.gtceu.quantum_compressor_infusion(id('lepton_akreyrium_catalyst'))
        .itemInputs('kubejs:crystalline_akreyrium')
        .inputFluids('gtceu:dense_electron_akreyrium 100','gtceu:dense_muon_akreyrium 200','gtceu:dense_tau_akreyrium 200')
        .itemOutputs('kubejs:leptonic_akreyrium_catalyst')
        .duration(400)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.injection_mixer(id('lepton_dense_akreyrium'))
        .itemInputs('kubejs:leptonic_akreyrium_catalyst')
        .inputFluids('gtceu:lepton_flux_akreyrium 500')
        .outputFluids('gtceu:lepton_dense_akreyrium 1000')
        .duration(240)
        .EUt(GTValues.VHA[GTValues.UHV]);

    event.recipes.gtceu.folding_akreyrium_stabiliser(id('lepton_resonant_thallium_antimonide'))
        .itemInputs('gtceu:gray_glass_lens','gtceu:thallium_antimonide_dust')
        .inputFluids('gtceu:lepton_dense_akreyrium 1000')
        .itemOutputs('gtceu:gray_glass_lens','gtceu:lepton_resonant_thallium_antimonide_dust')
        .outputFluids('gtceu:utopian_akreyrium 750','gtceu:lepton_coalescing_superalloy 416')
        .duration(240)
        .EUt(GTValues.VHA[GTValues.UHV]);

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
