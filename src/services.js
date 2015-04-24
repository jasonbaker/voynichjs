var constructors = {};
var services = {};

exports.get = function(key) {
  if (!services[key]) {
    var constructor = constructors[key],
        deps = constructor.deps || [];
    services[key] = new constructor();
    deps.forEach(function(dep) {
      services[key][dep] = exports.get.bind({}, dep);
    });
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