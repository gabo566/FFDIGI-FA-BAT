(() => {
  "use strict";

  const cbcReferences = [
    {
      src: "./assets/reference-images/l11/l11-cbc-fru-eeprom-locations-p79.png",
      alt: "CBC FRU EEPROM locations by cartridge and slot across compute and switch trays.",
      caption: "CBC FRU EEPROM locations by cartridge and slot",
      sourcePage: 79,
      instructions: "The appendix identifies positions from the rack cold aisle and notes that EEPROM access depends on the tray design."
    },
    {
      src: "./assets/reference-images/l11/l11-slot-index-map-p80.png",
      alt: "Table mapping cartridge physical slot to type, slot number, topology ID and tray index.",
      caption: "Physical slot and tray index mapping",
      sourcePage: 80,
      instructions: "Appendix table for comparing Compute and Switch physical slots with Tray_index values."
    }
  ];
  const p74FlowchartReference = [{
    src: "./assets/flowcharts/l11/l11-flow-p74-400dpi.png",
    alt: "High-resolution source flowchart for AC cycle, retest, tray replacement and continue test flow.",
    caption: "Source FA flowchart · AC cycle and tray retest",
    sourcePage: 74,
    instructions: "Source flowchart reproduced from the supplied PDF without changing its steps or branches."
  }];

  window.FFDG_L11_REFERENCE_IMAGES = Object.freeze({
    "fa-p13": cbcReferences,
    "fa-p14": cbcReferences,
    "fa-p16": cbcReferences,
    "fa-p74": p74FlowchartReference
  });
})();
