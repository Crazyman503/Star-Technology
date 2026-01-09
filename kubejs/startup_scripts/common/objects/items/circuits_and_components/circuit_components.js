StartupEvents.registry('item', event => {

    // === Living SMDs ===

    // === Draconic QMDs ===
    event.create('draconic_qmd_transistor')
        .tooltip(Text.translate('item.kubejs.draconic_qmd_transistor.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuit_components/draconic_qmds/transistor');

    event.create('draconic_qmd_resistor')
        .tooltip(Text.translate('item.kubejs.draconic_qmd_resistor.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuit_components/draconic_qmds/resistor');   

    event.create('draconic_qmd_capacitor')
        .tooltip(Text.translate('item.kubejs.draconic_qmd_capacitor.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuit_components/draconic_qmds/capacitor');   

    event.create('draconic_qmd_diode')
        .tooltip(Text.translate('item.kubejs.draconic_qmd_diode.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuit_components/draconic_qmds/diode');

    event.create('draconic_qmd_inductor')
        .tooltip(Text.translate('item.kubejs.draconic_qmd_inductor.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuit_components/draconic_qmds/inductor');

});