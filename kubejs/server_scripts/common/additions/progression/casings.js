ServerEvents.recipes(event => {
    const id = global.id;

    const casing = (type,material,casing_id) => {

        event.shaped(Item.of(`2x ${casing_id}:${type}_casing`), [
            'PHP',
            'PFP',
            'PWP'
        ], {
            P: `gtceu:${material}_plate`,
            F: `gtceu:${material}_frame`,
            H: '#forge:tools/hammers',
            W: '#forge:tools/wrenches'
        }).id(`start:shaped/${type}_casing`);

        event.recipes.gtceu.assembler(id(`${type}_casing`))
            .itemInputs(`6x gtceu:${material}_plate`, `gtceu:${material}_frame`)
            .itemOutputs(`2x ${casing_id}:${type}_casing`)
            .duration(50)
            .EUt(16)
            .circuit(6);

    };

    casing('soul_infused','soul_infused' ,'kubejs');
    casing('signalum','signalum' ,'kubejs');
    casing('lumium','lumium' ,'kubejs');
    casing('enderium','enderium' ,'kubejs');
    casing('shellite','shellite' ,'kubejs');
    casing('twinite','twinite' ,'kubejs');
    casing('dragonsteel','dragonsteel' ,'kubejs');
    casing('prismalium','prismalium' ,'kubejs');
    casing('melodium','melodium' ,'kubejs');
    casing('stellarium','stellarium' ,'kubejs');
    casing('ancient_runicalium','ancient_runicalium' ,'kubejs');
    casing('austenitic_stainless_steel_304','austenitic_stainless_steel_304' ,'kubejs');
    casing('inconel_625','inconel_625' ,'kubejs');
    casing('birmabright','birmabright' ,'kubejs');
    casing('duralumin','duralumin' ,'kubejs');
    casing('hydronalium','hydronalium' ,'kubejs');
    casing('beryllium_aluminium_alloy','beryllium_aluminium_alloy' ,'kubejs');
    casing('elgiloy','elgiloy' ,'kubejs');
    casing('beryllium_bronze','beryllium_bronze' ,'kubejs');
    casing('silicon_bronze','silicon_bronze' ,'kubejs');
    casing('kovar','kovar' ,'kubejs');
    casing('zamak','zamak' ,'kubejs');
    casing('tumbaga','tumbaga' ,'kubejs');
    casing('sterling_silver','sterling_silver' ,'kubejs');
    casing('blue_steel','blue_steel' ,'kubejs');
    casing('red_steel','red_steel' ,'kubejs');
    casing('enriched_naquadah_machine','enriched_naquadah' ,'kubejs');
    casing('fluix_steel','fluix_steel' ,'kubejs');

    const casingDouble = (type,material,casing_id) => {

        event.shaped(Item.of(`${casing_id}:${type}_casing`,2), [
            'PHP',
            'PFP',
            'PWP'
        ], {
            P: `gtceu:double_${material}_plate`,
            F: `gtceu:${material}_frame`,
            H: '#forge:tools/hammers',
            W: '#forge:tools/wrenches'
        }).id(`start:shaped/${type}_casing`);

        event.recipes.gtceu.assembler(id(`${type}_casing`))
            .itemInputs(`6x gtceu:double_${material}_plate`, `gtceu:${material}_frame`)
            .itemOutputs(`2x ${casing_id}:${type}_casing`)
            .duration(50)
            .EUt(16)
            .circuit(6);

    };

    casingDouble('atomic','trinaquadalloy','gtceu');
    casingDouble('noble_mixing','astrenalloy_nx','kubejs');
    casingDouble('quake_proof','thacoloy_nq_42x','kubejs');
    casingDouble('superalloy','lepton_coalescing_superalloy','kubejs');
    casingDouble('nyanium_machine','nyanium' ,'kubejs');

    event.recipes.gtceu.assembler(id('silicone_rubber_casing'))
        .itemInputs('gtceu:solid_machine_casing') 
        .inputFluids('gtceu:silicone_rubber 216')
        .itemOutputs('kubejs:silicone_rubber_casing')
        .duration(50)
        .EUt(GTValues.VH[GTValues.MV])
        .circuit(6);

    const firebox = (type,material,casing_id) => {

        event.shaped(`2x ${casing_id}:${type}_firebox_casing`, [
            'PRP',
            'RFR',
            'PRP'
        ], {
            P: `gtceu:${material}_plate`,
            F: `gtceu:${material}_frame`,
            R: `gtceu:${material}_rod`
        }).id(`${casing_id}:${type}_firebox_casing`);

    };

    firebox('enriched_naquadah','enriched_naquadah','kubejs');
    firebox('nyanium_machine','nyanium','kubejs')

    const gearbox = (type,material,casing_id) => {

        event.shaped(`2x ${casing_id}:${type}_gearbox`, [
            'PHP',
            'GFG',
            'PWP'
        ], {
            P:  `gtceu:${material}_plate`,
            F:  `gtceu:${material}_frame`,
            G:  `gtceu:${material}_gear`,
            H: '#forge:tools/hammers',
            W: '#forge:tools/wrenches'
        }).id(`${casing_id}:${type}_gearbox`);
    
        event.recipes.gtceu.assembler(id(`${material}_gearbox`))
            .itemInputs(`4x gtceu:${material}_plate`,`2x gtceu:${material}_gear`,`gtceu:${material}_frame`)
            .itemOutputs(`2x ${casing_id}:${type}_gearbox`)
            .duration(50)
            .EUt(16)
            .circuit(4);

    };

    gearbox('enriched_naquadah','enriched_naquadah','kubejs');
    gearbox('nyanium','nyanium','kubejs');

    const pipe = (type,material,pipe,casing_id) => {

        event.shaped(`2x ${casing_id}:${type}_pipe_casing`, [
            'PLP',
            'LFL',
            'PLP'
        ], {
            P:  `gtceu:${material}_plate`,
            F:  `gtceu:${material}_frame`,
            L:  `gtceu:${pipe}_normal_fluid_pipe`
        }).id(`${casing_id}:${type}_pipe_casing`);

    };

    pipe('enriched_naquadah','enriched_naquadah','enriched_naquadah','kubejs');
    pipe('nyanium','nyanium','nyanium','kubejs');

    const engine_intake = (type,material,pipe,casing_id,used_casing) => {

        event.shaped(`2x ${casing_id}:${type}_engine_intake_casing`, [
            'PHP',
            'RFR',
            'PWP'
        ], {
            P:  `gtceu:${pipe}_normal_fluid_pipe`,
            F:  `${used_casing}_casing`,
            R:  `gtceu:${material}_rotor`,
            H: '#forge:tools/hammers',
            W: '#forge:tools/wrenches'
        }).id(`${casing_id}:${type}_engine_intake_casing`);

        event.recipes.gtceu.assembler(id( `${type}_engine_intake_casing`))
            .itemInputs(`2x gtceu:${material}_rotor`,`4x gtceu:${pipe}_normal_fluid_pipe`,`${used_casing}_casing`)
            .itemOutputs(`2x ${casing_id}:${type}_engine_intake_casing`)
            .duration(50)
            .EUt(16);

    };

    engine_intake('enriched_naquadah','enriched_naquadah','enriched_naquadah','kubejs','kubejs:enriched_naquadah_machine');
    engine_intake('nyanium_machine','nyanium','nyanium','kubejs','kubejs:nyanium_machine');
    
});