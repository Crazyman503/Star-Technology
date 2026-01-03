// packmode: hard

ServerEvents.recipes(event => {
    const id = global.id;

    event.recipes.gtceu.assembler(id('data_access_hatch'))
        .itemInputs('gtceu:mv_input_bus','9x gtceu:data_stick','24x gtceu:fine_platinum_wire',
            '4x #gtceu:circuits/ev','4x gtceu:blue_alloy_double_cable')
        .inputFluids('gtceu:silicone_rubber 576')
        .itemOutputs('gtceu:data_access_hatch')
        .duration(1200)
        .EUt(480);
    
});