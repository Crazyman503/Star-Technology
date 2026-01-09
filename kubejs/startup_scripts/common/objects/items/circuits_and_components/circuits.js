StartupEvents.registry('item', event => {

    // === Runic Circuits ===
    event.create('runic_convergence_circuit_board')
        .texture('kubejs:item/circuits_and_components/circuits/runic/circuit_board');

    event.create('runic_convergence_printed_circuit_board')
        .texture('kubejs:item/circuits_and_components/circuits/runic/printed_circuit_board');
    
    event.create('runic_wetware_processor_assembly')
        .tooltip(Text.translate('item.kubejs.runic_wetware_processor_assembly.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/runic/processor_assembly');

    event.create('runic_wetware_processor_computer')
        .tooltip(Text.translate('item.kubejs.runic_wetware_processor_computer.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/runic/processor_computer');

    event.create('runic_wetware_processor_mainframe')
        .tooltip(Text.translate('item.kubejs.runic_wetware_processor_mainframe.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/runic/processor_mainframe');

    // === Draconic Circuits ===
    event.create('draconic_wetware_circuit_board')
        .texture('kubejs:item/circuits_and_components/circuits/draconic/circuit_board');

    event.create('draconic_wetware_printed_circuit_board')
        .texture('kubejs:item/circuits_and_components/circuits/draconic/printed_circuit_board');

    event.create('draconic_neuro_processing_unit')
        .tooltip(Text.translate('item.kubejs.draconic_neuro_processing_unit.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/draconic/neuro_processing_unit');

    event.create('draconic_wetware_microchip_processor')
        .tooltip(Text.translate('item.kubejs.draconic_wetware_microchip_processor.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/draconic/microchip_processor');

    event.create('draconic_wetware_processor')
        .tooltip(Text.translate('item.kubejs.draconic_wetware_processor.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/draconic/processor');

    event.create('draconic_wetware_processor_assembly')
        .tooltip(Text.translate('item.kubejs.draconic_wetware_processor_assembly.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/draconic/processor_assembly');

    event.create('draconic_wetware_processor_computer')
        .tooltip(Text.translate('item.kubejs.draconic_wetware_processor_computer.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/draconic/processor_computer');

    event.create('draconic_wetware_processor_mainframe')
        .tooltip(Text.translate('item.kubejs.draconic_wetware_processor_mainframe.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/draconic/processor_mainframe');

    // Awakened Draconic Circuits : to become Abyssal for Theta
    event.create('awakened_draconic_wetware_circuit_board')
        .texture('kubejs:item/circuits_and_components/circuits/abyssal/circuit_board');

    event.create('awakened_draconic_wetware_printed_circuit_board')
        .texture('kubejs:item/circuits_and_components/circuits/abyssal/printed_circuit_board');

    event.create('awakened_draconic_wetware_processor_assembly')
        .tooltip(Text.translate('item.kubejs.awakened_draconic_wetware_processor_assembly.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/abyssal/processor_assembly');

    event.create('awakened_draconic_wetware_processor_computer')
        .tooltip(Text.translate('item.kubejs.awakened_draconic_wetware_processor_computer.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/abyssal/processor_computer');

    event.create('awakened_draconic_wetware_processor_mainframe')
        .tooltip(Text.translate('item.kubejs.awakened_draconic_wetware_processor_mainframe.tooltip'))
        .texture('kubejs:item/circuits_and_components/circuits/abyssal/processor_mainframe');

});