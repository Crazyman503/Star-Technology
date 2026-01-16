let ServerLevel = Java.loadClass("net.minecraft.server.level.ServerLevel")
let BlockPos = Java.loadClass("net.minecraft.core.BlockPos")
let ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos")
let SectionPos = Java.loadClass("net.minecraft.core.SectionPos")
let ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let Registries = Java.loadClass("net.minecraft.core.registries.Registries")
let HolderSet = Java.loadClass("net.minecraft.core.HolderSet")
let Holder = Java.loadClass("net.minecraft.core.Holder")

ServerEvents.recipes (event => {
    const id = global.id;

    event.recipes.gtceu.assembly_line(id(`compass_of_the_flame`))
        .itemInputs(`gtceu:calamatium_frame`, `4x gtceu:dense_ancient_netherite_plate`, `4x #gtceu:circuits/uev`,`gtceu:uhv_sensor`, `4x gtceu:long_magnetic_zapolgium_rod`,`8x gtceu:isovol_screw`)
        .inputFluids(`gtceu:indium_tin_lead_cadmium_soldering_alloy 1520`, `start_core:flamewake_solvent 10000`)
        .itemOutputs(`kubejs:compass_of_the_flame`)
        .duration(4000)
        .stationResearch (
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of(`gtceu:dense_ancient_netherite_plate`))
                .EUt(983040)
                .CWUt(160)
        )
        .EUt(4194304);
})

ItemEvents.rightClicked('kubejs:compass_of_the_flame', event => {
    let { level,player } = event;
    if (!(level instanceof ServerLevel)) return
    let registryAccess = level.registryAccess();
    let structureRegistry = registryAccess.registryOrThrow(Registries.STRUCTURE);
    let structureKey = structureRegistry.getResourceKey(structureRegistry.get(`minecraft:ruined_portal_nether`)).get();
    let structureHolder = structureRegistry.getHolderOrThrow(structureKey);

    if (!structureHolder){
        player.tell(`You can only use this in the nether, please try again`);
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
            event.player.tell(Text.translate(`The nearest shrine is at ${x}, ${y}, ${z}`));
        }
    } else {
        player.tell(`You can only use this in the nether, please try again`);
    }
})
