(() => {
  "use strict";

  const initialVisibleFailures = 3;
  const stationLanes = [
    ["FLA", "RIN"],
    ["PRET", "FLC"],
    ["FLB", "DCC"],
    ["PT1", "AST", "RST"],
    ["FCT", "HPT"]
  ];

  function textElement(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    return node;
  }

  function sourceLabel(item) {
    if (item.isSupplemental) {
      const pages = item.sourcePages?.length ? item.sourcePages.join(", ") : item.sourcePage;
      return `FA PDF · p. ${pages}`;
    }
    return `Index · p. ${item.indexPage}`;
  }

  function failureCard(item, onSelect) {
    const button = document.createElement("button");
    const description = item.description || "No description in the station index.";
    const preview = description.split(/\n+/)[0].trim();
    button.type = "button";
    button.className = "l11-failure-card bd-item";
    button.dataset.caseId = item.id;
    button.setAttribute("aria-label", `Open ${item.station} failure ${item.errorCode}: ${preview}`);
    button.setAttribute("aria-pressed", "false");
    button.title = description;
    button.append(
      textElement("b", "l11-failure-code", item.errorCode),
      textElement("span", "l11-failure-description", preview || description),
      textElement("small", "l11-failure-meta", `${item.failureType || "Uncategorized"} · ${sourceLabel(item)}`)
    );
    button.addEventListener("click", () => onSelect(item, button));
    return button;
  }

  function stationColumn(station, failures, onSelect, showAllMatches) {
    const column = document.createElement("section");
    const headingId = `l11-station-${station.toLowerCase()}`;
    column.className = "l11-station-column bd-col";
    column.dataset.st = station;
    column.setAttribute("aria-labelledby", headingId);

    const heading = document.createElement("header");
    heading.className = "l11-station-heading bd-h";
    const title = textElement("span", "", station);
    title.id = headingId;
    heading.append(title, textElement("small", "", String(failures.length)));

    const list = document.createElement("div");
    list.className = "l11-station-failures bd-l";
    list.id = `l11-failures-${station.toLowerCase()}`;
    const visibleFailures = showAllMatches ? failures : failures.slice(0, initialVisibleFailures);
    visibleFailures.forEach(item => list.append(failureCard(item, onSelect)));
    column.append(heading, list);

    return column;
  }

  function render({ host, stationOrder, items, onSelect, showAllMatches }) {
    if (!host) return;
    const groups = new Map(stationOrder.map(station => [station, []]));
    items.forEach(item => {
      const stations = [...new Set(item.stations?.length ? item.stations : [item.station])];
      stations.forEach(station => groups.get(station)?.push(item));
    });

    const lanes = stationLanes.map(stations => {
      const lane = document.createElement("div");
      lane.className = "l11-station-lane";
      stations
        .filter(station => groups.get(station)?.length)
        .forEach(station => lane.append(stationColumn(station, groups.get(station), onSelect, showAllMatches)));
      return lane;
    }).filter(lane => lane.childElementCount);
    const configuredStations = new Set(stationLanes.flat());
    stationOrder
      .filter(station => !configuredStations.has(station) && groups.get(station)?.length)
      .forEach(station => {
        const lane = document.createElement("div");
        lane.className = "l11-station-lane";
        lane.append(stationColumn(station, groups.get(station), onSelect, showAllMatches));
        lanes.push(lane);
      });
    host.replaceChildren(...lanes);
  }

  window.FFDG_L11_STATION_BOARD = { render };
})();
