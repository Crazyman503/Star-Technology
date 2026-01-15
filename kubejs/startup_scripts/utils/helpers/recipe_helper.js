(() => {
  const ST = global.ST ? global.ST : (global.ST = {});

  ST.gt = {
    getMaterial: (item) => {
      const ms = ChemicalHelper[
        "getMaterial(net.minecraft.world.item.ItemStack)"
      ](item instanceof Item ? item : Item.of(item));
      if (!ms || ms.isEmpty()) return null;
      return ms;
    },
  };

  ST.recycling = {
    /**
     * https://github.com/GregTechCEu/GregTech-Modern/blob/v1.6.4-1.20.1/src/main/java/com/gregtechceu/gtceu/data/recipe/misc/RecyclingRecipes.java#L424
     * @param {string[]} itemOutputs
     * @returns {number}
     */
    calculateDuration: (itemOutputs) => {
      return (
        itemOutputs.reduce((duration, item) => {
          const is = Item.of(item);
          const ms = ST.gt.getMaterial(is);
          if (!ms) return duration;
          const matDuration =
            ms.amount() * ms.material().getMass() * is.getCount();
          return duration + matDuration;
        }, 0) / GTValues.M
      );
    },
    /**
     * https://github.com/GregTechCEu/GregTech-Modern/blob/v1.6.4-1.20.1/src/main/java/com/gregtechceu/gtceu/data/recipe/misc/RecyclingRecipes.java#L389
     * @param {string[]} itemOutputs
     * @returns {number}
     */
    calculateVoltageMultiplier: (itemOutputs) => {
      const highestTemp = itemOutputs.reduce((temp, item) => {
        const ms = ST.gt.getMaterial(item);
        if (!ms) return temp;

        let material = ms.material();

        if (
          material.hasFlag(GTMaterialFlags.IS_MAGNETIC) &&
          material.hasProperty(PropertyKey.INGOT)
        ) {
          material = material.getProperty(PropertyKey.INGOT).getSmeltingInto();
        }

        if (!material.hasProperty(PropertyKey.BLAST)) return temp;

        return Math.max(
          temp,
          material.getProperty(PropertyKey.BLAST).getBlastTemperature()
        );
      }, 0);

      if (highestTemp == 0) return 1;
      if (highestTemp < 2000) return 4;
      return 16;
    },
  };
})();
