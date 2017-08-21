(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
  .controller('MapController', ['$scope', '$log','esriLoader','esriRegistry', 'esriMapUtils','mapconfig','maputility', function($scope, $log, esriLoader, esriRegistry, esriMapUtils, mapconfig, maputility){
    var self = this;
    self.map = {};
    //self.mapdata = {};
    self.dataLoaded = false;
    self.message = '';
    self.loadError = false;


    // This should only run once the view has been loaded
    maputility.getMapData().then(function(layersObj) {
            // and then add them to the map
            console.log('LayersOBJ: ', layersObj);

            //TODO: If response says no layers found or not authorized, change properties to send message to the user
            if (_.contains(_.keys(layersObj), 'error')){
                console.log('found error');
                self.errorMessage = layersObj['error'];
                self.loadError = true;
            } else {

                $scope.mapdata = layersObj;


                //TODO: The basemap configuration should read from the layersObj, not the globals obj
                // DEFINE CUSTOM BASEMAPS
                        _.forEach([layersObj['basemapLayers'][0],layersObj['basemapLayers'][1]], function(x, key) {
                          esriMapUtils.addCustomBasemap(x.name, {
                              urls: x.urls,
                              title: x.title,
                              thumbnailurl: x.thumbnailurl
                          });
                        });
                        console.log(mapconfig.globals.baseMaps[0].name);

                        console.log('FINISHED LOADING BASEMAPS');
                        self.dataLoaded = true;

                        mapconfig.getMap('appMap').then(function(thisMap) {
                         console.log('got the map id',thisMap);
                         self.map = thisMap;
                         $scope.map = thisMap;
                         self.map.setBasemap(layersObj['basemapLayers'][0]['name'])

                        });
               }
       });


    self.mapLoaded = function(map) {
        console.log('yayay the map has data!');
        $scope.map = map;

        console.log($scope.map.spatialReference);
        //TODO: add the reference layers, featurelayers, map notes layers and other stuff
        //TODO: Do this from the MapUtilities factory?
    };

    self.mapOptions =  {
        extent: mapconfig.globals.initialExtent,
        sliderStyle: 'small'
     };

     self.extentchanged = function(e) {
        // now you have a reference to the extent
        console.log(e.extent);
       //$scope.map.extent = e.extent;
    };



  }]);



/*
angular.module('agSADCeFarms')
    .controller('MapController',['$scope', '$log','esriMapUtils','esriRegistry', function($scope, $log, esriMapUtils, esriRegistry) {

                       esriMapUtils.addCustomBasemap('njcolor', {
                            urls: ['http://geodata.state.nj.us/arcgis/rest/services/Basemap/Color_NJ/MapServer'],
                            title: 'NJColor',
                            thumbnailUrl: 'http://njgin.state.nj.us/OGIS_Common/lib/images/globe.png'
                        }).then(function(esriBasemaps) {
                            console.log(esriBasemaps);
                            // because we are adding the basemap in the controller,
                            // we need to use the regitstry to get a handle to the map
                            // once it is loaded and then set the basemap
                            esriRegistry.get('farmMap').then(function(map) {
                                map.setBasemap('njcolor');
                                console.log(map);
                            });
                        });

                    $scope.map = {
                        center: {
                            lng: -74.7219531,
                            lat: 40.2650095
                        },
                        zoom: 16,
                        loaded: false,
                        basemap:'topo'

                    };
                    // one way to get a reference to the map is to
                    // set a handler for the map directive's load attribute
                    $scope.mapLoaded = function(map) {
                        // now you have a reference to the map
                        // that you can do whatever you want with
                        console.log(map);
                        $scope.map.loaded = true;


                         $scope.map.basemap = 'njcolor';
                         console.log(map);
                    };
                    // the map directive also exposes an extent-change attribute
                    $scope.extentchanged = function(e) {
                        // now you have a reference to the extent
                        console.log(e.extent);
                        $scope.map.extent = e.extent;
                    };

                    $scope.basemaps = ;
                    $scope.baseChanged = function() {
                        $scope.map.basemap = $scope.selbasemap;
                    };
                    //console.log($scope.current_user);



                }]);
*/