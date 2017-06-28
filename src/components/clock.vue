<template>
    <div id="mod-clock">
        <svg class="alarmSVG" viewBox="0 0 320 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <path id="bell" d="M18.3,18.7h-6.2c-0.2,1.2-1.4,2.1-3,2.1c-1.6,0-2.8-0.9-3-2.1H0v-2.7c2.1-1.1,2.6-2.7,2.7-3.6c0,0,0-4,0-4.3
              c0-3.1,2.2-5.7,5.1-6.3V1.4C7.8,0.6,8.4,0,9.2,0c0.8,0,1.4,0.6,1.4,1.4V2c2.7,0.6,4.8,2.9,5,5.7l0,4.9c0.1,0.9,0.6,2.4,2.8,3.5V18.7
              z" />
                <g class="timeLabelGroup">
                    <text class="timeLabel" />
                    <rect class="timeLabelBtn" width="40" height="40" y="-30" x="-15" fill="transparent" />
                </g>
            </defs>
            <line opacity="1" class="dottedLine" x1="50%" x2="50%" y1="369" y2="450" stroke-dasharray="6 6" stroke="#7e7e7e" />
            <g class="maskedTimeScale">
                <g class="timeScaleGroup">
                    <rect class="timeScaleHit" width="2880" x="160" height="160" y="400" fill="transparent" />
                    <g class="timeScaleMarkerGroup" />
                    <g class="alarmBell" opacity="0">
                        <use x="151" y="468" xlink:href="#bell" fill="#3498DB" />
                    </g>
                </g>
            </g>
            <g class="clockGroup" stroke="#7e7e7e">
                <circle cx="50%" cy="140" r="80" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" />
                <line class="minuteHand" stroke="#D6DADD" x1="50%" y1="140" x2="50%" y2="75" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" />
                <line class="hourHand" stroke="#D6DADD" x1="50%" y1="140" x2="50%" y2="105" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="5" />
                <circle class="centerDot" cx="50%" cy="140" r="4" fill="#212121" stroke="#D6DADD" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" />
                <circle class="clockDragger" cx="50%" cy="99" r="70" fill="transparent" stroke-width="0" />
            </g>
            <text class="meridianLabel" x="50%" y="290">--</text>
            <clipPath id="bellBtnMask">
                <rect class="bellBtnMask" width="105" height="42" x="108" y="319" fill="red" stroke="#D6DADD" rx="8" stroke-width="0" />
            </clipPath>
            <g class="bellBtnHitCirc" clip-path="url(#bellBtnMask)" />
            <g class="bellBtn">
                <rect class="bellBtnRect" width="105" height="42" x="108" y="319" fill="transparent" stroke="#D6DADD" rx="8" stroke-width="2" />
                <text class="bellBtnLabel" x="50%" y="348">SET ALARM</text>
            </g>
        </svg>
    </div>
</template>
<script>
import { TweenMax, Power2, TimelineLite } from "gsap";
import Draggable from "gsap/Draggable";

