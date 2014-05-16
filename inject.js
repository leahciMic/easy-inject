/**
 * Easy Inject: Dependency injection inspired and mostly borrowed from Angular
 */

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function annotate(fn) {
  var _dependencies,
      functionText,
      argumentsDeclaration,
      last,
      args,
      iterator,
      len;

  if ((_dependencies = fn._dependencies)) {

  } else if (typeof fn == 'function') {
    _dependencies = [];
    functionText = fn.toString().replace(STRIP_COMMENTS, '');
    argumentsDeclaration = functionText.match(FN_ARGS);
    args = argumentsDeclaration[1].split(FN_ARG_SPLIT);
    len = args.length;
    for (iterator = 0; iterator < len; iterator++) {
      args[iterator].replace(FN_ARG, function(all, underscore, name){
        _dependencies[_dependencies.length] = name;
      });
    }
  } else if (Array.isArray(fn)) {
    last = fn.length - 1;
    if (typeof fn[last] !== 'function') {
      throw new Error('function missing from array');
    }
    _dependencies = fn.slice(0, last);
  } else {
    throw new Error('annotation failed parsing input');
  }
  fn._dependencies = _dependencies;
  return _dependencies;
};

function inject(fn, injectables) {
  var wants = annotate(fn),
      i,
      l = wants.length,
      want,
      injectVars = [];

  for (i = 0; i < l; i++) {
    if (typeof injectables[wants[i]] === 'undefined') {
      throw new Error('Could not find ' + wants[i]);
    }
    injectVars[injectVars.length] = injectables[wants[i]];
  }

  if (Array.isArray(fn)) {
    fn = fn[fn.length-1];
  }

  if (typeof fn !== 'function') {
    throw new Error('inject failed to find a function');
  }

  return fn.apply(fn, injectVars);
};

module.exports = inject;
