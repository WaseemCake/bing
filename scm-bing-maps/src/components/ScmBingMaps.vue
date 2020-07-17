<template>
  <div class="scm-bing-maps">
    <div class="scm-maps">
      <bing-map
        :credentials="credentials"
        :options="mapOptions"
        v-if="mapVisible"
        class="map"
        v-on:map-viewchange="handleViewChanged"
      >
        <bing-search :options="mapOptions"></bing-search>
        <bing-map-layer name="layer-1" :visible="layerVisible" v-on:layer-click="handleEvent">
          <bing-map-pushpin
            v-for="item in pins"
            :key="item.key"
            :metadata="item.metadata"
            :location="item.location"
            :options="item.options"
          ></bing-map-pushpin>
          <div v-if="infoboxVisible">
            <bing-map-infobox
              v-for="item in pins"
              :key="item.infobox.key"
              :location="item.infobox.location"
              :options="item.infobox"
            ></bing-map-infobox>
          </div>
        </bing-map-layer>
        <bing-map-layer
          name="layer-2"
          :visible="countryLayerVisible"
          v-on:layer-click="handleEventCountry"
        >
          <bing-map-pushpin
            v-for="item in countryPins"
            :key="item.key"
            :metadata="item.metadata"
            :location="item.location"
            :options="item.options"
          ></bing-map-pushpin>
          <div v-if="countryInfoboxVisible">
            <bing-map-infobox
              v-for="item in countryPins"
              :key="item.infobox.key"
              :location="item.infobox.location"
              :options="item.infobox"
            ></bing-map-infobox>
          </div>
        </bing-map-layer>
      </bing-map>
    </div>
  </div>
</template>
<script>
import bubblePin from "../assets/marker-icon.png";

