ServerEvents.recipes(event => {
    const id = global.id;

    // === Xenotime RE Line ===


    // === Magnetic Adjsutments ===

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

});
