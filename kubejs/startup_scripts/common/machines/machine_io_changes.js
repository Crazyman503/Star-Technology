// Change Fluid Heater IO (1 fluid output to 2)
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {

    // Change Fluid Heater IO (1 fluid output to 2)
    GTRecipeTypes.FLUID_HEATER_RECIPES.setMaxIOSize(1,0,1,2);

    // Change Fermenter IO (1 item input to 3, 1 fluid input to 3)
    GTRecipeTypes.FERMENTING_RECIPES.setMaxIOSize(3,1,3,1);
    
    // Change Vacuum Freezer IO (1 fluid output 2)
    GTRecipeTypes.VACUUM_RECIPES.setMaxIOSize(1,1,2,2);

});