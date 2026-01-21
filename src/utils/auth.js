export default class Auth {
  static generatePassword() {
    return `Pass${Math.random().toString(36).substring(2, 12)}@123`;
  }
}
