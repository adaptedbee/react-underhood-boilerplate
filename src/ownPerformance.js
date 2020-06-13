const { performance } = window;

const ownPerformance = {
  statistics: {
    wrongRenderCounter: 0,
    totalTime: {},
    isDisabled: false
  },

  start(markName) {
    performance.mark(`${markName} start`);
  },

  end(markName) {
    performance.mark(`${markName} end`);
  },

  measure(markName) {
    if (this.statistics.disabled) {
      return;
    }

    const { duration } = performance.measure(
      `${markName} measure`,
      `${markName} start`,
      `${markName} end`
    );

    if (!this.statistics.totalTime[markName]) {
      this.statistics.totalTime[markName] = duration;
    } else {
      this.statistics.totalTime[markName] += duration;
    }
  },

  clear() {
    this.statistics = {
      wrongRenderCounter: 0,
      totalTime: {},
      isDisabled: false
    };
  },

  startTracking() {
    this.statistics.disabled = false;
  },

  stopTracking() {
    this.statistics.disabled = true;
  },

  print() {
    console.log("Wrong render counter: ", this.statistics.wrongRenderCounter); // eslint-disable-line no-console
    console.log("Total time: ", this.statistics.totalTime); // eslint-disable-line no-console
  }
};

window.performance_OwnReact = ownPerformance.statistics;

export default ownPerformance;
