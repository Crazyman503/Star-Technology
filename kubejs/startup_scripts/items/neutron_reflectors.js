StartupEvents.registry('item', event => {

    ['basic','advanced','complex','reinforced','borealic','dragonic','prismalic'
    ].forEach(reflector => {
        event.create(`${reflector}_neutron_reflector`)
            .texture(`kubejs:item/neutron_reflector/${reflector}`)
    });

});