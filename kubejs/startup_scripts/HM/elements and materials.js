GTCEuStartupEvents.registry('gtceu:material', event => {
	
	// Periodic table materials
    const element = global.periodicTableElement;
    // Ingots
    element('promethium', 'ingot');
    element('dysprosium', 'ingot');
    element('holmium', 'ingot');
	const blast = global.blastProperty;
    blast('promethium', 1315, 'high', VA('ev'), 3458);
    blast('dysprosium', 1680, 'mid', VA('hv'), 2684);
    blast('holmium', 1747, 'mid', VHA('ev'), 3346);

	event.create('pig_iron')
		.ingot(1)
		.dust()
		.components('1x iron')
		.color(0x8E8385)
		.iconSet(DULL)
		.flags(foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, bolt_and_screw, no_decomp, no_smelt);

	event.create('flisnt')
		.color(0x888B8C)
		.toolStats(ToolProperty.Builder.of(1, 1, 96, 1, [
			GTToolType.SAW,
			GTToolType.HARD_HAMMER,
			GTToolType.PICKAXE,
			GTToolType.SHOVEL,
			GTToolType.AXE,
			GTToolType.SWORD,
			GTToolType.KNIFE,
			GTToolType.FILE,
			GTToolType.SCYTHE
		]).build());

	event.create('coke_clay')
		.dust()
		.color(0xD7D2AA)
		.secondaryColor(0xA09C78);

	event.create('crude_cast_iron')
		.ingot()
		.components('1x pig_iron')
		.color(0x3D413F)
		.iconSet(DULL)
		.flags(no_decomp, no_smelt);

	event.create('crude_wrought_iron')
		.ingot()
		.liquid(new GTFluidBuilder().temperature(1700))
		.components('1x wrought_iron')
		.color(0x7A6E69)
		.iconSet(DULL)
		.flags(no_decomp, no_smelt);

	event.create('cast_iron')
        .ingot(1)
		.liquid()
        .components('18x crude_cast_iron', '1x bismuth', '2x copper')
        .color(0x696E6C)
		.secondaryColor(0x4C5052)
        .iconSet(METALLIC)
		.blastTemp(1450, 'low', VA('mv'), 1200)
        .flags(not_alloy, foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, bolt_and_screw, no_decomp, no_smelt);

	const matmod = (mat, flag) => {
        GTMaterials.get(mat).addFlags(flag);
    }
	matmod('iron', [foil, fine_wire]);
	matmod('brass', [ring, foil, frame]);
	matmod('tin_alloy', [ring, foil, rotor]);
	matmod('potin', [foil, ring, small_gear]);
	matmod('cupronickel', [ring]);
	matmod('nickel', [foil]);
	matmod('wrought_iron', [frame, small_gear]);
	matmod('red_alloy', [spring]);
	matmod('lead', [small_gear]);
	matmod('black_steel', [bolt_and_screw, rotor, gear, small_gear]);
	matmod('hsla_steel', [bolt_and_screw, rotor]);
	matmod('ultimet', [gear, small_gear]);
	matmod('magnalium', [gear, small_gear]);
	matmod('damascus_steel', [gear, small_gear, fine_wire, foil]);
	matmod('blue_alloy', [fine_wire, foil]);
	matmod('promethium', [plates]);

	const elemDustFluid = (name, color, flags) => {
        event.create(name).dust().fluid().element(GTElements.get(name)).color(color).flags(flags);
    }
	const elemIngot = (name, element, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().element(GTElements.get(element)).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().element(GTElements.get(element)).color(color).iconSet(icon).flags(flags);
        }
    }
	const elemIngotFluid = (name, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color).iconSet(icon).flags(flags);
        }
    }
	const compIngot = (name, elements, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().components(elements).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().components(elements).color(color).iconSet(icon).flags(flags);
        }
    }
	const compDustIcon = (name, elements, color, icon, flags) => {
        event.create(name).dust().components(elements).color(color).iconSet(icon).flags(flags);
    }
	const compDust = (name, elements, color, flags) => {
        event.create(name).dust().components(elements).color(color).flags(flags);
    }
	const DustNoComp = (name, color, flags) => {
        event.create(name).dust().color(color).flags(flags);
    }
	const LiquidNoComp = (name, color, flags) => {
        event.create(name).fluid().color(color).flags(flags);
    }
	const compLiquid = (name, elements, color, flags) => {
        event.create(name).fluid().components(elements).color(color).flags(flags);
    }
	const compLiquidTemp = (name, heat, elements, color, flags) => {
        event.create(name).liquid(new GTFluidBuilder().temperature(heat)).components(elements).color(color).flags(flags);
    }
	const compGem = (name, elements, color, icon, flags) => {
        event.create(name).gem().components(elements).color(color).iconSet(icon).flags(flags);
    }
	const conductorSuper = (name, elements, color, blasting, cable, rotorstat) => {
		event.create(name).ingot().fluid().components(elements).color(color).iconSet(SHINY).flags(foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, fine_wire)
			.blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]).cableProperties(cable[0], cable[1], cable[2], cable[3]).rotorStats(rotorstat[0], rotorstat[1], rotorstat[2], rotorstat[3]);
    }

	// if (global.packmode == 'hard'){(() => { 
	// //HM Superconductors
	// conductorSuper('soul_infused', ['1x invar', '2x mystery'], 0xcc9966, [1700, 'low', VHA('mv'), 1200], [V('lv'), 2, 0, true], [135, 105, 3, 37600]);
    // conductorSuper('signalum', ['1x silver', '3x copper', '4x redstone'], 0xff3300, [2500, 'low', VA('mv'), 1500], [V('mv'), 4, 0, true], [170, 120, 3, 24000]);
    // conductorSuper('lumium', ['1x silver', '3x tin', '2x glowstone'], 0xffffb3, [3200, 'low', VA('hv'), 1800], [V('hv'), 6, 0, true], [200, 135, 3, 24000]);
    // conductorSuper('enderium', ['3x lead', '1x diamond', '2x ender_pearl'], 0x006666, [3600, 'mid', VA('iv'), 2100], [V('ev'), 8, 0, true], [270, 150, 3, 45600]);
    // conductorSuper('shellite', ['1x black_bronze', '3x signalum'], 0x9933ff, [5350, 'mid', VA('iv'), 2400], [V('iv'), 12, 0, true], [405, 175, 3, 37600]);
    // conductorSuper('twinite', ['3x manganese_phosphide', '2x amethyst', '1x lumium'], 0xf66999, [5560, 'mid', VA('luv'), 2700], [V('luv'), 14, 0, true], [630, 210, 3, 24000]);
    // conductorSuper('dragonsteel', ['4x tungsten', '8x magnesium_diboride', '2x cadmium'], 0x3333cc, [7100, 'high', VA('zpm'), 3000], [V('zpm'), 16, 0, true], [1090, 300, 3, 32000]);
    // conductorSuper('prismalium', ['8x naquadah', '4x mercury_barium_calcium_cuprate', '7x tungsten_carbide'], 0x66ffff, [9000, 'high', VA('zpm'), 3300], [V('uv'), 18, 0, true], [1440, 375, 3, 48000]);
    // conductorSuper('melodium', ['2x uranium_triplatinum', '14x electrum', '3x amethyst', '4x darmstadtium', '7x europium'], 0xd9b3ff, [10000, 'higher', VA('uv'), 3600], [V('uv'), 20, 0, true], [1800, 440, 3, 64000]);
    // conductorSuper('stellarium', ['12x neutronium', '4x melodium', '1x samarium_iron_arsenic_oxide'], 0xccffff, [10799, 'highest', VA('uhv'), 4000], [V('uhv'), 22, 0, true], [2880, 530, 3, 96000]);
    // conductorSuper('ancient_runicalium', ['5x zapolgium', '18x stellarium', '8x zirconium'], 0xFAB922, [11749, 'highest', VA('uev'), 5000], [V('uev'), 24, 0, true], [5760, 575, 3, 128000]);
	// })()}
	//Resource Gen Extension
	compDustIcon('metallic_ore_sludge', ['8x pentlandite', '5x gold', '2x silver'],0xA4AC72,METALLIC,no_decomp)
	LiquidNoComp('raw_ore_concentrate',0x7C8478,no_decomp);
	LiquidNoComp('raw_ore_residue',0x908784,no_decomp);
	LiquidNoComp('diluted_drilling_formula',0xDFD2A0,no_decomp);
	LiquidNoComp('concentrate_drilling_formula',0xEDDC9E,no_decomp);
	LiquidNoComp('residue_drilling_formula',0xE2CF84,no_decomp);
	LiquidNoComp('slurry_drilling_formula',0xDCD0A0,no_decomp);
	LiquidNoComp('poor_mixture_drilling_formula',0xCCC29C,no_decomp);
	LiquidNoComp('rich_mixture_drilling_formula',0xB9B08B,no_decomp);
	compLiquidTemp('molten_waste',1170,'mystery',0x806861,no_decomp);
	compLiquidTemp('cooled_molten_waste',515,'mystery',0x6D5852,no_decomp);
	compLiquidTemp('impure_molten_ore_mixture',2190,'mystery',0x746E6D, no_decomp);
	compLiquidTemp('pure_molten_ore_mixture',2635,'mystery',0x5C5451, no_decomp);
	compLiquidTemp('cooled_molten_bauxite_ore', 480, ['1x bauxite'], 0x9B9B83, [no_decomp]);
    compLiquidTemp('cooled_molten_pitchblende_ore', 480, ['1x pitchblende'], 0x95A96F, [no_decomp]);
    compLiquidTemp('cooled_molten_molybdenite_ore', 480, ['1x molybdenite'], 0xA6B38D, [no_decomp]);
    compLiquidTemp('cooled_molten_ilmenite_ore', 480, ['1x ilmenite'], 0xAE9279, [no_decomp]);
    compLiquidTemp('cooled_molten_tungstate_ore', 480, ['1x tungstate'], 0x848E97, [no_decomp]);
    compLiquidTemp('cooled_molten_bastnasite_ore', 480, ['1x bastnasite'], 0x80766F, [no_decomp]);
    compLiquidTemp('cooled_molten_cooperite_ore', 480, ['1x cooperite'], 0x8B8A76, [no_decomp]);

	//Rare Earth Line Extension
	compLiquid('acid_leached_rare_earth_sludge', '1x mystery', 0x7D4E41, no_decomp);
	compLiquid('fractionated_rare_earth_slurry', '1x mystery', 0x938376, no_decomp);
	compLiquid('low_density_rare_earth_residue', '1x mystery', 0x7A6C57, no_decomp);
	compLiquid('moderate_density_rare_earth_residue', '1x mystery', 0x7A6442, no_decomp);
	compLiquid('high_density_rare_earth_residue', '1x mystery', 0x5A4524, no_decomp);
	compLiquid('rare_earth_waste_residue', '1x mystery', 0x83716F, no_decomp);
	compDust('unrefined_neodymium', ['1x neodymium', '1x mystery'], 0x5E5661, no_decomp);
	compDust('neodymium_iii_oxide', ['2x neodymium', '3x oxygen'], 0x6D6673, no_decomp);
	compDust('unrefined_lanthanum', ['1x lanthanum', '1x mystery'], 0x907B6F, no_decomp);
	compDust('lanthanum_oxide', ['2x lanthanum', '3x oxygen'], 0xB59482, no_decomp);
	compDust('lanthanum_iii_chloride', ['1x lanthanum', '3x chlorine'], 0xBC9F84, no_decomp);
	compDust('unrefined_samarium', ['1x samarium', '1x mystery'], 0x828066, no_decomp);
	compDust('samarium_iii_chloride', ['1x samarium', '3x chlorine'], 0x959374, no_decomp);
	compDust('unrefined_promethium', ['1x promethium', '1x mystery'], 0x7F7184, no_decomp);
	compDust('promethium_iii_oxide', ['2x promethium', '3x oxygen'], 0x8F7F94, no_decomp);
	compDust('unrefined_holmium', ['1x holmium', '1x mystery'], 0x81868C, no_decomp);
	compDust('holmium_iii_fluoride', ['1x holmium', '3x fluorine'], 0x99966E, no_decomp);
	elemIngot('magnetic_holmium', 'holmium', 0xCEC870, MAGNETIC, [], [rod, long_rod, magnetic]);
	compDust('unrefined_yttrium', ['1x yttrium', '1x mystery'], 0x404143, no_decomp);
	compDust('yttrium_carbonate', ['2x yttrium', '3x carbon', '9x oxygen'], 0x48504D, no_decomp);
	compDust('yttrium_chloride', ['1x yttrium', '3x chlorine'], 0x393C3B, no_decomp);
	compDust('unrefined_dysprosium', ['1x dysprosium', '1x mystery'], 0x6B6F73, no_decomp);
	compDust('dysprosium_iii_fluoride', ['1x dysprosium', '3x fluorine'], 0x54585C, no_decomp);

	//Plat Line Extension
	compLiquid('platinum_group_leach_liquor', '1x mystery', 0x6F96A0, no_decomp);
	compLiquid('platinum_group_acid_residue', '1x mystery', 0x555555, no_decomp);
	compDust('platinum_group_leach_residue', '1x mystery', 0x444444, no_decomp);
	compDust('platinum_chloride', ['1x platinum', '6x chlorine'], 0xB4C6CF, no_decomp);
	compDust('palladium_chloride', ['1x palladium', '4x chlorine'], 0xC8A9AD, no_decomp);
	compGem('platinum_salt', ['4x nitrogen', '12x hydrogen', '1x platinum', '6x chlorine'], 0xE3E3CD, RUBY, no_decomp);
	compGem('palladium_salt', ['5x nitrogen', '15x hydrogen','1x palladium', '4x chlorine'], 0xD6B3BB, RUBY, no_decomp);
	compDust('mixed_inert_metal_ash', ['1x rhodium', '1x ruthenium', '1x mystery'], 0x9982A2, no_decomp);
	compLiquid('ruthenium_sulfate', ['1x ruthenium', '6x sulfate'], 0x5CB8F6, no_decomp);
	compLiquid('inert_metal_sulfate_solution', ['1x rhodium_sulfate', '1x ruthenium_sulfate'], 0xA985BF, no_decomp);
	compDust('rhodium_iii_hydroxide', ['1x rhodium', '3x hydroxide'], 0xD174B6, no_decomp);
	compDust('rhodium_iii_oxide', ['2x rhodium', '3x oxygen'], 0xCE498F, no_decomp);
	compDust('ruthenium_complex', ['1x ruthenium', '6x ammonia'], 0x88D2FC, no_decomp);
	compDust('impure_ruthenium', ['1x ruthenium','1x mystery'], 0x63C0F4, no_decomp);
	compLiquid('rarest_metal_slurry', ['1x iridium', '1x osmium', '1x mystery'], 0x3A78B0, no_decomp);
    event.create('sodium_osmate').gem().fluid().components(['2x sodium', '1x osmium', '4x oxygen']).color(0x4F70D9).iconSet(GEM_HORIZONTAL).flags(no_decomp);
	compDust('osmium_iv_hydroxide', ['1x osmium', '4x hydroxide'], 0x4866C9, no_decomp);
	compDust('osmium_dioxide', ['1x osmium', '2x oxygen'], 0x2C49AA, no_decomp);
	compDust('iridium_rich_residue', ['1x iridium', '1x mystery', '1x oxygen'], 0x418875, no_decomp);
	compDust('iridium_iv_chloride', ['1x iridium', '4x chlorine'], 0x46A593, no_decomp);
	compDust('iridium_hydroxide', ['1x iridium', '3x hydroxide'], 0x50B7A4, no_decomp);
	compDust('iridium_oxide', ['1x iridium', '2x oxygen'], 0x3C9D88, no_decomp);

});

GTCEuStartupEvents.materialModification(event => {

    GTMaterials.get('yttrium_carbonate').setFormula('Y2(CO3)3');
    GTMaterials.get('platinum_salt').setFormula('(NH3)4PtCl6');
    GTMaterials.get('palladium_salt').setFormula('(NH3)5PdCl4');
	GTMaterials.get('iridium_rich_residue').setFormula('Ir?Oₓ');

});
	