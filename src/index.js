const dirtyFields = (target) => {
  Object.defineProperty(target, "__dirty_fields", {
    enumerable: false,
    writable: true,
  });
  const prox = new Proxy(target, {
    get(obj, prop) {
      return obj[prop];
    },
    set(obj, prop, value) {
      if (!obj.__dirty_fields) {
        obj.__dirty_fields = {};
      }
      obj.__dirty_fields[[prop]] = value;
      obj[prop] = value;
    },
  });

  const keys = Object.keys(target);
  keys.forEach((key) => {
    if (Array.isArray(target[key])) {
      const arrayProxy = new Proxy(target[key], {
        set(obj, prop, value, qwe) {
          if (prop !== "length") {
            if (!target.__dirty_fields) {
              target.__dirty_fields = {};
            }
            if (!target.__dirty_fields[key]) {
              target.__dirty_fields[key] = [];
            }
            target.__dirty_fields[key] = [...obj, value];
            target[key] = [...obj, value];
          }

          return true;
        },
      });
      target[key] = arrayProxy;
    }
  });

  return prox;
};

module.exports = dirtyFields;
