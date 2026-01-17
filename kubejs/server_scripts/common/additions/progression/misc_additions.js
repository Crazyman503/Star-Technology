ServerEvents.recipes (event => {
    const id = global.id;


    let cpaRecipe = event.recipes.gtceu.component_part_assembly(id(`compass_of_the_flame`))
        .itemInputs(`gtceu:calamatium_frame`, `4x gtceu:dense_ancient_netherite_plate`, `4x #gtceu:circuits/uev`,`gtceu:uhv_sensor`, `gtceu:long_magnetic_zapolgium_rod`,`8x gtceu:isovol_screw`)
        .inputFluids(`gtceu:indium_tin_lead_cadmium_soldering_alloy 1520`, `start_core:flamewake_solvent 10000`)
        .itemOutputs(`kubejs:compass_of_the_flame`)
        .duration(4000)
        .EUt(4194304);
    
    cpaRecipe = cpaRecipe.stationResearch(
        researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of(`minecraft:recovery_compass`))
                .EUt(983040)
                .CWUt(160)
    );

    event.recipes.gtceu.research_station(`1_x_compass_of_the_flame_cpa`)
        .itemInputs(`start_core:data_dna_disk`)
        .itemInputs(`minecraft:recovery_compass`)
        .itemOutputs(
            Item.of(
                `start_core:data_dna_disk`,
                `{assembly_line_research:{research_id:"1x_minecraft_recovery_compass",research_type:"gtceu:component_part_assembly"}}`
            )
        )
        .CWUt(160)
        .totalCWU(640000)
        .EUt (983040);
}) 

        

ItemEvents.rightClicked('kubejs:compass_of_the_flame', event => {
    let { level,player } = event;
    if (!(level instanceof ServerLevel)) return
    let registryAccess = level.registryAccess();
    let structureRegistry = registryAccess.registryOrThrow(Registries.STRUCTURE);
    let structureKey = structureRegistry.getResourceKey(structureRegistry.get(`minecraft:ruined_portal_nether`)).get();
    let structureHolder = structureRegistry.getHolderOrThrow(structureKey);

    if (!structureHolder){
        player.tell(Text.translate(`item.kubejs.compass_of_the_flame.failed`));
        return
    }

    let structure = structureHolder.get();
    let holderSet = HolderSet.direct([structureHolder]);
    let origin = new BlockPos(player.getBlockX(), player.getBlockY(), player.getBlockZ());
    let generator = level.getChunkSource().getGenerator();
    let result = generator.findNearestMapStructure(level, holderSet, origin, 100, false);

    if (result != null) {
        let pos = result.getFirst();
        let chunkPos = new ChunkPos(pos);
        let sectionPos = SectionPos.of(chunkPos, level.getMinSection());
        let chunk = level.getChunk(chunkPos.x, chunkPos.z);
        let start = level.structureManager().getStartForStructure(sectionPos, structure, chunk);
        if (start && start.isValid()) {
            let piece = start.getPieces()[0];
            let {x, y, z} = piece.locatorPosition;
            player.tell(Text.translate(`item.kubejs.compass_of_the_flame.success`)); 
            player.tell(`§6{ ${x}, ${y}, ${z} }`);
        }
    } else {
        player.tell(Text.translate(`item.kubejs.compass_of_the_flame.failed`));
    }
})
