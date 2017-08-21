'use strict';

angular.module('agSADCeFarms')
  .service('mapconfig', function (esriLoader, esriRegistry, esriMapUtils) {
      var self = this;

      self.esriLoaded = false;

      self.globals = {
        server: 'http://geodatatest.state.nj.us/',
        esriJS: '//js.arcgis.com/3.20compact',
        initialExtent : {
            spatialReference: {
                latestWkid: 3424,
                wkid: 102711
            },
            xmax:  1379214.6118721468,
            xmin: -527214.6118721466,
            ymax: 1139100.4566210047,
            ymin: 484589.04109589016
        },
        baseMaps: [
          {
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
          }
        ],
        referenceLayers:[

        ],
        operationalLayers:[

        ],
        mapnotesLayers:[

        ]


      };

      self.getMap = function(id){
            return esriRegistry.get(id);
      };

      self.getStatus = function(){
            console.log('map, getting esri load status');
            return self.esriLoaded;
      };

      /*
      self.lazyload = function() {
        console.log('lazy loading ags');
          // Make a call to load Esri JSAPI resources.
          // A promise is provided for when the resources have finished loading.
          esriLoader.bootstrap({
                url: mapconfig.globals.esriJS
                }).then(function() {
                        // Set Loaded to be true
                        self.esriLoaded = true;
                });
       };
       */


      this.getBaseMaps = function(){
           console.log("Get BaseMaps");
           return $resource("../testdata.json", null,  {'save':{method:'POST' }});
        };

  });