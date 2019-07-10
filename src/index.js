const BOND_X = 36;
const BOND_Y = 15;
const BOND_HYPO = 39;
const BOND_STROKE = 1;
const MARGIN = 20;

const longestCarbonPath = function (start, trace) {
    let bonds = this.getBonds(start);
    let traces = [];

    const flat = this.childIds;

    for (let i in bonds) {
        let el = flat[bonds[i].split('-')[1]];
        if (el.element === 6 && trace.indexOf(el.id) === -1) {
            traces.push(longestCarbonPath.call(this, el, trace.concat([el.id])));
        }
    }
    
    for (let i in traces) {
        if (traces[i].length > trace.length) {
            trace = traces[i];
        }
    }
    return trace;
};

const createOrganicSVG = (Molecule) => {
    const flat = Molecule.childIds;
    let bondMap = {};

    for (let i in flat) {
        if (flat[i].type === 'element') bondMap[i] = Molecule.getBonds(flat[i]);
    }

    let x = 0;
    let y = 0;
    let up = false;
    let paths = '';

    let carbonEnds = [];

    for (let i in bondMap) {
        let carbonBonds = 0;
        for (let o in bondMap[i]) {
            let one = flat[i];
            let two = flat[bondMap[i][o].split('-')[1]];

            // Carbon-Carbon bond
            if (one.element === 6 && two.element === 6) carbonBonds += 1;
        }
        if (carbonBonds === 1) carbonEnds.push(i);
    }

    let path = [];

    for (let i = 0; i < carbonEnds.length - 1; i += 1) {
        let start = flat[carbonEnds[i]];
        let trace = longestCarbonPath.call(Molecule, start, [start.id]);
        if (trace.length > path.length) path = trace;
    }

    /*for (let i in Molecule.children) {
        if (Molecule.children[i].type === 'chain') {
            let chain = Molecule.children[i];
            for (let o in chain.children) {
                let cBonds = chain.children[o].getBonds();
                
            }
        }
    }*/

    let pathMap = {
        [path[0]]: [0, BOND_Y, !1],
    };

    for (let i in path) {
        if (Number(i) === 0) continue;
        let bond = Molecule.getBond(path[Number(i) - 1], path[i]);
        
        paths += `<path d="M${x} ${up ? 0 : BOND_Y} L${x + BOND_X} ${(up ? BOND_Y : 0)}" stroke="black" stroke-width="${BOND_STROKE}" fill="none" />`;
        
        if (bond.bondCount === 2 || bond.bondCount === 3) {
            paths += `<path d="M${x + 2} ${(up ? 0 : BOND_Y) - 2 + (up ? 1 : -1) * 5/6} L${x + BOND_X - 2} ${(up ? BOND_Y : 0) - 2 + (up ? -1 : 1) * 5/6}" stroke="black" stroke-width="${BOND_STROKE}" fill="none" />`;
        }
        if (bond.bondCount === 3) {
            paths += `<path d="M${x + 2} ${(up ? 0 : BOND_Y) + 2 + (up ? 1 : -1) * 5/6} L${x + BOND_X - 2} ${(up ? BOND_Y : 0) + 2 + (up ? -1 : 1) * 5/6}" stroke="black" stroke-width="${BOND_STROKE}" fill="none" />`;
        }

        x += BOND_X;
        up = !up;
        pathMap[path[i]] = [x, up ? 0 : BOND_Y, up];
    }

    for (let i in path) {
        for (let o in bondMap[path[i]]) {
            let one = flat[path[i]];
            let two = flat[bondMap[path[i]][o].split('-')[1]];

            // Carbon-Carbon bond
            if (path.indexOf(two.id) === -1 && two.element !== 1) {
                pathMap[two.id] = [
                    pathMap[one.id][0],
                    pathMap[one.id][1] + (pathMap[one.id][2] ? -1 : 1) * BOND_HYPO,
                ];
                paths += `<path d="M${pathMap[one.id][0]} ${pathMap[one.id][1]} L${pathMap[two.id][0]} ${pathMap[two.id][1]}" stroke="black" stroke-width="${BOND_STROKE}" fill="none" />`;
            }
        }
    }

    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;

    for (let i in pathMap) {
        if (pathMap[i][0] < minX) minX = pathMap[i][0];
        if (pathMap[i][0] > maxX) maxX = pathMap[i][0];
        if (pathMap[i][1] < minY) minY = pathMap[i][1];
        if (pathMap[i][1] > maxY) maxY = pathMap[i][1];
    }

    let points = [];
    for (let i in pathMap) {
        if (flat[i].element === 6) {
            points.push(`<circle cx="${pathMap[i][0]}" cy="${pathMap[i][1]}" r="${BOND_STROKE / 1.5}" fill="black"/>`);
        } else {
            let symbol = flat[i].symbol;
            let circleR = symbol.length === 3 ? 9 : symbol.length === 2 ? 7 : 6; 
            points.push(`<circle cx="${pathMap[i][0]}" cy="${pathMap[i][1]}" r="${circleR}" fill="white" />`);
            points.push(`<text x="${pathMap[i][0] - (symbol.length === 3 ? 7 : symbol.length === 2 ? 4.5 : 2.5)}" y="${pathMap[i][1] + 2.5}"  r="2" fill="black">${symbol}</text>`);
        }
    }

    let svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
    svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
    svg += `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${minX - MARGIN} ${minY - MARGIN} ${maxX - minX + 2 * MARGIN} ${maxY - minY + 2 * MARGIN}">`;
    svg += '<style>text {font-size: 8px; font-family: monospace; font-weight: 900;}</style>'
    svg += paths;
    svg += points.join('');
    svg += '</svg>';

    return svg;
};

module.exports = {
    createOrganicSVG,
};