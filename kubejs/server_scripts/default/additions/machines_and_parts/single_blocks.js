global.not_hardmode(() => {

    ServerEvents.recipes(event => {
        const id = global.id;

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

        const assembler = (id1, output, input, eu) => {
            event.recipes.gtceu.assembler(id(`${id1}`))
                .itemInputs(input)
                .inputFluids('gtceu:soldering_alloy 144')
                .itemOutputs(`${output}`)
                .duration(400)
                .EUt(eu);
        }

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


        // === Pulverizer ===
        [
            {voltage: 'lv', conductor: 'copper', cable: 'tin', grind: 'minecraft:diamond'},
            {voltage: 'mv', conductor: 'cupronickel', cable: 'copper', grind: 'minecraft:diamond'},
            {voltage: 'hv', conductor: 'kanthal', cable: 'gold', grind: 'gtceu:diamond_grinding_head'},
            {voltage: 'ev', conductor: 'nichrome', cable: 'aluminium', grind: 'gtceu:diamond_grinding_head'},
            {voltage: 'iv', conductor: 'rtm_alloy', cable: 'platinum', grind: 'gtceu:tungsten_grinding_head'},
            {voltage: 'luv', conductor: 'hssg', cable: 'niobium_titanium', grind: 'gtceu:tungsten_grinding_head'},
            {voltage: 'zpm', conductor: 'naquadah', cable: 'vanadium_gallium', grind: 'gtceu:tungsten_grinding_head'},
            {voltage: 'uv', conductor: 'naquadah_alloy', cable: 'yttrium_barium_cuprate', grind: 'gtceu:tungsten_grinding_head'},
            {voltage: 'uhv', conductor: 'zirconium_selenide_diiodide', cable: 'europium', grind: 'gtceu:tungsten_grinding_head'},
            {voltage: 'uev', conductor: 'astatium_bioselex_carbonite', cable: 'cerium_tritelluride', grind: 'gtceu:tungsten_grinding_head'},
            {voltage: 'uiv', conductor: 'hafnide_ito_ceramic', cable: 'polonium_bismide', grind: 'gtceu:tungsten_grinding_head'},
        ].forEach(tier => {
            event.shaped(`gtceu:${tier.voltage}_pulverizer`, [
                'ABC',
                'DEF',
                'AGH'
            ], {
                A: `gtceu:${tier.cable}_single_cable`,
                B: `gtceu:${tier.voltage}_electric_piston`,
                C: `gtceu:${tier.voltage}_electric_motor`,
                D: `gtceu:${tier.conductor}_quadruple_wire`,
                E: `gtceu:${tier.voltage}_machine_hull`,
                F: tier.grind,
                G: 'minecraft:anvil',
                H: `#gtceu:circuits/${tier.voltage}`,
            })
        })
    });
});