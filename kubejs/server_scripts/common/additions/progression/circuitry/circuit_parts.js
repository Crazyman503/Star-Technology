ServerEvents.recipes(event => {

    const id = global.id;
    const scalerMCSF = 64; //Should be 16n variant (cap64)
    const getDataItem = (cwu) => (cwu >= 160) ? 'start_core:data_dna_disk' : (cwu >=32) ? 'gtceu:data_module' : 'gtceu:data_orb' ;

// === Draco-QMDs ===
    const dracoQMD = (nameType, type, quantity, inputs, polymerAmount, cwu) => {

        event.recipes.gtceu.component_part_assembly(id(`draconic_qmd_${nameType}`))
            .itemInputs(inputs)
            .inputFluids(`gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${polymerAmount}`)
            .itemOutputs(`${quantity}x kubejs:draconic_qmd_${type}`)
            .duration(15 * quantity)
            .stationResearch(
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(`gtceu:advanced_smd_${type}`))
                    .EUt(GTValues.VHA[GTValues.UHV] * .8)
                    .CWUt(cwu)
                )
            .EUt(GTValues.VHA[GTValues.UHV]);

        let dataItem = getDataItem(cwu);
        
        event.recipes.gtceu.research_station(`1_x_gtceu_advanced_smd_${nameType}`)
            .itemInputs(dataItem)
            .itemInputs(`gtceu:advanced_smd_${type}`)
            .itemOutputs(Item.of(`${dataItem}`, `{assembly_line_research:{research_id:"1x_gtceu_advanced_smd_${type}",research_type:"gtceu:component_part_assembly"}}`))
            .CWUt(cwu)
            .totalCWU(cwu * 120 * 20)
            .EUt(GTValues.VHA[GTValues.UHV] / 4);
            
    };

    dracoQMD('inductor', 'inductor', 16, [
            'gtceu:neutronium_ring', 
            '4x gtceu:fine_naquadria_wire', 
            'gtceu:ferrosilite_dust'
        ], 144, 180
    );
    
    dracoQMD('transistor', 'transistor', 16, [
            'gtceu:pure_netherite_foil', 
            '8x gtceu:fine_tritanium_wire', 
            'gtceu:aurourium_foil'
        ], 144, 180
    );

    dracoQMD('capacitor', 'capacitor', 16, [
            '2x gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate_foil', 
            '2x gtceu:zalloy_foil', 
            'gtceu:cerium_tritelluride_foil'
        ], 108, 180
    );

    dracoQMD('resistor', 'resistor', 16, [
            'gtceu:diamane_dust', 
            '6x gtceu:fine_yttrium_barium_cuprate_wire', 
            '4x gtceu:bismuth_iridate_foil'
        ], 144, 180
    );

    dracoQMD('diode', 'diode', 24, [
            '2x gtceu:silicon_carbide_over_bismuth_tritelluride_dust', 
            'kubejs:neutronium_chip', 
            '8x gtceu:fine_stellarium_wire'
        ], 288, 180
    );

    const dracoQMDInMCSF = (type, outQuant, inputs, fluids, duration) => {

        // Redundant parameter drac (boolean). Removed it.

        event.recipes.gtceu.component_part_synthesis_forge(id(`${type}`))
            .itemInputs(inputs)
            .inputFluids(fluids)
            .itemOutputs(`${scalerMCSF * outQuant}x kubejs:${type}`)
            .duration(scalerMCSF * duration)
            .stationResearch(
                researchRecipeBuilder => researchRecipeBuilder
                    .researchStack(Item.of(`kubejs:${type}`))
                    .EUt(GTValues.VHA[GTValues.UHV])
                    .CWUt(320)
            )            
            .EUt(GTValues.VHA[GTValues.UHV])
            .cleanroom(CleanroomType.getByName('stabilized'));

        event.recipes.gtceu.research_station(`1_x_kubejs_${type}`)
            .itemInputs('start_core:component_data_core')
            .itemInputs(`kubejs:${type}`)
            .itemOutputs(Item.of(`start_core:component_data_core`, `{assembly_line_research:{research_id:"1x_kubejs_${type}",research_type:"gtceu:component_part_synthesis_forge"}}`))
            .CWUt(320)
            .totalCWU(384000) // 320 CWU * 60 seconds * 20 ticks
            .EUt(GTValues.VHA[GTValues.UHV]);
    
    }
    
    dracoQMDInMCSF('draconic_qmd_inductor', 16, [
            `${scalerMCSF * .75}x gtceu:neutronium_ring`, 
            `${scalerMCSF * .75 * 4}x gtceu:fine_naquadria_wire`, 
            `${scalerMCSF * .75}x gtceu:ferrosilite_dust`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 144}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_transistor`, 16, [
            `${scalerMCSF * .75}x gtceu:pure_netherite_foil`, 
            `${scalerMCSF * .75 * 8}x gtceu:fine_tritanium_wire`, 
            `${scalerMCSF * .75}x gtceu:aurourium_foil`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 144}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_capacitor`, 16, [
            `${scalerMCSF * .75 * 2}x gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate_foil`, 
            `${scalerMCSF * .75 * 2}x gtceu:zalloy_foil`, 
            `${scalerMCSF * .75}x gtceu:cerium_tritelluride_foil`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 108}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_resistor`, 16, [
            `${scalerMCSF * .75}x gtceu:diamane_dust`, 
            `${scalerMCSF * .75 * 6}x gtceu:fine_yttrium_barium_cuprate_wire`, 
            `${scalerMCSF * .75 * 4}x gtceu:bismuth_iridate_foil`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 144}`
        ], 240
    );
        
    dracoQMDInMCSF(`draconic_qmd_diode`, 24, [
            `${scalerMCSF * .75 * 2}x gtceu:silicon_carbide_over_bismuth_tritelluride_dust`, 
            `${scalerMCSF * .75}x kubejs:neutronium_chip`, 
            `${scalerMCSF * .75 * 8}x gtceu:fine_stellarium_wire`
        ], [
            `gtceu:poly_34_ethylenedioxythiophene_polystyrene_sulfate ${scalerMCSF * .75 * 288}`
        ], 480
    );

});