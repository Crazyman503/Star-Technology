ServerEvents.recipes(event => {
    const id = global.id;

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

});