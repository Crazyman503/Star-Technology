global.not_hardmode(() => {

    ServerEvents.recipes(event => {
        const id = global.id;

        // === Mega EBF/Vac ===
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

        // === AE ===
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

        ['input_bus', 'output_bus', 'input_hatch', 'output_hatch'].forEach(type => {
            assembler(`me_${type}`, `gtceu:me_${type}`, [`gtceu:ev_${type}`, '#gtceu:circuits/ev', 'ae2:fluix_smart_cable'], 8192);
        });

        // === MA ===
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

    });
});