/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var region = ee.FeatureCollection("projects/pml_evapotranspiration/Australia/COO_Lat_Lon"),
    pml_v2 = ee.ImageCollection("projects/pml_evapotranspiration/PML/OUTPUT/PML_V2_8day");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var pkg_export = require('users/kongdd/public:pkg_export.js');

/** load imgcol*/
var imgcol = pml_v2;
imgcol     = ee.ImageCollection(imgcol.toList(1000)).select([0, 1, 2, 3, 4]);
// print(imgcol.limit(3));

/** get bbox of assigned region */
function getRange(region){
    var bound = ee.Feature(region.first()).bounds();
    bound = bound.geometry().coordinates().get(0).getInfo();
    bound = ee.List(bound);
    
    var x = ee.Array(bound.get(0)).floor(),
        y = ee.Array(bound.get(2)).ceil();
        
    var range = ee.Array.cat([x, y], 0).getInfo();
    return range;
}
var range = getRange(region);
print(range);
// print(ee.Array(bound).accum(0, 'max'))

// Map.addLayer(bound, {}, 'bounds');
/** clip regional data */
// imgcol = imgcol.map(function(img){ return img.clip(region); });
range = [112, -44, 154, -9];

// print(region);
// print(imgcol.limit(10));
// Map.addLayer(region);

// var range  = [-180, -60, 180, 90];
var cellsize = 1 / 20, //1/240,
    type   = 'drive',
    folder = 'PMLV2AU', 
    crs    = 'EPSG:4326'; //

var date_begin = '2012-07-27', 
    date_end   = '2017-12-31';
    
imgcol = imgcol.filterDate(date_begin, date_end);

pkg_export.ExportImgCol(imgcol, undefined, range, cellsize, type, folder, crs);