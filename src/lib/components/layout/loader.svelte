<div class="flex h-screen w-screen items-center justify-center">
  <div class="circle"></div>
</div>

<style>
  .circle {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    position: relative;
    border: 3px solid transparent;
    border-top-color: #ff3e00;
    border-radius: 50%;
    animation: circleSpin 2s linear infinite;
  }

  .circle::before,
  .circle::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: 3px solid transparent;
    border-radius: 50%;
  }

  .circle::after {
    border-top-color: #676778;
    top: 9px;
    left: 9px;
    right: 9px;
    bottom: 9px;
    animation: circleSpin 1.5s linear infinite;
  }

  .circle::before {
    border-top-color: #40b3ff;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    animation: circleSpin 3s linear infinite;
  }

  @keyframes circleSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
