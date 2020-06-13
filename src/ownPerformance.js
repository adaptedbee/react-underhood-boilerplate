const { performance } = window;

const ownPerformance = {
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

    return duration;
  }
};

export default ownPerformance;
