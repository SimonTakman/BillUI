var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/swap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layerUtil.js":
/*!**************************!*\
  !*** ./src/layerUtil.js ***!
  \**************************/
/*! exports provided: hasArtboards, getArtboards, hasGroups, getGroups, hasShapePaths, getShapePaths, getText, sortTextDescendingOrder, getTextElementByValue, hasTextElementByValue, getShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasArtboards", function() { return hasArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArtboards", function() { return getArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGroups", function() { return hasGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroups", function() { return getGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasShapePaths", function() { return hasShapePaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShapePaths", function() { return getShapePaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortTextDescendingOrder", function() { return sortTextDescendingOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTextElementByValue", function() { return getTextElementByValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTextElementByValue", function() { return hasTextElementByValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShape", function() { return getShape; });
var hasArtboards = function hasArtboards(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Artboard';
  }).length > 0 ? true : false;
};
var getArtboards = function getArtboards(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Artboard';
  });
};
var hasGroups = function hasGroups(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Group';
  }).length > 0 ? true : false;
};
var getGroups = function getGroups(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Group';
  });
};
var hasShapePaths = function hasShapePaths(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'ShapePath';
  }).length > 0 ? true : false;
};
var getShapePaths = function getShapePaths(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'ShapePath';
  });
};
var getText = function getText(layers) {
  return layers.filter(function (layer) {
    return layer.type === "Text";
  });
};
var sortTextDescendingOrder = function sortTextDescendingOrder(layers) {
  return layers.sort(function (a, b) {
    return b.name.length - a.name.length;
  });
};
var getTextElementByValue = function getTextElementByValue(layers, text) {
  return layers.filter(function (layer) {
    return layer.name === text;
  });
};
var hasTextElementByValue = function hasTextElementByValue(layers, text) {
  return layers.filter(function (layer) {
    return layer.name === text;
  }).length > 0 ? true : false;
};
function getShape(selectedLayers) {
  var layers = getGroups(selectedLayers.layers);

  if (layers.length > 0) {
    //THIS IS A GROUP
    return {
      "layers": layers,
      "type": layers[0].type
    };
  } else {
    layers = getShapePaths(selectedLayers.layers);

    if (layers.length > 0) {
      return {
        "layers": layers,
        "type": layers[0].type // THIS IS A SHAPEPATH
        //sketch.UI.message("This is a shapepath")

      };
    }
  }

  return null;
}

/***/ }),

/***/ "./src/swap.js":
/*!*********************!*\
  !*** ./src/swap.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layerUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layerUtil */ "./src/layerUtil.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  if (!selectedLayers.isEmpty) {
    var obj = selectedLayers.layers[0];
    var artboard = obj.parent;
    var textLayers = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_1__["getText"])(artboard.layers);
    var sortedTextLayer = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_1__["sortTextDescendingOrder"])(textLayers);
    var sObj = obj.sketchObject;
    var originalObj = document.getLayerWithID(sortedTextLayer[0].name);

    if (originalObj) {
      originalObj.style = obj.style;
      var sOriginalObj = originalObj.sketchObject;
      sOriginalObj.setCornerRadiusFloat(sObj.cornerRadiusFloat());
    }
  }
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=swap.js.map