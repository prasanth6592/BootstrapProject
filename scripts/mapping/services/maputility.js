'use strict';


angular.module('agSADCeFarms')
                .factory('maputility', function(esriLoader, $q, mapdataservices) {
                    var mapUtilsFactory = {};

                    var layersDeferred = $q.defer();

                    //TODO: need to pass credentials and add $resource for resolving layers with applicationID or FarmID
                    var loadLayers = function() {
                        esriLoader.require([
                            'esri/InfoTemplate',
                            'esri/layers/FeatureLayer'
                        ], function(InfoTemplate, FeatureLayer) {

                            mapdataservices.getAppLayers().get()
                                .$promise.then(
                                function(response){
                                    layersDeferred.resolve(response);
                                },
                                function(response) {
                                    layersDeferred.resolve({"Error": response});
                                }
                            );


                            //var infoTemplate = new InfoTemplate('Volcano!!', '${NAME}<br>${TYPE}');
                            //var featureLayer = new FeatureLayer('//http://geodatatest.state.nj.us/arcgis/rest/services/Applications/AG_SADC_eFarms_Features/FeatureServer/0', {
                            //    id: 'volcanoesLayer',
                            //    infoTemplate: infoTemplate,
                            //    outFields: ['NAME', 'TYPE']
                            //});
                            /*
                            var exampleObject= {'basemapLayers':[{
                                                    name: 'njcolor',
                                                    urls: ['http://geodatatest.state.nj.us/arcgis/rest/services/Basemap/Color_NJ/MapServer'],
                                                    title: 'NJ Color',
                                                    thumbnailurl: ''
                                                  },
                                                  {
                                                    name: 'ltgraynj',
                                                    urls: ['http://geodatatest.state.nj.us/arcgis/rest/services/Basemap/LtGray_NJ/MapServer'],
                                                    title: 'NJ Gray',
                                                    thumbnailurl: ''
                                                  }],
                                                'operationalLayers':[{'id':'tfparcels','layerref':{}}],
                                                'referenceLayers': [],
                                                }

                            layersDeferred.resolve(exampleObject);
                            */
                        });
                    };

                    // this is a "public" method in the factory
                    // other directives/controllers will use this to get access to a maplayers instance by a promise

                    mapUtilsFactory.getMapData = function() {
                        // return the promise
                        return layersDeferred.promise;
                    };

                    //TODO: May add this to the controller
                    mapUtilsFactory.toggleLayerVisibility = function() {
                        // get reference to the FeatureLayer instance by using the factory's other method
                        console.log('Toggling layer visibility');
                        //mapUtilsFactory.getFeatureLayer().then(function(featureLayer) {
                        //    // toggle the layer visibility
                        //    featureLayer.setVisibility(!featureLayer.visible);
                        //});
                    };

                    loadLayers();

                    return mapUtilsFactory;
                });