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
            lv: ['steel', 'tin' , `soul_infused`],
            mv: ['aluminium', 'copper', `signalum`],
            hv: [`stainless_steel`, `gold`, `lumium`]
        }
        const ADVrecycleMaterials = {
            ev: [`titanium`, `aluminium`, `enderium`],
            iv: [`tungstensteel`, `platinum`, `shellite`],
            luv: [`rhodium_plated_palladium`, `niobium_titanium`, `twinite`],
            zpm: [`naquadah_alloy`, `vanadium_gallium`, `dragonsteel`],
            uv: [`darmstadtium`, `yttrium_barium_cuprate`, `prismalium`],
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
            for (const [tier, [casing,cable,superconductor]] of Object.entries(PRMrecycleMaterials)) {
                console.log
                if (cable == `copper`){
                    event.recipes.gtceu.arc_furnace(`gtceu:${superconductor}_ingot`)
                        .itemInput(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x gtceu:${casing}_ingot`, `gtceu:annealed_copper_ingot`, 
                            `${amps*2}x gtceu:${superconductor}_ingot`, `2x gtceu:tiny_ash_dust`)
                        .duration(400) //temp just to test
                        .EUt(30)
                        .category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
                    event.recipes.gtceu.macerator(`gtceu:${superconductor}_ingot`)
                        .itemInput(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x gtceu:${casing}_dust`, `gtceu:${cable}_dust`, 
                            `${amps*2}x gtceu:${superconductor}_dust`, `2x gtceu:rubber_dust`)
                        .duration(400) //temp just to test
                        .EUt(8)
                        .category(GTRecipeCategories.MACERATOR_RECYCLING)
                }else {
                    event.recipes.gtceu.arc_furnace(`gtceu:${superconductor}_ingot`)
                        .itemInput(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x gtceu:${casing}_ingot`, `gtceu:${cable}_ingot`, 
                            `${amps*2}x gtceu:${superconductor}_ingot`, `2x gtceu:tiny_ash_dust`)
                        .duration(400) //temp just to test
                        .EUt(30)
                        .category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
                    event.recipes.gtceu.macerator(`gtceu:${superconductor}_ingot`)
                        .itemInput(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x gtceu:${casing}_ingot`, `gtceu:${cable}_ingot`, 
                            `${amps*2}x gtceu:${superconductor}_ingot`, `2x gtceu:rubber_dust`)
                        .duration(400) //temp just to test
                        .EUt(8)
                        .category(GTRecipeCategories.MACERATOR_RECYCLING)
                }
            }
            for (const [casing,cable,superconductor] of Object.entries(ADVrecycleMaterials)) {
                console.log
                event.recipes.gtceu.arc_furnace(`gtceu:${superconductor}_ingot`)
                        .itemInput(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x gtceu:${casing}_ingot`, `gtceu:${cable}_ingot`, 
                            `${amps*2}x gtceu:${superconductor}_ingot`, `2x gtceu:tiny_ash_dust`)
                        .duration(400) //temp just to test
                        .EUt(30)
                        .category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
                    event.recipes.gtceu.macerator(`gtceu:${superconductor}_ingot`)
                        .itemInput(`gtceu:${tier}_${amps}a_energy_converter`)
                        .itemOutputs(`8x gtceu:${casing}_ingot`, `gtceu:${cable}_ingot`, 
                            `${amps*2}x gtceu:${superconductor}_ingot`, `2x gtceu:rubber_dust`)
                        .duration(400) //temp just to test
                        .EUt(8)
                        .category(GTRecipeCategories.MACERATOR_RECYCLING)
            }
        }
        converterRecycles(1);
        converterRecycles(4);
        converterRecycles(8);
        converterRecycles(16);
    });
});

BlockEvents.placed(event => {
	let block = event.getBlock();
	if (/^(?:gtceu|start_core):.*energy_converter$/.test(block.getId())) {
        block.mergeEntityData({ energyContainer: { feToEu: true } });
	};
});