export default {
    name: 'name',
    data: function () {
        return {}
    },
    methods: {},
    mounted() {
        var xmlns = "http://www.w3.org/2000/svg",
            xlinkns = "http://www.w3.org/1999/xlink",
            select = function (s) {
                return document.querySelector(s);
            },
            selectAll = function (s) {
                return document.querySelectorAll(s);
            },
            bellBtnHitCirc = select('.bellBtnHitCirc'),
            alarmSVG = select('.alarmSVG'),
            bellBtnLabel = select('.bellBtnLabel'),
            alarmBell = select('.alarmBell'),
            bellBtn = select('.bellBtn'),
            clockGroup = select('.clockGroup'),
            dottedLine = select('.dottedLine'),
            meridianLabel = select('.meridianLabel'),
            hourHand = select('.hourHand'),
            minuteHand = select('.minuteHand'),
            timeLabel = select('.timeLabel'),
            timeLabelGroup = select('.timeLabelGroup'),
            timeScaleGroup = select('.timeScaleGroup'),
            timeScaleMarkerGroup = select('.timeScaleMarkerGroup'),
            maxMinutes = 1440,
            maxHours = 24,
            timeScaleInterval = 60,
            minutesInHour = 60,
            centerX = 160,
            minuteHandMaxRotation = 360 * maxHours,
            timeStep = 5,
            hourRotationStep = 360 / 12,
            timeScaleMarkerColor = '#7e7e7e',
            multiplier = 2,
            timeScaleMarkers = 5,
            maxDrag = maxMinutes * multiplier,
            alarmBellOffsetX = 151,
            alarmSetPosX,
            alarmIsSet = false,
            initTime = 7.5,
            selectedColor = '#3498DB',
            pt

        TweenMax.set('svg', {
            visibility: 'visible'
        })
        TweenMax.set([hourHand, minuteHand], {
            transformOrigin: '50% 100%'
        })

        TweenMax.set('.timeScaleHit', {
            width: maxDrag
        })
        TweenMax.set(clockGroup, {
            y: -20
        })

        /* TweenMax.set(bellBtn, {
         svgOrigin:'160 350',
         scale:3
        }) */

        TweenMax.set(alarmBell, {
            attr: {
                x: alarmBellOffsetX
            }
        })

        function makeTimeScale() {

            var marker, labelGroup

            for (var i = 0; i <= maxMinutes; i++) {
                //console.log(i % 5) 
                marker = document.createElementNS(xmlns, 'line');
                timeScaleMarkerGroup.appendChild(marker);

                var posX = centerX + (i * multiplier);

                if (i % timeScaleInterval == 0) {

                    labelGroup = timeLabelGroup.cloneNode(true);
                    timeScaleMarkerGroup.appendChild(labelGroup);
                    labelGroup.querySelector('.timeLabelBtn').setAttribute('data-btnId', i / minutesInHour);
                    TweenMax.set(marker, {
                        attr: {
                            x1: posX,
                            x2: posX,
                            y1: 460,
                            y2: 440
                        },
                        stroke: timeScaleMarkerColor,
                        strokeWidth: 1
                    })

                    TweenMax.set(labelGroup, {
                        x: posX,
                        y: 435
                    })

                    labelGroup.querySelector('.timeLabel').textContent = String(i / minutesInHour);

                    //every 30 minutes
                } else if (i % (minutesInHour / 2) == 0) {

                    TweenMax.set(marker, {
                        attr: {
                            x1: posX,
                            x2: posX,
                            y1: 460,
                            y2: 445
                        },
                        stroke: timeScaleMarkerColor,
                        strokeWidth: 1
                    })
                    //every timeScaleMarkers minutes (5)
                } else if (i % timeScaleMarkers == 0) {

                    TweenMax.set(marker, {
                        attr: {
                            x1: posX,
                            x2: posX,
                            y1: 460,
                            y2: 450
                        },
                        stroke: timeScaleMarkerColor,
                        strokeWidth: 1
                    })
                } else {

                    timeScaleMarkerGroup.removeChild(marker);
                }

            }
        }


        var timeDraggable = Draggable.create(timeScaleGroup, {
            type: 'x',
            bounds: {
                maxX: 0,
                minX: (-maxDrag)
            },
            onDrag: dragUpdate,
            onThrowUpdate: dragUpdate,
            snap: function (endValue) {
                return Math.round(endValue / timeStep) * timeStep;
            },
            throwProps: true,
            dragClickables: true,
            maxDuration: 0.8,
            overshootTolerance: 0
        })

        function dragUpdate() {

            /* if(alarmIsSet){
              return;
             }  */
            var dragPosX = Math.round(timeScaleGroup._gsTransform.x / multiplier),
                minuteHandPercent = Math.abs(dragPosX / maxMinutes),
                minuteHandRotation = minuteHandPercent * minuteHandMaxRotation,
                hourHandPercent = Math.abs((dragPosX / maxMinutes) * maxHours),
                hourHandRotation = hourHandPercent * hourRotationStep,
                digitalMinutes, digitalTime,
                digitalHours;

            //console.log(hourHandPercent)

            TweenMax.to(minuteHand, 0.5, {
                rotation: minuteHandRotation,
                ease: Elastic.easeOut.config(0.3, 0.8)
            })
            /*TweenMax.to(clockDragger,0.1, {
             rotation:-minuteHandRotation
            })*/
            TweenMax.to(hourHand, 0.5, {
                rotation: hourHandRotation,
                ease: Elastic.easeOut.config(0.3, 0.8)
            })

            //console.log((minuteHandRotation % 360)/6 )
            digitalMinutes = Math.round((minuteHandRotation % 360) / 6);
            //digitalMinutes = digitalMinutes % timeStep;
            //console.log(digitalMinutes);
            digitalMinutes = (digitalMinutes == 60) ? '00' : digitalMinutes;
            digitalMinutes = (digitalMinutes >= 0 && digitalMinutes < 10) ? '0' + digitalMinutes : digitalMinutes;

            digitalHours = digitalHours = Math.floor(hourHandPercent);
            digitalHours = (digitalHours >= 0 && digitalHours < 10) ? '0' + digitalHours : digitalHours;
            digitalHours = (digitalHours > 23) ? '00' : digitalHours;

            digitalTime = digitalHours + ':' + digitalMinutes;
            //console.log(digitalMinutes)
            // meridianLabel.textContent = (hourHandPercent >=(maxHours/2) && hourHandPercent < maxHours) ? digitalTime+ ' PM' :digitalTime+ ' AM';

            //dotted line raise
            var diff = Math.abs(hourHandPercent - Math.round(hourHandPercent));
            //
            TweenMax.to(dottedLine, 0.1, {
                attr: {
                    y2: (diff > 0.2) ? 445 : 400
                }
            })


            meridianLabel.textContent = (hourHandPercent >= (maxHours / 2) && hourHandPercent < maxHours) ? digitalTime : digitalTime;


        }



        function getLiveSnap(step) {
            timeDraggable[0].vars.snap = null;
            timeStep = step * multiplier;
            //timeDraggable[0].vars.throwProps = false;
            timeDraggable[0].vars.liveSnap = function (endValue) {
                return Math.round(endValue / timeStep) * timeStep;
            }

            timeDraggable[0].update(true);
        }

        function getSnap(step) {
            timeDraggable[0].vars.liveSnap = null;
            timeStep = step * multiplier;

            timeDraggable[0].vars.snap = function (endValue) {
                return Math.round(endValue / timeStep) * timeStep;
            }

            timeDraggable[0].update(true);
        }

        /* function clickNextDay(e){
         TweenMax.to(timeScaleGroup, 0.1, {
          x:0,
          onComplete:dragUpdate
         })
        } */

        function init() {

            //send it to 06:30 to start with
            TweenMax.to(timeScaleGroup, 1, {
                x: -initTime * (timeScaleInterval * multiplier),
                onUpdate: dragUpdate,
                ease: Power3.easeOut
            })
            getSnap(timeStep);

        }



        function docClick(e) {

            var klass = e.target.getAttribute('class');
            //console.log(e.target.getAttribute('class'))
            if (klass) {
                if (klass == "timeLabelBtn") {
                    var btnId = Number(e.target.getAttribute('data-btnId'));
                    //console.log(btnId);

                    TweenMax.to(timeScaleGroup, 0.41, {
                        x: -btnId * (timeScaleInterval * multiplier),
                        onUpdate: dragUpdate,
                        ease: Power3.easeOut
                    })
                }
            }
        }
        document.onclick = docClick;

        function clickBellBtn(e) {
            pt = alarmSVG.createSVGPoint();
            var loc = cursorPoint(e);
            //console.log(loc.x) 
            var circ = document.createElementNS(xmlns, 'circle');
            circ.setAttribute('cx', loc.x);
            circ.setAttribute('cy', loc.y);
            circ.setAttribute('r', 6);
            circ.setAttribute('fill', '#7e7e7e');
            bellBtnHitCirc.appendChild(circ);
            TweenMax.to(circ, 0.6, {
                attr: {
                    r: 40
                },
                alpha: 0,
                onComplete: function () {
                    bellBtnHitCirc.removeChild(this.target)
                }
            })

            alarmIsSet = !alarmIsSet;

            //unset it all
            if (!alarmIsSet) {
                TweenMax.set(['.meridianLabel'], {
                    fill: '#D6DADD'
                })
                TweenMax.to('.bellBtnRect', 1, {
                    width: 105,
                    attr: {
                        x: 108
                    },
                    ease: Elastic.easeOut.config(0.6, 0.255),
                    onStart: function () {
                        bellBtnLabel.textContent = 'SET ALARM';
                    }
                })
                TweenMax.set(alarmBell, {
                    x: -2000
                })
                timeDraggable[0].enable();
                document.onclick = docClick;
                dragUpdate();
                TweenMax.to([clockGroup, '.timeScaleMarkerGroup'], 0.6, {
                    alpha: 1
                })
                TweenMax.set('.timeLabelGroup', {
                    cursor: 'pointer'
                })

            } else {
                timeDraggable[0].disable();
                document.onclick = null;
                TweenMax.set(['.meridianLabel'], {
                    fill: selectedColor
                })
                TweenMax.set('.timeScaleMarkerGroup', {
                    alpha: 0.2
                })

                TweenMax.set('.timeLabelGroup', {
                    cursor: 'auto'
                })
                alarmSetPosX = timeScaleGroup._gsTransform.x;
                var tl = new TimelineMax();
                tl.set(alarmBell, {
                    x: -alarmSetPosX,
                    alpha: 1
                })
                    .from(alarmBell, 0.9, {
                        scale: 0,
                        transformOrigin: '50% 0%',
                        ease: Elastic.easeOut.config(0.86, 0.55),
                        onComplete: dragUpdate
                    })
                    .to('.bellBtnRect', 1, {
                        width: 130,
                        attr: {
                            x: 95.5
                        },
                        ease: Elastic.easeOut.config(0.6, 0.255),
                        onStart: function () {
                            bellBtnLabel.textContent = 'UNSET ALARM';
                        }
                    })

            }

        }

        function cursorPoint(evt) {
            pt.x = evt.clientX;
            pt.y = evt.clientY;
            return pt.matrixTransform(alarmSVG.getScreenCTM().inverse());
        }

        bellBtn.onclick = clickBellBtn;
        makeTimeScale();
        init();
    }
}
</script>

<style scoped lang='scss'>
#mod-clock {
    text-align: center;
    height: 100%;
}

svg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    visibility: hidden;
    transform: translate(-50%, 0%);
}

.timeLabel,
.meridianLabel,
.bellBtnLabel,
.digitalTimeLabel {
    font-family: 'din-condensed-web', sans-serif;
    text-anchor: middle;
    fill: #7e7e7e;
    font-size: 40px;
}

.nextDayBtn,
.prevDayBtn {
    cursor: pointer;
    font-size: 21px;
}

.bellBtn text,
.nextDayBtn text,
.prevDayBtn text {
    font-size: 21px;
    fill: #D6DADD;
}

.meridianLabel {
    font-size: 72px;
    fill: #D6DADD;
}

.timeLabelGroup {
    cursor: pointer;
}

.timeLabelBtn .timeLabelGroup {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.bellBtn {
    cursor: pointer;
}

text {
    user-select: none;
    -webkit-user-select: none;
}
</style>