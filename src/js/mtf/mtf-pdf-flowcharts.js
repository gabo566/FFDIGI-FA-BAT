(() => {
  "use strict";

  const PAGE_FLOWCHARTS = {
    "18": {"p":18,"n":[[273.9,115.9,"Check interposer state Display all HGXs","a"],[319.4,190.8,"Install Golden Interposer","a"],[225.9,257.5,"Replace Interposer","a"],[353.6,332.4,"Re-seat all HMC and BMC cables","a"],[384.1,407.1,"Replace BMC","a"],[421.9,473.9,"Replace HMC","a"],[235.5,540.5,"Continue to Next Station","a"],[442.8,540.5,"Move to Secondary-Level FA","a"]],"e":[[0,6,"All HGXs detected"],[0,1,"HGX missing"],[1,2,"All HGXs detected"],[1,3,"HGX still missing"],[2,6,"Pass"],[2,3,"Fail"],[3,6,"Pass"],[3,4,"Fail"],[4,6,"Pass"],[4,5,"Fail"],[5,6,"Pass"],[5,7,"Fail"]]},
    "20": {"p":20,"n":[[237.4,115.8,"AC cycle","a"],[326.2,218.5,"Re-seat and inspect the BMC board, HMC board, and all associated cables","a"],[364.4,332.3,"Replace the HMC board","a"],[412.3,446.2,"Replace the BMC board","a"],[190.4,560,"Continue Testing","a"],[440.9,560,"Move to Secondary-Level FA","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "22": {"p":22,"n":[[420.8,108.6,"AC cycle Run run_cable_check","a"],[368.7,170.9,"Re-seat or replace the associated cables Use the cable debug guide","a"],[283,233.1,"Re-seat and inspect BF3, BF3 riser, and associated cables","a"],[234.5,295.4,"Re-seat the IPEX board and associated cables","a"],[212.6,351.5,"Replace BF3","a"],[173.4,401.6,"Replace the IPEX board","a"],[413.5,524.1,"Re-run diagnostics up to and including the failing station","d"],[173.3,646.7,"Continue Testing","a"],[420.8,646.7,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,"Fail"],[3,4,"Fail"],[4,5,"Fail"],[5,8,"Fail"],[0,6,"Pass"],[1,6,"Pass"],[2,6,"Pass"],[3,6,"Pass"],[4,6,"Pass"],[5,6,"Pass"],[6,7,"Pass"],[6,8,"Fail"]]},
    "24": {"p":24,"n":[[237.2,113.2,"AC Cycle","a"],[293.3,196.3,"Update Bianca_1 FPGA","a"],[338.2,289.8,"Reseat or replace B2B cable","a"],[393,383.1,"Replace Bianca_1","a"],[180.1,466.4,"Continue testing","a"],[419,466.4,"Move to Secondary-Level FA","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "25": {"p":25,"n":[[467.3,388.2,"Continue to Next Station","a"],[239.9,403.8,"Retest up to two times","a"],[126.3,403.9,"Reseat in the same MTF slot","a"],[467.3,419.4,"Move to Secondary-Level FA","a"]],"e":[[2,1,""],[1,0,"Pass"],[1,3,"Fail after two attempts"]]},
    "26": {"p":26,"n":[[454.6,417.6,"Continue Testing","a"],[123.9,436.1,"Reseat in MTF","a"],[259.1,436.1,"Retest up to two times","d"],[454.5,454.4,"Move to Secondary-Level FA","a"]],"e":[[1,2,""],[2,0,"Pass"],[2,3,"Fail"]]},
    "28": {"p":28,"n":[[236.8,112.4,"AC cycle Run run_cable_check script","a"],[260.7,185.2,"Re-seat the Clink cable","a"],[284.6,258.1,"Re-seat the B2B cable","a"],[350.1,338.1,"Verify the BF3 power path Re-seat BF3 riser and power cables Check J6 voltage and replace PDB if needed","a"],[350.1,418.1,"Inspect and re-seat the PDB sideband cable","a"],[378.2,491,"Replace the BMC hardware","a"],[413.8,563.9,"Replace the Bianca board(s)","a"],[220.5,636.8,"Continue Testing","a"],[432,636.8,"Move to Secondary-Level FA","a"]],"e":[[0,7,"Pass"],[0,1,"Fail"],[1,7,"Pass"],[1,2,"Fail"],[2,7,"Pass"],[2,3,"Fail"],[3,4,"Power confirmed"],[4,7,"Pass"],[4,5,"Fail"],[5,7,"Pass"],[5,6,"Fail"],[6,7,"Pass"],[6,8,"Fail"]]},
    "29": {"p":29,"n":[[470.6,405.3,"Continue Testing","a"],[103.8,412.7,"AC Cycle","a"],[201.4,426.1,"Reseat HMC, BMC, and connections","a"],[326.8,439.4,"Replace HMC board","a"],[470.6,451.2,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "30": {"p":30,"n":[[465.3,377.1,"Continue Testing","a"],[149.3,393.2,"Inspect and reseat C-Link , B2B cables, and connectors","a"],[304.7,407.6,"Inspect Bianca boards;","a"],[465.3,420.4,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "32": {"p":32,"n":[[321.1,118.5,"Reseat in same MTF slot","a"],[321,246.2,"Retest Up to two times","d"],[250.6,465.9,"Re-run diagnostics up to and including the failing station","d"],[227.9,630.6,"Continue Testing","a"],[392.4,630.6,"Move to Secondary-Level FA","a"]],"e":[[0,1,""],[1,2,"Pass"],[1,4,"Still fails"],[2,3,"Pass"],[2,4,"Fail"]]},
    "33": {"p":33,"n":[[479.5,400.8,"Continue Testing","a"],[121,407.2,"Reseat PDB J15 to Bianca_0 JSB2 cable","a"],[234.6,418.7,"Inspect BMC interposer; replace if needed","a"],[352.9,432.7,"Replace PDB J15 to Bianca_0 JSB2 cable","a"],[479.6,442.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "35": {"p":35,"n":[[194.9,102.3,"AC cycle","a"],[240.7,158.2,"Confirm the correct E1.S backplane version and BMC NVPN","a"],[274.4,220.1,"Re-seat E1.S backplane MCIO cables","a"],[308.2,282,"Re-seat E1.S backplane power cables","a"],[348.2,343.8,"Inspect the bottom-left corner of Bianca for physical damage","a"],[393.6,405.7,"Offline flash IPEX and E1.S CPLDs using the Lattice dongle","a"],[437.8,467.6,"Confirm the correct BMC firmware Reinstall it if incorrect","a"],[469.8,523.4,"Replace the BMC","a"],[184.8,579.2,"Continue to Next Station","a"],[485.4,579.2,"Move to Secondary-Level FA","a"]],"e":[[0,8,"Pass"],[0,1,"Fail"],[1,8,"Pass"],[1,2,"Fail"],[2,8,"Pass"],[2,3,"Fail"],[3,8,"Pass"],[3,4,"Fail"],[4,8,"Pass"],[4,5,"Fail"],[5,8,"Pass"],[5,6,"Fail"],[6,8,"Pass"],[6,7,"Fail"],[7,8,"Pass"],[7,9,"Fail"]]},
    "37": {"p":37,"n":[[297.8,391.2,"Check BMC and HMC build","a"],[390.5,493.4,"Replace device reporting prod-platform","a"],[176.6,595.7,"Continue to Next Station","a"],[418.9,595.7,"Move to Secondary-Level FA","a"]],"e":[[0,2,"dev-platform"],[0,1,"prod-platform"],[1,2,"Pass"],[1,3,"Fail"]]},
    "39": {"p":39,"n":[[450.9,106.4,"AC cycle Run the run_cable_check script","a"],[416.6,156.9,"Reseat Clink and B2B cable","a"],[364.9,202.1,"Reseat J15 PDB to Bianca Cable","a"],[291.6,247.2,"Reseat PDB Board and cables","a"],[247.6,292.2,"Reseat BMC Hardware and cables","a"],[225.2,337.4,"Re-flash SBIOS","a"],[191.3,382.5,"Replace the BMC hardware","a"],[151.8,427.5,"Replace the Bianca board(s)","a"],[444.2,537.9,"Re-run diagnostics up to and including the failing station","d"],[151.8,648.2,"Continue Testing","a"],[450.9,648.2,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,"Fail"],[3,4,"Fail"],[4,5,"Fail"],[5,6,"Fail"],[6,7,"Fail"],[7,10,"Fail"],[0,8,"Pass"],[1,8,"Pass"],[2,8,"Pass"],[3,8,"Pass"],[4,8,"Pass"],[5,8,"Pass"],[6,8,"Pass"],[7,8,"Pass"],[8,9,"Pass"],[8,10,"Fail"]]},
    "41": {"p":41,"n":[[267.8,99.8,"AC cycle Run run_cable_check script","a"],[288.3,133.6,"Re-flash FPGA firmware","a"],[319.4,212.8,"Check for 12V short Check 12V_main short to ground","d"],[284.2,295.6,"Identify and replace relevant components","a"],[339,333.1,"Inspect/re-seat/replace PDB sideband cable","a"],[366.8,409.1,"Use Golden PDB to confirm run power can be turned on","d"],[344.2,481.4,"Replace PDB","a"],[389,511.6,"Replace Bianca board","a"],[280.1,582.2,"Re-run diags up to and including the failing station","d"],[227.6,653,"Continue to Next Station","a"],[307.8,653,"Move to Secondary-Level FA","a"]],"e":[[0,8,"Pass"],[0,1,"Fail"],[1,8,"Pass"],[1,2,"Fail"],[2,3,"Found"],[2,4,"Not found"],[3,8,"Pass"],[3,4,"Fail"],[4,8,"Pass"],[4,5,"Fail"],[5,6,"Run power on"],[5,7,"Run power off"],[6,8,"Pass"],[6,7,"Fail"],[7,8,"Pass"],[8,9,"Pass"],[8,10,"Fail"]]},
    "42": {"p":42,"n":[[238,387.3,"Replace HMC","a"],[486.4,387.3,"Move to Secondary-Level FA","a"],[161.1,405.6,"Re-seat HMC","a"],[96.3,425,"AC cycle","a"],[350.6,453.4,"Re-run diagnostics up to and including the failing station","d"],[486.4,470.5,"Continue to Next Station","a"]],"e":[[3,2,"Fail"],[2,0,"Fail"],[0,1,"Fail"],[3,4,"Pass"],[2,4,"Pass"],[0,4,"Pass"],[4,1,"Fail"],[4,5,"Pass"]]},
    "43": {"p":43,"n":[[428.9,364.2,"Continue Testing","a"],[176.7,388.2,"Replace CX8 with PN 900-9X86E-00CX-SP0","a"],[428.9,412.2,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "44": {"p":44,"n":[[431.5,363.7,"Continue Testing","a"],[179.9,387.1,"Reprogram the CX7 FRU ID","a"],[431.5,410.6,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "46": {"p":46,"n":[[298.1,97.3,"Inspect tray NVLink RAF connectors","a"],[298.1,167.4,"RAF connector issue found?","d"],[335.4,249.9,"Move tray to a different MTF slot and retest","a"],[225.6,292.2,"Replace suspect Bianca(s)","a"],[345.9,292.2,"Inspect NVLink loopback CBC in the MTF slot","a"],[345.9,351.6,"CBC issue found?","d"],[300.2,419.2,"Remove MTF slot from usage until CBC is replaced","a"],[391.6,419.2,"Continue using MTF slot","a"],[300.2,467.4,"Outcome?","d"],[263.5,568.8,"Re-run diagnostics up to and including the failing station","d"],[252.8,651.8,"Continue Testing","a"],[337.8,651.8,"Move to Secondary-Level FA","a"]],"e":[[0,1,""],[1,3,"Yes"],[1,2,"No"],[2,3,"Fail"],[2,4,"Pass"],[4,5,""],[5,6,"Yes"],[5,7,"No"],[3,8,""],[6,8,""],[7,8,""],[8,9,"Pass"],[8,11,"Fail"],[9,10,"Pass"],[9,11,"Fail"]]},
    "48": {"p":48,"n":[[313.9,109.8,"Identify suspect Bianca","a"],[313.9,164.8,"Remove coldplate and CX8","a"],[313.9,219.7,"Inspect Mirror Mez connectors","a"],[395.5,292.4,"Inspect entire CX8 and Bianca","a"],[241,365,"Replace CX8 and/or Bianca","a"],[313.9,420,"Reassemble tray Run BAT and check lspci","a"],[313.9,520.9,"lspci failure?","d"],[213.2,639.4,"Move to Secondary-Level FA","a"],[414.5,639.4,"Continue to Next Station","a"]],"e":[[0,1,""],[1,2,""],[2,4,"Damage found"],[2,3,"No damage"],[3,4,"Damage found"],[3,5,"No damage"],[4,5,""],[5,6,""],[6,7,"Yes"],[6,8,"No"]]},
    "50": {"p":50,"n":[[454.6,121.8,"Continue to Next Station","a"],[136.2,153.4,"Reseat in the same MTF slot","a"],[272.6,153.5,"Failure persists?","d"],[454.6,185.2,"Move to Secondary-Level FA","a"]],"e":[[1,2,""],[2,0,"No"],[2,3,"Yes"]]},
    "51": {"p":51,"n":[[455.6,379.9,"Continue Testing","a"],[109.9,398,"AC Cycle","a"],[255.4,414.2,"Reseat the 1Gb NIC and HMC","a"],[455.7,428.6,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "53": {"p":53,"n":[[255.2,114.4,"AC cycle","a"],[335.5,212.1,"Remove the CX8 board and inspect the connector pins","a"],[335.5,299.2,"Inspect the Bianca and CX8 boards","a"],[335.5,407.5,"Replace the CX8 board","a"],[383.4,515.8,"Replace the Bianca board","a"],[190.1,624.2,"Continue Testing","a"],[410.6,624.2,"Move to Secondary-Level FA","a"]],"e":[[0,5,"Pass"],[0,1,"Fail"],[1,2,""],[2,3,""],[3,5,"Pass"],[3,4,"Fail"],[4,5,"Pass"],[4,6,"Fail"]]},
    "57": {"p":57,"n":[[303.2,118.3,"Identify suspect Bianca","a"],[303.2,190.4,"Inspect leak sensors for damage Check for shorts using DMM","a"],[303.2,321,"Damage or short found?","d"],[237.9,469.1,"Replace affected leak sensor","a"],[368.6,469.1,"Replace suspect Bianca","a"],[303.2,541.2,"Reassemble system Run BAT","a"],[239.9,630.8,"Continue to Next Station","a"],[366.5,630.8,"Move to secondary-Level FA","a"]],"e":[[0,1,""],[1,2,""],[2,3,"Yes"],[3,5,""],[2,4,"No"],[4,5,""],[5,6,"Pass"],[5,7,"Fail"]]},
    "58": {"p":58,"n":[[445.1,383,"Continue Testing","a"],[114.4,403.4,"AC Cycle","a"],[248.8,425.6,"Verify right BF3 PN; replace if incorrect","a"],[445.1,441.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "60": {"p":60,"n":[[301.4,118.6,"Confirm chassis SN and affected CX7","a"],[301.4,191.2,"Read CX7 MAC addresses from FRU EEPROM","a"],[301.4,263.9,"Compare SFC and FRU MAC addresses","a"],[301.4,393.2,"MAC addresses different?","d"],[252.8,540.2,"Correct CX7 MAC addresses in SFC","a"],[230,630.5,"Continue Testing","a"],[372.9,630.5,"Move to Secondary-Level FA","a"]],"e":[[0,1,""],[1,2,""],[2,3,""],[3,4,"Yes"],[3,6,"No"],[4,5,"Pass"],[4,6,"Fail"]]},
    "61": {"p":61,"n":[[486.3,387.2,"Continue Testing","a"],[139.2,398.6,"Move tray to a known-good MTF slot","a"],[253.2,408.8,"Inspect suspect NVLink connector","a"],[361.1,408.8,"Replace suspect Bianca regardless of inspection result","a"],[486.4,417.8,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,3,""],[3,0,"Pass"],[3,4,"Fail"]]},
    "63": {"p":63,"n":[[298.7,167.7,"Bad/unsupported EEPROM?","d"],[217.7,343.6,"Check OSFP loopout cables","a"],[379.7,343.6,"Check internal OSFP sideband cable","a"],[298.7,439,"Inspect OSFP UltraPass cables Replace damaged parts if found Reattach if no damage","a"],[298.8,523.9,"Execute BAT script","a"],[185.8,608.8,"Continue to Next Station","a"],[411.6,608.8,"Move to Secondary-Level FA","a"]],"e":[[0,1,"No"],[0,2,"Yes"],[1,3,""],[2,3,""],[3,4,""],[4,5,"Pass"],[4,6,"Fail"]]},
    "64": {"p":64,"n":[[344.3,487.4,"Replace damaged parts","a"],[499.1,487.4,"Continue to Next Station","a"],[99.8,503.4,"Move to repair area","a"],[175.2,503.4,"Inspect OSFP UltraPass cables connected to CX8","a"],[259.2,503.4,"Damage found?","d"],[412.3,503.4,"Execute BAT","a"],[344.3,519.5,"Reassemble and reattach cables","a"],[499.1,519.5,"Move to Secondary-Level FA","a"]],"e":[[2,3,""],[3,4,""],[4,0,"Yes"],[0,5,""],[4,6,"No"],[6,5,""],[5,1,"Pass"],[5,7,"Fail"]]},
    "65": {"p":65,"n":[[185,409.5,"Re-seat or replace TPM","a"],[488.1,418.4,"Move to Secondary-Level FA","a"],[102.7,425.7,"AC cycle","a"],[329,504.4,"Re-run diagnostics up to and including the failing station","d"],[488.1,516.2,"Continue to Next Station","a"]],"e":[[2,0,"Fail"],[0,1,"Fail"],[2,3,"Pass"],[0,3,"Pass"],[3,4,"Pass"],[3,1,"Fail"]]},
    "68": {"p":68,"n":[[200.6,104.6,"Inspect fan cable connections Re-seat or replace fan cables","a"],[494.6,112.3,"Move to Secondary-Level FA","a"],[99.2,118.7,"AC cycle","a"],[355.9,187.2,"Re-run diagnostics up to and including the failing station","d"],[494.6,197.4,"Continue to Next Station","a"]],"e":[[2,0,"Fail"],[0,1,"Fail"],[2,3,"Pass"],[0,3,"Pass"],[3,4,"Pass"],[3,1,"Fail"]]},
    "69": {"p":69,"n":[[479.4,417.1,"Continue Testing","a"],[115.6,423.6,"Reseat ConnectX, OSFP, and cables","a"],[232.4,435.1,"Inspect Bianca; replace pad/cable as needed","a"],[355.9,446.8,"Replace left Bianca","a"],[479.4,456.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "71": {"p":71,"n":[[238.9,127.3,"AC cycle Run diagnostics starting at FLA","a"],[301.7,242.2,"Re-seat the BMC, HMC, and associated cables","a"],[351.6,345.9,"Replace the HMC","a"],[411.1,438.2,"Replace the BMC","a"],[191.6,541.9,"Continue Testing","a"],[440,541.9,"Move to Secondary-Level FA","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "72": {"p":72,"n":[[423.8,365.4,"Continue Testing","a"],[170.7,390.5,"Update the M.2 OS to the expected version","a"],[423.8,415.6,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "73": {"p":73,"n":[[461,402.8,"Continue Testing","a"],[151.9,419.8,"Verify BMC module firmware","a"],[302.8,434.9,"Replace the BMC","a"],[460.9,448.4,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "76": {"p":76,"n":[[274.4,121.5,"AC cycle Run run_cable_check script","a"],[207.1,220.1,"Inspect cables, connectors, and leak sensors","a"],[374.7,423.9,"Re-run diagnostics up to and including the failing station","d"],[223.4,627.7,"Move to Secondary-Level FA","a"],[399.5,627.7,"Continue to Next Station","a"]],"e":[[0,1,"Fail"],[0,2,"Pass"],[1,2,"Pass"],[1,3,"Fail"],[2,3,"Fail"],[2,4,"Pass"]]},
    "78": {"p":78,"n":[[329.8,150.9,"Identify device and tray side","a"],[329.8,228.2,"Failed device?","d"],[222.3,317.3,"CX7/CX8: Reseat OSFP and UltraPass connections","a"],[444.9,317.3,"BF3: Reseat QSFP cable","a"],[176.4,377.6,"Reseat associated Bianca board","a"],[288.3,377.6,"Continue Testing","a"],[395.8,377.6,"Replace affected BF3","a"],[494,377.6,"Continue Testing","a"],[119.8,437.9,"Continue Testing","a"],[233.1,437.9,"Move to Secondary-Level FA","a"],[349.9,437.9,"Reseat associated Bianca board","a"],[441.7,437.9,"Continue Testing","a"],[293.3,492.4,"Continue Testing","a"],[406.6,492.4,"Move to Secondary-Level FA","a"]],"e":[[0,1,""],[1,2,"CX7/CX8"],[2,5,"Pass"],[2,4,"Fail"],[4,8,"Pass"],[4,9,"Fail"],[1,3,"BF3"],[3,7,"Pass"],[3,6,"Fail"],[6,11,"Pass"],[6,10,"Fail"],[10,12,"Pass"],[10,13,"Fail"]]},
    "80": {"p":80,"n":[[232,114.8,"Re-seat the tray","a"],[280.2,214.1,"Move the tray to a different MTF slot","a"],[348.5,324.2,"Inspect the white component between the NVLinks","a"],[416.5,423.5,"Validate the CBC FRUs","a"],[186.6,522.8,"Continue Testing","a"],[444.2,522.8,"Move to Secondary-Level FA","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "81": {"p":81,"n":[[432.4,404.2,"Continue to Next Station","a"],[180.9,427.5,"Reseat in the same MTF slot","a"],[432.4,450.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "82": {"p":82,"n":[[465.9,413.1,"Continue to Next Station","a"],[136.2,429.1,"Check Host RJ45 cable Ensure it is secured","a"],[284.5,429.1,"Retest FCT in the same MTF slot Up to 3 times","a"],[465.9,444.9,"Move to Secondary-Level FA","a"]],"e":[[1,2,""],[2,0,"Pass"],[2,3,"Fail"]]},
    "83": {"p":83,"n":[[488.6,393.1,"Continue Testing","a"],[102.4,413.5,"AC cycle","a"],[213.5,429.5,"Identify the reported boards with an issue from the error description","a"],[358.3,429.5,"Inspect and re-seat the cable assemblies for the suspect boards","a"],[488.6,441.2,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,3,""],[3,0,"Pass"],[3,4,"Fail"]]},
    "84": {"p":84,"n":[[407.7,426,"Continue to Next Station","a"],[151.5,454.6,"Re-seat in the same MTF slot","a"],[407.7,483.1,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "86": {"p":86,"n":[[270.2,106.6,"AC cycle in the same MTF slot","a"],[296.3,157.8,"Inspect for damage","a"],[338.2,203.4,"Change MTF location","a"],[338.2,303,"Did the failure move with the compute tray?","d"],[277.4,408.2,"Replace the Bianca board causing the failure","a"],[399.1,408.2,"Replace the loopback cable in the original MTF location","a"],[235.4,525.3,"Re-run diagnostics up to and including the failing station","d"],[194.9,642.5,"Continue to Next Station","a"],[275.9,642.5,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,""],[3,4,"Yes"],[3,5,"No"],[0,6,"Pass"],[1,6,"Pass"],[4,6,"Pass"],[5,6,"Pass"],[6,7,"Pass"],[6,8,"Fail"]]},
    "90": {"p":90,"n":[[224.6,106.7,"AC Cycle","a"],[255,177.8,"Re-seat OSFP loopback cable","a"],[294,256.5,"Verify BF3 power and riser connections","a"],[331,335.2,"Verify and configure both BF3 devices","a"],[368.9,413.9,"Update Ubuntu on both BF3 devices","a"],[396.6,492.7,"Verify rshim0 and rshim1","a"],[431.1,563.7,"Replace BF3","a"],[206.9,634.7,"Continue Testing","a"],[450.9,634.7,"Move to Secondary-Level FA","a"]],"e":[[0,7,"Pass"],[0,1,"Fail"],[1,7,"Pass"],[1,2,"Fail"],[2,7,"Pass"],[2,3,"Fail"],[3,7,"Pass"],[3,4,"Fail"],[4,7,"Pass"],[4,5,"Fail"],[5,7,"Pass"],[5,6,"Fail"],[6,7,"Pass Fail"],[6,8,""]]},
    "92": {"p":92,"n":[[241,126,"Move to a different MTF slot Use different OSFP loopback cables","a"],[309.8,237.6,"Reseat the UltraPass cables for the affected port","a"],[381.9,349.1,"Replace the OSFP board for the affected port","a"],[157.4,449.6,"Continue Testing","a"],[409.9,449.6,"Move to Secondary-Level FA","a"]],"e":[[0,3,"Pass"],[0,1,"Fail"],[1,3,"Pass"],[1,2,"Fail"],[2,3,"Pass"],[2,4,"Fail"]]},
    "94": {"p":94,"n":[[391.8,104.5,"AC cycle","a"],[350.1,167.4,"Re-seat CX7 I/O board end of OSFP sideband cable","a"],[310.7,237.2,"Re-seat OSFP board end of sideband cable","a"],[264.7,307,"Replace OSFP sideband cable","a"],[179.6,369.9,"Replace OSFP module","a"],[368.1,507.3,"Re-run diagnostics up to and including the failing station","d"],[179.6,644.7,"Continue to Next Station","a"],[368,644.7,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,"Fail"],[3,4,"Fail"],[4,7,"Fail"],[0,5,"Pass"],[1,5,"Pass"],[2,5,"Pass"],[3,5,"Pass"],[4,5,"Pass"],[5,6,""],[5,7,"Fail"]]},
    "97": {"p":97,"n":[[378.2,103.1,"AC cycle Run run_cable_check script","a"],[360.1,149.9,"Re-seat OSFP loopback cable","a"],[333.2,192.1,"Inspect AC capacitors","a"],[333.2,249.9,"Damage found?","d"],[289.5,321.5,"Replace affected Bianca board","a"],[260.8,368.3,"Re-seat Ultrapass connector","a"],[232.8,415.1,"Replace OSFP module and Ultrapass cable assembly","a"],[205.6,457.3,"Replace CX7 module","a"],[383.3,549.4,"Re-run diagnostics up to and including the failing station","d"],[205.6,646,"Continue to Next Station","a"],[378.2,646,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,""],[3,4,"Yes"],[3,5,"No"],[4,5,"Fail"],[5,6,"Fail"],[6,7,"Fail"],[7,10,"Fail"],[0,8,"Pass"],[1,8,"Pass"],[4,8,"Pass"],[5,8,"Pass"],[6,8,"Pass"],[7,8,"Pass"],[8,9,"Pass"],[8,10,"Fail"]]},
    "98": {"p":98,"n":[[446.6,398.7,"Continue Testing","a"],[113.8,418.7,"AC Cycle","a"],[249.8,436.7,"Reflash M.2 and BF3","a"],[446.6,452.6,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "101": {"p":101,"n":[[235.3,110.9,"AC cycle Run the BAT script","a"],[272.5,172.9,"Reset the BF3 settings","a"],[272.5,264.6,"Run diagnostics starting at FLA","d"],[314.9,376.6,"Check BF3 power-cable and network-cable connections","a"],[342.6,445.4,"Re-seat the PCIe riser cable","a"],[373.2,514.1,"Check the BF3 MAC address","a"],[407.8,576.2,"Replace the BF3","a"],[225.3,638.2,"Continue to Next Station","a"],[425,638.2,"Move to Secondary-Level FA","a"]],"e":[[0,7,"Pass"],[0,1,"Fail"],[1,2,""],[2,7,"Pass"],[2,3,"Fail"],[3,7,"Pass"],[3,4,"Fail"],[4,7,"Pass"],[4,5,"Fail"],[5,7,"Pass"],[5,6,"Fail"],[6,7,"Pass"],[6,8,"Fail"]]},
    "102": {"p":102,"n":[[445,440,"Continue Testing","a"],[114.5,460.4,"AC Cycle","a"],[248.7,482.6,"Inspect and replace TIM, rebake","a"],[445.1,498.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "104": {"p":104,"n":[[197.1,107.7,"AC cycle","a"],[271.9,181.9,"Inspect and re-seat the OSFP loopback cable and both ends of the OSFP sideband cable","a"],[330.1,264.2,"Re-seat the UltraPass connectors and cable assembly","a"],[367.2,346.5,"Replace the OSFP sideband cable","a"],[409.5,428.8,"Replace the UltraPass cable assembly","a"],[447.2,511.1,"Replace the OSFP module","a"],[189.7,593.4,"Continue Testing","a"],[467.9,593.4,"Move to Secondary-Level FA","a"]],"e":[[0,6,"Pass"],[0,1,"Fail"],[1,6,"Pass"],[1,2,"Fail"],[2,6,"Pass"],[2,3,"Fail"],[3,6,"Pass"],[3,4,"Fail"],[4,6,"Pass"],[4,5,"Fail"],[5,6,"Pass"],[5,7,"Fail"]]},
    "106": {"p":106,"n":[[243.2,116.8,"AC cycle","a"],[290.8,223.1,"Re-seat the M.2 and M.2 riser","a"],[349.3,329.4,"Replace the M.2 riser","a"],[407.8,424.1,"Replace the M.2","a"],[437.4,530.4,"Move to Secondary-Level FA","a"],[194.6,530.5,"Continue Testing","a"]],"e":[[0,5,"Pass"],[0,1,"Fail"],[1,5,"Pass"],[1,2,"Fail"],[2,5,"Pass"],[2,3,"Fail"],[3,5,"Pass"],[3,4,"Fail"]]},
    "108": {"p":108,"n":[[400.9,104.7,"AC cycle","a"],[361.8,168.6,"Confirm the correct E1.S backplane is in use","a"],[298.6,239.3,"Check cables connected to the E1.S backplanes","a"],[242,310,"Replace the E1.S backplane","a"],[194.7,373.9,"Replace the failing device","a"],[403.1,502.2,"Run diagnostics through the failing station","d"],[194.7,637.5,"Continue to Next Station","a"],[400.9,637.5,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,"Fail"],[3,4,"Fail"],[4,7,"Fail"],[0,5,"Pass"],[1,5,"Pass"],[2,5,"Pass"],[3,5,"Pass"],[4,5,"Pass"],[5,6,""],[5,7,"Fail"]]},
    "111": {"p":111,"n":[[232.9,112.2,"AC Cycle","a"],[286.3,192.9,"Reseat OSFP loopback","a"],[329,283.3,"Reseat Ultrapass connector","a"],[397.6,383.5,"Replace OSFP module and Ultrapass cable assembly","a"],[176.7,473.9,"Continue Testing","a"],[422.9,473.9,"Move to Secondary-Level FA","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "113": {"p":113,"n":[[337.2,109.4,"AC cycle","a"],[302.8,190,"Re-seat OSFP loopback cable","a"],[206.8,270.6,"Replace BlueField3","a"],[354.1,446.4,"Re-run diagnostics up to and including the failing station","d"],[206.8,630.9,"Continue to Next Station","a"],[354.1,630.9,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,5,"Fail"],[0,3,"Pass"],[1,3,"Pass"],[2,3,"Pass"],[3,4,"Pass"],[3,5,"Fail"]]},
    "115": {"p":115,"n":[[236.1,113.7,"AC cycle","a"],[304,209.1,"Inspect the PDB, PDB cables, and Biancas","a"],[347,304.6,"Reseat the PDB","a"],[401.1,389.6,"Replace the PDB","a"],[182.3,474.7,"Continue Testing","a"],[427.7,474.7,"Move to Second-Level FA","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "116": {"p":116,"n":[[266.4,523.6,"Review diagnostic logs","a"],[444.6,523.6,"Move to Secondary-Level FA","a"],[114.6,544.1,"AC Cycle","a"],[266.4,564.8,"Continue Testing","a"]],"e":[[2,3,"Pass"],[2,0,"Fail"],[0,1,""]]},
    "118": {"p":118,"n":[[269.7,125.8,"AC cycle Run BAT script and diagnostics starting at FLA","a"],[336.6,236.3,"Re-seat the affected Bianca and all associated cables","a"],[413.9,346.9,"Replace the affected Bianca based on the PCIe direction","a"],[441.7,457.4,"Move to Secondary-Level FA","a"],[203.1,457.5,"Continue Testing","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"]]},
    "120": {"p":120,"n":[[304.4,114.8,"Visually inspect the coldplate sensors for damage","a"],[304.4,178.8,"Remove and inspect the cold plate","a"],[304.4,242.9,"Clean the mating surfaces and reapply TIM","a"],[304.4,307,"Perform TIM baking using the liquid heating method SOP","a"],[304.4,462.9,"Run diagnostics starting at FLA through the failing station","d"],[247.6,634.4,"Continue to Next Station","a"],[361.2,634.4,"Move to Secondary-Level FA","a"]],"e":[[0,1,""],[1,2,""],[2,3,""],[3,4,""],[4,5,"Pass"],[4,6,"Fail"]]},
    "121": {"p":121,"n":[[496.4,672.2,"Continue Testing","a"],[143.8,687,"Identify the affected Bianca and validate the temperature sensor","a"],[277.3,687,"Inspect the affected component coldplate assembly","a"],[387.8,687,"Reapply the TIM pad on the affected Bianca","a"],[496.4,701.7,"Move to Secondary-Level FA","a"]],"e":[[1,2,""],[2,3,""],[3,0,"Pass"],[3,4,"Fail"]]},
    "123": {"p":123,"n":[[279.4,104.8,"Use TAS.txt to identify the affected GPU","a"],[279.4,146.2,"Inspect QD alignment, pins, and coolant flow","a"],[279.5,216.2,"QD issue found?","d"],[313,296.4,"Run FTS again in the same MTF slot","a"],[278.1,347.9,"Move to repair area and check pre-test TIM images","a"],[278,389.4,"Inspect the suspected Bianca coldplate assembly","a"],[278,440.9,"Remove the corresponding coldplate and inspect TIM","a"],[278.1,511.8,"TIM issue found?","d"],[307.8,592.8,"Redo TIM and return to the L10 test flow","a"],[248.2,644.3,"Move to Secondary-Level FA","a"],[379.8,644.3,"Continue Testing","a"]],"e":[[0,1,""],[1,2,""],[2,9,"Yes"],[2,3,"No"],[3,10,"Pass"],[3,4,"Fail"],[4,5,""],[5,6,"No issue found"],[6,7,""],[7,9,"No"],[7,8,"Yes"],[8,10,"Pass"],[8,9,"Fail"]]},
    "125": {"p":125,"n":[[207.4,105.8,"AC Cycle","a"],[244.3,173.3,"Inspect the cold plate and sensor pads","a"],[296.7,248.2,"Inspect both leak-sensor cables Check continuity at J125 and J18","a"],[331,323.1,"Inspect the thermal pads/TIM","a"],[390.5,397.9,"Replace the affected thermal pads/TIM and reinstall the cold plate","a"],[433.1,472.9,"Replace the affected cold-plate assembly","a"],[179.4,540.5,"Continue Testing","a"],[452,540.5,"Move to Secondary-Level FA","a"]],"e":[[0,6,"Pass"],[0,1,"Fail"],[1,6,"Pass"],[1,2,"Fail"],[2,6,"Pass"],[2,3,"Fail"],[3,6,"Pass"],[3,4,"Fail"],[4,6,"Pass"],[4,5,"Fail"],[5,6,"Pass"],[5,7,"Fail"]]},
    "126": {"p":126,"n":[[447.4,431.2,"Continue Testing","a"],[128.8,451.2,"Reseat NVLink loopback cable","a"],[265.5,473,"Replace NVLink loopback cable","a"],[447.3,489,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "128": {"p":128,"n":[[298.8,107,"FTS-10","a"],[159.5,163.1,"Visually inspect tray NVLink RAF connector(s)","a"],[407.4,163.1,"Visually inspect MTF NVLink loopback CBC","a"],[159.5,260.6,"Issue found?","d"],[407.4,260.6,"Issue found?","d"],[198.6,381.5,"Move tray to a different MTF slot","a"],[337.4,381.5,"No action needed Continue using MTF slot","a"],[477.1,381.5,"Remove MTF slot from usage until CBC is replaced","a"],[133.6,468.8,"Replace suspect Bianca(s)","a"],[322.5,468.8,"Continue to Next Station","a"],[133.6,525,"Repair","a"],[298.8,581.1,"Move to Secondary-Level FA","a"]],"e":[[0,1,""],[0,2,""],[1,3,""],[3,8,"Yes"],[3,5,"No"],[5,9,"Pass"],[5,8,"Fail"],[8,10,""],[10,11,""],[2,4,""],[4,7,"Yes"],[4,6,"No"],[7,11,""],[6,9,""]]},
    "130": {"p":130,"n":[[277.2,111.4,"AC cycle","a"],[201.2,198.8,"Remove and reapply TIM Bake using liquid heating method","a"],[400.6,399,"Re-run diagnostics up to and including the failing station","d"],[217.3,589.6,"Move to Secondary-Level FA","a"],[425,589.6,"Continue to Next Station","a"]],"e":[[0,1,"Fail"],[0,2,"Pass"],[1,3,"Fail"],[1,2,"Pass"],[2,4,"Pass"],[2,3,"Fail"]]},
    "132": {"p":132,"n":[[220.3,110.2,"AC Cycle","a"],[268.2,193.3,"Reflash the failed BF3, then AC Cycle","a"],[314.4,276.5,"Reseat the failed BF3","a"],[353,359.5,"Reseat the failed BF3 riser cable","a"],[408.9,442.6,"Replace the failed BF3","a"],[168.6,516.8,"Continue Testing","a"],[432.1,516.8,"Move to Secondary-Level FA","a"]],"e":[[0,5,"Pass"],[0,1,"Fail"],[1,5,"Pass"],[1,2,"Fail"],[2,5,"Pass"],[2,3,"Fail"],[3,5,"Pass"],[3,4,"Fail"],[4,5,"Pass"],[4,6,"Fail"]]},
    "133": {"p":133,"n":[[471.8,534.8,"Continue Testing","a"],[102.2,542.1,"AC cycle","a"],[196.5,555.1,"Install the expected or required version","a"],[324.7,568.2,"Replace the failed SSD","a"],[471.8,579.8,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "135": {"p":135,"n":[[472.2,112.2,"Continue Testing","a"],[137.4,135.4,"AC cycle the unit Run the BAT script","a"],[299.1,156.8,"Set ActiveCores to 144 AC cycle","a"],[472.2,172.3,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "136": {"p":136,"n":[[484,462.9,"Continue Testing","a"],[98.1,468.9,"AC Cycle","a"],[174.4,479.6,"Reassemble failed BF3 bay","a"],[267.4,490.3,"Replace associated IPEX boards","a"],[368.2,501.1,"Swap Bianca boards","a"],[484,510.5,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"],[4,0,"Pass"],[4,5,"Fail"]]},
    "138": {"p":138,"n":[[226.1,108.5,"AC Cycle","a"],[263.2,185.7,"Reseat all IPEX connections","a"],[292.4,271.2,"Replace the IPEX cables","a"],[321.1,356.8,"Replace the IPEX board","a"],[365.9,442.4,"Replace the connected OSFP board","a"],[418.1,527.9,"Replace the connected Bianca board","a"],[194.3,605.1,"Continue Testing","a"],[439.7,605.1,"Move to Secondary-Level FA","a"]],"e":[[0,6,"Pass"],[0,1,"Fail"],[1,6,"Pass"],[1,2,"Fail"],[2,6,"Pass"],[2,3,"Fail"],[3,6,"Pass"],[3,4,"Fail"],[4,6,"Pass"],[4,5,"Fail"],[5,6,"Pass"],[5,7,"Fail"]]},
    "140": {"p":140,"n":[[185.7,100.7,"AC Cycle","a"],[244.4,144.9,"Reseat the primary IPEX bridge and associated cables","a"],[280.8,189.2,"Reseat the primary-side cables","a"],[318.2,233.6,"Replace the primary-side cables","a"],[362.4,277.9,"Replace the primary IPEX bridge board","a"],[417,322.1,"Replace the primary E1.S backplane (HDD_BP_0)","a"],[461.1,366.5,"Replace the primary Bianca board","a"],[165.2,410.8,"Continue Testing","a"],[474.9,410.8,"Move to Secondary-Level FA","a"]],"e":[[0,7,"Pass"],[0,1,"Fail"],[1,7,"Pass"],[1,2,"Fail"],[2,7,"Pass"],[2,3,"Fail"],[3,7,"Pass"],[3,4,"Fail"],[4,7,"Pass"],[4,5,"Fail"],[5,7,"Pass"],[5,6,"Fail"],[6,7,"Pass"],[6,8,"Fail"]]},
    "143": {"p":143,"n":[[394.4,412.6,"Continue Testing","a"],[135.6,444.2,"AC Cycle","a"],[394.4,475.7,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "144": {"p":144,"n":[[467.6,403.6,"Continue Testing","a"],[105,414.3,"AC Cycle","a"],[204.1,425.2,"Reseat failed SSD","a"],[324.8,439.1,"Swap failed SSD","a"],[467.6,451.4,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "145": {"p":145,"n":[[446.6,382.6,"Continue Testing","a"],[113.8,402.8,"AC Cycle","a"],[249.7,420.9,"Reseat power cables","a"],[446.5,436.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "146": {"p":146,"n":[[462.6,409.1,"Continue Testing","a"],[107.1,417.4,"AC Cycle","a"],[208.8,432.4,"Reflash M.2 and restart BMC","a"],[321.6,447.4,"Reset BMC","a"],[462.5,460.6,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "151": {"p":151,"n":[[226,101.2,"AC cycle Run run_cable_check script","a"],[244.9,142.5,"Identify and re-seat the relevant SSD","a"],[278.4,187.9,"Swap the failing SSD with a passing SSD on the same E1.S board","a"],[278.4,256.9,"Did the failure move with the SSD?","d"],[256.9,334.9,"Replace SSD","a"],[330.4,373,"Re-seat or replace the MCIO cables","a"],[348.9,414.3,"Re-seat or replace the IPEX cables","a"],[366.4,455.7,"Replace the IPEX/E1.S board","a"],[389.1,492.9,"Replace BlueField3","a"],[260.4,564.4,"Re-run diagnostics up to and including the failing station","d"],[260.4,643.9,"Continue to Next Station","a"],[403.7,644,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[0,9,"Pass"],[1,2,"Fail"],[1,9,"Pass"],[2,3,""],[3,4,"Yes, failure"],[3,5,"No, failure stayed"],[4,9,"Pass"],[4,5,"Fail"],[5,9,"Pass"],[5,6,"Fail"],[6,9,"Pass"],[6,7,"Fail"],[7,9,"Pass"],[7,8,"Fail"],[8,9,"Pass"],[8,11,"Fail"],[9,10,"Pass"],[9,11,"Fail"]]},
    "152": {"p":152,"n":[[484,471.1,"Continue Testing","a"],[118.9,477,"Reseat left IPEX board/riser and cables","a"],[207.3,487.7,"Reseat SSD 0006:07:00.0","a"],[288.2,498.4,"Replace left IPEX white cable","a"],[377,511.4,"Inspect/replace BMC board","a"],[484.1,521,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"],[4,0,"Pass"],[4,5,"Fail"]]},
    "154": {"p":154,"n":[[375.6,110.8,"AC Cycle Run run_cable_check","a"],[361.4,169.6,"Re-seat SSD","a"],[344.1,223.2,"Swap SSD location","a"],[299,287.2,"Replace SSD","a"],[255.9,340.9,"Re-seat/replace MCIO cables","a"],[237.2,394.5,"Replace E1.S board","a"],[215.2,448,"Replace BlueField-3","a"],[370.1,545.9,"Re-run diags up to and including the failing station","d"],[215.2,643.6,"Continue to Next Station","a"],[374.4,643.6,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,"Failure moves with SSD"],[2,4,"Failure stays in same slot"],[3,4,"Fail"],[4,5,"Fail"],[5,6,"Fail"],[6,9,"Fail"],[0,7,"Pass"],[1,7,"Pass"],[3,7,"Pass"],[4,7,"Pass"],[5,7,"Pass"],[6,7,"Pass"],[7,8,"Pass"],[7,9,"Fail"]]},
    "155": {"p":155,"n":[[426.8,364.6,"Continue to Next Station","a"],[174.1,389,"Reseat in same MTF slot","a"],[426.7,413.4,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "156": {"p":156,"n":[[485.6,464.1,"Continue Testing","a"],[97.5,469.9,"AC Cycle","a"],[177.4,480.2,"Reseat the failed BF3 and associated cables","a"],[278.5,488.4,"Replace the failed BF3","a"],[377.2,501,"Replace the failed BF3 cables","a"],[485.6,510.2,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"],[4,0,"Pass"],[4,5,"Fail"]]},
    "157": {"p":157,"n":[[394.4,372,"Continue Testing","a"],[135.6,403.5,"AC Cycle","a"],[394.4,435,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "165": {"p":165,"n":[[447.9,406.6,"Continue Testing","a"],[113.2,426.4,"AC Cycle","a"],[250.5,448.1,"Reseat BMC, TPM, and associated cables","a"],[447.8,463.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "166": {"p":166,"n":[[402.2,370.2,"Continue Testing","a"],[145,400.1,"Reseat TPM","a"],[402.2,430,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "168": {"p":168,"n":[[323,116.3,"AC Cycle","a"],[406.9,209.6,"Reseat M.2 SSD","a"],[241.6,409.8,"Re-run diagnostics up to and including the failing station","d"],[212.5,621.5,"Continue to Next Station","a"],[409.6,621.5,"Move to Secondary-Level FA","a"]],"e":[[0,2,"Pass"],[0,1,"Fail"],[1,2,"Pass"],[1,4,"Fail"],[2,3,"Pass"],[2,4,"Fail"]]},
    "170": {"p":170,"n":[[358.2,101.2,"AC cycle","a"],[324.7,152.8,"Inspect compute tray and backplane for damage","a"],[282.4,210.1,"Move to a different MTF location","a"],[282.4,316.2,"Did the failure move with the compute tray?","d"],[175.4,433.5,"Replace the failing Bianca board","a"],[317.4,433.5,"Replace the loopback cable in the original MTF location","a"],[269.8,538,"Re-run diagnostics up to and including the failing station","d"],[186.2,642.4,"Continue to Next Station","a"],[296.4,642.4,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Fail"],[1,2,"Fail"],[2,3,""],[3,4,"Failure moved"],[3,5,"Failure stayed in"],[0,6,"Pass"],[1,6,"Pass"],[4,6,"Pass"],[4,8,"Fail"],[5,6,"Pass"],[5,8,"Fail"],[6,7,"Pass"],[6,8,"Fail"]]},
    "171": {"p":171,"n":[[430.2,445.4,"Continue Testing","a"],[178.2,469,"Copy the Onediag package to the DUT and run locally","a"],[430.2,492.6,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "174": {"p":174,"n":[[230.6,121.5,"Move the system to a second MTF location","a"],[309.4,220.3,"Inspect and re-seat the BMC, BMC interposer, and associated cables","a"],[348.6,319.1,"Replace the BMC interposer","a"],[399.8,408.2,"Replace the BMC","a"],[175.2,487.6,"Continue Testing","a"],[424.6,487.6,"Move to Secondary-Level FA","a"]],"e":[[0,4,"Pass"],[0,1,"Fail"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "175": {"p":175,"n":[[473.8,420,"Continue Testing","a"],[130.3,427.1,"Reseat left OSFP board and connections","a"],[249.3,440,"Replace left OSFP board cables","a"],[351.6,455.5,"Replace left OSFP board","a"],[473.8,466.8,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "176": {"p":176,"n":[[479.6,503.7,"Continue Testing","a"],[99.1,510.1,"AC cycle","a"],[212.1,521.6,"Reseat the right BF3 riser cables, BF3 riser, and BlueField-3 DPU card","a"],[352.4,535.7,"Replace the right BlueField-3 DPU card","a"],[479.6,545.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "178": {"p":178,"n":[[179.9,100.9,"AC Cycle","a"],[258.1,145.9,"Inspect and reseat associated IPEX cables Replace if physically damaged","a"],[333,191,"Replace the associated riser, black-and-white cables, and IPEX cables","a"],[363.3,236.1,"Replace the BMC board","a"],[409.8,281.1,"Replace the associated BlueField-3 DPU","a"],[457.7,326.2,"Replace the associated Bianca board","a"],[159.1,371.2,"Continue Testing","a"],[471.8,371.2,"Move to Secondary-Level FA","a"]],"e":[[0,6,"Pass"],[0,1,"Fail"],[1,6,"Pass"],[1,2,"Fail"],[2,6,"Pass"],[2,3,"Fail"],[3,6,"Pass"],[3,4,"Fail"],[4,6,"Pass"],[4,5,"Fail"],[5,6,"Pass"],[5,7,"Fail"]]},
    "180": {"p":180,"n":[[212.4,117.5,"AC cycle Run the BAT script","a"],[270.6,204.6,"Reset the BF3 settings Run diagnostics starting at FLA","a"],[322.6,291.8,"Re-seat the BF3, BF3 riser, and all associated cables","a"],[377.7,378.9,"Check the physical BF3 MAC address against SFC","a"],[415.9,457.6,"Replace BF3","a"],[163.6,527.6,"Continue Testing","a"],[437.8,527.6,"Move to Secondary-Level FA","a"]],"e":[[0,5,"Pass"],[0,1,"Fail"],[1,5,"Pass"],[1,2,"Fail"],[2,5,"Pass"],[2,3,"Fail"],[3,5,"Pass"],[3,4,"Fail"],[4,5,"Pass"],[4,6,"Fail"]]},
    "181": {"p":181,"n":[[483.9,453.5,"Continue Testing","a"],[104.9,464.6,"AC cycle","a"],[200.7,475.9,"Reflash the M.2","a"],[337.4,493.4,"Inspect and Replace the M.2 card and bracket","a"],[484,506.1,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "184": {"p":184,"n":[[228.1,117.3,"Re-seat all 1G NIC connections","a"],[284.7,204,"Re-seat the BMC, HMC, BMC interposer, and all cables","a"],[319.1,290.8,"Replace the BMC interposer","a"],[351.1,377.5,"Replace the 1G NIC board","a"],[380.1,464.2,"Replace the BMC board","a"],[416.6,551,"Replace the HMC board","a"],[195.8,629.2,"Continue Testing","a"],[438.4,629.2,"Move to Secondary-Level FA","a"]],"e":[[0,6,"Pass"],[0,1,"Fail"],[1,6,"Pass"],[1,2,"Fail"],[2,6,"Pass"],[2,3,"Fail"],[3,6,"Pass"],[3,4,"Fail"],[4,6,"Pass"],[4,5,"Fail"],[5,6,"Pass"],[5,7,"Fail"]]},
    "185": {"p":185,"n":[[478.5,450.1,"Continue Testing","a"],[128.8,456.7,"Reseat right OSFP board and connections","a"],[254.7,468.4,"Replace right OSFP board sideband cable (J1)","a"],[364,482.7,"Replace right OSFP board","a"],[478.4,493.1,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"]]},
    "186": {"p":186,"n":[[475.9,459.7,"Continue Testing","a"],[101.6,466.6,"AC Cycle","a"],[185.2,478.8,"Reseat left riser, BF3, and cables","a"],[273.5,491.1,"Replace left riser cables","a"],[358.9,506,"Replace left BF3","a"],[475.9,516.9,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"],[3,0,"Pass"],[3,4,"Fail"],[4,0,"Pass"],[4,5,"Fail"]]},
    "187": {"p":187,"n":[[445.5,376.8,"Continue Testing","a"],[196.4,397.1,"Inspect and reseat the host RJ45 cable Wait five minutes","a"],[445.5,417.5,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"]]},
    "188": {"p":188,"n":[[463.5,394,"Continue Testing","a"],[137.9,410.4,"Reseat 1Gb NIC, BMC, HMC, and cables","a"],[291.6,428.4,"Replace BMC interposer and J4-to-J22 MCIO cable","a"],[463.6,441.5,"Move to Secondary-Level FA","a"]],"e":[[1,0,"Pass"],[1,2,"Fail"],[2,0,"Pass"],[2,3,"Fail"]]},
    "191": {"p":191,"n":[[257.1,129.9,"Format selected devices containing unwanted OSes","a"],[257.1,252.3,"Check and correct the M.2 boot order","a"],[306,362.6,"Reflash the M.2","a"],[390,460.9,"Replace the M.2","a"],[165.4,559.3,"Continue Testing","a"],[397.4,559.3,"Move to Secondary-Level FA","a"]],"e":[[0,1,"Complete"],[1,4,"Pass"],[1,2,"Fail"],[2,4,"Pass"],[2,3,"Fail"],[3,4,"Pass"],[3,5,"Fail"]]},
    "194": {"p":194,"n":[[212.4,103.2,"AC cycle","a"],[251.1,162.1,"Reseat J117 and all 1Gb NIC/BMC connections","a"],[286.9,227.3,"Ensure 1G NIC firmware is up to date","a"],[319.3,292.5,"Replace the 1Gb NIC cable at J117","a"],[344.7,357.8,"Replace the 1Gb NIC board","a"],[380.1,416.6,"Replace the BMC board","a"],[438.6,469,"Inspect and reseat the left Bianca board","a"],[188.1,521.5,"Continue Testing","a"],[455,521.5,"Move to Secondary-Level FA","a"]],"e":[[0,7,"Pass"],[0,1,"Fail"],[1,7,"Pass"],[1,2,"Fail"],[2,7,"Pass"],[2,3,"Fail"],[3,7,"Pass"],[3,4,"Fail"],[4,7,"Pass"],[4,5,"Fail"],[5,7,"Pass"],[5,6,"Fail"],[6,7,"Pass"],[6,8,"Fail"]]}
  };

  // Página 191: conserva el retorno "Freeze" al mismo nodo.
  PAGE_FLOWCHARTS["191"].e.push([0, 0, "Freeze"]);
  // Ramales gemelos que el extractor de texto había unido o dejado sin etiqueta.
  const setEdgeLabel = (page, from, to, label) => {
    const edge = PAGE_FLOWCHARTS[page]?.e.find(item => item[0] === from && item[1] === to);
    if (edge) edge[2] = label;
  };
  setEdgeLabel("90", 6, 7, "Pass");
  setEdgeLabel("90", 6, 8, "Fail");
  setEdgeLabel("94", 5, 6, "Pass");
  setEdgeLabel("108", 5, 6, "Pass");

  const associatePage = (byId, id, page, identity = null, sourceChart = null) => {
    const graph = PAGE_FLOWCHARTS[String(Number(page))];
    if (!graph || !id) return;
    const sourceImage = sourceChart?.flowchartImage || sourceChart?.src || "";
    const resolveSourceImage = window.FFDG_MTF_PDF_REFERENCE_ASSET_URL;
    byId[id] = {
      kind: "mtf-pdf-vector",
      sourcePage: graph.p,
      nodes: graph.n,
      edges: graph.e,
      identity,
      flowchartImage: sourceImage && typeof resolveSourceImage === "function"
        ? resolveSourceImage(sourceImage)
        : sourceImage,
      flowchartImageWidth: sourceChart?.flowchartImageWidth || sourceChart?.width || 0,
      flowchartImageHeight: sourceChart?.flowchartImageHeight || sourceChart?.height || 0
    };
  };

  const graphsById = {};
  (window.FFDG_MTF_PDF_ADDITIONS || []).forEach(item => {
    if (item?.id && item?.sourcePdfPage) {
      associatePage(graphsById, item.id, item.sourcePdfPage, {
        station: item.station,
        code: item.code,
        description: item.name
      }, item);
    }
  });

  Object.entries(window.FFDG_MTF_PDF_EXISTING_FLOWCHARTS || {}).forEach(([id, chart]) => {
    if (chart?.sourcePage) associatePage(graphsById, id, chart.sourcePage, null, chart);
  });

  // Página 63: AST / 023002036_13892839 / MST ADDED X BUT DIAG EXPECT Y.
  associatePage(graphsById, "AST-01", 63, {
    station: "AST",
    code: "023002036_13892839",
    description: "MST ADDED X BUT DIAG EXPECT Y, PORT MISSING CONNECTION"
  }, {
    flowchartImage: "./assets/flowcharts/mtf/mtf-flow-109.png",
    flowchartImageWidth: 1527,
    flowchartImageHeight: 1854
  });

  // Legacy catalog identities whose procedures and flows are shared in the PDF.
  const legacyFlowchartAliases = {
    "FLA-19": "PDF-MTF-CASE-0001",
    "FLB-07": "PDF-MTF-CASE-0118"
  };
  Object.entries(legacyFlowchartAliases).forEach(([id, sourceId]) => {
    const graph = graphsById[sourceId];
    if (graph) graphsById[id] = { ...graph };
  });

  // PDF pp. 74–76: esta descripción FTS de lectura AIN0 comparte el flujo de inspección de fugas.
  // Se valida estación, código y texto del error; el mismo código también aparece en otros procedimientos.
  const leakSensorSource = (window.FFDG_MTF_PDF_ADDITIONS || []).find(item => item?.id === "PDF-MTF-CASE-0092");
  const leakSensorTarget = (window.FFDG_MTF_PDF_ADDITIONS || []).find(item => item?.id === "PDF-MTF-CASE-0166");
  if (leakSensorSource?.station === "FTS"
    && leakSensorSource?.sourcePdfPage === 76
    && leakSensorSource?.flowchartImage
    && leakSensorTarget?.station === leakSensorSource.station
    && leakSensorTarget?.code === leakSensorSource.code
    && /Getting Primary Bianca AIN0 ADC reading/i.test(leakSensorTarget?.name || "")) {
    associatePage(graphsById, leakSensorTarget.id, leakSensorSource.sourcePdfPage, {
      station: leakSensorTarget.station,
      code: leakSensorTarget.code,
      description: leakSensorTarget.name
    }, leakSensorSource);
  }

  window.FFDG_MTF_PDF_FLOWCHART_GRAPHS = Object.assign(
    {},
    window.FFDG_MTF_PDF_FLOWCHART_GRAPHS || {},
    graphsById
  );

  const escape = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[character]);

  function renderMtfPdfVectorFlowchart(container, graph, activeIndex = 0) {
    if (!container || graph?.kind !== "mtf-pdf-vector" || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) return false;
    if (graph.flowchartImage && Number(graph.flowchartImageWidth) > 0 && Number(graph.flowchartImageHeight) > 0) {
      const width = Number(graph.flowchartImageWidth);
      const height = Number(graph.flowchartImageHeight);
      const zoomSource = window.FFDG_MTF_PDF_FLOWCHART_ZOOM_IMAGES?.[String(graph.flowchartImage).split("/").pop()];
      container.innerHTML = '<svg class="mtf-pdf-flowchart-source" viewBox="0 0 ' + width + " " + height
        + '" preserveAspectRatio="xMidYMin meet" role="img" aria-label="Original FFDG diagram, page '
        + Number(graph.sourcePage) + '"' + (zoomSource ? ' data-flowchart-hi-res-src="' + escape(zoomSource) + '" data-flowchart-dpi="400"' : "")
        + ' style="display:block;width:100%;height:auto;max-height:min(68vh,600px)">'
        + '<image href="' + escape(graph.flowchartImage) + '" width="' + width + '" height="' + height
        + '" preserveAspectRatio="xMidYMin meet"></image></svg>';
      return true;
    }
    if (graph.nodes.length < 2 || graph.edges.length < 1) return false;

    const rawNodes = graph.nodes.map((node, index) => ({
      id: "n" + index,
      x: Number(node[0]) || 0,
      y: Number(node[1]) || 0,
      text: String(node[2] || ""),
      sourceType: node[3] === "d" ? "decision" : "action"
    }));
    const rawEdges = graph.edges
      .filter(edge => rawNodes[edge[0]] && rawNodes[edge[1]])
      .map((edge, index) => ({
        id: "e" + index,
        from: rawNodes[edge[0]].id,
        to: rawNodes[edge[1]].id,
        label: String(edge[2] || "")
      }));

    const minX = Math.min(...rawNodes.map(node => node.x));
    const maxX = Math.max(...rawNodes.map(node => node.x));
    const minY = Math.min(...rawNodes.map(node => node.y));
    const maxY = Math.max(...rawNodes.map(node => node.y));
    const rotatePortrait = (maxY - minY) > (maxX - minX) * 1.12;
    const positioned = rawNodes.map(node => ({
      ...node,
      axisX: rotatePortrait ? node.y : node.x,
      axisY: rotatePortrait ? node.x : node.y
    }));

    const cluster = (values, tolerance) => {
      const sorted = [...values].sort((a, b) => a - b);
      const groups = [];
      sorted.forEach(value => {
        const last = groups[groups.length - 1];
        if (!last || value - last.mean > tolerance) groups.push({ values: [value], mean: value });
        else {
          last.values.push(value);
          last.mean = last.values.reduce((sum, item) => sum + item, 0) / last.values.length;
        }
      });
      return groups;
    };
    const xGroups = cluster(positioned.map(node => node.axisX), 20);
    const yGroups = cluster(positioned.map(node => node.axisY), 22);
    const groupIndex = (value, groups) => {
      let nearest = 0, delta = Infinity;
      groups.forEach((group, index) => {
        const next = Math.abs(group.mean - value);
        if (next < delta) { nearest = index; delta = next; }
      });
      return nearest;
    };

    const columnCount = xGroups.length;
    const baseCanvasWidth = Math.max(1500, (columnCount - 1) * 240 + 240);
    const baseLeft = 120, baseRight = baseCanvasWidth - 120;
    const baseColumnGap = columnCount > 1 ? (baseRight - baseLeft) / (columnCount - 1) : 0;
    const nodeWidth = 480;
    const minimumConnectorGap = 58;
    const columnGap = columnCount > 1
      ? Math.max(baseColumnGap, nodeWidth + 16 + minimumConnectorGap)
      : 0;
    const horizontalPadding = (nodeWidth + 16) / 2 + 48;
    const canvasWidth = columnCount > 1
      ? Math.max(baseCanvasWidth, (columnCount - 1) * columnGap + horizontalPadding * 2)
      : baseCanvasWidth;
    const left = horizontalPadding;
    const columnForRank = rank => rank;
    const fontSize = 16;
    const lineHeight = 22;
    const wrapText = (value, limit) => {
      const words = String(value || "").split(/\s+/).filter(Boolean);
      const lines = [];
      let line = "";
      words.forEach(word => {
        const next = line ? line + " " + word : word;
        if (next.length > limit && line) { lines.push(line); line = word; }
        else line = next;
      });
      if (line) lines.push(line);
      return lines.length ? lines : [""];
    };

    const terminalNodeIds = new Set(rawEdges.map(edge => edge.from));
    const laidOut = positioned.map(node => {
      const col = columnForRank(groupIndex(node.axisX, xGroups));
      const lane = groupIndex(node.axisY, yGroups);
      const isEscalationTerminal = !terminalNodeIds.has(node.id) && /secondary-level|escalat/i.test(node.text);
      const width = isEscalationTerminal
        ? nodeWidth
        : node.sourceType === "decision" ? 310 : nodeWidth;
      const textWidth = node.sourceType === "decision" ? width * 0.6 : width - 40;
      const lines = wrapText(node.text, Math.max(10, Math.floor(textWidth / (fontSize * 0.56))));
      const height = Math.max(node.sourceType === "decision" ? 120 : 72, lines.length * lineHeight + (node.sourceType === "decision" ? 56 : 28));
      return {
        ...node,
        x: xGroups.length > 1 ? left + col * columnGap : canvasWidth / 2,
        y: 0,
        lane,
        width,
        height,
        lines,
        type: node.sourceType
      };
    });
    const laneHeights = new Array(yGroups.length).fill(0);
    laidOut.forEach(node => { laneHeights[node.lane] = Math.max(laneHeights[node.lane], node.height); });
    const laneCenters = [];
    let laneCursor = 90;
    laneHeights.forEach((height, index) => {
      const safeHeight = Math.max(height, 100);
      laneCenters[index] = laneCursor + safeHeight / 2;
      laneCursor += safeHeight + (index < laneHeights.length - 1 ? 28 : 70);
    });
    laidOut.forEach(node => { node.y = laneCenters[node.lane]; });
    const diagramHeight = Math.max(500, laneCursor);
    const edges = rawEdges.map(edge => ({ ...edge }));
    const finalNodes = [...laidOut];
    const incomingCount = new Map(finalNodes.map(node => [node.id, 0]));
    const outgoingCount = new Map(finalNodes.map(node => [node.id, 0]));
    edges.forEach(edge => {
      if (edge.from !== edge.to) incomingCount.set(edge.to, (incomingCount.get(edge.to) || 0) + 1);
      outgoingCount.set(edge.from, (outgoingCount.get(edge.from) || 0) + 1);
    });
    const actionNodes = finalNodes.filter(node => node.type !== "decision" && (outgoingCount.get(node.id) || 0) > 0);
    const safeActiveIndex = Math.max(0, Math.min(actionNodes.length - 1, Number(activeIndex) || 0));
    actionNodes.forEach((node, index) => {
      if (index < safeActiveIndex) node.completed = true;
      if (index === safeActiveIndex) node.active = true;
    });
    finalNodes.forEach(node => {
      if (node.type === "decision") return;
      if ((outgoingCount.get(node.id) || 0) === 0) node.type = "end";
      else if ((incomingCount.get(node.id) || 0) === 0) node.type = "start";
    });

    const svgHeight = diagramHeight;
    const markerId = "mtf-pdf-arrow-" + String(graph.sourcePage || "chart").replace(/[^a-z0-9_-]/gi, "") + "-" + Math.random().toString(36).slice(2, 8);
    const nodeMarkup = node => {
      const fill = node.active
        ? "var(--md-sys-color-secondary-container)"
        : node.type === "decision"
          ? "var(--md-sys-color-tertiary-container)"
          : node.type === "end" && /secondary-level|escalat/i.test(node.text)
            ? "var(--md-sys-color-error-container)"
            : node.type === "start" || node.type === "end"
              ? "var(--md-sys-color-secondary-container)"
              : "var(--md-sys-color-surface-container-low)";
      const stroke = node.active
        ? "var(--md-sys-color-primary)"
        : node.type === "decision"
          ? "var(--md-sys-color-tertiary)"
          : node.type === "end" && /secondary-level|escalat/i.test(node.text)
            ? "var(--md-sys-color-error)"
            : "var(--md-sys-color-outline-variant)";
      let shape;
      if (node.type === "decision") {
        shape = '<polygon points="' + node.x + "," + (node.y - node.height / 2) + " "
          + (node.x + node.width / 2) + "," + node.y + " "
          + node.x + "," + (node.y + node.height / 2) + " "
          + (node.x - node.width / 2) + "," + node.y
          + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="3"/>';
      } else {
        shape = '<rect x="' + (node.x - node.width / 2) + '" y="' + (node.y - node.height / 2)
          + '" width="' + node.width + '" height="' + node.height + '" rx="' + (node.type === "start" || node.type === "end" ? 24 : 10)
          + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (node.active ? 4 : 2.5) + '"/>';
      }
      const startY = node.y - ((node.lines.length - 1) * lineHeight) / 2 + 5;
      const text = node.lines.map((line, index) => '<tspan x="' + node.x + '" y="' + (startY + index * lineHeight) + '">' + escape(line) + "</tspan>").join("");
      const escalationClass = node.type === "end" && /secondary-level|escalat/i.test(node.text) ? " mtf-flow-node-escalation" : "";
      const activeClass = node.active ? " is-active" : "";
      const completedClass = node.completed ? " is-complete" : "";
      return '<g class="mtf-flow-node mtf-flow-node-' + node.type + escalationClass + activeClass + completedClass + '">' + shape
        + '<text text-anchor="middle" font-size="' + fontSize + '" font-weight="700" fill="var(--md-sys-color-on-surface)">' + text + "</text></g>";
    };

    const nodeMap = new Map(finalNodes.map(node => [node.id, node]));
    const edgeMarkup = edges.map((edge, index) => {
      const source = nodeMap.get(edge.from), target = nodeMap.get(edge.to);
      if (!source || !target) return "";
      const forward = target.x >= source.x;
      const sx = source.x + (forward ? source.width / 2 : -source.width / 2);
      const ex = target.x - (forward ? target.width / 2 : -target.width / 2);
      const sy = source.y + Math.max(-source.height * 0.25, Math.min(source.height * 0.25, (target.y - source.y) * 0.16));
      const ey = target.y;
      let path, labelX, labelY;
      if (forward && ex > sx + 12) {
        const midX = (sx + ex) / 2;
        path = "M" + sx + " " + sy + " H" + midX + " V" + ey + " H" + ex;
        labelX = midX;
        labelY = Math.abs(ey - sy) > 24 ? (sy + ey) / 2 : sy - 13;
      } else {
        const loopY = Math.min(source.y - source.height / 2, target.y - target.height / 2) - 42 - (index % 3) * 14;
        path = "M" + sx + " " + sy + " H" + (sx - 26) + " V" + loopY + " H" + (ex + 26) + " V" + ey + " H" + ex;
        labelX = (sx + ex) / 2;
        labelY = loopY - 8;
      }
      const normalizedLabel = String(edge.label || "").trim();
      const resultClass = /^pass\b/i.test(normalizedLabel) ? " is-pass" : /^fail\b/i.test(normalizedLabel) ? " is-fail" : "";
      const label = edge.label ? '<text x="' + labelX + '" y="' + labelY + '" text-anchor="middle" font-size="14" font-weight="800" fill="var(--md-sys-color-on-surface-variant)" stroke="var(--md-sys-color-surface)" stroke-width="5" paint-order="stroke">' + escape(edge.label) + "</text>" : "";
      return '<g class="mtf-flow-edge' + resultClass + '"><path d="' + path + '" fill="none" stroke="var(--md-sys-color-primary)" stroke-width="3" marker-end="url(#' + markerId + ')"/>' + label + "</g>";
    }).join("");

    const description = rawNodes.map(node => node.text).join(". ");
    container.innerHTML = '<p class="flowchart-source-note">FFDG vector transcription · page '
      + Number(graph.sourcePage) + '. Actions, order and source flow labels are preserved.</p>'
      + '<svg class="mtf-pdf-flowchart-svg" viewBox="0 0 ' + canvasWidth + " " + svgHeight
      + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="MTF flowchart transcribed from the PDF, page '
      + Number(graph.sourcePage) + '. ' + escape(description)
      + '" style="display:block;width:100%;height:auto;max-width:100%;overflow:visible">'
      + '<title>MTF flowchart · page ' + Number(graph.sourcePage) + "</title>"
      + '<desc>Vector diagram with action and decision nodes, connections and labels faithful to the manual.</desc>'
      + "<defs><marker id=\"" + markerId + "\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto\"><path d=\"M0 1L9 5L0 9Z\" fill=\"var(--md-sys-color-primary)\"/></marker></defs>"
      + edgeMarkup + finalNodes.map(nodeMarkup).join("") + "</svg>";
    return true;
  }

  window.FFDG = window.FFDG || {};
  window.FFDG.renderMtfPdfVectorFlowchart = renderMtfPdfVectorFlowchart;
})();
