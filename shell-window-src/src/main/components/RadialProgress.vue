<template>
  <div class="radial-progress" :data-progress="progress">
    <div class="circle">
      <div class="mask full">
        <div class="fill"></div>
      </div>
      <div class="mask half">
        <div class="fill"></div>
        <div class="fill fix"></div>
      </div>
    </div>
    <div class="inset">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RadialProgress",
    props: {
      progress: Number,
    }
  }
</script>

<style lang="less">
  /**
   * @see http://jsfiddle.net/mLA7X/11836/
   */

  .radial-progress {
    @circle-size: 28px;
    @circle-background: transparent;
    @circle-color: #3179db;
    @inset-size: 24px;
    @inset-color: #c9d8ec;
    @transition-length: 1s;

    width: @circle-size;
    height: @circle-size;

    background-color: @circle-background;
    border-radius: 50%;

    .circle {
      .mask, .fill {
        width: @circle-size;
        height: @circle-size;
        position: absolute;
        border-radius: 50%;
      }

      .mask, .fill {
        -webkit-backface-visibility: hidden;
        transition: transform @transition-length;
        border-radius: 50%;
      }

      .mask {
        clip: rect(0px, @circle-size, @circle-size, @circle-size/2);

        .fill {
          clip: rect(0px, @circle-size/2, @circle-size, 0px);
          background-color: @circle-color;
        }
      }
    }

    .inset {
      display: flex;
      align-items: center;
      justify-content: center;
      width: @inset-size;
      height: @inset-size;
      position: absolute;
      margin-left: (@circle-size - @inset-size)/2;
      margin-top: (@circle-size - @inset-size)/2;

      background-color: @inset-color;
      border-radius: 50%;
    }

    @i: 0;
    @increment: 180deg / 100;
    .loop (@i) when (@i <= 100) {
      &[data-progress="@{i}"] {
        .circle {
          .mask.full, .fill {
            transform: rotate(@increment * @i);
          }

          .fill.fix {
            transform: rotate(@increment * @i * 2);
          }
        }
      }
      .loop(@i + 1);
    }
    .loop(@i);
  }
</style>