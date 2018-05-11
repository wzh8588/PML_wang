/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var region = ee.FeatureCollection("projects/pml_evapotranspiration/Australia/COO_Lat_Lon"),
    pml_v2 = ee.ImageCollection("projects/pml_evapotranspiration/PML/OUTPUT/PML_V2_8day");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var pkg_export = require('users/kongdd/public:pkg_export.js');

var imgcol = pml_v2;
imgcol     = ee.ImageCollection(imgcol.toList(1000));

imgcol = imgcol.map(function(img){
    return img.clip(region);
});

print(region);
print(imgcol.limit(10));

Map.addLayer(region);

var range  = [-180, -60, 180, 90],
    scale  = 1 / 120, //1/240,
    drive  = true,
    folder = 'PMLV2yearly'; //

// pkg_export.ExportImgCol(pmlv2, undefined, range, scale, drive, folder);
