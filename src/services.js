var constructors = {};
var services = {};

exports.get = function(key) {
  if (!services[key]) {
    var constructor = constructors[key],
        deps = constructor.deps || [];
    deps.forEach(function(dep) {
      constructor.prototype[dep] = exports.get.bind({}, dep);
    });
    services[key] = new constructor();

  }
  return services[key];
};

exports.put = function(key, constructor) {
  constructors[key] = constructor;
};

exports.clear = function() {
  services = {};
};

exports.reset = function() {
  exports.clear();
  constructors = {};
}