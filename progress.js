class scrollbar {
    constructor() {
        this.scrollbar = document.querySelector('.__scroll');

        this.update();
    }

    update() {
        if (window.innerWidth < responsive_breakpoint) return false;

        this.windowHeight = window.innerHeight;
        this.documentHeight = document.body.scrollHeight;
        this.progressHeight = this.documentHeight - this.windowHeight;
        this.progressValue = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        // If the current max value differs from the new calculated length, update it's max value
        this.scrollbar.getAttribute('max') != this.progressHeight && this.scrollbar.setAttribute('max', this.progressHeight);
        this.scrollbar.setAttribute('value', this.progressValue);
    }
};

const scroll = new scrollbar();


window.addEventListener('scroll', _ => {
    const topDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
      bottomDistance = Math.max(document.body.offsetHeight - (topDistance + window.innerHeight), 0);

    document.body.classList.toggle('_bottom', bottomDistance == 0);
    scroll.update();

}
window.addEventListener('resize', _ => {
    scroll.update();
}, {passive: true});

window.addEventListener('orientationchange', _ => {
    scroll.update();
}

document.querySelector('.__scroll').addEventListener('click', function(event) {
  let yOffset = event.clientY,
    progressHeight = this.clientWidth;

  // The progress bar value times the percent of the click offset over the progress bar height
  window.scroll({ top: Math.round((scroll.progressHeight) * yOffset / progressHeight), left: 0, behavior: 'smooth' });
});
