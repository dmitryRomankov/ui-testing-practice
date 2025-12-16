let storage = {};

export default class DataStorage {
  static getStorage() {
    return storage;
  }

  static clearStorage() {
    storage = {};
  }

  static setNamespace(namespace, namespaceNumber, entity) {
    storage[`${namespace}_${namespaceNumber}`] = entity;
  }

  static getNamespace(namespace, namespaceNumber, options) {
    const methodOptions = {
      errorMessage: `Can not find entity ${namespace} #${namespaceNumber} in DataStorage`,
      throwError: true,
    };
    Object.assign(methodOptions, options);

    const entity = storage[`${namespace}_${namespaceNumber}`];
    if (!entity && methodOptions.throwError) {
      throw new Error(methodOptions.errorMessage);
    }
    return entity;
  }
}
