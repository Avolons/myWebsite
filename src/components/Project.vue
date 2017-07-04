<template>
    <div class="mod-project">
        <bcline></bcline>
    <div class="calendar">
        
        <div class="indicator"></div>
        <div class="overlay"></div>
        <ol class="round-list years"></ol>
        <ol class="round-list months"></ol>
        <ol class="round-list days"></ol>
        <div class="details">
            <h1>Events</h1>
            <ul class="events-container">
                <li data-date="June 2, 2019" class="event current">
                    <h2 class="event-title">Rooftop Cinema: Trouble Makers</h2>
                    <p class="event-date">at 9:00 PM</p>
                </li>
                <li data-date="September 21, 2030" class="event">
                    <h2 class="event-title">Rooftop Cinema: Trouble Makers</h2>
                    <p class="event-date">at 9:00 PM</p>
                </li>
                <li data-date="February 28, 2025" class="event">
                    <h2 class="event-title">Rooftop Cinema: Trouble Makers</h2>
                    <p class="event-date">at 9:00 PM</p>
                </li>
            </ul>
            <a href="#">Go To Event</a>
            <ul class="dots">
                <li class="current"></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
    </div>
    
</template>

<script>
import bcline from './Line';
import $ from 'jquery';
export default {
    name: 'name',
    data: function () {
        return {}
    },
    methods: {},
    components:{
        bcline
    },
    mounted() {
        var $days = $('.round-list.days');
        var $months = $('.round-list.months');
        var $years = $('.round-list.years');
        var $events = $('.events-container');
        var $dots = $('.dots');


        populateCalendar();
        positionDigits();
        showEvent(0);

        $dots.on('click', 'li', function () {
            showEvent($(this).index());
        });


        function showEvent(index) {
            var $event = $events.children().eq(index);
            $events.children().removeClass('current move-left');
            $event.addClass('current').prevAll().addClass('move-left');
            $dots.children().removeClass('current').eq(index).addClass('current');

            var date = new Date($event.data('date'));
            rotateListToDigit($days, date.getDate());
            rotateListToDigit($months, date.getMonth());
            rotateListToDigit($years, date.getFullYear());

        }


        function rotateListToDigit(list, digit) {
            var current = list.children(`[data-value="${digit}"]`).addClass('current');
            var angleDelta = 360 / list.children().length;
            var rotation = -angleDelta * current.index();
            current.siblings().removeClass('current');
            list.css('transform', `rotate(${rotation}deg)`);
        }


        function populateCalendar() {
            // populate days
            for (let i = 1; i <= 31; i++) {
                $days.append(`<li data-value="${i}">${i}</li>`);
            }
            // populate months
            'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')
                .forEach((month, i) =>
                    $months.append(`<li data-value="${i}">${month}</li>`));
            // populate years
            var year = (new Date()).getFullYear();
            for (let i = 0; i < 18; i++) {
                $years.append(`<li data-value="${year + i}">${year + i}</li>`);
            }
        }


        function positionDigits() {
            // position days digits
            positionDigitsOf($days);
            positionDigitsOf($months);
            positionDigitsOf($years);
        }


        function positionDigitsOf(list) {
            var angleDelta = 360 / list.children().length;
            list.children().each(function (i) {
                var angle = 180 - angleDelta * i;
                var position = getPointAtAngle(angle, list.width() / 2);
                positionDigitAt($(this), position, angle);
            });
        }


        function positionDigitAt(digit, position, angle) {
            var transform = [
                `translate(${position.x}px, ${position.y}px)`,
                `rotate(${180 - angle}deg)`
            ];
            digit.css('transform', transform.join(' '));
        }


        function getPointAtAngle(angle, distance) {
            angle = deg2rad(angle);
            return { x: Math.sin(angle) * distance, y: Math.cos(angle) * distance };
        }


        function deg2rad(angle) {
            return angle * (Math.PI / 180);
        }


        function rad2deg(angle) {
            return angle * (180 / Math.PI);
        }

    }
}
</script>

<style  lang='stylus'>
    /** Mixin Definitions **/
center-children() {
    display: flex;
    justify-content: center;
    align-items: center;
}

set-position(position, top, right=top, bottom=top, left=right) {
    position: position;
    top: top;
    left: left;
    right: right;
    bottom: bottom;
}


/** Base Styles **/
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


