// priority: 100

global.componentMaterials = {

    luv: {
        tiers: { tier: 'luv', tier1: 'iv', tier2: 'ev' },
        materials: {
            tierMaterial: 'rhodium_plated_palladium',
            primMaterial: 'hsss',
            supMaterial: 'ruridit',
            wireMechanical: 'palladium',
            wireCoil: 'osmiridium',
            tierFluid: '',
            coolant: '',
            solder: 'soldering_alloy',
            lubricant: 'lubricant',
            primRubber: 'styrene_butadiene_rubber',
            supRubber: 'silicone_rubber',
            plastic: 'polytetrafluoroethylene',
            cable: 'niobium_titanium',
            catalyst: '1x gtceu:quantum_star',
            primMagnet: 'samarium',
            supMagnet: '',
            pipeMaterial: 'niobium_titanium',
            miscMaterial: 'rhodium',
            glass: '',
            superconductor: 'indium_tin_barium_titanium_cuprate'
        },
        scaling: {
            scaler: 1,
            EU: GTValues.VA[GTValues.IV]
        },
        researchData: {
            default: { ifDRS: false, cwuD: 0, duraD: 90, EUtD: GTValues.VA[GTValues.EV] },
            special: { ifSRS: false, cwuS: 0, duraS: 60, EUtS: GTValues.VA[GTValues.IV] }
        }
    },

    zpm: {
        tiers: { tier: 'zpm', tier1: 'luv', tier2: 'iv' },
        materials: {
            tierMaterial: 'naquadah_alloy',
            primMaterial: 'naquadah_alloy',
            supMaterial: 'osmiridium',
            wireMechanical: 'europium',
            wireCoil: 'europium',
            tierFluid: '',
            coolant: '',
            solder: 'soldering_alloy',
            lubricant: 'lubricant',
            primRubber: 'styrene_butadiene_rubber',
            supRubber: 'silicone_rubber',
            plastic: 'polybenzimidazole',
            cable: 'vanadium_gallium',
            catalyst: '2x gtceu:quantum_star',
            primMagnet: 'samarium',
            supMagnet: '',
            pipeMaterial: 'polybenzimidazole',
            miscMaterial: 'trinium',
            glass: '',
            superconductor: 'uranium_rhodium_dinaquadide'
        },
        scaling: {
            scaler: 2,
            EU: GTValues.VA[GTValues.LuV]
        },
        researchData: {
            default: { ifDRS: false, cwuD: 0, duraD: 90, EUtD: GTValues.VA[GTValues.IV] },
            special: { ifSRS: true, cwuS: 4, duraS: 90, EUtS: GTValues.VA[GTValues.LuV] }
        }
    },

    uv: {
        tiers: { tier: 'uv', tier1: 'zpm', tier2: 'luv' },
        materials: {
            tierMaterial: 'darmstadtium',
            primMaterial: 'titan_steel',
            supMaterial: 'pure_netherite',
            wireMechanical: 'americium',
            wireCoil: 'tritanium',
            tierFluid: 'naquadria',
            coolant: '',
            solder: 'indium_tin_lead_cadmium_soldering_alloy',
            lubricant: 'lubricant',
            primRubber: 'styrene_butadiene_rubber',
            supRubber: 'styrene_butadiene_rubber',
            plastic: 'polyether_ether_ketone',
            cable: 'yttrium_barium_cuprate',
            catalyst: '1x gtceu:gravi_star',
            primMagnet: 'dysprosium',
            supMagnet: '',
            pipeMaterial: 'naquadah',
            miscMaterial: 'naquadria',
            glass: '',
            superconductor: 'enriched_naquadah_trinium_europium_duranide'
        },
        scaling: {
            scaler: 3,
            EU: GTValues.VA[GTValues.ZPM]
        },
        researchData: {
            default: { ifDRS: true, cwuD: 32, duraD: 180, EUtD: GTValues.VA[GTValues.ZPM] },
            special: { ifSRS: true, cwuS: 48, duraS: 180, EUtS: GTValues.VA[GTValues.UV] }
        }
    },

    uhv: {
        tiers: { tier: 'uhv', tier1: 'uv', tier2: 'zpm' },
        materials: {
            tierMaterial: 'neutronium',
            primMaterial: 'zalloy',
            supMaterial: 'zircalloy_4',
            wireMechanical: 'zirconium',
            wireCoil: 'thorium_plut_duranide_241',
            tierFluid: 'naquadria',
            coolant: 'liquid_helium',
            solder: 'indium_tin_lead_cadmium_soldering_alloy',
            lubricant: 'tungsten_disulfide',
            primRubber: 'perfluoroelastomer_rubber',
            supRubber: 'styrene_butadiene_rubber',
            plastic: 'polyether_ether_ketone',
            cable: 'europium',
            catalyst: '2x gtceu:gravi_star',
            primMagnet: 'dysprosium',
            supMagnet: 'samarium',
            pipeMaterial: 'neutronium',
            miscMaterial: 'neutronium',
            glass: 'gtceu:fusion_glass',
            superconductor: 'ruthenium_trinium_americium_neutronate'
        },
        scaling: {
            scaler: 4,
            EU: GTValues.VA[GTValues.UV]
        },
        researchData: {
            default: { ifDRS: true, cwuD: 128, duraD: 180, EUtD: GTValues.VA[GTValues.UV] },
            special: { ifSRS: true, cwuS: 144, duraS: 180, EUtS: GTValues.VA[GTValues.UV] }
        }
    },

    uev: {
        tiers: { tier: 'uev', tier1: 'uhv', tier2: 'uv' },
        materials: {
            tierMaterial: 'mythrolic_alloy',
            primMaterial: 'starium_alloy',
            supMaterial: 'magmada_alloy',
            wireMechanical: 'adamantine',
            wireCoil: 'aurourium',
            tierFluid: 'isovol',
            coolant: 'superstate_helium_3',
            solder: 'naquadated_soldering_alloy',
            lubricant: 'tungsten_disulfide',
            primRubber: 'perfluoroelastomer_rubber',
            supRubber: 'styrene_butadiene_rubber',
            plastic: 'poly_34_ethylenedioxythiophene_polystyrene_sulfate',
            cable: 'cerium_tritelluride',
            catalyst: '2x kubejs:helish_star',
            primMagnet: 'zapolgium',
            supMagnet: 'dysprosium',
            pipeMaterial: 'mythrolic_alloy',
            miscMaterial: 'mythrolic_alloy',
            glass: 'gtceu:fusion_glass',
            superconductor: 'seaborgium_palladium_enriched_estalt_flerovium_alloy'
        },
        scaling: {
            scaler: 5,
            EU: GTValues.VA[GTValues.UHV]
        },
        researchData: {
            default: { ifDRS: true, cwuD: 160, duraD: 180, EUtD: GTValues.VA[GTValues.UHV] },
            special: { ifSRS: true, cwuS: 176, duraS: 180, EUtS: GTValues.VA[GTValues.UHV] }
        }
    },

    uiv: {
        tiers: { tier: 'uiv', tier1: 'uev', tier2: 'uhv' },
        materials: {
            tierMaterial: 'chaotixic_alloy',
            primMaterial: 'ohmderblux_alloy',
            supMaterial: 'abyssal_alloy',
            wireMechanical: 'xeproda',
            wireCoil: 'magmada_alloy',
            tierFluid: 'calamatium',
            coolant: 'superstate_helium_3',
            solder: 'naquadated_soldering_alloy',
            lubricant: 'tungsten_disulfide',
            primRubber: 'perfluoroelastomer_rubber',
            supRubber: 'perfluoroelastomer_rubber',
            plastic: 'poly_34_ethylenedioxythiophene_polystyrene_sulfate',
            cable: 'polonium_bismide',
            catalyst: '1x kubejs:dragonic_eye',
            primMagnet: 'zapolgium',
            supMagnet: 'dysprosium',
            pipeMaterial: 'chaotixic_alloy',
            miscMaterial: 'chaotixic_alloy',
            glass: 'kubejs:draco_resilient_fusion_glass',
            superconductor: 'rhenium_super_composite_alloy'
        },
            scaling: {
            scaler: 6,
            EU: GTValues.VA[GTValues.UEV]
        },
        researchData: {
            default: { ifDRS: true, cwuD: 192, duraD: 180, EUtD: GTValues.VA[GTValues.UEV] },
            special: { ifSRS: true, cwuS: 208, duraS: 180, EUtS: GTValues.VA[GTValues.UEV] }
        }
    }

}
