const { performance } = window;

const ownPerformance = {
  isDisabled: process.env.NODE_ENV === "production",

  statistics: {
    wrongRenderCounter: 0,
    totalTime: {}
  },

  start(markName) {
    if (this.isDisabled) {
      return;
    }

    performance.mark(`${markName} start`);
  },

  end(markName) {
    if (this.isDisabled) {
      return;
    }

    performance.mark(`${markName} end`);
    this.measure(markName);
  },

  measure(markName) {
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
      totalTime: {}
    };
  },

  startTracking() {
    this.isDisabled = false;
  },

  stopTracking() {
    this.isDisabled = true;
  },

  print() {
    console.log("Wrong render counter: ", this.statistics.wrongRenderCounter); // eslint-disable-line no-console
    console.log("Total time: ", this.statistics.totalTime); // eslint-disable-line no-console
  }
};

window.performance_OwnReact = ownPerformance;

export default ownPerformance;