.mod-project{
    center-children();
    height: 100vh;
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
    line-height: 1;
}


ol,
ul {
    list-style: none;
}


/** Base Calendar Styles **/
.calendar {
    perspective 800px;
    flex-shrink: 0;
    width: 71rem;
    height: 71rem;
    padding: 3rem;
    position: relative;
    border-radius: 50%;
    // background-color: #000;
    background-clip: content-box;
    overflow: hidden;

    &::before {
        content: "";
        set-position(absolute, 3rem);
        border-radius: 50%;
        // background: #000 url("http://i1067.photobucket.com/albums/u422/arnellebalane/background_zpswabqqadm.jpg") center center no-repeat;
        opacity: 0.05;
    }
}


.calendar * {
    flex-shrink: 0;
}


/** Round List Styles **/
.round-list {
    border-radius: 50%;
    color: #fff;
    transition: transform 500ms ease-out;

    &.years {
        set-position(absolute, 1.25rem);
    }

    &.months {
        set-position(absolute, 7rem);
    }

    &.days {
        set-position(absolute, 13.5rem);
    }
}


.round-list li {
    position: absolute;
    text-align: center;
    transition: color 500ms ease-out;

    &.current {
        color: #fff;
    }
}
.round-list.days li {
    width: 1.8rem;
    top: calc(50% - 0.8rem);
    left: calc(50% - 0.9rem);
    font-size: 1.5rem;
}
.round-list.months li {
    width: 5rem;
    top: calc(50% - 0.8rem);
    left: calc(50% - 2.5rem);
    font-size: 1.6rem;
    text-indent: 0.5rem;
    letter-spacing: 0.5rem;
    text-transform: uppercase;
}
.round-list.years li {
    width: 8.6rem;
    top: calc(50% - 1rem);
    left: calc(50% - 4.3rem);
    font-size: 2rem;
    text-indent: 0.5rem;
    letter-spacing: 1rem;
}
/** Event Details Styles **/
.details {
    center-children();
    set-position(absolute, 20.5rem);
    flex-direction: column;
    border: 2px solid #6e6424;
    border-radius: 50%;
    font-size: 1.4rem;
}

.details h1 {
    margin-bottom: 2.4rem;
    font-weight: 100;
    text-transform: uppercase;
    font-size: 1.4rem;
    letter-spacing: 0.8rem;
    color: #fff;
    opacity: 0.2;
}
.details a {
    display: inline-block;
    margin-top: 2rem;
    color: #dbbf32;
}

.events-container {
    width: 100%;
    height: 5rem;
    position: relative;
    overflow: hidden;
}

.events-container .event {
    set-position(absolute, 0);
    text-align: center;
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
    transition: transform 500ms ease-out,
        visibility 300ms ease-out,
        opacity 300ms ease-out;

    &.current {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
    }
    &.move-left {
        transform: translateX(-100%);
    }
}


.event .event-title {
    padding: 0 5rem;
    margin-bottom: 0.3rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: #fff;
}


.event .event-date {
    color: #fff;
}


.dots {
    display: flex;
    margin-top: 2rem;
}


.dots li {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0 0.25rem;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.2;
    cursor: pointer;

    &.current {
        background-color: #e6cf59;
        opacity: 1;
    }
}


/** Indicator Styles **/
.indicator {
    set-position(absolute, 2.9rem);
    border-radius: 50%;
    overflow: hidden;
    pointer-events: none;

    &::before,
    &::after {
        content: "";
        position: absolute;
    }

    &::before {
        border-top: 14.5rem solid #e5e91e;
        border-left: 6.5rem solid transparent;
        border-right: 6.5rem solid transparent;
        top: 0
        left: calc(50% - 6.5rem);
    }

    &::after {
        height: 3.6rem;
        border-left: 2px solid #e5e91e;
        top: 14rem;
        left: calc(50% - 1px);
    }
}


/** Overlay Styles **/
.overlay {
    set-position(absolute, 3rem);
    border-radius: 50%;

    &::before,
    &::after {
        content: "";
        set-position(absolute, 0);
        border-radius: 50%;
    }

    &::before {
        background-image: linear-gradient(top left, #ff671b, transparent 40%, transparent)
        opacity: 0.15;
    }

    &::after {
        background-image: linear-gradient(bottom left, #5eade4, transparent 50%, transparent);
        opacity: 0.15;
    }
}

</style>