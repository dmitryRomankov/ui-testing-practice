import Fakerator from 'fakerator';

const fakerator = Fakerator();

export default class UserCreator {
  static createUser() {
    const firstName = fakerator.names.firstName();
    const lastName = fakerator.names.lastName();

    return {
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      email: fakerator.internet.email(),
      address: `${fakerator.address.country()}, ${fakerator.address.city()}, ${fakerator.address.countryCode()}`,
      addressAnother: `${fakerator.address.country()}, ${fakerator.address.city()}, ${fakerator.address.countryCode()}`,
    };
  }

  static createFormData() {
    const firstName = fakerator.names.firstName();
    const lastName = fakerator.names.lastName();
    const genders = ['Male', 'Female', 'Other'];
    const subjects = ['Maths', 'Physics', 'Chemistry', 'English', 'Computer Science'];
    const hobbies = ['Sports', 'Reading', 'Music'];
    const states = {
      NCR: ['Delhi', 'Gurgaon', 'Noida'],
      'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
      Haryana: ['Karnal', 'Panipat'],
      Rajasthan: ['Jaipur', 'Jaiselmer'],
    };

    // Random selection helpers
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomSubjects = this.getRandomItems(subjects, Math.floor(Math.random() * 3) + 1);
    const randomHobbies = this.getRandomItems(hobbies, Math.floor(Math.random() * 3) + 1);
    const randomState = Object.keys(states)[Math.floor(Math.random() * Object.keys(states).length)];
    const randomCity = states[randomState][Math.floor(Math.random() * states[randomState].length)];

    // Generate random date of birth
    const year = String(1990 + Math.floor(Math.random() * 20));
    const month = String(Math.floor(Math.random() * 12));
    const day = String(Math.floor(Math.random() * 28) + 1);

    // Generate 10-digit mobile number
    const mobile = '9' + String(Math.floor(Math.random() * 900000000) + 100000000);

    return {
      firstName: firstName,
      lastName: lastName,
      email: fakerator.internet.email(),
      gender: randomGender,
      mobile: mobile,
      dateOfBirth: {
        day: day.padStart(2, '0'),
        month: month,
        year: year,
      },
      subjects: randomSubjects,
      hobbies: randomHobbies,
      currentAddress: `${fakerator.address.street()}, ${fakerator.address.city()}`,
      state: randomState,
      city: randomCity,
      picture: null, // Can be set externally if needed
    };
  }

  static getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  static generateInvalidEmail() {
    return 'invalid-email-format';
  }

  static generateInvalidMobile() {
    return '123'; // Less than 10 digits
  }
}
