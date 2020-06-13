const { performance } = window;

const ownPerformance = {
  statistics: {
    wrongRenderCounter: 0,
    totalTime: {}
  },

  start(markName) {
    performance.mark(`${markName} start`);
  },

  end(markName) {
    performance.mark(`${markName} end`);
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
  }
};

window.performance_OwnReact = ownPerformance.statistics;

export default ownPerformance;
