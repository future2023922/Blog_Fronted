const moon = {
  state: {
    treasure: false
  },
  setTreasure(treasure) {
    this.state.treasure = treasure
    console.log('set', this.state.treasure)
  }
};
export default moon


