global.not_hardmode(() => {

    ServerEvents.recipes(event => {
        const id = global.id;

        event.remove({ output: /gtceu:.*_energy_converter/ });
        
        const PRMconverterMaterials = {
            lv: 'soul_infused',
            mv: 'signalum',
            hv: 'lumium'
        }

        const ADVconverterMaterials = {
            ev: 'enderium',
            iv: 'shellite',
            luv: 'twinite',
            zpm: 'dragonsteel',
            uv: 'prismalium',
            uhv: 'stellarium',
            uev: 'ancient_runicalium'
        }
        
        const PRMrecycleMaterials = {
            lv: ['gtceu:steel', 'gtceu:tin' , `gtceu:soul_infused`],
            mv: ['gtceu:aluminium', 'gtceu:copper', `gtceu:signalum`],
            hv: [`gtceu:stainless_steel`, `minecraft:gold`, `gtceu:lumium`]
        }
        const ADVrecycleMaterials = {
            ev: [`gtceu:titanium`, `gtceu:aluminium`, `gtceu:enderium`],
            iv: [`gtceu:tungsten_steel`, `gtceu:platinum`, `gtceu:shellite`],
            luv: [`gtceu:rhodium_plated_palladium`, `gtceu:niobium_titanium`, `gtceu:twinite`],
            zpm: [`gtceu:naquadah_alloy`, `gtceu:vanadium_gallium`, `gtceu:dragonsteel`],
            uv: [`gtceu:darmstadtium`, `gtceu:yttrium_barium_cuprate`, `gtceu:prismalium`],
        }



        function converterCraftingRecipe(amps,thickness){
            for (const [tier, superconductor] of Object.entries(ADVconverterMaterials)) {
                event.shaped(Item.of(`gtceu:${tier}_${amps}_energy_converter`), [
                    '   ',
                    'WCW',
                    'WSW'
                ], {
                    W: `gtceu:${superconductor}_${thickness}_wire`,
                    C: `#gtceu:circuits/${tier}`,
                    S: `gtceu:${tier}_machine_hull`
                }).id(`start:shaped/${tier}_${amps}_energy_converter`);
            };
            for (const [tier, superconductor] of Object.entries(PRMconverterMaterials)) {
                event.shaped(Item.of(`gtceu:${tier}_${amps}_energy_converter`), [
                    '   ',
                    'WCW',
                    'WSW'
                ], {
                    W: `gtceu:${superconductor}_${thickness}_wire`,
                    C: `#gtceu:circuits/${tier}`,
                    S: `gtceu:${tier}_machine_hull`
                }).id(`start:shaped/${tier}_${amps}_energy_converter`);
            };
        };
        
        converterCraftingRecipe('1a','single');
        converterCraftingRecipe('4a','quadruple');
        converterCraftingRecipe('8a','octal');
        converterCraftingRecipe('16a','hex');

        // 64A Converter Recipe
        for (const [tier, superconductor] of Object.entries(ADVconverterMaterials)) {
            event.recipes.gtceu.assembler(`start_core:${tier}_64a_energy_converter`)
                .itemInputs(`#gtceu:circuits/${tier}`, `16x gtceu:${superconductor}_hex_wire`, `gtceu:${tier}_machine_hull`)
                .itemOutputs(Item.of(`start_core:${tier}_64a_energy_converter`))
                .duration(600)
                .EUt(1625)
        }

        function converterRecycles(amps /*int*/){
            if (amps != 64){
                for (const [tier, [casing,cable,superconductor]] of Object.entries(PRMrecycleMaterials)) {
                event.remove({id:`gtceu:arc_furnace/arc_${tier}_${amps}a_energy_converter`});
                event.remove({id:`gtceu:macerator/macerate_${tier}_${amps}a_energy_converter`});
                let cableArc = (cable == `gtceu:copper`) ? `gtceu:annealed_copper` : cable;
                let cableMac = (cable == `minecraft:gold`) ? `gtceu:gold` : cable;

                event.recipes.gtceu.arc_furnace(id(`arc_${tier}_${amps}a_energy_converter`))
                    .itemInputs(`gtceu:${tier}_${amps}a_energy_converter`)
                    .itemOutputs(`8x ${casing}_ingot`, `${cableArc}_ingot`, 
                        `${amps*2}x ${superconductor}_ingot`, `2x gtceu:tiny_ash_dust`)
                    .duration(1200) //temp just to test
                    .EUt(30)
                    .category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
                event.recipes.gtceu.macerator(id(`macerate_${tier}_${amps}a_energy_converter`))
                    .itemInputs(`gtceu:${tier}_${amps}a_energy_converter`)
                    .itemOutputs(`8x ${casing}_dust`, `${cableMac}_dust`,
                        `${amps*2}x ${superconductor}_dust`, `2x gtceu:rubber_dust`)
                    .duration(1200) //temp just to test
                    .EUt(8)
                    .category(GTRecipeCategories.MACERATOR_RECYCLING)
                }
            }
            for (const [tier, [casing,cable,superconductor]] of Object.entries(ADVrecycleMaterials)) {
                event.remove({id:`gtceu:arc_furnace/arc_${tier}_${amps}a_energy_converter`});
                event.remove({id:`gtceu:macerator/macerate_${tier}_${amps}a_energy_converter`});

                if (amps == 64) {
                    event.recipes.gtceu.arc_furnace(id(`arc_${tier}_${amps}a_energy_converter`))
                        .itemInputs(`start_core:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x ${casing}_ingot`, `${cable}_ingot`, `${amps}x ${superconductor}_ingot`, `${amps}x ${superconductor}_ingot`, `2x gtceu:tiny_ash_dust`)
                        .duration(1200) //temp just to test
                        .EUt(30)
                        .category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
                    event.recipes.gtceu.macerator(id(`macerate_${tier}_${amps}a_energy_converter`))
                        .itemInputs(`start_core:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x ${casing}_dust`, `${cable}_dust`, `${amps}x ${superconductor}_dust`, `${amps}x ${superconductor}_dust`, `2x gtceu:rubber_dust`)
                        .duration(1200) //temp just to test
                        .EUt(8)
                        .category(GTRecipeCategories.MACERATOR_RECYCLING)
                } else {
                    event.recipes.gtceu.arc_furnace(id(`arc_${tier}_${amps}a_energy_converter`))
                        .itemInputs(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x ${casing}_ingot`, `${cable}_ingot`, 
                            `${2 * amps}x ${superconductor}_ingot` , `2x gtceu:tiny_ash_dust`)
                        .duration(1200) //temp just to test
                        .EUt(30)
                        .category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
                    event.recipes.gtceu.macerator(id(`macerate_${tier}_${amps}a_energy_converter`))
                        .itemInputs(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x ${casing}_dust`, `${cable}_dust`,
                            `${2 * amps}x ${superconductor}_dust`, `2x gtceu:rubber_dust`)
                        .duration(1200) //temp just to test
                        .EUt(8)
                        .category(GTRecipeCategories.MACERATOR_RECYCLING)
                }
            }
        }
        converterRecycles(1);
        converterRecycles(4);
        converterRecycles(8);
        converterRecycles(16);
        converterRecycles(64);
    });
});

BlockEvents.placed(event => {
	let block = event.getBlock();
	if (/^(?:gtceu|start_core):.*energy_converter$/.test(block.getId())) {
        block.mergeEntityData({ energyContainer: { feToEu: true } });
	};
});