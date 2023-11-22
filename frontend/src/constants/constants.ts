export enum EnergyLevels {
  HIGH_ENERGY_UNPLEASANT = "HIGH_ENERGY_UNPLEASANT",
  HIGH_ENERGY_PLEASANT = "HIGH_ENERGY_PLEASANT",
  LOW_ENERGY_UNPLEASANT = "LOW_ENERGY_UNPLEASANT",
  LOW_ENERGY_PLEASANT = "LOW_ENERGY_PLEASANT",
}

export const EnergyLevelsMap: Record<EnergyLevels, string> = {
  HIGH_ENERGY_UNPLEASANT: "highEnergyUnpleasant",
  HIGH_ENERGY_PLEASANT: "highEnergyPleasant",
  LOW_ENERGY_UNPLEASANT: "lowEnergyUnpleasant",
  LOW_ENERGY_PLEASANT: "lowEnergyPleasant",
};
