ServerEvents.recipes(event => {
    const id = global.id;

    event.forEachRecipe({ type: 'gtceu:macerator' }, macParse => {
        const macData = JSON.parse(macParse.json);

        if (macData.category === 'gtceu:ore_crushing') {
            const macInputs = macData.inputs;

            if (!macInputs?.item?.length === 1) return;

            const itemInput = macInputs.item[0].content;

            if (!itemInput?.ingredient?.tag) return;

            const oreTagSplit = itemInput.ingredient.tag.split('/');

            if (oreTagSplit[0] === 'forge:raw_materials') {
                const itemOutput = macData.outputs.item[0].content;

                event.recipes.gtceu.pulverizer(id(`crushed_${oreTagSplit[1]}`))
                    .itemInputs(`1x #${itemInput.ingredient.tag}`)
                    .itemOutputs(`${itemOutput.count}x ${itemOutput.ingredient.item}`)
                    .circuit(0)
                    .duration(300)
                    .EUt(GTValues.VA[GTValues.LV])
            }
        }
    });

    event.forEachRecipe({ type: 'minecraft:blasting' }, furnParse => {
        const furnData = JSON.parse(furnParse.json);
        const furnInput = furnData.ingredient;

        if (!furnInput.tag) return;

        const oreTagSplit = furnInput.tag.split('/');

        if (oreTagSplit[0] === 'forge:raw_materials') {
            const oreName = oreTagSplit[1];
            const furnOutput = furnData.result;

            event.recipes.gtceu.pulverizer(id(`crushed_heated_${oreName}`))
                .itemInputs(`1x gtceu:crushed_${oreName}_ore`)
                .itemOutputs(`1x ${furnOutput.item}`)
                .circuit(1)
                .duration(300)
                .EUt(GTValues.VA[GTValues.LV])

            event.recipes.gtceu.pulverizer(id(`raw_heated_${oreName}`))
                .itemInputs(`1x #${furnInput.tag}`)
                .itemOutputs(`${furnOutput.count || 1}x ${furnOutput.item}`)
                .circuit(1)
                .duration(300)
                .EUt(GTValues.VA[GTValues.LV])
        }
    });
});