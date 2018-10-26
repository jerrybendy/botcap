<template>
  <nav id="nav">
    <button class="op-btn disabled"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z" fill="#5f6368"/></svg></button>
    <button class="op-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z" fill="#5f6368"/></svg></button>
    <button class="op-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 388c-72.597 0-132-59.405-132-132 0-72.601 59.403-132 132-132 36.3 0 69.299 15.4 92.406 39.601L278 234h154V80l-51.698 51.702C348.406 99.798 304.406 80 256 80c-96.797 0-176 79.203-176 176s78.094 176 176 176c81.045 0 148.287-54.134 169.401-128H378.85c-18.745 49.561-67.138 84-122.85 84z" fill="#5f6368"/></svg></button>
    <div class="address active">
      <div class="security-identifier is-security"></div>
      <hr class="address-separate">
      <div class="address-url address-url-view">
        <span class="address-protocol">https</span>
        <span class="address-slash">://</span>
        <span class="address-host">www.baidu.com</span>
        <span class="address-path">/jerrybendy/iw-player/blob/master/package.json</span>
      </div>
      <div class="address-url address-url-edit">
        <input type="text" class="address-input" value="https://www.baidu.com/jerrybendy/iw-player/blob/master/package.json">
      </div>
    </div>
    <button class="op-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 136c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0 240c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0-120c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40z" fill="#5f6368"/></svg></button>
  </nav>
</template>

<script>
    export default {
        name: "Navigation"
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

  #nav .address {
    flex: 1;
    display: flex;
    align-items: center;
    height: 28px;
    padding: 0 10px;
    border-radius: 14px;
    border: 2px solid transparent;
    background: #f1f3f4;
    transition: background .2s linear;
    cursor: text;
  }

  #nav .address.active {
    border-color: #b3d7fd;
    background: #FFF;
    transition: none;
  }

  #nav .address:not(.active):hover {
    background: #e8eaed;
  }

  #nav .security-identifier {
    width: 16px;
    height: 16px;
    background: url(../../shared/images/shell-window-address-info.svg);
  }

  #nav .security-identifier.is-security {
    background-image: url(../../shared/images/shell-window-address-lock.svg);
  }

  #nav .address-separate {
    display: block;
    border: none;
    outline: none;
    width: 1px;
    height: 16px;
    background: #9d9e9f;
    margin: 0 8px;
  }

  #nav .address-url {
    display: none;
    flex: 1;
    height: 100%;
    font-size: 14px;
    align-items: center;
  }

  #nav .address-url * {
    user-select: text;
  }

  #nav .address:not(.active) .address-url-view {
    display: flex !important;
    width: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #nav .address.active .address-url-edit {
    display: flex !important;
  }

  #nav .address-protocol {
    color: #5f6368;
  }

  #nav .address-slash,
  #nav .address-path {
    color: #80868b;
  }

  #nav .address-host {
    color: #202124;
  }

  #nav .address-input {
    display: block;
    width: 100%;
    height: 100%;
    background: #FFF;
    font-size: 14px;
    padding: 0;
    border: none;
    outline: none;
  }
</style>