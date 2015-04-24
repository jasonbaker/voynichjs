var constructors = {};
var services = {};

exports.get = function(key) {
  if (!services[key]) {
    var constructor = constructors[key][0],
        deps = constructors[key][1];
    services[key] = new constructor();
    deps.forEach(function(dep) {
      services[key][dep] = exports.get.bind({}, dep);
    });
  }
  return services[key];
};

exports.put = function(key, deps, constructor) {
  constructors[key] = [constructor, deps];
};

exports.clear = function() {
  services = {};
};

exports.reset = function() {
  exports.clear();
  constructors = {};
}