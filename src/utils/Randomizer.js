class Randomizer {
  static randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export default Randomizer;
