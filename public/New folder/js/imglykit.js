(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("canvas"));
	else if(typeof define === 'function' && define.amd)
		define(["canvas"], factory);
	else if(typeof exports === 'object')
		exports["ImglyKit"] = factory(require("canvas"));
	else
		root["ImglyKit"] = factory(root["canvas"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libRenderImage = __webpack_require__(1);

	var _libRenderImage2 = _interopRequireDefault(_libRenderImage);

	var _libImageExporter = __webpack_require__(13);

	var _libImageExporter2 = _interopRequireDefault(_libImageExporter);

	var _libVersionChecker = __webpack_require__(20);

	var _libVersionChecker2 = _interopRequireDefault(_libVersionChecker);

	var _constants = __webpack_require__(14);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libExif = __webpack_require__(18);

	var _libExif2 = _interopRequireDefault(_libExif);

	var _operationsRotationOperation = __webpack_require__(21);

	var _operationsRotationOperation2 = _interopRequireDefault(_operationsRotationOperation);

	var _operationsFlipOperation = __webpack_require__(25);

	var _operationsFlipOperation2 = _interopRequireDefault(_operationsFlipOperation);

	/**
	 * @class
	 * @param {Object} options
	 * @param {Image} [options.image] - The source image
	 * @param {HTMLElement} [options.container] - Specifies where the UI should be
	 *                                          added to. If none is given, the UI
	 *                                          will automatically be disabled.
	 * @param {Boolean} [options.ui.enabled=true] - Enables or disables the UI
	 * @param {Boolean} [options.renderOnWindowResize] - Specifies whether the canvas
	 *                                                 should re-render itself when
	 *                                                 the window is being resized.
	 * @param {String} [options.assetsUrl='assets'] - The base path for all external assets.
	 * @param {String} [options.renderer='webgl'] - The renderer identifier. Can either
	 *                                            be 'webgl' or 'canvas'.
	 */
	var VERSION = '2.0.3-6';

	var ImglyKit = (function () {
	  function ImglyKit(options) {
	    _classCallCheck(this, ImglyKit);

	    // `options` is required
	    if (typeof options === 'undefined') {
	      throw new Error('No options given.');
	    }

	    // Set default options
	    options = _libUtils2['default'].defaults(options, {
	      assetsUrl: 'assets',
	      container: null,
	      renderOnWindowResize: false,
	      versionCheck: true
	    });
	    options.ui = options.ui || {};
	    options.ui = _libUtils2['default'].defaults(options.ui, {
	      enabled: true
	    });

	    if (typeof options.image === 'undefined' && !options.ui.enabled) {
	      throw new Error('`options.image` needs to be set when UI is disabled.');
	    }

	    /**
	     * @type {Object}
	     * @private
	     */
	    this._options = options;

	    /**
	     * The stack of {@link Operation} instances that will be used
	     * to render the final Image
	     * @type {Array.<ImglyKit.Operation>}
	     */
	    this.operationsStack = [];

	    /**
	     * The registered UI types that can be selected via the `ui` option
	     * @type {Object.<String, UI>}
	     * @private
	     */
	    this._registeredUIs = {};

	    // Register the default UIs
	    this._registerUIs();

	    /**
	     * The registered operations
	     * @type {Object.<String, ImglyKit.Operation>}
	     */
	    this._registeredOperations = {};

	    // Register the default operations
	    this._registerOperations();

	    if (typeof window !== 'undefined' && this._options.versionCheck) {
	      this._versionChecker = new _libVersionChecker2['default'](VERSION);
	    }

	    if (this._options.image) {
	      this._parseExif(this._options.image);
	    }

	    if (this._options.ui.enabled) {
	      this._initUI();
	      if (this._options.renderOnWindowResize) {
	        this._handleWindowResize();
	      }
	    }
	  }

	  /**
	   * The current version of the SDK
	   * @name ImglyKit.version
	   * @internal Keep in sync with package.json
	   */

	  /**
	   * Renders the image
	   * @param  {ImglyKit.RenderType} [renderType=ImglyKit.RenderType.DATAURL] - The output type
	   * @param  {ImglyKit.ImageFormat} [imageFormat=ImglyKit.ImageFormat.PNG] - The output image format
	   * @param  {string} [dimensions] - The final dimensions of the image
	   * @param  {Number} [quality] - The image quality, between 0 and 1
	   * @return {Promise}
	   */

	  _createClass(ImglyKit, [{
	    key: 'render',
	    value: function render(renderType, imageFormat, dimensions, quality) {
	      var _this = this;

	      var settings = _libImageExporter2['default'].validateSettings(renderType, imageFormat);

	      renderType = settings.renderType;
	      imageFormat = settings.imageFormat;

	      // Create a RenderImage
	      var renderImage = new _libRenderImage2['default'](this._options.image, this.operationsStack, dimensions, this._options.renderer);

	      // Set all operations to dirty, since we have another webgl renderer
	      for (var i = 0; i < this.operationsStack.length; i++) {
	        var operation = this.operationsStack[i];
	        if (!operation) {
	          continue;
	        }
	        operation.dirty = true;
	      }

	      // Initiate image rendering
	      return renderImage.render().then(function () {
	        var canvas = renderImage.getRenderer().getCanvas();
	        return _libImageExporter2['default']['export'](_this, _this._options.image, canvas, renderType, imageFormat, quality);
	      });
	    }

	    /**
	     * Sets the image and parses the exif data
	     * @param {Image} image
	     */
	  }, {
	    key: 'setImage',
	    value: function setImage(image) {
	      this._options.image = image;
	      this._parseExif(image);
	    }

	    /**
	     * Parses the exif data and fixes the orientation if necessary
	     * @param {Image} image
	     * @private
	     */
	  }, {
	    key: '_parseExif',
	    value: function _parseExif(image) {
	      if (_libExif2['default'].isJPEG(image.src)) {
	        this._exif = null;
	        try {
	          this._exif = _libExif2['default'].fromBase64String(image.src);
	        } catch (e) {}
	        if (!this._exif) return;

	        var exifTags = this._exif.getTags();

	        if (exifTags && exifTags.Orientation) {
	          if (exifTags.Orientation !== 1 && exifTags.Orientation !== 2) {
	            // We need to rotate
	            var degrees = 0;
	            switch (exifTags.Orientation) {
	              case 7:
	              case 8:
	                degrees = -90;
	                break;
	              case 3:
	              case 4:
	                degrees = -180;
	                break;
	              case 5:
	              case 6:
	                degrees = 90;
	                break;
	            }

	            var rotationOperation = new _operationsRotationOperation2['default'](this, { degrees: degrees });
	            this.operationsStack.push(rotationOperation);
	          }

	          if ([2, 4, 5, 7].indexOf(exifTags.Orientation) !== -1) {
	            var flipOperation = new _operationsFlipOperation2['default'](this, { horizontal: true });
	            this.operationsStack.push(flipOperation);
	          }

	          this._exif.setOrientation(1);
	        }
	      }
	    }

	    /**
	     * Resets all custom and selected operations
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {}

	    /**
	     * Returns the asset path for the given filename
	     * @param  {String} asset
	     * @return {String}
	     */
	  }, {
	    key: 'getAssetPath',
	    value: function getAssetPath(asset) {
	      var isBrowser = typeof window !== 'undefined';
	      if (isBrowser) {
	        /* istanbul ignore next */
	        return this._options.assetsUrl + '/' + asset;
	      } else {
	        var path = __webpack_require__(26);
	        return path.resolve(this._options.assetsUrl, asset);
	      }
	    }

	    /**
	     * If `options.renderOnWindowResize` is set to true, this function
	     * will re-render the canvas with a slight delay so that it won't
	     * cause lagging of the resize
	     * @private
	     */
	  }, {
	    key: '_handleWindowResize',
	    value: function _handleWindowResize() {
	      var _this2 = this;

	      var timer = null;
	      window.addEventListener('resize', function () {
	        if (timer !== null) {
	          clearTimeout(timer);
	        }

	        timer = setTimeout(function () {
	          timer = null;
	          _this2.ui.render();
	        }, 300);
	      });
	    }

	    /**
	     * Registers all default UIs
	     * @private
	     */
	  }, {
	    key: '_registerUIs',
	    value: function _registerUIs() {
	      this.registerUI(ImglyKit.NightUI);
	    }

	    /**
	     * Registers all default operations
	     * @private
	     */
	  }, {
	    key: '_registerOperations',
	    value: function _registerOperations() {
	      for (var operationName in ImglyKit.Operations) {
	        this.registerOperation(ImglyKit.Operations[operationName]);
	      }
	    }

	    /**
	     * Registers the given operation
	     * @param {ImglyKit.Operation} operation - The operation class
	     */
	  }, {
	    key: 'registerOperation',
	    value: function registerOperation(operation) {
	      this._registeredOperations[operation.prototype.identifier] = operation;
	      if (this.ui) {
	        this.ui.addOperation(operation);
	      }
	    }

	    /**
	     * Registers the given UI
	     * @param {UI} ui
	     */
	  }, {
	    key: 'registerUI',
	    value: function registerUI(ui) {
	      this._registeredUIs[ui.prototype.identifier] = ui;
	    }

	    /**
	     * Initializes the UI
	     * @private
	     */
	    /* istanbul ignore next */
	  }, {
	    key: '_initUI',
	    value: function _initUI() {
	      var UI;

	      if (this._options.ui.enabled === true) {
	        // Select the first UI by default
	        UI = _libUtils2['default'].values(this._registeredUIs)[0];
	      }

	      if (!UI) {
	        return;
	      }

	      /**
	       * @type {ImglyKit.UI}
	       */
	      this.ui = new UI(this, this._options);
	    }

	    /**
	     * Returns the Operation instance with the given identifier,
	     * if it exists
	     * @param {String} identifier
	     * @returns {Operation}
	     */
	  }, {
	    key: 'getOperationFromStack',
	    value: function getOperationFromStack(identifier) {
	      var operation = this.operationsStack.filter(function (operation) {
	        return operation.identifier === identifier;
	      })[0];
	      return operation;
	    }

	    /**
	     * Runs the UI, if present
	     */
	  }, {
	    key: 'run',
	    value: function run() {
	      if (typeof this.ui !== 'undefined') {
	        this.ui.run();
	      }
	    }
	  }, {
	    key: 'exif',
	    get: function get() {
	      return this._exif;
	    }
	  }, {
	    key: 'registeredOperations',
	    get: function get() {
	      return this._registeredOperations;
	    }
	  }]);

	  return ImglyKit;
	})();

	ImglyKit.version = VERSION;

	// Exposed classes
	ImglyKit.RenderImage = _libRenderImage2['default'];
	ImglyKit.Color = __webpack_require__(23);
	ImglyKit.Filter = __webpack_require__(27);
	ImglyKit.Operation = __webpack_require__(22);
	ImglyKit.Operations = {};
	ImglyKit.Operations.Filters = __webpack_require__(41);
	ImglyKit.Operations.Crop = __webpack_require__(43);
	ImglyKit.Operations.Rotation = __webpack_require__(21);
	ImglyKit.Operations.Saturation = __webpack_require__(44);
	ImglyKit.Operations.Contrast = __webpack_require__(45);
	ImglyKit.Operations.Brightness = __webpack_require__(46);
	ImglyKit.Operations.Flip = __webpack_require__(25);
	ImglyKit.Operations.TiltShift = __webpack_require__(47);
	ImglyKit.Operations.RadialBlur = __webpack_require__(49);
	ImglyKit.Operations.Text = __webpack_require__(50);
	ImglyKit.Operations.Stickers = __webpack_require__(51);
	ImglyKit.Operations.Frames = __webpack_require__(52);
	ImglyKit.Operations.Brush = __webpack_require__(53);

	ImglyKit.Filters = {};
	ImglyKit.Filters.A15 = __webpack_require__(54);
	ImglyKit.Filters.Breeze = __webpack_require__(55);
	ImglyKit.Filters.BW = __webpack_require__(56);
	ImglyKit.Filters.BWHard = __webpack_require__(57);
	ImglyKit.Filters.Celsius = __webpack_require__(58);
	ImglyKit.Filters.Chest = __webpack_require__(59);
	ImglyKit.Filters.Fixie = __webpack_require__(60);
	ImglyKit.Filters.Food = __webpack_require__(61);
	ImglyKit.Filters.Fridge = __webpack_require__(62);
	ImglyKit.Filters.Front = __webpack_require__(63);
	ImglyKit.Filters.Glam = __webpack_require__(64);
	ImglyKit.Filters.Gobblin = __webpack_require__(65);
	ImglyKit.Filters.K1 = __webpack_require__(66);
	ImglyKit.Filters.K2 = __webpack_require__(67);
	ImglyKit.Filters.K6 = __webpack_require__(68);
	ImglyKit.Filters.KDynamic = __webpack_require__(69);
	ImglyKit.Filters.Lenin = __webpack_require__(70);
	ImglyKit.Filters.Lomo = __webpack_require__(71);
	ImglyKit.Filters.Mellow = __webpack_require__(72);
	ImglyKit.Filters.Morning = __webpack_require__(73);
	ImglyKit.Filters.Orchid = __webpack_require__(74);
	ImglyKit.Filters.Pola = __webpack_require__(75);
	ImglyKit.Filters.Pola669 = __webpack_require__(76);
	ImglyKit.Filters.Quozi = __webpack_require__(77);
	ImglyKit.Filters.Semired = __webpack_require__(78);
	ImglyKit.Filters.Sunny = __webpack_require__(79);
	ImglyKit.Filters.Texas = __webpack_require__(80);
	ImglyKit.Filters.X400 = __webpack_require__(81);

	// Exposed constants
	ImglyKit.RenderType = _constants.RenderType;
	ImglyKit.ImageFormat = _constants.ImageFormat;
	ImglyKit.Vector2 = __webpack_require__(4);

	// UI
	ImglyKit.NightUI = __webpack_require__(82);

	exports['default'] = ImglyKit;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _eventEmitter = __webpack_require__(2);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	var _imageDimensions = __webpack_require__(3);

	var _imageDimensions2 = _interopRequireDefault(_imageDimensions);

	var _mathVector2 = __webpack_require__(4);

	var _mathVector22 = _interopRequireDefault(_mathVector2);

	var _renderersCanvasRenderer = __webpack_require__(5);

	var _renderersCanvasRenderer2 = _interopRequireDefault(_renderersCanvasRenderer);

	var _renderersWebglRenderer = __webpack_require__(12);

	var _renderersWebglRenderer2 = _interopRequireDefault(_renderersWebglRenderer);

	/**
	 * Handles the image rendering process
	 * @class
	 * @alias ImglyKit.RenderImage
	 * @param {Image} image
	 * @param {Array.<ImglyKit.Operation>} operationsStack
	 * @param {string} dimensions
	 * @param {string} preferredRenderer
	 * @private
	 */

	var RenderImage = (function (_EventEmitter) {
	  _inherits(RenderImage, _EventEmitter);

	  function RenderImage(image, operationsStack, dimensions, preferredRenderer) {
	    _classCallCheck(this, RenderImage);

	    _get(Object.getPrototypeOf(RenderImage.prototype), 'constructor', this).call(this);

	    /**
	     * @type {Object}
	     * @private
	     */
	    this._options = {
	      preferredRenderer: preferredRenderer
	    };

	    /**
	     * @type {Boolean}
	     * @private
	     * @default false
	     */
	    this._webglEnabled = false;

	    /**
	     * @type {Renderer}
	     * @private
	     */
	    this._renderer = null;

	    /**
	     * @type {Image}
	     * @private
	     */
	    this._image = image;

	    /**
	     * @type {Array.<ImglyKit.Operation>}
	     * @private
	     */
	    this._stack = operationsStack;

	    /**
	     * @type {ImglyKit.ImageDimensions}
	     * @private
	     */
	    this._dimensions = new _imageDimensions2['default'](dimensions);

	    /**
	     * @type {Vector2}
	     * @private
	     */
	    this._initialDimensions = new _mathVector22['default'](this._image.width, this._image.height);

	    this._initRenderer();
	  }

	  /**
	   * Creates a renderer (canvas or webgl, depending on support)
	   * @return {Promise}
	   * @private
	   */

	  _createClass(RenderImage, [{
	    key: '_initRenderer',
	    value: function _initRenderer() {
	      var _this = this;

	      /* istanbul ignore if */
	      if (_renderersWebglRenderer2['default'].isSupported() && this._options.preferredRenderer !== 'canvas') {
	        this._renderer = new _renderersWebglRenderer2['default'](this._initialDimensions, null, this._image);
	        this._webglEnabled = true;
	      } else if (_renderersCanvasRenderer2['default'].isSupported()) {
	        this._renderer = new _renderersCanvasRenderer2['default'](this._initialDimensions, null, this._image);
	        this._webglEnabled = false;
	      }

	      /* istanbul ignore if */
	      if (this._renderer === null) {
	        throw new Error('Neither Canvas nor WebGL renderer are supported.');
	      }

	      this._renderer.on('error', function (err) {
	        return _this.emit('error', err);
	      });
	    }

	    /**
	     * Renders the image
	     * @return {Promise}
	     */
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var stack = this.sanitizedStack;
	      var initialDimensions = this._renderer.getInitialDimensionsForStack(stack, this._dimensions);
	      this._renderer.resizeTo(initialDimensions);
	      this._renderer.drawImage(this._image);

	      var validationPromises = [];
	      for (var i = 0; i < stack.length; i++) {
	        var operation = stack[i];
	        validationPromises.push(operation.validateSettings());
	      }

	      return Promise.all(validationPromises).then(function () {
	        var promises = [];
	        for (var i = 0; i < stack.length; i++) {
	          var operation = stack[i];
	          promises.push(operation.render(_this2._renderer));
	        }
	        return Promise.all(promises);
	      }).then(function () {
	        return _this2._renderer.renderFinal();
	      }).then(function () {
	        return _this2._renderer.postRender(_this2._dimensions);
	      });
	    }

	    /**
	     * Returns the renderer
	     * @return {Renderer}
	     */
	  }, {
	    key: 'getRenderer',
	    value: function getRenderer() {
	      return this._renderer;
	    }

	    /**
	     * Returns the operations stack without falsy values
	     * @type {Array.<Operation>}
	     */
	  }, {
	    key: 'sanitizedStack',
	    get: function get() {
	      var sanitizedStack = [];
	      for (var i = 0; i < this._stack.length; i++) {
	        var operation = this._stack[i];
	        if (!operation) continue;
	        sanitizedStack.push(operation);
	      }
	      return sanitizedStack;
	    }
	  }]);

	  return RenderImage;
	})(_eventEmitter2['default']);

	exports['default'] = RenderImage;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * EventEmitter (ES6) from:
	 * https://gist.github.com/bloodyowl/41b1de3388c626796eca
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var DEFAULT_MAX_LISTENERS = 12;

	function error(message) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  console.error.apply(console, [message].concat(args));
	  console.trace();
	}

	var EventEmitter = (function () {
	  function EventEmitter() {
	    _classCallCheck(this, EventEmitter);

	    this._maxListeners = DEFAULT_MAX_LISTENERS;
	    this._events = {};
	  }

	  _createClass(EventEmitter, [{
	    key: 'on',
	    value: function on(type, listener) {
	      if (typeof listener !== 'function') {
	        throw new TypeError();
	      }

	      var listeners = this._events[type] || (this._events[type] = []);
	      if (listeners.indexOf(listener) !== -1) {
	        return this;
	      }
	      listeners.push(listener);

	      if (listeners.length > this._maxListeners) {
	        error('possible memory leak, added %i %s listeners,\n        use EventEmitter#setMaxListeners(number) if you\n        want to increase the limit (%i now)', listeners.length, type, this._maxListeners);
	      }
	      return this;
	    }
	  }, {
	    key: 'once',
	    value: function once(type, listener) {
	      var eventsInstance = this;
	      function onceCallback() {
	        eventsInstance.off(type, onceCallback);
	        listener.apply(null, arguments);
	      }
	      return this.on(type, onceCallback);
	    }
	  }, {
	    key: 'off',
	    value: function off(type) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      if (args.length === 0) {
	        this._events[type] = null;
	        return this;
	      }

	      var listener = args[0];
	      if (typeof listener !== 'function') {
	        throw new TypeError();
	      }

	      var listeners = this._events[type];
	      if (!listeners || !listeners.length) {
	        return this;
	      }

	      var indexOfListener = listeners.indexOf(listener);
	      if (indexOfListener === -1) {
	        return this;
	      }

	      listeners.splice(indexOfListener, 1);
	      return this;
	    }
	  }, {
	    key: 'emit',
	    value: function emit(type) {
	      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	      }

	      var listeners = this._events[type];
	      if (!listeners || !listeners.length) {
	        return false;
	      }

	      listeners.forEach(function (fn) {
	        return fn.apply(null, args);
	      });

	      return true;
	    }
	  }, {
	    key: 'setMaxListeners',
	    value: function setMaxListeners(newMaxListeners) {
	      if (parseInt(newMaxListeners, 10) !== newMaxListeners) {
	        throw new TypeError();
	      }

	      this._maxListeners = newMaxListeners;
	    }
	  }]);

	  return EventEmitter;
	})();

	exports['default'] = EventEmitter;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * Parses the dimensions string and provides calculation functions
	 * @class
	 * @alias ImglyKit.ImageDimensions
	 * @param {string} dimensions
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var ImageDimensions = (function () {
	  function ImageDimensions(dimensions) {
	    _classCallCheck(this, ImageDimensions);

	    /**
	     * The available dimension modifiers
	     * @type {Object}
	     * @private
	     */
	    this._modifiers = {
	      FIXED: '!'
	    };

	    /**
	     * @type {string}
	     * @private
	     */
	    this._dimensionsString = dimensions;

	    /**
	     * An object that represents the parsed dimensions string
	     * @type {Object}
	     */
	    this._rules = this._parse();

	    this._validateRules();
	  }

	  /**
	   * Parses the dimensions string
	   * @private
	   */

	  _createClass(ImageDimensions, [{
	    key: '_parse',
	    value: function _parse() {
	      if (typeof this._dimensionsString === 'undefined' || this._dimensionsString === null) {
	        return null;
	      }

	      var match = this._dimensionsString.match(/^([0-9]+)?x([0-9]+)?([\!])?$/i);
	      if (!match) {
	        throw new Error('Invalid size option: ' + this._dimensionsString);
	      }

	      return {
	        x: isNaN(match[1]) ? null : parseInt(match[1], 10),
	        y: isNaN(match[2]) ? null : parseInt(match[2], 10),
	        modifier: match[3]
	      };
	    }

	    /**
	     * Validates the rules
	     * @private
	     */
	  }, {
	    key: '_validateRules',
	    value: function _validateRules() {
	      if (this._rules === null) return;

	      var xAvailable = this._rules.x !== null;
	      var yAvailable = this._rules.y !== null;

	      if (this._rules.modifier === this._modifiers.FIXED && !(xAvailable && yAvailable)) {
	        throw new Error('Both `x` and `y` have to be set when using the fixed (!) modifier.');
	      }

	      if (!xAvailable && !yAvailable) {
	        throw new Error('Neither `x` nor `y` are given.');
	      }
	    }

	    /**
	     * Calculates the final dimensions using the dimensions string and the
	     * given initial dimensions
	     * @param  {Vector2} initialDimensions
	     * @return {Vector2}
	     */
	  }, {
	    key: 'calculateFinalDimensions',
	    value: function calculateFinalDimensions(initialDimensions) {
	      var dimensions = initialDimensions.clone(),
	          ratio;

	      if (this._rules === null) return dimensions;

	      /* istanbul ignore else */
	      if (this._rules.modifier === this._modifiers.FIXED) {
	        // Fixed dimensions
	        dimensions.set(this._rules.x, this._rules.y);
	      } else if (this._rules.x !== null && this._rules.y !== null) {
	        // Both x and y given, resize to fit
	        ratio = Math.min(this._rules.x / dimensions.x, this._rules.y / dimensions.y);
	        dimensions.multiply(ratio);
	      } else if (this._rules.x !== null) {
	        // Fixed x, y by ratio
	        ratio = initialDimensions.y / initialDimensions.x;
	        dimensions.x = this._rules.x;
	        dimensions.y = dimensions.x * ratio;
	      } else if (this._rules.y !== null) {
	        // Fixed y, x by ratio
	        ratio = initialDimensions.x / initialDimensions.y;
	        dimensions.y = this._rules.y;
	        dimensions.x = dimensions.y * ratio;
	      }

	      return dimensions;
	    }
	  }]);

	  return ImageDimensions;
	})();

	exports['default'] = ImageDimensions;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * Represents a 2-dimensional vector while providing math functions to
	 * modify / clone the vector. Fully chainable.
	 * @class
	 * @alias ImglyKit.Vector2
	 * @param {number} x
	 * @param {number} y
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Vector2 = (function () {
	  function Vector2(x, y) {
	    _classCallCheck(this, Vector2);

	    this.x = x;
	    this.y = y;
	    if (typeof this.x === 'undefined') {
	      this.x = 0;
	    }
	    if (typeof this.y === 'undefined') {
	      this.y = 0;
	    }
	  }

	  /**
	   * Sets the given values
	   * @param {number} x
	   * @param {number} y
	   * @return {Vector2}
	   */

	  _createClass(Vector2, [{
	    key: 'set',
	    value: function set(x, y) {
	      this.x = x;
	      this.y = y;
	      return this;
	    }

	    /**
	     * Creates a clone of this vector
	     * @return {Vector2}
	     */
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Vector2(this.x, this.y);
	    }

	    /**
	     * Copies the values of the given vector
	     * @param  {Vector2} other
	     * @return {Vector2}
	     */
	  }, {
	    key: 'copy',
	    value: function copy(other) {
	      this.x = other.x;
	      this.y = other.y;
	      return this;
	    }

	    /**
	     * Clamps this vector with the given Vector2 / number
	     * @param  {(number|Vector2)} minimum
	     * @param  {(number|Vector2)} maximum
	     * @return {Vector2}
	     */
	  }, {
	    key: 'clamp',
	    value: function clamp(minimum, maximum) {
	      var minimumSet = minimum !== null && typeof minimum !== 'undefined';
	      var maximumSet = maximum !== null && typeof maximum !== 'undefined';

	      /* istanbul ignore else  */
	      if (!(minimum instanceof Vector2) && minimumSet) {
	        minimum = new Vector2(minimum, minimum);
	      }
	      /* istanbul ignore else  */
	      if (!(maximum instanceof Vector2) && maximumSet) {
	        maximum = new Vector2(maximum, maximum);
	      }

	      if (minimumSet) {
	        this.x = Math.max(minimum.x, this.x);
	        this.y = Math.max(minimum.y, this.y);
	      }

	      if (maximumSet) {
	        this.x = Math.min(maximum.x, this.x);
	        this.y = Math.min(maximum.y, this.y);
	      }
	      return this;
	    }

	    /**
	     * Divides this vector by the given Vector2 / number
	     * @param  {(number|Vector2)} divisor
	     * @param  {number} [y]
	     * @return {Vector2}
	     */
	  }, {
	    key: 'divide',
	    value: function divide(divisor, y) {
	      if (divisor instanceof Vector2) {
	        this.x /= divisor.x;
	        this.y /= divisor.y;
	      } else {
	        this.x /= divisor;
	        this.y /= typeof y === 'undefined' ? divisor : y;
	      }
	      return this;
	    }

	    /**
	     * Subtracts the given Vector2 / number from this vector
	     * @param  {(number|Vector2)} subtrahend
	     * @param  {number} [y]
	     * @return {Vector2}
	     */
	  }, {
	    key: 'subtract',
	    value: function subtract(subtrahend, y) {
	      if (subtrahend instanceof Vector2) {
	        this.x -= subtrahend.x;
	        this.y -= subtrahend.y;
	      } else {
	        this.x -= subtrahend;
	        this.y -= typeof y === 'undefined' ? subtrahend : y;
	      }
	      return this;
	    }

	    /**
	     * Multiplies the given Vector2 / number with this vector
	     * @param  {(number|Vector2)} subtrahend
	     * @param  {number} [y]
	     * @return {Vector2}
	     */
	  }, {
	    key: 'multiply',
	    value: function multiply(factor, y) {
	      if (factor instanceof Vector2) {
	        this.x *= factor.x;
	        this.y *= factor.y;
	      } else {
	        this.x *= factor;
	        this.y *= typeof y === 'undefined' ? factor : y;
	      }
	      return this;
	    }

	    /**
	     * Adds the given Vector2 / numbers to this vector
	     * @param {(number|Vector2)} addend
	     * @param {number} [y]
	     */
	  }, {
	    key: 'add',
	    value: function add(addend, y) {
	      if (addend instanceof Vector2) {
	        this.x += addend.x;
	        this.y += addend.y;
	      } else {
	        this.x += addend;
	        this.y += typeof y === 'undefined' ? addend : y;
	      }
	      return this;
	    }

	    /**
	     * Checks whether the x and y value are the same as the given ones
	     * @param  {(number|Vector2)} vec
	     * @param  {number} y
	     * @return {boolean}
	     */
	  }, {
	    key: 'equals',
	    value: function equals(vec, y) {
	      if (vec instanceof Vector2) {
	        return vec.x === this.x && vec.y === this.y;
	      } else {
	        return vec === this.x && y === this.y;
	      }
	    }

	    /**
	     * Flips the x and y values of this vector
	     * @return {Vector2}
	     */
	  }, {
	    key: 'flip',
	    value: function flip() {
	      var tempX = this.x;
	      this.x = this.y;
	      this.y = tempX;
	      return this;
	    }

	    /**
	     * Rounds the values of this vector
	     * @returns {Vector2}
	     */
	  }, {
	    key: 'round',
	    value: function round() {
	      this.x = Math.round(this.x);
	      this.y = Math.round(this.y);
	      return this;
	    }

	    /**
	     * Rounds up the values of this vector
	     * @returns {Vector2}
	     */
	  }, {
	    key: 'ceil',
	    value: function ceil() {
	      this.x = Math.ceil(this.x);
	      this.y = Math.ceil(this.y);
	      return this;
	    }

	    /**
	     * Rounds down the values of this vector
	     * @returns {Vector2}
	     */
	  }, {
	    key: 'floor',
	    value: function floor() {
	      this.x = Math.floor(this.x);
	      this.y = Math.floor(this.y);
	      return this;
	    }

	    /**
	     * Makes both numbers of this vector positive
	     * @returns {Vector2}
	     */
	  }, {
	    key: 'abs',
	    value: function abs() {
	      this.x = Math.abs(this.x);
	      this.y = Math.abs(this.y);
	      return this;
	    }

	    /**
	     * Returns a string representation of this vector
	     * @return {String}
	     */
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return 'Vector2({ x: ' + this.x + ', y: ' + this.y + ' })';
	    }
	  }]);

	  return Vector2;
	})();

	exports['default'] = Vector2;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _renderer = __webpack_require__(6);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _vendorPromise = __webpack_require__(8);

	var _vendorPromise2 = _interopRequireDefault(_vendorPromise);

	/**
	 * @class
	 * @alias ImglyKit.CanvasRenderer
	 * @extends {ImglyKit.Renderer}
	 * @private
	 */

	var CanvasRenderer = (function (_Renderer) {
	  _inherits(CanvasRenderer, _Renderer);

	  function CanvasRenderer() {
	    _classCallCheck(this, CanvasRenderer);

	    _get(Object.getPrototypeOf(CanvasRenderer.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(CanvasRenderer, [{
	    key: 'cache',

	    /**
	     * Caches the current canvas content for the given identifier
	     * @param {String} identifier
	     */
	    value: function cache(identifier) {
	      this._cache[identifier] = {
	        data: this._context.getImageData(0, 0, this._canvas.width, this._canvas.height),
	        size: new _libMathVector22['default'](this._canvas.width, this._canvas.height)
	      };
	    }

	    /**
	     * Draws the stored texture / image data for the given identifier
	     * @param {String} identifier
	     */
	  }, {
	    key: 'drawCached',
	    value: function drawCached(identifier) {
	      var _cache$identifier = this._cache[identifier];
	      var data = _cache$identifier.data;
	      var size = _cache$identifier.size;

	      this._canvas.width = size.x;
	      this._canvas.height = size.y;
	      this._context.putImageData(data, 0, 0);
	    }

	    /**
	     * Checks whether this type of renderer is supported in the current environment
	     * @abstract
	     * @returns {boolean}
	     */
	  }, {
	    key: '_getContext',

	    /**
	     * Gets the rendering context from the Canva
	     * @return {RenderingContext}
	     * @abstract
	     */
	    value: function _getContext() {
	      /* istanbul ignore next */
	      return this._canvas.getContext('2d');
	    }

	    /**
	     * Draws the given image on the canvas
	     * @param  {Image} image
	     * @returns {Promis}
	     */
	  }, {
	    key: 'drawImage',
	    value: function drawImage(image) {
	      this._context.drawImage(image, 0, 0, image.width, image.height, 0, 0, this._canvas.width, this._canvas.height);
	      return _vendorPromise2['default'].resolve();
	    }

	    /**
	     * Resizes the current canvas picture to the given dimensions
	     * @param  {Vector2} dimensions
	     * @return {Promise}
	     */
	  }, {
	    key: 'resizeTo',
	    value: function resizeTo(dimensions) {
	      dimensions = dimensions.clone().floor();
	      if (this._canvas.width === dimensions.x && this._canvas.height === dimensions.y) {
	        return;
	      }

	      // Create a temporary canvas to draw to
	      var newCanvas = this.createCanvas();
	      newCanvas.width = dimensions.x;
	      newCanvas.height = dimensions.y;
	      var newContext = newCanvas.getContext('2d');

	      // Draw the source canvas onto the new one
	      newContext.drawImage(this._canvas, 0, 0, this._canvas.width, this._canvas.height, 0, 0, newCanvas.width, newCanvas.height);

	      // Set the new canvas and context
	      this.setCanvas(newCanvas);
	    }

	    /**
	     * Returns a cloned version of the current canvas
	     * @return {Canvas}
	     */
	  }, {
	    key: 'cloneCanvas',
	    value: function cloneCanvas() {
	      var canvas = this.createCanvas();
	      var context = canvas.getContext('2d');

	      // Resize the canvas
	      canvas.width = this._canvas.width;
	      canvas.height = this._canvas.height;

	      // Draw the current canvas on the new one
	      context.drawImage(this._canvas, 0, 0);

	      return canvas;
	    }

	    /**
	     * Resets the renderer
	     * @param {Boolean} resetCache = false
	     * @override
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var resetCache = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      if (resetCache) {
	        this._cache = [];
	      }
	    }

	    /**
	     * Returns the initial dimensions before any operations have been applied
	     * @param {Array.<Operation>} stack
	     * @param {ImageDimensions} dimensions
	     */
	  }, {
	    key: 'getInitialDimensionsForStack',
	    value: function getInitialDimensionsForStack(stack, dimensions) {
	      // Since canvas operations resize the canvas, the initial
	      // dimensions is the same as the image dimensions
	      return new _libMathVector22['default'](this._image.width, this._image.height);
	    }

	    /**
	     * Sets the canvas dimensions
	     * @param {Vector2} dimensions
	     */
	  }, {
	    key: 'setSize',
	    value: function setSize(dimensions) {
	      dimensions = dimensions.clone().floor();
	      if (this._canvas.width === dimensions.x && this._canvas.height === dimensions.y) {
	        return;
	      }

	      this._canvas.width = dimensions.x;
	      this._canvas.height = dimensions.y;
	      this._size.copy(dimensions);
	    }

	    /**
	     * Gets called after the rendering has been done. Resizes the canvas
	     * to its final size
	     * @param {ImageDimensions} dimensions
	     */
	  }, {
	    key: 'postRender',
	    value: function postRender(dimensions) {
	      var canvasDimensions = new _libMathVector22['default'](this._canvas.width, this._canvas.height);
	      var newDimensions = dimensions.calculateFinalDimensions(canvasDimensions);
	      this.resizeTo(newDimensions);
	    }
	  }], [{
	    key: 'isSupported',
	    value: function isSupported() {
	      var elem = this.prototype.createCanvas();
	      return !!(elem.getContext && elem.getContext('2d'));
	    }
	  }, {
	    key: 'identifier',

	    /**
	     * A unique string that identifies this renderer
	     * @type {String}
	     */
	    get: function get() {
	      return 'canvas';
	    }
	  }]);

	  return CanvasRenderer;
	})(_renderer2['default']);

	exports['default'] = CanvasRenderer;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint unused:false */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	/**
	 * @class
	 * @alias ImglyKit.Renderer
	 * @param {Vector2} dimensions
	 * @private
	 */

	var Renderer = (function (_EventEmitter) {
	  _inherits(Renderer, _EventEmitter);

	  function Renderer(dimensions, canvas, image) {
	    _classCallCheck(this, Renderer);

	    _get(Object.getPrototypeOf(Renderer.prototype), 'constructor', this).call(this);

	    this._size = new _libMathVector22['default'](image.width, image.height);

	    /**
	     * @type {Canvas}
	     * @private
	     */
	    this._canvas = canvas || this.createCanvas();

	    if (!canvas) {
	      this.setSize(dimensions);
	    }

	    /**
	     * @type {RenderingContext}
	     * @private
	     */
	    this._context = this._getContext();

	    /**
	     * The texture / image data cache
	     * @type {Object.<String, *>}
	     */
	    this._cache = {};

	    this._image = image;
	  }

	  /**
	   * A unique string that identifies this renderer
	   * @type {String}
	   */

	  _createClass(Renderer, [{
	    key: 'cache',

	    /**
	     * Caches the current canvas content for the given identifier
	     * @param {String} identifier
	     */
	    value: function cache(identifier) {}

	    /**
	     * Draws the stored texture / image data for the given identifier
	     * @param {String} identifier
	     */
	  }, {
	    key: 'drawCached',
	    value: function drawCached(identifier) {}

	    /**
	     * Creates a new canvas
	     * @param {Number} [width]
	     * @param {Number} [height]
	     * @return {Canvas}
	     * @private
	     */
	  }, {
	    key: 'createCanvas',
	    value: function createCanvas(width, height) {
	      var isBrowser = typeof window !== 'undefined';
	      var canvas;
	      if (isBrowser) {
	        /* istanbul ignore next */
	        canvas = document.createElement('canvas');
	      } else {
	        var Canvas = __webpack_require__(7);
	        canvas = new Canvas();
	      }

	      // Apply width
	      if (typeof width !== 'undefined') {
	        canvas.width = width;
	      }

	      // Apply height
	      if (typeof height !== 'undefined') {
	        canvas.height = height;
	      }

	      return canvas;
	    }

	    /**
	     * Returns the current size of the canvas
	     * @return {Vector2}
	     */
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	      return new _libMathVector22['default'](this._canvas.width, this._canvas.height);
	    }

	    /**
	     * Gets the rendering context from the Canva
	     * @return {RenderingContext}
	     * @abstract
	     */
	  }, {
	    key: '_getContext',
	    value: function _getContext() {
	      /* istanbul ignore next */
	      throw new Error('Renderer#_getContext is abstract and not implemented in inherited class.');
	    }

	    /**
	     * Resizes the current canvas picture to the given dimensions
	     * @param  {Vector2} dimensions
	     * @return {Promise}
	     * @abstract
	     */
	  }, {
	    key: 'resizeTo',
	    value: function resizeTo(dimensions) {
	      /* istanbul ignore next */
	      throw new Error('Renderer#resizeTo is abstract and not implemented in inherited class.');
	    }

	    /**
	     * Draws the given image on the canvas
	     * @param  {Image} image
	     * @abstract
	     */
	  }, {
	    key: 'drawImage',
	    value: function drawImage(image) {
	      /* istanbul ignore next */
	      throw new Error('Renderer#drawImage is abstract and not implemented in inherited class.');
	    }

	    /**
	     * Gets called after the stack has been rendered
	     * @param  {Image} image
	     */
	  }, {
	    key: 'renderFinal',
	    value: function renderFinal() {}

	    /**
	     * Returns the canvas
	     * @return {Canvas}
	     */
	  }, {
	    key: 'getCanvas',
	    value: function getCanvas() {
	      return this._canvas;
	    }

	    /**
	     * Returns the context
	     * @return {RenderingContext}
	     */
	  }, {
	    key: 'getContext',
	    value: function getContext() {
	      return this._context;
	    }

	    /**
	     * Sets the current canvas to the given one
	     * @param {Canvas} canvas
	     */
	  }, {
	    key: 'setCanvas',
	    value: function setCanvas(canvas) {
	      this._canvas = canvas;
	      this._context = this._getContext();

	      this.emit('new-canvas', this._canvas);
	    }

	    /**
	     * Returns the canvas size after all operations have been applied
	     * @param {Array.<Operation>} stack
	     * @param {ImageDimensions} dimensions
	     */
	  }, {
	    key: 'getOutputDimensionsForStack',
	    value: function getOutputDimensionsForStack(stack, dimensions) {
	      var _this = this;

	      var size = new _libMathVector22['default'](this._image.width, this._image.height);
	      stack.forEach(function (operation) {
	        size = operation.getNewDimensions(_this, size);
	      });
	      if (dimensions) {
	        size = dimensions.calculateFinalDimensions(size);
	      }
	      return size;
	    }

	    /**
	     * Returns the initial dimensions before any operations have been applied
	     * @param {Array.<Operation>} stack
	     * @param {ImageDimensions} dimensions
	     */
	  }, {
	    key: 'getInitialDimensionsForStack',
	    value: function getInitialDimensionsForStack(stack, dimensions) {
	      return this.getOutputDimensionsForStack(stack, dimensions);
	    }

	    /**
	     * Sets the current context to the given one
	     * @param {RenderingContext2D} context
	     */
	  }, {
	    key: 'setContext',
	    value: function setContext(context) {
	      this._context = context;
	    }

	    /**
	     * Resets the renderer
	     * @param {Boolean} resetCache = false
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var resetCache = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	    }

	    /**
	     * Gets called after the rendering has been done.
	     */
	  }, {
	    key: 'postRender',
	    value: function postRender(dimensions) {}
	  }, {
	    key: 'setSize',
	    value: function setSize(size) {
	      this._size.copy(size);
	    }
	  }, {
	    key: 'identifier',
	    get: function get() {
	      return null;
	    }

	    /**
	     * Checks whether this type of renderer is supported in the current environment
	     * @abstract
	     * @returns {boolean}
	     */
	  }], [{
	    key: 'isSupported',
	    value: function isSupported() {
	      /* istanbul ignore next */
	      throw new Error('Renderer#isSupported is abstract and not implemented in inherited class.');
	    }
	  }]);

	  return Renderer;
	})(_libEventEmitter2['default']);

	exports['default'] = Renderer;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var root = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : null;
	var p = root.Promise;

	if (!p) {
	  p = __webpack_require__(9);
	}

	exports['default'] = p;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
	 * Native Promise Only
	 * v0.8.0-a (c) Kyle Simpson
	 * MIT License: http://getify.mit-license.org
	 * @license
	 */

	"use strict";

	(function UMD(name, context, definition) {
	  // special form of UMD for polyfilling across evironments
	  context[name] = context[name] || definition();
	  if (typeof module != "undefined" && module.exports) {
	    module.exports = context[name];
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function $AMD$() {
	      return context[name];
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	})("Promise", typeof global != "undefined" ? global : undefined, function DEF() {
	  /*jshint validthis:true */
	  "use strict";

	  var builtInProp,
	      cycle,
	      scheduling_queue,
	      ToString = Object.prototype.toString,
	      timer = typeof setImmediate != "undefined" ? function timer(fn) {
	    return setImmediate(fn);
	  } : setTimeout;

	  // dammit, IE8.
	  try {
	    Object.defineProperty({}, "x", {});
	    builtInProp = function builtInProp(obj, name, val, config) {
	      return Object.defineProperty(obj, name, {
	        value: val,
	        writable: true,
	        configurable: config !== false
	      });
	    };
	  } catch (err) {
	    builtInProp = function builtInProp(obj, name, val) {
	      obj[name] = val;
	      return obj;
	    };
	  }

	  // Note: using a queue instead of array for efficiency
	  scheduling_queue = (function Queue() {
	    var first, last, item;

	    function Item(fn, self) {
	      this.fn = fn;
	      this.self = self;
	      this.next = void 0;
	    }

	    return {
	      add: function add(fn, self) {
	        item = new Item(fn, self);
	        if (last) {
	          last.next = item;
	        } else {
	          first = item;
	        }
	        last = item;
	        item = void 0;
	      },
	      drain: function drain() {
	        var f = first;
	        first = last = cycle = void 0;

	        while (f) {
	          f.fn.call(f.self);
	          f = f.next;
	        }
	      }
	    };
	  })();

	  function schedule(fn, self) {
	    scheduling_queue.add(fn, self);
	    if (!cycle) {
	      cycle = timer(scheduling_queue.drain);
	    }
	  }

	  // promise duck typing
	  function isThenable(o) {
	    var _then,
	        o_type = typeof o;

	    if (o != null && (o_type == "object" || o_type == "function")) {
	      _then = o.then;
	    }
	    return typeof _then == "function" ? _then : false;
	  }

	  function notify() {
	    for (var i = 0; i < this.chain.length; i++) {
	      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
	    }
	    this.chain.length = 0;
	  }

	  // NOTE: This is a separate function to isolate
	  // the `try..catch` so that other code can be
	  // optimized better
	  function notifyIsolated(self, cb, chain) {
	    var ret, _then;
	    try {
	      if (cb === false) {
	        chain.reject(self.msg);
	      } else {
	        if (cb === true) {
	          ret = self.msg;
	        } else {
	          ret = cb.call(void 0, self.msg);
	        }

	        if (ret === chain.promise) {
	          chain.reject(TypeError("Promise-chain cycle"));
	        } else if (_then = isThenable(ret)) {
	          _then.call(ret, chain.resolve, chain.reject);
	        } else {
	          chain.resolve(ret);
	        }
	      }
	    } catch (err) {
	      chain.reject(err);
	    }
	  }

	  function resolve(msg) {
	    var _then,
	        self = this;

	    // already triggered?
	    if (self.triggered) {
	      return;
	    }

	    self.triggered = true;

	    // unwrap
	    if (self.def) {
	      self = self.def;
	    }

	    try {
	      if (_then = isThenable(msg)) {
	        schedule(function () {
	          var def_wrapper = new MakeDefWrapper(self);
	          try {
	            _then.call(msg, function $resolve$() {
	              resolve.apply(def_wrapper, arguments);
	            }, function $reject$() {
	              reject.apply(def_wrapper, arguments);
	            });
	          } catch (err) {
	            reject.call(def_wrapper, err);
	          }
	        });
	      } else {
	        self.msg = msg;
	        self.state = 1;
	        if (self.chain.length > 0) {
	          schedule(notify, self);
	        }
	      }
	    } catch (err) {
	      reject.call(new MakeDefWrapper(self), err);
	    }
	  }

	  function reject(msg) {
	    var self = this;

	    // already triggered?
	    if (self.triggered) {
	      return;
	    }

	    self.triggered = true;

	    // unwrap
	    if (self.def) {
	      self = self.def;
	    }

	    self.msg = msg;
	    self.state = 2;
	    if (self.chain.length > 0) {
	      schedule(notify, self);
	    }
	  }

	  function iteratePromises(Constructor, arr, resolver, rejecter) {
	    for (var idx = 0; idx < arr.length; idx++) {
	      (function IIFE(idx) {
	        Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
	          resolver(idx, msg);
	        }, rejecter);
	      })(idx);
	    }
	  }

	  function MakeDefWrapper(self) {
	    this.def = self;
	    this.triggered = false;
	  }

	  function MakeDef(self) {
	    this.promise = self;
	    this.state = 0;
	    this.triggered = false;
	    this.chain = [];
	    this.msg = void 0;
	  }

	  function Promise(executor) {
	    if (typeof executor != "function") {
	      throw TypeError("Not a function");
	    }

	    if (this.__NPO__ !== 0) {
	      throw TypeError("Not a promise");
	    }

	    // instance shadowing the inherited "brand"
	    // to signal an already "initialized" promise
	    this.__NPO__ = 1;

	    var def = new MakeDef(this);

	    this["then"] = function then(success, failure) {
	      var o = {
	        success: typeof success == "function" ? success : true,
	        failure: typeof failure == "function" ? failure : false
	      };
	      // Note: `then(..)` itself can be borrowed to be used against
	      // a different promise constructor for making the chained promise,
	      // by substituting a different `this` binding.
	      o.promise = new this.constructor(function extractChain(resolve, reject) {
	        if (typeof resolve != "function" || typeof reject != "function") {
	          throw TypeError("Not a function");
	        }

	        o.resolve = resolve;
	        o.reject = reject;
	      });
	      def.chain.push(o);

	      if (def.state !== 0) {
	        schedule(notify, def);
	      }

	      return o.promise;
	    };
	    this["catch"] = function $catch$(failure) {
	      return this.then(void 0, failure);
	    };

	    try {
	      executor.call(void 0, function publicResolve(msg) {
	        resolve.call(def, msg);
	      }, function publicReject(msg) {
	        reject.call(def, msg);
	      });
	    } catch (err) {
	      reject.call(def, err);
	    }
	  }

	  var PromisePrototype = builtInProp({}, "constructor", Promise,
	  /*configurable=*/false);

	  // Note: Android 4 cannot use `Object.defineProperty(..)` here
	  Promise.prototype = PromisePrototype;

	  // built-in "brand" to signal an "uninitialized" promise
	  builtInProp(PromisePrototype, "__NPO__", 0,
	  /*configurable=*/false);

	  builtInProp(Promise, "resolve", function Promise$resolve(msg) {
	    var Constructor = this;

	    // spec mandated checks
	    // note: best "isPromise" check that's practical for now
	    if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
	      return msg;
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      resolve(msg);
	    });
	  });

	  builtInProp(Promise, "reject", function Promise$reject(msg) {
	    return new this(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      reject(msg);
	    });
	  });

	  builtInProp(Promise, "all", function Promise$all(arr) {
	    var Constructor = this;

	    // spec mandated checks
	    if (ToString.call(arr) != "[object Array]") {
	      return Constructor.reject(TypeError("Not an array"));
	    }
	    if (arr.length === 0) {
	      return Constructor.resolve([]);
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      var len = arr.length,
	          msgs = Array(len),
	          count = 0;

	      iteratePromises(Constructor, arr, function resolver(idx, msg) {
	        msgs[idx] = msg;
	        if (++count === len) {
	          resolve(msgs);
	        }
	      }, reject);
	    });
	  });

	  builtInProp(Promise, "race", function Promise$race(arr) {
	    var Constructor = this;

	    // spec mandated checks
	    if (ToString.call(arr) != "[object Array]") {
	      return Constructor.reject(TypeError("Not an array"));
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      iteratePromises(Constructor, arr, function resolver(idx, msg) {
	        resolve(msg);
	      }, reject);
	    });
	  });

	  return Promise;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(10).setImmediate))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(11).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate, __webpack_require__(10).clearImmediate))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* global Image */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _renderer = __webpack_require__(6);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _vendorPromise = __webpack_require__(8);

	var _vendorPromise2 = _interopRequireDefault(_vendorPromise);

	/**
	 * @class
	 * @alias ImglyKit.WebGLRenderer
	 * @extends {ImglyKit.Renderer}
	 * @private
	 */

	var WebGLRenderer = (function (_Renderer) {
	  _inherits(WebGLRenderer, _Renderer);

	  function WebGLRenderer() {
	    _classCallCheck(this, WebGLRenderer);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(WebGLRenderer.prototype), 'constructor', this).apply(this, args);
	    this._contextLostCount = 0;
	    this._handleContextLoss();

	    this._defaultProgram = this.setupGLSLProgram();
	    this.reset();

	    this.id = WebGLRenderer.contextId;
	    WebGLRenderer.contextId++;
	  }

	  /**
	   * Gets called when the webgl context has been lost
	   * @private
	   */

	  _createClass(WebGLRenderer, [{
	    key: '_handleContextLoss',
	    value: function _handleContextLoss() {
	      var _this = this;

	      this._canvas.addEventListener('webglcontextlost', function (e) {
	        e.preventDefault();
	        _this._contextLostCount++;
	        _this.emit('error', 'context_lost');
	      });
	      this._canvas.addEventListener('webglcontextrestored', function () {
	        if (_this._contextLostCount >= 3) return _this.emit('error', 'context_lost_limit');
	        _this.emit('reset');
	        _this.reset(true, true);
	      });
	    }

	    /**
	     * Returns the context options passed to getContext()
	     * @type {Object}
	     * @private
	     */
	  }, {
	    key: 'cache',

	    /**
	     * Caches the current canvas content for the given identifier
	     * @param {String} identifier
	     */
	    value: function cache(identifier) {
	      // Re-use FBO and textures
	      var fbo = undefined,
	          texture = undefined,
	          cacheObject = undefined;
	      if (!this._cache[identifier]) {
	        cacheObject = this._createFramebuffer();
	      } else {
	        cacheObject = this._cache[identifier];
	      }

	      // Extract FBO and texture
	      fbo = cacheObject.fbo;
	      texture = cacheObject.texture;

	      // Resize output texture
	      var gl = this._context;
	      gl.useProgram(this._defaultProgram);
	      this._setCoordinates(this._defaultProgram);

	      // Resize cached texture
	      gl.bindTexture(gl.TEXTURE_2D, texture);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._size.x, this._size.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	      // Render to FBO
	      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	      gl.viewport(0, 0, this._size.x, this._size.y);

	      // Use last fbo texture as input
	      gl.bindTexture(gl.TEXTURE_2D, this._lastTexture);

	      gl.drawArrays(gl.TRIANGLES, 0, 6);

	      this._cache[identifier] = { fbo: fbo, texture: texture, size: this._size.clone() };
	    }

	    /**
	     * Draws the stored texture / image data for the given identifier
	     * @param {String} identifier
	     */
	  }, {
	    key: 'drawCached',
	    value: function drawCached(identifier) {
	      var _cache$identifier = this._cache[identifier];
	      var texture = _cache$identifier.texture;
	      var size = _cache$identifier.size;

	      var fbo = this.getCurrentFramebuffer();
	      var currentTexture = this.getCurrentTexture();

	      var gl = this._context;
	      gl.useProgram(this._defaultProgram);
	      this._setCoordinates(this._defaultProgram);

	      // Resize all textures
	      for (var i = 0; i < this._textures.length; i++) {
	        var otherTexture = this._textures[i];
	        gl.bindTexture(gl.TEXTURE_2D, otherTexture);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size.x, size.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	      }

	      // Select the current framebuffer to draw to
	      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

	      // Resize the texture we're drawing to
	      gl.bindTexture(gl.TEXTURE_2D, currentTexture);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size.x, size.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	      // Use the cached texture as input
	      gl.bindTexture(gl.TEXTURE_2D, texture);

	      gl.viewport(0, 0, size.x, size.y);

	      // Clear
	      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	      // Draw the rectangle
	      gl.drawArrays(gl.TRIANGLES, 0, 6);

	      this.setLastTexture(currentTexture);
	      this.selectNextBuffer();

	      this._size = size.clone();
	    }

	    /**
	     * The default vertex shader which just passes the texCoord to the
	     * fragment shader.
	     * @type {String}
	     * @private
	     */
	  }, {
	    key: '_getContext',

	    /**
	     * Gets the rendering context from the Canvas
	     * @return {RenderingContext}
	     * @abstract
	     */
	    value: function _getContext() {
	      /* istanbul ignore next */
	      var gl = this._canvas.getContext('webgl', this._contextOptions) || this._canvas.getContext('experimental-webgl', this._contextOptions);

	      if (window.WebGLDebugUtils) {
	        gl = window.WebGLDebugUtils.makeDebugContext(gl);
	      }

	      gl.disable(gl.DEPTH_TEST);
	      gl.disable(gl.CULL_FACE);

	      this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

	      return gl;
	    }

	    /**
	     * Draws the given image on the canvas
	     * @param  {Image} image
	     * @returns {Promise}
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'drawImage',
	    value: function drawImage(image) {
	      var _this2 = this;

	      var gl = this._context;
	      this._size = new _libMathVector22['default'](gl.drawingBufferWidth, gl.drawingBufferHeight);
	      return new _vendorPromise2['default'](function (resolve, reject) {
	        gl.useProgram(_this2._defaultProgram);
	        _this2._setCoordinates(_this2._defaultProgram);

	        var fbo = _this2.getCurrentFramebuffer();
	        var currentTexture = _this2.getCurrentTexture();

	        // Select the current framebuffer
	        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	        gl.viewport(0, 0, _this2._size.x, _this2._size.y);
	        gl.bindTexture(gl.TEXTURE_2D, currentTexture);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _this2._size.x, _this2._size.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	        // Create the texture
	        var texture = _this2.createTexture();
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	        _this2._inputTexture = texture;
	        _this2.setLastTexture(texture);

	        // Set premultiplied alpha
	        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	        // Upload the image into the texture
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	        // Draw the rectangle
	        gl.drawArrays(gl.TRIANGLES, 0, 6);

	        resolve();
	      });
	    }

	    /**
	     * Resizes the given image to fit the maximum texture size
	     * @param {Image}
	     * @returns {Promise}
	     * @private
	     */
	  }, {
	    key: 'prepareImage',
	    value: function prepareImage(image) {
	      if (image.width <= this._maxTextureSize && image.height <= this._maxTextureSize) {
	        return _vendorPromise2['default'].resolve(image);
	      }

	      // Calculate new size that fits the graphics card's max texture size
	      var maxSize = new _libMathVector22['default'](this._maxTextureSize, this._maxTextureSize);
	      var size = new _libMathVector22['default'](image.width, image.height);
	      var scale = Math.min(maxSize.x / size.x, maxSize.y / size.y);
	      var newSize = size.clone().multiply(scale);

	      // Create a new canvas to draw the image to
	      var canvas = this.createCanvas(newSize.x, newSize.y);
	      var context = canvas.getContext('2d');

	      // Draw the resized image
	      context.drawImage(image, 0, 0, size.x, size.y, 0, 0, newSize.x, newSize.y);

	      // Turn into a data url and make an image out of it
	      var data = canvas.toDataURL('image/jpeg');

	      return new _vendorPromise2['default'](function (resolve, reject) {
	        var image = new Image();
	        image.addEventListener('load', function () {
	          resolve(image);
	        });
	        image.src = data;
	      });
	    }

	    /**
	     * Clears the WebGL context
	     * @param {WebGLRenderingContext} gl
	     * @private
	     */
	  }, {
	    key: '_clear',
	    value: function _clear(gl) {
	      gl.clearColor(0, 0, 0, 0);
	      gl.clear(gl.COLOR_BUFFER_BIT);
	    }
	  }, {
	    key: '_setCoordinates',
	    value: function _setCoordinates(program, textureCoordinates, triangleCoordinates) {
	      var gl = this._context;

	      // Lookup texture coordinates location
	      var positionLocation = gl.getAttribLocation(program, 'a_position');
	      var texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

	      textureCoordinates = textureCoordinates || new Float32Array([
	      // First triangle
	      0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

	      // Second triangle
	      0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);

	      // Provide texture coordinates
	      var texCoordBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	      gl.bufferData(gl.ARRAY_BUFFER, textureCoordinates, gl.STATIC_DRAW);
	      gl.enableVertexAttribArray(texCoordLocation);
	      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

	      triangleCoordinates = triangleCoordinates || new Float32Array([
	      // First triangle
	      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

	      // Second triangle
	      -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]);

	      // Create a buffer for the rectangle positions
	      var buffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	      gl.enableVertexAttribArray(positionLocation);
	      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	      gl.bufferData(gl.ARRAY_BUFFER, triangleCoordinates, gl.STATIC_DRAW);
	    }
	  }, {
	    key: 'runProgram',
	    value: function runProgram(program, options) {
	      var gl = this._context;
	      gl.useProgram(program);
	      this._setCoordinates(program, options.textureCoordinates, options.triangleCoordinates);

	      var fbo = this.getCurrentFramebuffer();
	      var currentTexture = this.getCurrentTexture();

	      // Select the current framebuffer
	      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	      gl.viewport(0, 0, this._size.x, this._size.y);

	      // Resize the texture to canvas size
	      gl.bindTexture(gl.TEXTURE_2D, currentTexture);

	      // Set premultiplied alpha
	      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._size.x, this._size.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	      // Make sure we select the current texture
	      gl.bindTexture(gl.TEXTURE_2D, this._lastTexture);

	      // Set the uniforms
	      for (var name in options.uniforms) {
	        var location = gl.getUniformLocation(program, name);
	        var uniform = options.uniforms[name];

	        switch (uniform.type) {
	          case 'i':
	          case '1i':
	            gl.uniform1i(location, uniform.value);
	            break;
	          case 'f':
	          case '1f':
	            gl.uniform1f(location, uniform.value);
	            break;
	          case '2f':
	            gl.uniform2f(location, uniform.value[0], uniform.value[1]);
	            break;
	          case '3f':
	            gl.uniform3f(location, uniform.value[0], uniform.value[1], uniform.value[2]);
	            break;
	          case '4f':
	            gl.uniform4f(location, uniform.value[0], uniform.value[1], uniform.value[2], uniform.value[3]);
	            break;
	          case '2fv':
	            gl.uniform2fv(location, uniform.value);
	            break;
	          case 'mat3fv':
	            gl.uniformMatrix3fv(location, false, uniform.value);
	            break;
	          default:
	            throw new Error('Unknown uniform type: ' + uniform.type);
	        }
	      }

	      // Clear
	      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	      // Draw the rectangle
	      gl.drawArrays(gl.TRIANGLES, 0, 6);

	      this.setLastTexture(currentTexture);
	      this.selectNextBuffer();
	    }

	    /**
	     * Runs the given shader
	     * @param  {String} [vertexShader]
	     * @param  {String} [fragmentShader]
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'runShader',
	    value: function runShader(vertexShader, fragmentShader, options) {
	      if (typeof options === 'undefined') options = {};
	      if (typeof options.uniforms === 'undefined') options.uniforms = {};

	      var program = this.setupGLSLProgram(vertexShader, fragmentShader);
	      this.runProgram(program, options);
	    }

	    /**
	     * Draws the last used buffer onto the canvas
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'renderFinal',
	    value: function renderFinal() {
	      var gl = this._context;
	      var program = this._defaultProgram;
	      gl.useProgram(program);

	      // Don't draw to framebuffer
	      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

	      // Make sure the viewport size is correct
	      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

	      // Select the last texture that has been rendered to
	      gl.bindTexture(gl.TEXTURE_2D, this._lastTexture);

	      // Clear
	      this._clear(gl);

	      // Draw the rectangle
	      gl.drawArrays(gl.TRIANGLES, 0, 6);
	    }

	    /**
	     * Sets up a GLSL program. Uses the default vertex and fragment shader
	     * if none are given.
	     * @param {String} [vertexShader]
	     * @param {String} [fragmentShader]
	     * @return {WebGLProgram}
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'setupGLSLProgram',
	    value: function setupGLSLProgram(vertexShader, fragmentShader, textureCoordinates) {
	      var gl = this._context;
	      var shaders = [];

	      // Use default vertex shader
	      vertexShader = this._createShader(gl.VERTEX_SHADER, vertexShader || WebGLRenderer.prototype.defaultVertexShader);
	      shaders.push(vertexShader);

	      // Use default fragment shader
	      fragmentShader = this._createShader(gl.FRAGMENT_SHADER, fragmentShader || WebGLRenderer.prototype.defaultFragmentShader);
	      shaders.push(fragmentShader);

	      // Create the program
	      var program = gl.createProgram();

	      // Attach the shaders
	      for (var i = 0; i < shaders.length; i++) {
	        gl.attachShader(program, shaders[i]);
	      }

	      // Link the program
	      gl.linkProgram(program);

	      // Check linking status
	      var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	      if (!linked) {
	        var lastError = gl.getProgramInfoLog(program);
	        gl.deleteProgram(program);
	        throw new Error('WebGL program linking error: ' + lastError);
	      }

	      return program;
	    }

	    /**
	     * Creates a WebGL shader with the given type and source code
	     * @param  {WebGLShaderType} shaderType
	     * @param  {String} shaderSource
	     * @return {WebGLShader}
	     * @private
	     */
	    /* istanbul ignore next */
	  }, {
	    key: '_createShader',
	    value: function _createShader(shaderType, shaderSource) {
	      var gl = this._context;

	      // Create the shader and compile it
	      var shader = gl.createShader(shaderType);
	      gl.shaderSource(shader, shaderSource);
	      gl.compileShader(shader);

	      // Check compilation status
	      var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	      if (!compiled) {
	        var lastError = gl.getShaderInfoLog(shader);
	        gl.deleteShader(shader);
	        throw new Error('WebGL shader compilation error: ' + lastError);
	      }

	      return shader;
	    }

	    /**
	     * Creates an empty texture
	     * @return {WebGLTexture}
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'createTexture',
	    value: function createTexture() {
	      var gl = this._context;
	      var texture = gl.createTexture();

	      gl.bindTexture(gl.TEXTURE_2D, texture);

	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	      return texture;
	    }

	    /**
	     * Creates two textures and framebuffers that are used for the stack
	     * rendering
	     * @private
	     */
	    /* istanbul ignore next */
	  }, {
	    key: '_createFramebuffers',
	    value: function _createFramebuffers() {
	      for (var i = 0; i < 2; i++) {
	        var _createFramebuffer2 = this._createFramebuffer();

	        var fbo = _createFramebuffer2.fbo;
	        var texture = _createFramebuffer2.texture;

	        this._textures.push(texture);
	        this._framebuffers.push(fbo);
	      }
	    }

	    /**
	     * Creates and returns a frame buffer and texture
	     * @return {Object}
	     * @private
	     */
	  }, {
	    key: '_createFramebuffer',
	    value: function _createFramebuffer() {
	      var gl = this._context;

	      // Create texture
	      var texture = this.createTexture();

	      // Set premultiplied alpha
	      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._size.x, this._size.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	      // Create framebuffer
	      var fbo = gl.createFramebuffer();
	      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

	      // Attach the texture
	      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

	      return { fbo: fbo, texture: texture };
	    }

	    /**
	     * Resizes the current canvas picture to the given dimensions
	     * @param  {Vector2} dimensions
	     * @todo Use a downsampling shader for smoother image resizing
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'resizeTo',
	    value: function resizeTo(dimensions) {
	      var gl = this._context;

	      // Resize the canvas
	      this._canvas.width = dimensions.x;
	      this._canvas.height = dimensions.y;
	    }

	    /**
	     * Returns the current framebuffer
	     * @return {WebGLFramebuffer}
	     */
	  }, {
	    key: 'getCurrentFramebuffer',
	    value: function getCurrentFramebuffer() {
	      return this._framebuffers[this._bufferIndex % 2];
	    }

	    /**
	     * Returns the current texture
	     * @return {WebGLTexture}
	     */
	  }, {
	    key: 'getCurrentTexture',
	    value: function getCurrentTexture() {
	      return this._textures[this._bufferIndex % 2];
	    }

	    /**
	     * Increases the buffer index
	     */
	  }, {
	    key: 'selectNextBuffer',
	    value: function selectNextBuffer() {
	      this._bufferIndex++;
	    }

	    /**
	     * Returns the default program
	     * @return {WebGLProgram}
	     */
	  }, {
	    key: 'getDefaultProgram',
	    value: function getDefaultProgram() {
	      return this._defaultProgram;
	    }

	    /**
	     * Returns the last texture that has been drawn to
	     * @return {WebGLTexture}
	     */
	  }, {
	    key: 'getLastTexture',
	    value: function getLastTexture() {
	      return this._lastTexture;
	    }

	    /**
	     * Returns all textures
	     * @return {Array.<WebGLTexture>}
	     */
	  }, {
	    key: 'getTextures',
	    value: function getTextures() {
	      return this._textures;
	    }

	    /**
	     * Sets the last texture
	     * @param {WebGLTexture} texture
	     */
	  }, {
	    key: 'setLastTexture',
	    value: function setLastTexture(texture) {
	      this._lastTexture = texture;
	    }

	    /**
	     * Resets the renderer
	     * @param {Boolean} resetCache = false
	     * @param {Boolean} newContext = false
	     * @override
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var resetCache = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	      var newContext = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      this._lastTexture = null;
	      this._textures = [];
	      this._framebuffers = [];
	      this._bufferIndex = 0;

	      if (resetCache) {
	        this._cache = [];
	      }

	      if (newContext) {
	        this._inputTexture = null;
	        this._context = this._getContext();
	        this._defaultProgram = this.setupGLSLProgram();
	      }

	      this._createFramebuffers();
	      this.setLastTexture(this._inputTexture);
	    }
	  }, {
	    key: '_contextOptions',
	    get: function get() {
	      return {
	        alpha: true,
	        premultipliedAlpha: true
	      };
	    }

	    /**
	     * A unique string that identifies this renderer
	     * @type {String}
	     */
	  }, {
	    key: 'identifier',
	    get: function get() {
	      return 'webgl';
	    }
	  }, {
	    key: 'defaultVertexShader',
	    get: function get() {
	      var shader = '\n      attribute vec2 a_position;\n      attribute vec2 a_texCoord;\n      varying vec2 v_texCoord;\n\n      void main() {\n        gl_Position = vec4(a_position, 0, 1);\n        v_texCoord = a_texCoord;\n      }\n    ';
	      return shader;
	    }

	    /**
	     * The default fragment shader which will just look up the colors from the
	     * texture.
	     * @type {String}
	     * @private
	     */
	  }, {
	    key: 'defaultFragmentShader',
	    get: function get() {
	      var shader = '\n      precision mediump float;\n      uniform sampler2D u_image;\n      varying vec2 v_texCoord;\n\n      void main() {\n        gl_FragColor = texture2D(u_image, v_texCoord);\n      }\n    ';
	      return shader;
	    }

	    /**
	     * Checks whether this type of renderer is supported in the current environment
	     * @abstract
	     * @returns {boolean}
	     */
	  }, {
	    key: 'maxTextureSize',
	    get: function get() {
	      return this._maxTextureSize;
	    }
	  }], [{
	    key: 'isSupported',
	    value: function isSupported() {
	      if (typeof window === 'undefined') {
	        return false;
	      }

	      var canvas = document.createElement('canvas');
	      var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	      return !!gl;
	    }
	  }]);

	  return WebGLRenderer;
	})(_renderer2['default']);

	WebGLRenderer.contextId = 0;

	exports['default'] = WebGLRenderer;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* global Image */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _constants = __webpack_require__(14);

	var _utils = __webpack_require__(15);

	var _utils2 = _interopRequireDefault(_utils);

	var _vendorPromise = __webpack_require__(8);

	var _vendorPromise2 = _interopRequireDefault(_vendorPromise);

	var _exif = __webpack_require__(18);

	var _exif2 = _interopRequireDefault(_exif);

	/**
	 * @class
	 * @alias ImglyKit.ImageExporter
	 * @private
	 */

	var ImageExporter = (function () {
	  function ImageExporter() {
	    _classCallCheck(this, ImageExporter);
	  }

	  _createClass(ImageExporter, null, [{
	    key: 'validateSettings',
	    value: function validateSettings(renderType, imageFormat) {
	      var settings = {
	        renderType: renderType,
	        imageFormat: imageFormat
	      };

	      // Validate RenderType
	      if (typeof settings.renderType !== 'undefined' && settings.renderType !== null && _utils2['default'].values(_constants.RenderType).indexOf(settings.renderType) === -1) {
	        throw new Error('Invalid render type: ' + settings.renderType);
	      } else if (typeof renderType === 'undefined') {
	        settings.renderType = _constants.RenderType.DATAURL;
	      }

	      // Validate ImageFormat
	      if (typeof settings.imageFormat !== 'undefined' && settings.imageFormat !== null && _utils2['default'].values(_constants.ImageFormat).indexOf(settings.imageFormat) === -1) {
	        throw new Error('Invalid image format: ' + settings.imageFormat);
	      } else if (typeof imageFormat === 'undefined') {
	        settings.imageFormat = _constants.ImageFormat.PNG;
	      }

	      // Render type 'buffer' only available in node
	      if (settings.renderType === _constants.RenderType.BUFFER && typeof process === 'undefined') {
	        throw new Error('Render type \'buffer\' is only available when using node.js');
	      }

	      return settings;
	    }

	    /**
	     * Exports the image from the given canvas with the given options
	     * @param  {ImglyKit} kit
	     * @param  {Image} image
	     * @param  {Canvas} canvas
	     * @param  {ImglyKit.RenderType} renderType
	     * @param  {ImglyKit.ImageFormat} imageFormat
	     * @param  {Number} quality = 0.8
	     * @return {Promise}
	     */
	  }, {
	    key: 'export',
	    value: function _export(kit, image, canvas, renderType, imageFormat) {
	      var quality = arguments.length <= 5 || arguments[5] === undefined ? 0.8 : arguments[5];

	      return new _vendorPromise2['default'](function (resolve, reject) {
	        var result = undefined;
	        if (renderType === _constants.RenderType.IMAGE || renderType === _constants.RenderType.DATAURL) {
	          if (typeof window === 'undefined') {
	            // Quality not supported in node environment / node-canvas
	            result = canvas.toDataURL(imageFormat);
	          } else {
	            result = canvas.toDataURL(imageFormat, quality);
	          }

	          // When image's `src` attribute is a jpeg data url, we can restore
	          // the exif information
	          if (_exif2['default'].isJPEG(image.src) && _exif2['default'].isJPEG(result)) {
	            var exif = kit.exif;

	            if (exif) {
	              result = exif.restoreExifTags(result);
	            }
	          }
	        }

	        if (renderType === _constants.RenderType.IMAGE) {
	          var outputImage = undefined;

	          /* istanbul ignore else  */
	          if (typeof window === 'undefined') {
	            // Not a browser environment
	            var CanvasImage = __webpack_require__(7).Image;
	            outputImage = new CanvasImage();
	          } else {
	            outputImage = new Image();
	          }

	          outputImage.src = result;
	          resolve(outputImage);
	        } else if (renderType === _constants.RenderType.DATAURL) {
	          resolve(result);
	        } else if (renderType === _constants.RenderType.BUFFER) {
	          resolve(canvas.toBuffer());
	        } else if (renderType === _constants.RenderType.MSBLOB) {
	          resolve(canvas.msToBlob());
	        } else if (renderType === _constants.RenderType.BLOB) {
	          canvas.toBlob(function (blob) {
	            resolve(blob);
	          }, imageFormat, quality);
	        }
	      });
	    }
	  }]);

	  return ImageExporter;
	})();

	exports['default'] = ImageExporter;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * The available render types
	 * @enum {string}
	 * @alias ImglyKit.RenderType
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var RenderType = {
	  IMAGE: 'image',
	  DATAURL: 'data-url',
	  BUFFER: 'buffer',
	  BLOB: 'blob',
	  MSBLOB: 'ms-blob'
	};

	exports.RenderType = RenderType;
	/**
	 * The available output image formats
	 * @enum {string}
	 * @alias ImglyKit.ImageFormat
	 */
	var ImageFormat = {
	  PNG: 'image/png',
	  JPEG: 'image/jpeg'
	};
	exports.ImageFormat = ImageFormat;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* global HTMLElement */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _base64 = __webpack_require__(16);

	var _base642 = _interopRequireDefault(_base64);

	var _mathVector2 = __webpack_require__(4);

	var _mathVector22 = _interopRequireDefault(_mathVector2);

	var _classList = __webpack_require__(17);

	var _classList2 = _interopRequireDefault(_classList);

	/**
	 * Provides utility functions for internal use
	 * @class
	 * @alias ImglyKit.Utils
	 * @private
	 */

	var Utils = (function () {
	  function Utils() {
	    _classCallCheck(this, Utils);
	  }

	  _createClass(Utils, null, [{
	    key: 'isArray',

	    /**
	     * Checks if the given object is an Array
	     * @param  {Object}  object
	     * @return {Boolean}
	     */
	    value: function isArray(object) {
	      return Object.prototype.toString.call(object) === '[object Array]';
	    }

	    /**
	     * Returns the items selected by the given selector
	     * @param  {Array} items
	     * @param  {ImglyKit~Selector} selector - The selector
	     * @return {Array} The selected items
	     */
	  }, {
	    key: 'select',
	    value: function select(items) {
	      var selector = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	      if (selector === null) {
	        return items;
	      }

	      // Turn string parameter into an array
	      if (typeof selector === 'string') {
	        selector = selector.split(',').map(function (identifier) {
	          return identifier.trim();
	        });
	      }

	      // Turn array parameter into an object with `only`
	      if (Utils.isArray(selector)) {
	        selector = { only: selector };
	      }

	      if (typeof selector.only !== 'undefined') {
	        if (typeof selector.only === 'string') {
	          selector.only = selector.only.split(',').map(function (identifier) {
	            return identifier.trim();
	          });
	        }

	        // Select only the given identifiers
	        return items.filter(function (item) {
	          return selector.only.indexOf(item) !== -1;
	        });
	      } else if (typeof selector.except !== 'undefined') {
	        if (typeof selector.except === 'string') {
	          selector.except = selector.except.split(',').map(function (identifier) {
	            return identifier.trim();
	          });
	        }

	        // Select all but the given identifiers
	        return items.filter(function (item) {
	          return selector.except.indexOf(item) === -1;
	        });
	      }

	      throw new Error('Utils#select failed to filter items.');
	    }

	    /**
	     * Returns the given object's values as an array
	     * @param {Object} object
	     * @returns {Array<*>}
	     */
	  }, {
	    key: 'values',
	    value: function values(object) {
	      var values = [];
	      for (var key in object) {
	        values.push(object[key]);
	      }
	      return values;
	    }

	    /**
	     * Checks if the given object is a DOM element
	     * @param  {Object}  o
	     * @return {Boolean}
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'isDOMElement',
	    value: function isDOMElement(o) {
	      return typeof HTMLElement === 'object' ? o instanceof HTMLElement : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
	    }

	    /**
	     * Gets the x and y position for the given event.
	     * @param {Event} e
	     * @return {Vector2}
	     */
	  }, {
	    key: 'getEventPosition',
	    value: function getEventPosition(e) {
	      var x = e.clientX;
	      var y = e.clientY;
	      if (e.type.indexOf('touch') !== -1) {
	        x = e.touches[0].clientX;
	        y = e.touches[0].clientY;
	      }
	      return new _mathVector22['default'](x, y);
	    }

	    /**
	     * Checks if th given event is a touch event
	     * @param  {Event}  e
	     * @return {Boolean}
	     */
	  }, {
	    key: 'isTouchEvent',
	    value: function isTouchEvent(e) {
	      return e.type.indexOf('touch') !== -1;
	    }

	    /**
	     * Resizes the given vector to fit inside the given max size while maintaining
	     * the aspect ratio
	     * @param  {Vector2} vector
	     * @param  {Vector2} max
	     * @return {Vector2}
	     */
	  }, {
	    key: 'resizeVectorToFit',
	    value: function resizeVectorToFit(vector, max) {
	      var scale = Math.min(max.x / vector.x, max.y / vector.y);
	      var newSize = vector.clone().multiply(scale);
	      return newSize;
	    }

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to undefined. Once a
	     * property is set, additional values of the same property are ignored.
	     * @param  {Object} object
	     * @param  {Object} ...sources
	     * @return {Object}
	     */
	  }, {
	    key: 'defaults',
	    value: function defaults(object) {
	      // Shallow clone
	      var newObject = {};
	      for (var key in object) {
	        newObject[key] = object[key];
	      }

	      // Clone sources

	      for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	      }

	      for (var i = 0; i < sources.length; i++) {
	        var source = sources[i];
	        for (var key in source) {
	          if (typeof newObject[key] === 'undefined') {
	            newObject[key] = source[key];
	          }
	        }
	      }

	      return newObject;
	    }

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources overwrite property assignments of previous
	     * sources.
	     * @param {Object} object
	     * @param {Object} ...sources
	     * @return {Object}
	     */
	  }, {
	    key: 'extend',
	    value: function extend(object) {
	      // Shallow clone
	      var newObject = {};
	      for (var key in object) {
	        newObject[key] = object[key];
	      }

	      // Extend sources

	      for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        sources[_key2 - 1] = arguments[_key2];
	      }

	      for (var i = 0; i < sources.length; i++) {
	        var source = sources[i];
	        for (var key in source) {
	          newObject[key] = source[key];
	        }
	      }

	      return newObject;
	    }

	    /**
	     * Gets the property value at `path` of `object`
	     * @param  {Object} object
	     * @param  {String} key
	     * @param  {?} [defaultValue]
	     * @return {?}
	     */
	  }, {
	    key: 'fetch',
	    value: function fetch(object, path, defaultValue) {
	      // Replace indexes with property accessors
	      path = path.replace(/\[(\w+)\]/g, '.$1');
	      // Strip leading dot (when path begins with [0] for example)
	      path = path.replace(/^\./, '');

	      var pathSegments = path.split('.');
	      for (var i = 0; i < pathSegments.length; i++) {
	        var segment = pathSegments[i];
	        object = object[segment];
	        if (!object) {
	          break;
	        }
	      }

	      if (typeof object === 'undefined') {
	        object = defaultValue;
	      }

	      return object;
	    }

	    /**
	     * Creates a Blob URI from the given Data URI
	     * @param {String} data
	     */
	  }, {
	    key: 'createBlobURIFromDataURI',
	    value: function createBlobURIFromDataURI(data) {
	      if (!window.Blob || !window.URL || !ArrayBuffer || !Uint8Array) {
	        return data;
	      }

	      var rawData = _base642['default'].decode(data.split(',')[1]);
	      var mimeString = data.split(',')[0].split(':')[1].split(';')[0];

	      // write the bytes of the string to an ArrayBuffer
	      var arrayBuffer = new ArrayBuffer(rawData.length);
	      var intArray = new Uint8Array(arrayBuffer);
	      for (var i = 0; i < rawData.length; i++) {
	        intArray[i] = rawData[i];
	      }

	      // write the ArrayBuffer to a blob, and you're done
	      var blob = new window.Blob([arrayBuffer], {
	        type: mimeString
	      });
	      return window.URL.createObjectURL(blob);
	    }

	    /**
	     * Returns a `ClassList` instance for the given element
	     * @param  {DOMElement} el
	     * @return {ClassList}
	     */
	  }, {
	    key: 'classList',
	    value: function classList(el) {
	      return new _classList2['default'](el);
	    }
	  }]);

	  return Utils;
	})();

	exports['default'] = Utils;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	/*!
	 * Extracted from MinifyJpeg (Copyright (c) 2014 Hiroaki Matoba, MIT License):
	 * https://github.com/hMatoba/MinifyJpeg
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	exports['default'] = {
	  encode: function encode(input) {
	    var output = '',
	        chr1 = undefined,
	        chr2 = undefined,
	        chr3 = '',
	        enc1 = undefined,
	        enc2 = undefined,
	        enc3 = undefined,
	        enc4 = '',
	        i = 0;

	    do {
	      chr1 = input[i++];
	      chr2 = input[i++];
	      chr3 = input[i++];

	      enc1 = chr1 >> 2;
	      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	      enc4 = chr3 & 63;

	      if (isNaN(chr2)) {
	        enc3 = enc4 = 64;
	      } else if (isNaN(chr3)) {
	        enc4 = 64;
	      }

	      output = output + KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
	      chr1 = chr2 = chr3 = '';
	      enc1 = enc2 = enc3 = enc4 = '';
	    } while (i < input.length);

	    return output;
	  },

	  decode: function decode(input) {
	    var chr1 = undefined,
	        chr2 = undefined,
	        chr3 = '',
	        enc1 = undefined,
	        enc2 = undefined,
	        enc3 = undefined,
	        enc4 = '',
	        i = 0,
	        buf = [];

	    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	    var base64test = /[^A-Za-z0-9\+\/\=]/g;
	    if (base64test.exec(input)) {
	      throw new Error('There were invalid base64 characters in the input text.\n' + 'Valid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\n' + 'Expect errors in decoding.');
	    }
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

	    do {
	      enc1 = KEY_STR.indexOf(input.charAt(i++));
	      enc2 = KEY_STR.indexOf(input.charAt(i++));
	      enc3 = KEY_STR.indexOf(input.charAt(i++));
	      enc4 = KEY_STR.indexOf(input.charAt(i++));

	      chr1 = enc1 << 2 | enc2 >> 4;
	      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
	      chr3 = (enc3 & 3) << 6 | enc4;

	      buf.push(chr1);

	      if (enc3 !== 64) {
	        buf.push(chr2);
	      }
	      if (enc4 !== 64) {
	        buf.push(chr3);
	      }

	      chr1 = chr2 = chr3 = '';
	      enc1 = enc2 = enc3 = enc4 = '';
	    } while (i < input.length);

	    return buf;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var ClassList = (function () {
	  function ClassList(el) {
	    _classCallCheck(this, ClassList);

	    this._el = el;
	  }

	  _createClass(ClassList, [{
	    key: 'add',
	    value: function add(className) {
	      var classNames = this._el.className.split(' ');
	      classNames.push(className);
	      this._el.className = classNames.join(' ');
	    }
	  }, {
	    key: 'remove',
	    value: function remove(className) {
	      var classNames = this._el.className.split(' ');
	      classNames = classNames.filter(function (cl) {
	        return cl !== className;
	      });
	      this._el.className = classNames.join(' ');
	    }
	  }]);

	  return ClassList;
	})();

	exports['default'] = ClassList;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Based on https://github.com/exif-js/exif-js by Jacob Seidelin
	 * Licensed under MIT
	 */

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _base64 = __webpack_require__(16);

	var _base642 = _interopRequireDefault(_base64);

	var _arrayStream = __webpack_require__(19);

	var _arrayStream2 = _interopRequireDefault(_arrayStream);

	var EXIF_TAGS = {
	  0x0100: 'ImageWidth',
	  0x0101: 'ImageHeight',
	  0x8769: 'ExifIFDPointer',
	  0x8825: 'GPSInfoIFDPointer',
	  0xA005: 'InteroperabilityIFDPointer',
	  0x0102: 'BitsPerSample',
	  0x0103: 'Compression',
	  0x0106: 'PhotometricInterpretation',
	  0x0112: 'Orientation',
	  0x0115: 'SamplesPerPixel',
	  0x011C: 'PlanarConfiguration',
	  0x0212: 'YCbCrSubSampling',
	  0x0213: 'YCbCrPositioning',
	  0x011A: 'XResolution',
	  0x011B: 'YResolution',
	  0x0128: 'ResolutionUnit',
	  0x0111: 'StripOffsets',
	  0x0116: 'RowsPerStrip',
	  0x0117: 'StripByteCounts',
	  0x0201: 'JPEGInterchangeFormat',
	  0x0202: 'JPEGInterchangeFormatLength',
	  0x012D: 'TransferFunction',
	  0x013E: 'WhitePoint',
	  0x013F: 'PrimaryChromaticities',
	  0x0211: 'YCbCrCoefficients',
	  0x0214: 'ReferenceBlackWhite',
	  0x0132: 'DateTime',
	  0x010E: 'ImageDescription',
	  0x010F: 'Make',
	  0x0110: 'Model',
	  0x0131: 'Software',
	  0x013B: 'Artist',
	  0x8298: 'Copyright'
	};

	var DATA_JPEG_PREFIX = 'data:image/jpeg;base64,';
	var JPEG_REGEX = new RegExp('^' + DATA_JPEG_PREFIX, 'i');

	var Exif = (function () {
	  function Exif(buf) {
	    _classCallCheck(this, Exif);

	    this._buf = buf;
	    this._stream = new _arrayStream2['default'](this._buf);
	    this._stream.setHead(0);

	    this._segments = this._sliceIntoSegments(this._buf);
	    this._exifBuffer = this._getExifBuffer();
	    this._exifStream = new _arrayStream2['default'](this._exifBuffer);
	    this._parseExif();
	  }

	  _createClass(Exif, [{
	    key: 'getTags',
	    value: function getTags() {
	      return this._tags;
	    }
	  }, {
	    key: 'getTagData',
	    value: function getTagData() {
	      return this._tagData;
	    }

	    /**
	     * Restores the exif tags into the given data url
	     * @return {String} base64String
	     */
	  }, {
	    key: 'restoreExifTags',
	    value: function restoreExifTags(base64String) {
	      // First, make the given string a data array
	      var raw = base64String.replace(DATA_JPEG_PREFIX, '');
	      var data = _base642['default'].decode(raw);

	      var segments = this._sliceIntoSegments(data);

	      var _segments$1 = _slicedToArray(segments[1], 2);

	      var segmentStart = _segments$1[0];
	      var segmentEnd = _segments$1[1];

	      var dataBefore = data.slice(0, segmentStart);
	      var dataAfter = data.slice(segmentStart);

	      var newData = dataBefore.concat(this._exifBuffer);
	      newData = newData.concat(dataAfter);

	      // Make it a base64 string again
	      return DATA_JPEG_PREFIX + _base642['default'].encode(newData);
	    }

	    /**
	     * Overwrites the orientation with the given 16 bit integer
	     * @param {Number} orientation
	     */
	  }, {
	    key: 'setOrientation',
	    value: function setOrientation(orientation) {
	      if (this._tagData.Orientation) {
	        var entryOffset = this._tagData.Orientation.entryOffset;

	        // Replace value in buffer
	        this._exifStream.setHead(entryOffset + 8);
	        this._exifStream.writeInt16(orientation);
	      }
	    }

	    /**
	     * Checks whether the given base64 data url is a jpeg image
	     * @param  {String}  base64String
	     * @return {Boolean}
	     */
	  }, {
	    key: '_parseExif',

	    /**
	     * Parses the exif tags
	     * @return {Object}
	     * @private
	     */
	    value: function _parseExif() {
	      this._exifStream.setHead(0);
	      // Skip marker
	      this._exifStream.readInt16();
	      // Skip length
	      this._exifStream.readInt16();

	      var header = this._exifStream.readString(4);
	      if (header !== 'Exif') {
	        return;
	      }

	      // Skip 2 bytes
	      this._exifStream.readInt16();

	      var tiffOffset = this._exifStream.getHead();

	      // Find endian type
	      var bigEndian = false;
	      var endian = this._exifStream.readInt16();
	      if (endian === 0x4949) {
	        bigEndian = false;
	      } else if (endian === 0x4d4d) {
	        bigEndian = true;
	      } else {
	        throw new Error('Invalid TIFF data: No endian type found');
	      }

	      if (this._exifStream.readInt16(!bigEndian) !== 0x002A) {
	        throw new Error('Invalid TIFF data: No 0x002A');
	      }

	      var firstIFDOffset = this._exifStream.readInt32(!bigEndian);
	      if (firstIFDOffset < 8) {
	        throw new Error('Invalid TIFF data: First IFD offset < 8');
	      }

	      var ifdOffset = tiffOffset + firstIFDOffset;
	      var tags = this._readTags(this._exifStream, tiffOffset, ifdOffset, bigEndian);
	      this._tags = tags.tags;
	      this._tagData = tags.tagData;
	    }

	    /**
	     * Reads the TIFF tags from the stream
	     * @param  {ArrayBuffer} stream
	     * @param  {Number} tiffStart The position where tiff data starts
	     * @param  {Number} ifdStart  The position where the IFD starts
	     * @param  {Boolean} bigEndian
	     * @return {Object}
	     * @private
	     */
	  }, {
	    key: '_readTags',
	    value: function _readTags(stream, tiffStart, ifdStart, bigEndian) {
	      stream.setHead(ifdStart);
	      var entriesCount = stream.readInt16(!bigEndian);
	      var tags = {};
	      var tagData = [];

	      for (var i = 0; i < entriesCount; i++) {
	        var entryOffset = ifdStart + i * 12 + 2;
	        stream.setHead(entryOffset);
	        var tag = stream.readInt16(!bigEndian);
	        var type = undefined;
	        var numValues = undefined;
	        var valueOffset = undefined;
	        if (EXIF_TAGS[tag]) {
	          tag = EXIF_TAGS[tag];
	          type = stream.readInt16(!bigEndian);
	          numValues = stream.readInt32(!bigEndian);
	          valueOffset = stream.readInt32(!bigEndian) + tiffStart;
	          var value = null;

	          switch (type) {
	            case 1: // byte, 8-bit unsigned int
	            case 7:
	              // undefined, 8-bit byte, value depending on field
	              if (numValues === 1) {
	                value = stream.readInt8(!bigEndian);
	              } else {
	                value = [];
	                for (var _i = 0; _i < numValues; _i++) {
	                  value.push(stream.readInt8(!bigEndian));
	                }
	              }
	              break;
	            case 2:
	              // 8-bit ascii char
	              stream.setHead(numValues > 4 ? valueOffset : entryOffset + 8);
	              value = stream.readString(numValues);
	              break;
	            case 3:
	              // short
	              stream.setHead(numValues > 2 ? valueOffset : entryOffset + 8);
	              if (numValues === 1) {
	                value = stream.readInt16(!bigEndian);
	              } else {
	                value = [];
	                for (var _i2 = 0; _i2 < numValues; _i2++) {
	                  value.push(stream.readInt16(!bigEndian));
	                }
	              }
	              break;
	            case 4: // long
	            case 9:
	              // slong
	              stream.setHead(numValues > 1 ? valueOffset : entryOffset + 8);
	              if (numValues === 1) {
	                value = stream.readInt32(!bigEndian);
	              } else {
	                value = [];
	                for (var _i3 = 0; _i3 < numValues; _i3++) {
	                  value.push(stream.readInt32(!bigEndian));
	                }
	              }
	              break;
	            case 5: // rational (two long values, first numerator, second denominator)
	            case 10:
	              // rational (two slongs)
	              stream.setHead(valueOffset);
	              if (numValues === 1) {
	                var numerator = stream.readInt32(!bigEndian);
	                var denominator = stream.readInt32(!bigEndian);
	                value = numerator / denominator;
	              } else {
	                value = [];
	                for (var _i4 = 0; _i4 < numValues; _i4++) {
	                  var numerator = stream.readInt32(!bigEndian);
	                  var denominator = stream.readInt32(!bigEndian);
	                  var val = numerator / denominator;
	                  value.push(val);
	                }
	              }
	              break;
	          }

	          tags[tag] = value;
	          tagData[tag] = {
	            value: value,
	            numValues: numValues,
	            entryOffset: entryOffset,
	            valueOffset: valueOffset,
	            type: type
	          };
	        }
	      }

	      return { tags: tags, tagData: tagData };
	    }

	    /**
	     * Returns a new buffer containing the Exif segment
	     * @return {Array}
	     * @private
	     */
	  }, {
	    key: '_getExifBuffer',
	    value: function _getExifBuffer() {
	      var segments = this._segments;
	      for (var i = 0; i < segments.length; i++) {
	        var _segments$i = _slicedToArray(segments[i], 2);

	        var offset = _segments$i[0];
	        var end = _segments$i[1];

	        this._stream.setHead(offset);
	        var marker = this._stream.peekInt16();
	        if (marker === 0xffe1) {
	          return this._buf.slice(offset, end);
	        }
	      }
	      return false;
	    }

	    /**
	     * Slices the array into segments
	     * @param  {Array.<Number>} buf
	     * @return {Array}
	     * @private
	     */
	  }, {
	    key: '_sliceIntoSegments',
	    value: function _sliceIntoSegments(buf) {
	      var stream = new _arrayStream2['default'](buf);
	      var segments = [];
	      while (stream.getHead() < buf.length) {
	        var marker = stream.readInt16();
	        if (marker === 0xffd8) {
	          continue;
	        } // SOI
	        if (marker === 0xffda) {
	          break;
	        } // SOS Marker

	        if (marker >= 0xff00 && marker <= 0xffff) {
	          // Marker (FF-XX-HL-LL)
	          var _length = stream.readInt16();
	          var end = stream.getHead() + _length - 2;
	          segments.push([stream.getHead() - 4, end]);
	          stream.setHead(end);
	        } else {
	          throw new Error('Invalid marker: 0x' + marker.toString(16));
	        }
	      }

	      this._stream.setHead(0);

	      return segments;
	    }
	  }], [{
	    key: 'isJPEG',
	    value: function isJPEG(base64String) {
	      return JPEG_REGEX.test(base64String);
	    }

	    /**
	     * Creates a new instance of Exif from the given base64-encoded
	     * string
	     * @param  {String} base64String
	     * @return {Exif}
	     */
	  }, {
	    key: 'fromBase64String',
	    value: function fromBase64String(base64String) {
	      var raw = base64String.replace(DATA_JPEG_PREFIX, '');
	      var data = _base642['default'].decode(raw);
	      return new Exif(data);
	    }
	  }]);

	  return Exif;
	})();

	exports['default'] = Exif;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var ArrayStream = (function () {
	  function ArrayStream(buf) {
	    _classCallCheck(this, ArrayStream);

	    this._head = 0;
	    this._buf = buf;
	  }

	  _createClass(ArrayStream, [{
	    key: 'getHead',
	    value: function getHead() {
	      return this._head;
	    }
	  }, {
	    key: 'setHead',
	    value: function setHead(head) {
	      this._head = head;
	    }
	  }, {
	    key: 'peekInt8',
	    value: function peekInt8() {
	      return this._buf[this._head];
	    }
	  }, {
	    key: 'peekInt16',
	    value: function peekInt16() {
	      var littleEndian = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      var a = this._buf[this._head];
	      var b = this._buf[this._head + 1];
	      if (!littleEndian) {
	        return (a << 8) + b;
	      } else {
	        return (b << 8) + a;
	      }
	    }
	  }, {
	    key: 'peekInt24',
	    value: function peekInt24() {
	      var littleEndian = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      var a = this._buf[this._head];
	      var b = this._buf[this._head + 1];
	      var c = this._buf[this._head + 2];
	      if (!littleEndian) {
	        return (a << 16) + (b << 8) + c;
	      } else {
	        return (c << 16) + (b << 8) + a;
	      }
	    }
	  }, {
	    key: 'peekInt32',
	    value: function peekInt32() {
	      var littleEndian = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      var a = this._buf[this._head];
	      var b = this._buf[this._head + 1];
	      var c = this._buf[this._head + 2];
	      var d = this._buf[this._head + 3];
	      if (!littleEndian) {
	        return (a << 32) + (b << 16) + (c << 8) + d;
	      } else {
	        return (d << 32) + (c << 16) + (b << 8) + a;
	      }
	    }
	  }, {
	    key: 'writeInt16',
	    value: function writeInt16(num) {
	      this._buf[this._head] = num >> 8; // upper
	      this._buf[this._head + 1] = num & 0xff; // lower
	    }
	  }, {
	    key: 'readInt8',
	    value: function readInt8() {
	      var num = this.peekInt8();
	      this._head += 1;
	      return num;
	    }
	  }, {
	    key: 'readInt16',
	    value: function readInt16() {
	      var littleEndian = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      var num = this.peekInt16(littleEndian);
	      this._head += 2;
	      return num;
	    }
	  }, {
	    key: 'readInt24',
	    value: function readInt24() {
	      var littleEndian = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      var num = this.peekInt24(littleEndian);
	      this._head += 3;
	      return num;
	    }
	  }, {
	    key: 'readInt32',
	    value: function readInt32() {
	      var littleEndian = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      var num = this.peekInt32(littleEndian);
	      this._head += 4;
	      return num;
	    }
	  }, {
	    key: 'readString',
	    value: function readString(length) {
	      var str = '';
	      for (var i = 0; i < length; i++) {
	        var character = this.readInt8();
	        str += String.fromCharCode(character);
	      }
	      return str;
	    }
	  }]);

	  return ArrayStream;
	})();

	exports['default'] = ArrayStream;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var VERSION_CHECK_FN = 'imglySDKVersionCallback';
	var VERSION_CHECK_URL = 'https://www.photoeditorsdk.com/version.json?sdk=html5&jsoncallback=' + VERSION_CHECK_FN;

	var VersionChecker = (function () {
	  function VersionChecker(version) {
	    _classCallCheck(this, VersionChecker);

	    this._version = version;
	    this._check();
	  }

	  /**
	   * Checks if this version of the SDK is outdated
	   * @private
	   */

	  _createClass(VersionChecker, [{
	    key: '_check',
	    value: function _check() {
	      var self = this;
	      window[VERSION_CHECK_FN] = function (response) {
	        if (response.outdated) {
	          console.warn('imgly-sdk-html5: Your version ' + self._version + ' is outdated.');
	          console.warn('imgly-sdk-html5: Current version is ' + response.version + '.');
	        }
	      };

	      var script = document.createElement('script');
	      script.src = VERSION_CHECK_URL + '&version=' + this._version;
	      script.async = true;
	      document.getElementsByTagName('head')[0].appendChild(script);
	    }
	  }]);

	  return VersionChecker;
	})();

	exports['default'] = VersionChecker;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	/**
	 * An operation that can crop out a part of the image and rotates it
	 *
	 * @class
	 * @alias ImglyKit.Operations.RotationOperation
	 * @extends ImglyKit.Operation
	 */

	var RotationOperation = (function (_Operation) {
	  _inherits(RotationOperation, _Operation);

	  function RotationOperation() {
	    _classCallCheck(this, RotationOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(RotationOperation.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The fragment shader used for this operation
	     */
	    this.vertexShader = '\n      attribute vec2 a_position;\n      attribute vec2 a_texCoord;\n      varying vec2 v_texCoord;\n      uniform mat3 u_matrix;\n\n      void main() {\n        gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);\n        v_texCoord = a_texCoord;\n      }\n    ';
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Rotates the image using WebGL
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(RotationOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      var actualDegrees = this._options.degrees % 360;
	      var newDimensions = this.getNewDimensions(renderer);

	      // Build the rotation matrix
	      var radians = actualDegrees * (Math.PI / 180);
	      var c = Math.cos(radians);
	      var s = Math.sin(radians);
	      var rotationMatrix = [c, -s, 0, s, c, 0, 0, 0, 1];

	      // Run the shader
	      renderer.runShader(this.vertexShader, null, {
	        uniforms: {
	          u_matrix: { type: 'mat3fv', value: rotationMatrix }
	        }
	      });
	    }

	    /**
	     * Crops the image using Canvas2D
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();

	      var actualDegrees = this._options.degrees % 360;
	      var newDimensions = this.getNewDimensions(renderer);

	      // Create a rotated canvas
	      var newCanvas = renderer.createCanvas();
	      newCanvas.width = newDimensions.x;
	      newCanvas.height = newDimensions.y;
	      var newContext = newCanvas.getContext('2d');

	      newContext.save();

	      // Translate the canvas
	      newContext.translate(newCanvas.width / 2, newCanvas.height / 2);

	      // Rotate the canvas
	      newContext.rotate(actualDegrees * (Math.PI / 180));

	      // Create a temporary canvas so that we can draw the image
	      // with the applied transformation
	      var tempCanvas = renderer.cloneCanvas();
	      newContext.drawImage(tempCanvas, -canvas.width / 2, -canvas.height / 2);

	      // Restore old transformation
	      newContext.restore();

	      renderer.setCanvas(newCanvas);
	    }

	    /**
	     * Gets the new dimensions
	     * @param {Renderer} renderer
	     * @param {Vector2} [dimensions]
	     * @return {Vector2}
	     */
	  }, {
	    key: 'getNewDimensions',
	    value: function getNewDimensions(renderer, dimensions) {
	      dimensions = dimensions || renderer.getSize();

	      var actualDegrees = this._options.degrees % 360;
	      if (actualDegrees % 180 !== 0) {
	        dimensions.flip();
	      }

	      return dimensions;
	    }
	  }]);

	  return RotationOperation;
	})(_operation2['default']);

	RotationOperation.prototype.identifier = 'rotation';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	RotationOperation.prototype.availableOptions = {
	  degrees: { type: 'number', 'default': 0, validation: function validation(value) {
	      if (value % 90 !== 0) {
	        throw new Error('RotationOperation: `rotation` has to be a multiple of 90.');
	      }
	    } }
	};

	exports['default'] = RotationOperation;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint unused:false */
	/* jshint -W083 */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _vendorPromise = __webpack_require__(8);

	var _vendorPromise2 = _interopRequireDefault(_vendorPromise);

	/**
	 * Base class for Operations. Extendable via {@link ImglyKit.Operation#extend}.
	 * @class
	 * @alias ImglyKit.Operation
	 */

	/**
	 * To create an {@link ImglyKit.Operation} class of your own, call this
	 * method and provide instance properties and functions.
	 * @function
	 */

	var _libExtend = __webpack_require__(24);

	var _libExtend2 = _interopRequireDefault(_libExtend);

	var Operation = (function (_EventEmitter) {
	  _inherits(Operation, _EventEmitter);

	  function Operation(kit, options) {
	    _classCallCheck(this, Operation);

	    _get(Object.getPrototypeOf(Operation.prototype), 'constructor', this).call(this);

	    this._kit = kit;
	    this.availableOptions = _libUtils2['default'].extend(this.availableOptions || {}, {
	      numberFormat: { type: 'string', 'default': 'relative', available: ['absolute', 'relative'] }
	    });
	    this._dirty = true;

	    this._glslPrograms = {};
	    this._uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	      var r = Math.random() * 16 | 0;
	      var v = c === 'x' ? r : r & 0x3 | 0x8;
	      return v.toString(16);
	    });

	    this._initOptions(options || {});
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Checks whether this Operation can be applied the way it is configured
	   * @return {Promise}
	   */

	  _createClass(Operation, [{
	    key: 'validateSettings',
	    value: function validateSettings() {
	      var _this = this;

	      var identifier = this.identifier;
	      return new _vendorPromise2['default'](function (resolve, reject) {
	        // Check for required options
	        for (var optionName in _this.availableOptions) {
	          var optionConfig = _this.availableOptions[optionName];
	          if (optionConfig.required && typeof _this._options[optionName] === 'undefined') {
	            return reject(new Error('Operation `' + identifier + '`: Option `' + optionName + '` is required.'));
	          }
	        }

	        resolve();
	      });
	    }

	    /**
	     * Applies this operation
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     * @abstract
	     */
	  }, {
	    key: 'render',
	    value: function render(renderer) {
	      var renderFn = undefined;
	      if (renderer.identifier === 'webgl') {
	        /* istanbul ignore next */
	        renderFn = this._renderWebGL.bind(this);
	      } else {
	        renderFn = this._renderCanvas.bind(this);
	      }

	      // Handle caching
	      if (this._dirty) {
	        renderFn(renderer);
	        renderer.cache(this._uuid);
	        this._dirty = false;
	      } else {
	        renderer.drawCached(this._uuid);
	      }
	    }

	    /**
	     * Applies this operation using WebGL
	     * @return {WebGLRenderer} renderer
	     * @private
	     */
	    /* istanbul ignore next */
	  }, {
	    key: '_renderWebGL',
	    value: function _renderWebGL() {
	      throw new Error('Operation#_renderWebGL is abstract and not implemented in inherited class.');
	    }

	    /**
	     * Applies this operation using Canvas2D
	     * @return {CanvasRenderer} renderer
	     * @private
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas() {
	      throw new Error('Operation#_renderCanvas is abstract and not implemented in inherited class.');
	    }

	    /**
	     * Goes through the available options, sets _options defaults
	     * @param {Object} userOptions
	     * @private
	     */
	  }, {
	    key: '_initOptions',
	    value: function _initOptions(userOptions) {
	      this._options = {};

	      // Set defaults, create getters and setters
	      var optionName, option, capitalized;
	      var self = this;
	      for (optionName in this.availableOptions) {
	        capitalized = optionName.charAt(0).toUpperCase() + optionName.slice(1);
	        option = this.availableOptions[optionName];

	        // Create setter and getter
	        var fn = function fn(optionName, option) {
	          self['set' + capitalized] = function (value) {
	            self._setOption(optionName, value);
	          };

	          // Default getter
	          self['get' + capitalized] = function () {
	            return self._getOption(optionName);
	          };
	        };
	        fn(optionName, option);

	        // Set default if available
	        if (typeof option['default'] !== 'undefined') {
	          this['set' + capitalized](option['default']);
	        }
	      }

	      // Overwrite options with the ones given by user
	      for (optionName in userOptions) {
	        // Check if option is available
	        if (typeof this.availableOptions[optionName] === 'undefined') {
	          throw new Error('Invalid option: ' + optionName);
	        }

	        // Call setter
	        capitalized = optionName.charAt(0).toUpperCase() + optionName.slice(1);
	        this['set' + capitalized](userOptions[optionName]);
	      }
	    }

	    /**
	     * Sets the given options
	     * @param {Object} options
	     */
	  }, {
	    key: 'set',
	    value: function set(options) {
	      for (var optionName in options) {
	        this._setOption(optionName, options[optionName], false);
	      }

	      this.emit('update');
	    }

	    /**
	     * Returns the value for the given option
	     * @param {String} optionName
	     * @return {*}
	     * @private
	     */
	  }, {
	    key: '_getOption',
	    value: function _getOption(optionName) {
	      return this._options[optionName];
	    }

	    /**
	     * Sets the value for the given option, validates it
	     * @param {String} optionName
	     * @param {*} value
	     * @param {Boolean} update
	     * @private
	     */
	  }, {
	    key: '_setOption',
	    value: function _setOption(optionName, value) {
	      var update = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	      var optionConfig = this.availableOptions[optionName];
	      var identifier = this.identifier;

	      if (typeof optionConfig.setter !== 'undefined') {
	        value = optionConfig.setter.call(this, value);
	      }

	      if (typeof optionConfig.validation !== 'undefined') {
	        optionConfig.validation(value);
	      }

	      switch (optionConfig.type) {
	        // String options
	        case 'string':
	          if (typeof value !== 'string') {
	            throw new Error('Operation `' + identifier + '`: Option `' + optionName + '` has to be a string.');
	          }

	          // String value restrictions
	          var available = optionConfig.available;
	          if (typeof available !== 'undefined' && available.indexOf(value) === -1) {
	            throw new Error('Operation `' + identifier + '`: Invalid value for `' + optionName + '` (valid values are: ' + optionConfig.available.join(', ') + ')');
	          }

	          this._options[optionName] = value;
	          break;

	        // Number options
	        case 'number':
	          if (typeof value !== 'number') {
	            throw new Error('Operation `' + identifier + '`: Option `' + optionName + '` has to be a number.');
	          }

	          this._options[optionName] = value;
	          break;

	        // Boolean options
	        case 'boolean':
	          if (typeof value !== 'boolean') {
	            throw new Error('Operation `' + identifier + '`: Option `' + optionName + '` has to be a boolean.');
	          }

	          this._options[optionName] = value;
	          break;

	        // Vector2 options
	        case 'vector2':
	          if (!(value instanceof _libMathVector22['default'])) {
	            throw new Error('Operation `' + identifier + '`: Option `' + optionName + '` has to be an instance of ImglyKit.Vector2.');
	          }

	          this._options[optionName] = value.clone();

	          break;

	        // Color options
	        case 'color':
	          if (!(value instanceof _libColor2['default'])) {
	            throw new Error('Operation `' + identifier + '`: Option `' + optionName + '` has to be an instance of ImglyKit.Color.');
	          }

	          this._options[optionName] = value;
	          break;

	        // Object options
	        case 'object':
	          this._options[optionName] = value;
	          break;

	        // Array options
	        case 'array':
	          this._options[optionName] = value.slice(0);
	          break;
	      }

	      this._dirty = true;
	      if (update) {
	        this.emit('update');
	      }
	    }

	    /**
	     * Gets the new dimensions
	     * @param {Renderer} renderer
	     * @param {Vector2} [dimensions]
	     * @return {Vector2}
	     * @private
	     */
	  }, {
	    key: 'getNewDimensions',
	    value: function getNewDimensions(renderer, dimensions) {
	      var canvas = renderer.getCanvas();
	      dimensions = dimensions || new _libMathVector22['default'](canvas.width, canvas.height);

	      return dimensions;
	    }

	    /**
	     * Gets called when this operation has been marked as dirty
	     * @protected
	     */
	  }, {
	    key: '_onDirty',
	    value: function _onDirty() {}

	    /**
	     * Resets this operation
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this._dirty = true;
	      this._glslPrograms = {};
	    }

	    /**
	     * Sets this operation to dirty, so that it will re-render next time
	     * @param {Boolean} dirty = true
	     */
	  }, {
	    key: 'dirty',
	    set: function set(dirty) {
	      this._dirty = dirty;
	      this._onDirty && this._onDirty();
	    },

	    /**
	     * Returns the dirty state
	     * @type {Boolean}
	     */
	    get: function get() {
	      return this._dirty;
	    }
	  }]);

	  return Operation;
	})(_libEventEmitter2['default']);

	Operation.prototype.identifier = null;
	Operation.extend = _libExtend2['default'];

	exports['default'] = Operation;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * Represents a color
	 * @class
	 * @alias ImglyKit.Color
	 * @param {Number} r
	 * @param {Number} g
	 * @param {Number} b
	 * @param {Number} [a]
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Color = (function () {
	  function Color(r, g, b, a) {
	    _classCallCheck(this, Color);

	    if (typeof a === 'undefined') {
	      a = 1.0;
	    }

	    this.r = r;
	    this.g = g;
	    this.b = b;
	    this.a = a;
	  }

	  /**
	   * Returns an rgba() representation of this color
	   * @return {String}
	   */

	  _createClass(Color, [{
	    key: 'toRGBA',
	    value: function toRGBA() {
	      var colors = [Math.round(this.r * 255), Math.round(this.g * 255), Math.round(this.b * 255), this.a];
	      return 'rgba(' + colors.join(',') + ')';
	    }

	    /**
	     * Returns a hex representation of this color
	     * @return {String}
	     */
	  }, {
	    key: 'toHex',
	    value: function toHex() {
	      var components = [this._componentToHex(Math.round(this.r * 255)), this._componentToHex(Math.round(this.g * 255)), this._componentToHex(Math.round(this.b * 255))];
	      return '#' + components.join('');
	    }

	    /**
	     * Returns an array with 4 values (0...1)
	     * @return {Array.<Number>}
	     */
	  }, {
	    key: 'toGLColor',
	    value: function toGLColor() {
	      return [this.r, this.g, this.b, this.a];
	    }

	    /**
	     * Returns an array with 3 values (0...1)
	     * @return {Array.<Number>}
	     */
	  }, {
	    key: 'toRGBGLColor',
	    value: function toRGBGLColor() {
	      return [this.r, this.g, this.b];
	    }

	    /**
	     * Converts the RGB value to HSV
	     * @return {Array.<Number>}
	     */
	  }, {
	    key: 'toHSV',
	    value: function toHSV() {
	      var max = Math.max(this.r, this.g, this.b);
	      var min = Math.min(this.r, this.g, this.b);
	      var h = undefined;
	      var s = undefined;
	      var v = max;
	      var d = max - min;
	      s = max === 0 ? 0 : d / max;

	      if (max === min) {
	        h = 0; // achromatic
	      } else {
	          switch (max) {
	            case this.r:
	              h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0);
	              break;
	            case this.g:
	              h = (this.b - this.r) / d + 2;
	              break;
	            case this.b:
	              h = (this.r - this.g) / d + 4;
	              break;
	          }
	          h /= 6;
	        }

	      return [h, s, v];
	    }

	    /**
	     * Sets the RGB values of this color to match the given HSV values
	     * @param {Number} h
	     * @param {Number} s
	     * @param {Number} v
	     */
	  }, {
	    key: 'fromHSV',
	    value: function fromHSV(h, s, v) {
	      var r = this.r;
	      var g = this.g;
	      var b = this.b;

	      var i = Math.floor(h * 6);
	      var f = h * 6 - i;
	      var p = v * (1 - s);
	      var q = v * (1 - f * s);
	      var t = v * (1 - (1 - f) * s);

	      switch (i % 6) {
	        case 0:
	          r = v;
	          g = t;
	          b = p;
	          break;
	        case 1:
	          r = q;
	          g = v;
	          b = p;
	          break;
	        case 2:
	          r = p;
	          g = v;
	          b = t;
	          break;
	        case 3:
	          r = p;
	          g = q;
	          b = v;
	          break;
	        case 4:
	          r = t;
	          g = p;
	          b = v;
	          break;
	        case 5:
	          r = v;
	          g = p;
	          b = q;
	          break;
	      }

	      this.r = r;
	      this.g = g;
	      this.b = b;
	    }

	    /**
	     * Returns a clone of the current color
	     * @return {Color}
	     */
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Color(this.r, this.g, this.b, this.a);
	    }

	    /**
	     * Returns the given number as hex
	     * @param  {Number} component
	     * @return {String}
	     * @private
	     */
	  }, {
	    key: '_componentToHex',
	    value: function _componentToHex(component) {
	      var hex = component.toString(16);
	      return hex.length === 1 ? '0' + hex : hex;
	    }

	    /**
	     * Returns the string representation of this color
	     * @returns {String}
	     */
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return 'Color(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
	    }
	  }]);

	  return Color;
	})();

	exports['default'] = Color;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * Helper function to correctly set up the prototype chain
	 * Based on the backbone.js extend function:
	 * https://github.com/jashkenas/backbone/blob/master/backbone.js
	 * @param  {Object} prototypeProperties
	 * @param  {Object} classProperties
	 * @return {Object}
	 */
	'use strict';

	module.exports = function (prototypeProperties, classProperties) {
	  /*jshint validthis:true*/
	  var parent = this;
	  var child;

	  // The constructor function for the new subclass is either defined by you
	  // (the 'constructor' property in your `extend` definition), or defaulted
	  // by us to simply call the parent's constructor.
	  if (prototypeProperties && prototypeProperties.hasOwnProperty('constructor')) {
	    child = prototypeProperties.constructor;
	  } else {
	    child = function () {
	      return parent.apply(this, arguments);
	    };
	  }

	  // Add static properties to the constructor function, if supplied.
	  var key;
	  for (key in parent) {
	    child[key] = parent[key];
	  }
	  if (typeof classProperties !== 'undefined') {
	    for (key in classProperties) {
	      child[key] = classProperties[key];
	    }
	  }

	  // Set the prototype chain to inherit from `parent`, without calling
	  // `parent`'s constructor function.
	  var Surrogate = function Surrogate() {
	    this.constructor = child;
	  };
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate();

	  // Add prototype properties (instance properties) to the subclass,
	  // if supplied.
	  if (prototypeProperties) {
	    for (key in prototypeProperties) {
	      child.prototype[key] = prototypeProperties[key];
	    }
	  }

	  // Set a convenience property in case the parent's prototype is needed
	  // later.
	  child.__super__ = parent.prototype;

	  return child;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	/**
	 * An operation that can flip the canvas
	 *
	 * @class
	 * @alias ImglyKit.Operations.FlipOperation
	 * @extends ImglyKit.Operation
	 */

	var FlipOperation = (function (_Operation) {
	  _inherits(FlipOperation, _Operation);

	  function FlipOperation() {
	    _classCallCheck(this, FlipOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(FlipOperation.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The fragment shader used for this operation
	     */
	    this.fragmentShader = '\n      precision mediump float;\n      uniform sampler2D u_image;\n      varying vec2 v_texCoord;\n      uniform bool u_flipVertical;\n      uniform bool u_flipHorizontal;\n\n      void main() {\n        vec2 texCoord = vec2(v_texCoord);\n        if (u_flipVertical) {\n          texCoord.y = 1.0 - texCoord.y;\n        }\n        if (u_flipHorizontal) {\n          texCoord.x = 1.0 - texCoord.x;\n        }\n        gl_FragColor = texture2D(u_image, texCoord);\n      }\n    ';
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Crops this image using WebGL
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(FlipOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      renderer.runShader(null, this.fragmentShader, {
	        uniforms: {
	          u_flipVertical: { type: 'f', value: this._options.vertical },
	          u_flipHorizontal: { type: 'f', value: this._options.horizontal }
	        }
	      });
	    }

	    /**
	     * Crops the image using Canvas2D
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var context = renderer.getContext();

	      var scaleX = 1,
	          scaleY = 1;
	      var translateX = 0,
	          translateY = 0;

	      if (this._options.horizontal) {
	        scaleX = -1;
	        translateX = canvas.width;
	      }

	      if (this._options.vertical) {
	        scaleY = -1;
	        translateY = canvas.height;
	      }

	      // Save the current state
	      context.save();

	      // Apply the transformation
	      context.translate(translateX, translateY);
	      context.scale(scaleX, scaleY);

	      // Create a temporary canvas so that we can draw the image
	      // with the applied transformation
	      var tempCanvas = renderer.cloneCanvas();
	      context.drawImage(tempCanvas, 0, 0);

	      // Restore old transformation
	      context.restore();
	    }
	  }]);

	  return FlipOperation;
	})(_operation2['default']);

	FlipOperation.prototype.identifier = 'flip';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	FlipOperation.prototype.availableOptions = {
	  horizontal: { type: 'boolean', 'default': false },
	  vertical: { type: 'boolean', 'default': false }
	};

	exports['default'] = FlipOperation;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

	

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint unused: false */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * Base class for filters. Extendable via {@link ImglyKit.Filter#extend}
	 * @class
	 * @alias ImglyKit.Filter
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Filter = (function () {
	  function Filter() {
	    _classCallCheck(this, Filter);
	  }

	  /**
	   * To create an {@link ImglyKit.Filter} class of your own, call this
	   * method and provide instance properties and functions.
	   * @function
	   */

	  _createClass(Filter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      /* istanbul ignore next */
	      throw new Error('Filter#render is abstract and not implemented in inherited class.');
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Filter;
	})();

	Filter.extend = __webpack_require__(24);

	// Exposed classes
	Filter.PrimitivesStack = __webpack_require__(28);
	Filter.Primitives = {};
	Filter.Primitives.Saturation = __webpack_require__(29);
	Filter.Primitives.LookupTable = __webpack_require__(31);
	Filter.Primitives.ToneCurve = __webpack_require__(32);
	Filter.Primitives.SoftColorOverlay = __webpack_require__(33);
	Filter.Primitives.Desaturation = __webpack_require__(34);
	Filter.Primitives.X400 = __webpack_require__(35);
	Filter.Primitives.Grayscale = __webpack_require__(36);
	Filter.Primitives.Contrast = __webpack_require__(37);
	Filter.Primitives.Glow = __webpack_require__(38);
	Filter.Primitives.Gobblin = __webpack_require__(39);
	Filter.Primitives.Brightness = __webpack_require__(40);

	exports['default'] = Filter;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * A helper class that can collect {@link Primitive} instances and render
	 * the stack
	 * @class
	 * @alias ImglyKit.Filter.PrimitivesStack
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PrimitivesStack = (function () {
	  function PrimitivesStack() {
	    _classCallCheck(this, PrimitivesStack);

	    /**
	     * The stack of {@link ImglyKit.Filter.Primitive} instances
	     * @type {Array}
	     * @private
	     */
	    this._stack = [];
	  }

	  /**
	   * Adds the given primitive to the stack
	   * @param {ImglyKit.Filter.Primitive} primitive
	   */

	  _createClass(PrimitivesStack, [{
	    key: "add",
	    value: function add(primitive) {
	      this._stack.push(primitive);
	    }

	    /**
	     * Renders the stack of primitives on the renderer
	     * @param  {Renderer} renderer
	     */
	  }, {
	    key: "render",
	    value: function render(renderer) {
	      for (var i = 0; i < this._stack.length; i++) {
	        var primitive = this._stack[i];
	        primitive.render(renderer);
	      }
	    }
	  }]);

	  return PrimitivesStack;
	})();

	exports["default"] = PrimitivesStack;
	module.exports = exports["default"];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * Saturation primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.Saturation
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var Saturation = (function (_Primitive) {
	  _inherits(Saturation, _Primitive);

	  function Saturation() {
	    _classCallCheck(this, Saturation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(Saturation.prototype), 'constructor', this).apply(this, args);

	    this._options = _libUtils2['default'].defaults(this._options, {
	      saturation: 0
	    });

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform float u_saturation;\n\n      const vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        float luminance = dot(texColor.rgb, luminanceWeighting);\n\n        vec3 greyScaleColor = vec3(luminance);\n\n        gl_FragColor = vec4(mix(greyScaleColor, texColor.rgb, u_saturation) * texColor.a, texColor.a);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(Saturation, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(null, this._fragmentShader);
	      }

	      renderer.runProgram(this._glslPrograms[renderer.id], {
	        uniforms: {
	          u_saturation: { type: 'f', value: this._options.saturation }
	        }
	      });
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     * @return {Promise}
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);
	      var saturation = this._options.saturation;

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          var luminance = imageData.data[index] * 0.2125 + imageData.data[index + 1] * 0.7154 + imageData.data[index + 2] * 0.0721;
	          imageData.data[index] = luminance * (1 - saturation) + imageData.data[index] * saturation;
	          imageData.data[index + 1] = luminance * (1 - saturation) + imageData.data[index + 1] * saturation;
	          imageData.data[index + 2] = luminance * (1 - saturation) + imageData.data[index + 2] * saturation;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return Saturation;
	})(_primitive2['default']);

	exports['default'] = Saturation;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports) {

	/* jshint unused: false */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	/**
	 * Base class for primitives. Extendable via {@link ImglyKit.Filter.Primitive#extend}
	 * @class
	 * @alias ImglyKit.Filter.Primitive
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Primitive = (function () {
	  function Primitive(options) {
	    _classCallCheck(this, Primitive);

	    options = options || {};

	    this._glslPrograms = {};
	    this._options = options;
	  }

	  /**
	   * Renders the primitive
	   * @param  {Renderer} renderer
	   * @return {Promise}
	   */

	  _createClass(Primitive, [{
	    key: 'render',
	    value: function render(renderer) {
	      if (renderer.identifier === 'webgl') {
	        this.renderWebGL(renderer);
	      } else {
	        this.renderCanvas(renderer);
	      }
	    }

	    /**
	     * Renders the primitive (WebGL)
	     * @param  {CanvasRenderer} renderer
	     */
	    /* istanbul ignore next */
	  }, {
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      /* istanbul ignore next */
	      throw new Error('Primitive#renderWebGL is abstract and not implemented in inherited class.');
	    }

	    /**
	     * Renders the primitive (Canvas2D)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      /* istanbul ignore next */
	      throw new Error('Primitive#renderCanvas is abstract and not implemented in inherited class.');
	    }
	  }, {
	    key: 'options',
	    get: function get() {
	      return this._options;
	    }
	  }]);

	  return Primitive;
	})();

	exports['default'] = Primitive;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * Stores a 256 byte long lookup table in a 2d texture which will be
	 * used to look up the corresponding value for each channel.
	 * @class
	 * @alias ImglyKit.Filter.Primitives.LookupTable
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var LookupTable = (function (_Primitive) {
	  _inherits(LookupTable, _Primitive);

	  function LookupTable() {
	    _classCallCheck(this, LookupTable);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(LookupTable.prototype), 'constructor', this).apply(this, args);

	    this._textureIndex = 3;

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform sampler2D u_lookupTable;\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        float r = texture2D(u_lookupTable, vec2(texColor.r, 0.0)).r;\n        float g = texture2D(u_lookupTable, vec2(texColor.g, 0.0)).g;\n        float b = texture2D(u_lookupTable, vec2(texColor.b, 0.0)).b;\n\n        gl_FragColor = vec4(vec3(r, g, b) * texColor.a, texColor.a);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(LookupTable, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      this._updateTexture(renderer);

	      renderer.runShader(null, this._fragmentShader, {
	        uniforms: {
	          u_lookupTable: { type: 'i', value: 3 }
	        }
	      });
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);
	      var table = this._options.data;

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          var r = imageData.data[index];
	          imageData.data[index] = table[r * 4];
	          var g = imageData.data[index + 1];
	          imageData.data[index + 1] = table[1 + g * 4];
	          var b = imageData.data[index + 2];
	          imageData.data[index + 2] = table[2 + b * 4];
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }

	    /**
	     * Updates the lookup table texture (WebGL only)
	     * @private
	     */
	    /* istanbul ignore next */
	  }, {
	    key: '_updateTexture',
	    value: function _updateTexture(renderer) {
	      var gl = renderer.getContext();

	      if (typeof this._options.data === 'undefined') {
	        throw new Error('LookupTable: No data specified.');
	      }

	      var dataTypedArray = new Uint8Array(this._options.data);

	      gl.activeTexture(gl.TEXTURE0 + this._textureIndex);
	      if (!this._texture) {
	        this._texture = gl.createTexture();
	      }
	      gl.bindTexture(gl.TEXTURE_2D, this._texture);

	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, dataTypedArray);
	      gl.activeTexture(gl.TEXTURE0);
	    }
	  }]);

	  return LookupTable;
	})(_primitive2['default']);

	exports['default'] = LookupTable;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _lookupTable = __webpack_require__(31);

	var _lookupTable2 = _interopRequireDefault(_lookupTable);

	/**
	 * Tone curve primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.ToneCurve
	 * @extends {ImglyKit.Filter.Primitives.LookupTable}
	 */

	var ToneCurve = (function (_LookupTable) {
	  _inherits(ToneCurve, _LookupTable);

	  function ToneCurve() {
	    _classCallCheck(this, ToneCurve);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(ToneCurve.prototype), 'constructor', this).apply(this, args);

	    this._options = _libUtils2['default'].defaults(this._options, {
	      rgbControlPoints: {
	        red: this._options.controlPoints,
	        green: this._options.controlPoints,
	        blue: this._options.controlPoints
	      }
	    });

	    if (typeof this._options.rgbControlPoints !== 'undefined') {
	      this._updateLookupTable();
	    }
	  }

	  /**
	   * Calculates the lookup table
	   * @private
	   */

	  _createClass(ToneCurve, [{
	    key: '_updateLookupTable',
	    value: function _updateLookupTable() {
	      var r = this._calculateSplineCurve(this._options.rgbControlPoints.red);
	      var g = this._calculateSplineCurve(this._options.rgbControlPoints.green);
	      var b = this._calculateSplineCurve(this._options.rgbControlPoints.blue);

	      this._options.data = this._buildLookupTable(r, g, b);
	    }

	    /**
	     * Builds the lookup table
	     * @param  {Array} r
	     * @param  {Array} g
	     * @param  {Array} b
	     * @return {Array}
	     * @private
	     */
	  }, {
	    key: '_buildLookupTable',
	    value: function _buildLookupTable(r, g, b) {
	      var data = [];

	      for (var i = 0; i < 256; i++) {
	        data.push(Math.min(Math.max(i + r[i], 0), 255));
	        data.push(Math.min(Math.max(i + g[i], 0), 255));
	        data.push(Math.min(Math.max(i + b[i], 0), 255));
	        data.push(255);
	      }

	      return data;
	    }

	    /**
	     * Calculates the spline curve data for the given points
	     * @param  {Array.<Array.<Number>>} points
	     * @return {Array.<Number>}
	     */
	  }, {
	    key: '_calculateSplineCurve',
	    value: function _calculateSplineCurve(points) {
	      points = points.sort(function (a, b) {
	        return a[0] > b[0];
	      });

	      var splinePoints = this._getSplineCurve(points);
	      var firstSplinePoint = splinePoints[0];
	      var i;

	      if (firstSplinePoint[0] > 0) {
	        for (i = 0; i < firstSplinePoint[0]; i++) {
	          splinePoints.unshift([0, 0]);
	        }
	      }

	      var preparedPoints = [];
	      for (i = 0; i < splinePoints.length; i++) {
	        var newPoint = splinePoints[i];
	        var origPoint = [newPoint[0], newPoint[0]];

	        var distance = Math.sqrt(Math.pow(origPoint[0] - newPoint[0], 2) + Math.pow(origPoint[1] - newPoint[1], 2));

	        if (origPoint[1] > newPoint[1]) {
	          distance = -distance;
	        }

	        preparedPoints.push(distance);
	      }

	      return preparedPoints;
	    }
	  }, {
	    key: '_getSplineCurve',
	    value: function _getSplineCurve(points) {
	      var sdA = this._secondDerivative(points);

	      var n = sdA.length;
	      var sd = [];
	      var i;

	      for (i = 0; i < n; i++) {
	        sd[i] = sdA[i];
	      }

	      var output = [];

	      for (i = 0; i < n - 1; i++) {
	        var cur = points[i];
	        var next = points[i + 1];

	        for (var x = cur[0]; x < next[0]; x++) {
	          var t = (x - cur[0]) / (next[0] - cur[0]);

	          var a = 1 - t;
	          var b = t;
	          var h = next[0] - cur[0];

	          var y = a * cur[1] + b * next[1] + h * h / 6 * ((a * a * a - a) * sd[i] + (b * b * b - b) * sd[i + 1]);

	          if (y > 255) {
	            y = 255;
	          } else if (y < 0) {
	            y = 0;
	          }

	          output.push([x, y]);
	        }
	      }

	      if (output.length === 255) {
	        output.push(points[points.length - 1]);
	      }

	      return output;
	    }
	  }, {
	    key: '_secondDerivative',
	    value: function _secondDerivative(points) {
	      var n = points.length;
	      if (n <= 0 || n === 1) {
	        return null;
	      }

	      var matrix = [];
	      var result = [];
	      var i, k;

	      matrix[0] = [0, 1, 0];

	      for (i = 1; i < n - 1; i++) {
	        var P1 = points[i - 1];
	        var P2 = points[i];
	        var P3 = points[i + 1];

	        matrix[i] = matrix[i] || [];
	        matrix[i][0] = (P2[0] - P1[0]) / 6;
	        matrix[i][1] = (P3[0] - P1[0]) / 3;
	        matrix[i][2] = (P3[0] - P2[0]) / 6;
	        result[i] = (P3[1] - P2[1]) / (P3[0] - P2[0]) - (P2[1] - P1[1]) / (P2[0] - P1[0]);
	      }

	      result[0] = 0;
	      result[n - 1] = 0;

	      matrix[n - 1] = [0, 1, 0];

	      // Pass 1
	      for (i = 1; i < n; i++) {
	        k = matrix[1][0] / matrix[i - 1][1];
	        matrix[i][1] -= k * matrix[i - 1][2];
	        matrix[i][0] = 0;
	        result[i] -= k * result[i - 1];
	      }

	      // Pass 2
	      for (i = n - 2; i > 0; i--) {
	        k = matrix[i][2] / matrix[i + 1][1];
	        matrix[i][1] -= k * matrix[i + 1][0];
	        matrix[i][2] = 0;
	        result[i] -= k * result[i + 1];
	      }

	      var y2 = [];
	      for (i = 0; i < n; i++) {
	        y2[i] = result[i] / matrix[i][1];
	      }

	      return y2;
	    }
	  }]);

	  return ToneCurve;
	})(_lookupTable2['default']);

	exports['default'] = ToneCurve;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	/**
	 * SoftColorOverlay primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.SoftColorOverlay
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var SoftColorOverlay = (function (_Primitive) {
	  _inherits(SoftColorOverlay, _Primitive);

	  function SoftColorOverlay() {
	    _classCallCheck(this, SoftColorOverlay);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(SoftColorOverlay.prototype), 'constructor', this).apply(this, args);

	    this._options = _libUtils2['default'].defaults(this._options, {
	      color: new _libColor2['default'](1.0, 1.0, 1.0)
	    });

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform vec3 u_overlay;\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        vec4 overlayVec4 = vec4(u_overlay, texColor.a);\n        gl_FragColor = max(overlayVec4 * texColor.a, texColor);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(SoftColorOverlay, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      renderer.runShader(null, this._fragmentShader, {
	        uniforms: {
	          u_overlay: { type: '3f', value: this._options.color.toRGBGLColor() }
	        }
	      });
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          imageData.data[index] = Math.max(this._options.color.r, imageData.data[index]);
	          imageData.data[index + 1] = Math.max(this._options.color.g, imageData.data[index + 1]);
	          imageData.data[index + 2] = Math.max(this._options.color.b, imageData.data[index + 2]);
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return SoftColorOverlay;
	})(_primitive2['default']);

	exports['default'] = SoftColorOverlay;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * Desaturation primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.Desaturation
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var Desaturation = (function (_Primitive) {
	  _inherits(Desaturation, _Primitive);

	  function Desaturation() {
	    _classCallCheck(this, Desaturation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(Desaturation.prototype), 'constructor', this).apply(this, args);

	    this._options = _libUtils2['default'].defaults(this._options, {
	      desaturation: 1.0
	    });

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform float u_desaturation;\n\n      const vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        vec3 grayXfer = vec3(0.3, 0.59, 0.11);\n        vec3 gray = vec3(dot(grayXfer, texColor.xyz));\n        gl_FragColor = vec4(mix(texColor.xyz, gray, u_desaturation) * texColor.a, texColor.a);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   * @return {Promise}
	   */
	  /* istanbul ignore next */

	  _createClass(Desaturation, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      renderer.runShader(null, this._fragmentShader, {
	        uniforms: {
	          u_desaturation: { type: 'f', value: this._options.desaturation }
	        }
	      });
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);
	      var desaturation = this._options.desaturation;

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          var luminance = imageData.data[index] * 0.3 + imageData.data[index + 1] * 0.59 + imageData.data[index + 2] * 0.11;
	          imageData.data[index] = luminance * (1 - desaturation) + imageData.data[index] * desaturation;
	          imageData.data[index + 1] = luminance * (1 - desaturation) + imageData.data[index + 1] * desaturation;
	          imageData.data[index + 2] = luminance * (1 - desaturation) + imageData.data[index + 2] * desaturation;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return Desaturation;
	})(_primitive2['default']);

	exports['default'] = Desaturation;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * X400 primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.X400
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var X400 = (function (_Primitive) {
	  _inherits(X400, _Primitive);

	  function X400() {
	    _classCallCheck(this, X400);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(X400.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        float gray = texColor.r * 0.3 + texColor.g * 0.3 + texColor.b * 0.3;\n        gray -= 0.2;\n        gray = clamp(gray, 0.0, 1.0);\n        gray += 0.15;\n        gray *= 1.4;\n        gl_FragColor = vec4(vec3(gray) * texColor.a, texColor.a);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(X400, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      renderer.runShader(null, this._fragmentShader);
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          var gray = imageData.data[index] / 255 * 0.3 + imageData.data[index + 1] / 255 * 0.3 + imageData.data[index + 2] / 255 * 0.3;
	          gray -= 0.2;
	          gray = Math.max(0.0, Math.min(1.0, gray));
	          gray += 0.15;
	          gray *= 1.4;

	          gray *= 255;
	          imageData.data[index] = gray;
	          imageData.data[index + 1] = gray;
	          imageData.data[index + 2] = gray;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return X400;
	})(_primitive2['default']);

	exports['default'] = X400;
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * Grayscale primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.Grayscale
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var Grayscale = (function (_Primitive) {
	  _inherits(Grayscale, _Primitive);

	  function Grayscale() {
	    _classCallCheck(this, Grayscale);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(Grayscale.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      vec3 W = vec3(0.2125, 0.7154, 0.0721);\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        float luminance = dot(texColor.rgb, W);\n        gl_FragColor = vec4(vec3(luminance) * texColor.a, texColor.a);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   * @return {Promise}
	   */
	  /* istanbul ignore next */

	  _createClass(Grayscale, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      renderer.runShader(null, this._fragmentShader);
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          var luminance = imageData.data[index] * 0.2125 + imageData.data[index + 1] * 0.7154 + imageData.data[index + 2] * 0.0721;

	          imageData.data[index] = luminance;
	          imageData.data[index + 1] = luminance;
	          imageData.data[index + 2] = luminance;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return Grayscale;
	})(_primitive2['default']);

	exports['default'] = Grayscale;
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * Contrast primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.Contrast
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var Contrast = (function (_Primitive) {
	  _inherits(Contrast, _Primitive);

	  function Contrast() {
	    _classCallCheck(this, Contrast);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(Contrast.prototype), 'constructor', this).apply(this, args);

	    this._options = _libUtils2['default'].defaults(this._options, {
	      contrast: 1.0
	    });

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform float u_contrast;\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        gl_FragColor = vec4(((texColor.rgb - vec3(0.5)) * u_contrast + vec3(0.5) * texColor.a), texColor.a);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(Contrast, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(null, this._fragmentShader);
	      }

	      renderer.runProgram(this._glslPrograms[renderer.id], {
	        uniforms: {
	          u_contrast: { type: 'f', value: this._options.contrast }
	        }
	      });
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);
	      var contrast = this._options.contrast;

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          imageData.data[index] = (imageData.data[index] - 127) * contrast + 127;
	          imageData.data[index + 1] = (imageData.data[index + 1] - 127) * contrast + 127;
	          imageData.data[index + 2] = (imageData.data[index + 2] - 127) * contrast + 127;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return Contrast;
	})(_primitive2['default']);

	exports['default'] = Contrast;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	/**
	 * Glow primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.Glow
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var Glow = (function (_Primitive) {
	  _inherits(Glow, _Primitive);

	  function Glow() {
	    _classCallCheck(this, Glow);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(Glow.prototype), 'constructor', this).apply(this, args);

	    this._options = _libUtils2['default'].defaults(this._options, {
	      color: new _libColor2['default'](1, 1, 1)
	    });

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n\n      uniform vec3 u_color;\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n\n        vec2 textureCoord = v_texCoord - vec2(0.5, 0.5);\n        textureCoord /= 0.75;\n\n        float d = 1.0 - dot(textureCoord, textureCoord);\n        d = clamp(d, 0.2, 1.0);\n        vec3 newColor = texColor.rgb * d * u_color.rgb;\n        gl_FragColor = vec4(vec3(newColor) * texColor.a, texColor.a);\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   * @return {Promise}
	   */
	  /* istanbul ignore next */

	  _createClass(Glow, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      renderer.runShader(null, this._fragmentShader, {
	        uniforms: {
	          u_color: { type: '3f', value: this._options.color.toRGBGLColor() }
	        }
	      });
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     * @return {Promise}
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);
	      var color = this._options.color;

	      var d;
	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          var x01 = x / canvas.width;
	          var y01 = y / canvas.height;

	          var nx = (x01 - 0.5) / 0.75;
	          var ny = (y01 - 0.5) / 0.75;

	          var scalarX = nx * nx;
	          var scalarY = ny * ny;
	          d = 1 - (scalarX + scalarY);
	          d = Math.min(Math.max(d, 0.1), 1.0);

	          imageData.data[index] = imageData.data[index] * (d * color.r);
	          imageData.data[index + 1] = imageData.data[index + 1] * (d * color.g);
	          imageData.data[index + 2] = imageData.data[index + 2] * (d * color.b);
	          imageData.data[index + 3] = 255;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return Glow;
	})(_primitive2['default']);

	exports['default'] = Glow;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * Gobblin primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.Gobblin
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var Gobblin = (function (_Primitive) {
	  _inherits(Gobblin, _Primitive);

	  function Gobblin() {
	    _classCallCheck(this, Gobblin);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(Gobblin.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        texColor.b = texColor.g * 0.33;\n        texColor.r = texColor.r * 0.6;\n        texColor.b += texColor.r * 0.33;\n        texColor.g = texColor.g * 0.7;\n        gl_FragColor = texColor;\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   * @return {Promise}
	   */
	  /* istanbul ignore next */

	  _createClass(Gobblin, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      renderer.runShader(null, this._fragmentShader);
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          imageData.data[index + 2] = imageData.data[index + 1] * 0.33;
	          imageData.data[index] = imageData.data[index] * 0.6;
	          imageData.data[index + 2] += imageData.data[index] * 0.33;
	          imageData.data[index + 1] = imageData.data[index + 1] * 0.7;
	          imageData.data[index + 3] = 255;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return Gobblin;
	})(_primitive2['default']);

	exports['default'] = Gobblin;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _primitive = __webpack_require__(30);

	var _primitive2 = _interopRequireDefault(_primitive);

	/**
	 * Brightness primitive
	 * @class
	 * @alias ImglyKit.Filter.Primitives.Brightness
	 * @extends {ImglyKit.Filter.Primitive}
	 */

	var Brightness = (function (_Primitive) {
	  _inherits(Brightness, _Primitive);

	  function Brightness() {
	    _classCallCheck(this, Brightness);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(Brightness.prototype), 'constructor', this).apply(this, args);

	    this._options = _libUtils2['default'].defaults(this._options, {
	      brightness: 1.0
	    });

	    /**
	     * The fragment shader for this primitive
	     * @return {String}
	     * @private
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform float u_brightness;\n\n      void main() {\n        vec4 texColor = texture2D(u_image, v_texCoord);\n        gl_FragColor = vec4((texColor.rgb + vec3(u_brightness) * texColor.a), texColor.a);;\n      }\n    ';
	  }

	  /**
	   * Renders the primitive (WebGL)
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(Brightness, [{
	    key: 'renderWebGL',
	    value: function renderWebGL(renderer) {
	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(null, this._fragmentShader);
	      }

	      renderer.runProgram(this._glslPrograms[renderer.id], {
	        uniforms: {
	          u_brightness: { type: 'f', value: this._options.brightness }
	        }
	      });
	    }

	    /**
	     * Renders the primitive (Canvas)
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: 'renderCanvas',
	    value: function renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var imageData = renderer.getContext().getImageData(0, 0, canvas.width, canvas.height);
	      var brightness = this._options.brightness;

	      for (var x = 0; x < canvas.width; x++) {
	        for (var y = 0; y < canvas.height; y++) {
	          var index = (canvas.width * y + x) * 4;

	          imageData.data[index] = imageData.data[index] + brightness * 255;
	          imageData.data[index + 1] = imageData.data[index + 1] + brightness * 255;
	          imageData.data[index + 2] = imageData.data[index + 2] + brightness * 255;
	        }
	      }

	      renderer.getContext().putImageData(imageData, 0, 0);
	    }
	  }]);

	  return Brightness;
	})(_primitive2['default']);

	exports['default'] = Brightness;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _filtersIdentityFilter = __webpack_require__(42);

	var _filtersIdentityFilter2 = _interopRequireDefault(_filtersIdentityFilter);

	/**
	 * An operation that can apply a selected filter
	 *
	 * @class
	 * @alias ImglyKit.Operations.FiltersOperation
	 * @extends ImglyKit.Operation
	 */

	var FiltersOperation = (function (_Operation) {
	  _inherits(FiltersOperation, _Operation);

	  function FiltersOperation() {
	    _classCallCheck(this, FiltersOperation);

	    _get(Object.getPrototypeOf(FiltersOperation.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  _createClass(FiltersOperation, [{
	    key: '_renderWebGL',

	    /**
	     * Renders the filter using WebGL
	     * @param  {WebGLRenderer} renderer
	     * @override
	     */
	    /* istanbul ignore next */
	    value: function _renderWebGL(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the filter using Canvas2D
	     * @param {CanvasRenderer} renderer
	     * @override
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the filter (all renderers supported)
	     * @param {Renderer} renderer
	     * @private
	     */
	  }, {
	    key: '_render',
	    value: function _render(renderer) {
	      this._selectedFilter.render(renderer);
	    }
	  }]);

	  return FiltersOperation;
	})(_operation2['default']);

	FiltersOperation.prototype.identifier = 'filters';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	FiltersOperation.prototype.availableOptions = {
	  filter: { type: 'object', 'default': _filtersIdentityFilter2['default'],
	    setter: function setter(Filter) {
	      this._selectedFilter = new Filter();
	      return Filter;
	    }
	  }
	};

	exports['default'] = FiltersOperation;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Identity Filter
	 * @class
	 * @alias ImglyKit.Filters.IdentityFilter
	 * @extends {ImglyKit.Filter}
	 */

	var IdentityFilter = (function (_Filter) {
	  _inherits(IdentityFilter, _Filter);

	  function IdentityFilter() {
	    _classCallCheck(this, IdentityFilter);

	    _get(Object.getPrototypeOf(IdentityFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(IdentityFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @return {Promise}
	     */
	    value: function render() {
	      // This is the identity filter, it doesn't have any effect.
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Original';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'identity';
	    }
	  }]);

	  return IdentityFilter;
	})(_filter2['default']);

	exports['default'] = IdentityFilter;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _renderersWebglRendererJs = __webpack_require__(12);

	var _renderersWebglRendererJs2 = _interopRequireDefault(_renderersWebglRendererJs);

	/**
	 * An operation that can crop out a part of the image
	 *
	 * @class
	 * @alias ImglyKit.Operations.CropOperation
	 * @extends ImglyKit.Operation
	 */

	var CropOperation = (function (_Operation) {
	  _inherits(CropOperation, _Operation);

	  function CropOperation() {
	    _classCallCheck(this, CropOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(CropOperation.prototype), 'constructor', this).apply(this, args);
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Rotates and crops the image using WebGL
	   * @param  {WebGLRenderer} renderer
	   * @override
	   * @private
	   */
	  /* istanbul ignore next */

	  _createClass(CropOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      var start = this._options.start.clone();
	      var end = this._options.end.clone();
	      var size = end.clone().subtract(start);
	      var fragmentShader = null;

	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(null, fragmentShader, textureCoordinates);
	      }

	      var textureCoordinates = new Float32Array([
	      // First triangle
	      start.x, 1.0 - end.y, end.x, 1.0 - end.y, start.x, 1.0 - start.y,

	      // Second triangle
	      start.x, 1.0 - start.y, end.x, 1.0 - end.y, end.x, 1.0 - start.y]);
	      renderer.runProgram(this._glslPrograms[renderer.id], { textureCoordinates: textureCoordinates });
	    }

	    /**
	     * Crops the image using Canvas
	     * @param {CanvasRenderer} renderer
	     * @override
	     * @private
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var dimensions = new _libMathVector22['default'](canvas.width, canvas.height);

	      var newDimensions = this.getNewDimensions(renderer);

	      // Create a temporary canvas to draw to
	      var newCanvas = renderer.createCanvas();
	      newCanvas.width = newDimensions.x;
	      newCanvas.height = newDimensions.y;
	      var newContext = newCanvas.getContext('2d');

	      // The upper left corner of the cropped area on the original image
	      var startPosition = this._options.start.clone();

	      if (this._options.numberFormat === 'relative') {
	        startPosition.multiply(dimensions);
	      }

	      // Draw the source canvas onto the new one
	      newContext.drawImage(canvas, startPosition.x, startPosition.y, // source x, y
	      newDimensions.x, newDimensions.y, // source dimensions
	      0, 0, // destination x, y
	      newDimensions.x, newDimensions.y // destination dimensions
	      );

	      // Set the new canvas
	      renderer.setCanvas(newCanvas);
	    }

	    /**
	     * Gets the new dimensions
	     * @param {Renderer} renderer
	     * @param {Vector2} [dimensions]
	     * @return {Vector2}
	     */
	  }, {
	    key: 'getNewDimensions',
	    value: function getNewDimensions(renderer, dimensions) {
	      var canvas = renderer.getCanvas();
	      dimensions = dimensions || new _libMathVector22['default'](canvas.width, canvas.height);

	      var newDimensions = this._options.end.clone().subtract(this._options.start);

	      if (this._options.numberFormat === 'relative') {
	        newDimensions.multiply(dimensions);
	      }

	      return newDimensions;
	    }
	  }]);

	  return CropOperation;
	})(_operation2['default']);

	CropOperation.prototype.identifier = 'crop';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	CropOperation.prototype.availableOptions = {
	  start: { type: 'vector2', required: true, 'default': new _libMathVector22['default'](0, 0) },
	  end: { type: 'vector2', required: true, 'default': new _libMathVector22['default'](1, 1) }
	};

	exports['default'] = CropOperation;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _filtersPrimitivesStack = __webpack_require__(28);

	var _filtersPrimitivesStack2 = _interopRequireDefault(_filtersPrimitivesStack);

	var _filtersPrimitivesSaturation = __webpack_require__(29);

	var _filtersPrimitivesSaturation2 = _interopRequireDefault(_filtersPrimitivesSaturation);

	/**
	 * @class
	 * @alias ImglyKit.Operations.SaturationOperation
	 * @extends ImglyKit.Operation
	 */

	var SaturationOperation = (function (_Operation) {
	  _inherits(SaturationOperation, _Operation);

	  function SaturationOperation() {
	    _classCallCheck(this, SaturationOperation);

	    _get(Object.getPrototypeOf(SaturationOperation.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  _createClass(SaturationOperation, [{
	    key: '_renderWebGL',

	    /**
	     * Renders the saturation using WebGL
	     * @param  {WebGLRenderer} renderer
	     * @override
	     */
	    /* istanbul ignore next */
	    value: function _renderWebGL(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the saturation using Canvas2D
	     * @param {CanvasRenderer} renderer
	     * @override
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the saturation (all renderers supported)
	     * @param  {Renderer} renderer
	     * @private
	     */
	  }, {
	    key: '_render',
	    value: function _render(renderer) {
	      if (!this._stack) {
	        this._stack = new _filtersPrimitivesStack2['default']();
	        this._primitive = new _filtersPrimitivesSaturation2['default']({
	          saturation: this._options.saturation
	        });
	        this._stack.add(this._primitive);
	      }

	      // @TODO
	      // Primitives should have the same option logic as operations - which
	      // should allow us to do `this._primitive.setSaturation`
	      this._primitive.options.saturation = this._options.saturation;
	      this._stack.render(renderer);
	    }
	  }]);

	  return SaturationOperation;
	})(_operation2['default']);

	SaturationOperation.prototype.identifier = 'saturation';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	SaturationOperation.prototype.availableOptions = {
	  saturation: { type: 'number', 'default': 1.0 }
	};

	exports['default'] = SaturationOperation;
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _filtersPrimitivesStack = __webpack_require__(28);

	var _filtersPrimitivesStack2 = _interopRequireDefault(_filtersPrimitivesStack);

	var _filtersPrimitivesContrast = __webpack_require__(37);

	var _filtersPrimitivesContrast2 = _interopRequireDefault(_filtersPrimitivesContrast);

	/**
	 * @class
	 * @alias ImglyKit.Operations.ContrastOperation
	 * @extends ImglyKit.Operation
	 */

	var ContrastOperation = (function (_Operation) {
	  _inherits(ContrastOperation, _Operation);

	  function ContrastOperation() {
	    _classCallCheck(this, ContrastOperation);

	    _get(Object.getPrototypeOf(ContrastOperation.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  _createClass(ContrastOperation, [{
	    key: '_renderWebGL',

	    /**
	     * Renders the contrast using WebGL
	     * @param  {WebGLRenderer} renderer
	     * @override
	     */
	    /* istanbul ignore next */
	    value: function _renderWebGL(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the contrast using Canvas2D
	     * @param {CanvasRenderer} renderer
	     * @override
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the contrast (all renderers supported)
	     * @param  {Renderer} renderer
	     * @private
	     */
	  }, {
	    key: '_render',
	    value: function _render(renderer) {
	      if (!this._stack) {
	        this._stack = new _filtersPrimitivesStack2['default']();
	        this._primitive = new _filtersPrimitivesContrast2['default']({
	          contrast: this._options.contrast
	        });
	        this._stack.add(this._primitive);
	      }

	      // @TODO
	      // Primitives should have the same option logic as operations - which
	      // should allow us to do `this._primitive.setContrast`
	      this._primitive.options.contrast = this._options.contrast;
	      this._stack.render(renderer);
	    }
	  }]);

	  return ContrastOperation;
	})(_operation2['default']);

	ContrastOperation.prototype.identifier = 'contrast';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	ContrastOperation.prototype.availableOptions = {
	  contrast: { type: 'number', 'default': 1.0 }
	};

	exports['default'] = ContrastOperation;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _filtersPrimitivesStack = __webpack_require__(28);

	var _filtersPrimitivesStack2 = _interopRequireDefault(_filtersPrimitivesStack);

	var _filtersPrimitivesBrightness = __webpack_require__(40);

	var _filtersPrimitivesBrightness2 = _interopRequireDefault(_filtersPrimitivesBrightness);

	/**
	 * @class
	 * @alias ImglyKit.Operations.BrightnessOperation
	 * @extends ImglyKit.Operation
	 */

	var BrightnessOperation = (function (_Operation) {
	  _inherits(BrightnessOperation, _Operation);

	  function BrightnessOperation() {
	    _classCallCheck(this, BrightnessOperation);

	    _get(Object.getPrototypeOf(BrightnessOperation.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  _createClass(BrightnessOperation, [{
	    key: '_renderWebGL',

	    /**
	     * Renders the brightness using WebGL
	     * @param  {WebGLRenderer} renderer
	     * @override
	     */
	    /* istanbul ignore next */
	    value: function _renderWebGL(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the brightness using Canvas2D
	     * @param {CanvasRenderer} renderer
	     * @override
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      this._render(renderer);
	    }

	    /**
	     * Renders the brightness (all renderers supported)
	     * @param {Renderer} renderer
	     * @private
	     */
	  }, {
	    key: '_render',
	    value: function _render(renderer) {
	      if (!this._stack) {
	        this._stack = new _filtersPrimitivesStack2['default']();
	        this._primitive = new _filtersPrimitivesBrightness2['default']({
	          brightness: this._options.brightness
	        });
	        this._stack.add(this._primitive);
	      }

	      // @TODO
	      // Primitives should have the same option logic as operations - which
	      // should allow us to do `this._primitive.setBrightness`
	      this._primitive.options.brightness = this._options.brightness;
	      this._stack.render(renderer);
	    }
	  }]);

	  return BrightnessOperation;
	})(_operation2['default']);

	BrightnessOperation.prototype.identifier = 'brightness';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	BrightnessOperation.prototype.availableOptions = {
	  brightness: { type: 'number', 'default': 0 }
	};

	exports['default'] = BrightnessOperation;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ('value' in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _vendorStackBlur = __webpack_require__(48);

	var _vendorStackBlur2 = _interopRequireDefault(_vendorStackBlur);

	/**
	 * An operation that can crop out a part of the image
	 *
	 * @class
	 * @alias ImglyKit.Operations.TiltShiftOperation
	 * @extends ImglyKit.Operation
	 */

	var TiltShiftOperation = (function (_Operation) {
	  _inherits(TiltShiftOperation, _Operation);

	  function TiltShiftOperation() {
	    _classCallCheck(this, TiltShiftOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(TiltShiftOperation.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The fragment shader used for this operation
	     * @internal Based on evanw's glfx.js tilt shift shader:
	     *           https://github.com/evanw/glfx.js/blob/master/src/filters/blur/tiltshift.js
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      uniform sampler2D u_image;\n      uniform float blurRadius;\n      uniform float gradientRadius;\n      uniform vec2 start;\n      uniform vec2 end;\n      uniform vec2 delta;\n      uniform vec2 texSize;\n      varying vec2 v_texCoord;\n\n      float random(vec3 scale, float seed) {\n        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n      }\n\n      void main() {\n          vec4 color = vec4(0.0);\n          float total = 0.0;\n\n          float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n          vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n          float radius = smoothstep(0.0, 1.0, abs(dot(v_texCoord * texSize - start, normal)) / gradientRadius) * blurRadius;\n          for (float t = -30.0; t <= 30.0; t++) {\n              float percent = (t + offset - 0.5) / 30.0;\n              float weight = 1.0 - abs(percent);\n              vec4 sample = texture2D(u_image, v_texCoord + delta * percent * radius / texSize);\n\n              sample.rgb *= sample.a;\n\n              color += sample * weight;\n              total += weight;\n          }\n\n          gl_FragColor = color / total;\n          gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n      }\n    ';

	    this._cachedBlurredCanvas = null;
	    this._lastBlurRadius = this._options.blurRadius;
	    this._lastGradientRadius = this._options.gradientRadius;
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Crops this image using WebGL
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(TiltShiftOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      var canvas = renderer.getCanvas();
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      var start = this._options.start.clone();
	      var end = this._options.end.clone();

	      if (this._options.numberFormat === 'relative') {
	        start.multiply(canvasSize);
	        end.multiply(canvasSize);
	      }

	      start.y = canvasSize.y - start.y;
	      end.y = canvasSize.y - end.y;

	      var delta = end.clone().subtract(start);
	      var d = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

	      var uniforms = {
	        blurRadius: { type: 'f', value: this._options.blurRadius },
	        gradientRadius: { type: 'f', value: this._options.gradientRadius },
	        start: { type: '2f', value: [start.x, start.y] },
	        end: { type: '2f', value: [end.x, end.y] },
	        delta: { type: '2f', value: [delta.x / d, delta.y / d] },
	        texSize: { type: '2f', value: [canvas.width, canvas.height] }
	      };

	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(null, this._fragmentShader);
	      }

	      renderer.runProgram(this._glslPrograms[renderer.id], { uniforms: uniforms });

	      // Update delta for second pass
	      uniforms.delta.value = [-delta.y / d, delta.x / d];

	      renderer.runProgram(this._glslPrograms[renderer.id], { uniforms: uniforms });
	    }

	    /**
	     * Crops the image using Canvas2D
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();

	      var optionsChanged = this._options.blurRadius !== this._lastBlurRadius || this._options.gradientRadius !== this._lastGradientRadius;
	      var blurryCanvas = undefined;
	      if (optionsChanged || this._cachedBlurredCanvas === null) {
	        // Blur and cache canvas
	        blurryCanvas = this._blurCanvas(renderer);
	        this._cachedBlurredCanvas = blurryCanvas;
	        this._lastBlurRadius = this._options.blurRadius;
	        this._lastGradientRadius = this._options.gradientRadius;
	      } else {
	        // Use cached canvas
	        blurryCanvas = this._cachedBlurredCanvas;
	      }

	      var maskCanvas = this._createMask(renderer);

	      this._applyMask(canvas, blurryCanvas, maskCanvas);
	    }

	    /**
	     * Creates a blurred copy of the canvas
	     * @param  {CanvasRenderer} renderer
	     * @return {Canvas}
	     * @private
	     */
	  }, {
	    key: '_blurCanvas',
	    value: function _blurCanvas(renderer) {
	      var newCanvas = renderer.cloneCanvas();
	      var blurryContext = newCanvas.getContext('2d');
	      var blurryImageData = blurryContext.getImageData(0, 0, newCanvas.width, newCanvas.height);
	      _vendorStackBlur2['default'].stackBlurCanvasRGBA(blurryImageData, 0, 0, newCanvas.width, newCanvas.height, this._options.blurRadius);
	      blurryContext.putImageData(blurryImageData, 0, 0);

	      return newCanvas;
	    }

	    /**
	     * Creates the mask canvas
	     * @param  {CanvasRenderer} renderer
	     * @return {Canvas}
	     * @private
	     */
	  }, {
	    key: '_createMask',
	    value: function _createMask(renderer) {
	      var canvas = renderer.getCanvas();

	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var gradientRadius = this._options.gradientRadius;

	      var maskCanvas = renderer.createCanvas(canvas.width, canvas.height);
	      var maskContext = maskCanvas.getContext('2d');

	      var start = this._options.start.clone();
	      var end = this._options.end.clone();

	      if (this._options.numberFormat === 'relative') {
	        start.multiply(canvasSize);
	        end.multiply(canvasSize);
	      }

	      var dist = end.clone().subtract(start);
	      var middle = start.clone().add(dist.clone().divide(2));

	      var totalDist = Math.sqrt(Math.pow(dist.x, 2) + Math.pow(dist.y, 2));
	      var factor = dist.clone().divide(totalDist);

	      var gradientStart = middle.clone().add(gradientRadius * factor.y, -gradientRadius * factor.x);
	      var gradientEnd = middle.clone().add(-gradientRadius * factor.y, gradientRadius * factor.x);

	      // Build gradient
	      var gradient = maskContext.createLinearGradient(gradientStart.x, gradientStart.y, gradientEnd.x, gradientEnd.y);
	      gradient.addColorStop(0, '#000000');
	      gradient.addColorStop(0.5, '#FFFFFF');
	      gradient.addColorStop(1, '#000000');

	      // Draw gradient
	      maskContext.fillStyle = gradient;
	      maskContext.fillRect(0, 0, canvas.width, canvas.height);

	      return maskCanvas;
	    }

	    /**
	     * Applies the blur and mask to the input canvas
	     * @param  {Canvas} inputCanvas
	     * @param  {Canvas} blurryCanvas
	     * @param  {Canvas} maskCanvas
	     * @private
	     */
	  }, {
	    key: '_applyMask',
	    value: function _applyMask(inputCanvas, blurryCanvas, maskCanvas) {
	      var inputContext = inputCanvas.getContext('2d');
	      var blurryContext = blurryCanvas.getContext('2d');
	      var maskContext = maskCanvas.getContext('2d');

	      var inputImageData = inputContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height);
	      var pixels = inputImageData.data;
	      var blurryPixels = blurryContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height).data;
	      var maskPixels = maskContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height).data;

	      for (var i = 0; i < maskPixels.length; i++) {
	        var alpha = maskPixels[i] / 255;
	        pixels[i] = alpha * pixels[i] + (1 - alpha) * blurryPixels[i];
	      }

	      inputContext.putImageData(inputImageData, 0, 0);
	    }

	    /**
	     * Sets the dirty state of this operation
	     * @param {Boolean} dirty
	     * @comment Since blur operations do seperate caching of the
	     *          blurred canvas, we need to invalidate the cache when the
	     *          dirty state changes.
	     */
	  }, {
	    key: 'dirty',
	    set: function set(dirty) {
	      _set(Object.getPrototypeOf(TiltShiftOperation.prototype), 'dirty', dirty, this);
	      this._cachedBlurredCanvas = null;
	    },

	    /**
	     * Returns the dirty state
	     * @type {Boolean}
	     */
	    get: function get() {
	      return _get(Object.getPrototypeOf(TiltShiftOperation.prototype), 'dirty', this);
	    }
	  }]);

	  return TiltShiftOperation;
	})(_operation2['default']);

	TiltShiftOperation.prototype.identifier = 'tilt-shift';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	TiltShiftOperation.prototype.availableOptions = {
	  start: { type: 'vector2', 'default': new _libMathVector22['default'](0.0, 0.5) },
	  end: { type: 'vector2', 'default': new _libMathVector22['default'](1.0, 0.5) },
	  blurRadius: { type: 'number', 'default': 30 },
	  gradientRadius: { type: 'number', 'default': 50 }
	};

	exports['default'] = TiltShiftOperation;
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";
	/*!

	StackBlur - a fast almost Gaussian Blur For Canvas

	Version:  0.5
	Author:   Mario Klingemann
	Contact:  mario@quasimondo.com
	Website:  http://www.quasimondo.com/StackBlurForCanvas
	Twitter:  @quasimondo

	In case you find this class useful - especially in commercial projects -
	I am not totally unhappy for a small donation to my PayPal account
	mario@quasimondo.de

	Or support me on flattr:
	https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

	Copyright (c) 2010 Mario Klingemann

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
	*/

	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

	function stackBlurCanvasRGBA(imageData, top_x, top_y, width, height, radius) {
	  if (isNaN(radius) || radius < 1) return;
	  radius |= 0;

	  var pixels = imageData.data;

	  var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

	  var div = radius + radius + 1;
	  var widthMinus1 = width - 1;
	  var heightMinus1 = height - 1;
	  var radiusPlus1 = radius + 1;
	  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

	  var stackStart = new BlurStack();
	  var stackEnd;
	  var stack = stackStart;
	  for (i = 1; i < div; i++) {
	    stack = stack.next = new BlurStack();
	    if (i == radiusPlus1) stackEnd = stack;
	  }
	  stack.next = stackStart;
	  var stackIn = null;
	  var stackOut = null;

	  yw = yi = 0;

	  var mul_sum = mul_table[radius];
	  var shg_sum = shg_table[radius];

	  for (y = 0; y < height; y++) {
	    r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

	    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	    a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

	    r_sum += sumFactor * pr;
	    g_sum += sumFactor * pg;
	    b_sum += sumFactor * pb;
	    a_sum += sumFactor * pa;

	    stack = stackStart;

	    for (i = 0; i < radiusPlus1; i++) {
	      stack.r = pr;
	      stack.g = pg;
	      stack.b = pb;
	      stack.a = pa;
	      stack = stack.next;
	    }

	    for (i = 1; i < radiusPlus1; i++) {
	      p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	      r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
	      g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
	      b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
	      a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

	      r_in_sum += pr;
	      g_in_sum += pg;
	      b_in_sum += pb;
	      a_in_sum += pa;

	      stack = stack.next;
	    }

	    stackIn = stackStart;
	    stackOut = stackEnd;
	    for (x = 0; x < width; x++) {
	      pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
	      if (pa !== 0) {
	        pa = 255 / pa;
	        pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
	        pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
	        pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
	      } else {
	        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
	      }

	      r_sum -= r_out_sum;
	      g_sum -= g_out_sum;
	      b_sum -= b_out_sum;
	      a_sum -= a_out_sum;

	      r_out_sum -= stackIn.r;
	      g_out_sum -= stackIn.g;
	      b_out_sum -= stackIn.b;
	      a_out_sum -= stackIn.a;

	      p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

	      r_in_sum += stackIn.r = pixels[p];
	      g_in_sum += stackIn.g = pixels[p + 1];
	      b_in_sum += stackIn.b = pixels[p + 2];
	      a_in_sum += stackIn.a = pixels[p + 3];

	      r_sum += r_in_sum;
	      g_sum += g_in_sum;
	      b_sum += b_in_sum;
	      a_sum += a_in_sum;

	      stackIn = stackIn.next;

	      r_out_sum += pr = stackOut.r;
	      g_out_sum += pg = stackOut.g;
	      b_out_sum += pb = stackOut.b;
	      a_out_sum += pa = stackOut.a;

	      r_in_sum -= pr;
	      g_in_sum -= pg;
	      b_in_sum -= pb;
	      a_in_sum -= pa;

	      stackOut = stackOut.next;

	      yi += 4;
	    }
	    yw += width;
	  }

	  for (x = 0; x < width; x++) {
	    g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

	    yi = x << 2;
	    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	    a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

	    r_sum += sumFactor * pr;
	    g_sum += sumFactor * pg;
	    b_sum += sumFactor * pb;
	    a_sum += sumFactor * pa;

	    stack = stackStart;

	    for (i = 0; i < radiusPlus1; i++) {
	      stack.r = pr;
	      stack.g = pg;
	      stack.b = pb;
	      stack.a = pa;
	      stack = stack.next;
	    }

	    yp = width;

	    for (i = 1; i <= radius; i++) {
	      yi = yp + x << 2;

	      r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
	      g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
	      b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
	      a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

	      r_in_sum += pr;
	      g_in_sum += pg;
	      b_in_sum += pb;
	      a_in_sum += pa;

	      stack = stack.next;

	      if (i < heightMinus1) {
	        yp += width;
	      }
	    }

	    yi = x;
	    stackIn = stackStart;
	    stackOut = stackEnd;
	    for (y = 0; y < height; y++) {
	      p = yi << 2;
	      pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
	      if (pa > 0) {
	        pa = 255 / pa;
	        pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
	        pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
	        pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
	      } else {
	        pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
	      }

	      r_sum -= r_out_sum;
	      g_sum -= g_out_sum;
	      b_sum -= b_out_sum;
	      a_sum -= a_out_sum;

	      r_out_sum -= stackIn.r;
	      g_out_sum -= stackIn.g;
	      b_out_sum -= stackIn.b;
	      a_out_sum -= stackIn.a;

	      p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

	      r_sum += r_in_sum += stackIn.r = pixels[p];
	      g_sum += g_in_sum += stackIn.g = pixels[p + 1];
	      b_sum += b_in_sum += stackIn.b = pixels[p + 2];
	      a_sum += a_in_sum += stackIn.a = pixels[p + 3];

	      stackIn = stackIn.next;

	      r_out_sum += pr = stackOut.r;
	      g_out_sum += pg = stackOut.g;
	      b_out_sum += pb = stackOut.b;
	      a_out_sum += pa = stackOut.a;

	      r_in_sum -= pr;
	      g_in_sum -= pg;
	      b_in_sum -= pb;
	      a_in_sum -= pa;

	      stackOut = stackOut.next;

	      yi += width;
	    }
	  }
	}

	function BlurStack() {
	  this.r = 0;
	  this.g = 0;
	  this.b = 0;
	  this.a = 0;
	  this.next = null;
	}

	module.exports = {
	  stackBlurCanvasRGBA: stackBlurCanvasRGBA
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ('value' in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _vendorStackBlur = __webpack_require__(48);

	var _vendorStackBlur2 = _interopRequireDefault(_vendorStackBlur);

	/**
	 * An operation that can crop out a part of the image
	 *
	 * @class
	 * @alias ImglyKit.Operations.RadialBlurOperation
	 * @extends ImglyKit.Operation
	 */

	var RadialBlurOperation = (function (_Operation) {
	  _inherits(RadialBlurOperation, _Operation);

	  function RadialBlurOperation() {
	    _classCallCheck(this, RadialBlurOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(RadialBlurOperation.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The fragment shader used for this operation
	     * @internal Based on evanw's glfx.js tilt shift shader:
	     *           https://github.com/evanw/glfx.js/blob/master/src/filters/blur/tiltshift.js
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      uniform sampler2D u_image;\n      uniform float blurRadius;\n      uniform float gradientRadius;\n      uniform vec2 position;\n      uniform vec2 delta;\n      uniform vec2 texSize;\n      varying vec2 v_texCoord;\n\n      float random(vec3 scale, float seed) {\n        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n      }\n\n      void main() {\n          vec4 color = vec4(0.0);\n          float total = 0.0;\n\n          float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n          float radius = smoothstep(0.0, 1.0, abs(distance(v_texCoord * texSize, position)) / (gradientRadius * 2.0)) * blurRadius;\n          for (float t = -30.0; t <= 30.0; t++) {\n              float percent = (t + offset - 0.5) / 30.0;\n              float weight = 1.0 - abs(percent);\n              vec4 sample = texture2D(u_image, v_texCoord + delta * percent * radius / texSize);\n\n              sample.rgb *= sample.a;\n\n              color += sample * weight;\n              total += weight;\n          }\n\n          gl_FragColor = color / total;\n          gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n      }\n    ';

	    this._cachedBlurredCanvas = null;
	    this._lastBlurRadius = this._options.blurRadius;
	    this._lastGradientRadius = this._options.gradientRadius;
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Crops this image using WebGL
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(RadialBlurOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      var canvas = renderer.getCanvas();
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      var position = this._options.position.clone();
	      position.y = 1 - position.y;

	      if (this._options.numberFormat === 'relative') {
	        position.multiply(canvasSize);
	      }

	      var uniforms = {
	        blurRadius: { type: 'f', value: this._options.blurRadius },
	        gradientRadius: { type: 'f', value: this._options.gradientRadius },
	        position: { type: '2f', value: [position.x, position.y] },
	        texSize: { type: '2f', value: [canvas.width, canvas.height] },
	        delta: { type: '2f', value: [1, 1] }
	      };

	      // Setup program
	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(null, this._fragmentShader);
	      }

	      renderer.runProgram(this._glslPrograms[renderer.id], { uniforms: uniforms });

	      // Update delta for second pass
	      uniforms.delta.value = [-1, 1];

	      renderer.runProgram(this._glslPrograms[renderer.id], { uniforms: uniforms });
	    }

	    /**
	     * Crops the image using Canvas2D
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();

	      var blurRadiusChanged = this._options.blurRadius !== this._lastBlurRadius;
	      var blurryCanvas = undefined;
	      if (blurRadiusChanged || this._cachedBlurredCanvas === null) {
	        // Blur and cache canvas
	        blurryCanvas = this._blurCanvas(renderer);
	        this._cachedBlurredCanvas = blurryCanvas;
	        this._lastBlurRadius = this._options.blurRadius;
	        this._lastGradientRadius = this._options.gradientRadius;
	      } else {
	        // Use cached canvas
	        blurryCanvas = this._cachedBlurredCanvas;
	      }

	      var maskCanvas = this._createMask(renderer);

	      this._applyMask(canvas, blurryCanvas, maskCanvas);
	    }

	    /**
	     * Creates a blurred copy of the canvas
	     * @param  {CanvasRenderer} renderer
	     * @return {Canvas}
	     * @private
	     */
	  }, {
	    key: '_blurCanvas',
	    value: function _blurCanvas(renderer) {
	      var newCanvas = renderer.cloneCanvas();
	      var blurryContext = newCanvas.getContext('2d');
	      var blurryImageData = blurryContext.getImageData(0, 0, newCanvas.width, newCanvas.height);
	      _vendorStackBlur2['default'].stackBlurCanvasRGBA(blurryImageData, 0, 0, newCanvas.width, newCanvas.height, this._options.blurRadius);
	      blurryContext.putImageData(blurryImageData, 0, 0);

	      return newCanvas;
	    }

	    /**
	     * Creates the mask canvas
	     * @param  {CanvasRenderer} renderer
	     * @return {Canvas}
	     * @private
	     */
	  }, {
	    key: '_createMask',
	    value: function _createMask(renderer) {
	      var canvas = renderer.getCanvas();

	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var gradientRadius = this._options.gradientRadius;

	      var maskCanvas = renderer.createCanvas(canvas.width, canvas.height);
	      var maskContext = maskCanvas.getContext('2d');

	      var position = this._options.position.clone();

	      if (this._options.numberFormat === 'relative') {
	        position.multiply(canvasSize);
	      }

	      // Build gradient
	      var gradient = maskContext.createRadialGradient(position.x, position.y, 0, position.x, position.y, gradientRadius);
	      gradient.addColorStop(0, '#FFFFFF');
	      gradient.addColorStop(1, '#000000');

	      // Draw gradient
	      maskContext.fillStyle = gradient;
	      maskContext.fillRect(0, 0, canvas.width, canvas.height);

	      return maskCanvas;
	    }

	    /**
	     * Applies the blur and mask to the input canvas
	     * @param  {Canvas} inputCanvas
	     * @param  {Canvas} blurryCanvas
	     * @param  {Canvas} maskCanvas
	     * @private
	     */
	  }, {
	    key: '_applyMask',
	    value: function _applyMask(inputCanvas, blurryCanvas, maskCanvas) {
	      var inputContext = inputCanvas.getContext('2d');
	      var blurryContext = blurryCanvas.getContext('2d');
	      var maskContext = maskCanvas.getContext('2d');

	      var inputImageData = inputContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height);
	      var pixels = inputImageData.data;
	      var blurryPixels = blurryContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height).data;
	      var maskPixels = maskContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height).data;

	      var index, alpha;
	      for (var y = 0; y < inputCanvas.height; y++) {
	        for (var x = 0; x < inputCanvas.width; x++) {
	          index = (y * inputCanvas.width + x) * 4;
	          alpha = maskPixels[index] / 255;

	          pixels[index] = alpha * pixels[index] + (1 - alpha) * blurryPixels[index];
	          pixels[index + 1] = alpha * pixels[index + 1] + (1 - alpha) * blurryPixels[index + 1];
	          pixels[index + 2] = alpha * pixels[index + 2] + (1 - alpha) * blurryPixels[index + 2];
	        }
	      }

	      inputContext.putImageData(inputImageData, 0, 0);
	    }

	    /**
	     * Sets the dirty state of this operation
	     * @param {Boolean} dirty
	     * @comment Since blur operations do seperate caching of the
	     *          blurred canvas, we need to invalidate the cache when the
	     *          dirty state changes.
	     */
	  }, {
	    key: 'dirty',
	    set: function set(dirty) {
	      _set(Object.getPrototypeOf(RadialBlurOperation.prototype), 'dirty', dirty, this);
	      this._cachedBlurredCanvas = null;
	    },

	    /**
	     * Returns the dirty state
	     * @type {Boolean}
	     */
	    get: function get() {
	      return _get(Object.getPrototypeOf(RadialBlurOperation.prototype), 'dirty', this);
	    }
	  }]);

	  return RadialBlurOperation;
	})(_operation2['default']);

	RadialBlurOperation.prototype.identifier = 'radial-blur';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	RadialBlurOperation.prototype.availableOptions = {
	  position: { type: 'vector2', 'default': new _libMathVector22['default'](0.5, 0.5) },
	  gradientRadius: { type: 'number', 'default': 50 },
	  blurRadius: { type: 'number', 'default': 20 }
	};

	exports['default'] = RadialBlurOperation;
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	/**
	 * An operation that can draw text on the canvas
	 *
	 * @class
	 * @alias ImglyKit.Operations.TextOperation
	 * @extends ImglyKit.Operation
	 */

	var TextOperation = (function (_Operation) {
	  _inherits(TextOperation, _Operation);

	  function TextOperation() {
	    _classCallCheck(this, TextOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(TextOperation.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The texture index used for the text
	     * @type {Number}
	     * @private
	     */
	    this._textureIndex = 1;

	    /**
	     * The fragment shader used for this operation
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform sampler2D u_textImage;\n      uniform vec2 u_position;\n      uniform vec2 u_size;\n\n      void main() {\n        vec4 color0 = texture2D(u_image, v_texCoord);\n        vec2 relative = (v_texCoord - u_position) / u_size;\n\n        if (relative.x >= 0.0 && relative.x <= 1.0 &&\n          relative.y >= 0.0 && relative.y <= 1.0) {\n\n            vec4 color1 = texture2D(u_textImage, relative);\n\n            // GL_SOURCE_ALPHA, GL_ONE_MINUS_SOURCE_ALPHA\n            gl_FragColor = color1 + color0 * (1.0 - color1.a);\n\n        } else {\n\n          gl_FragColor = color0;\n\n        }\n      }\n    ';
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Crops this image using WebGL
	   * @param  {WebGLRenderer} renderer
	   */
	  /* istanbul ignore next */

	  _createClass(TextOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      var textCanvas = this._renderTextCanvas(renderer);

	      var canvas = renderer.getCanvas();
	      var gl = renderer.getContext();

	      var position = this._options.position.clone();
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var size = new _libMathVector22['default'](textCanvas.width, textCanvas.height).divide(canvasSize);

	      if (this._options.numberFormat === 'absolute') {
	        position.divide(canvasSize);
	      }

	      position.y = 1 - position.y; // Invert y
	      position.y -= size.y; // Fix y

	      // Adjust vertical alignment
	      if (this._options.verticalAlignment === 'center') {
	        position.y += size.y / 2;
	      } else if (this._options.verticalAlignment === 'bottom') {
	        position.y += size.y;
	      }

	      // Adjust horizontal alignment
	      if (this._options.alignment === 'center') {
	        position.x -= size.x / 2;
	      } else if (this._options.alignment === 'right') {
	        position.x -= size.x;
	      }

	      // Upload the texture
	      gl.activeTexture(gl.TEXTURE0 + this._textureIndex);
	      this._texture = gl.createTexture();
	      gl.bindTexture(gl.TEXTURE_2D, this._texture);

	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	      // Set premultiplied alpha
	      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
	      gl.activeTexture(gl.TEXTURE0);

	      // Execute the shader
	      renderer.runShader(null, this._fragmentShader, {
	        uniforms: {
	          u_textImage: { type: 'i', value: this._textureIndex },
	          u_position: { type: '2f', value: [position.x, position.y] },
	          u_size: { type: '2f', value: [size.x, size.y] }
	        }
	      });
	    }

	    /**
	     * Crops the image using Canvas2D
	     * @param  {CanvasRenderer} renderer
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      var textCanvas = this._renderTextCanvas(renderer);

	      var canvas = renderer.getCanvas();
	      var context = renderer.getContext();

	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var scaledPosition = this._options.position.clone();

	      if (this._options.numberFormat === 'relative') {
	        scaledPosition.multiply(canvasSize);
	      }

	      // Adjust vertical alignment
	      if (this._options.verticalAlignment === 'center') {
	        scaledPosition.y -= textCanvas.height / 2;
	      } else if (this._options.verticalAlignment === 'bottom') {
	        scaledPosition.y -= textCanvas.height;
	      }

	      // Adjust horizontal alignment
	      if (this._options.alignment === 'center') {
	        scaledPosition.x -= textCanvas.width / 2;
	      } else if (this._options.alignment === 'right') {
	        scaledPosition.x -= textCanvas.width;
	      }

	      context.drawImage(textCanvas, scaledPosition.x, scaledPosition.y);
	    }

	    /**
	     * Renders the text canvas that will be used as a texture in WebGL
	     * and as an image in canvas
	     * @return {Canvas}
	     * @private
	     */
	  }, {
	    key: '_renderTextCanvas',
	    value: function _renderTextCanvas(renderer) {
	      var line = undefined,
	          lineNum = undefined;
	      var canvas = renderer.createCanvas();
	      var context = canvas.getContext('2d');

	      var outputCanvas = renderer.getCanvas();
	      var canvasSize = new _libMathVector22['default'](outputCanvas.width, outputCanvas.height);

	      var maxWidth = this._options.maxWidth;
	      var actualFontSize = this._options.fontSize * canvasSize.y;
	      var actualLineHeight = this._options.lineHeight * actualFontSize;

	      if (this._options.numberFormat === 'relative') {
	        maxWidth *= renderer.getCanvas().width;
	      }

	      // Apply text options
	      this._applyTextOptions(renderer, context);

	      var boundingBox = new _libMathVector22['default']();

	      var lines = this._options.text.split('\n');
	      if (typeof maxWidth !== 'undefined') {
	        // Calculate the bounding box
	        boundingBox.x = maxWidth;
	        lines = this._buildOutputLines(context, maxWidth);
	      } else {
	        for (lineNum = 0; lineNum < lines.length; lineNum++) {
	          line = lines[lineNum];
	          boundingBox.x = Math.max(boundingBox.x, context.measureText(line).width);
	        }
	      }

	      // Calculate boundingbox height
	      boundingBox.y = actualLineHeight * lines.length;

	      // Resize the canvas
	      canvas.width = boundingBox.x;
	      canvas.height = boundingBox.y;

	      // Get the context again
	      context = canvas.getContext('2d');

	      // Render background color
	      context.fillStyle = this._options.backgroundColor.toRGBA();
	      context.fillRect(0, 0, canvas.width, canvas.height);

	      // Apply text options
	      this._applyTextOptions(renderer, context);

	      // Draw lines
	      for (lineNum = 0; lineNum < lines.length; lineNum++) {
	        line = lines[lineNum];
	        this._drawText(context, line, actualLineHeight * lineNum);
	      }

	      return canvas;
	    }

	    /**
	     * Applies the text options on the given context
	     * @param  {Renderer} renderer
	     * @param  {RenderingContext2D} context
	     * @private
	     */
	  }, {
	    key: '_applyTextOptions',
	    value: function _applyTextOptions(renderer, context) {
	      var canvas = renderer.getCanvas();
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var actualFontSize = this._options.fontSize * canvasSize.y;

	      context.font = this._options.fontWeight + ' ' + actualFontSize + 'px ' + this._options.fontFamily;
	      context.textBaseline = 'top';
	      context.textAlign = this._options.alignment;
	      context.fillStyle = this._options.color.toRGBA();
	    }

	    /**
	     * Iterate over all lines and split them into multiple lines, depending
	     * on the width they need
	     * @param {RenderingContext2d} context
	     * @param {Number} maxWidth
	     * @return {Array.<string>}
	     * @private
	     */
	  }, {
	    key: '_buildOutputLines',
	    value: function _buildOutputLines(context, maxWidth) {
	      var inputLines = this._options.text.split('\n');
	      var outputLines = [];
	      var currentChars = [];

	      for (var lineNum = 0; lineNum < inputLines.length; lineNum++) {
	        var inputLine = inputLines[lineNum];
	        var lineChars = inputLine.split('');

	        if (lineChars.length === 0) {
	          outputLines.push('');
	        }

	        for (var charNum = 0; charNum < lineChars.length; charNum++) {
	          var currentChar = lineChars[charNum];
	          currentChars.push(currentChar);
	          var currentLine = currentChars.join('');
	          var lineWidth = context.measureText(currentLine).width;

	          if (lineWidth > maxWidth && currentChars.length === 1) {
	            outputLines.push(currentChars[0]);
	            currentChars = [];
	          } else if (lineWidth > maxWidth) {
	            // Remove the last word
	            var lastWord = currentChars.pop();

	            // Add the line, clear the words
	            outputLines.push(currentChars.join(''));
	            currentChars = [];

	            // Make sure to use the last word for the next line
	            currentChars = [lastWord];
	          } else if (charNum === lineChars.length - 1) {
	            // Add the line, clear the words
	            outputLines.push(currentChars.join(''));
	            currentChars = [];
	          }
	        }

	        // Line ended, but there's words left
	        if (currentChars.length) {
	          outputLines.push(currentChars.join(''));
	          currentChars = [];
	        }
	      }

	      return outputLines;
	    }

	    /**
	     * Draws the given line onto the given context at the given Y position
	     * @param  {RenderingContext2D} context
	     * @param  {String} text
	     * @param  {Number} y
	     * @private
	     */
	  }, {
	    key: '_drawText',
	    value: function _drawText(context, text, y) {
	      var canvas = context.canvas;
	      if (this._options.alignment === 'center') {
	        context.fillText(text, canvas.width / 2, y);
	      } else if (this._options.alignment === 'left') {
	        context.fillText(text, 0, y);
	      } else if (this._options.alignment === 'right') {
	        context.fillText(text, canvas.width, y);
	      }
	    }
	  }]);

	  return TextOperation;
	})(_operation2['default']);

	TextOperation.prototype.identifier = 'text';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	TextOperation.prototype.availableOptions = {
	  fontSize: { type: 'number', 'default': 0.1 },
	  lineHeight: { type: 'number', 'default': 1.1 },
	  fontFamily: { type: 'string', 'default': 'Times New Roman' },
	  fontWeight: { type: 'string', 'default': 'normal' },
	  alignment: { type: 'string', 'default': 'left', available: ['left', 'center', 'right'] },
	  verticalAlignment: { type: 'string', 'default': 'top', available: ['top', 'center', 'bottom'] },
	  color: { type: 'color', 'default': new _libColor2['default'](1, 1, 1, 1) },
	  backgroundColor: { type: 'color', 'default': new _libColor2['default'](0, 0, 0, 0) },
	  position: { type: 'vector2', 'default': new _libMathVector22['default'](0, 0) },
	  text: { type: 'string', required: true },
	  maxWidth: { type: 'number', 'default': 1.0 }
	};

	exports['default'] = TextOperation;
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* global Image */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _vendorPromise = __webpack_require__(8);

	var _vendorPromise2 = _interopRequireDefault(_vendorPromise);

	/**
	 * An operation that can draw text on the canvas
	 *
	 * @class
	 * @alias ImglyKit.Operations.StickersOperation
	 * @extends ImglyKit.Operation
	 */

	var StickersOperation = (function (_Operation) {
	  _inherits(StickersOperation, _Operation);

	  function StickersOperation() {
	    _classCallCheck(this, StickersOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(StickersOperation.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The texture index used for the sticker
	     * @type {Number}
	     * @private
	     */
	    this._textureIndex = 1;

	    /**
	     * The fragment shader used for this operation
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform sampler2D u_stickerImage;\n      uniform vec2 u_position;\n      uniform vec2 u_size;\n\n      void main() {\n        vec4 color0 = texture2D(u_image, v_texCoord);\n        vec2 relative = (v_texCoord - u_position) / u_size;\n\n        if (relative.x >= 0.0 && relative.x <= 1.0 &&\n          relative.y >= 0.0 && relative.y <= 1.0) {\n\n            vec4 color1 = texture2D(u_stickerImage, relative);\n\n            // GL_SOURCE_ALPHA, GL_ONE_MINUS_SOURCE_ALPHA\n            gl_FragColor = color1 + color0 * (1.0 - color1.a);\n\n        } else {\n\n          gl_FragColor = color0;\n\n        }\n      }\n    ';

	    this._loadedStickers = {};
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Applies this operation
	   * @param  {Renderer} renderer
	   * @return {Promise}
	   * @abstract
	   */

	  _createClass(StickersOperation, [{
	    key: 'render',
	    value: function render(renderer) {
	      var self = this;
	      return this._loadSticker().then(function (image) {
	        if (renderer.identifier === 'webgl') {
	          /* istanbul ignore next */
	          return self._renderWebGL(renderer, image);
	        } else {
	          return self._renderCanvas(renderer, image);
	        }
	      });
	    }

	    /**
	     * Crops this image using WebGL
	     * @param  {WebGLRenderer} renderer
	     * @param  {Image} image
	     * @private
	     */
	    /* istanbul ignore next */
	  }, {
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer, image) {
	      var canvas = renderer.getCanvas();
	      var gl = renderer.getContext();

	      var position = this._options.position.clone();
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      if (this._options.numberFormat === 'absolute') {
	        position.divide(canvasSize);
	      }

	      var size = new _libMathVector22['default'](image.width, image.height);
	      if (typeof this._options.size !== 'undefined') {
	        size.copy(this._options.size);

	        if (this._options.numberFormat === 'relative') {
	          size.multiply(canvasSize);
	        }

	        // Calculate image ratio, scale by width
	        var ratio = image.height / image.width;
	        size.y = size.x * ratio;
	      }
	      size.divide(canvasSize);

	      position.y = 1 - position.y; // Invert y
	      position.y -= size.y; // Fix y

	      // Upload the texture
	      gl.activeTexture(gl.TEXTURE0 + this._textureIndex);
	      this._texture = gl.createTexture();

	      gl.bindTexture(gl.TEXTURE_2D, this._texture);

	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	      // Set premultiplied alpha
	      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	      gl.activeTexture(gl.TEXTURE0);

	      // Execute the shader
	      renderer.runShader(null, this._fragmentShader, {
	        uniforms: {
	          u_stickerImage: { type: 'i', value: this._textureIndex },
	          u_position: { type: '2f', value: [position.x, position.y] },
	          u_size: { type: '2f', value: [size.x, size.y] }
	        }
	      });
	    }

	    /**
	     * Crops the image using Canvas2D
	     * @param  {CanvasRenderer} renderer
	     * @param  {Image} image
	     * @private
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer, image) {
	      var canvas = renderer.getCanvas();
	      var context = renderer.getContext();

	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var scaledPosition = this._options.position.clone();

	      if (this._options.numberFormat === 'relative') {
	        scaledPosition.multiply(canvasSize);
	      }

	      var size = new _libMathVector22['default'](image.width, image.height);
	      if (typeof this._options.size !== 'undefined') {
	        size.copy(this._options.size);

	        if (this._options.numberFormat === 'relative') {
	          size.multiply(canvasSize);
	        }
	      }

	      context.drawImage(image, 0, 0, image.width, image.height, scaledPosition.x, scaledPosition.y, size.x, size.y);
	    }

	    /**
	     * Loads the sticker
	     * @return {Promise}
	     * @private
	     */
	  }, {
	    key: '_loadSticker',
	    value: function _loadSticker() {
	      var isBrowser = typeof window !== 'undefined';
	      if (isBrowser) {
	        return this._loadImageBrowser(this._options.sticker);
	      } else {
	        return this._loadImageNode(this._options.sticker);
	      }
	    }

	    /**
	     * Loads the given image using the browser's `Image` class
	     * @param  {String} fileName
	     * @return {Promise}
	     * @private
	     */
	  }, {
	    key: '_loadImageBrowser',
	    value: function _loadImageBrowser(fileName) {
	      var self = this;
	      return new _vendorPromise2['default'](function (resolve, reject) {
	        // Return preloaded sticker if available
	        if (self._loadedStickers[fileName]) {
	          return resolve(self._loadedStickers[fileName]);
	        }

	        var image = new Image();

	        image.addEventListener('load', function () {
	          self._loadedStickers[fileName] = image;
	          resolve(image);
	        });
	        image.addEventListener('error', function () {
	          reject(new Error('Could not load sticker: ' + fileName));
	        });

	        image.src = self._kit.getAssetPath(fileName);
	      });
	    }

	    /**
	     * Loads the given image using node.js' `fs` and node-canvas `Image`
	     * @param  {String} fileName
	     * @return {Promise}
	     * @private
	     */
	  }, {
	    key: '_loadImageNode',
	    value: function _loadImageNode(fileName) {
	      var Canvas = __webpack_require__(7);
	      var fs = __webpack_require__(26);

	      var self = this;
	      var image = new Canvas.Image();
	      var path = self._kit.getAssetPath(fileName);

	      return new _vendorPromise2['default'](function (resolve, reject) {
	        fs.readFile(path, function (err, buffer) {
	          if (err) return reject(err);

	          image.src = buffer;
	          resolve(image);
	        });
	      });
	    }

	    /**
	     * The registered stickers
	     * @type {Object.<String,String>}
	     */
	  }, {
	    key: 'stickers',
	    get: function get() {
	      return this._stickers;
	    }
	  }]);

	  return StickersOperation;
	})(_operation2['default']);

	StickersOperation.prototype.identifier = 'stickers';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	StickersOperation.prototype.availableOptions = {
	  sticker: { type: 'string' },
	  position: { type: 'vector2', 'default': new _libMathVector22['default'](0, 0) },
	  size: { type: 'vector2', 'default': new _libMathVector22['default'](0, 0) }
	};

	exports['default'] = StickersOperation;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	/**
	 * An operation that can frames on the canvas
	 *
	 * @class
	 * @alias ImglyKit.Operations.FramesOperation
	 * @extends ImglyKit.Operation
	 */

	var FramesOperation = (function (_Operation) {
	  _inherits(FramesOperation, _Operation);

	  function FramesOperation() {
	    _classCallCheck(this, FramesOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(FramesOperation.prototype), 'constructor', this).apply(this, args);

	    /**
	     * The texture index used for the frame
	     * @type {Number}
	     * @private
	     */
	    this._textureIndex = 1;

	    /**
	     * The fragment shader used for this operation
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform sampler2D u_frameImage;\n      uniform vec4 u_color;\n      uniform vec2 u_thickness;\n\n      void main() {\n        vec4 fragColor = texture2D(u_image, v_texCoord);\n        if (v_texCoord.x < u_thickness.x || v_texCoord.x > 1.0 - u_thickness.x ||\n          v_texCoord.y < u_thickness.y || v_texCoord.y > 1.0 - u_thickness.y) {\n            fragColor = mix(fragColor, u_color, u_color.a);\n          }\n\n        gl_FragColor = fragColor;\n      }\n    ';
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Crops this image using WebGL
	   * @param  {WebGLRenderer} renderer
	   * @private
	   */
	  /* istanbul ignore next */

	  _createClass(FramesOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      var canvas = renderer.getCanvas();

	      var color = this._options.color;
	      var thickness = this._options.thickness * canvas.height;
	      var thicknessVec2 = [thickness / canvas.width, thickness / canvas.height];

	      var uniforms = {
	        u_color: { type: '4f', value: color.toGLColor() },
	        u_thickness: { type: '2f', value: thicknessVec2 }
	      };

	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(null, this._fragmentShader);
	      }

	      renderer.runProgram(this._glslPrograms[renderer.id], { uniforms: uniforms });
	    }

	    /**
	     * Crops the image using Canvas2D
	     * @param  {CanvasRenderer} renderer
	     * @private
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      var canvas = renderer.getCanvas();
	      var context = renderer.getContext();

	      var color = this._options.color;
	      var thickness = this._options.thickness * canvas.height;

	      context.save();
	      context.beginPath();
	      context.lineWidth = thickness * 2;
	      context.strokeStyle = color.toRGBA();
	      context.rect(0, 0, canvas.width, canvas.height);
	      context.stroke();
	      context.restore();
	    }
	  }]);

	  return FramesOperation;
	})(_operation2['default']);

	FramesOperation.prototype.identifier = 'frames';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	FramesOperation.prototype.availableOptions = {
	  color: { type: 'color', 'default': new _libColor2['default'](0, 0, 0, 1) },
	  thickness: { type: 'number', 'default': 0.02 }
	};

	exports['default'] = FramesOperation;
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _operation = __webpack_require__(22);

	var _operation2 = _interopRequireDefault(_operation);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	var DEFAULT_THICKNESS = 0.02;
	var DEFAULT_COLOR = new _libColor2['default'](1.0, 0.0, 0.0, 1.0);

	/**
	 * An operation that can draw brushes on the canvas
	 *
	 * @class
	 * @alias ImglyKit.Operations.BrushOperation
	 * @extends ImglyKit.Operation
	 */

	var BrushOperation = (function (_Operation) {
	  _inherits(BrushOperation, _Operation);

	  function BrushOperation() {
	    _classCallCheck(this, BrushOperation);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(BrushOperation.prototype), 'constructor', this).apply(this, args);

	    this._textureIndex = 1;
	    /**
	     * The vertex shader used for this operation
	     */
	    this._vertexShader = '\n      attribute vec2 a_position;\n      attribute vec2 a_texCoord;\n      varying vec2 v_texCoord;\n\n      void main() {\n        gl_Position = vec4(a_position, 0, 1);\n        v_texCoord = a_texCoord;\n      }\n    ';

	    /**
	     * The fragment shader used for this operation
	     */
	    this._fragmentShader = '\n      precision mediump float;\n      varying vec2 v_texCoord;\n      uniform sampler2D u_image;\n      uniform sampler2D u_textImage;\n      uniform vec2 u_position;\n      uniform vec2 u_size;\n\n      void main() {\n        vec4 color0 = texture2D(u_image, v_texCoord);\n        vec2 relative = (v_texCoord - u_position) / u_size;\n\n        if (relative.x >= 0.0 && relative.x <= 1.0 &&\n          relative.y >= 0.0 && relative.y <= 1.0) {\n\n            vec4 color1 = texture2D(u_textImage, relative);\n\n            // GL_SOURCE_ALPHA, GL_ONE_MINUS_SOURCE_ALPHA\n            gl_FragColor = color1 + color0 * (1.0 - color1.a);\n\n        } else {\n\n          gl_FragColor = color0;\n\n        }\n      }\n    ';

	    this._brushCanvas = document.createElement('canvas');
	  }

	  /**
	   * A unique string that identifies this operation. Can be used to select
	   * operations.
	   * @type {String}
	   */

	  /**
	   * Crops this image using WebGL
	   * @param  {WebGLRenderer} renderer
	   * @private
	   */
	  /* istanbul ignore next */

	  _createClass(BrushOperation, [{
	    key: '_renderWebGL',
	    value: function _renderWebGL(renderer) {
	      this.renderBrushCanvas(renderer.getCanvas());
	      var gl = renderer.getContext();
	      this._setupProgram(renderer);
	      this._uploadCanvasToTexture(gl, this._brushCanvas);

	      // use the complete area available
	      var position = new _libMathVector22['default'](0, 0);
	      var size = new _libMathVector22['default'](1, 1);

	      // Execute the shader
	      renderer.runShader(null, this._fragmentShader, {
	        uniforms: {
	          u_textImage: { type: 'i', value: this._textureIndex },
	          u_position: { type: '2f', value: [position.x, position.y] },
	          u_size: { type: '2f', value: [size.x, size.y] }
	        }
	      });
	    }

	    /**
	     * Uploads pixel-data contained in a canvas onto a texture
	     * @param  {Context} gl    gl-context (use renderer.getContext())
	     * @param  {Canvas} canvas A canvas that contains the pixel data for the texture
	     */
	  }, {
	    key: '_uploadCanvasToTexture',
	    value: function _uploadCanvasToTexture(gl, canvas) {
	      gl.activeTexture(gl.TEXTURE0 + this._textureIndex);
	      this._texture = gl.createTexture();
	      gl.bindTexture(gl.TEXTURE_2D, this._texture);

	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	      // Set premultiplied alpha
	      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
	      gl.activeTexture(gl.TEXTURE0);
	    }

	    /**
	     * This method initializes the shaders once
	     * @param  {WebGLRenderer} renderer WebGLRenderer that is used to compile the
	     * shafers
	     */
	  }, {
	    key: '_setupProgram',
	    value: function _setupProgram(renderer) {
	      if (!this._glslPrograms[renderer.id]) {
	        this._glslPrograms[renderer.id] = renderer.setupGLSLProgram(this._vertexShader, this._fragmentShader);
	      }
	    }

	    /**
	     * Renders the brush operation to a canvas
	     * @param  {CanvasRenderer} renderer
	     * @private
	     */
	  }, {
	    key: '_renderCanvas',
	    value: function _renderCanvas(renderer) {
	      this.renderBrushCanvas(renderer.getCanvas());
	      var context = renderer.getContext();
	      context.drawImage(this._brushCanvas, 0, 0);
	    }

	    /**
	     * Renders the brush canvas that will be used as a texture in WebGL
	     * and as an image in canvas
	     * @param {Canvas} canvas
	     * @private
	     */
	  }, {
	    key: 'renderBrushCanvas',
	    value: function renderBrushCanvas(outputCanvas) {
	      var canvas = arguments.length <= 1 || arguments[1] === undefined ? this._brushCanvas : arguments[1];

	      if (this._dirty) {
	        var context = canvas.getContext('2d');
	        context.clearRect(0, 0, canvas.width, canvas.height);
	      }

	      if (canvas.width !== outputCanvas.width || canvas.height !== outputCanvas.height) {
	        canvas.width = outputCanvas.width;
	        canvas.height = outputCanvas.height;
	      }

	      var paths = this._options.paths;
	      for (var i = 0; i < paths.length; i++) {
	        var path = paths[i];
	        path.renderToCanvas(canvas);
	      }
	    }

	    /**
	     * Creates and adds a new path
	     * @param {Number} thickness
	     * @param {Color} color
	     * @return {BrushOperation.Path}
	     */
	  }, {
	    key: 'createPath',
	    value: function createPath(thickness, color) {
	      var path = new BrushOperation.Path(this, thickness, color);
	      this._options.paths.push(path);
	      return path;
	    }

	    /**
	     * returns the longer size of the canvas
	     * @param {Canvas}
	     * @return {Number}
	     */
	  }, {
	    key: '_getLongerSideSize',
	    value: function _getLongerSideSize(canvas) {
	      return Math.max(canvas.width, canvas.height);
	    }

	    /**
	     * returns the last color
	     * @return {Color}
	     */
	  }, {
	    key: 'getLastColor',
	    value: function getLastColor() {
	      var lastPath = this._options.paths[this._options.paths.length - 1];
	      if (!lastPath) return DEFAULT_COLOR;
	      return lastPath.getColor();
	    }

	    /**
	     * returns the last thickness
	     * @return {Thickness}
	     */
	  }, {
	    key: 'getLastThickness',
	    value: function getLastThickness() {
	      var lastPath = this._options.paths[this._options.paths.length - 1];
	      if (!lastPath) return DEFAULT_THICKNESS;
	      return lastPath.getThickness();
	    }

	    /**
	     * Gets called when this operation has been set to dirty
	     * @private
	     */
	  }, {
	    key: '_onDirty',
	    value: function _onDirty() {
	      this._options.paths.forEach(function (path) {
	        path.setDirty();
	      });
	    }
	  }]);

	  return BrushOperation;
	})(_operation2['default']);

	BrushOperation.prototype.identifier = 'brush';

	/**
	 * Specifies the available options for this operation
	 * @type {Object}
	 */
	BrushOperation.prototype.availableOptions = {
	  paths: { type: 'array', 'default': [] }
	};

	/**
	 * Represents a path that can be drawn on a canvas
	 */
	BrushOperation.Path = (function () {
	  function Path(operation, thickness, color) {
	    _classCallCheck(this, Path);

	    this._thickness = thickness;
	    this._color = color;
	    this._controlPoints = [];
	  }

	  _createClass(Path, [{
	    key: 'renderToCanvas',
	    value: function renderToCanvas(canvas) {
	      if (this._controlPoints.length < 2) return;

	      var lastControlPoint = this._controlPoints[0];
	      var controlPoint = lastControlPoint;
	      for (var i = 1; i < this._controlPoints.length; i++) {
	        controlPoint = this._controlPoints[i];
	        controlPoint.renderToCanvas(canvas, lastControlPoint);
	        lastControlPoint = controlPoint;
	      }
	    }
	  }, {
	    key: 'addControlPoint',
	    value: function addControlPoint(position) {
	      var controlPoint = new BrushOperation.ControlPoint(this, position);
	      this._controlPoints.push(controlPoint);
	    }
	  }, {
	    key: 'getColor',
	    value: function getColor() {
	      return this._color;
	    }
	  }, {
	    key: 'getThickness',
	    value: function getThickness() {
	      return this._thickness;
	    }
	  }, {
	    key: 'setDirty',
	    value: function setDirty() {
	      this._controlPoints.forEach(function (point) {
	        point.setDirty();
	      });
	    }
	  }]);

	  return Path;
	})();

	/**
	 * Represents a control point of a path
	 */
	BrushOperation.ControlPoint = (function () {
	  function ControlPoint(path, position) {
	    _classCallCheck(this, ControlPoint);

	    this._path = path;
	    this._drawnCanvases = [];
	    this._position = position;
	  }

	  _createClass(ControlPoint, [{
	    key: 'renderToCanvas',
	    value: function renderToCanvas(canvas, lastControlPoint) {
	      if (this._drawnCanvases.indexOf(canvas) !== -1) {
	        // This control point has already been drawn on this canvas. Ignore.
	        return;
	      }

	      var context = canvas.getContext('2d');
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var longerSide = Math.max(canvasSize.x, canvasSize.y);

	      var position = this._position.clone().multiply(canvasSize);
	      var lastPosition = lastControlPoint.getPosition().clone().multiply(canvasSize);

	      context.beginPath();
	      context.lineJoin = 'round';
	      context.strokeStyle = this._path.getColor().toHex();
	      context.lineWidth = this._path.getThickness() * longerSide;
	      context.moveTo(lastPosition.x, lastPosition.y);
	      context.lineTo(position.x, position.y);
	      context.closePath();
	      context.stroke();
	      this._drawnCanvases.push(canvas);
	    }
	  }, {
	    key: 'getPosition',
	    value: function getPosition() {
	      return this._position.clone();
	    }
	  }, {
	    key: 'setDirty',
	    value: function setDirty() {
	      this._drawnCanvases = [];
	    }
	  }]);

	  return ControlPoint;
	})();

	exports['default'] = BrushOperation;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * A15 Filter
	 * @class
	 * @alias ImglyKit.Filters.A15Filter
	 * @extends {ImglyKit.Filter}
	 */

	var A15Filter = (function (_Filter) {
	  _inherits(A15Filter, _Filter);

	  function A15Filter() {
	    _classCallCheck(this, A15Filter);

	    _get(Object.getPrototypeOf(A15Filter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(A15Filter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.Contrast({
	        contrast: 0.63
	      }));

	      stack.add(new _filter2['default'].Primitives.Brightness({
	        brightness: 0.12
	      }));

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 38], [94, 94], [148, 142], [175, 187], [255, 255]],
	          green: [[0, 0], [77, 53], [171, 190], [255, 255]],
	          blue: [[0, 10], [48, 85], [174, 228], [255, 255]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return '15';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'a15';
	    }
	  }]);

	  return A15Filter;
	})(_filter2['default']);

	exports['default'] = A15Filter;
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Breeze Filter
	 * @class
	 * @alias ImglyKit.Filters.BreezeFilter
	 * @extends {ImglyKit.Filter}
	 */

	var BreezeFilter = (function (_Filter) {
	  _inherits(BreezeFilter, _Filter);

	  function BreezeFilter() {
	    _classCallCheck(this, BreezeFilter);

	    _get(Object.getPrototypeOf(BreezeFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(BreezeFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Desaturation
	      stack.add(new _filter2['default'].Primitives.Desaturation({
	        desaturation: 0.5
	      }));

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [170, 170], [212, 219], [234, 242], [255, 255]],
	          green: [[0, 0], [170, 168], [234, 231], [255, 255]],
	          blue: [[0, 0], [170, 170], [212, 208], [255, 255]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Breeze';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'breeze';
	    }
	  }]);

	  return BreezeFilter;
	})(_filter2['default']);

	exports['default'] = BreezeFilter;
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * BW Filter
	 * @class
	 * @alias ImglyKit.Filters.BWFilter
	 * @extends {ImglyKit.Filter}
	 */

	var BWFilter = (function (_Filter) {
	  _inherits(BWFilter, _Filter);

	  function BWFilter() {
	    _classCallCheck(this, BWFilter);

	    _get(Object.getPrototypeOf(BWFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(BWFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.Grayscale());

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'B&W';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'bw';
	    }
	  }]);

	  return BWFilter;
	})(_filter2['default']);

	exports['default'] = BWFilter;
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * BWHard Filter
	 * @class
	 * @alias ImglyKit.Filters.BWHardFilter
	 * @extends {ImglyKit.Filter}
	 */

	var BWHardFilter = (function (_Filter) {
	  _inherits(BWHardFilter, _Filter);

	  function BWHardFilter() {
	    _classCallCheck(this, BWHardFilter);

	    _get(Object.getPrototypeOf(BWHardFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(BWHardFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.Grayscale());
	      stack.add(new _filter2['default'].Primitives.Contrast({
	        contrast: 1.5
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return '1920';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'bwhard';
	    }
	  }]);

	  return BWHardFilter;
	})(_filter2['default']);

	exports['default'] = BWHardFilter;
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Celsius Filter
	 * @class
	 * @alias ImglyKit.Filters.CelsiusFilter
	 * @extends {ImglyKit.Filter}
	 */

	var CelsiusFilter = (function (_Filter) {
	  _inherits(CelsiusFilter, _Filter);

	  function CelsiusFilter() {
	    _classCallCheck(this, CelsiusFilter);

	    _get(Object.getPrototypeOf(CelsiusFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(CelsiusFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 69], [55, 110], [202, 230], [255, 255]],
	          green: [[0, 44], [89, 93], [185, 141], [255, 189]],
	          blue: [[0, 76], [39, 82], [218, 138], [255, 171]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Celsius';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'celsius';
	    }
	  }]);

	  return CelsiusFilter;
	})(_filter2['default']);

	exports['default'] = CelsiusFilter;
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Chest Filter
	 * @class
	 * @alias ImglyKit.Filters.ChestFilter
	 * @extends {ImglyKit.Filter}
	 */

	var ChestFilter = (function (_Filter) {
	  _inherits(ChestFilter, _Filter);

	  function ChestFilter() {
	    _classCallCheck(this, ChestFilter);

	    _get(Object.getPrototypeOf(ChestFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ChestFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [44, 44], [124, 143], [221, 204], [255, 255]],
	          green: [[0, 0], [130, 127], [213, 199], [255, 255]],
	          blue: [[0, 0], [51, 52], [219, 204], [255, 255]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Chest';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'chest';
	    }
	  }]);

	  return ChestFilter;
	})(_filter2['default']);

	exports['default'] = ChestFilter;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Fixie Filter
	 * @class
	 * @alias ImglyKit.Filters.FixieFilter
	 * @extends {ImglyKit.Filter}
	 */

	var FixieFilter = (function (_Filter) {
	  _inherits(FixieFilter, _Filter);

	  function FixieFilter() {
	    _classCallCheck(this, FixieFilter);

	    _get(Object.getPrototypeOf(FixieFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(FixieFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [44, 28], [63, 48], [128, 132], [235, 248], [255, 255]],
	          green: [[0, 0], [20, 10], [60, 45], [190, 209], [211, 231], [255, 255]],
	          blue: [[0, 31], [41, 62], [150, 142], [234, 212], [255, 224]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Fixie';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'fixie';
	    }
	  }]);

	  return FixieFilter;
	})(_filter2['default']);

	exports['default'] = FixieFilter;
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Food Filter
	 * @class
	 * @alias ImglyKit.Filters.FoodFilter
	 * @extends {ImglyKit.Filter}
	 */

	var FoodFilter = (function (_Filter) {
	  _inherits(FoodFilter, _Filter);

	  function FoodFilter() {
	    _classCallCheck(this, FoodFilter);

	    _get(Object.getPrototypeOf(FoodFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(FoodFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.Saturation({
	        saturation: 1.35
	      }));

	      stack.add(new _filter2['default'].Primitives.Contrast({
	        contrast: 1.1
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Food';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'food';
	    }
	  }]);

	  return FoodFilter;
	})(_filter2['default']);

	exports['default'] = FoodFilter;
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Fridge Filter
	 * @class
	 * @alias ImglyKit.Filters.FridgeFilter
	 * @extends {ImglyKit.Filter}
	 */

	var FridgeFilter = (function (_Filter) {
	  _inherits(FridgeFilter, _Filter);

	  function FridgeFilter() {
	    _classCallCheck(this, FridgeFilter);

	    _get(Object.getPrototypeOf(FridgeFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(FridgeFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 9], [21, 11], [45, 24], [255, 220]],
	          green: [[0, 12], [21, 21], [42, 42], [150, 150], [170, 173], [255, 210]],
	          blue: [[0, 28], [43, 72], [128, 185], [255, 220]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Fridge';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'fridge';
	    }
	  }]);

	  return FridgeFilter;
	})(_filter2['default']);

	exports['default'] = FridgeFilter;
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Front Filter
	 * @class
	 * @alias ImglyKit.Filters.FrontFilter
	 * @extends {ImglyKit.Filter}
	 */

	var FrontFilter = (function (_Filter) {
	  _inherits(FrontFilter, _Filter);

	  function FrontFilter() {
	    _classCallCheck(this, FrontFilter);

	    _get(Object.getPrototypeOf(FrontFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(FrontFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 65], [28, 67], [67, 113], [125, 183], [187, 217], [255, 229]],
	          green: [[0, 52], [42, 59], [104, 134], [169, 209], [255, 240]],
	          blue: [[0, 52], [65, 68], [93, 104], [150, 153], [255, 198]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Front';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'front';
	    }
	  }]);

	  return FrontFilter;
	})(_filter2['default']);

	exports['default'] = FrontFilter;
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Glam Filter
	 * @class
	 * @alias ImglyKit.Filters.GlamFilter
	 * @extends {ImglyKit.Filter}
	 */

	var GlamFilter = (function (_Filter) {
	  _inherits(GlamFilter, _Filter);

	  function GlamFilter() {
	    _classCallCheck(this, GlamFilter);

	    _get(Object.getPrototypeOf(GlamFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(GlamFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.Contrast({
	        contrast: 1.1
	      }));

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [94, 74], [181, 205], [255, 255]],
	          green: [[0, 0], [127, 127], [255, 255]],
	          blue: [[0, 0], [102, 73], [227, 213], [255, 255]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Glam';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'glam';
	    }
	  }]);

	  return GlamFilter;
	})(_filter2['default']);

	exports['default'] = GlamFilter;
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Gobblin Filter
	 * @class
	 * @alias ImglyKit.Filters.GobblinFilter
	 * @extends {ImglyKit.Filter}
	 */

	var GobblinFilter = (function (_Filter) {
	  _inherits(GobblinFilter, _Filter);

	  function GobblinFilter() {
	    _classCallCheck(this, GobblinFilter);

	    _get(Object.getPrototypeOf(GobblinFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(GobblinFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.Gobblin());

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Gobblin';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'gobblin';
	    }
	  }]);

	  return GobblinFilter;
	})(_filter2['default']);

	exports['default'] = GobblinFilter;
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * K1 Filter
	 * @class
	 * @alias ImglyKit.Filters.K1Filter
	 * @extends {ImglyKit.Filter}
	 */

	var K1Filter = (function (_Filter) {
	  _inherits(K1Filter, _Filter);

	  function K1Filter() {
	    _classCallCheck(this, K1Filter);

	    _get(Object.getPrototypeOf(K1Filter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(K1Filter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        controlPoints: [[0, 0], [53, 32], [91, 80], [176, 205], [255, 255]]
	      }));

	      // Saturation
	      stack.add(new _filter2['default'].Primitives.Saturation({
	        saturation: 0.9
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'K1';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'k1';
	    }
	  }]);

	  return K1Filter;
	})(_filter2['default']);

	exports['default'] = K1Filter;
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	/**
	 * K2 Filter
	 * @class
	 * @alias ImglyKit.Filters.K2Filter
	 * @extends {ImglyKit.Filter}
	 */

	var K2Filter = (function (_Filter) {
	  _inherits(K2Filter, _Filter);

	  function K2Filter() {
	    _classCallCheck(this, K2Filter);

	    _get(Object.getPrototypeOf(K2Filter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(K2Filter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        controlPoints: [[0, 0], [54, 33], [77, 82], [94, 103], [122, 126], [177, 193], [229, 232], [255, 255]]
	      }));

	      // Soft color overlay
	      stack.add(new _filter2['default'].Primitives.SoftColorOverlay({
	        color: new _libColor2['default'](40 / 255, 40 / 255, 40 / 255)
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'K2';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'k2';
	    }
	  }]);

	  return K2Filter;
	})(_filter2['default']);

	exports['default'] = K2Filter;
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * K6 Filter
	 * @class
	 * @alias ImglyKit.Filters.K6Filter
	 * @extends {ImglyKit.Filter}
	 */

	var K6Filter = (function (_Filter) {
	  _inherits(K6Filter, _Filter);

	  function K6Filter() {
	    _classCallCheck(this, K6Filter);

	    _get(Object.getPrototypeOf(K6Filter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(K6Filter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Saturation
	      stack.add(new _filter2['default'].Primitives.Saturation({
	        saturation: 0.5
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'K6';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'k6';
	    }
	  }]);

	  return K6Filter;
	})(_filter2['default']);

	exports['default'] = K6Filter;
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * KDynamic Filter
	 * @class
	 * @alias ImglyKit.Filters.KDynamicFilter
	 * @extends {ImglyKit.Filter}
	 */

	var KDynamicFilter = (function (_Filter) {
	  _inherits(KDynamicFilter, _Filter);

	  function KDynamicFilter() {
	    _classCallCheck(this, KDynamicFilter);

	    _get(Object.getPrototypeOf(KDynamicFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(KDynamicFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        controlPoints: [[0, 0], [17, 27], [46, 69], [90, 112], [156, 200], [203, 243], [255, 255]]
	      }));

	      // Saturation
	      stack.add(new _filter2['default'].Primitives.Saturation({
	        saturation: 0.7
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'KDynamic';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'kdynamic';
	    }
	  }]);

	  return KDynamicFilter;
	})(_filter2['default']);

	exports['default'] = KDynamicFilter;
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Lenin Filter
	 * @class
	 * @alias ImglyKit.Filters.LeninFilter
	 * @extends {ImglyKit.Filter}
	 */

	var LeninFilter = (function (_Filter) {
	  _inherits(LeninFilter, _Filter);

	  function LeninFilter() {
	    _classCallCheck(this, LeninFilter);

	    _get(Object.getPrototypeOf(LeninFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(LeninFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Desaturation
	      stack.add(new _filter2['default'].Primitives.Desaturation({
	        desaturation: 0.4
	      }));

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 20], [40, 20], [106, 111], [129, 153], [190, 223], [255, 255]],
	          green: [[0, 20], [40, 20], [62, 41], [106, 108], [132, 159], [203, 237], [255, 255]],
	          blue: [[0, 40], [40, 40], [73, 60], [133, 160], [191, 297], [203, 237], [237, 239], [255, 255]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Lenin';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'lenin';
	    }
	  }]);

	  return LeninFilter;
	})(_filter2['default']);

	exports['default'] = LeninFilter;
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Lomo Filter
	 * @class
	 * @alias ImglyKit.Filters.LomoFilter
	 * @extends {ImglyKit.Filter}
	 */

	var LomoFilter = (function (_Filter) {
	  _inherits(LomoFilter, _Filter);

	  function LomoFilter() {
	    _classCallCheck(this, LomoFilter);

	    _get(Object.getPrototypeOf(LomoFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(LomoFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        controlPoints: [[0, 0], [87, 20], [131, 156], [183, 205], [255, 200]]
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Lomo';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'lomo';
	    }
	  }]);

	  return LomoFilter;
	})(_filter2['default']);

	exports['default'] = LomoFilter;
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Mellow Filter
	 * @class
	 * @alias ImglyKit.Filters.MellowFilter
	 * @extends {ImglyKit.Filter}
	 */

	var MellowFilter = (function (_Filter) {
	  _inherits(MellowFilter, _Filter);

	  function MellowFilter() {
	    _classCallCheck(this, MellowFilter);

	    _get(Object.getPrototypeOf(MellowFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(MellowFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [41, 84], [87, 134], [255, 255]],
	          green: [[0, 0], [255, 216]],
	          blue: [[0, 0], [255, 131]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Mellow';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'mellow';
	    }
	  }]);

	  return MellowFilter;
	})(_filter2['default']);

	exports['default'] = MellowFilter;
	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Morning Filter
	 * @class
	 * @alias ImglyKit.Filters.MorningFilter
	 * @extends {ImglyKit.Filter}
	 */

	var MorningFilter = (function (_Filter) {
	  _inherits(MorningFilter, _Filter);

	  function MorningFilter() {
	    _classCallCheck(this, MorningFilter);

	    _get(Object.getPrototypeOf(MorningFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(MorningFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 40], [255, 230]],
	          green: [[0, 10], [255, 225]],
	          blue: [[0, 20], [255, 181]]
	        }
	      }));

	      stack.add(new _filter2['default'].Primitives.Glow());

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Morning';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'morning';
	    }
	  }]);

	  return MorningFilter;
	})(_filter2['default']);

	exports['default'] = MorningFilter;
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Orchid Filter
	 * @class
	 * @alias ImglyKit.Filters.OrchidFilter
	 * @extends {ImglyKit.Filter}
	 */

	var OrchidFilter = (function (_Filter) {
	  _inherits(OrchidFilter, _Filter);

	  function OrchidFilter() {
	    _classCallCheck(this, OrchidFilter);

	    _get(Object.getPrototypeOf(OrchidFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(OrchidFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [115, 130], [195, 215], [255, 255]],
	          green: [[0, 0], [148, 153], [172, 215], [255, 255]],
	          blue: [[0, 46], [58, 75], [178, 205], [255, 255]]
	        }
	      }));

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        controlPoints: [[0, 0], [117, 151], [189, 217], [255, 255]]
	      }));

	      // Desaturation
	      stack.add(new _filter2['default'].Primitives.Desaturation({
	        desaturation: 0.65
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Orchid';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'orchid';
	    }
	  }]);

	  return OrchidFilter;
	})(_filter2['default']);

	exports['default'] = OrchidFilter;
	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Pola Filter
	 * @class
	 * @alias ImglyKit.Filters.PolaFilter
	 * @extends {ImglyKit.Filter}
	 */

	var PolaFilter = (function (_Filter) {
	  _inherits(PolaFilter, _Filter);

	  function PolaFilter() {
	    _classCallCheck(this, PolaFilter);

	    _get(Object.getPrototypeOf(PolaFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(PolaFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [94, 74], [181, 205], [255, 255]],
	          green: [[0, 0], [34, 34], [99, 76], [176, 190], [255, 255]],
	          blue: [[0, 0], [102, 73], [227, 213], [255, 255]]
	        }
	      }));

	      stack.add(new _filter2['default'].Primitives.Saturation({
	        saturation: 0.8
	      }));

	      stack.add(new _filter2['default'].Primitives.Contrast({
	        contrast: 1.5
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Pola SX';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'pola';
	    }
	  }]);

	  return PolaFilter;
	})(_filter2['default']);

	exports['default'] = PolaFilter;
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Pola669 Filter
	 * @class
	 * @alias ImglyKit.Filters.Pola669Filter
	 * @extends {ImglyKit.Filter}
	 */

	var Pola669Filter = (function (_Filter) {
	  _inherits(Pola669Filter, _Filter);

	  function Pola669Filter() {
	    _classCallCheck(this, Pola669Filter);

	    _get(Object.getPrototypeOf(Pola669Filter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Pola669Filter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [56, 18], [196, 209], [255, 255]],
	          green: [[0, 38], [71, 84], [255, 255]],
	          blue: [[0, 0], [131, 133], [204, 211], [255, 255]]
	        }
	      }));

	      stack.add(new _filter2['default'].Primitives.Saturation({
	        saturation: 0.8
	      }));

	      stack.add(new _filter2['default'].Primitives.Contrast({
	        contrast: 1.5
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Pola 669';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'pola669';
	    }
	  }]);

	  return Pola669Filter;
	})(_filter2['default']);

	exports['default'] = Pola669Filter;
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Quozi Filter
	 * @class
	 * @alias ImglyKit.Filters.QuoziFilter
	 * @extends {ImglyKit.Filter}
	 */

	var QuoziFilter = (function (_Filter) {
	  _inherits(QuoziFilter, _Filter);

	  function QuoziFilter() {
	    _classCallCheck(this, QuoziFilter);

	    _get(Object.getPrototypeOf(QuoziFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(QuoziFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      // Desaturation
	      stack.add(new _filter2['default'].Primitives.Desaturation({
	        desaturation: 0.65
	      }));

	      // Tone curve
	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 50], [40, 78], [118, 170], [181, 211], [255, 255]],
	          green: [[0, 27], [28, 45], [109, 157], [157, 195], [179, 208], [206, 212], [255, 240]],
	          blue: [[0, 50], [12, 55], [46, 103], [103, 162], [194, 182], [241, 201], [255, 219]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Quozi';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'quozi';
	    }
	  }]);

	  return QuoziFilter;
	})(_filter2['default']);

	exports['default'] = QuoziFilter;
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Semired Filter
	 * @class
	 * @alias ImglyKit.Filters.SemiredFilter
	 * @extends {ImglyKit.Filter}
	 */

	var SemiredFilter = (function (_Filter) {
	  _inherits(SemiredFilter, _Filter);

	  function SemiredFilter() {
	    _classCallCheck(this, SemiredFilter);

	    _get(Object.getPrototypeOf(SemiredFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(SemiredFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 129], [75, 153], [181, 227], [255, 255]],
	          green: [[0, 8], [111, 85], [212, 158], [255, 226]],
	          blue: [[0, 5], [75, 22], [193, 90], [255, 229]]
	        }
	      }));

	      stack.add(new _filter2['default'].Primitives.Glow());

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Semi Red';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'semired';
	    }
	  }]);

	  return SemiredFilter;
	})(_filter2['default']);

	exports['default'] = SemiredFilter;
	module.exports = exports['default'];

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Sunny Filter
	 * @class
	 * @alias ImglyKit.Filters.SunnyFilter
	 * @extends {ImglyKit.Filter}
	 */

	var SunnyFilter = (function (_Filter) {
	  _inherits(SunnyFilter, _Filter);

	  function SunnyFilter() {
	    _classCallCheck(this, SunnyFilter);

	    _get(Object.getPrototypeOf(SunnyFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(SunnyFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 0], [62, 82], [141, 154], [255, 255]],
	          green: [[0, 39], [56, 96], [192, 176], [255, 255]],
	          blue: [[0, 0], [174, 99], [255, 235]]
	        }
	      }));

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        controlPoints: [[0, 0], [55, 20], [158, 191], [255, 255]]
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Sunny';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'sunny';
	    }
	  }]);

	  return SunnyFilter;
	})(_filter2['default']);

	exports['default'] = SunnyFilter;
	module.exports = exports['default'];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * Texas Filter
	 * @class
	 * @alias ImglyKit.Filters.TexasFilter
	 * @extends {ImglyKit.Filter}
	 */

	var TexasFilter = (function (_Filter) {
	  _inherits(TexasFilter, _Filter);

	  function TexasFilter() {
	    _classCallCheck(this, TexasFilter);

	    _get(Object.getPrototypeOf(TexasFilter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(TexasFilter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.ToneCurve({
	        rgbControlPoints: {
	          red: [[0, 72], [89, 99], [176, 212], [255, 237]],
	          green: [[0, 49], [255, 192]],
	          blue: [[0, 72], [255, 151]]
	        }
	      }));

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'Texas';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'texas';
	    }
	  }]);

	  return TexasFilter;
	})(_filter2['default']);

	exports['default'] = TexasFilter;
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _filter = __webpack_require__(27);

	var _filter2 = _interopRequireDefault(_filter);

	/**
	 * X400 Filter
	 * @class
	 * @alias ImglyKit.Filters.X400Filter
	 * @extends {ImglyKit.Filter}
	 */

	var X400Filter = (function (_Filter) {
	  _inherits(X400Filter, _Filter);

	  function X400Filter() {
	    _classCallCheck(this, X400Filter);

	    _get(Object.getPrototypeOf(X400Filter.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(X400Filter, [{
	    key: 'render',

	    /**
	     * Renders the filter
	     * @param  {Renderer} renderer
	     * @return {Promise}
	     */
	    value: function render(renderer) {
	      var stack = new _filter2['default'].PrimitivesStack();

	      stack.add(new _filter2['default'].Primitives.X400());

	      stack.render(renderer);
	    }
	  }, {
	    key: 'name',

	    /**
	     * The name that is displayed in the UI
	     * @type {String}
	     */
	    get: function get() {
	      return 'X400';
	    }
	  }], [{
	    key: 'identifier',

	    /**
	     * A unique string that identifies this operation. Can be used to select
	     * the active filter.
	     * @type {String}
	     */
	    get: function get() {
	      return 'x400';
	    }
	  }]);

	  return X400Filter;
	})(_filter2['default']);

	exports['default'] = X400Filter;
	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* global FileReader, Image, __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _vendorNativePromiseOnly = __webpack_require__(9);

	var _vendorNativePromiseOnly2 = _interopRequireDefault(_vendorNativePromiseOnly);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _baseUi = __webpack_require__(83);

	var _baseUi2 = _interopRequireDefault(_baseUi);

	var _libCanvas = __webpack_require__(85);

	var _libCanvas2 = _interopRequireDefault(_libCanvas);

	var _libFileLoader = __webpack_require__(86);

	var _libFileLoader2 = _interopRequireDefault(_libFileLoader);

	var _libImageResizer = __webpack_require__(87);

	var _libImageResizer2 = _interopRequireDefault(_libImageResizer);

	var _libWebcamHandler = __webpack_require__(88);

	var _libWebcamHandler2 = _interopRequireDefault(_libWebcamHandler);

	var _libTopControls = __webpack_require__(89);

	var _libTopControls2 = _interopRequireDefault(_libTopControls);

	var _libScrollbar = __webpack_require__(90);

	var _libScrollbar2 = _interopRequireDefault(_libScrollbar);

	var _constants = __webpack_require__(14);

	var NightUI = (function (_UI) {
	  _inherits(NightUI, _UI);

	  function NightUI() {
	    _classCallCheck(this, NightUI);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _get(Object.getPrototypeOf(NightUI.prototype), 'constructor', this).apply(this, args);

	    this._operationsMap = {};
	    this._template = function(it
	/**/) {
	var out='<div class="imglykit"> <div class="imglykit-loadingOverlay"> <div class="imglykit-loadingOverlay-content"> <img src="'+( it.helpers.assetPath('ui/night/loading.gif'))+'" /> <span>'+( it.helpers.translate('generic.loading') )+'...</span> </div> </div> <div class="imglykit-flashOverlay"> <div class="imglykit-flashOverlay-close"> <img src="'+( it.helpers.assetPath('ui/night/close.png'))+'" /> </div> <div class="imglykit-flashOverlay-headline"></div> <div class="imglykit-flashOverlay-text"></div> </div> <div class="imglykit-container"> ';if(!it.options.ui.hideHeader){out+=' <div class="imglykit-header-row"> <div class="imglykit-header"> img.ly Photo Editor SDK ';if(it.options.ui.showCloseButton){out+=' <div class="imglykit-close-button"> <img src="'+(it.helpers.assetPath('ui/night/close.png'))+'" /> </div> ';}out+=' </div> </div> ';}out+=' ';if(it.renderControls){out+=' <div class="imglykit-top-controls-row"> <div class="imglykit-top-controls"> <div class="imglykit-top-controls-left"> ';if(it.options.ui.showNewButton){out+=' <div class="imglykit-new"> <img src="'+(it.helpers.assetPath('ui/night/top/new.png'))+'" /> '+( it.helpers.translate('top-controls.new') )+' </div> ';}out+=' ';if(it.options.ui.showExportButton){out+=' <div class="imglykit-export"> <img src="'+(it.helpers.assetPath('ui/night/top/export.png'))+'" /> '+( it.helpers.translate('top-controls.export') )+' </div> ';}out+=' <div class="imglykit-undo"> <img src="'+(it.helpers.assetPath('ui/night/top/undo.png'))+'" /> '+( it.helpers.translate('top-controls.undo') )+' </div> </div> <div class="imglykit-top-controls-right"> <div class="imglykit-zoom-fit"></div> <div class="imglykit-zoom-level">'+( it.helpers.translate('top-controls.zoom') )+': <span class="imglykit-zoom-level-num">100</span>%</div> <div class="imglykit-zoom-in"> <img src="'+(it.helpers.assetPath('ui/night/top/zoom-in.png'))+'" /> </div> <div class="imglykit-zoom-out"> <img src="'+(it.helpers.assetPath('ui/night/top/zoom-out.png'))+'" /> </div> </div> </div> </div> ';}out+=' <div class="imglykit-canvas-container-row"> <div class="imglykit-canvas-container"> ';if(it.renderWebcam){out+=' <div class="imglykit-canvas-inner-container"> <video class="imglykit-webcam-video" autoplay></video> </div> ';}out+=' ';if(!(it.renderSplashScreen || it.renderWebcam)){out+=' <div class="imglykit-canvas-inner-container"> <canvas class="imglykit-canvas-draggable"></canvas> <div class="imglykit-canvas-controls imglykit-canvas-controls-disabled"></div> </div> ';}out+=' ';if(it.renderSplashScreen){out+=' <div class="imglykit-splash-container"> ';if(it.options.ui.showUploadButton){out+=' <div class="imglykit-splash-row imglykit-splash-row--upload"> <div class="imglykit-splash-cell"> <input type="file" class="imglykit-upload-hidden-input" /> <img src="'+(it.helpers.assetPath('ui/night/upload.png'))+'" /> <div class="imglykit-splash-content"> <div class="imglykit-splash-button">'+( it.helpers.translate('splash.upload.headline') )+'</div> <div class="imglykit-splash-text">'+( it.helpers.translate('splash.upload.description') )+'</div> </div> </div> </div> ';}out+=' ';if(it.options.ui.showUploadButton && it.options.ui.showWebcamButton){out+=' <div class="imglykit-splash-row imglykit-splash-row--or"> <div class="imglykit-splash-or"> <div class="imglykit-splash-or-line"></div> <div class="imglykit-splash-or-word">'+( it.helpers.translate('splash.or') )+'</div> <div class="imglykit-splash-or-line"></div> </div> </div> ';}out+=' ';if(it.options.ui.showWebcamButton){out+=' <div class="imglykit-splash-row imglykit-splash-row--camera"> <div class="imglykit-splash-cell"> <img src="'+(it.helpers.assetPath('ui/night/shutter.png'))+'" /> <div class="imglykit-splash-content"> <div class="imglykit-splash-button">'+( it.helpers.translate('splash.webcam.headline') )+'</div> <div class="imglykit-splash-text">'+( it.helpers.translate('splash.webcam.description') )+'</div> </div> </div> </div> ';}out+=' </div> ';}out+=' </div> </div> ';if(it.renderWebcam){out+=' <div class="imglykit-controls-row"> <div class="imglykit-controls-container"> <div class="imglykit-controls"> <div class="imglykit-webcam-button"> <img src="'+(it.helpers.assetPath('ui/night/shutter-button.png'))+'" /> </div> </div> </div> </div> ';}out+=' ';if(it.renderControls){out+=' <div class="imglykit-controls-row"> <div class="imglykit-controls-container"> <div class="imglykit-controls"> <div> <div class="imglykit-controls-overview"> <ul class="imglykit-controls-list"> '; for (var identifier in it.controls) { out+=' '; var control = it.controls[identifier]; out+=' <li class="imglykit-controls-item--with-label" data-identifier="'+( control.identifier)+'"';if(it.controlsDisabled){out+=' data-disabled';}out+='> <img src="'+(it.helpers.assetPath('ui/night/operations/' + control.identifier + '.png') )+'" /> <div class="imglykit-controls-label">'+(it.helpers.translate('operations.' + control.identifier))+'</div> </li> '; } out+=' </ul> </div> </div> </div> </div> </div> ';}out+=' </div></div>';return out;
	};
	    this._registeredControls = {};
	    this._history = [];
	    this._imageResized = false;

	    // The `Night` UI has a fixed operation order
	    this._preferredOperationOrder = [
	    // First, all operations that affect the image dimensions
	    'rotation', 'crop', 'flip',

	    // Then color operations (first filters, then fine-tuning)
	    'filters', 'contrast', 'brightness', 'saturation',

	    // Then post-processing
	    'radial-blur', 'tilt-shift', 'frames', 'stickers', 'text', 'brush'];

	    this._paused = false;

	    this._options.ui = _libUtils2['default'].defaults(this._options.ui, {
	      showNewButton: !this._options.image,
	      showUploadButton: true,
	      showWebcamButton: true,
	      showHeader: true,
	      showCloseButton: false,
	      showExportButton: false,
	      language: 'en',
	      maxMegaPixels: 10,
	      'export': {}
	    });

	    this._options.ui['export'] = _libUtils2['default'].defaults(this._options.ui['export'], {
	      type: _constants.ImageFormat.JPEG,
	      quality: 0.8
	    });
	  }

	  /**
	   * A unique string that represents this UI
	   * @type {String}
	   */

	  _createClass(NightUI, [{
	    key: 'run',

	    /**
	     * Prepares the UI for use
	     */
	    value: function run() {
	      this._fixOperationsStack();
	      this._registerControls();
	      this._registerLanguages();

	      this._loadLanguage();

	      _get(Object.getPrototypeOf(NightUI.prototype), 'run', this).call(this);

	      var container = this._options.container;

	      this.hideFlashMessage = this.hideFlashMessage.bind(this);

	      this._controlsContainer = container.querySelector('.imglykit-controls');
	      this._canvasControlsContainer = container.querySelector('.imglykit-canvas-controls');
	      this._overviewControlsContainer = container.querySelector('.imglykit-controls-overview');
	      this._loadingOverlay = container.querySelector('.imglykit-loadingOverlay');
	      this._loadingSpan = container.querySelector('.imglykit-loadingOverlay span');
	      this._flashOverlay = container.querySelector('.imglykit-flashOverlay');
	      this._flashHeadline = this._flashOverlay.querySelector('.imglykit-flashOverlay-headline');
	      this._flashText = this._flashOverlay.querySelector('.imglykit-flashOverlay-text');
	      this._flashCloseButton = this._flashOverlay.querySelector('.imglykit-flashOverlay-close');
	      this._flashCloseButton.addEventListener('click', this.hideFlashMessage);

	      this._handleOverview();

	      if (this._options.image) {
	        this._resizeImageIfNecessary();
	      }

	      if (this._options.image) {
	        this._initCanvas();
	      }

	      if (this.context.renderSplashScreen) {
	        this._initFileLoader();
	        if (this._options.ui.showWebcamButton) {
	          this._handleWebcamButton();
	        }
	      }

	      if (this.context.renderWebcam) {
	        this._initWebcam();
	      }

	      this._initTopControls();
	      this._initControls();

	      if (this._options.image) {
	        this.showZoom();
	      }

	      if (this._options.ui.showCloseButton) {
	        this._handleCloseButton();
	      }

	      if (this._topControls) {
	        this._topControls.updateExportButton();
	      }

	      if (this._canvas) {
	        this._canvas.run();
	      }
	    }
	  }, {
	    key: '_loadLanguage',
	    value: function _loadLanguage() {
	      this._language = this._languages[this._options.ui.language];
	      if (!this._language) {
	        var availableLanguages = Object.keys(this._languages).join(', ');
	        throw new Error('Unknown language \'' + this._options.ui.language + '\'. Available languages are: ' + availableLanguages);
	      }
	    }

	    /**
	     * The SDK automatically adds Rotation and Flip operations for images
	     * that have the wrong rotation (in the Exif tags). Since we have a specific
	     * operation order for this UI, we need to place them correctly
	     * @private
	     */
	  }, {
	    key: '_fixOperationsStack',
	    value: function _fixOperationsStack() {
	      var operationsStack = this._kit.operationsStack;

	      var newStack = [];
	      for (var i = 0; i < operationsStack.length; i++) {
	        var operation = operationsStack[i];
	        var identifier = operation.identifier;

	        var indexInStack = this._preferredOperationOrder.indexOf(identifier);
	        newStack[indexInStack] = operation;
	        this._operationsMap[identifier] = operation;
	      }
	      this._kit.operationsStack = newStack;
	    }

	    /**
	     * Initializes the webcam
	     * @private
	     */
	  }, {
	    key: '_initWebcam',
	    value: function _initWebcam() {
	      this._webcam = new _libWebcamHandler2['default'](this._kit, this);
	      this._webcam.on('image', this._onWebcamImageTaken.bind(this));
	    }

	    /**
	     * Gets called when the webcam image has been taken
	     * @param {Image} image
	     * @private
	     */
	  }, {
	    key: '_onWebcamImageTaken',
	    value: function _onWebcamImageTaken(image) {
	      this._options.ui.startWithWebcam = false;
	      this._setImage(image);
	    }

	    /**
	     * Handles the webcam button
	     * @private
	     */
	  }, {
	    key: '_handleWebcamButton',
	    value: function _handleWebcamButton() {
	      var _this = this;

	      var container = this._options.container;

	      var webcamButton = container.querySelector('.imglykit-splash-row--camera');
	      webcamButton.addEventListener('click', function () {
	        _this._options.ui.startWithWebcam = true;
	        _this.run();
	      });
	    }

	    /**
	     * Initializes the file loader
	     * @private
	     */
	  }, {
	    key: '_initFileLoader',
	    value: function _initFileLoader() {
	      this._fileLoader = new _libFileLoader2['default'](this._kit, this);
	      this._fileLoader.on('file', this._onFileLoaded.bind(this));
	    }

	    /**
	     * Gets called when the user loaded a file using the FileLoader
	     * @param {File} file
	     * @private
	     */
	  }, {
	    key: '_onFileLoaded',
	    value: function _onFileLoaded(file) {
	      var _this2 = this;

	      var reader = new FileReader();
	      reader.onload = (function () {
	        return function (e) {
	          var data = e.target.result;
	          var image = new Image();

	          image.addEventListener('load', function () {
	            _this2._setImage(image);
	          });

	          image.src = data;
	        };
	      })(file);
	      reader.readAsDataURL(file);
	    }

	    /**
	     * Sets the image option and starts rendering
	     * @param {Image} image
	     * @private
	     */
	  }, {
	    key: '_setImage',
	    value: function _setImage(image) {
	      this._kit.setImage(image);
	      this.run();
	    }

	    /**
	     * Initializes the top controls
	     * @private
	     */
	  }, {
	    key: '_initTopControls',
	    value: function _initTopControls() {
	      var _this3 = this;

	      if (!this.context.renderControls) return;

	      this._topControls = new _libTopControls2['default'](this._kit, this);
	      this._topControls.run();

	      this._topControls.on('new', function () {
	        _this3._options.image = null;
	        _this3.run();
	      });

	      this._topControls.on('undo', function () {
	        _this3.undo();
	      });

	      this._topControls.on('export', function () {
	        _this3['export']();
	      });

	      // Pass zoom in event
	      this._topControls.on('zoom-in', function () {
	        _this3._canvas.zoomIn().then(function () {
	          if (_this3._currentControl) {
	            _this3._currentControl.onZoom();
	          }
	        });
	      });

	      // Pass zoom out event
	      this._topControls.on('zoom-out', function () {
	        _this3._canvas.zoomOut().then(function () {
	          if (_this3._currentControl) {
	            _this3._currentControl.onZoom();
	          }
	        });
	      });
	    }

	    /**
	     * Resizes the image to fit the maximum texture size
	     * @private
	     */
	  }, {
	    key: '_resizeImageIfNecessary',
	    value: function _resizeImageIfNecessary() {
	      var image = this._options.image;

	      var imageDimensions = new _libMathVector22['default'](image.width, image.height);
	      var megaPixels = imageDimensions.x * imageDimensions.y / 1000000;

	      if (megaPixels > this._options.ui.maxMegaPixels) {
	        // Dimensions exceed `maxMegaPixels`. Calculate new size
	        var pixelsCount = this._options.ui.maxMegaPixels * 1000000;
	        var ratioHV = imageDimensions.x / imageDimensions.y;
	        var ratioVH = imageDimensions.y / imageDimensions.x;
	        var newDimensions = new _libMathVector22['default'](Math.sqrt(pixelsCount * ratioHV), Math.sqrt(pixelsCount * ratioVH)).floor();

	        this.displayFlashMessage(this.translate('generic.warning_headline'), this.translate('warnings.image_resized', this._options.ui.maxMegaPixels, newDimensions.x, newDimensions.y), 'warning');
	        this._imageResized = true;
	        this._options.image = _libImageResizer2['default'].resize(this._options.image, newDimensions);
	      }
	    }

	    /**
	     * Inititializes the canvas
	     * @private
	     */
	  }, {
	    key: '_initCanvas',
	    value: function _initCanvas() {
	      var _this4 = this;

	      this._canvas = new _libCanvas2['default'](this._kit, this, this._options);
	      this._canvas.on('zoom', function () {
	        _this4._topControls.updateZoomLevel();
	      });
	      this._canvas.on('error', function (key) {
	        _this4.displayErrorMessage(key);
	      });
	    }

	    /**
	     * Displays the given error key
	     * @param {String} key
	     */
	  }, {
	    key: 'displayErrorMessage',
	    value: function displayErrorMessage(key) {
	      var err = this.translate('errors.' + key);
	      this.displayFlashMessage('An error has occurred!', err + ' (' + key + ')', 'error');
	    }

	    /**
	     * Displays a flash message with the given title and type
	     * @param {String} message
	     * @param {String} message
	     * @param {String} type = 'notice'
	     */
	  }, {
	    key: 'displayFlashMessage',
	    value: function displayFlashMessage(headline, message) {
	      var type = arguments.length <= 2 || arguments[2] === undefined ? 'notice' : arguments[2];

	      this._flashText.textContent = message;
	      this._flashHeadline.textContent = headline;
	      this._flashOverlay.style.display = 'block';

	      this._flashOverlay.className = 'imglykit-flashOverlay imglykit-flashOverlay--' + type;
	    }

	    /**
	     * Hides the flash message
	     */
	  }, {
	    key: 'hideFlashMessage',
	    value: function hideFlashMessage() {
	      this._flashOverlay.style.display = 'none';
	    }

	    /**
	     * Selects the enabled operations
	     * @param {ImglyKit.Selector}
	     */
	  }, {
	    key: 'selectOperations',
	    value: function selectOperations(selector) {
	      _get(Object.getPrototypeOf(NightUI.prototype), 'selectOperations', this).call(this, selector);
	    }

	    /**
	     * Returns or creates an instance of the operation with the given identifier
	     * @param {String} identifier
	     */
	  }, {
	    key: 'getOrCreateOperation',
	    value: function getOrCreateOperation(identifier) {
	      var _kit = this._kit;
	      var operationsStack = _kit.operationsStack;
	      var registeredOperations = _kit.registeredOperations;

	      var Operation = registeredOperations[identifier];

	      if (typeof this._operationsMap[identifier] === 'undefined') {
	        // Create operation
	        var operationInstance = new Operation(this._kit);
	        this._operationsMap[identifier] = operationInstance;

	        // Find index in preferred operation order
	        var index = this._preferredOperationOrder.indexOf(identifier);
	        if (index === -1) {
	          index = this._preferredOperationOrder.length;
	        }
	        operationsStack[index] = operationInstance;

	        return operationInstance;
	      } else {
	        return this._operationsMap[identifier];
	      }
	    }

	    /**
	     * Removes the operation with the given identifier from the stack
	     * @param {String} identifier
	     */
	  }, {
	    key: 'removeOperation',
	    value: function removeOperation(identifier) {
	      if (!this._operationsMap[identifier]) return;

	      var operation = this._operationsMap[identifier];
	      delete this._operationsMap[identifier];

	      var index = this._kit.operationsStack.indexOf(operation);
	      this._kit.operationsStack[index] = null;
	    }

	    /**
	     * Registers all default operation controls
	     * @private
	     */
	  }, {
	    key: '_registerControls',
	    value: function _registerControls() {
	      this.registerControl('filters', 'filters', __webpack_require__(91));
	      this.registerControl('rotation', 'rotation', __webpack_require__(93));
	      this.registerControl('flip', 'flip', __webpack_require__(94));
	      this.registerControl('brightness', 'brightness', __webpack_require__(95));
	      this.registerControl('contrast', 'contrast', __webpack_require__(97));
	      this.registerControl('saturation', 'saturation', __webpack_require__(98));
	      this.registerControl('crop', 'crop', __webpack_require__(99));
	      this.registerControl('radial-blur', 'radial-blur', __webpack_require__(100));
	      this.registerControl('tilt-shift', 'tilt-shift', __webpack_require__(102));
	      this.registerControl('frames', 'frames', __webpack_require__(103));
	      this.registerControl('stickers', 'stickers', __webpack_require__(105));
	      this.registerControl('text', 'text', __webpack_require__(106));
	      this.registerControl('brush', 'brush', __webpack_require__(107));
	    }

	    /**
	     * Register all default languages
	     * @private
	     */
	  }, {
	    key: '_registerLanguages',
	    value: function _registerLanguages() {
	      this.registerLanguage('en', __webpack_require__(108));
	      this.registerLanguage('de', __webpack_require__(109));
	    }

	    /**
	     * Handles the overview button click events
	     * @private
	     */
	  }, {
	    key: '_handleOverview',
	    value: function _handleOverview() {
	      var _this5 = this;

	      if (!this.context.renderControls) return;

	      var itemsList = this._overviewControlsContainer.querySelector('ul');
	      if (!itemsList.parentNode === this._overviewControlsContainer) {
	        return;
	      }
	      var listItems = [].filter.call(itemsList.querySelectorAll('li'), function (el) {
	        return el.parentNode === itemsList;
	      });

	      // Add click events to all items

	      var _loop = function (i) {
	        var listItem = listItems[i];
	        var identifier = listItem.getAttribute('data-identifier');
	        listItem.addEventListener('click', function () {
	          _this5.switchToControl(identifier);
	        });
	      };

	      for (var i = 0; i < listItems.length; i++) {
	        _loop(i);
	      }
	    }

	    /**
	     * Enables the overview controls
	     * @private
	     */
	  }, {
	    key: '_enableControls',
	    value: function _enableControls() {
	      var itemsList = this._overviewControlsContainer.querySelector('ul');
	      if (!itemsList.parentNode === this._overviewControlsContainer) {
	        return;
	      }
	      var listItems = [].filter.call(itemsList.querySelectorAll('li'), function (el) {
	        return el.parentNode === itemsList;
	      });

	      // Add click events to all items
	      for (var i = 0; i < listItems.length; i++) {
	        var listItem = listItems[i];
	        listItem.removeAttribute('data-disabled');
	      }
	    }

	    /**
	     * Gets called when an overview button has been clicked
	     * @private
	     */
	  }, {
	    key: 'switchToControl',
	    value: function switchToControl(identifier) {
	      if (this.context.controlsDisabled) return;
	      this._overviewControlsContainer.style.display = 'none';

	      this._scrollbar.remove();

	      if (this._currentControl) {
	        this._currentControl.leave();
	      }

	      this._currentControl = this._registeredControls[identifier];
	      this._currentControl.enter();
	      this._currentControl.once('back', this._switchToOverview.bind(this));
	    }

	    /**
	     * Switches back to the overview controls
	     * @private
	     */
	  }, {
	    key: '_switchToOverview',
	    value: function _switchToOverview() {
	      if (this._currentControl) {
	        this._currentControl.leave();
	      }

	      this._currentControl = null;
	      this._overviewControlsContainer.style.display = '';

	      this._initScrollbar();
	    }

	    /**
	     * Registers the controls for an operation
	     * @param {String} identifier
	     * @param {String} operationIdentifier
	     * @param {Control} ControlClass
	     */
	  }, {
	    key: 'registerControl',
	    value: function registerControl(identifier, operationIdentifier, ControlClass) {
	      if (!this.isOperationSelected(operationIdentifier)) return;

	      var instance = new ControlClass(this._kit, this);
	      this._registeredControls[identifier] = instance;
	    }

	    /**
	     * Initializes the registered controls
	     * @private
	     */
	  }, {
	    key: '_initControls',
	    value: function _initControls() {
	      for (var identifier in this._registeredControls) {
	        var control = this._registeredControls[identifier];
	        control.setContainers(this._controlsContainer, this._canvasControlsContainer);
	        control.init();
	      }

	      this._initScrollbar();
	    }

	    /**
	     * Initializes the custom scrollbar
	     * @private
	     */
	  }, {
	    key: '_initScrollbar',
	    value: function _initScrollbar() {
	      if (!this.context.renderControls) return;

	      var container = this._controlsContainer.querySelector('.imglykit-controls-list').parentNode;
	      this._scrollbar = new _libScrollbar2['default'](container);
	    }

	    /**
	     * Handles the click event on the close button, emits a `close` event
	     * when clicking
	     * @private
	     */
	  }, {
	    key: '_handleCloseButton',
	    value: function _handleCloseButton() {
	      var _this6 = this;

	      var closeButton = this._options.container.querySelector('.imglykit-close-button');
	      closeButton.addEventListener('click', function (e) {
	        e.preventDefault();
	        _this6.emit('close');
	      });
	    }

	    /**
	     * Re-renders the canvas
	     */
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this._canvas) {
	        this._canvas.render();
	      }
	    }

	    /**
	     * An object containing all active operations
	     * @type {Object.<String,Operation>}
	     */
	  }, {
	    key: 'pause',

	    /**
	     * Pauses the UI. Operation updates will not cause a re-rendering
	     * of the canvas.
	     */
	    value: function pause() {
	      this._paused = true;
	    }

	    /**
	     * Resumes the UI and re-renders the canvas
	     * @param {Boolean} rerender = true
	     */
	  }, {
	    key: 'resume',
	    value: function resume() {
	      var rerender = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      this._paused = false;
	      if (rerender) {
	        this.render();
	      }
	    }

	    /**
	     * Adds the given operation and options to the history stack
	     * @param {Operation} operation
	     * @param {Object.<String, *>} options
	     * @param {Boolean} existent
	     * @returns {Object} The history item
	     */
	  }, {
	    key: 'addHistory',
	    value: function addHistory(operation, options, existent) {
	      var historyItem = { operation: operation, options: options, existent: existent };
	      this._history.push(historyItem);
	      this._topControls.updateUndoButton();
	      return historyItem;
	    }

	    /**
	     * Hides the zoom control
	     */
	  }, {
	    key: 'hideZoom',
	    value: function hideZoom() {
	      this._topControls.hideZoom();
	    }

	    /**
	     * Hides the zoom control
	     */
	  }, {
	    key: 'showZoom',
	    value: function showZoom() {
	      this._topControls.showZoom();
	    }

	    /**
	     * Takes the last history item and applies its options
	     */
	  }, {
	    key: 'undo',
	    value: function undo() {
	      var _this7 = this;

	      var lastItem = this._history.pop();
	      var promise = _vendorNativePromiseOnly2['default'].resolve();
	      if (lastItem) {
	        var operation = lastItem.operation;
	        var existent = lastItem.existent;
	        var options = lastItem.options;

	        if (!existent) {
	          this.removeOperation(operation.identifier);
	        } else {
	          operation = this.getOrCreateOperation(operation.identifier);
	          operation.set(options);
	        }
	        promise = this.canvas.zoomToFit(true);
	      }
	      this._topControls.updateUndoButton();

	      // Make sure the current control represents the new value
	      promise.then(function () {
	        if (_this7._currentControl) {
	          _this7._currentControl.update();
	        }
	      });
	    }

	    /**
	     * Exports the current image with the default settings
	     */
	  }, {
	    key: 'export',
	    value: function _export() {
	      var _this8 = this;

	      this.displayLoadingMessage(this.translate('generic.exporting') + '...');

	      var renderType = _constants.RenderType.DATAURL;

	      // Check if msToBlob is available
	      var canvas = document.createElement('canvas');
	      if (typeof canvas.msToBlob !== 'undefined') {
	        renderType = _constants.RenderType.MSBLOB;
	      }

	      setTimeout(function () {
	        _this8._kit.render(renderType, _this8._options.ui['export'].type, _this8._options.ui['export'].dimensions, _this8._options.ui['export'].quality).then(function (data) {
	          switch (renderType) {
	            case _constants.RenderType.DATAURL:
	              var url = _libUtils2['default'].createBlobURIFromDataURI(data);
	              var link = document.createElement('a');
	              var extension = _this8._options.ui['export'].type.split('/').pop();
	              link.download = 'imglykit-export.' + extension;
	              link.href = url;
	              document.body.appendChild(link);
	              link.click();
	              // Cleanup the DOM
	              document.body.removeChild(link);
	              break;
	            case _constants.RenderType.MSBLOB:
	              navigator.msSaveBlob(data, 'imglykit-export.png');
	              break;
	          }

	          _this8.hideLoadingMessage();
	        });
	      }, 1000);
	    }

	    /**
	     * Displays the given message inside the loading overlay
	     * @param {String} message
	     */
	  }, {
	    key: 'displayLoadingMessage',
	    value: function displayLoadingMessage(message) {
	      this._loadingSpan.textContent = message;
	      this._loadingOverlay.style.display = 'block';
	    }

	    /**
	     * Hides the loading message
	     */
	  }, {
	    key: 'hideLoadingMessage',
	    value: function hideLoadingMessage() {
	      this._loadingOverlay.style.display = 'none';
	    }

	    /**
	     * The undo history
	     * @type {Array.<Object>}
	     */
	  }, {
	    key: 'identifier',
	    get: function get() {
	      return 'night';
	    }
	  }, {
	    key: 'operations',
	    get: function get() {
	      return this._operationsMap;
	    }

	    /**
	     * An object containing all registered controls
	     * @type {Object.<String,Control>}
	     */
	  }, {
	    key: 'controls',
	    get: function get() {
	      return this._registeredControls;
	    }

	    /**
	     * The data that is passed to the template renderer
	     * @type {Object}
	     */
	  }, {
	    key: 'context',
	    get: function get() {
	      var context = _get(Object.getPrototypeOf(NightUI.prototype), 'context', this);
	      context.controls = this._registeredControls;
	      context.renderSplashScreen = !this._options.image && !this._options.ui.startWithWebcam;
	      context.renderControls = !!this._options.image;
	      context.renderWebcam = this._options.ui.startWithWebcam;
	      return context;
	    }
	  }, {
	    key: 'history',
	    get: function get() {
	      return this._history;
	    }

	    /**
	     * The file loader
	     * @type {FileLoader}
	     */
	  }, {
	    key: 'fileLoader',
	    get: function get() {
	      return this._fileLoader;
	    }

	    /**
	     * Has the image been resized initially?
	     * @type {Boolean}
	     */
	  }, {
	    key: 'imageResized',
	    get: function get() {
	      return this._imageResized;
	    }
	  }]);

	  return NightUI;
	})(_baseUi2['default']);

	NightUI.Control = __webpack_require__(92);

	exports['default'] = NightUI;
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _helpers = __webpack_require__(84);

	var _helpers2 = _interopRequireDefault(_helpers);

	var BaseUI = (function (_EventEmitter) {
	  _inherits(BaseUI, _EventEmitter);

	  function BaseUI(kit, options) {
	    _classCallCheck(this, BaseUI);

	    _get(Object.getPrototypeOf(BaseUI.prototype), 'constructor', this).call(this);

	    this._kit = kit;
	    this._options = options;
	    this._options.ui = this._options.ui || {};
	    this._operations = [];
	    this._helpers = new _helpers2['default'](this.kit, this, options);
	    this._languages = {};
	    this.selectOperations(null);
	  }

	  /**
	   * Prepares the UI for use
	   */

	  _createClass(BaseUI, [{
	    key: 'run',
	    value: function run() {
	      this._attach();
	    }

	    /**
	     * Registers a language
	     * @param  {String} identifier
	     * @param  {Object} object
	     */
	  }, {
	    key: 'registerLanguage',
	    value: function registerLanguage(identifier, object) {
	      this._languages[identifier] = object;
	    }

	    /**
	     * Returns the translation for `key`
	     * @param  {String} key
	     * @param  {Array.<String>} args
	     * @return {String}
	     */
	  }, {
	    key: 'translate',
	    value: function translate(key) {
	      var str = _libUtils2['default'].fetch(this._language, key, 'translation-missing');

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      for (var i = 0; i < args.length; i++) {
	        var arg = args[i];
	        str = str.replace('$' + (i + 1), arg);
	      }
	      return str;
	    }

	    /**
	     * A unique string that represents this UI
	     * @type {String}
	     */
	  }, {
	    key: '_attach',

	    /**
	     * Renders and attaches the UI HTML
	     * @private
	     */
	    value: function _attach() {
	      if (this._options.container === null) {
	        throw new Error('BaseUI#attach: No container set.');
	      }

	      var html = this._render();
	      this._options.container.innerHTML = html;

	      // Container has to be position: relative
	      this._options.container.style.position = 'relative';
	    }

	    /**
	     * Renders the template
	     * @private
	     */
	  }, {
	    key: '_render',
	    value: function _render() {
	      if (typeof this._template === 'undefined') {
	        throw new Error('BaseUI#_render: No template set.');
	      }

	      return this._template(this.context);
	    }

	    /**
	     * Selects the enabled operations
	     * @param {ImglyKit.Selector}
	     */
	  }, {
	    key: 'selectOperations',
	    value: function selectOperations(selector) {
	      var registeredOperations = this._kit.registeredOperations;

	      var operationIdentifiers = Object.keys(registeredOperations);

	      var selectedOperations = _libUtils2['default'].select(operationIdentifiers, selector);
	      this._operations = selectedOperations.map(function (identifier) {
	        return registeredOperations[identifier];
	      });
	    }

	    /**
	     * Adds the given operation to the available operations
	     * @param {Operation} operation
	     */
	  }, {
	    key: 'addOperation',
	    value: function addOperation(operation) {
	      this._operations.push(operation);
	    }

	    /**
	     * Checks whether the operation with the given identifier is selected
	     * @param {String} identifier
	     * @returns {Boolean}
	     */
	  }, {
	    key: 'isOperationSelected',
	    value: function isOperationSelected(identifier) {
	      var operationIdentifiers = this._operations.map(function (operation) {
	        return operation.prototype.identifier;
	      });
	      return operationIdentifiers.indexOf(identifier) !== -1;
	    }

	    /**
	     * The data that is passed to the template renderer
	     * @type {Object}
	     */
	  }, {
	    key: 'identifier',
	    get: function get() {
	      return null;
	    }
	  }, {
	    key: 'context',
	    get: function get() {
	      return {
	        operations: this._operations,
	        helpers: this._helpers,
	        options: this._options
	      };
	    }

	    /**
	     * The DOM container
	     * @type {DOMElement}
	     */
	  }, {
	    key: 'container',
	    get: function get() {
	      return this._options.container;
	    }

	    /**
	     * The selected / active operations
	     * @type {Array.<ImglyKit.Operation>}
	     */
	  }, {
	    key: 'operations',
	    get: function get() {
	      return this._operations;
	    }

	    /**
	     * The options
	     * @type {Object}
	     */
	  }, {
	    key: 'options',
	    get: function get() {
	      return this._options;
	    }

	    /**
	     * The canvas object
	     * @type {Canvas}
	     */
	  }, {
	    key: 'canvas',
	    get: function get() {
	      return this._canvas;
	    }

	    /**
	     * The helpers
	     * @type {Helpers}
	     */
	  }, {
	    key: 'helpers',
	    get: function get() {
	      return this._helpers;
	    }

	    /**
	     * The image
	     * @type {Image}
	     */
	  }, {
	    key: 'image',
	    get: function get() {
	      return this._options.image;
	    }
	  }]);

	  return BaseUI;
	})(_libEventEmitter2['default']);

	exports['default'] = BaseUI;
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Helpers = (function () {
	  function Helpers(kit, ui, options) {
	    _classCallCheck(this, Helpers);

	    this._kit = kit;
	    this._ui = ui;
	    this._options = options;
	  }

	  _createClass(Helpers, [{
	    key: 'assetPath',
	    value: function assetPath(asset) {
	      var path = this._options.assetsUrl + '/' + asset;

	      var assetPathResolver = this._ui.options.ui.assetPathResolver;
	      if (typeof assetPathResolver !== 'undefined') {
	        path = assetPathResolver(path);
	      }

	      return path;
	    }
	  }, {
	    key: 'translate',
	    value: function translate(key) {
	      return this._ui.translate(key);
	    }
	  }]);

	  return Helpers;
	})();

	exports['default'] = Helpers;
	module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _renderersWebglRenderer = __webpack_require__(12);

	var _renderersWebglRenderer2 = _interopRequireDefault(_renderersWebglRenderer);

	var _renderersCanvasRenderer = __webpack_require__(5);

	var _renderersCanvasRenderer2 = _interopRequireDefault(_renderersCanvasRenderer);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _vendorPromise = __webpack_require__(8);

	var _vendorPromise2 = _interopRequireDefault(_vendorPromise);

	var Canvas = (function (_EventEmitter) {
	  _inherits(Canvas, _EventEmitter);

	  function Canvas(kit, ui, options) {
	    _classCallCheck(this, Canvas);

	    _get(Object.getPrototypeOf(Canvas.prototype), 'constructor', this).call(this);

	    this._kit = kit;
	    this._ui = ui;
	    this._options = options;

	    var container = this._ui.container;

	    this._canvasContainer = container.querySelector('.imglykit-canvas-container');
	    this._canvasInnerContainer = container.querySelector('.imglykit-canvas-inner-container');
	    this._canvas = this._canvasContainer.querySelector('canvas');
	    this._image = this._options.image;
	    this._roundZoomBy = 0.1;
	    this._isFirstRender = true;

	    // Mouse event callbacks bound to the class context
	    this._dragOnMousedown = this._dragOnMousedown.bind(this);
	    this._dragOnMousemove = this._dragOnMousemove.bind(this);
	    this._dragOnMouseup = this._dragOnMouseup.bind(this);
	  }

	  /**
	   * Initializes the renderer, sets the zoom level and initially
	   * renders the operations stack
	   */

	  _createClass(Canvas, [{
	    key: 'run',
	    value: function run() {
	      this._initRenderer();

	      // Calculate the initial zoom level
	      this._zoomLevel = this._getInitialZoomLevel();
	      this._size = null;

	      this.render();
	      this._centerCanvas();
	      this._handleDrag();
	    }
	  }, {
	    key: 'getProcessedDimensions',
	    value: function getProcessedDimensions() {
	      var _this = this;

	      var stack = this.sanitizedStack;

	      var size = new _libMathVector22['default'](this._image.width, this._image.height);
	      stack.forEach(function (operation) {
	        size = operation.getNewDimensions(_this._renderer, size);
	      });

	      return size;
	    }

	    /**
	     * Renders the current operations stack
	     */
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      // Calculate the initial size
	      var initialSize = this._renderer.getInitialDimensionsForStack(this.sanitizedStack).multiply(this._zoomLevel);
	      this._setCanvasSize(initialSize);

	      this._renderer.setSize(initialSize);

	      // Reset framebuffers
	      this._renderer.reset();

	      // Run the operations stack
	      var stack = this.sanitizedStack;
	      this._updateStackDirtyStates(stack);

	      var validationPromises = [];
	      for (var i = 0; i < stack.length; i++) {
	        var operation = stack[i];
	        validationPromises.push(operation.validateSettings());
	      }

	      return _vendorPromise2['default'].all(validationPromises).then(function () {
	        // When using WebGL, resize the image to max texture size if necessary
	        if (_this2._isFirstRender && _this2._renderer.identifier === 'webgl') {

	          if (_this2._image.width > _this2._renderer.maxTextureSize || _this2._image.height > _this2._renderer.maxTextureSize) {
	            _this2._ui.displayLoadingMessage('Resizing...');
	            return new _vendorPromise2['default'](function (resolve, reject) {
	              setTimeout(function () {
	                _this2._renderer.prepareImage(_this2._image).then(function (image) {
	                  _this2._ui.hideLoadingMessage();
	                  _this2._options.image = image;
	                  _this2._image = _this2._options.image;
	                  resolve();
	                })['catch'](function (e) {
	                  reject(e);
	                });
	              }, 100);
	            });
	          }
	        }
	      }).then(function () {
	        // On first render, draw the image to the input texture
	        if (_this2._isFirstRender || _this2._renderer.constructor.identifier === 'canvas') {
	          _this2._isFirstRender = false;
	          return _this2._renderer.drawImage(_this2._image);
	        }
	      })
	      // Render the operations stack
	      .then(function () {
	        var promises = [];
	        for (var i = 0; i < stack.length; i++) {
	          var operation = stack[i];
	          promises.push(operation.render(_this2._renderer));
	        }
	        return _vendorPromise2['default'].all(promises);
	      })
	      // Render the final image
	      .then(function () {
	        return _this2._renderer.renderFinal();
	      })
	      // Update the margins and boundaries
	      .then(function () {
	        _this2._storeCanvasSize();
	        _this2._updateContainerSize();
	        _this2._updateCanvasMargins();
	        _this2._applyBoundaries();
	      })['catch'](function (e) {
	        console.log(e);
	      });
	    }

	    /**
	     * Sets the image to the given one
	     * @param {Image} image
	     */
	  }, {
	    key: 'setImage',
	    value: function setImage(image) {
	      this._image = image;
	      this.reset();
	      this.render();
	      this._centerCanvas();
	    }

	    /**
	     * Increase zoom level
	     */
	  }, {
	    key: 'zoomIn',
	    value: function zoomIn() {
	      this._isInitialZoom = false;

	      var zoomLevel = Math.round(this._zoomLevel * 100);
	      var roundZoomBy = Math.round(this._roundZoomBy * 100);
	      var initialZoomLevel = Math.round(this._getInitialZoomLevel() * 100);

	      // Round up if needed
	      if (zoomLevel % roundZoomBy !== 0) {
	        zoomLevel = Math.ceil(zoomLevel / roundZoomBy) * roundZoomBy;
	      } else {
	        zoomLevel += roundZoomBy;
	      }

	      zoomLevel = Math.min(initialZoomLevel * 2, zoomLevel);
	      return this.setZoomLevel(zoomLevel / 100);
	    }

	    /**
	     * Decrease zoom level
	     */
	  }, {
	    key: 'zoomOut',
	    value: function zoomOut() {
	      this._isInitialZoom = false;

	      var zoomLevel = Math.round(this._zoomLevel * 100);
	      var roundZoomBy = Math.round(this._roundZoomBy * 100);
	      var initialZoomLevel = Math.round(this._getInitialZoomLevel() * 100);

	      // Round up if needed
	      if (zoomLevel % roundZoomBy !== 0) {
	        zoomLevel = Math.floor(zoomLevel / roundZoomBy) * roundZoomBy;
	      } else {
	        zoomLevel -= roundZoomBy;
	      }

	      zoomLevel = Math.max(initialZoomLevel, zoomLevel);
	      return this.setZoomLevel(zoomLevel / 100);
	    }

	    /**
	     * Resizes and positions the canvas
	     * @param {Vector2} [size]
	     * @private
	     */
	  }, {
	    key: '_setCanvasSize',
	    value: function _setCanvasSize(size) {
	      size = size || new _libMathVector22['default'](this._canvas.width, this._canvas.height);
	      size = size.clone().floor();

	      if (this._canvas.width === size.x && this._canvas.height === size.y) {
	        return;
	      }

	      this._canvas.width = size.x;
	      this._canvas.height = size.y;

	      this._storeCanvasSize();
	      this._updateContainerSize();
	    }

	    /**
	     * Updates the canvas container size
	     * @private
	     */
	  }, {
	    key: '_updateContainerSize',
	    value: function _updateContainerSize() {
	      var size = this._size;
	      this._canvasInnerContainer.style.width = size.x + 'px';
	      this._canvasInnerContainer.style.height = size.y + 'px';
	    }

	    /**
	     * Remembers the canvas size
	     * @comment This was introduced because the canvas size was not always
	     *          correct due to some race conditions. Now that promises work
	     *          properly, do we still need this?
	     * @private
	     */
	  }, {
	    key: '_storeCanvasSize',
	    value: function _storeCanvasSize() {
	      this._size = new _libMathVector22['default'](this._canvas.width, this._canvas.height);
	    }

	    /**
	     * Centers the canvas inside the container
	     * @private
	     */
	  }, {
	    key: '_centerCanvas',
	    value: function _centerCanvas() {
	      var position = this._maxSize.divide(2);

	      this._canvasInnerContainer.style.left = position.x + 'px';
	      this._canvasInnerContainer.style.top = position.y + 'px';

	      this._updateCanvasMargins();
	    }

	    /**
	     * Updates the canvas margins so that they are the negative half width
	     * and height of the canvas
	     * @private
	     */
	  }, {
	    key: '_updateCanvasMargins',
	    value: function _updateCanvasMargins() {
	      var canvasSize = new _libMathVector22['default'](this._canvas.width, this._canvas.height);
	      var margin = canvasSize.divide(2).multiply(-1);
	      this._canvasInnerContainer.style.marginLeft = margin.x + 'px';
	      this._canvasInnerContainer.style.marginTop = margin.y + 'px';
	    }

	    /**
	     * Sets the zoom level, re-renders the canvas and
	     * repositions it
	     * @param {Number} zoomLevel
	     * @param {Boolean} render = true
	     * @param {Boolean} isInitialZoom = false
	     * @private
	     */
	  }, {
	    key: 'setZoomLevel',
	    value: function setZoomLevel(zoomLevel) {
	      var _this3 = this;

	      var render = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	      var isInitialZoom = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      this._zoomLevel = zoomLevel;
	      this._isInitialZoom = isInitialZoom;

	      if (render) {
	        this.setAllOperationsToDirty();
	        return this.render().then(function () {
	          _this3._updateCanvasMargins();
	          _this3._applyBoundaries();
	          _this3.emit('zoom'); // will be redirected to top controls
	        });
	      } else {
	          this._updateCanvasMargins();
	          this._applyBoundaries();
	          this.emit('zoom'); // will be redirected to top controls
	        }
	    }

	    /**
	     * Sets all operations to dirty
	     */
	  }, {
	    key: 'setAllOperationsToDirty',
	    value: function setAllOperationsToDirty() {
	      var operationsStack = this._kit.operationsStack;

	      for (var i = 0; i < operationsStack.length; i++) {
	        var operation = operationsStack[i];
	        if (!operation) continue;
	        operation.dirty = true;
	      }
	    }

	    /**
	     * Resets all operations
	     */
	  }, {
	    key: 'resetAllOperations',
	    value: function resetAllOperations() {
	      var operationsStack = this._kit.operationsStack;

	      for (var i = 0; i < operationsStack.length; i++) {
	        var operation = operationsStack[i];
	        if (!operation) continue;
	        operation.reset();
	      }
	    }

	    /**
	     * Gets the initial zoom level so that the image fits the maximum
	     * canvas size
	     * @private
	     */
	  }, {
	    key: '_getInitialZoomLevel',
	    value: function _getInitialZoomLevel() {
	      var nativeDimensions = this._renderer.getOutputDimensionsForStack(this.sanitizedStack);
	      var fitDimensions = _libUtils2['default'].resizeVectorToFit(nativeDimensions, this._maxSize);

	      return fitDimensions.divide(nativeDimensions).x;
	    }

	    /**
	     * Initializes the renderer
	     * @private
	     */
	  }, {
	    key: '_initRenderer',
	    value: function _initRenderer() {
	      var _this4 = this;

	      if (_renderersWebglRenderer2['default'].isSupported() && this._options.renderer !== 'canvas') {
	        this._renderer = new _renderersWebglRenderer2['default'](null, this._canvas, this._image);
	        this._webglEnabled = true;
	      } else if (_renderersCanvasRenderer2['default'].isSupported()) {
	        this._renderer = new _renderersCanvasRenderer2['default'](null, this._canvas, this._image);
	        this._webglEnabled = false;
	      }

	      if (this._renderer === null) {
	        throw new Error('Neither Canvas nor WebGL renderer are supported.');
	      }

	      this._renderer.on('new-canvas', function (canvas) {
	        _this4._setCanvas(canvas);
	      });
	      this._renderer.on('error', function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        _this4.emit.apply(_this4, ['error'].concat(args));
	      });
	      this._renderer.on('reset', function () {
	        _this4.resetAllOperations();
	        _this4._isFirstRender = true;
	        _this4.render();
	      });
	    }

	    /**
	     * Replaces the canvas with the given canvas, updates margins etc
	     * @param {DOMElement} canvas
	     * @private
	     */
	  }, {
	    key: '_setCanvas',
	    value: function _setCanvas(canvas) {
	      var canvasParent = this._canvas.parentNode;
	      canvasParent.removeChild(this._canvas);
	      this._canvas = canvas;
	      canvasParent.appendChild(this._canvas);

	      this._updateCanvasMargins();
	      this._applyBoundaries();
	      this._updateContainerSize();
	    }

	    /**
	     * Handles the dragging
	     * @private
	     */
	  }, {
	    key: '_handleDrag',
	    value: function _handleDrag() {
	      this._canvas.addEventListener('mousedown', this._dragOnMousedown);
	      this._canvas.addEventListener('touchstart', this._dragOnMousedown);
	    }

	    /**
	     * Gets called when the user started touching / clicking the canvas
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_dragOnMousedown',
	    value: function _dragOnMousedown(e) {
	      if (e.type === 'mousedown' && e.button !== 0) return;
	      e.preventDefault();

	      var canvasX = parseInt(this._canvasInnerContainer.style.left, 10);
	      var canvasY = parseInt(this._canvasInnerContainer.style.top, 10);

	      document.addEventListener('mousemove', this._dragOnMousemove);
	      document.addEventListener('touchmove', this._dragOnMousemove);

	      document.addEventListener('mouseup', this._dragOnMouseup);
	      document.addEventListener('touchend', this._dragOnMouseup);

	      // Remember initial position
	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialCanvasPosition = new _libMathVector22['default'](canvasX, canvasY);
	    }

	    /**
	     * Gets called when the user drags the canvas
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_dragOnMousemove',
	    value: function _dragOnMousemove(e) {
	      e.preventDefault();

	      var newMousePosition = _libUtils2['default'].getEventPosition(e);
	      var mouseDiff = newMousePosition.clone().subtract(this._initialMousePosition);
	      var newPosition = this._initialCanvasPosition.clone().add(mouseDiff);

	      this._canvasInnerContainer.style.left = newPosition.x + 'px';
	      this._canvasInnerContainer.style.top = newPosition.y + 'px';

	      this._applyBoundaries();
	    }

	    /**
	     * Makes sure the canvas positions are within the boundaries
	     * @private
	     */
	  }, {
	    key: '_applyBoundaries',
	    value: function _applyBoundaries() {
	      var x = parseInt(this._canvasInnerContainer.style.left, 10);
	      var y = parseInt(this._canvasInnerContainer.style.top, 10);
	      var canvasPosition = new _libMathVector22['default'](x, y);

	      // Boundaries
	      var boundaries = this._boundaries;
	      canvasPosition.x = Math.min(boundaries.max.x, Math.max(boundaries.min.x, canvasPosition.x));
	      canvasPosition.y = Math.min(boundaries.max.y, Math.max(boundaries.min.y, canvasPosition.y));

	      this._canvasInnerContainer.style.left = canvasPosition.x + 'px';
	      this._canvasInnerContainer.style.top = canvasPosition.y + 'px';
	    }

	    /**
	     * Gets called when the user stopped dragging the canvsa
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_dragOnMouseup',
	    value: function _dragOnMouseup(e) {
	      e.preventDefault();

	      document.removeEventListener('mousemove', this._dragOnMousemove);
	      document.removeEventListener('touchmove', this._dragOnMousemove);

	      document.removeEventListener('mouseup', this._dragOnMouseup);
	      document.removeEventListener('touchend', this._dragOnMouseup);
	    }

	    /**
	     * The position boundaries for the canvas inside the container
	     * @type {Object.<Vector2>}
	     * @private
	     */
	  }, {
	    key: '_updateStackDirtyStates',

	    /**
	     * Find the first dirty operation of the stack and sets all following
	     * operations to dirty
	     * @param {Array.<Operation>} stack
	     * @private
	     */
	    value: function _updateStackDirtyStates(stack) {
	      var dirtyFound = false;
	      for (var i = 0; i < stack.length; i++) {
	        var operation = stack[i];
	        if (!operation) continue;
	        if (operation.dirty) {
	          dirtyFound = true;
	        }

	        if (dirtyFound) {
	          operation.dirty = true;
	        }
	      }
	    }

	    /**
	     * Zooms the canvas so that it fits the container
	     * @param {Boolean} render
	     */
	  }, {
	    key: 'zoomToFit',
	    value: function zoomToFit() {
	      var render = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      var initialZoomLevel = this._getInitialZoomLevel();
	      return this.setZoomLevel(initialZoomLevel, render, true);
	    }

	    /**
	     * Resets the renderer
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this._renderer.reset(true);
	      this._kit.operationsStack = [];
	      this._isFirstRender = true;
	    }

	    /**
	     * Returns the operations stack without falsy values
	     * @type {Array.<Operation>}
	     */
	  }, {
	    key: '_boundaries',
	    get: function get() {
	      var canvasSize = new _libMathVector22['default'](this._canvas.width, this._canvas.height);
	      var maxSize = this._maxSize;

	      var diff = canvasSize.clone().subtract(maxSize).multiply(-1);

	      var boundaries = {
	        min: new _libMathVector22['default'](diff.x, diff.y),
	        max: new _libMathVector22['default'](0, 0)
	      };

	      if (canvasSize.x < maxSize.x) {
	        boundaries.min.x = diff.x / 2;
	        boundaries.max.x = diff.x / 2;
	      }

	      if (canvasSize.y < maxSize.y) {
	        boundaries.min.y = diff.y / 2;
	        boundaries.max.y = diff.y / 2;
	      }

	      var halfCanvasSize = canvasSize.clone().divide(2);
	      boundaries.min.add(halfCanvasSize);
	      boundaries.max.add(halfCanvasSize);
	      return boundaries;
	    }

	    /**
	     * The maximum canvas size
	     * @private
	     */
	  }, {
	    key: '_maxSize',
	    get: function get() {
	      return new _libMathVector22['default'](this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
	    }
	  }, {
	    key: 'sanitizedStack',
	    get: function get() {
	      var sanitizedStack = [];
	      for (var i = 0; i < this._kit.operationsStack.length; i++) {
	        var operation = this._kit.operationsStack[i];
	        if (!operation) continue;
	        sanitizedStack.push(operation);
	      }
	      return sanitizedStack;
	    }

	    /**
	     * The current zoom level
	     * @type {Number}
	     */
	  }, {
	    key: 'zoomLevel',
	    get: function get() {
	      return this._zoomLevel;
	    }

	    /**
	     * The canvas size in pixels
	     * @type {Vector2}
	     */
	  }, {
	    key: 'size',
	    get: function get() {
	      return this._size;
	    }
	  }]);

	  return Canvas;
	})(_libEventEmitter2['default']);

	exports['default'] = Canvas;
	module.exports = exports['default'];

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var FileLoader = (function (_EventEmitter) {
	  _inherits(FileLoader, _EventEmitter);

	  function FileLoader(kit, ui) {
	    _classCallCheck(this, FileLoader);

	    _get(Object.getPrototypeOf(FileLoader.prototype), 'constructor', this).call(this);

	    this._kit = kit;
	    this._ui = ui;

	    // http://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
	    this._dragCounter = 0;

	    this._container = this._ui.container.querySelector('.imglykit-splash-container');

	    this._onDropAreaDragEnter = this._onDropAreaDragEnter.bind(this);
	    this._onDropAreaDragOver = this._onDropAreaDragOver.bind(this);
	    this._onDropAreaDragLeave = this._onDropAreaDragLeave.bind(this);
	    this._onDropAreaDrop = this._onDropAreaDrop.bind(this);
	    this._onDropAreaClick = this._onDropAreaClick.bind(this);
	    this._onFileInputChange = this._onFileInputChange.bind(this);

	    this._hiddenInputField = this._ui.container.querySelector('.imglykit-upload-hidden-input');
	    this._hiddenInputField.addEventListener('change', this._onFileInputChange);

	    this._handleDropArea();
	    if (this._ui.options.image) {
	      this.removeDOM();
	    }
	  }

	  /**
	   * Opens the file dialog
	   */

	  _createClass(FileLoader, [{
	    key: 'openFileDialog',
	    value: function openFileDialog() {
	      this._hiddenInputField.click();
	    }

	    /**
	     * Finds the drop area, adds event listeners
	     * @private
	     */
	  }, {
	    key: '_handleDropArea',
	    value: function _handleDropArea() {
	      this._dropArea = this._container.querySelector('.imglykit-splash-row--upload');
	      this._dropArea.addEventListener('dragenter', this._onDropAreaDragEnter);
	      this._dropArea.addEventListener('dragover', this._onDropAreaDragOver);
	      this._dropArea.addEventListener('dragleave', this._onDropAreaDragLeave);
	      this._dropArea.addEventListener('drop', this._onDropAreaDrop);
	      this._dropArea.addEventListener('dragdrop', this._onDropAreaDrop);
	      this._dropArea.addEventListener('click', this._onDropAreaClick);
	    }

	    /**
	     * Gets called when the user clicks on the drop area. Opens the file
	     * dialog by triggering a click on the hidden input field
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onDropAreaClick',
	    value: function _onDropAreaClick(e) {
	      e.stopPropagation();
	      this.openFileDialog();
	    }

	    /**
	     * Gets called when the user drags a file over the drop area
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onDropAreaDragEnter',
	    value: function _onDropAreaDragEnter(e) {
	      e.preventDefault();

	      this._dragCounter++;
	      _libUtils2['default'].classList(this._dropArea).add('imglykit-splash-active');
	    }

	    /**
	     * We need to cancel this event to get a drop event
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onDropAreaDragOver',
	    value: function _onDropAreaDragOver(e) {
	      e.preventDefault();
	    }

	    /**
	     * Gets called when the user does no longer drag a file over the drop area
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onDropAreaDragLeave',
	    value: function _onDropAreaDragLeave(e) {
	      e.preventDefault();

	      this._dragCounter--;

	      if (this._dragCounter === 0) {
	        _libUtils2['default'].classList(this._dropArea).remove('imglykit-splash-active');
	      }
	    }

	    /**
	     * Gets called when the user drops a file on the drop area
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onDropAreaDrop',
	    value: function _onDropAreaDrop(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      e.returnValue = false;

	      _libUtils2['default'].classList(this._dropArea).remove('imglykit-splash-active');

	      if (!e.dataTransfer) return;

	      this._ui.displayLoadingMessage(this._ui.translate('generic.importing') + '...');

	      this._handleFile(e.dataTransfer.files[0]);
	    }

	    /**
	     * Gets called when the user selected a file
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onFileInputChange',
	    value: function _onFileInputChange() {
	      this._handleFile(this._hiddenInputField.files[0]);
	    }

	    /**
	     * Gets called when the user selected a file. Emits a `file` event.
	     * @param {File} file
	     * @private
	     */
	  }, {
	    key: '_handleFile',
	    value: function _handleFile(file) {
	      this.emit('file', file);
	    }

	    /**
	     * Removes event listeners and removes the container form the dom
	     */
	  }, {
	    key: 'removeDOM',
	    value: function removeDOM() {
	      this._dropArea.removeEventListener('dragenter', this._onDropAreaDragEnter);
	      this._dropArea.removeEventListener('dragover', this._onDropAreaDragOver);
	      this._dropArea.removeEventListener('dragleave', this._onDropAreaDragLeave);
	      this._dropArea.removeEventListener('drop', this._onDropAreaDrop);
	      this._dropArea.removeEventListener('dragdrop', this._onDropAreaDrop);
	      this._dropArea.removeEventListener('click', this._onDropAreaClick);

	      if (this._container) {
	        this._container.style.display = 'none';
	      }
	    }
	  }]);

	  return FileLoader;
	})(_libEventEmitter2['default']);

	exports['default'] = FileLoader;
	module.exports = exports['default'];

/***/ },
/* 87 */
/***/ function(module, exports) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  resize: function resize(image, dimensions) {
	    var newCanvas = document.createElement('canvas');
	    newCanvas.width = dimensions.x;
	    newCanvas.height = dimensions.y;

	    var context = newCanvas.getContext('2d');
	    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, dimensions.x, dimensions.y);

	    return newCanvas;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* global Image */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var WebcamHandler = (function (_EventEmitter) {
	  _inherits(WebcamHandler, _EventEmitter);

	  function WebcamHandler(kit, ui) {
	    _classCallCheck(this, WebcamHandler);

	    _get(Object.getPrototypeOf(WebcamHandler.prototype), 'constructor', this).call(this);
	    this._kit = kit;
	    this._ui = ui;

	    var container = this._ui.container;

	    this._canvasContainer = container.querySelector('.imglykit-canvas-container');

	    this._video = container.querySelector('.imglykit-webcam-video');
	    this._webcamButton = container.querySelector('.imglykit-webcam-button');
	    this._webcamButton.addEventListener('click', this._onWebcamButtonClick.bind(this));
	    this._initVideoStream();
	  }

	  /**
	   * Gets called when the user clicked the shutter button. Draws the current
	   * video frame to a canvas, creates an image from it and emits the `image`
	   * event
	   * @param  {Event} e
	   * @private
	   */

	  _createClass(WebcamHandler, [{
	    key: '_onWebcamButtonClick',
	    value: function _onWebcamButtonClick(e) {
	      var _this = this;

	      e.preventDefault();
	      var canvas = document.createElement('canvas');
	      canvas.width = this._video.videoWidth;
	      canvas.height = this._video.videoHeight;
	      var context = canvas.getContext('2d');
	      context.drawImage(this._video, 0, 0);

	      this._stream.stop();
	      this._video.pause();

	      delete this._stream;
	      delete this._video;

	      var image = new Image();
	      image.addEventListener('load', function () {
	        _this.emit('image', image);
	      });
	      image.src = canvas.toDataURL('image/png');
	    }

	    /**
	     * Initializes the video stream
	     * @private
	     */
	  }, {
	    key: '_initVideoStream',
	    value: function _initVideoStream() {
	      var _this2 = this;

	      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	      if (!getUserMedia) {
	        throw new Error('Webcam feature not supported! :(');
	      }

	      getUserMedia.call(navigator, { video: true }, function (stream) {
	        _this2._stream = stream;
	        _this2._video.onloadedmetadata = _this2._onVideoReady.bind(_this2);
	        _this2._video.src = window.URL.createObjectURL(stream);
	      }, function (err) {
	        throw err;
	      });
	    }
	  }, {
	    key: '_onVideoReady',
	    value: function _onVideoReady() {
	      this._resizeVideo();
	    }
	  }, {
	    key: '_resizeVideo',
	    value: function _resizeVideo() {
	      var _video = this._video;
	      var videoWidth = _video.videoWidth;
	      var videoHeight = _video.videoHeight;

	      var size = new _libMathVector22['default'](videoWidth, videoHeight);
	      var maxSize = new _libMathVector22['default'](this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);

	      var finalSize = _libUtils2['default'].resizeVectorToFit(size, maxSize);
	      this._video.style.width = finalSize.x + 'px';
	      this._video.style.height = finalSize.y + 'px';

	      var diff = maxSize.clone().subtract(finalSize).divide(2);

	      this._video.style.marginLeft = diff.x + 'px';
	      this._video.style.marginTop = diff.y + 'px';
	    }
	  }, {
	    key: 'getUserMedia',
	    get: function get() {
	      return;
	    }
	  }]);

	  return WebcamHandler;
	})(_libEventEmitter2['default']);

	exports['default'] = WebcamHandler;
	module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var TopControls = (function (_EventEmitter) {
	  _inherits(TopControls, _EventEmitter);

	  function TopControls(kit, ui) {
	    _classCallCheck(this, TopControls);

	    _get(Object.getPrototypeOf(TopControls.prototype), 'constructor', this).call(this);

	    this._kit = kit;
	    this._ui = ui;
	    this.init();
	  }

	  /**
	   * Initializes the controls
	   */

	  _createClass(TopControls, [{
	    key: 'init',
	    value: function init() {
	      this._canvas = this._ui.canvas;
	    }

	    /**
	     * Initializes the controls
	     */
	  }, {
	    key: 'run',
	    value: function run() {
	      var container = this._ui.container;

	      this._rightControls = container.querySelector('.imglykit-top-controls-right');
	      this._leftControls = container.querySelector('.imglykit-top-controls-left');

	      this._undoButton = container.querySelector('.imglykit-undo');
	      this._zoomIn = container.querySelector('.imglykit-zoom-in');
	      this._zoomOut = container.querySelector('.imglykit-zoom-out');
	      this._zoomLevel = container.querySelector('.imglykit-zoom-level-num');
	      this._newButton = container.querySelector('.imglykit-new');
	      this._exportButton = container.querySelector('.imglykit-export');
	      this._handleZoom();
	      this._handleUndo();
	      this._handleNew();
	      this._handleExport();
	    }

	    /**
	     * Handles the zoom controls
	     * @private
	     */
	  }, {
	    key: '_handleZoom',
	    value: function _handleZoom() {
	      this._zoomIn.addEventListener('click', this._onZoomInClick.bind(this));
	      this._zoomOut.addEventListener('click', this._onZoomOutClick.bind(this));
	    }

	    /**
	     * Handles the undo control
	     * @private
	     */
	  }, {
	    key: '_handleUndo',
	    value: function _handleUndo() {
	      this._undoButton.addEventListener('click', this._undo.bind(this));
	      this._undo();
	    }

	    /**
	     * Handles the new button
	     * @private
	     */
	  }, {
	    key: '_handleNew',
	    value: function _handleNew() {
	      if (!this._newButton) return;

	      this._newButton.addEventListener('click', this._onNewClick.bind(this));
	    }

	    /**
	     * Handles the export button
	     * @private
	     */
	  }, {
	    key: '_handleExport',
	    value: function _handleExport() {
	      if (!this._exportButton) return;

	      this._exportButton.addEventListener('click', this._onExportClick.bind(this));
	    }

	    /**
	     * Gets called when the user clicks the new button
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onNewClick',
	    value: function _onNewClick(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      this.emit('new');
	    }

	    /**
	     * Gets called when the user clicks the export button
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onExportClick',
	    value: function _onExportClick(e) {
	      e.preventDefault();
	      e.stopPropagation();

	      this.emit('export');
	    }

	    /**
	     * Gets called when the user clicks the undo button
	     * @private
	     */
	  }, {
	    key: '_undo',
	    value: function _undo() {
	      this.emit('undo');
	    }

	    /**
	     * Updates the undo button visible state
	     */
	  }, {
	    key: 'updateUndoButton',
	    value: function updateUndoButton() {
	      var history = this._ui.history;

	      if (history.length === 0) {
	        this._undoButton.style.display = 'none';
	      } else {
	        this._undoButton.style.display = 'inline-block';
	      }
	    }

	    /**
	     * Updates the export button visible state
	     */
	  }, {
	    key: 'updateExportButton',
	    value: function updateExportButton() {
	      if (!this._exportButton) return;

	      var image = this._ui.image;

	      if (image) {
	        this._exportButton.style.display = 'inline-block';
	      } else {
	        this._exportButton.style.display = 'none';
	      }
	    }

	    /**
	     * Gets called when the user clicked the zoom in button
	     * @param {Event}
	     * @private
	     */
	  }, {
	    key: '_onZoomInClick',
	    value: function _onZoomInClick(e) {
	      e.preventDefault();
	      e.stopPropagation();

	      this.emit('zoom-in');
	      this.updateZoomLevel();
	    }

	    /**
	     * Gets called when the user clicked the zoom out button
	     * @param {Event}
	     * @private
	     */
	  }, {
	    key: '_onZoomOutClick',
	    value: function _onZoomOutClick(e) {
	      e.preventDefault();
	      e.stopPropagation();

	      this.emit('zoom-out');
	      this.updateZoomLevel();
	    }

	    /**
	     * Shows the zoom control
	     */
	  }, {
	    key: 'showZoom',
	    value: function showZoom() {
	      this._rightControls.style.display = 'inline-block';
	    }

	    /**
	     * Hides the zoom control
	     */
	  }, {
	    key: 'hideZoom',
	    value: function hideZoom() {
	      this._rightControls.style.display = 'none';
	    }

	    /**
	     * Updates the zoom level display
	     */
	  }, {
	    key: 'updateZoomLevel',
	    value: function updateZoomLevel() {
	      var zoomLevel = this._canvas.zoomLevel;

	      this._zoomLevel.innerHTML = Math.round(zoomLevel * 100);
	    }
	  }]);

	  return TopControls;
	})(_libEventEmitter2['default']);

	exports['default'] = TopControls;
	module.exports = exports['default'];

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var maxScrollbarWidth = 18;

	/**
	 * Our custom scroll bar
	 */

	var Scrollbar = (function () {
	  /**
	   * @param {DOMElement} container
	   */

	  function Scrollbar(container) {
	    _classCallCheck(this, Scrollbar);

	    this._container = container;
	    this._isDragging = false;
	    this._isHovering = false;

	    if (!this._browserSupported()) {
	      return;
	    }

	    this._appendDOM();
	    this._resizeButton();
	    this._updateValues();

	    this._onButtonDown = this._onButtonDown.bind(this);
	    this._onButtonMove = this._onButtonMove.bind(this);
	    this._onButtonUp = this._onButtonUp.bind(this);

	    this._onContainerEnter = this._onContainerEnter.bind(this);
	    this._onContainerLeave = this._onContainerLeave.bind(this);

	    this._onBackgroundClick = this._onBackgroundClick.bind(this);

	    this._container.addEventListener('mouseenter', this._onContainerEnter);
	    this._container.addEventListener('mouseleave', this._onContainerLeave);
	    this._container.addEventListener('mousemove', this._onContainerEnter);
	    this._dom.button.addEventListener('mousedown', this._onButtonDown);
	    this._dom.button.addEventListener('touchstart', this._onButtonDown);
	    this._dom.background.addEventListener('click', this._onBackgroundClick);
	    this._list.addEventListener('scroll', this._onListScroll.bind(this));

	    this._onListScroll();
	  }

	  /**
	   * Checks whether this feature is supported in the current browser
	   * @return {Boolean}
	   * @private
	   */

	  _createClass(Scrollbar, [{
	    key: '_browserSupported',
	    value: function _browserSupported() {
	      var IEMatch = navigator.appVersion.match(/MSIE ([\d.]+)/);
	      if (IEMatch && parseFloat(IEMatch[1]) <= 9) {
	        return false;
	      }
	      return true;
	    }

	    /**
	     * Gets called when the user clicks the scrollbar background
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onBackgroundClick',
	    value: function _onBackgroundClick(e) {
	      e.preventDefault();
	      if (e.target !== this._dom.background) return;

	      var position = _libUtils2['default'].getEventPosition(e);
	      var backgroundOffset = this._dom.background.getBoundingClientRect();
	      backgroundOffset = new _libMathVector22['default'](backgroundOffset.left, backgroundOffset.top);

	      var relativePosition = position.clone().subtract(backgroundOffset);

	      relativePosition.x -= this._values.button.width * 0.5;

	      this._setButtonPosition(relativePosition.x);
	    }

	    /**
	     * Gets called when the user enters the list with the mouse
	     * @private
	     */
	  }, {
	    key: '_onContainerEnter',
	    value: function _onContainerEnter() {
	      this._isHovering = true;
	      this.show();
	    }

	    /**
	     * Gets called when the user leaves the list with the mouse
	     * @private
	     */
	  }, {
	    key: '_onContainerLeave',
	    value: function _onContainerLeave() {
	      this._isHovering = false;
	      this.hide();
	    }

	    /**
	     * Shows the scrollbar
	     */
	  }, {
	    key: 'show',
	    value: function show() {
	      if (!this._browserSupported()) return;
	      if (!this._isScrollingNecessary) return;
	      _libUtils2['default'].classList(this._dom.background).add('visible');
	    }

	    /**
	     * Hides the scrollbar
	     */
	  }, {
	    key: 'hide',
	    value: function hide() {
	      if (!this._browserSupported()) return;
	      if (this._isDragging) return;
	      _libUtils2['default'].classList(this._dom.background).remove('visible');
	    }

	    /**
	     * Updates the size values
	     * @private
	     */
	  }, {
	    key: '_updateValues',
	    value: function _updateValues() {
	      this._values = {
	        list: {
	          totalWidth: this._list.scrollWidth,
	          visibleWidth: this._list.offsetWidth,
	          scrollableWidth: this._list.scrollWidth - this._list.offsetWidth
	        },
	        button: {
	          width: this._dom.button.offsetWidth,
	          scrollableWidth: this._dom.background.offsetWidth - this._dom.button.offsetWidth
	        }
	      };
	    }

	    /**
	     * Gets called when the user starts dragging the button
	     * @param {Event} event
	     * @private
	     */
	  }, {
	    key: '_onButtonDown',
	    value: function _onButtonDown(event) {
	      event.preventDefault();

	      this._isDragging = true;

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(event);
	      this._initialButtonPosition = this._buttonPosition || 0;

	      document.addEventListener('mousemove', this._onButtonMove);
	      document.addEventListener('touchmove', this._onButtonMove);
	      document.addEventListener('mouseup', this._onButtonUp);
	      document.addEventListener('touchend', this._onButtonUp);
	    }

	    /**
	     * Gets called when the user drags the button
	     * @param {Event} event
	     * @private
	     */
	  }, {
	    key: '_onButtonMove',
	    value: function _onButtonMove(event) {
	      event.preventDefault();

	      var mousePosition = _libUtils2['default'].getEventPosition(event);
	      var diff = mousePosition.clone().subtract(this._initialMousePosition);
	      var newButtonPosition = this._initialButtonPosition + diff.x;

	      this._setButtonPosition(newButtonPosition);
	    }

	    /**
	     * Sets the button position to the given value
	     * @param {Number} newButtonPosition
	     * @private
	     */
	  }, {
	    key: '_setButtonPosition',
	    value: function _setButtonPosition(newButtonPosition) {
	      // Clamp button position
	      newButtonPosition = Math.max(0, newButtonPosition);
	      newButtonPosition = Math.min(newButtonPosition, this._values.button.scrollableWidth);

	      // Set button position
	      this._buttonPosition = newButtonPosition;
	      this._dom.button.style.left = this._buttonPosition + 'px';

	      // Update list scroll position
	      var progress = newButtonPosition / this._values.button.scrollableWidth;
	      var scrollPosition = this._values.list.scrollableWidth * progress;
	      this._list.scrollLeft = scrollPosition;
	    }

	    /**
	     * Gets called when the user releases the button
	     * @private
	     */
	  }, {
	    key: '_onButtonUp',
	    value: function _onButtonUp() {
	      this._isDragging = false;

	      document.removeEventListener('mousemove', this._onButtonMove);
	      document.removeEventListener('touchmove', this._onButtonMove);
	      document.removeEventListener('mouseup', this._onButtonUp);
	      document.removeEventListener('touchend', this._onButtonUp);
	    }

	    /**
	     * Gets called when the user scrolls the list
	     * @private
	     */
	  }, {
	    key: '_onListScroll',
	    value: function _onListScroll() {
	      if (this._isDragging) return;

	      var listScrollWidth = this._list.scrollWidth - this._list.offsetWidth;
	      var listScrollPosition = this._list.scrollLeft;

	      var backgroundScrollWidth = this._dom.background.offsetWidth - this._dom.button.offsetWidth;
	      var progress = listScrollPosition / listScrollWidth;

	      this._buttonPosition = backgroundScrollWidth * progress;
	      this._dom.button.style.left = this._buttonPosition + 'px';
	    }

	    /**
	     * Resizes the button to represent the visible size of the container
	     * @private
	     */
	  }, {
	    key: '_resizeButton',
	    value: function _resizeButton() {
	      var listScrollWidth = this._list.scrollWidth;
	      var listWidth = this._list.offsetWidth;

	      this._buttonWidth = listWidth / listScrollWidth * listWidth;
	      this._dom.button.style.width = this._buttonWidth + 'px';
	    }

	    /**
	     * Appends the DOM elements to the container
	     * @private
	     */
	  }, {
	    key: '_appendDOM',
	    value: function _appendDOM() {
	      var background = document.createElement('div');
	      _libUtils2['default'].classList(background).add('imglykit-scrollbar-background');
	      background.style.bottom = maxScrollbarWidth + 'px';

	      var button = document.createElement('div');
	      _libUtils2['default'].classList(button).add('imglykit-scrollbar-button');

	      background.appendChild(button);
	      this._container.appendChild(background);

	      // Container should have position: relative
	      this._container.style.position = 'relative';

	      // Find the list
	      this._list = this._container.querySelector('.imglykit-controls-list');
	      this._dom = { background: background, button: button };

	      // Resize the list and the container
	      this._list.style.height = '';
	      var listHeight = this._list.offsetHeight;
	      listHeight += maxScrollbarWidth;
	      this._container.style.height = listHeight + 'px';
	      this._list.style.height = listHeight + 'px';
	    }

	    /**
	     * Removes the DOM elements and event listeners
	     */
	  }, {
	    key: 'remove',
	    value: function remove() {
	      if (!this._browserSupported()) return;

	      this._dom.button.removeEventListener('mousedown', this._onButtonDown);
	      this._dom.button.removeEventListener('touchstart', this._onButtonDown);

	      this._dom.background.parentNode.removeChild(this._dom.background);
	    }

	    /**
	     * Checks whether scrolling is necessary
	     * @returns {Boolean}
	     * @private
	     */
	  }, {
	    key: '_isScrollingNecessary',
	    get: function get() {
	      return this._list.scrollWidth > this._list.offsetWidth;
	    }
	  }]);

	  return Scrollbar;
	})();

	exports['default'] = Scrollbar;
	module.exports = exports['default'];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var FiltersControl = (function (_Control) {
	  _inherits(FiltersControl, _Control);

	  function FiltersControl() {
	    _classCallCheck(this, FiltersControl);

	    _get(Object.getPrototypeOf(FiltersControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(FiltersControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-controls-list-container"> <ul class="imglykit-controls-list imgly-controls-list-with-buttons"> '; for(var identifier in it.filters) { out+=' '; var filter = it.filters[identifier]; out+=' '; var name = filter.prototype.name; out+=' '; var enabled = it.activeFilter.identifier === identifier; out+=' <li data-identifier="'+( identifier)+'" class="imglykit-controls-item-with-label';if(enabled){out+=' imglykit-controls-item-active';}out+='"> <img src="'+(it.helpers.assetPath('ui/night/filters/' + identifier + '.png'))+'" /> <div class="imglykit-controls-item-label">'+( name )+'</div> </li> '; } out+=' </ul></div>';return out;
	};
	      this._controlsTemplate = controlsTemplate;

	      this._availableFilters = {};
	      this._filters = {};

	      this._addDefaultFilters();

	      // Select all filters per default
	      this.selectFilters(null);
	    }

	    /**
	     * Renders the controls
	     * @private
	     * @internal We need to access information from the operation when
	     *           rendering, which is why we have to override this function
	     */
	  }, {
	    key: '_renderAllControls',
	    value: function _renderAllControls() {
	      this._operationExistedBefore = !!this._ui.operations.filters;
	      this._operation = this._ui.getOrCreateOperation('filters');

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _get(Object.getPrototypeOf(FiltersControl.prototype), '_renderAllControls', this).apply(this, args);
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      this._historyItem = null;
	      this._initialFilter = this._operation.getFilter();
	      this._defaultFilter = this._operation.availableOptions.filter['default'];

	      var listItems = this._controls.querySelectorAll('li');
	      this._listItems = Array.prototype.slice.call(listItems);

	      // Listen to click events

	      var _loop = function (i) {
	        var listItem = _this._listItems[i];
	        listItem.addEventListener('click', function () {
	          _this._onListItemClick(listItem);
	        });
	      };

	      for (var i = 0; i < this._listItems.length; i++) {
	        _loop(i);
	      }
	    }

	    /**
	     * Gets called when the user hits the back button
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      var currentFilter = this._operation.getFilter();
	      if (currentFilter === this._defaultFilter) {
	        this._ui.removeOperation('filters');
	      }
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the user clicked a list item
	     * @private
	     */
	  }, {
	    key: '_onListItemClick',
	    value: function _onListItemClick(item) {
	      this._deactivateAllItems();

	      var identifier = item.getAttribute('data-identifier');
	      this._operation.setFilter(this._filters[identifier]);
	      this._ui.canvas.render();

	      _libUtils2['default'].classList(item).add('imglykit-controls-item-active');

	      var currentFilter = this._operation.getFilter();
	      if (currentFilter !== this._initialFilter && !this._historyItem) {
	        this._historyItem = this._ui.addHistory(this._operation, {
	          filter: this._initialFilter
	        }, this._operationExistedBefore);
	      }
	    }

	    /**
	     * Deactivates all list items
	     * @private
	     */
	  }, {
	    key: '_deactivateAllItems',
	    value: function _deactivateAllItems() {
	      for (var i = 0; i < this._listItems.length; i++) {
	        var listItem = this._listItems[i];
	        _libUtils2['default'].classList(listItem).remove('imglykit-controls-item-active');
	      }
	    }

	    /**
	     * Registers all the known filters
	     * @private
	     */
	  }, {
	    key: '_addDefaultFilters',
	    value: function _addDefaultFilters() {
	      this.addFilter(__webpack_require__(42));
	      this.addFilter(__webpack_require__(66));
	      this.addFilter(__webpack_require__(67));
	      this.addFilter(__webpack_require__(68));
	      this.addFilter(__webpack_require__(69));
	      this.addFilter(__webpack_require__(62));
	      this.addFilter(__webpack_require__(55));
	      this.addFilter(__webpack_require__(74));
	      this.addFilter(__webpack_require__(59));
	      this.addFilter(__webpack_require__(63));
	      this.addFilter(__webpack_require__(60));
	      this.addFilter(__webpack_require__(81));
	      this.addFilter(__webpack_require__(56));
	      this.addFilter(__webpack_require__(57));
	      this.addFilter(__webpack_require__(70));
	      this.addFilter(__webpack_require__(77));
	      this.addFilter(__webpack_require__(76));
	      this.addFilter(__webpack_require__(75));
	      this.addFilter(__webpack_require__(61));
	      this.addFilter(__webpack_require__(64));
	      this.addFilter(__webpack_require__(58));
	      this.addFilter(__webpack_require__(80));
	      this.addFilter(__webpack_require__(73));
	      this.addFilter(__webpack_require__(71));
	      this.addFilter(__webpack_require__(65));
	      this.addFilter(__webpack_require__(72));
	      this.addFilter(__webpack_require__(79));
	      this.addFilter(__webpack_require__(54));
	      this.addFilter(__webpack_require__(78));
	    }

	    /**
	     * Registers the given filter
	     * @param  {class} filter
	     * @private
	     */
	  }, {
	    key: 'addFilter',
	    value: function addFilter(filter) {
	      this._availableFilters[filter.identifier] = filter;
	    }

	    /**
	     * Selects the filters
	     * @param {Selector} selector
	     */
	  }, {
	    key: 'selectFilters',
	    value: function selectFilters(selector) {
	      this._filters = {};

	      var filterIdentifiers = Object.keys(this._availableFilters);

	      var selectedFilters = _libUtils2['default'].select(filterIdentifiers, selector);
	      for (var i = 0; i < selectedFilters.length; i++) {
	        var identifier = selectedFilters[i];
	        this._filters[identifier] = this._availableFilters[identifier];
	      }

	      if (this._active) {
	        this._renderControls();
	      }
	    }

	    /**
	     * The data that is available to the template
	     * @type {Object}
	     * @override
	     */
	  }, {
	    key: 'context',
	    get: function get() {
	      return {
	        filters: this._filters,
	        activeFilter: this._operation.getFilter()
	      };
	    }
	  }]);

	  return FiltersControl;
	})(_control2['default']);

	FiltersControl.prototype.identifier = 'filters';

	exports['default'] = FiltersControl;
	module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseHelpers = __webpack_require__(84);

	var _baseHelpers2 = _interopRequireDefault(_baseHelpers);

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libScrollbar = __webpack_require__(90);

	var _libScrollbar2 = _interopRequireDefault(_libScrollbar);

	/**
	 * To create an {@link ImglyKit.NightUI.Control} class of your own, call
	 * this method and provide instance properties and functions.
	 * @function
	 */

	var _libExtend = __webpack_require__(24);

	var _libExtend2 = _interopRequireDefault(_libExtend);

	var Control = (function (_EventEmitter) {
	  _inherits(Control, _EventEmitter);

	  function Control(kit, ui, operation) {
	    _classCallCheck(this, Control);

	    _get(Object.getPrototypeOf(Control.prototype), 'constructor', this).call(this);

	    this._kit = kit;
	    this._ui = ui;
	    this._operation = operation;
	    this._helpers = new _baseHelpers2['default'](this._kit, this._ui, this._ui.options);
	    this._partialTemplates = {
	      doneButton: function(it
	/**/) {
	var out='<div class="imglykit-controls-button imglykit-controls-done"> <img src="'+(it.helpers.assetPath('ui/night/buttons/done.png') )+'" /> <div class="imglykit-controls-done-highlighted"> <img src="'+(it.helpers.assetPath('ui/night/buttons/done-highlighted.png') )+'" /> </div></div>';return out;
	}
	    };

	    this._template = function(it
	/**/) {
	var out='<div class="imglykit-controls-'+(it.identifier)+'"> <div class="imglykit-controls-button imglykit-controls-back"> <img src="'+(it.helpers.assetPath('ui/night/buttons/back.png') )+'" /> </div> '+(it.partials.control)+'</div>';return out;
	};
	    this._active = false;
	    this._historyItem = null;

	    this.init();
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  /**
	   * Sets the containers that the control will be rendered to
	   * @param {DOMElement} controlsContainer
	   * @param {DOMElement} canvasControlsContainer
	   */

	  _createClass(Control, [{
	    key: 'setContainers',
	    value: function setContainers(controlsContainer, canvasControlsContainer) {
	      this._controlsContainer = controlsContainer;
	      this._canvasControlsContainer = canvasControlsContainer;
	    }

	    /**
	     * The entry point for this control
	     */
	  }, {
	    key: 'init',
	    value: function init() {}

	    /**
	     * Resets the control to display the current values
	     */
	  }, {
	    key: 'update',
	    value: function update() {
	      this._renderAllControls();
	      this._onEnter();
	    }

	    /**
	     * Updates the control to represent the initial values
	     * @private
	     */
	  }, {
	    key: '_setInitialValues',
	    value: function _setInitialValues() {}

	    /**
	     * Renders the controls
	     * @private
	     */
	  }, {
	    key: '_renderAllControls',
	    value: function _renderAllControls() {
	      this._renderControls();
	      this._renderCanvasControls();
	      this._initScrollbar();

	      this._handleBackAndDoneButtons();
	      this._enableCanvasControls();
	    }

	    /**
	     * Renders the controls
	     * @private
	     */
	  }, {
	    key: '_renderControls',
	    value: function _renderControls() {
	      if (typeof this._controlsTemplate === 'undefined') {
	        throw new Error('Control#_renderOverviewControls: Control needs to define this._controlsTemplate.');
	      }

	      // Render the template
	      var html = this._template(this._context);

	      if (typeof this._controls !== 'undefined' && this._controls.parentNode !== null) {
	        this._controls.parentNode.removeChild(this._controls);
	      }

	      // Create a wrapper
	      this._controls = document.createElement('div');
	      this._controls.innerHTML = html;

	      // Append to DOM
	      this._controlsContainer.appendChild(this._controls);
	    }

	    /**
	     * Renders the canvas controls
	     * @private
	     */
	  }, {
	    key: '_renderCanvasControls',
	    value: function _renderCanvasControls() {
	      if (typeof this._canvasControlsTemplate === 'undefined') {
	        return; // Canvas controls are optional
	      }

	      // Render the template
	      var html = this._canvasControlsTemplate(this._context);

	      if (typeof this._canvasControls !== 'undefined' && this._canvasControls.parentNode !== null) {
	        this._canvasControls.parentNode.removeChild(this._canvasControls);
	      }

	      // Create a wrapper
	      this._canvasControls = document.createElement('div');
	      this._canvasControls.innerHTML = html;

	      // Append to DOM
	      this._canvasControlsContainer.appendChild(this._canvasControls);
	    }

	    /**
	     * Initializes the custom scrollbar
	     * @private
	     */
	  }, {
	    key: '_initScrollbar',
	    value: function _initScrollbar() {
	      var list = this._controls.querySelector('.imglykit-controls-list');
	      if (list) {
	        this._scrollbar = new _libScrollbar2['default'](list.parentNode);
	      }
	    }

	    /**
	     * Removes the controls from the DOM
	     * @private
	     */
	  }, {
	    key: '_removeControls',
	    value: function _removeControls() {
	      this._controls.parentNode.removeChild(this._controls);
	      if (this._canvasControls) {
	        this._canvasControls.parentNode.removeChild(this._canvasControls);
	      }

	      if (this._scrollbar) this._scrollbar.remove();
	    }

	    /**
	     * Handles the back and done buttons
	     * @private
	     */
	  }, {
	    key: '_handleBackAndDoneButtons',
	    value: function _handleBackAndDoneButtons() {
	      // Back button
	      this._backButton = this._controls.querySelector('.imglykit-controls-back');
	      if (this._backButton) {
	        this._backButton.addEventListener('click', this._onBackButtonClick.bind(this));
	      }

	      // Done button
	      this._doneButton = this._controls.querySelector('.imglykit-controls-done');
	      if (this._doneButton) {
	        this._doneButton.addEventListener('click', this._onDoneButtonClick.bind(this));
	      }
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @private
	     */
	  }, {
	    key: '_onBackButtonClick',
	    value: function _onBackButtonClick() {
	      this._onBack();
	      this.emit('back');
	    }

	    /**
	     * Gets called when the done button has been clicked
	     * @private
	     */
	  }, {
	    key: '_onDoneButtonClick',
	    value: function _onDoneButtonClick() {
	      this._onDone();
	      this.emit('back');
	    }

	    /**
	     * Highlights the done button
	     * @private
	     */
	  }, {
	    key: '_highlightDoneButton',
	    value: function _highlightDoneButton() {
	      if (!this._doneButton) return;
	      _libUtils2['default'].classList(this._doneButton).add('highlighted');
	    }

	    /**
	     * Gets called when this control is activated
	     * @internal Used by the SDK, don't override.
	     */
	  }, {
	    key: 'enter',
	    value: function enter() {
	      this._active = true;

	      if (typeof this._canvasControlsTemplate !== 'undefined') {
	        this._ui.hideZoom();
	      }

	      this._renderAllControls();
	      this._onEnter();
	      this._setInitialValues();
	    }

	    /**
	     * Gets called when this control is deactivated
	     * @internal Used by the SDK, don't override.
	     */
	  }, {
	    key: 'leave',
	    value: function leave() {
	      this._active = false;

	      this._ui.showZoom();

	      this._removeControls();
	      this._disableCanvasControls();
	      this._onLeave();
	    }
	  }, {
	    key: '_enableCanvasControls',
	    value: function _enableCanvasControls() {
	      if (typeof this._canvasControlsTemplate === 'undefined') {
	        return;
	      }
	      _libUtils2['default'].classList(this._canvasControlsContainer).remove('imglykit-canvas-controls-disabled');
	    }
	  }, {
	    key: '_disableCanvasControls',
	    value: function _disableCanvasControls() {
	      if (typeof this._canvasControlsTemplate === 'undefined') {
	        return;
	      }
	      _libUtils2['default'].classList(this._canvasControlsContainer).add('imglykit-canvas-controls-disabled');
	    }

	    // Protected methods

	    /**
	     * Gets called when this control is activated.
	     * @protected
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {}

	    /**
	     * Gets called when this control is deactivated
	     * @protected
	     */
	  }, {
	    key: '_onLeave',
	    value: function _onLeave() {}

	    /**
	     * Gets called when the back button has been clicked
	     * @protected
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {}

	    /**
	     * Gets called when the done button has been clicked
	     * @protected
	     */
	  }, {
	    key: '_onDone',
	    value: function _onDone() {}

	    /**
	     * Gets called when the zoom level has been changed while
	     * this control is active
	     */
	  }, {
	    key: 'onZoom',
	    value: function onZoom() {}

	    /**
	     * The data that is available to the template
	     * @type {Object}
	     */
	  }, {
	    key: '_context',
	    get: function get() {
	      var context = this.context;

	      context = _libUtils2['default'].extend(context, {
	        helpers: this._helpers,
	        identifier: this.identifier
	      });

	      // Render partials before rendering control
	      context.partials = {};
	      for (var _name in this._partialTemplates) {
	        var template = this._partialTemplates[_name];
	        var partialContext = _libUtils2['default'].extend({}, context, template.additionalContext || {});
	        context.partials[_name] = template(partialContext);
	      }
	      context.partials.control = this._controlsTemplate(context);

	      return context;
	    }

	    /**
	     * The data that is available to the template
	     * @abstract
	     */
	  }, {
	    key: 'context',
	    get: function get() {
	      return {};
	    }
	  }]);

	  return Control;
	})(_libEventEmitter2['default']);

	Control.prototype.identifier = null;
	Control.extend = _libExtend2['default'];

	exports['default'] = Control;
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var RotationControl = (function (_Control) {
	  _inherits(RotationControl, _Control);

	  function RotationControl() {
	    _classCallCheck(this, RotationControl);

	    _get(Object.getPrototypeOf(RotationControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(RotationControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> <ul class="imglykit-controls-list imgly-controls-list-with-buttons"> <li data-degrees="-90"> <img src="'+(it.helpers.assetPath('ui/night/rotation/left.png'))+'" /> </li> <li data-degrees="90"> <img src="'+(it.helpers.assetPath('ui/night/rotation/right.png'))+'" /> </li> </ul></div>';return out;
	};
	      this._controlsTemplate = controlsTemplate;
	    }

	    /**
	     * Gets called when this control is activated
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      this._historyItem = null;

	      this._operationExistedBefore = !!this._ui.operations.rotation;
	      this._operation = this._ui.getOrCreateOperation('rotation');
	      this._operation.dirty = true;
	      this._cropOperation = this._ui.operations.crop;

	      this._initialDegrees = this._operation.getDegrees();

	      var listItems = this._controls.querySelectorAll('li');
	      if (this._cropOperation) {
	        if (!this._initialStart && !this._initialEnd) {
	          // Store initial settings for 'back' and 'done' buttons
	          this._initialStart = this._cropOperation.getStart().clone();
	          this._initialEnd = this._cropOperation.getEnd().clone();
	        }
	      }
	      this._listItems = Array.prototype.slice.call(listItems);

	      // Listen to click events

	      var _loop = function (i) {
	        var listItem = _this._listItems[i];
	        listItem.addEventListener('click', function () {
	          _this._onListItemClick(listItem);
	        });
	      };

	      for (var i = 0; i < this._listItems.length; i++) {
	        _loop(i);
	      }
	    }

	    /**
	     * Gets called when the given item has been clicked
	     * @param {DOMObject} item
	     * @private
	     */
	  }, {
	    key: '_onListItemClick',
	    value: function _onListItemClick(item) {
	      var degrees = item.getAttribute('data-degrees');
	      degrees = parseInt(degrees, 10);

	      var currentDegrees = this._operation.getDegrees();

	      if (!this._historyItem) {
	        this._historyItem = this._ui.addHistory(this._operation, {
	          degrees: this._initialDegrees
	        }, this._operationExistedBefore);
	      }

	      this._rotateCrop(degrees);
	      this._operation.setDegrees(currentDegrees + degrees);
	      this._ui.canvas.zoomToFit();
	    }

	    /**
	     * Rotates the current crop options by the given degrees
	     * @param {Number} degrees
	     * @private
	     */
	  }, {
	    key: '_rotateCrop',
	    value: function _rotateCrop(degrees) {
	      if (!this._cropOperation) return;

	      var start = this._cropOperation.getStart().clone();
	      var end = this._cropOperation.getEnd().clone();

	      var _start = start.clone();
	      switch (degrees) {
	        case 90:
	          start = new _libMathVector22['default'](1.0 - end.y, _start.x);
	          end = new _libMathVector22['default'](1.0 - _start.y, end.x);
	          break;
	        case -90:
	          start = new _libMathVector22['default'](_start.y, 1.0 - end.x);
	          end = new _libMathVector22['default'](end.y, 1.0 - _start.x);
	          break;
	      }

	      this._cropOperation.set({ start: start, end: end });
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      var currentDegrees = this._operation.getDegrees();
	      if (currentDegrees === 0) {
	        this._ui.removeOperation('rotation');
	      }
	    }
	  }]);

	  return RotationControl;
	})(_control2['default']);

	RotationControl.prototype.identifier = 'rotation';

	exports['default'] = RotationControl;
	module.exports = exports['default'];

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var FlipControl = (function (_Control) {
	  _inherits(FlipControl, _Control);

	  function FlipControl() {
	    _classCallCheck(this, FlipControl);

	    _get(Object.getPrototypeOf(FlipControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(FlipControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> <ul class="imglykit-controls-list imgly-controls-list-with-buttons"> <li data-direction="horizontal"> <img src="'+(it.helpers.assetPath('ui/night/flip/horizontal.png'))+'" /> </li> <li data-direction="vertical"> <img src="'+(it.helpers.assetPath('ui/night/flip/vertical.png'))+'" /> </li> </ul></div>';return out;
	};
	      this._controlsTemplate = controlsTemplate;
	    }

	    /**
	     * Gets called when this control is activated
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      this._historyItem = null;
	      this._operationExistedBefore = !!this._ui.operations.flip;
	      this._operation = this._ui.getOrCreateOperation('flip');

	      this._initialHorizontal = this._operation.getHorizontal();
	      this._initialVertical = this._operation.getVertical();

	      var listItems = this._controls.querySelectorAll('li');
	      this._listItems = Array.prototype.slice.call(listItems);

	      // Listen to click events

	      var _loop = function (i) {
	        var listItem = _this._listItems[i];
	        listItem.addEventListener('click', function () {
	          _this._onListItemClick(listItem);
	        });

	        var direction = listItem.getAttribute('data-direction');
	        if (direction === 'horizontal' && _this._operation.getHorizontal()) {
	          _this._toggleItem(listItem, true);
	        } else if (direction === 'vertical' && _this._operation.getVertical()) {
	          _this._toggleItem(listItem, true);
	        }
	      };

	      for (var i = 0; i < this._listItems.length; i++) {
	        _loop(i);
	      }
	    }

	    /**
	     * Gets called when the user clicked a list item
	     * @private
	     */
	  }, {
	    key: '_onListItemClick',
	    value: function _onListItemClick(item) {
	      var direction = item.getAttribute('data-direction');
	      var active = false;

	      var currentHorizontal = this._operation.getHorizontal();
	      var currentVertical = this._operation.getVertical();

	      if (direction === 'horizontal') {
	        this._operation.setHorizontal(!currentHorizontal);
	        currentHorizontal = !currentHorizontal;
	        this._ui.canvas.render();
	        active = !currentHorizontal;
	      } else if (direction === 'vertical') {
	        this._operation.setVertical(!currentVertical);
	        currentVertical = !currentVertical;
	        this._ui.canvas.render();
	        active = !currentVertical;
	      }

	      if ((this._initialVertical !== currentVertical || this._initialHorizontal !== currentHorizontal) && !this._historyItem) {
	        this._historyItem = this._ui.addHistory(this._operation, {
	          vertical: this._initialVertical,
	          horizontal: this._initialHorizontal
	        }, this._operationExistedBefore);
	      }

	      this._toggleItem(item, active);
	    }

	    /**
	     * Toggles the active state of the given item
	     * @param {DOMElement} item
	     * @param {Boolean} active
	     * @private
	     */
	  }, {
	    key: '_toggleItem',
	    value: function _toggleItem(item, active) {
	      var activeClass = 'imglykit-controls-item-active';
	      if (active) {
	        _libUtils2['default'].classList(item).add(activeClass);
	      } else {
	        _libUtils2['default'].classList(item).remove(activeClass);
	      }
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      var currentVertical = this._operation.getVertical();
	      var currentHorizontal = this._operation.getHorizontal();

	      if (!currentVertical && !currentHorizontal) {
	        this._ui.removeOperation('flip');
	      }

	      this._ui.canvas.render();
	    }
	  }]);

	  return FlipControl;
	})(_control2['default']);

	FlipControl.prototype.identifier = 'flip';

	exports['default'] = FlipControl;
	module.exports = exports['default'];

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libSlider = __webpack_require__(96);

	var _libSlider2 = _interopRequireDefault(_libSlider);

	var BrightnessControl = (function (_Control) {
	  _inherits(BrightnessControl, _Control);

	  function BrightnessControl() {
	    _classCallCheck(this, BrightnessControl);

	    _get(Object.getPrototypeOf(BrightnessControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(BrightnessControl, [{
	    key: 'init',

	    /**
	     * The entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> '+(it.partials.slider)+'</div>';return out;
	};
	      this._controlsTemplate = controlsTemplate;
	      this._partialTemplates.slider = _libSlider2['default'].template;

	      this._onUpdate = this._onUpdate.bind(this);
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      this._historyItem = null;
	      this._operationExistedBefore = !!this._ui.operations.brightness;
	      this._operation = this._ui.getOrCreateOperation('brightness');

	      // Initially set value
	      var brightness = this._operation.getBrightness();
	      this._initialBrightness = brightness;

	      var sliderElement = this._controls.querySelector('.imglykit-slider');
	      this._slider = new _libSlider2['default'](sliderElement, {
	        minValue: -1,
	        maxValue: 1,
	        defaultValue: brightness
	      });
	      this._slider.on('update', this._onUpdate);
	      this._slider.setValue(brightness);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      var currentBrightness = this._operation.getBrightness();

	      if (currentBrightness === 1.0) {
	        this._ui.removeOperation('brightness');
	      }

	      this._ui.canvas.render();
	      this._slider = null;
	    }

	    /**
	     * Gets called when the value has been updated
	     * @override
	     */
	  }, {
	    key: '_onUpdate',
	    value: function _onUpdate(value) {
	      this._operation.setBrightness(value);
	      this._ui.canvas.render();

	      if (!this._historyItem) {
	        this._historyItem = this._ui.addHistory(this._operation, {
	          brightness: this._initialBrightness
	        }, this._operationExistedBefore);
	      }
	    }
	  }]);

	  return BrightnessControl;
	})(_control2['default']);

	BrightnessControl.prototype.identifier = 'brightness';

	exports['default'] = BrightnessControl;
	module.exports = exports['default'];

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var Slider = (function (_EventEmitter) {
	  _inherits(Slider, _EventEmitter);

	  function Slider(element, options) {
	    _classCallCheck(this, Slider);

	    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this);

	    this._element = element;
	    this._options = _libUtils2['default'].defaults(options, {
	      minValue: 0,
	      maxValue: 1,
	      defaultValue: 0
	    });

	    this._value = this._options.defaultValue;

	    this._sliderElement = this._element.querySelector('.imglykit-slider-slider');
	    this._dotElement = this._element.querySelector('.imglykit-slider-dot');
	    this._centerDotElement = this._element.querySelector('.imglykit-slider-center-dot');
	    this._fillElement = this._element.querySelector('.imglykit-slider-fill');
	    this._backgroundElement = this._element.querySelector('.imglykit-slider-background');

	    // Mouse event callbacks bound to class context
	    this._onMouseDown = this._onMouseDown.bind(this);
	    this._onMouseMove = this._onMouseMove.bind(this);
	    this._onMouseUp = this._onMouseUp.bind(this);
	    this._onCenterDotClick = this._onCenterDotClick.bind(this);
	    this._onBackgroundClick = this._onBackgroundClick.bind(this);

	    this._backgroundElement.addEventListener('click', this._onBackgroundClick);
	    this._fillElement.addEventListener('click', this._onBackgroundClick);

	    this._handleDot();
	  }

	  /**
	   * The partial template string
	   * @type {String}
	   */

	  _createClass(Slider, [{
	    key: 'setValue',

	    /**
	     * Sets the given value
	     * @param {Number} value
	     */
	    value: function setValue(value) {
	      this._value = value;

	      var _options = this._options;
	      var maxValue = _options.maxValue;
	      var minValue = _options.minValue;

	      // Calculate the X position
	      var valueRange = maxValue - minValue;
	      var percentage = (value - minValue) / valueRange;
	      var sliderWidth = this._sliderElement.offsetWidth;
	      this._setX(sliderWidth * percentage);
	    }

	    /**
	     * Sets the slider position to the given X value and resizes
	     * the fill div
	     * @private
	     */
	  }, {
	    key: '_setX',
	    value: function _setX(x) {
	      this._xPosition = x;
	      this._dotElement.style.left = x + 'px';

	      // X position relative to center to simplify calculations
	      var halfSliderWidth = this._sliderElement.offsetWidth / 2;
	      var relativeX = x - halfSliderWidth;

	      // Update style
	      this._fillElement.style.width = Math.abs(relativeX) + 'px';
	      if (relativeX < 0) {
	        this._fillElement.style.left = halfSliderWidth - Math.abs(relativeX) + 'px';
	      } else {
	        this._fillElement.style.left = halfSliderWidth + 'px';
	      }
	    }

	    /**
	     * Handles the dot dragging
	     * @private
	     */
	  }, {
	    key: '_handleDot',
	    value: function _handleDot() {
	      this._dotElement.addEventListener('mousedown', this._onMouseDown);
	      this._dotElement.addEventListener('touchstart', this._onMouseDown);

	      if (this._centerDotElement) {
	        this._centerDotElement.addEventListener('click', this._onCenterDotClick);
	      }
	    }

	    /**
	     * Gets called when the user clicks the center button. Resets to default
	     * settings.
	     * @private
	     */
	  }, {
	    key: '_onCenterDotClick',
	    value: function _onCenterDotClick() {
	      this.setValue(this._options.defaultValue);
	      this.emit('update', this._value);
	    }

	    /**
	     * Gets called when the user clicks on the slider background
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onBackgroundClick',
	    value: function _onBackgroundClick(e) {
	      var position = _libUtils2['default'].getEventPosition(e);
	      var sliderOffset = this._sliderElement.getBoundingClientRect();
	      sliderOffset = new _libMathVector22['default'](sliderOffset.left, sliderOffset.y);

	      var relativePosition = position.clone().subtract(sliderOffset);

	      this._setX(relativePosition.x);
	      this._updateValue();
	    }

	    /**
	     * Gets called when the user presses a mouse button on the slider dot
	     * @private
	     */
	  }, {
	    key: '_onMouseDown',
	    value: function _onMouseDown(e) {
	      if (e.type === 'mousedown' && e.button !== 0) return;
	      e.preventDefault();

	      var mousePosition = _libUtils2['default'].getEventPosition(e);

	      document.addEventListener('mousemove', this._onMouseMove);
	      document.addEventListener('touchmove', this._onMouseMove);

	      document.addEventListener('mouseup', this._onMouseUp);
	      document.addEventListener('touchend', this._onMouseUp);

	      // Remember initial position
	      var dotPosition = this._dotElement.getBoundingClientRect();
	      var sliderPosition = this._sliderElement.getBoundingClientRect();

	      this._initialSliderX = dotPosition.left - sliderPosition.left;
	      this._initialMousePosition = mousePosition;
	    }

	    /**
	     * Gets called when the user drags the mouse
	     * @private
	     */
	  }, {
	    key: '_onMouseMove',
	    value: function _onMouseMove(e) {
	      e.preventDefault();

	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var mouseDiff = mousePosition.subtract(this._initialMousePosition);

	      // Add half width of the dot for negative margin compensation
	      var halfDotWidth = this._dotElement.offsetWidth * 0.5;
	      var newSliderX = this._initialSliderX + mouseDiff.x + halfDotWidth;

	      // X boundaries
	      var sliderWidth = this._sliderElement.offsetWidth;
	      newSliderX = Math.max(0, Math.min(newSliderX, sliderWidth));

	      this._setX(newSliderX);
	      this._updateValue();
	    }

	    /**
	     * Updates the value using the slider position
	     * @private
	     */
	  }, {
	    key: '_updateValue',
	    value: function _updateValue() {
	      var sliderWidth = this._sliderElement.offsetWidth;

	      // Calculate the new value
	      var _options2 = this._options;
	      var minValue = _options2.minValue;
	      var maxValue = _options2.maxValue;

	      var percentage = this._xPosition / sliderWidth;
	      var value = minValue + (maxValue - minValue) * percentage;
	      this.emit('update', value);
	    }

	    /**
	     * Gets called when the user does not press the mouse button anymore
	     * @private
	     */
	  }, {
	    key: '_onMouseUp',
	    value: function _onMouseUp() {
	      document.removeEventListener('mousemove', this._onMouseMove);
	      document.removeEventListener('touchmove', this._onMouseMove);

	      document.removeEventListener('mouseup', this._onMouseUp);
	      document.removeEventListener('touchend', this._onMouseUp);
	    }
	  }], [{
	    key: 'template',
	    get: function get() {
	      return function(it
	/**/) {
	var out='<div class="imglykit-slider" id="'+((typeof it.id === "undefined"?'':it.id))+'"> <div class="imglykit-slider-minus"> <img src="'+(it.helpers.assetPath('ui/night/slider/minus.png') )+'" /> </div> <div class="imglykit-slider-slider"> <div class="imglykit-slider-content"> <div class="imglykit-slider-background"></div> <div class="imglykit-slider-fill"></div> <div class="imglykit-slider-center-dot"></div> <div class="imglykit-slider-dot"></div> </div> </div> <div class="imglykit-slider-plus"> <img src="'+(it.helpers.assetPath('ui/night/slider/plus.png') )+'" /> </div></div>';return out;
	};
	    }
	  }]);

	  return Slider;
	})(_libEventEmitter2['default']);

	exports['default'] = Slider;
	module.exports = exports['default'];

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libSlider = __webpack_require__(96);

	var _libSlider2 = _interopRequireDefault(_libSlider);

	var ContrastControl = (function (_Control) {
	  _inherits(ContrastControl, _Control);

	  function ContrastControl() {
	    _classCallCheck(this, ContrastControl);

	    _get(Object.getPrototypeOf(ContrastControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(ContrastControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> '+(it.partials.slider)+'</div>';return out;
	};
	      this._controlsTemplate = controlsTemplate;
	      this._partialTemplates.slider = _libSlider2['default'].template;
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      this._historyItem = null;
	      this._operationExistedBefore = !!this._ui.operations.contrast;
	      this._operation = this._ui.getOrCreateOperation('contrast');

	      // Initially set value
	      var contrast = this._operation.getContrast();
	      this._initialContrast = contrast;

	      var sliderElement = this._controls.querySelector('.imglykit-slider');
	      this._slider = new _libSlider2['default'](sliderElement, {
	        minValue: 0,
	        maxValue: 2,
	        defaultValue: contrast
	      });
	      this._slider.on('update', this._onUpdate.bind(this));
	      this._slider.setValue(this._initialContrast);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      var currentContrast = this._operation.getContrast();

	      if (currentContrast === 1.0) {
	        this._ui.removeOperation('contrast');
	      }

	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the value has been updated
	     * @override
	     */
	  }, {
	    key: '_onUpdate',
	    value: function _onUpdate(value) {
	      this._operation.setContrast(value);
	      this._ui.canvas.render();

	      var currentContrast = this._operation.getContrast();
	      if (this._initialContrast !== currentContrast && !this._historyItem) {
	        this._historyItem = this._ui.addHistory(this._operation, {
	          contrast: this._initialContrast
	        }, this._operationExistedBefore);
	      }
	    }
	  }]);

	  return ContrastControl;
	})(_control2['default']);

	ContrastControl.prototype.identifier = 'contrast';

	exports['default'] = ContrastControl;
	module.exports = exports['default'];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libSlider = __webpack_require__(96);

	var _libSlider2 = _interopRequireDefault(_libSlider);

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var SaturationControl = (function (_Control) {
	  _inherits(SaturationControl, _Control);

	  function SaturationControl() {
	    _classCallCheck(this, SaturationControl);

	    _get(Object.getPrototypeOf(SaturationControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(SaturationControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> '+(it.partials.slider)+'</div>';return out;
	};
	      this._controlsTemplate = controlsTemplate;
	      this._partialTemplates.slider = _libSlider2['default'].template;
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      this._historyItem = null;
	      this._operationExistedBefore = !!this._ui.operations.saturation;
	      this._operation = this._ui.getOrCreateOperation('saturation');

	      // Initially set value
	      var saturation = this._operation.getSaturation();
	      this._initialSaturation = saturation;

	      var sliderElement = this._controls.querySelector('.imglykit-slider');
	      this._slider = new _libSlider2['default'](sliderElement, {
	        minValue: 0,
	        maxValue: 2,
	        defaultValue: saturation
	      });
	      this._slider.on('update', this._onUpdate.bind(this));
	      this._slider.setValue(this._initialSaturation);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      var currentSaturation = this._operation.getSaturation();

	      if (currentSaturation === 1) {
	        this._ui.removeOperation('saturation');
	      }

	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the value has been updated
	     * @override
	     */
	  }, {
	    key: '_onUpdate',
	    value: function _onUpdate(value) {
	      this._operation.setSaturation(value);
	      this._ui.canvas.render();

	      var currentSaturation = this._operation.getSaturation();
	      if (this._initialSaturation !== currentSaturation && !this._historyItem) {
	        this._historyItem = this._ui.addHistory(this._operation, {
	          saturation: this._initialSaturation
	        }, this._operationExistedBefore);
	      }
	    }
	  }]);

	  return SaturationControl;
	})(_control2['default']);

	SaturationControl.prototype.identifier = 'saturation';

	exports['default'] = SaturationControl;
	module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var CropControl = (function (_Control) {
	  _inherits(CropControl, _Control);

	  function CropControl() {
	    _classCallCheck(this, CropControl);

	    _get(Object.getPrototypeOf(CropControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(CropControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      this._availableRatios = {};
	      this._ratios = {};

	      var controlsTemplate = function(it
	/**/) {
	var out='<div> <ul class="imglykit-controls-list imgly-controls-list-with-buttons"> '; for(var identifier in it.ratios) { out+=' '; var ratio = it.ratios[identifier]; out+=' '; var enabled = ratio.selected; out+=' <li data-identifier="'+( identifier)+'" data-ratio="'+( ratio.ratio)+'"';if(enabled){out+=' data-selected';}out+='> <img src="'+(it.helpers.assetPath('ui/night/crop/' + identifier + '.png'))+'" /> </li> '; } out+=' </ul></div>'+(it.partials.doneButton);return out;
	};
	      this._controlsTemplate = controlsTemplate;

	      var canvasControlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-canvas-crop-container"> <div class="imglykit-canvas-crop-top"> <div class="imglykit-canvas-crop-top-left"></div> <div class="imglykit-canvas-crop-top-center"></div> <div class="imglykit-canvas-crop-top-right"></div> </div> <div class="imglykit-canvas-crop-center"> <div class="imglykit-canvas-crop-center-left"></div> <div class="imglykit-canvas-crop-center-center"> <div class="imglykit-canvas-crop-knobs"> <div data-corner="top-left"></div> <div data-corner="top-right"></div> <div data-corner="bottom-left"></div> <div data-corner="bottom-right"></div> </div> </div> <div class="imglykit-canvas-crop-center-right"></div> </div> <div class="imglykit-canvas-crop-bottom"> <div class="imglykit-canvas-crop-bottom-left"></div> <div class="imglykit-canvas-crop-bottom-center"></div> <div class="imglykit-canvas-crop-bottom-right"></div> </div></div>';return out;
	};
	      this._canvasControlsTemplate = canvasControlsTemplate;

	      // Mouse event callbacks bound to the class context
	      this._onKnobDown = this._onKnobDown.bind(this);
	      this._onKnobDrag = this._onKnobDrag.bind(this);
	      this._onKnobUp = this._onKnobUp.bind(this);
	      this._onCenterDown = this._onCenterDown.bind(this);
	      this._onCenterDrag = this._onCenterDrag.bind(this);
	      this._onCenterUp = this._onCenterUp.bind(this);

	      this._addDefaultRatios();

	      // Select all ratios per default
	      this.selectRatios(null);
	    }

	    /**
	     * Selects the ratios
	     * @param {Selector} selector
	     */
	  }, {
	    key: 'selectRatios',
	    value: function selectRatios(selector) {
	      this._ratios = {};

	      var ratioIdentifiers = Object.keys(this._availableRatios);

	      var selectedRatios = _libUtils2['default'].select(ratioIdentifiers, selector);
	      for (var i = 0; i < selectedRatios.length; i++) {
	        var identifier = selectedRatios[i];
	        this._ratios[identifier] = this._availableRatios[identifier];
	      }

	      if (this._active) {
	        this._renderControls();
	      }
	    }

	    /**
	     * Adds the default ratios
	     * @private
	     */
	  }, {
	    key: '_addDefaultRatios',
	    value: function _addDefaultRatios() {
	      this.addRatio('custom', '*', true);
	      this.addRatio('square', '1');
	      this.addRatio('4-3', '1.33');
	      this.addRatio('16-9', '1.77');
	    }

	    /**
	     * Adds a ratio with the given identifier
	     * @param {String} identifier
	     * @param {Number} ratio
	     * @param {Boolean} selected
	     */
	  }, {
	    key: 'addRatio',
	    value: function addRatio(identifier, ratio, selected) {
	      this._availableRatios[identifier] = { ratio: ratio, selected: selected };
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      _get(Object.getPrototypeOf(CropControl.prototype), '_onEnter', this).call(this);

	      this._operationExistedBefore = !!this._ui.operations.crop;
	      this._operation = this._ui.getOrCreateOperation('crop');

	      this._defaultStart = new _libMathVector22['default'](0.1, 0.1);
	      this._defaultEnd = new _libMathVector22['default'](0.9, 0.9);

	      // Store initial settings for 'back' button
	      this._initialStart = this._operation.getStart().clone();
	      this._initialEnd = this._operation.getEnd().clone();

	      this._start = this._initialStart || this._defaultStart;
	      this._end = this._initialEnd || this._defaultEnd;

	      // Minimum size in pixels
	      this._minimumSize = new _libMathVector22['default'](50, 50);

	      this._initialZoomLevel = this._ui.canvas.zoomLevel;
	      this._ui.canvas.zoomToFit(false);

	      var prefix = '.imglykit-canvas-crop';
	      var container = this._canvasControls;
	      var knobsContainer = container.querySelector(prefix + '-knobs');

	      // Make sure we see the whole input image
	      this._operation.set({
	        start: new _libMathVector22['default'](0, 0),
	        end: new _libMathVector22['default'](1, 1)
	      });

	      // Find all 4 knobs
	      this._knobs = {
	        topLeft: knobsContainer.querySelector('[data-corner=top-left]'),
	        topRight: knobsContainer.querySelector('[data-corner=top-right]'),
	        bottomLeft: knobsContainer.querySelector('[data-corner=bottom-left]'),
	        bottomRight: knobsContainer.querySelector('[data-corner=bottom-right]')
	      };

	      // Find the div areas that affect the displayed crop size
	      this._areas = {
	        topLeft: this._canvasControls.querySelector(prefix + '-top-left'),
	        topCenter: this._canvasControls.querySelector(prefix + '-top-center'),
	        centerLeft: this._canvasControls.querySelector(prefix + '-center-left'),
	        centerCenter: this._canvasControls.querySelector(prefix + '-center-center')
	      };

	      this._knobsContainer = this._canvasControls.querySelector('.imglykit-canvas-crop-knobs');

	      this._handleControls();
	      this._handleKnobs();
	      this._handleKnobsContainer();

	      // Resume the rendering
	      this._ui.canvas.zoomToFit().then(function () {
	        _this._updateDOM();
	      });
	    }

	    /**
	     * Handles the ratio controls
	     * @private
	     */
	  }, {
	    key: '_handleControls',
	    value: function _handleControls() {
	      var _this2 = this;

	      var listItems = this._controls.querySelectorAll('ul > li');
	      this._ratioItems = Array.prototype.slice.call(listItems);

	      var _loop = function (i) {
	        var item = _this2._ratioItems[i];
	        var selected = item.getAttribute('data-selected');
	        var ratio = item.getAttribute('data-ratio');
	        var identifier = item.getAttribute('data-identifier');
	        if (typeof selected !== 'undefined' && selected !== null && !_this2._operationExistedBefore) {
	          _this2._setRatio(identifier, ratio, false);
	          _this2._selectRatio(item);
	        }

	        item.addEventListener('click', function (e) {
	          e.preventDefault();
	          _this2._onRatioClick(item);
	        });
	      };

	      for (var i = 0; i < this._ratioItems.length; i++) {
	        _loop(i);
	      }
	    }

	    /**
	     * Gets called when the given ratio has been selected
	     * @param {DOMElement} item
	     * @private
	     */
	  }, {
	    key: '_onRatioClick',
	    value: function _onRatioClick(item) {
	      this._unselectAllRatios();
	      this._selectRatio(item);
	    }

	    /**
	     * Unselects all ratio control items
	     * @private
	     */
	  }, {
	    key: '_unselectAllRatios',
	    value: function _unselectAllRatios() {
	      for (var i = 0; i < this._ratioItems.length; i++) {
	        var item = this._ratioItems[i];
	        _libUtils2['default'].classList(item).remove('imglykit-controls-item-active');
	      }
	    }

	    /**
	     * Activates the given ratio control item
	     * @param {DOMElement} item
	     * @private
	     */
	  }, {
	    key: '_selectRatio',
	    value: function _selectRatio(item) {
	      _libUtils2['default'].classList(item).add('imglykit-controls-item-active');
	      var ratio = item.getAttribute('data-ratio');
	      var identifier = item.getAttribute('data-identifier');
	      this._setRatio(identifier, ratio);
	    }

	    /**
	     * Sets the given ratio
	     * @param {String} identifier
	     * @param {String} ratio
	     * @param {Boolean} resize
	     * @private
	     */
	  }, {
	    key: '_setRatio',
	    value: function _setRatio(identifier, ratio) {
	      var resize = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	      var canvasSize = this._ui.canvas.size;
	      this._selectedRatio = identifier;

	      if (ratio === '*') {
	        this._ratio = null;
	        this._start = new _libMathVector22['default'](0.1, 0.1);
	        this._end = new _libMathVector22['default'](0.9, 0.9);
	      } else {
	        if (ratio === 'original') {
	          this._ratio = canvasSize.x / canvasSize.y;
	        } else {
	          ratio = parseFloat(ratio);
	          this._ratio = ratio;
	        }

	        if (resize) {
	          if (canvasSize.x / canvasSize.y <= this._ratio) {
	            this._start.x = 0.1;
	            this._end.x = 0.9;
	            var height = 1 / canvasSize.y * (canvasSize.x / this._ratio * 0.8);
	            this._start.y = (1 - height) / 2;
	            this._end.y = 1 - this._start.y;
	          } else {
	            this._start.y = 0.1;
	            this._end.y = 0.9;
	            var width = 1 / canvasSize.x * (this._ratio * canvasSize.y * 0.8);
	            this._start.x = (1 - width) / 2;
	            this._end.x = 1 - this._start.x;
	          }
	        }
	      }

	      this._updateDOM();
	    }

	    /**
	     * Updates the cropping divs for the current operation settings
	     * @private
	     */
	  }, {
	    key: '_updateDOM',
	    value: function _updateDOM() {
	      var canvasSize = this._ui.canvas.size;
	      var startAbsolute = this._start.clone().multiply(canvasSize);
	      var endAbsolute = this._end.clone().multiply(canvasSize);
	      var size = endAbsolute.clone().subtract(startAbsolute);

	      var top = Math.max(1, startAbsolute.y);
	      var left = Math.max(1, startAbsolute.x);
	      var width = Math.max(1, size.x);
	      var height = Math.max(1, size.y);

	      // widths are defined by top left and top center areas
	      this._areas.topLeft.style.width = left + 'px';
	      this._areas.topCenter.style.width = width + 'px';

	      // heights are defined by top left and center left areas
	      this._areas.topLeft.style.height = top + 'px';
	      this._areas.centerLeft.style.height = height + 'px';

	      // define height on center div to make sure the knobs are positioned
	      // correctly (bug in IE10)
	      this._knobsContainer.style.height = height + 'px';
	    }

	    /**
	     * Handles the knob dragging
	     * @private
	     */
	  }, {
	    key: '_handleKnobs',
	    value: function _handleKnobs() {
	      var _this3 = this;

	      var _loop2 = function (identifier) {
	        var knob = _this3._knobs[identifier];
	        knob.addEventListener('mousedown', function (e) {
	          _this3._onKnobDown(e, knob);
	        });
	        knob.addEventListener('touchstart', function (e) {
	          _this3._onKnobDown(e, knob);
	        });
	      };

	      for (var identifier in this._knobs) {
	        _loop2(identifier);
	      }
	    }

	    /**
	     * Gets called when the user presses a knob
	     * @param {Event} e
	     * @param {DOMElement} knob
	     * @private
	     */
	  }, {
	    key: '_onKnobDown',
	    value: function _onKnobDown(e, knob) {
	      e.preventDefault();
	      e.stopPropagation();

	      this._currentKnob = knob;
	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);

	      // Remember the current values
	      this._startBeforeDrag = this._start.clone();
	      this._endBeforeDrag = this._end.clone();

	      document.addEventListener('mousemove', this._onKnobDrag);
	      document.addEventListener('touchmove', this._onKnobDrag);
	      document.addEventListener('mouseup', this._onKnobUp);
	      document.addEventListener('touchend', this._onKnobUp);
	    }

	    /**
	     * Gets called whe the user drags a knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onKnobDrag',
	    value: function _onKnobDrag(e) {
	      e.preventDefault();

	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var mouseDiff = mousePosition.subtract(this._initialMousePosition);
	      var corner = this._currentKnob.getAttribute('data-corner');
	      var canvasSize = this._ui.canvas.size;

	      var absoluteStart = this._startBeforeDrag.clone().multiply(canvasSize);
	      var absoluteEnd = this._endBeforeDrag.clone().multiply(canvasSize);

	      var width = undefined,
	          height = undefined,
	          maximum = undefined,
	          minimum = undefined;

	      switch (corner) {
	        case 'top-left':
	          absoluteStart.add(mouseDiff);
	          maximum = absoluteEnd.clone().subtract(this._minimumSize);
	          absoluteStart.clamp(null, maximum);
	          break;
	        case 'top-right':
	          absoluteEnd.x += mouseDiff.x;
	          absoluteStart.y += mouseDiff.y;
	          absoluteEnd.x = Math.max(absoluteStart.x + this._minimumSize.x, absoluteEnd.x);
	          absoluteStart.y = Math.min(absoluteEnd.y - this._minimumSize.y, absoluteStart.y);
	          break;
	        case 'bottom-right':
	          absoluteEnd.add(mouseDiff);
	          minimum = absoluteStart.clone().add(this._minimumSize);
	          absoluteEnd.clamp(minimum);
	          break;
	        case 'bottom-left':
	          absoluteStart.x += mouseDiff.x;
	          absoluteEnd.y += mouseDiff.y;
	          absoluteStart.x = Math.min(absoluteEnd.x - this._minimumSize.x, absoluteStart.x);
	          absoluteEnd.y = Math.max(absoluteStart.y + this._minimumSize.y, absoluteEnd.y);
	          break;
	      }

	      this._start.copy(absoluteStart).divide(canvasSize);
	      this._end.copy(absoluteEnd).divide(canvasSize);

	      this._start.clamp(0, 1);
	      this._end.clamp(0, 1);

	      /**
	       * Calculate boundaries
	       */
	      if (this._ratio !== null) {
	        switch (corner) {
	          case 'top-left':
	            width = (this._end.x - this._start.x) * canvasSize.x;
	            height = width / this._ratio;
	            this._start.y = this._end.y - height / canvasSize.y;

	            if (this._start.y <= 0) {
	              this._start.y = 0;
	              height = (this._end.y - this._start.y) * canvasSize.y;
	              width = height * this._ratio;
	              this._start.x = this._end.x - width / canvasSize.x;
	            }
	            break;
	          case 'top-right':
	            width = (this._end.x - this._start.x) * canvasSize.x;
	            height = width / this._ratio;
	            this._start.y = this._end.y - height / canvasSize.y;

	            if (this._start.y <= 0) {
	              this._start.y = 0;
	              height = (this._end.y - this._start.y) * canvasSize.y;
	              width = height * this._ratio;
	              this._end.x = this._start.x + width / canvasSize.x;
	            }
	            break;
	          case 'bottom-right':
	            width = (this._end.x - this._start.x) * canvasSize.x;
	            height = width / this._ratio;
	            this._end.y = this._start.y + height / canvasSize.y;

	            // If boundaries are exceeded, calculate width by maximum height
	            if (this._end.y >= 1) {
	              this._end.y = 1;
	              height = (this._end.y - this._start.y) * canvasSize.y;
	              width = height * this._ratio;
	              this._end.x = this._start.x + width / canvasSize.x;
	            }
	            break;
	          case 'bottom-left':
	            width = (this._end.x - this._start.x) * canvasSize.x;
	            height = width / this._ratio;
	            this._end.y = this._start.y + height / canvasSize.y;

	            if (this._end.y >= 1) {
	              this._end.y = 1;
	              height = (this._end.y - this._start.y) * canvasSize.y;
	              width = height * this._ratio;
	              this._start.x = this._end.x - width / canvasSize.x;
	            }
	            break;
	        }
	      }

	      this._updateDOM();
	    }

	    /**
	     * Gets called whe the user releases a knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onKnobUp',
	    value: function _onKnobUp() {
	      this._currentKnob = null;
	      document.removeEventListener('mousemove', this._onKnobDrag);
	      document.removeEventListener('touchmove', this._onKnobDrag);
	      document.removeEventListener('mouseup', this._onKnobUp);
	      document.removeEventListener('touchend', this._onKnobUp);
	    }

	    /**
	     * Handles the center dragging
	     * @private
	     */
	  }, {
	    key: '_handleKnobsContainer',
	    value: function _handleKnobsContainer() {
	      this._knobsContainer.addEventListener('mousedown', this._onCenterDown);
	      this._knobsContainer.addEventListener('touchstart', this._onCenterDown);
	    }

	    /**
	     * Gets called when the user presses the center area
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onCenterDown',
	    value: function _onCenterDown(e) {
	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);

	      // Remember the current values
	      this._startBeforeDrag = this._start.clone();
	      this._endBeforeDrag = this._end.clone();

	      document.addEventListener('mousemove', this._onCenterDrag);
	      document.addEventListener('touchmove', this._onCenterDrag);
	      document.addEventListener('mouseup', this._onCenterUp);
	      document.addEventListener('touchend', this._onCenterUp);
	    }

	    /**
	     * Gets called when the user presses the center area and moves his mouse
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onCenterDrag',
	    value: function _onCenterDrag(e) {
	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var mouseDiff = mousePosition.subtract(this._initialMousePosition);
	      var canvasSize = this._ui.canvas.size;

	      // Get the crop size
	      var cropSize = this._endBeforeDrag.clone().subtract(this._startBeforeDrag);
	      var absoluteCropSize = cropSize.clone().multiply(canvasSize);

	      // Get the absolute initial values
	      var absoluteStart = this._startBeforeDrag.clone().multiply(canvasSize);
	      var absoluteEnd = this._endBeforeDrag.clone().multiply(canvasSize);

	      // Add the mouse position difference
	      absoluteStart.add(mouseDiff);

	      // Clamp the value
	      var maxStart = canvasSize.clone().subtract(absoluteCropSize);
	      absoluteStart.clamp(new _libMathVector22['default'](0, 0), maxStart);

	      // End position does not change (relative to start)
	      absoluteEnd.copy(absoluteStart).add(absoluteCropSize);

	      // Set the final values
	      this._start.copy(absoluteStart).divide(canvasSize);
	      this._end.copy(absoluteEnd).divide(canvasSize);

	      this._updateDOM();
	    }

	    /**
	     * Gets called when the user releases the center area
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onCenterUp',
	    value: function _onCenterUp() {
	      document.removeEventListener('mousemove', this._onCenterDrag);
	      document.removeEventListener('touchmove', this._onCenterDrag);
	      document.removeEventListener('mouseup', this._onCenterUp);
	      document.removeEventListener('touchend', this._onCenterUp);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      this._ui.canvas.setZoomLevel(this._initialZoomLevel, false);

	      if (this._operationExistedBefore) {
	        this._operation.set({
	          start: this._initialStart,
	          end: this._initialEnd
	        });
	      } else {
	        this._ui.removeOperation('crop');
	      }
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the done button has been clicked
	     * @protected
	     */
	  }, {
	    key: '_onDone',
	    value: function _onDone() {
	      this._operation.set({
	        start: this._start,
	        end: this._end
	      });
	      this._ui.canvas.zoomToFit(true);

	      this._ui.addHistory(this._operation, {
	        start: this._initialStart.clone(),
	        end: this._initialEnd.clone()
	      }, this._operationExistedBefore);
	    }

	    /**
	     * The data that is available to the template
	     * @type {Object}
	     * @override
	     */
	  }, {
	    key: 'context',
	    get: function get() {
	      var context = _get(Object.getPrototypeOf(CropControl.prototype), 'context', this);
	      context.ratios = this._ratios;
	      return context;
	    }

	    /**
	     * The selected ratio identifier
	     * @type {String}
	     */
	  }, {
	    key: 'selectedRatio',
	    get: function get() {
	      return this._selectedRatio;
	    }
	  }]);

	  return CropControl;
	})(_control2['default']);

	CropControl.prototype.identifier = 'crop';

	exports['default'] = CropControl;
	module.exports = exports['default'];

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libSimpleSlider = __webpack_require__(101);

	var _libSimpleSlider2 = _interopRequireDefault(_libSimpleSlider);

	var RadialBlurControl = (function (_Control) {
	  _inherits(RadialBlurControl, _Control);

	  function RadialBlurControl() {
	    _classCallCheck(this, RadialBlurControl);

	    _get(Object.getPrototypeOf(RadialBlurControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(RadialBlurControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-controls-icon"> <img src="'+(it.helpers.assetPath('ui/night/blur/blur.png'))+'" /></div><div> '+( it.partials.slider)+'</div>'+( it.partials.doneButton);return out;
	};
	      this._controlsTemplate = controlsTemplate;

	      var canvasControlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-canvas-radial-blur-container"> <div class="imglykit-canvas-radial-blur-dot" id="imglykit-radial-blur-position"></div> <div class="imglykit-canvas-radial-blur-dot" id="imglykit-radial-blur-gradient"></div> <div class="imglykit-canvas-radial-blur-circle-container"> <div class="imglykit-canvas-radial-blur-circle"></div> </div></div>';return out;
	};
	      this._canvasControlsTemplate = canvasControlsTemplate;

	      this._partialTemplates.slider = _libSimpleSlider2['default'].template;
	      this._partialTemplates.slider.additionalContext = {
	        id: 'imglykit-blur-radius-slider'
	      };
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      this._operationExistedBefore = !!this._ui.operations['radial-blur'];
	      this._operation = this._ui.getOrCreateOperation('radial-blur');

	      // Remember initial identity state
	      this._initialSettings = {
	        position: this._operation.getPosition().clone(),
	        gradientRadius: this._operation.getGradientRadius(),
	        blurRadius: this._operation.getBlurRadius()
	      };

	      // Mouse event callbacks bound to the class context
	      this._onPositionKnobDown = this._onPositionKnobDown.bind(this);
	      this._onPositionKnobDrag = this._onPositionKnobDrag.bind(this);
	      this._onPositionKnobUp = this._onPositionKnobUp.bind(this);
	      this._onGradientKnobDown = this._onGradientKnobDown.bind(this);
	      this._onGradientKnobDrag = this._onGradientKnobDrag.bind(this);
	      this._onGradientKnobUp = this._onGradientKnobUp.bind(this);

	      this._positionKnob = this._canvasControls.querySelector('#imglykit-radial-blur-position');
	      this._gradientKnob = this._canvasControls.querySelector('#imglykit-radial-blur-gradient');
	      this._circle = this._canvasControls.querySelector('.imglykit-canvas-radial-blur-circle');
	      this._handleKnobs();
	      this._initSliders();

	      this._ui.canvas.render().then(function () {
	        _this._updateDOM();
	      });
	    }

	    /**
	     * Initializes the slider controls
	     * @private
	     */
	  }, {
	    key: '_initSliders',
	    value: function _initSliders() {
	      var blurRadiusSlider = this._controls.querySelector('#imglykit-blur-radius-slider');
	      this._blurRadiusSlider = new _libSimpleSlider2['default'](blurRadiusSlider, {
	        minValue: 0,
	        maxValue: 40
	      });
	      this._blurRadiusSlider.on('update', this._onBlurRadiusUpdate.bind(this));
	      this._blurRadiusSlider.setValue(this._initialSettings.blurRadius);
	    }

	    /**
	     * Gets called when the value of the blur radius slider has been updated
	     * @param {Number} value
	     * @private
	     */
	  }, {
	    key: '_onBlurRadiusUpdate',
	    value: function _onBlurRadiusUpdate(value) {
	      this._operation.setBlurRadius(value);
	      this._ui.canvas.render();
	      this._highlightDoneButton();
	    }

	    /**
	     * Handles the knob dragging
	     * @private
	     */
	  }, {
	    key: '_handleKnobs',
	    value: function _handleKnobs() {
	      // Initially set gradient knob position
	      var canvasSize = this._ui.canvas.size;
	      var position = this._operation.getPosition().clone().multiply(canvasSize);
	      this._gradientKnobPosition = position.clone().add(this._initialSettings.gradientRadius, 0);

	      this._positionKnob.addEventListener('mousedown', this._onPositionKnobDown);
	      this._positionKnob.addEventListener('touchstart', this._onPositionKnobDown);
	      this._gradientKnob.addEventListener('mousedown', this._onGradientKnobDown);
	      this._gradientKnob.addEventListener('touchstart', this._onGradientKnobDown);
	    }

	    /**
	     * Gets called when the user starts dragging the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onPositionKnobDown',
	    value: function _onPositionKnobDown(e) {
	      e.preventDefault();

	      var canvasSize = this._ui.canvas.size;

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialPosition = this._operation.getPosition().clone();
	      this._gradientKnobDistance = this._gradientKnobPosition.clone().subtract(this._initialPosition.clone().multiply(canvasSize));

	      document.addEventListener('mousemove', this._onPositionKnobDrag);
	      document.addEventListener('touchmove', this._onPositionKnobDrag);

	      document.addEventListener('mouseup', this._onPositionKnobUp);
	      document.addEventListener('touchend', this._onPositionKnobUp);
	    }

	    /**
	     * Gets called while the user starts drags the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onPositionKnobDrag',
	    value: function _onPositionKnobDrag(e) {
	      e.preventDefault();

	      var canvasSize = this._ui.canvas.size;
	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.subtract(this._initialMousePosition);

	      var newPosition = this._initialPosition.clone().multiply(canvasSize).add(diff);

	      var maxPosition = canvasSize.clone().subtract(this._gradientKnobDistance);
	      newPosition.clamp(new _libMathVector22['default'](0, 0), maxPosition);

	      this._gradientKnobPosition.copy(newPosition).add(this._gradientKnobDistance);

	      // Translate to 0...1
	      newPosition.divide(canvasSize);

	      this._operation.setPosition(newPosition);
	      this._updateDOM();
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the user stops dragging the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onPositionKnobUp',
	    value: function _onPositionKnobUp(e) {
	      e.preventDefault();

	      document.removeEventListener('mousemove', this._onPositionKnobDrag);
	      document.removeEventListener('touchmove', this._onPositionKnobDrag);

	      document.removeEventListener('mouseup', this._onPositionKnobUp);
	      document.removeEventListener('touchend', this._onPositionKnobUp);
	    }

	    /**
	     * Gets called when the user starts dragging the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onGradientKnobDown',
	    value: function _onGradientKnobDown(e) {
	      e.preventDefault();

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialGradientKnobPosition = this._gradientKnobPosition.clone();

	      document.addEventListener('mousemove', this._onGradientKnobDrag);
	      document.addEventListener('touchmove', this._onGradientKnobDrag);

	      document.addEventListener('mouseup', this._onGradientKnobUp);
	      document.addEventListener('touchend', this._onGradientKnobUp);
	    }

	    /**
	     * Gets called while the user starts drags the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onGradientKnobDrag',
	    value: function _onGradientKnobDrag(e) {
	      e.preventDefault();

	      var canvasSize = this._ui.canvas.size;
	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.subtract(this._initialMousePosition);

	      // Calculate new gradient knob position
	      this._gradientKnobPosition = this._initialGradientKnobPosition.clone().add(diff);
	      this._gradientKnobPosition.clamp(new _libMathVector22['default'](0, 0), canvasSize);

	      // Calculate distance to position
	      var position = this._operation.getPosition().clone().multiply(canvasSize);
	      var distance = this._gradientKnobPosition.clone().subtract(position);
	      var gradientRadius = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

	      // Update operation
	      this._operation.setGradientRadius(gradientRadius);
	      this._updateDOM();
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the user stops dragging the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onGradientKnobUp',
	    value: function _onGradientKnobUp(e) {
	      e.preventDefault();

	      document.removeEventListener('mousemove', this._onGradientKnobDrag);
	      document.removeEventListener('touchmove', this._onGradientKnobDrag);

	      document.removeEventListener('mouseup', this._onGradientKnobUp);
	      document.removeEventListener('touchend', this._onGradientKnobUp);
	    }

	    /**
	     * Updates the knob
	     * @private
	     */
	  }, {
	    key: '_updateDOM',
	    value: function _updateDOM() {
	      var canvasSize = this._ui.canvas.size;
	      var position = this._operation.getPosition().clone().multiply(canvasSize);

	      this._positionKnob.style.left = position.x + 'px';
	      this._positionKnob.style.top = position.y + 'px';

	      this._gradientKnob.style.left = this._gradientKnobPosition.x + 'px';
	      this._gradientKnob.style.top = this._gradientKnobPosition.y + 'px';

	      var circleSize = this._operation.getGradientRadius() * 2;
	      this._circle.style.left = position.x + 'px';
	      this._circle.style.top = position.y + 'px';
	      this._circle.style.width = circleSize + 'px';
	      this._circle.style.height = circleSize + 'px';
	      this._circle.style.marginLeft = '-' + circleSize / 2 + 'px';
	      this._circle.style.marginTop = '-' + circleSize / 2 + 'px';
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      if (this._operationExistedBefore) {
	        this._operation.set(this._initialSettings);
	      } else {
	        this._ui.removeOperation('radial-blur');
	      }
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the done button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onDone',
	    value: function _onDone() {
	      this._ui.addHistory(this._operation, {
	        position: this._initialSettings.position.clone(),
	        gradientRadius: this._initialSettings.gradientRadius,
	        blurRadius: this._initialSettings.blurRadius
	      }, this._operationExistedBefore);
	    }
	  }]);

	  return RadialBlurControl;
	})(_control2['default']);

	RadialBlurControl.prototype.identifier = 'radial-blur';

	exports['default'] = RadialBlurControl;
	module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _slider = __webpack_require__(96);

	var _slider2 = _interopRequireDefault(_slider);

	var SimpleSlider = (function (_Slider) {
	  _inherits(SimpleSlider, _Slider);

	  function SimpleSlider() {
	    _classCallCheck(this, SimpleSlider);

	    _get(Object.getPrototypeOf(SimpleSlider.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(SimpleSlider, [{
	    key: '_setX',

	    /**
	     * Sets the slider position to the given X value and resizes
	     * the fill div
	     * @private
	     */
	    value: function _setX(x) {
	      this._xPosition = x;

	      this._dotElement.style.left = x + 'px';
	      this._fillElement.style.width = x + 'px';
	    }
	  }], [{
	    key: 'template',

	    /**
	     * The partial template string
	     * @type {String}
	     */
	    get: function get() {
	      return function(it
	/**/) {
	var out='<div class="imglykit-slider" id="'+((typeof it.id === "undefined"?'':it.id))+'"> <div class="imglykit-slider-minus"> <img src="'+(it.helpers.assetPath('ui/night/slider/minus.png') )+'" /> </div> <div class="imglykit-slider-slider"> <div class="imglykit-slider-content"> <div class="imglykit-slider-background"></div> <div class="imglykit-slider-fill"></div> <div class="imglykit-slider-dot"></div> </div> </div> <div class="imglykit-slider-plus"> <img src="'+(it.helpers.assetPath('ui/night/slider/plus.png') )+'" /> </div></div>';return out;
	};
	    }
	  }]);

	  return SimpleSlider;
	})(_slider2['default']);

	exports['default'] = SimpleSlider;
	module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libSimpleSlider = __webpack_require__(101);

	var _libSimpleSlider2 = _interopRequireDefault(_libSimpleSlider);

	var TiltShiftControl = (function (_Control) {
	  _inherits(TiltShiftControl, _Control);

	  function TiltShiftControl() {
	    _classCallCheck(this, TiltShiftControl);

	    _get(Object.getPrototypeOf(TiltShiftControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(TiltShiftControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-controls-icon"> <img src="'+(it.helpers.assetPath('ui/night/blur/blur.png'))+'" /></div><div> ';var sliderId = "imglykit-blur-radius-slider";out+=' '+( it.partials.slider)+'</div>'+( it.partials.doneButton);return out;
	};
	      this._controlsTemplate = controlsTemplate;

	      var canvasControlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-canvas-tilt-shift-container"> <div class="imglykit-canvas-tilt-shift-dot" data-option="position"></div> <div class="imglykit-canvas-tilt-shift-dot" data-option="gradient"></div> <div class="imglykit-canvas-tilt-shift-rect-container"> <div class="imglykit-canvas-tilt-shift-rect"></div> </div></div>';return out;
	};
	      this._canvasControlsTemplate = canvasControlsTemplate;

	      this._partialTemplates.slider = _libSimpleSlider2['default'].template;
	      this._partialTemplates.slider.additionalContext = { id: 'imglykit-blur-radius-slider' };
	      this._currentKnob = null;
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      this._operationExistedBefore = !!this._ui.operations['tilt-shift'];
	      this._operation = this._ui.getOrCreateOperation('tilt-shift');

	      this._initialSettings = {
	        start: this._operation.getStart().clone(),
	        end: this._operation.getEnd().clone(),
	        gradientRadius: this._operation.getGradientRadius(),
	        blurRadius: this._operation.getBlurRadius()
	      };

	      // Mouse event callbacks bound to the class context
	      this._onPositionKnobDown = this._onPositionKnobDown.bind(this);
	      this._onPositionKnobDrag = this._onPositionKnobDrag.bind(this);
	      this._onPositionKnobUp = this._onPositionKnobUp.bind(this);
	      this._onGradientKnobDown = this._onGradientKnobDown.bind(this);
	      this._onGradientKnobDrag = this._onGradientKnobDrag.bind(this);
	      this._onGradientKnobUp = this._onGradientKnobUp.bind(this);

	      // Find DOM elements
	      var selector = '.imglykit-canvas-tilt-shift-dot';
	      this._positionKnob = this._canvasControls.querySelector(selector + '[data-option=\'position\']');
	      this._gradientKnob = this._canvasControls.querySelector(selector + '[data-option=\'gradient\']');
	      this._rect = this._canvasControls.querySelector('.imglykit-canvas-tilt-shift-rect');

	      // Initialization
	      this._initSliders();

	      this._ui.canvas.render().then(function () {
	        _this._handleKnobs();
	        _this._updateDOM();
	      });
	    }

	    /**
	     * Initializes the slider controls
	     * @private
	     */
	  }, {
	    key: '_initSliders',
	    value: function _initSliders() {
	      var blurRadiusSlider = this._controls.querySelector('#imglykit-blur-radius-slider');
	      this._blurRadiusSlider = new _libSimpleSlider2['default'](blurRadiusSlider, {
	        minValue: 0,
	        maxValue: 40
	      });
	      this._blurRadiusSlider.on('update', this._onBlurRadiusUpdate.bind(this));
	      this._blurRadiusSlider.setValue(this._initialSettings.blurRadius);
	    }

	    /**
	     * Gets called when the value of the blur radius slider has been updated
	     * @param {Number} value
	     * @private
	     */
	  }, {
	    key: '_onBlurRadiusUpdate',
	    value: function _onBlurRadiusUpdate(value) {
	      this._operation.setBlurRadius(value);
	      this._ui.canvas.render();
	      this._highlightDoneButton();
	    }

	    /**
	     * Handles the knob dragging
	     * @private
	     */
	  }, {
	    key: '_handleKnobs',
	    value: function _handleKnobs() {
	      // Add event listeners
	      this._positionKnob.addEventListener('mousedown', this._onPositionKnobDown);
	      this._positionKnob.addEventListener('touchstart', this._onPositionKnobDown);
	      this._gradientKnob.addEventListener('mousedown', this._onGradientKnobDown);
	      this._gradientKnob.addEventListener('touchstart', this._onGradientKnobDown);

	      var canvasSize = this._ui.canvas.size;
	      var _initialSettings = this._initialSettings;
	      var start = _initialSettings.start;
	      var end = _initialSettings.end;

	      start = start.clone().multiply(canvasSize);
	      end = end.clone().multiply(canvasSize);

	      var dist = end.clone().subtract(start);
	      var middle = start.clone().add(dist.clone().divide(2));

	      var totalDist = Math.sqrt(Math.pow(dist.x, 2) + Math.pow(dist.y, 2));
	      var factor = dist.clone().divide(totalDist).divide(2);

	      // Calculate initial knob position (middle of start and end)
	      this._knobPosition = middle.clone();

	      // Calculate initial gradient knob position
	      var gradientRadius = this._initialSettings.gradientRadius;
	      this._gradientKnobPosition = middle.clone().add(-gradientRadius * factor.y, gradientRadius * factor.x);

	      this._updateStartAndEnd();
	      this._updateDOM();

	      this._ui.canvas.render();
	    }

	    /**
	     * Calculate start and end positions using the knob positions
	     * @private
	     */
	  }, {
	    key: '_updateStartAndEnd',
	    value: function _updateStartAndEnd() {
	      var canvasSize = this._ui.canvas.size;

	      // Calculate distance between gradient and position knob
	      var diff = this._gradientKnobPosition.clone().subtract(this._knobPosition);

	      var start = this._knobPosition.clone().add(-diff.y, diff.x).divide(canvasSize);
	      var end = this._knobPosition.clone().add(diff.y, -diff.x).divide(canvasSize);

	      this._operation.set({ start: start, end: end });
	    }

	    /**
	     * Gets called when the user starts dragging the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onPositionKnobDown',
	    value: function _onPositionKnobDown(e) {
	      e.preventDefault();

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialPosition = this._knobPosition.clone();
	      this._initialDistanceToGradientKnob = this._gradientKnobPosition.clone().subtract(this._initialPosition);

	      document.addEventListener('mousemove', this._onPositionKnobDrag);
	      document.addEventListener('touchmove', this._onPositionKnobDrag);

	      document.addEventListener('mouseup', this._onPositionKnobUp);
	      document.addEventListener('touchend', this._onPositionKnobUp);
	    }

	    /**
	     * Gets called when the user drags the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onPositionKnobDrag',
	    value: function _onPositionKnobDrag(e) {
	      e.preventDefault();

	      var canvasSize = this._ui.canvas.size;
	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.subtract(this._initialMousePosition);

	      var newPosition = this._initialPosition.clone().add(diff);
	      this._knobPosition.copy(newPosition);

	      var minPosition = new _libMathVector22['default']().subtract(this._initialDistanceToGradientKnob);
	      minPosition.clamp(new _libMathVector22['default'](0, 0));

	      var maxPosition = canvasSize.clone().subtract(this._initialDistanceToGradientKnob);
	      maxPosition.clamp(null, canvasSize);

	      this._knobPosition.clamp(minPosition, maxPosition);

	      this._gradientKnobPosition.copy(this._knobPosition).add(this._initialDistanceToGradientKnob);

	      this._updateStartAndEnd();
	      this._updateDOM();
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the user stops dragging the position knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onPositionKnobUp',
	    value: function _onPositionKnobUp(e) {
	      e.preventDefault();

	      document.removeEventListener('mousemove', this._onPositionKnobDrag);
	      document.removeEventListener('touchmove', this._onPositionKnobDrag);

	      document.removeEventListener('mouseup', this._onPositionKnobUp);
	      document.removeEventListener('touchend', this._onPositionKnobUp);
	    }

	    /**
	     * Gets called when the user starts dragging the gradient knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onGradientKnobDown',
	    value: function _onGradientKnobDown(e) {
	      e.preventDefault();

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialGradientKnobPosition = this._gradientKnobPosition.clone();

	      document.addEventListener('mousemove', this._onGradientKnobDrag);
	      document.addEventListener('touchmove', this._onGradientKnobDrag);

	      document.addEventListener('mouseup', this._onGradientKnobUp);
	      document.addEventListener('touchend', this._onGradientKnobUp);
	    }

	    /**
	     * Gets called when the user drags the gradient knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onGradientKnobDrag',
	    value: function _onGradientKnobDrag(e) {
	      e.preventDefault();

	      var canvasSize = this._ui.canvas.size;
	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.subtract(this._initialMousePosition);

	      this._gradientKnobPosition.copy(this._initialGradientKnobPosition).add(diff);
	      this._gradientKnobPosition.clamp(new _libMathVector22['default'](0, 0), canvasSize);

	      var distance = this._gradientKnobPosition.clone().subtract(this._knobPosition);
	      var newGradientRadius = 2 * Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

	      this._operation.setGradientRadius(newGradientRadius);
	      this._updateStartAndEnd();
	      this._updateDOM();
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the user stops dragging the gradient knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onGradientKnobUp',
	    value: function _onGradientKnobUp(e) {
	      e.preventDefault();

	      document.removeEventListener('mousemove', this._onGradientKnobDrag);
	      document.removeEventListener('touchmove', this._onGradientKnobDrag);

	      document.removeEventListener('mouseup', this._onGradientKnobUp);
	      document.removeEventListener('touchend', this._onGradientKnobUp);
	    }

	    /**
	     * Updates the knob
	     * @private
	     */
	  }, {
	    key: '_updateDOM',
	    value: function _updateDOM() {
	      var position = this._knobPosition;
	      this._positionKnob.style.left = position.x + 'px';
	      this._positionKnob.style.top = position.y + 'px';

	      var gradientPosition = this._gradientKnobPosition;
	      this._gradientKnob.style.left = gradientPosition.x + 'px';
	      this._gradientKnob.style.top = gradientPosition.y + 'px';

	      // Resize rectangle to worst case size
	      var canvasSize = this._ui.canvas.size;
	      var gradientRadius = this._operation.getGradientRadius();
	      var rectSize = new _libMathVector22['default'](Math.sqrt(Math.pow(canvasSize.x, 2) + Math.pow(canvasSize.y, 2)) * 2, gradientRadius);

	      this._rect.style.width = rectSize.x + 'px';
	      this._rect.style.height = rectSize.y + 'px';
	      this._rect.style.marginLeft = '-' + rectSize.x / 2 + 'px';
	      this._rect.style.marginTop = '-' + rectSize.y / 2 + 'px';
	      this._rect.style.left = position.x + 'px';
	      this._rect.style.top = position.y + 'px';

	      // Rotate rectangle
	      var dist = gradientPosition.clone().subtract(position);
	      var degrees = Math.atan2(dist.x, dist.y) * (180 / Math.PI);
	      var transform = 'rotate(' + (-degrees).toFixed(2) + 'deg)';
	      this._rect.style.transform = transform;
	      this._rect.style['-moz-transform'] = transform;
	      this._rect.style['-ms-transform'] = transform;
	      this._rect.style['-webkit-transform'] = transform;
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      if (this._operationExistedBefore) {
	        this._operation.set(this._initialSettings);
	      } else {
	        this._ui.removeOperation('tilt-shift');
	      }
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the done button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onDone',
	    value: function _onDone() {
	      this._ui.addHistory(this._operation, {
	        start: this._initialSettings.start.clone(),
	        end: this._initialSettings.end.clone(),
	        blurRadius: this._initialSettings.blurRadius,
	        gradientRadius: this._initialSettings.gradientRadius
	      }, this._operationExistedBefore);
	    }
	  }]);

	  return TiltShiftControl;
	})(_control2['default']);

	TiltShiftControl.prototype.identifier = 'tilt-shift';

	exports['default'] = TiltShiftControl;
	module.exports = exports['default'];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libSimpleSlider = __webpack_require__(101);

	var _libSimpleSlider2 = _interopRequireDefault(_libSimpleSlider);

	var _libColorPicker = __webpack_require__(104);

	var _libColorPicker2 = _interopRequireDefault(_libColorPicker);

	var FramesControl = (function (_Control) {
	  _inherits(FramesControl, _Control);

	  function FramesControl() {
	    _classCallCheck(this, FramesControl);

	    _get(Object.getPrototypeOf(FramesControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(FramesControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> '+( it.partials.slider)+'</div><div class="imglykit-controls-button"> '+( it.partials.colorPicker)+'</div>'+( it.partials.doneButton);return out;
	};
	      this._controlsTemplate = controlsTemplate;
	      this._partialTemplates.slider = _libSimpleSlider2['default'].template;
	      this._partialTemplates.colorPicker = _libColorPicker2['default'].template;
	    }
	  }, {
	    key: '_renderControls',
	    value: function _renderControls() {
	      this._partialTemplates.colorPicker.additionalContext = { label: this._ui.translate('controls.frames.color') };

	      _get(Object.getPrototypeOf(FramesControl.prototype), '_renderControls', this).call(this);
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      this._operationExistedBefore = !!this._ui.operations.frames;
	      this._operation = this._ui.getOrCreateOperation('frames');

	      this._initialOptions = {
	        thickness: this._operation.getThickness(),
	        color: this._operation.getColor()
	      };

	      this._ui.canvas.render();

	      // Init slider
	      var sliderElement = this._controls.querySelector('.imglykit-slider');
	      this._slider = new _libSimpleSlider2['default'](sliderElement, {
	        minValue: 0.0,
	        maxValue: 0.5
	      });
	      this._slider.on('update', this._onThicknessUpdate.bind(this));
	      this._slider.setValue(this._initialOptions.thickness);

	      // Init colorpicker
	      var colorPickerElement = this._controls.querySelector('.imglykit-color-picker');
	      this._colorPicker = new _libColorPicker2['default'](this._ui, colorPickerElement);
	      this._colorPicker.on('update', this._onColorUpdate.bind(this));
	      this._colorPicker.setValue(this._initialOptions.color);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      if (this._operationExistedBefore) {
	        this._operation.set(this._initialOptions);
	      } else {
	        this._ui.removeOperation('frames');
	      }
	      this._ui.canvas.render();
	    }

	    /**
	     * Gets called when the thickness has been changed
	     * @override
	     */
	  }, {
	    key: '_onThicknessUpdate',
	    value: function _onThicknessUpdate(value) {
	      this._operation.setThickness(value);
	      this._ui.canvas.render();
	      this._highlightDoneButton();
	    }

	    /**
	     * Gets called when the color has been changed
	     * @override
	     */
	  }, {
	    key: '_onColorUpdate',
	    value: function _onColorUpdate(value) {
	      this._operation.setColor(value);
	      this._ui.canvas.render();
	      this._highlightDoneButton();
	    }

	    /**
	     * Gets called when the done button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onDone',
	    value: function _onDone() {
	      this._ui.addHistory(this._operation, {
	        color: this._initialOptions.color,
	        thickness: this._initialOptions.thickness
	      }, this._operationExistedBefore);
	    }
	  }]);

	  return FramesControl;
	})(_control2['default']);

	FramesControl.prototype.identifier = 'frames';

	exports['default'] = FramesControl;
	module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE, Image */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libEventEmitter = __webpack_require__(2);

	var _libEventEmitter2 = _interopRequireDefault(_libEventEmitter);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var ColorPicker = (function (_EventEmitter) {
	  _inherits(ColorPicker, _EventEmitter);

	  function ColorPicker(ui, element) {
	    _classCallCheck(this, ColorPicker);

	    _get(Object.getPrototypeOf(ColorPicker.prototype), 'constructor', this).call(this);

	    this._ui = ui;
	    this._element = element;
	    this._visible = false;
	    this._loaded = false;

	    this._overlay = this._element.querySelector('.imglykit-color-picker-overlay');
	    this._currentColorCanvas = this._element.querySelector('.imglykit-color-picker-color');

	    this._alphaCanvas = this._element.querySelector('canvas.imglykit-color-picker-alpha');
	    this._alphaKnob = this._element.querySelector('.imglykit-color-picker-alpha-container .imglykit-transparent-knob');

	    this._hueCanvas = this._element.querySelector('canvas.imglykit-color-picker-hue');
	    this._hueKnob = this._element.querySelector('.imglykit-color-picker-hue-container .imglykit-transparent-knob');

	    this._saturationCanvas = this._element.querySelector('canvas.imglykit-color-picker-saturation');
	    this._saturationKnob = this._element.querySelector('.imglykit-color-picker-saturation-container .imglykit-transparent-knob');

	    this._transparencyImage = new Image();
	    this._transparencyImage.src = ui.helpers.assetPath('ui/night/transparency.png');
	    this._transparencyImage.addEventListener('load', this._onTransparencyImageLoad.bind(this));

	    this._onAlphaCanvasDown = this._onAlphaCanvasDown.bind(this);
	    this._onAlphaCanvasDrag = this._onAlphaCanvasDrag.bind(this);
	    this._onAlphaCanvasUp = this._onAlphaCanvasUp.bind(this);
	    this._onHueCanvasDown = this._onHueCanvasDown.bind(this);
	    this._onHueCanvasDrag = this._onHueCanvasDrag.bind(this);
	    this._onHueCanvasUp = this._onHueCanvasUp.bind(this);

	    this._onSaturationCanvasDown = this._onSaturationCanvasDown.bind(this);
	    this._onSaturationCanvasDrag = this._onSaturationCanvasDrag.bind(this);
	    this._onSaturationCanvasUp = this._onSaturationCanvasUp.bind(this);

	    this._onElementClick = this._onElementClick.bind(this);

	    this._handleToggle();
	    this._handleAlphaKnob();
	    this._handleHueKnob();
	    this._handleSaturationKnob();
	  }

	  _createClass(ColorPicker, [{
	    key: '_onTransparencyImageLoad',
	    value: function _onTransparencyImageLoad() {
	      this._loaded = true;
	      this._render();
	    }

	    /**
	     * The partial template string
	     * @type {String}
	     */
	  }, {
	    key: '_handleToggle',

	    /**
	     * Handles the toggling of the overlay
	     * @private
	     */
	    value: function _handleToggle() {
	      this._element.addEventListener('click', this._onElementClick);
	    }

	    /**
	     * Gets called when the element has been clicked
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onElementClick',
	    value: function _onElementClick(e) {
	      if (e.target === this._element || e.target === this._currentColorCanvas) {
	        if (this._visible) {
	          this.hide();
	          this.emit('hide');
	        } else {
	          this.show();
	          this.emit('show');
	        }
	      }
	    }

	    /**
	     * Hides the color picker
	     */
	  }, {
	    key: 'hide',
	    value: function hide() {
	      _libUtils2['default'].classList(this._overlay).remove('imglykit-visible');
	      this._visible = false;
	    }

	    /**
	     * Shows the color picker
	     */
	  }, {
	    key: 'show',
	    value: function show() {
	      _libUtils2['default'].classList(this._overlay).add('imglykit-visible');
	      this._visible = true;
	    }

	    /**
	     * Sets the given value
	     * @param {Number} value
	     */
	  }, {
	    key: 'setValue',
	    value: function setValue(value) {
	      this._value = value.clone();

	      var _value$toHSV = this._value.toHSV();

	      var _value$toHSV2 = _slicedToArray(_value$toHSV, 3);

	      var h = _value$toHSV2[0];
	      var s = _value$toHSV2[1];
	      var v = _value$toHSV2[2];

	      this._hsvColor = { h: h, s: s, v: v };
	      this._positionKnobs();
	      this._render();
	    }

	    /**
	     * Updates the knob positions to represent the current HSV color
	     * @private
	     */
	  }, {
	    key: '_positionKnobs',
	    value: function _positionKnobs() {
	      this._positionAlphaKnob();
	      this._positionHueKnob();
	      this._positionSaturationKnob();
	    }

	    /**
	     * Positions the alpha knob according to the current alpha value
	     * @private
	     */
	  }, {
	    key: '_positionAlphaKnob',
	    value: function _positionAlphaKnob() {
	      var canvas = this._alphaCanvas;
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      var left = this._value.a * canvasSize.x;
	      this._alphaKnob.style.left = left + 'px';
	    }

	    /**
	     * Positions the hue knob according to the current hue value
	     * @private
	     */
	  }, {
	    key: '_positionHueKnob',
	    value: function _positionHueKnob() {
	      var canvas = this._hueCanvas;
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      var top = this._hsvColor.h * canvasSize.y;
	      this._hueKnob.style.top = top + 'px';
	    }

	    /**
	     * Positions the saturation knob according to the current saturation value
	     * @private
	     */
	  }, {
	    key: '_positionSaturationKnob',
	    value: function _positionSaturationKnob() {
	      var canvas = this._saturationCanvas;
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      var left = this._hsvColor.s * canvasSize.x;
	      this._saturationKnob.style.left = left + 'px';
	      var top = (1 - this._hsvColor.v) * canvasSize.y;
	      this._saturationKnob.style.top = top + 'px';
	    }

	    /**
	     * Updates and renders all controls to represent the current value
	     * @private
	     */
	  }, {
	    key: '_render',
	    value: function _render() {
	      if (!this._loaded) return;
	      this._renderCurrentColor();
	      this._renderAlpha();
	      this._renderHue();
	      this._renderSaturation();
	    }

	    /**
	     * Renders the currently selected color on the controls canvas
	     * @private
	     */
	  }, {
	    key: '_renderCurrentColor',
	    value: function _renderCurrentColor() {
	      var canvas = this._currentColorCanvas;
	      var context = canvas.getContext('2d');

	      var pattern = context.createPattern(this._transparencyImage, 'repeat');
	      context.rect(0, 0, canvas.width, canvas.height);
	      context.fillStyle = pattern;
	      context.fill();

	      context.fillStyle = this._value.toRGBA();
	      context.fill();
	    }

	    /**
	     * Renders the transparency canvas with the current color
	     * @private
	     */
	  }, {
	    key: '_renderAlpha',
	    value: function _renderAlpha() {
	      var canvas = this._alphaCanvas;
	      var context = canvas.getContext('2d');

	      var pattern = context.createPattern(this._transparencyImage, 'repeat');
	      context.rect(0, 0, canvas.width, canvas.height);
	      context.fillStyle = pattern;
	      context.fill();

	      var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);

	      var color = this._value.clone();
	      color.a = 0;
	      gradient.addColorStop(0, color.toRGBA());
	      gradient.addColorStop(1, this._value.toHex());
	      context.fillStyle = gradient;
	      context.fill();
	    }

	    /**
	     * Renders the hue canvas
	     * @private
	     */
	  }, {
	    key: '_renderHue',
	    value: function _renderHue() {
	      var canvas = this._hueCanvas;
	      var context = canvas.getContext('2d');

	      var color = new _libColor2['default']();
	      for (var y = 0; y < canvas.height; y++) {
	        var ratio = y / canvas.height;
	        color.fromHSV(ratio, 1, 1);

	        context.strokeStyle = color.toRGBA();
	        context.beginPath();
	        context.moveTo(0, y);
	        context.lineTo(canvas.width, y);
	        context.stroke();
	      }
	    }

	    /**
	     * Renders the saturation canvas
	     * @private
	     */
	  }, {
	    key: '_renderSaturation',
	    value: function _renderSaturation() {
	      var canvas = this._saturationCanvas;
	      var context = canvas.getContext('2d');

	      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

	      var color = new _libColor2['default'](1, 0, 0, 1);
	      for (var y = 0; y < canvas.height; y++) {
	        var value = (canvas.height - y) / canvas.height;
	        for (var x = 0; x < canvas.width; x++) {
	          var saturation = x / canvas.width;
	          color.fromHSV(this._hsvColor.h, saturation, value);
	          var r = color.r;
	          var g = color.g;
	          var b = color.b;
	          var a = color.a;

	          var index = (y * canvas.width + x) * 4;

	          imageData.data[index] = r * 255;
	          imageData.data[index + 1] = g * 255;
	          imageData.data[index + 2] = b * 255;
	          imageData.data[index + 3] = a * 255;
	        }
	      }

	      context.putImageData(imageData, 0, 0);
	    }

	    /**
	     * Handles the dragging of the alpha knob
	     * @private
	     */
	  }, {
	    key: '_handleAlphaKnob',
	    value: function _handleAlphaKnob() {
	      this._alphaCanvas.addEventListener('mousedown', this._onAlphaCanvasDown);
	      this._alphaCanvas.addEventListener('touchstart', this._onAlphaCanvasDown);
	    }

	    /**
	     * Gets called when the user clicks the alpha knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onAlphaCanvasDown',
	    value: function _onAlphaCanvasDown(e) {
	      e.preventDefault();

	      this._onAlphaCanvasDrag(e);

	      document.addEventListener('mousemove', this._onAlphaCanvasDrag);
	      document.addEventListener('touchmove', this._onAlphaCanvasDrag);

	      document.addEventListener('mouseup', this._onAlphaCanvasUp);
	      document.addEventListener('touchend', this._onAlphaCanvasUp);
	    }

	    /**
	     * Gets called when the user drags the alpha knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onAlphaCanvasDrag',
	    value: function _onAlphaCanvasDrag(e) {
	      e.preventDefault();

	      // Calculate relative mouse position on canvas
	      var canvas = this._alphaCanvas;
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);
	      var mousePosition = _libUtils2['default'].getEventPosition(e);

	      var _canvas$getBoundingClientRect = canvas.getBoundingClientRect();

	      var left = _canvas$getBoundingClientRect.left;
	      var top = _canvas$getBoundingClientRect.top;

	      var offset = new _libMathVector22['default'](left, top);
	      var relativePosition = mousePosition.subtract(offset);
	      relativePosition.clamp(new _libMathVector22['default'](0, 0), canvasSize);

	      // Update knob css positioning
	      this._alphaKnob.style.left = relativePosition.x + 'px';

	      // Update alpha value
	      this._value.a = relativePosition.x / canvasSize.x;
	      this._updateColor();
	    }

	    /**
	     * Gets called when the user stops dragging the alpha knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onAlphaCanvasUp',
	    value: function _onAlphaCanvasUp() {
	      document.removeEventListener('mousemove', this._onAlphaCanvasDrag);
	      document.removeEventListener('touchmove', this._onAlphaCanvasDrag);

	      document.removeEventListener('mouseup', this._onAlphaCanvasUp);
	      document.removeEventListener('touchend', this._onAlphaCanvasUp);
	    }

	    /**
	     * Handles the dragging of the hue knob
	     * @private
	     */
	  }, {
	    key: '_handleHueKnob',
	    value: function _handleHueKnob() {
	      this._hueCanvas.addEventListener('mousedown', this._onHueCanvasDown);
	      this._hueCanvas.addEventListener('touchstart', this._onHueCanvasDown);
	    }

	    /**
	     * Gets called when the user clicks the canvas knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onHueCanvasDown',
	    value: function _onHueCanvasDown(e) {
	      e.preventDefault();

	      this._onHueCanvasDrag(e);

	      document.addEventListener('mousemove', this._onHueCanvasDrag);
	      document.addEventListener('touchmove', this._onHueCanvasDrag);

	      document.addEventListener('mouseup', this._onHueCanvasUp);
	      document.addEventListener('touchend', this._onHueCanvasUp);
	    }

	    /**
	     * Gets called when the user drags the hue knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onHueCanvasDrag',
	    value: function _onHueCanvasDrag(e) {
	      e.preventDefault();

	      var canvas = this._hueCanvas;
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      // Calculate relative mouse position on canvas
	      var mousePosition = _libUtils2['default'].getEventPosition(e);

	      var _canvas$getBoundingClientRect2 = canvas.getBoundingClientRect();

	      var left = _canvas$getBoundingClientRect2.left;
	      var top = _canvas$getBoundingClientRect2.top;

	      var offset = new _libMathVector22['default'](left, top);
	      var relativePosition = mousePosition.subtract(offset);
	      relativePosition.clamp(new _libMathVector22['default'](0, 0), canvasSize);

	      // Update saturaiton knob css positioning
	      this._hueKnob.style.top = relativePosition.y + 'px';

	      // Update saturation and value
	      relativePosition.divide(canvasSize);
	      this._hsvColor.h = relativePosition.y;
	      this._updateColor();
	    }

	    /**
	     * Gets called when the user stops dragging the alpha knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onHueCanvasUp',
	    value: function _onHueCanvasUp() {
	      document.removeEventListener('mousemove', this._onHueCanvasDrag);
	      document.removeEventListener('touchmove', this._onHueCanvasDrag);

	      document.removeEventListener('mouseup', this._onHueCanvasUp);
	      document.removeEventListener('touchend', this._onHueCanvasUp);
	    }

	    /**
	     * Handles the dragging of the saturation knob
	     * @private
	     */
	  }, {
	    key: '_handleSaturationKnob',
	    value: function _handleSaturationKnob() {
	      this._saturationCanvas.addEventListener('mousedown', this._onSaturationCanvasDown);
	      this._saturationCanvas.addEventListener('touchstart', this._onSaturationCanvasDown);
	    }

	    /**
	     * Gets called when the user clicks the saturation canvas
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onSaturationCanvasDown',
	    value: function _onSaturationCanvasDown(e) {
	      e.preventDefault();

	      this._onSaturationCanvasDrag(e);

	      document.addEventListener('mousemove', this._onSaturationCanvasDrag);
	      document.addEventListener('touchmove', this._onSaturationCanvasDrag);

	      document.addEventListener('mouseup', this._onSaturationCanvasUp);
	      document.addEventListener('touchend', this._onSaturationCanvasUp);
	    }

	    /**
	     * Gets called when the user drags the saturation knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onSaturationCanvasDrag',
	    value: function _onSaturationCanvasDrag(e) {
	      e.preventDefault();

	      var canvas = this._saturationCanvas;
	      var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	      // Calculate relative mouse position on canvas
	      var mousePosition = _libUtils2['default'].getEventPosition(e);

	      var _canvas$getBoundingClientRect3 = canvas.getBoundingClientRect();

	      var left = _canvas$getBoundingClientRect3.left;
	      var top = _canvas$getBoundingClientRect3.top;

	      var offset = new _libMathVector22['default'](left, top);
	      var relativePosition = mousePosition.subtract(offset);
	      relativePosition.clamp(0, canvas.width);

	      // Update saturaiton knob css positioning
	      this._saturationKnob.style.left = relativePosition.x + 'px';
	      this._saturationKnob.style.top = relativePosition.y + 'px';

	      // Update saturation and value
	      relativePosition.divide(canvasSize);
	      this._hsvColor.s = relativePosition.x;
	      this._hsvColor.v = 1 - relativePosition.y;
	      this._updateColor();
	    }

	    /**
	     * Gets called when the user stops dragging the saturation knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onSaturationCanvasUp',
	    value: function _onSaturationCanvasUp() {
	      document.removeEventListener('mousemove', this._onSaturationCanvasDrag);
	      document.removeEventListener('touchmove', this._onSaturationCanvasDrag);

	      document.removeEventListener('mouseup', this._onSaturationCanvasUp);
	      document.removeEventListener('touchend', this._onSaturationCanvasUp);
	    }

	    /**
	     * Updates the attached color, emits the `update` event and triggers
	     * a render
	     * @private
	     */
	  }, {
	    key: '_updateColor',
	    value: function _updateColor() {
	      this._value.fromHSV(this._hsvColor.h, this._hsvColor.s, this._hsvColor.v);
	      this.emit('update', this._value);
	      this._render();
	    }
	  }], [{
	    key: 'template',
	    get: function get() {
	      return function(it
	/**/) {
	var out='<div class="imglykit-color-picker" id="'+((typeof it.id === "undefined"?'':it.id))+'"> <canvas class="imglykit-color-picker-color" width="34" height="34"></canvas> <div class="imglykit-controls-item-label">'+((typeof it.label === "undefined"?'':it.label))+'</div> <div class="imglykit-color-picker-overlay"> <div class="imglykit-color-picker-alpha-container"> <canvas class="imglykit-color-picker-alpha" width="200" height="30"></canvas> <div class="imglykit-transparent-knob"></div> </div> <div class="imglykit-color-picker-saturation-container"> <canvas class="imglykit-color-picker-saturation" width="160" height="160"></canvas> <div class="imglykit-transparent-knob"></div> </div> <div class="imglykit-color-picker-hue-container"> <canvas class="imglykit-color-picker-hue" width="30" height="160"></canvas> <div class="imglykit-transparent-knob"></div> </div> </div></div>';return out;
	};
	    }
	  }]);

	  return ColorPicker;
	})(_libEventEmitter2['default']);

	exports['default'] = ColorPicker;
	module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var StickersControl = (function (_Control) {
	  _inherits(StickersControl, _Control);

	  function StickersControl() {
	    _classCallCheck(this, StickersControl);

	    _get(Object.getPrototypeOf(StickersControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(StickersControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> <ul class="imglykit-controls-list imgly-controls-list-with-buttons"> '; for(var identifier in it.stickers) { out+=' '; var stickerPath = it.stickers[identifier]; out+=' '; var enabled = it.activeSticker === identifier; out+=' <li data-identifier="'+( identifier)+'"';if(enabled){out+=' class="imglykit-controls-item-active"';}out+='> <canvas class="imglykit-controls-item-canvas" data-image="'+(it.helpers.assetPath(stickerPath))+'"></canvas> </li> '; } out+=' </ul></div>'+( it.partials.doneButton );return out;
	};
	      this._controlsTemplate = controlsTemplate;

	      var canvasControlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-canvas-stickers-container"> <div class="imglykit-canvas-stickers"> <img class="imglykit-canvas-sticker-image" /> <div class="imglykit-knob"></div> </div></div>';return out;
	};
	      this._canvasControlsTemplate = canvasControlsTemplate;

	      /**
	       * The registered stickers
	       * @type {Object.<string, class>}
	       */
	      this._availableStickers = {};
	      this._stickers = {};
	      this._addDefaultStickers();
	      this.selectStickers(null);
	    }

	    /**
	     * Registers the default stickers
	     * @private
	     */
	  }, {
	    key: '_addDefaultStickers',
	    value: function _addDefaultStickers() {
	      this.addSticker('glasses-nerd', 'stickers/sticker-glasses-nerd.png');
	      this.addSticker('glasses-normal', 'stickers/sticker-glasses-normal.png');
	      this.addSticker('glasses-shutter-green', 'stickers/sticker-glasses-shutter-green.png');
	      this.addSticker('glasses-shutter-yellow', 'stickers/sticker-glasses-shutter-yellow.png');
	      this.addSticker('glasses-sun', 'stickers/sticker-glasses-sun.png');
	      this.addSticker('hat-cap', 'stickers/sticker-hat-cap.png');
	      this.addSticker('hat-cylinder', 'stickers/sticker-hat-cylinder.png');
	      this.addSticker('hat-party', 'stickers/sticker-hat-party.png');
	      this.addSticker('hat-sheriff', 'stickers/sticker-hat-sheriff.png');
	      this.addSticker('heart', 'stickers/sticker-heart.png');
	      this.addSticker('mustache-long', 'stickers/sticker-mustache-long.png');
	      this.addSticker('mustache1', 'stickers/sticker-mustache1.png');
	      this.addSticker('mustache2', 'stickers/sticker-mustache2.png');
	      this.addSticker('mustache3', 'stickers/sticker-mustache3.png');
	      this.addSticker('pipe', 'stickers/sticker-pipe.png');
	      this.addSticker('snowflake', 'stickers/sticker-snowflake.png');
	      this.addSticker('star', 'stickers/sticker-star.png');
	    }

	    /**
	     * Registers the sticker with the given identifier and path
	     * @private
	     */
	  }, {
	    key: 'addSticker',
	    value: function addSticker(identifier, path) {
	      this._availableStickers[identifier] = path;
	      this._stickers[identifier] = this._availableStickers[identifier];

	      if (this._active) {
	        this._renderControls();
	      }
	    }

	    /**
	     * Selects the stickers
	     * @param {Selector} selector
	     */
	  }, {
	    key: 'selectStickers',
	    value: function selectStickers(selector) {
	      this._stickers = {};

	      var stickerIdentifiers = Object.keys(this._availableStickers);

	      var selectedStickers = _libUtils2['default'].select(stickerIdentifiers, selector);
	      for (var i = 0; i < selectedStickers.length; i++) {
	        var identifier = selectedStickers[i];
	        this._stickers[identifier] = this._availableStickers[identifier];
	      }

	      if (this._active) {
	        this._renderControls();
	      }
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      this._operationExistedBefore = !!this._ui.operations.stickers;
	      this._operation = this._ui.getOrCreateOperation('stickers');

	      // Don't render initially
	      this._ui.removeOperation('stickers');

	      this._initialSettings = {
	        sticker: this._operation.getSticker(),
	        position: this._operation.getPosition().clone(),
	        size: this._operation.getSize().clone()
	      };

	      var canvasSize = this._ui.canvas.size;

	      this._size = this._initialSettings.size.clone();
	      this._position = this._initialSettings.position.clone().multiply(canvasSize);

	      // Remember zoom level and zoom to fit the canvas
	      this._initialZoomLevel = this._ui.canvas.zoomLevel;
	      this._ui.canvas.zoomToFit();

	      // Find DOM elements
	      this._container = this._canvasControls.querySelector('.imglykit-canvas-stickers');
	      this._stickerImage = this._canvasControls.querySelector('img');
	      this._stickerImage.addEventListener('load', function () {
	        _this._stickerSize = new _libMathVector22['default'](_this._stickerImage.width, _this._stickerImage.height);
	        _this._onStickerLoad();
	      });
	      this._knob = this._canvasControls.querySelector('div.imglykit-knob');

	      // Mouse event callbacks bound to the class context
	      this._onImageDown = this._onImageDown.bind(this);
	      this._onImageDrag = this._onImageDrag.bind(this);
	      this._onImageUp = this._onImageUp.bind(this);
	      this._onKnobDown = this._onKnobDown.bind(this);
	      this._onKnobDrag = this._onKnobDrag.bind(this);
	      this._onKnobUp = this._onKnobUp.bind(this);

	      this._renderListItems();
	      this._handleListItems();
	      this._handleImage();
	      this._handleKnob();
	    }

	    /**
	     * Renders the stickers on the list item canvas elements
	     * @private
	     */
	  }, {
	    key: '_renderListItems',
	    value: function _renderListItems() {
	      var _this2 = this;

	      var canvasItems = this._controls.querySelectorAll('li canvas');
	      this._canvasItems = Array.prototype.slice.call(canvasItems);

	      var _loop = function (i) {
	        var canvas = _this2._canvasItems[i];
	        canvas.width = canvas.offsetWidth;
	        canvas.height = canvas.offsetHeight;

	        var context = canvas.getContext('2d');
	        var image = canvas.getAttribute('data-image');
	        var imageEl = document.createElement('img');

	        var canvasSize = new _libMathVector22['default'](canvas.width, canvas.height);

	        imageEl.addEventListener('load', function () {
	          var imageSize = new _libMathVector22['default'](imageEl.width, imageEl.height);
	          var newSize = _libUtils2['default'].resizeVectorToFit(imageSize, canvasSize);

	          var offset = canvasSize.clone().divide(2).subtract(newSize.clone().divide(2));

	          context.drawImage(imageEl, 0, 0, imageSize.x, imageSize.y, offset.x, offset.y, newSize.x, newSize.y);
	        });

	        imageEl.src = image;
	      };

	      for (var i = 0; i < this._canvasItems.length; i++) {
	        _loop(i);
	      }
	    }

	    /**
	     * Handles the list item click events
	     * @private
	     */
	  }, {
	    key: '_handleListItems',
	    value: function _handleListItems() {
	      var _this3 = this;

	      var listItems = this._controls.querySelectorAll('li');
	      this._listItems = Array.prototype.slice.call(listItems);

	      // Listen to click events

	      var _loop2 = function (i) {
	        var listItem = _this3._listItems[i];
	        var identifier = listItem.getAttribute('data-identifier');
	        listItem.addEventListener('click', function () {
	          _this3._onListItemClick(listItem);
	        });

	        if (!_this3._operationExistedBefore && i === 0 || _this3._operationExistedBefore && _this3._stickers[identifier] === _this3._initialSettings.sticker) {
	          _this3._onListItemClick(listItem, false);
	        }
	      };

	      for (var i = 0; i < this._listItems.length; i++) {
	        _loop2(i);
	      }
	    }

	    /**
	     * Resizes and positions the sticker according to the current settings
	     * @private
	     */
	  }, {
	    key: '_applySettings',
	    value: function _applySettings() {
	      var ratio = this._stickerSize.y / this._stickerSize.x;
	      this._size.y = this._size.x * ratio;

	      this._stickerImage.style.width = this._size.x + 'px';
	      this._stickerImage.style.height = this._size.y + 'px';
	      this._container.style.left = this._position.x + 'px';
	      this._container.style.top = this._position.y + 'px';
	    }

	    /**
	     * Gets called when the user hits the back button
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      if (this._operationExistedBefore) {
	        this._operation = this._ui.getOrCreateOperation('stickers');
	        this._operation.set(this._initialSettings);
	      } else {
	        this._ui.removeOperation('stickers');
	      }
	      this._ui.canvas.setZoomLevel(this._initialZoomLevel);
	    }

	    /**
	     * Gets called when the done button has been clicked
	     * @protected
	     */
	  }, {
	    key: '_onDone',
	    value: function _onDone() {
	      // Map the position and size options to 0...1 values
	      var canvasSize = this._ui.canvas.size;
	      var position = this._position.clone().divide(canvasSize);
	      var size = this._size.clone().divide(canvasSize);

	      this._ui.canvas.setZoomLevel(this._initialZoomLevel, false);

	      // Create a new operation and render it
	      this._operation = this._ui.getOrCreateOperation('stickers');
	      this._operation.set({
	        sticker: this._availableStickers[this._sticker],
	        position: position,
	        size: size
	      });
	      this._ui.canvas.render();

	      this._ui.addHistory(this, {
	        sticker: this._initialSettings.sticker,
	        position: this._initialSettings.position.clone(),
	        size: this._initialSettings.size.clone()
	      }, this._operationExistedBefore);
	    }

	    /**
	     * Handles the knob dragging
	     * @private
	     */
	  }, {
	    key: '_handleKnob',
	    value: function _handleKnob() {
	      this._knob.addEventListener('mousedown', this._onKnobDown);
	      this._knob.addEventListener('touchstart', this._onKnobDown);
	    }

	    /**
	     * Gets called when the user clicks the knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onKnobDown',
	    value: function _onKnobDown(e) {
	      e.preventDefault();

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialSize = this._size.clone();

	      document.addEventListener('mousemove', this._onKnobDrag);
	      document.addEventListener('touchmove', this._onKnobDrag);

	      document.addEventListener('mouseup', this._onKnobUp);
	      document.addEventListener('touchend', this._onKnobUp);
	    }

	    /**
	     * Gets called when the user drags the knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onKnobDrag',
	    value: function _onKnobDrag(e) {
	      e.preventDefault();

	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.clone().subtract(this._initialMousePosition);

	      var size = this._initialSize.clone();
	      var ratio = this._stickerImage.height / this._stickerImage.width;
	      size.x += diff.x;
	      size.y = size.x * ratio;

	      this._size.copy(size);

	      this._applySettings();
	      this._highlightDoneButton();
	    }

	    /**
	     * Gets called when the user releases the knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onKnobUp',
	    value: function _onKnobUp() {
	      document.removeEventListener('mousemove', this._onKnobDrag);
	      document.removeEventListener('touchmove', this._onKnobDrag);

	      document.removeEventListener('mouseup', this._onKnobUp);
	      document.removeEventListener('touchend', this._onKnobUp);
	    }

	    /**
	     * Handles the image dragging
	     * @private
	     */
	  }, {
	    key: '_handleImage',
	    value: function _handleImage() {
	      this._stickerImage.addEventListener('mousedown', this._onImageDown);
	      this._stickerImage.addEventListener('touchstart', this._onImageDown);
	    }

	    /**
	     * Gets called when the user clicks the image
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onImageDown',
	    value: function _onImageDown(e) {
	      e.preventDefault();

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialPosition = this._position.clone();

	      document.addEventListener('mousemove', this._onImageDrag);
	      document.addEventListener('touchmove', this._onImageDrag);

	      document.addEventListener('mouseup', this._onImageUp);
	      document.addEventListener('touchend', this._onImageUp);
	    }

	    /**
	     * Gets called when the user drags the image
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onImageDrag',
	    value: function _onImageDrag(e) {
	      e.preventDefault();

	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.clone().subtract(this._initialMousePosition);

	      var position = this._initialPosition.clone();
	      position.add(diff);

	      this._position.copy(position);

	      this._applySettings();
	      this._highlightDoneButton();
	    }

	    /**
	     * Gets called when the user releases the image
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onImageUp',
	    value: function _onImageUp() {
	      document.removeEventListener('mousemove', this._onImageDrag);
	      document.removeEventListener('touchmove', this._onImageDrag);

	      document.removeEventListener('mouseup', this._onImageUp);
	      document.removeEventListener('touchend', this._onImageUp);
	    }

	    /**
	     * Gets called as soon as the sticker image has been loaded
	     * @private
	     */
	  }, {
	    key: '_onStickerLoad',
	    value: function _onStickerLoad() {
	      this._size = new _libMathVector22['default'](this._stickerImage.width, this._stickerImage.height);

	      if (typeof this._position === 'undefined') {
	        this._position = new _libMathVector22['default'](0, 0);
	      }

	      this._applySettings();
	    }

	    /**
	     * Gets called when the user clicked a list item
	     * @private
	     */
	  }, {
	    key: '_onListItemClick',
	    value: function _onListItemClick(item) {
	      var manually = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      this._deactivateAllItems();

	      var identifier = item.getAttribute('data-identifier');
	      var stickerPath = this._availableStickers[identifier];
	      stickerPath = this._kit.getAssetPath(stickerPath);

	      try {
	        this._stickerImage.attributes.removeNamedItem('style');
	      } catch (e) {}

	      this._sticker = identifier;
	      this._stickerImage.src = stickerPath;

	      _libUtils2['default'].classList(item).add('imglykit-controls-item-active');

	      if (manually) {
	        this._highlightDoneButton();
	      }
	    }

	    /**
	     * Deactivates all list items
	     * @private
	     */
	  }, {
	    key: '_deactivateAllItems',
	    value: function _deactivateAllItems() {
	      for (var i = 0; i < this._listItems.length; i++) {
	        var listItem = this._listItems[i];
	        _libUtils2['default'].classList(listItem).remove('imglykit-controls-item-active');
	      }
	    }

	    /**
	     * The data that is available to the template
	     * @type {Object}
	     * @override
	     */
	  }, {
	    key: 'context',
	    get: function get() {
	      var context = _get(Object.getPrototypeOf(StickersControl.prototype), 'context', this);
	      context.stickers = this._stickers;
	      return context;
	    }
	  }]);

	  return StickersControl;
	})(_control2['default']);

	StickersControl.prototype.identifier = 'stickers';

	exports['default'] = StickersControl;
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libColorPicker = __webpack_require__(104);

	var _libColorPicker2 = _interopRequireDefault(_libColorPicker);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var TextControl = (function (_Control) {
	  _inherits(TextControl, _Control);

	  function TextControl() {
	    _classCallCheck(this, TextControl);

	    _get(Object.getPrototypeOf(TextControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(TextControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='<div> <ul class="imglykit-controls-list imgly-controls-list-with-buttons"> ';var arr1=it.fonts;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+=' <li data-name="'+( value.name)+'" data-weight="'+( value.weight)+'"> <canvas class="imglykit-controls-item-canvas"></canvas> </li> ';} } out+=' </ul></div><div class="imglykit-controls-button"> '+( it.partials.fgColorPicker)+'</div><div class="imglykit-controls-button"> '+( it.partials.bgColorPicker)+'</div>'+( it.partials.doneButton);return out;
	};
	      this._controlsTemplate = controlsTemplate;

	      var canvasControlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-canvas-text-container"> <div class="imglykit-canvas-text"> <div class="imglykit-crosshair"> <img src="'+(it.helpers.assetPath('ui/night/crosshair.png'))+'" /> </div> <div class="imglykit-canvas-text-textarea"> <textarea></textarea> <div class="imglykit-knob"></div> </div> </div></div>';return out;
	};
	      this._canvasControlsTemplate = canvasControlsTemplate;

	      this._partialTemplates.fgColorPicker = _libColorPicker2['default'].template;
	      this._partialTemplates.fgColorPicker.additionalContext = {
	        id: 'imglykit-text-foreground-color-picker'
	      };

	      this._partialTemplates.bgColorPicker = _libColorPicker2['default'].template;
	      this._partialTemplates.bgColorPicker.additionalContext = {
	        id: 'imglykit-text-background-color-picker'
	      };

	      this._fonts = [];
	      this._addFonts();
	    }
	  }, {
	    key: '_renderControls',
	    value: function _renderControls() {
	      this._partialTemplates.fgColorPicker.additionalContext.label = this._ui.translate('controls.text.foreground');
	      this._partialTemplates.bgColorPicker.additionalContext.label = this._ui.translate('controls.text.background');
	      _get(Object.getPrototypeOf(TextControl.prototype), '_renderControls', this).call(this);
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      var _this = this;

	      this._operationExistedBefore = !!this._ui.operations.text;
	      this._operation = this._ui.getOrCreateOperation('text');

	      // Don't render initially
	      this._ui.removeOperation('text');

	      var canvasSize = this._ui.canvas.size;

	      this._initialSettings = {
	        lineHeight: this._operation.getLineHeight(),
	        fontSize: this._operation.getFontSize(),
	        fontFamily: this._operation.getFontFamily(),
	        fontWeight: this._operation.getFontWeight(),
	        color: this._operation.getColor(),
	        position: this._operation.getPosition(),
	        text: this._operation.getText() || '',
	        maxWidth: this._operation.getMaxWidth(),
	        backgroundColor: this._operation.getBackgroundColor()
	      };

	      this._settings = {
	        lineHeight: this._initialSettings.lineHeight,
	        fontSize: this._initialSettings.fontSize,
	        fontFamily: this._initialSettings.fontFamily,
	        fontWeight: this._initialSettings.fontWeight,
	        color: this._initialSettings.color.clone(),
	        position: this._initialSettings.position.clone().multiply(canvasSize),
	        text: this._initialSettings.text,
	        maxWidth: this._initialSettings.maxWidth * canvasSize.x,
	        backgroundColor: this._initialSettings.backgroundColor.clone()
	      };

	      // Remember zoom level and zoom to fit the canvas
	      this._initialZoomLevel = this._ui.canvas.zoomLevel;

	      this._container = this._canvasControls.querySelector('.imglykit-canvas-text');
	      this._textarea = this._canvasControls.querySelector('textarea');
	      this._textarea.focus();

	      this._moveKnob = this._canvasControls.querySelector('.imglykit-crosshair');
	      this._resizeKnob = this._canvasControls.querySelector('.imglykit-knob');

	      // If the text has been edited before, subtract the knob width and padding
	      if (this._operationExistedBefore) {
	        this._settings.position.x -= 2;
	        this._settings.position.y -= 2;
	      }

	      this._onTextareaKeyUp = this._onTextareaKeyUp.bind(this);
	      this._onResizeKnobDown = this._onResizeKnobDown.bind(this);
	      this._onResizeKnobDrag = this._onResizeKnobDrag.bind(this);
	      this._onResizeKnobUp = this._onResizeKnobUp.bind(this);
	      this._onMoveKnobDown = this._onMoveKnobDown.bind(this);
	      this._onMoveKnobDrag = this._onMoveKnobDrag.bind(this);
	      this._onMoveKnobUp = this._onMoveKnobUp.bind(this);
	      this._onForegroundColorUpdate = this._onForegroundColorUpdate.bind(this);
	      this._onBackgroundColorUpdate = this._onBackgroundColorUpdate.bind(this);

	      this._initColorPickers();
	      this._renderListItems();
	      this._handleListItems();
	      this._handleTextarea();
	      this._handleResizeKnob();
	      this._handleMoveKnob();

	      // Resize asynchronously to render a frame
	      setTimeout(function () {
	        _this._resizeTextarea();
	      }, 1);

	      this._ui.canvas.zoomToFit().then(function () {
	        _this._applySettings();
	      });
	    }

	    /**
	     * Initializes the color pickers
	     * @private
	     */
	  }, {
	    key: '_initColorPickers',
	    value: function _initColorPickers() {
	      var _this2 = this;

	      var foregroundColorPicker = this._controls.querySelector('#imglykit-text-foreground-color-picker');
	      this._foregroundColorPicker = new _libColorPicker2['default'](this._ui, foregroundColorPicker);
	      this._foregroundColorPicker.setValue(this._operation.getColor());
	      this._foregroundColorPicker.on('update', this._onForegroundColorUpdate);
	      this._foregroundColorPicker.on('show', function () {
	        _this2._backgroundColorPicker.hide();
	      });

	      var backgroundColorPicker = this._controls.querySelector('#imglykit-text-background-color-picker');
	      this._backgroundColorPicker = new _libColorPicker2['default'](this._ui, backgroundColorPicker);
	      this._backgroundColorPicker.setValue(this._operation.getBackgroundColor());
	      this._backgroundColorPicker.on('update', this._onBackgroundColorUpdate);
	      this._backgroundColorPicker.on('show', function () {
	        _this2._foregroundColorPicker.hide();
	      });
	    }

	    /**
	     * Renders the text on the list item canvas elements
	     * @private
	     */
	  }, {
	    key: '_renderListItems',
	    value: function _renderListItems() {
	      var canvasItems = this._controls.querySelectorAll('li canvas');
	      this._canvasItems = Array.prototype.slice.call(canvasItems);

	      for (var i = 0; i < this._canvasItems.length; i++) {
	        var canvas = this._canvasItems[i];
	        canvas.width = canvas.offsetWidth;
	        canvas.height = canvas.offsetHeight;

	        var listItem = canvas.parentNode;

	        var context = canvas.getContext('2d');
	        var fontFamily = listItem.getAttribute('data-name');
	        var fontWeight = listItem.getAttribute('data-weight');

	        context.font = fontWeight + ' 30px ' + fontFamily;
	        context.textBaseline = 'middle';
	        context.textAlign = 'center';
	        context.fillStyle = 'white';

	        context.fillText(fontFamily.substr(0, 2), canvas.width / 2, canvas.height / 2);
	      }
	    }

	    /**
	     * Handles the list item click events
	     * @private
	     */
	  }, {
	    key: '_handleListItems',
	    value: function _handleListItems() {
	      var _this3 = this;

	      var listItems = this._controls.querySelectorAll('li');
	      this._listItems = Array.prototype.slice.call(listItems);

	      // Listen to click events

	      var _loop = function (i) {
	        var listItem = _this3._listItems[i];
	        var name = listItem.getAttribute('data-name');
	        listItem.addEventListener('click', function () {
	          _this3._onListItemClick(listItem);
	        });

	        if (!_this3._operationExistedBefore && i === 0 || _this3._operationExistedBefore && name === _this3._initialSettings.fontFamily) {
	          _this3._onListItemClick(listItem, false);
	        }
	      };

	      for (var i = 0; i < this._listItems.length; i++) {
	        _loop(i);
	      }
	    }

	    /**
	     * Handles the text area key events
	     * @private
	     */
	  }, {
	    key: '_handleTextarea',
	    value: function _handleTextarea() {
	      this._textarea.addEventListener('keyup', this._onTextareaKeyUp);
	    }

	    /**
	     * Gets called when the user releases a key inside the text area
	     * @private
	     */
	  }, {
	    key: '_onTextareaKeyUp',
	    value: function _onTextareaKeyUp() {
	      this._resizeTextarea();
	      this._settings.text = this._textarea.value;
	      this._highlightDoneButton();
	    }

	    /**
	     * Resizes the text area to fit the text inside of it
	     * @private
	     */
	  }, {
	    key: '_resizeTextarea',
	    value: function _resizeTextarea() {
	      var scrollTop = this._textarea.scrollTop;

	      if (!scrollTop) {
	        var _scrollHeight = undefined,
	            height = undefined;
	        do {
	          _scrollHeight = this._textarea.scrollHeight;
	          height = this._textarea.offsetHeight;
	          this._textarea.style.height = height - 5 + 'px';
	        } while (_scrollHeight && _scrollHeight !== this._textarea.scrollHeight);
	      }

	      var scrollHeight = this._textarea.scrollHeight;
	      this._textarea.style.height = scrollHeight + 20 + 'px';
	    }

	    /**
	     * Handles the move knob dragging
	     * @private
	     */
	  }, {
	    key: '_handleMoveKnob',
	    value: function _handleMoveKnob() {
	      this._moveKnob.addEventListener('mousedown', this._onMoveKnobDown);
	      this._moveKnob.addEventListener('touchstart', this._onMoveKnobDown);
	    }

	    /**
	     * Gets called when the user clicks the move knob
	     * @private
	     */
	  }, {
	    key: '_onMoveKnobDown',
	    value: function _onMoveKnobDown(e) {
	      e.preventDefault();

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialPosition = this._settings.position.clone();

	      document.addEventListener('mousemove', this._onMoveKnobDrag);
	      document.addEventListener('touchmove', this._onMoveKnobDrag);

	      document.addEventListener('mouseup', this._onMoveKnobUp);
	      document.addEventListener('touchend', this._onMoveKnobUp);
	    }

	    /**
	     * Gets called when the user drags the move knob
	     * @private
	     */
	  }, {
	    key: '_onMoveKnobDrag',
	    value: function _onMoveKnobDrag(e) {
	      e.preventDefault();

	      var canvasSize = this._ui.canvas.size;

	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.clone().subtract(this._initialMousePosition);

	      var minPosition = new _libMathVector22['default'](0, 0);
	      var containerSize = new _libMathVector22['default'](this._container.offsetWidth, this._container.offsetHeight);
	      var maxPosition = canvasSize.clone().subtract(containerSize);
	      var position = this._initialPosition.clone().add(diff).clamp(minPosition, maxPosition);

	      this._settings.position = position;

	      this._container.style.left = position.x + 'px';
	      this._container.style.top = position.y + 'px';
	    }

	    /**
	     * Gets called when the user releases the move knob
	     * @private
	     */
	  }, {
	    key: '_onMoveKnobUp',
	    value: function _onMoveKnobUp() {
	      document.removeEventListener('mousemove', this._onMoveKnobDrag);
	      document.removeEventListener('touchmove', this._onMoveKnobDrag);

	      document.removeEventListener('mouseup', this._onMoveKnobUp);
	      document.removeEventListener('touchend', this._onMoveKnobUp);
	    }

	    /**
	     * Handles the resize knob dragging
	     * @private
	     */
	  }, {
	    key: '_handleResizeKnob',
	    value: function _handleResizeKnob() {
	      this._resizeKnob.addEventListener('mousedown', this._onResizeKnobDown);
	      this._resizeKnob.addEventListener('touchstart', this._onResizeKnobDown);
	    }

	    /**
	     * Gets called when the user clicks the resize knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onResizeKnobDown',
	    value: function _onResizeKnobDown(e) {
	      e.preventDefault();

	      this._initialMousePosition = _libUtils2['default'].getEventPosition(e);
	      this._initialMaxWidth = this._settings.maxWidth;

	      document.addEventListener('mousemove', this._onResizeKnobDrag);
	      document.addEventListener('touchmove', this._onResizeKnobDrag);

	      document.addEventListener('mouseup', this._onResizeKnobUp);
	      document.addEventListener('touchend', this._onResizeKnobUp);
	    }

	    /**
	     * Gets called when the user drags the resize knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onResizeKnobDrag',
	    value: function _onResizeKnobDrag(e) {
	      e.preventDefault();

	      var canvasSize = this._ui.canvas.size;
	      var mousePosition = _libUtils2['default'].getEventPosition(e);
	      var diff = mousePosition.subtract(this._initialMousePosition);

	      var position = this._settings.position.clone();
	      var maxWidthAllowed = canvasSize.x - position.x;

	      var maxWidth = this._initialMaxWidth + diff.x;
	      maxWidth = Math.max(100, Math.min(maxWidthAllowed, maxWidth));
	      this._settings.maxWidth = maxWidth;
	      this._textarea.style.width = maxWidth + 'px';

	      this._resizeTextarea();
	    }

	    /**
	     * Gets called when the user releases the resize knob
	     * @param {Event} e
	     * @private
	     */
	  }, {
	    key: '_onResizeKnobUp',
	    value: function _onResizeKnobUp() {
	      document.removeEventListener('mousemove', this._onResizeKnobDrag);
	      document.removeEventListener('touchmove', this._onResizeKnobDrag);

	      document.removeEventListener('mouseup', this._onResizeKnobUp);
	      document.removeEventListener('touchend', this._onResizeKnobUp);
	    }

	    /**
	     * Gets called when the user selects another color using
	     * the color picker.
	     * @param {Color} value
	     * @private
	     */
	  }, {
	    key: '_onForegroundColorUpdate',
	    value: function _onForegroundColorUpdate(value) {
	      this._settings.color = value;
	      this._applySettings();
	      this._highlightDoneButton();
	    }

	    /**
	     * Gets called when the user selects another color using
	     * the color picker.
	     * @param {Color} value
	     * @private
	     */
	  }, {
	    key: '_onBackgroundColorUpdate',
	    value: function _onBackgroundColorUpdate(value) {
	      this._settings.backgroundColor = value;
	      this._applySettings();
	      this._highlightDoneButton();
	    }

	    /**
	     * Styles the textarea to represent the current settings
	     * @private
	     */
	  }, {
	    key: '_applySettings',
	    value: function _applySettings() {
	      var textarea = this._textarea;
	      var settings = this._settings;

	      var canvasSize = this._ui.canvas.size;
	      var actualFontSize = settings.fontSize * canvasSize.y;

	      this._container.style.left = settings.position.x + 'px';
	      this._container.style.top = settings.position.y + 'px';

	      textarea.value = settings.text;
	      textarea.style.fontFamily = settings.fontFamily;
	      textarea.style.fontSize = actualFontSize + 'px';
	      textarea.style.fontWeight = settings.fontWeight;
	      textarea.style.lineHeight = settings.lineHeight;
	      textarea.style.color = settings.color.toRGBA();
	      textarea.style.backgroundColor = settings.backgroundColor.toRGBA();
	      textarea.style.width = settings.maxWidth + 'px';
	    }

	    /**
	     * Gets called when the user clicked a list item
	     * @private
	     */
	  }, {
	    key: '_onListItemClick',
	    value: function _onListItemClick(item) {
	      var manually = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      this._deactivateAllItems();

	      var name = item.getAttribute('data-name');
	      var weight = item.getAttribute('data-weight');
	      this._settings.fontFamily = name;
	      this._settings.fontWeight = weight;

	      this._applySettings();

	      _libUtils2['default'].classList(item).add('imglykit-controls-item-active');

	      if (manually) {
	        this._highlightDoneButton();
	      }
	    }

	    /**
	     * Deactivates all list items
	     * @private
	     */
	  }, {
	    key: '_deactivateAllItems',
	    value: function _deactivateAllItems() {
	      for (var i = 0; i < this._listItems.length; i++) {
	        var listItem = this._listItems[i];
	        _libUtils2['default'].classList(listItem).remove('imglykit-controls-item-active');
	      }
	    }

	    /**
	     * Adds the default fonts
	     * @private
	     */
	  }, {
	    key: '_addFonts',
	    value: function _addFonts() {
	      this.addFont('Helvetica', 'normal');
	      this.addFont('Verdana', 'normal');
	      this.addFont('Times New Roman', 'normal');
	    }

	    /**
	     * Adds a font with the given name and weight
	     * @param {String} name
	     * @param {String} weight
	     */
	  }, {
	    key: 'addFont',
	    value: function addFont(name, weight) {
	      this._fonts.push({ name: name, weight: weight });
	    }

	    /**
	     * Gets called when the done button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onDone',
	    value: function _onDone() {
	      var canvasSize = this._ui.canvas.size;
	      var padding = new _libMathVector22['default'](2, 2);
	      var position = this._settings.position.clone().add(padding).divide(canvasSize);

	      this._ui.canvas.setZoomLevel(this._initialZoomLevel, false);

	      this._operation = this._ui.getOrCreateOperation('text');
	      this._operation.set({
	        fontSize: this._settings.fontSize,
	        fontFamily: this._settings.fontFamily,
	        fontWeight: this._settings.fontWeight,
	        color: this._settings.color,
	        backgroundColor: this._settings.backgroundColor,
	        position: position,
	        text: this._settings.text,
	        maxWidth: this._settings.maxWidth / canvasSize.x
	      });
	      this._ui.canvas.render();

	      this._ui.addHistory(this, {
	        fontFamily: this._initialSettings.fontFamily,
	        fontWeight: this._initialSettings.fontWeight,
	        color: this._initialSettings.color.clone(),
	        backgroundColor: this._initialSettings.backgroundColor.clone(),
	        position: this._initialSettings.position.clone(),
	        text: this._initialSettings.text,
	        maxWidth: this._initialSettings.maxWidth
	      }, this._operationExistedBefore);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      if (this._operationExistedBefore) {
	        this._operation = this._ui.getOrCreateOperation('text');
	        this._operation.set(this._initialSettings);
	      } else {
	        this._ui.removeOperation('text');
	      }
	      this._ui.canvas.setZoomLevel(this._initialZoomLevel);
	    }

	    /**
	     * The data that is available to the template
	     * @type {Object}
	     * @override
	     */
	  }, {
	    key: 'context',
	    get: function get() {
	      var context = _get(Object.getPrototypeOf(TextControl.prototype), 'context', this);
	      context.fonts = this._fonts;
	      return context;
	    }
	  }]);

	  return TextControl;
	})(_control2['default']);

	TextControl.prototype.identifier = 'text';

	exports['default'] = TextControl;
	module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* global __DOTJS_TEMPLATE */
	/*
	 * Photo Editor SDK - photoeditorsdk.com
	 * Copyright (c) 2013-2015 9elements GmbH
	 *
	 * Released under Attribution-NonCommercial 3.0 Unported
	 * http://creativecommons.org/licenses/by-nc/3.0/
	 *
	 * For commercial use, please contact us at contact@9elements.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _control = __webpack_require__(92);

	var _control2 = _interopRequireDefault(_control);

	var _libMathVector2 = __webpack_require__(4);

	var _libMathVector22 = _interopRequireDefault(_libMathVector2);

	var _libUtils = __webpack_require__(15);

	var _libUtils2 = _interopRequireDefault(_libUtils);

	var _libSimpleSlider = __webpack_require__(101);

	var _libSimpleSlider2 = _interopRequireDefault(_libSimpleSlider);

	var _libColorPicker = __webpack_require__(104);

	var _libColorPicker2 = _interopRequireDefault(_libColorPicker);

	var _libColor = __webpack_require__(23);

	var _libColor2 = _interopRequireDefault(_libColor);

	var BrushControl = (function (_Control) {
	  _inherits(BrushControl, _Control);

	  function BrushControl() {
	    _classCallCheck(this, BrushControl);

	    _get(Object.getPrototypeOf(BrushControl.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * A unique string that identifies this control.
	   * @type {String}
	   */

	  _createClass(BrushControl, [{
	    key: 'init',

	    /**
	     * Entry point for this control
	     */
	    value: function init() {
	      var controlsTemplate = function(it
	/**/) {
	var out='';if(it.displayThickness){out+=' <div> '+( it.partials.slider)+' </div>';}else{out+=' <div> <ul class="imglykit-controls-list imglykit-controls-list-overflow"> <li class="imglykit-controls-item--with-label" id="imglykit-thickness-button"> <img src="'+(it.helpers.assetPath('ui/night/brush/thickness@2x.png') )+'" /> <div class="imglykit-controls-label">Thickness</div> </li> <li> '+( it.partials.colorPicker)+' </li> </ul> </div>';}return out;
	};
	      this._controlsTemplate = controlsTemplate;

	      var canvasControlsTemplate = function(it
	/**/) {
	var out='<div class="imglykit-canvas-brush-container"> <div class="imglykit-canvas-brush"> <canvas></canvas> </div> <div id="imglykit-brush-cursor"> </div></div>';return out;
	};
	      this._canvasControlsTemplate = canvasControlsTemplate;

	      this._partialTemplates.slider = _libSimpleSlider2['default'].template;
	      this._partialTemplates.colorPicker = _libColorPicker2['default'].template;

	      this._displayThickness = false;
	      this._painting = false;
	    }

	    /**
	     * Renders the controls
	     */
	  }, {
	    key: '_renderControls',
	    value: function _renderControls() {
	      this._partialTemplates.colorPicker.additionalContext = { label: this._ui.translate('controls.brush.color') };
	      _get(Object.getPrototypeOf(BrushControl.prototype), '_renderControls', this).call(this);
	    }

	    /**
	     * Gets called when this control is activated
	     * @override
	     */
	  }, {
	    key: '_onEnter',
	    value: function _onEnter() {
	      _get(Object.getPrototypeOf(BrushControl.prototype), '_onEnter', this).call(this);
	      this._handleThicknessButton();
	      this._setupCanvas();
	      this._setupOperation();
	      this._setupOptions();
	      this._bindEventHandlers();
	      this._setupContainer();
	      this._setupSlider();
	      this._initCurrentValues();
	      this._setupColorPicker();

	      this._initialZoomLevel = this._ui.canvas.zoomLevel;
	      this._ui.canvas.zoomToFit();

	      this._setupCursor();
	    }

	    /**
	     * Handles the thickness button
	     * @private
	     */
	  }, {
	    key: '_handleThicknessButton',
	    value: function _handleThicknessButton() {
	      if (this._displayThickness) return;

	      this._thicknessButton = this._controlsContainer.querySelector('#imglykit-thickness-button');
	      this._thicknessButton.addEventListener('click', this._onThicknessButtonClick.bind(this));
	    }

	    /**
	     * Gets called when the thickness button has been clicked
	     * @param  {Event} e
	     * @private
	     */
	  }, {
	    key: '_onThicknessButtonClick',
	    value: function _onThicknessButtonClick(e) {
	      e.preventDefault();
	      this._displayThickness = true;
	      this.enter();
	    }

	    /**
	     * This method sets the inital values for thickness and color.
	     * It will retrieve them from the opteration unless it has no values yet.
	     * In that case it will default some vales
	     */
	  }, {
	    key: '_initCurrentValues',
	    value: function _initCurrentValues() {
	      this._currentThickness = this._currentThickness || this._operation.getLastThickness();
	      this._currentColor = this._currentColor || this._operation.getLastColor();
	    }

	    /**
	     * Sets up the cursor
	     */
	  }, {
	    key: '_setupCursor',
	    value: function _setupCursor() {
	      this._cursor = this._canvasControls.querySelector('#imglykit-brush-cursor');
	      this._setCursorSize(this._currentThickness * this._getLongerSideSize());
	      this._setCursorColor(this._currentColor);
	    }

	    /**
	     * Sets the initital options up
	     */
	  }, {
	    key: '_setupOptions',
	    value: function _setupOptions() {
	      this._initialOptions = {
	        paths: this._operation.getPaths().slice(0)
	      };
	    }

	    /**
	     * Sets up the canvas
	     * @private
	     */
	  }, {
	    key: '_setupCanvas',
	    value: function _setupCanvas() {
	      var canvas = this._ui.canvas;

	      this._canvas = this._canvasControls.querySelector('canvas');
	      this._canvas.width = canvas.size.x;
	      this._canvas.height = canvas.size.y;
	    }

	    /**
	     * Sets up the operation
	     */
	  }, {
	    key: '_setupOperation',
	    value: function _setupOperation() {
	      this._operationExistedBefore = !!this._ui.operations.brush;
	      this._operation = this._ui.getOrCreateOperation('brush');
	    }

	    /**
	     * Sets up the container, adds events, etc
	     */
	  }, {
	    key: '_setupContainer',
	    value: function _setupContainer() {
	      this._container = this._canvasControls.querySelector('.imglykit-canvas-brush-container');
	      this._container.addEventListener('mousedown', this._onMouseDown);
	      this._container.addEventListener('touchstart', this._onMouseDown);
	      this._container.addEventListener('mouseup', this._onMouseUp);
	      this._container.addEventListener('touchend', this._onMouseUp);
	      document.addEventListener('mousemove', this._onMouseMove);
	      document.addEventListener('touchmove', this._onMouseMove);
	      this._container.addEventListener('mouseleave', this._onMouseLeave);
	    }

	    /**
	     * Bind event handlers
	     */
	  }, {
	    key: '_bindEventHandlers',
	    value: function _bindEventHandlers() {
	      this._onMouseDown = this._onMouseDown.bind(this);
	      this._onMouseUp = this._onMouseUp.bind(this);
	      this._onMouseMove = this._onMouseMove.bind(this);
	      this._onMouseLeave = this._onMouseLeave.bind(this);
	    }

	    /**
	     * Sets up the slider used to change the brush size
	     */
	  }, {
	    key: '_setupSlider',
	    value: function _setupSlider() {
	      if (!this._displayThickness) return;

	      var sliderElement = this._controls.querySelector('.imglykit-slider');
	      this._slider = new _libSimpleSlider2['default'](sliderElement, {
	        minValue: 0.01,
	        maxValue: 0.2
	      });
	      this._onThicknessUpdate = this._onThicknessUpdate.bind(this);
	      this._slider.on('update', this._onThicknessUpdate);
	      this._slider.setValue(this._currentThickness);
	    }

	    /**
	     * Sets up the color picker used to change the brush color
	     */
	  }, {
	    key: '_setupColorPicker',
	    value: function _setupColorPicker() {
	      if (this._displayThickness) return;

	      var colorPickerElement = this._controls.querySelector('.imglykit-color-picker');
	      this._colorPicker = new _libColorPicker2['default'](this._ui, colorPickerElement);
	      this._colorPicker.on('update', this._onColorUpdate.bind(this));
	      this._colorPicker.setValue(this._currentColor);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @private
	     */
	  }, {
	    key: '_onBackButtonClick',
	    value: function _onBackButtonClick() {
	      if (this._displayThickness) {
	        this._displayThickness = false;
	        return this.enter();
	      }

	      _get(Object.getPrototypeOf(BrushControl.prototype), '_onBackButtonClick', this).call(this);
	    }

	    /**
	     * Gets called when the back button has been clicked
	     * @override
	     */
	  }, {
	    key: '_onBack',
	    value: function _onBack() {
	      if (!this._operationExistedBefore && !this._operation.getPaths().length) {
	        this._ui.removeOperation('brush');
	      } else {
	        this._operation.dirty = true;
	      }
	      this._ui.canvas.setZoomLevel(this._initialZoomLevel);
	    }

	    /**
	     * Resets the operation options to the initial options
	     */
	  }, {
	    key: '_resetOperationSettings',
	    value: function _resetOperationSettings() {
	      this._operation.setPaths(this._initialOptions.paths);
	    }

	    /**
	     * Gets called when the user presses the mouse button.
	     * Here the painting phase is started
	     * @param  {Event} e
	     */
	  }, {
	    key: '_onMouseDown',
	    value: function _onMouseDown(e) {
	      var paths = this._operation.getPaths().slice(0);
	      this._operationExistedBeforeDraw = !!paths.length;
	      this._optionsBeforeDraw = { paths: paths };

	      if (_libUtils2['default'].isTouchEvent(e)) {
	        this._showCursor();
	      }
	      this._startPaint(e);
	    }

	    /**
	     * start painting
	     * @param  {Event} event
	     */
	  }, {
	    key: '_startPaint',
	    value: function _startPaint(event) {
	      event.preventDefault();
	      var mousePosition = this._getRelativeMousePositionFromEvent(event);
	      this._painting = true;

	      this._currentPath = this._operation.createPath(this._currentThickness, this._currentColor);
	      this._currentPath.addControlPoint(mousePosition);

	      this._redrawPath();
	    }

	    /**
	     * Gets called the the users releases the mouse button.
	     * Here the painting phase is stopped
	     * @param  {Event} e
	     */
	  }, {
	    key: '_onMouseUp',
	    value: function _onMouseUp(e) {
	      if (_libUtils2['default'].isTouchEvent(e)) {
	        this._hideCursor();
	      }
	      this._stopPaint();
	      this._ui.addHistory(this, {
	        paths: this._optionsBeforeDraw.paths
	      }, this._operationExistedBeforeDraw);
	    }

	    /**
	     * Stops the paint phase
	     */
	  }, {
	    key: '_stopPaint',
	    value: function _stopPaint() {
	      this._painting = false;
	    }

	    /**
	     * Redraws the current path
	     * @private
	     */
	  }, {
	    key: '_redrawPath',
	    value: function _redrawPath() {
	      this._operation.renderBrushCanvas(this._canvas, this._canvas);
	    }

	    /**
	     * Gets called when the user drags the mouse.
	     * If this happends while the mouse button is pressed,
	     * the visited points get added to the path
	     * @param  {Event} e
	     */
	  }, {
	    key: '_onMouseMove',
	    value: function _onMouseMove(e) {
	      var mousePosition = this._getRelativeMousePositionFromEvent(e);
	      if (!_libUtils2['default'].isTouchEvent(e)) {
	        this._moveCursorTo(mousePosition);
	        this._showCursor();
	      }
	      if (this._painting) {
	        this._currentPath.addControlPoint(mousePosition);
	        this._redrawPath();
	      }
	    }

	    /**
	     * Gets called when the user leaves the canvas.
	     * This will also stop the painting phase
	     * @param  {[type]} e [description]
	     * @return {[type]}   [description]
	     */
	  }, {
	    key: '_onMouseLeave',
	    value: function _onMouseLeave(e) {
	      this._hideCursor();
	    }

	    /**
	     * Calculates the mouse position, relative to the upper-left corner
	     * of the canvas
	     * @param  {Event} e
	     * @return {Vector2} The Mouse Position
	     */
	  }, {
	    key: '_getRelativeMousePositionFromEvent',
	    value: function _getRelativeMousePositionFromEvent(e) {
	      var clientRect = this._container.getBoundingClientRect();
	      var offset = new _libMathVector22['default'](clientRect.left, clientRect.top);
	      var absolutePosition = _libUtils2['default'].getEventPosition(e).subtract(offset);
	      return absolutePosition.divide(this._ui.canvas.size);
	    }

	    /**
	     * Gets called when the thickness has been changed
	     * @override
	     */
	  }, {
	    key: '_onThicknessUpdate',
	    value: function _onThicknessUpdate(value) {
	      this._currentThickness = value;
	      this._setCursorSize(this._currentThickness * this._getLongerSideSize());
	    }

	    /**
	     * Gets called when the color has been changed
	     * @override
	     */
	  }, {
	    key: '_onColorUpdate',
	    value: function _onColorUpdate(value) {
	      this._currentColor = value;
	      this._setCursorColor(value);
	    }

	    /**
	     * Returns the longer size of the ui canvas
	     * @return {Number}
	     */
	  }, {
	    key: '_getLongerSideSize',
	    value: function _getLongerSideSize() {
	      var size = this._ui.canvas.size;

	      return Math.max(size.x, size.y);
	    }

	    /**
	     * Moves our custom cursor to the specified position
	     * @param  {Vector2} position
	     */
	  }, {
	    key: '_moveCursorTo',
	    value: function _moveCursorTo(position) {
	      var halfThickness = this._currentThickness * this._getLongerSideSize() / 2.0;
	      this._cursor.style.left = position.x * this._ui.canvas.size.x - halfThickness + 'px';
	      this._cursor.style.top = position.y * this._ui.canvas.size.y - halfThickness + 'px';
	    }

	    /**
	     * Sets the curser size
	     * @param {Float} size
	     */
	  }, {
	    key: '_setCursorSize',
	    value: function _setCursorSize(size) {
	      this._cursor.style.width = size + 'px';
	      this._cursor.style.height = size + 'px';
	    }

	    /**
	     * Sets the cursor color
	     * @param {Color} color
	     */
	  }, {
	    key: '_setCursorColor',
	    value: function _setCursorColor(color) {
	      this._cursor.style.background = color.toHex();
	    }

	    /**
	     * Shows the cursor
	     */
	  }, {
	    key: '_showCursor',
	    value: function _showCursor() {
	      this._cursor.style.display = 'block';
	    }

	    /**
	     * Hides the cursor
	     */
	  }, {
	    key: '_hideCursor',
	    value: function _hideCursor() {
	      this._cursor.style.display = 'none';
	    }

	    /**
	     * The data that is available to the template
	     * @abstract
	     */
	  }, {
	    key: 'context',
	    get: function get() {
	      return {
	        displayThickness: this._displayThickness
	      };
	    }
	  }]);

	  return BrushControl;
	})(_control2['default']);

	BrushControl.prototype.identifier = 'brush';

	exports['default'] = BrushControl;
	module.exports = exports['default'];

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = {
		"operations": {
			"brightness": "Brightness",
			"contrast": "Contrast",
			"filters": "Filters",
			"flip": "Flip",
			"frames": "Frames",
			"radial-blur": "Radial Blur",
			"rotation": "Rotation",
			"saturation": "Saturation",
			"stickers": "Stickers",
			"text": "Text",
			"tilt-shift": "Tilt-Shift",
			"crop": "Crop",
			"brush": "Brush"
		},
		"top-controls": {
			"new": "New",
			"undo": "Undo",
			"export": "Export",
			"zoom": "Zoom"
		},
		"splash": {
			"upload": {
				"headline": "Upload a picture",
				"description": "Click here to upload a picture from your library or just drag and drop"
			},
			"or": "or",
			"webcam": {
				"headline": "Take a picture",
				"description": "Click here to take a picture with your webcam or phone"
			}
		},
		"generic": {
			"loading": "Loading",
			"exporting": "Exporting",
			"importing": "Importing",
			"color": "Color",
			"error_headline": "An error has occurred.",
			"warning_headline": "Warning!"
		},
		"controls": {
			"frames": {
				"color": "Color"
			},
			"brush": {
				"color": "Color"
			},
			"text": {
				"foreground": "Foreground",
				"background": "Background"
			}
		},
		"errors": {
			"context_lost": "Your browser took too long to render the image. Please try applying less operations.",
			"context_lost_limit": "Your browser failed multiple times while rendering the image."
		},
		"warnings": {
			"image_resized": "Your image exceeds the maximum size of $1 megapixels and has therefore been resized to $2x$3 pixels."
		}
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = {
		"operations": {
			"brightness": "Helligkeit",
			"contrast": "Kontrast",
			"filters": "Filter",
			"flip": "Spiegeln",
			"frames": "Rahmen",
			"radial-blur": "Radial Blur",
			"rotation": "Drehung",
			"saturation": "Sättigung",
			"stickers": "Sticker",
			"text": "Text",
			"tilt-shift": "Tilt-Shift",
			"crop": "Zuschneiden",
			"brush": "Malen"
		},
		"top-controls": {
			"new": "Neu",
			"undo": "Rückgängig",
			"export": "Exportieren",
			"zoom": "Zoom"
		},
		"splash": {
			"upload": {
				"headline": "Bild hochladen",
				"description": "Klicke hier, um ein Bild hochzuladen oder ziehe eine Bilddatei hier her"
			},
			"or": "oder",
			"webcam": {
				"headline": "Foto machen",
				"description": "Klicke hier, um ein Foto mit deiner Webcam oder deinem Smartphone zu machen"
			}
		},
		"generic": {
			"loading": "Laden",
			"exporting": "Exportiere",
			"importing": "Importiere",
			"error_headline": "Es ist ein Fehler aufgetreten.",
			"warning_headline": "Warnung!"
		},
		"controls": {
			"frames": {
				"color": "Farbe"
			},
			"brush": {
				"color": "Farbe"
			},
			"text": {
				"foreground": "Text",
				"background": "Hintergrund"
			}
		},
		"errors": {
			"context_lost": "Dein Browser hat zu lange gebraucht, um das Bild zu generieren. Bitte versuche es noch einmal.",
			"context_lost_limit": "Bild-Generierung ist mehrmals fehlgeschlagen."
		},
		"warnings": {
			"image_resized": "Dein Bild überschreitet die maximale Größe von $1 Megapixeln und wurde daher auf $2x$3 Pixel verkleinert."
		}
	};

/***/ }
/******/ ])
});
;