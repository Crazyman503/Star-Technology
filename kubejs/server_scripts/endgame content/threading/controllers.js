ServerEvents.recipes(event => {
    const id = global.id;

    // Controller

        event.shaped('start_core:threading_controller', [
            'AEA',
            'CHC',
            'ASA'
        ], {
            A: 'gtceu:uiv_robot_arm',
            E: 'gtceu:uiv_emitter',
            C: 'gtceu:lepton_resonant_thallium_antimonide_double_cable',
            H: 'gtceu:uiv_machine_hull',
            S: 'gtceu:uiv_sensor'
        });

    // Machines


});