export default {
  name: "SCMBingMaps",
  props: {
    credentials: String,
    mapData: Object
  },
  data: function() {
    return {
      mapVisible: true,
      layerVisible: true,
      pinVisible: true,
      searchVisible: true,
      infoboxVisible: true,
      countryInfoboxVisible: false,
      countryLayerVisible: false,
      mapOptions: {
        zoom: 5,
        maxResults: 4,
        searchTitle: "Country/Port"
      },
      pins: [],
      countryPins: []
    };
  },
  created: function() {
    this.setMapData();
  },
  methods: {
    handleEvent(event) {
      this.infoboxVisible = false;
      this.$nextTick(() => {
        this.pins.filter(pin => {
          if (
            pin.metadata.countryName == event.meta.countryName &&
            pin.metadata.cityId == event.meta.cityId
          ) {
            this.$set(pin.infobox, "visible", true);
            this.infoboxVisible = true;
          } else {
            this.$set(pin.infobox, "visible", false);
          }
        });
      });
    },
    handleEventCountry(event) {
      this.countryInfoboxVisible = false;
      this.$nextTick(() => {
        this.countryPins.filter(pin => {
          if (
            pin.metadata.countryName == event.meta.countryName &&
            pin.metadata.countryId == event.meta.countryId
          ) {
            this.$set(pin.infobox, "visible", true);
            this.countryInfoboxVisible = true;
          } else {
            this.$set(pin.infobox, "visible", false);
          }
        });
      });
    },
    handleViewChanged(e) {
      let zoomlevel = e.zoomLevel;
      if (zoomlevel < this.mapOptions.zoom) {
        this.layerVisible = false;
        this.countryLayerVisible = true;
      } else {
        this.layerVisible = true;
        this.countryLayerVisible = false;
      }
    },
    setMapData() {
      let APIData = this.mapData;
      let self = this;
      let pinsTotalData = [];
      let countryPins = [];
      let countries = APIData.countries;
      countries.forEach(eachCountry => {
        let countryName = eachCountry.countryName;
        let pindatumCountry = {
          key: "",
          metadata: {},
          location: "",
          options: { visible: true },
          infobox: { visible: true }
        };
        let locationObCountry = {
          latitude: parseFloat(eachCountry.latitude),
          longitude: parseFloat(eachCountry.longitude)
        };
        let totalCountry =
          parseInt(eachCountry.alerts) +
          parseInt(eachCountry.exceptions) +
          parseInt(eachCountry.preadvice);
        let svgIcon = self.createSVGCircle(totalCountry, "#990000", "black", 1);
        pindatumCountry.options["icon"] = svgIcon;
        pindatumCountry.key = eachCountry.countryId;
        pindatumCountry.metadata["countryName"] = countryName;
        pindatumCountry.metadata["countryId"] = eachCountry.countryId;
        pindatumCountry.location = locationObCountry;
        pindatumCountry.infobox["key"] = `infobox-${eachCountry.countryId}`;
        pindatumCountry.infobox[
          "title"
        ] = `${countryName} - Total cases ${totalCountry}`;
        pindatumCountry.infobox["location"] = locationObCountry;
        pindatumCountry.infobox["actions"] = [
          {
            label: `Alerts ${eachCountry.alerts}`,
            eventHandler: function() {
              alert("Handler1");
            }
          },
          {
            label: `Exception ${eachCountry.exceptions}`,
            eventHandler: function() {
              alert("Handler2");
            }
          },
          {
            label: `PreAdvice ${eachCountry.preadvice}`,
            eventHandler: function() {
              alert("Handler3");
            }
          },
          {
            label: "View all cases",
            eventHandler: function() {
              alert("Handler4");
            }
          }
        ];

        countryPins.push(pindatumCountry);
        eachCountry.cities.forEach(city => {
          let pindatum = {
            key: "",
            metadata: {},
            location: "",
            options: { icon: bubblePin, visible: true },
            infobox: { visible: false }
          };
          let locationObj = {
            latitude: parseFloat(city.latitude),
            longitude: parseFloat(city.longitude)
          };
          let total =
            parseInt(city.alerts) +
            parseInt(city.exceptions) +
            parseInt(city.preadvice);
          pindatum.key = city.cityId;
          pindatum.metadata["countryName"] = countryName;
          pindatum.metadata["name"] = city.cityName;
          pindatum.metadata["cityId"] = city.cityId;
          pindatum.location = locationObj;
          pindatum.infobox["key"] = `infobox-${city.cityId}`;
          pindatum.infobox["title"] = `${city.cityName} - Total cases ${total}`;
          pindatum.infobox["location"] = locationObj;
          pindatum.infobox["actions"] = [
            {
              label: `Alerts ${city.alerts}`,
              eventHandler: function() {
                alert("Handler1");
              }
            },
            {
              label: `Exception ${city.exceptions}`,
              eventHandler: function() {
                alert("Handler2");
              }
            },
            {
              label: `PreAdvice ${city.preadvice}`,
              eventHandler: function() {
                alert("Handler3");
              }
            },
            {
              label: "View all cases",
              eventHandler: function() {
                alert("Handler4");
              }
            }
          ];
          pinsTotalData.push(pindatum);
        });
      });

      this.pins = pinsTotalData;
      this.countryPins = countryPins;
    },
    createSVGCircle(radius, fillColor, strokeColor, strokeWidth) {
      if (strokeColor === void 0) {
        strokeColor = "";
      }
      if (strokeWidth === void 0) {
        strokeWidth = 0;
      }
      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${2 *
        radius}" height="${2 * radius}">
                  <circle cx="${radius}" cy="${radius}" r="${radius -
        strokeWidth}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}"/>
                </svg>`;
      return svg;
    }
  }
};
</script>

<style>
.map {
  display: inline-block;
  width: 90%;
  margin: 0 auto;
  border: 1px solid black;
}

.scm-maps {
  width: 100%;
  height: 500px;
  text-align: center;
}

.infobox-body {
  max-height: 250px !important;
  width: 250px !important;
}

.infobox-actions {
  height: 100px !important;
}

.infobox-actions-list li {
  float: none !important;
  margin: 0 0 4px 0px !important;
}

.infobox-actions-list li a {
  border-bottom: 1px solid #888 !important;
  border-right: 0px !important;
}

.customSearchBox {
  top: 12%;
  border: 1px solid #888;
  position: absolute;
  z-index: 1;
  left: 25%;
  width: 50%;
}
.searchBox {
  width: 85%;
}
.customSearchTitle {
  line-height: 2;
  background-color: white;
}
.as_container_search {
  left: 13%;
}
</style>
