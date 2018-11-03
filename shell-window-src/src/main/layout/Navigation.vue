<template>
  <nav id="nav">
    <button @click="goBack" class="op-btn" :class="{disabled: !currentPage.canGoBack}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z" fill="#5f6368"/></svg></button>
    <button @click="goForward" class="op-btn" :class="{disabled: !currentPage.canGoForward}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z" fill="#5f6368"/></svg></button>
    <button @click="refresh" class="op-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 388c-72.597 0-132-59.405-132-132 0-72.601 59.403-132 132-132 36.3 0 69.299 15.4 92.406 39.601L278 234h154V80l-51.698 51.702C348.406 99.798 304.406 80 256 80c-96.797 0-176 79.203-176 176s78.094 176 176 176c81.045 0 148.287-54.134 169.401-128H378.85c-18.745 49.561-67.138 84-122.85 84z" fill="#5f6368"/></svg></button>

    <address-frame
      :url="currentPage.url"
    ></address-frame>

    <main-menu-button></main-menu-button>
  </nav>
</template>

<script>
  import AddressFrame from '../components/AddressFrame'
  import MainMenuButton from '../components/MainMenuButton'

  export default {
    name: "Navigation",
    components: {
      AddressFrame,
      MainMenuButton,
    },
    computed: {
      currentPage() {
        return this.$store.getters.currentPage
      }
    },
    methods: {
      goBack() {
        this.$root.$emit('navigate', 'BACK')
      },
      goForward() {
        this.$root.$emit('navigate', 'FORWARD')
      },
      refresh() {
        this.$root.$emit('navigate', 'REFRESH')
      }
    }
  }
</script>

<style>

  #nav {
    display: flex;
    align-items: center;
    height: 37px;
    padding: 0 8px 0 4px;
    background: #FFF;
    border-bottom: 1px solid #b6b4b6;
  }

  #nav .op-btn {
    display: block;
    width: 28px;
    height: 28px;
    padding: 5px;
    margin: 0 4px;
    border-radius: 50%;
    transition: background .2s linear;
  }

  #nav .op-btn.disabled {
    opacity: .4;
  }

  #nav .op-btn:not(.disabled):hover {
    background: #eee;
  }

  #nav .op-btn:not(.disabled):active {
    background: #e1e1e2;
  }

  #nav .op-btn svg {
    width: 18px;
    height: 18px;
  }

</style>