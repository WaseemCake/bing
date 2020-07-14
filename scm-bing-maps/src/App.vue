<template>
  <div id="app">
    <ScmBingMaps  credentials ="AvBlL3tOhVRnF_TjSGvUwzfzUYZhzwSPxMuZDtksL6vcRt_kZmIccnt1D7Nx5-dO" :mapData = "{
   'countries':[
      {
         'countryName':'India',
         'countryId':'11',
         'alerts':'1',
         'exceptions':'2',
         'preadvice':'3',
         'latitude':'29.004807',
         'longitude':'77.257284',
         'cities':[
            {
               'cityName':'Bangalore',
               'cityId':'1',
               'alerts':'4',
               'exceptions':'5',
               'preadvice':'6',
               'latitude':'12.991443',
               'longitude':'77.664350'
            },
            {
               'cityName':'Mangalore',
               'cityId':'2',
               'alerts':'2',
               'exceptions':'4',
               'preadvice':'1',
               'latitude':'16.513783',
               'longitude':'80.619821'
            },
            {
               'cityName':'Chennai',
               'cityId':'3',
               'alerts':'2',
               'exceptions':'4',
               'preadvice':'1',
               'latitude':'9.912593',
               'longitude':'78.112008'
            }
         ]
      },
      {
         'countryName':'Russia',
         'countryId':'12',
         'alerts':'10',
         'exceptions':'3',
         'preadvice':'9',
         'latitude':'55.775875',
         'longitude':'37.627124',
         'cities':[
            {
               'cityName':'City1',
               'cityId':'city11',
               'alerts':'4',
               'exceptions':'5',
               'preadvice':'6',
               'latitude':'62.566370',
               'longitude':'97.382389'
            },
            {
               'cityName':'City',
               'cityId':'city12',
               'alerts':'4',
               'exceptions':'5',
               'preadvice':'6',
               'latitude':'55.004323',
               'longitude':'82.894449'
            }
         ]
      },
      {
         'countryName':'Denmark',
         'countryId':'13',
         'alerts':'10',
         'exceptions':'3',
         'preadvice':'9',
         'latitude':'55.363544',
         'longitude':'10.442772',
         'cities':[
            {
               'cityName':'Copenhagen',
               'cityId':'city21',
               'alerts':'4',
               'exceptions':'5',
               'preadvice':'6',
               'latitude':'55.67115',
               'longitude':'12.576686'
            },
            {
               'cityName':'Odense',
               'cityId':'city22',
               'alerts':'4',
               'exceptions':'5',
               'preadvice':'6',
               'latitude':'55.637239',
               'longitude':'10.102310'
            }
         ]
      }
   ]
}"  />
  </div>
</template>

<script>
import ScmBingMaps from './components/ScmBingMaps.vue'

export default {
  name: 'app',
  components: {
    ScmBingMaps
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.logo-small {
  height: 50px;
  width: auto;
}
</style>
