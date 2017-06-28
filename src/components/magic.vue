<template>
  <div id="mod-magic">
    <div class="magic-img"></div>
    <div class="magic-svg">
      <svg viewBox="0 0 800 800">
        <defs>
          <filter :id="`blur${_uid}`">
            <feGaussianBlur in="SourceGraphic" :stdDeviation="std" />
          </filter>
          <clipPath id="rect">
            <rect :transform="`rotate(-${360 / 12 * 1})`" x="-205" y="-205" width="410" height="410"></rect>
          </clipPath>
          <mask id="mask">
            <rect x="0" y="0" width="420" height="420" :transform="`rotate(${360 / 3 * 1})`" fill="white"></rect>
            <rect x="-210" y="-210" width="420" height="420" :transform="`rotate(${-360 / 3 * 1})`" fill="black"></rect>
          </mask>
          <path :d="`M 0 -250 A 250 250 0 1 1 0 250 A 250 250 0 1 1 0 -250`" id="symbol"></path>
          <path :d="`M -${420 * Math.sqrt(2) / 2} 0 A ${420 * Math.sqrt(2) / 2} ${420 * Math.sqrt(2) / 2} 0 1 0 ${420 * Math.sqrt(2) / 2} 0 A ${420 * Math.sqrt(2) / 2} ${420 * Math.sqrt(2) / 2} 0 1 0 -${420 * Math.sqrt(2) / 2} 0`" id="text" transform="rotate(-60)"></path>
        </defs>
        <g :filter="`url(#blur${_uid})`" :transform="`translate(${width / 2}, ${height / 2})`">
          <circle cx="0" cy="0" r="95" :stroke="blue" fill="none"></circle>
          <circle cx="0" cy="0" r="100" :stroke="blue" fill="none"></circle>
  
          <line v-for="i in 24" x1="100" y1="0" x2="200" y2="0" :stroke="blue" :transform="`rotate(${i * 360 / 24})`"></line>
          <line v-for="i in 24" x1="100" y1="0" x2="180" y2="0" :stroke="blue" :transform="`rotate(${i * 360 / 24 + 360 / 48})`"></line>
  
          <g>
            <path v-for="i in 6" :d="`M100 0 C 150 50 180 0 ${200 * Math.cos(Math.PI / 180 * 360 / 24)} ${200 * Math.sin(Math.PI / 180 * 360 / 24)} C ${150 * Math.cos(Math.PI / 180 * 360 / 24)} ${150 * Math.sin(Math.PI / 180 * 360 / 24)}, ${150 * Math.cos(Math.PI / 180 * 360 / 12)} ${150 * Math.sin(Math.PI / 180 * 360 / 12)}, ${100 * Math.cos(Math.PI / 180 * 360 / 12)} ${100 * Math.sin(Math.PI / 180 * 360 / 12)} A 100 100 0 0 0 100 0`" :stroke="blue" :fill="background" :transform="`rotate(${i * 180 / 3 - 360 / 24})`"></path>
            <path v-for="i in 6" d="M100 0 C 120 10, 130 10, 150 0 S 170 -10, 200 0" :stroke="blue" fill="transparent" :transform="`rotate(${i * 180 / 3})`"></path>
          </g>
  
          <g>
            <path v-for="i in 6" :d="`M 100 0 L ${200 * Math.cos(Math.PI / 180 * 360 / 12)} ${200 * Math.sin(Math.PI / 180 * 360 / 12)} L ${100 * Math.cos(Math.PI / 180 * 360 / 6)} ${100 * Math.sin(Math.PI / 180 * 360 / 6)} A 100 100 0 0 0 100 0`" :stroke="blue" :fill="background" :transform="`rotate(${i * 360 / 6})`"></path>
  
            <line v-for="i in 6" x1="100" y1="0" x2="200" y2="0" :stroke="blue" :transform="`rotate(${i * 360 / 6 + 360 / 12})`"></line>
          </g>
          <circle cx="0" cy="0" r="200" :stroke="blue" fill="none"></circle>
          <circle cx="0" cy="0" r="205" :stroke="blue" fill="none"></circle>
  
          <g v-for="i in 12" :transform="`rotate(${360 / 12 * i})`" :mask="`url(#mask)`">
            <rect x="-205" y="-205" width="410" height="410" :stroke="blue" fill="none"></rect>
            <rect x="-210" y="-210" width="420" height="420" :stroke="blue" fill="none"></rect>
          </g>
  
          <g v-for="i in 3" :transform="`rotate(${360 / 3 * i})`" :clip-path="`url(#rect)`">
            <rect x="-205" y="-205" width="410" height="410" :stroke="blue" fill="none"></rect>
            <rect x="-210" y="-210" width="420" height="420" :stroke="blue" fill="none"></rect>
          </g>
  
          <!--       <circle cx="0" cy="0" :r="`${210 / Math.sin(Math.PI / 4)}`" :stroke="blue" fill="none"></circle>
        <circle cx="0" cy="0" :r="`${210 / Math.sin(Math.PI / 4) + 5}`" :stroke="blue" fill="none"></circle> -->
          <g :transform="`rotate(${360 / 24})`">
            <text v-for="(font, i) in zodiac" font-family="Droid Sans" font-size="42.5" dy="0.35em" text-anchor="middle" :transform="`rotate(${360 / 12 * i})`" stroke="none" :fill="blue">
              <textPath xlink:href="#symbol">
                {{font}}
              </textPath>
            </text>
          </g>
  
          <g>
            <!-- outer circle -->
            <circle dx="0" dy="0" :r="`${420 * Math.sqrt(2) / 2}`" fill="none" :stroke="blue"></circle>
          </g>
  
          <g>
            <circle dx="0" dy="0" :r="`${480 * Math.sqrt(2) / 2}`" fill="none" :stroke="blue"></circle>
            <circle dx="0" dy="0" :r="`${480 * Math.sqrt(2) / 2 - 5}`" fill="none" :stroke="blue"></circle>
            <circle dx="0" dy="0" :r="`${480 * Math.sqrt(2) / 2 - 13}`" fill="none" :stroke="blue"></circle>
          </g>
  
          <g>
            <!-- outer circle with pading i'm lazy so...-->
            <path v-for="i in 24" :transform="`rotate(${i * 360 / 24})`" :d="`M 0 -${420 * Math.sqrt(2) / 2 + 5} l 0 -20 A ${420 * Math.sqrt(2) / 2 + 25} ${420 * Math.sqrt(2) / 2 + 25} 0 0 1 ${(420 * Math.sqrt(2) / 2 + 25) * Math.sin(360 / 24 * Math.PI / 180)} ${(420 * Math.sqrt(2) / 2 + 25) * -Math.cos(360 / 24 * Math.PI / 180)} l -${20 * Math.sin(360 / 24 * Math.PI / 180)} ${20 * Math.cos(360 / 24 * Math.PI / 180)} A ${420 * Math.sqrt(2) / 2 + 5} ${420 * Math.sqrt(2) / 2 + 5} 0 0 0 0 -${420 * Math.sqrt(2) / 2 + 5}`" fill="none" :stroke="blue"></path>
          </g>
  
          <g>
            <!-- text in circles -->
            <text dy="-0.3em" font-family="" text-anchor="middle" v-for="i in 12" :transform="`rotate(${360 / 12 * i})`" :fill="blue" stroke="none">
              <textPath xlink:href="#text" startOffset="50%">
                reve {{String.fromCharCode(9800 + i)}} land
              </textPath>
            </text>
          </g>
  
          <g>
            <!-- outer text: south, north and so on-->
            <g v-for="(c, i) in ['西','北','东','南']" :transform="`translate(0, ${480 * Math.sqrt(2) / 2 - 20}) rotate(${90 * i}, 0, -${480 * Math.sqrt(2) / 2 - 20})`">
              <circle x=0 y=0 r="20" :fill="background" :stroke="blue"></circle>
              <text dy="0.35em" text-anchor="middle" stroke="none" :fill="blue" font-family="Direction" font-size="30">{{c}}</text>
            </g>
          </g>
  
          <g :transform="`rotate(90, 0, -${95 + (480 * Math.sqrt(2) / 2 - 95) / 2})`">
            <!--moon -->
            <path :d="`M 0 -95 A ${(480 * Math.sqrt(2) / 2 - 95) / 2} ${(480 * Math.sqrt(2) / 2 - 95) / 2} 0 1 1 0.0001 -95 z M 0 -100 A ${(480 * Math.sqrt(2) / 2 - 105) / 2} ${(480 * Math.sqrt(2) / 2 - 105) / 2} 0 1 0 -0.0001 -100 z`" :stroke="blue" :fill='background' fill-rule="evenodd"></path>
            <path :d="`M 0 -100 A ${(480 * Math.sqrt(2) / 2 - 100) / 2 * 2 / 3} ${(480 * Math.sqrt(2) / 2 - 100) / 2 * 2 / 3} 0 1 1 0.0001 -100 z M 0 -100 A ${(480 * Math.sqrt(2) / 2 - 100) / 2 / 2} ${(480 * Math.sqrt(2) / 2 - 100) / 2 / 2} 0 1 1 0.0001 -100 z`" :stroke="blue" :fill="background" fill-rule="evenodd"></path>
          </g>
  
        </g>
        <!--outer most-->
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 800,
      height: 800,
      zodiac: Array(12).fill(0).map((_, i) => String.fromCharCode(9800 + i)),
      background: 'black',
      blue: '#1553bc',
      std: 0
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


@font-face {
  font-family: 'Direction';
  src: url('https://cdn.rawgit.com/reverland/blank/0aba7d84/mohojin-chinese-direction/Mohojin Chinese Direction.woff') format('woff'), /* chrome、firefox */
  url('https://cdn.rawgit.com/reverland/blank/0aba7d84/mohojin-chinese-direction/Mohojin%20Chinese%20Direction.ttf') format('truetype');
  /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
}

#mod-magic{
  height: 700px;
  width: 700px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  >.magic-svg {
    transform-style: preserve-3d;
    height: 100%; // transform: rotateX(80deg) translateY(600px) scale(1.5);
    transition: all 0.5s ease-in;
  }
  >.magic-img{
    &:hover {
      transform: translateY(-20px);
      +.magic-svg {
        transform: rotateX(70deg) translateY(600px) scale(2);
      }
    }
    transition: all 0.2s ease-in;
    cursor: pointer;
    height: 100%;
    background-image: url("../assets/bc.png");
    background-position: center;
    background-size: cover;
    width: 100%;
    position: absolute;

    transform-style: preserve-3d;
    left: 0;
    top: 0;
    z-index: 1;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}

svg {
  animation: 20s rotate infinite linear;
  width: 700px;
  height: 700px;
}
</style>
