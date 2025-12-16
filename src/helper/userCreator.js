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
}
