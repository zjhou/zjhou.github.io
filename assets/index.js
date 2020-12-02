System.register(["react","react-dom","prop-types","classnames","rxjs","immer"],(function(){"use strict";var e,n,t,r,o,i,a,u,c;return{setters:[function(r){e=r.default,n=r.createElement,t=r.useState},function(e){r=e.default},function(e){o=e.default},function(e){i=e.default},function(e){a=e.operators,u=e.fromEvent},function(e){c=e.default}],execute:function(){function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function d(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return t}}(e,n)||function(e,n){if(e){if("string"==typeof e)return p(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?p(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,n){return(h=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,n){return!n||"object"!==l(n)&&"function"!=typeof n?x(e):n}function b(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}!function(e,n){void 0===n&&(n={});var t=n.insertAt;if("undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".index-module_menu__Gbc_8 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n  .index-module_menu__Gbc_8 .index-module_hiddenMenuItemContainer__2Cs7V {\n    top: 100% !important; }\n\n.index-module_menuItemContainer__2Uzmj {\n  top: 0;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: #fff; }\n\n.index-module_menuItem__ApIQ6 {\n  box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  height: 100%; }\n\n.index-module_menuIcon__zJjUp {\n  position: absolute;\n  cursor: pointer;\n  top: 50px;\n  right: 50px; }\n");var _=function(n){var t=n.children,r=n.title,o=n.style,i=void 0===o?{}:o;return e.createElement("div",{className:"index-module_menuItem__ApIQ6",style:i},r,t)};_.propTypes={title:o.oneOf([o.string.isRequired,o.element.isRequired]).isRequired,style:o.shape({})};var y=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&h(e,n)}(o,e.PureComponent);var t,r=function(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=m(e);if(n){var o=m(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return v(this,t)}}(o);function o(n){var t;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,o),f(x(t=r.call(this,n)),"openMenu",(function(){if(t.state.activeMenuItemIndex===t.props.children.length)t.setState({isOpen:!0},(function(){t.props.onOpenStatusChange(!0)}));else{var e=t.props,n=e.transitionDuration,r=e.onSelect,o=t.props.children.length;t.setState({isOpen:!0},(function(){t.props.onOpenStatusChange(!0),setTimeout((function(){t.setState({activeMenuItemIndex:o},(function(){r(o-1)}))}),n/2)}))}})),f(x(t),"closeMenu",(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.props.onSelect,r=t.props,o=r.transitionDuration,i=r.onOpenStatusChange;t.setState({activeMenuItemIndex:e},(function(){setTimeout((function(){t.setState({isOpen:!1},(function(){i(!1),n(e)}))}),o)}))})),f(x(t),"genMenuItemClickHandler",(function(e){return function(n){n.stopPropagation(),t.closeMenu(e)}})),f(x(t),"renderMenuItem",(function(n,r){var o=t.props,a=o.menuItemOffset,u=o.transitionDuration,c=t.state,l=c.isOpen,s=r===c.activeMenuItemIndex+1,d=0===r,p=l&&!d?a:0,m=s&&!d?a:p;return e.createElement("div",{className:i("index-module_menuItemContainer__2Uzmj",f({},"index-module_hiddenMenuItemContainer__2Cs7V",s)),onClick:t.genMenuItemClickHandler(r),style:{top:p,left:m,transition:"all ".concat(u,"ms")}},n)})),f(x(t),"renderMenuItems",(function(e,n){if("number"==typeof n?n+=1:n=0,1===e.length)return t.renderMenuItem(e,n);var r=function(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return b(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?b(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(e),o=r[0],i=r.slice(1);return t.renderMenuItem([o,t.renderMenuItems(i,n)],n)})),f(x(t),"renderMenuIcon",(function(n){var r=t.props.menuIconRenderer,o={open:t.openMenu,isOpen:n},i=e.createElement("div",{onClick:t.openMenu,className:"index-module_menuIcon__zJjUp"},"OPEN");if(r)try{return r(o)}catch(e){return i}return i})),t.state={isOpen:!!t.props.defaultOpen,activeMenuItemIndex:n.children.length},t}return(t=[{key:"render",value:function(){var n=this.props.children,t=this.state.isOpen;return e.createElement("div",{className:i("index-module_menu__Gbc_8")},this.renderMenuItems(n),this.renderMenuIcon(t))}}])&&function(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(o.prototype,t),o}();function g(e,n){void 0===n&&(n={});var t=n.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}f(y,"propTypes",{defaultOpen:o.bool.isRequired,transitionDuration:o.number,menuItemOffset:o.number,menuIconRenderer:o.func,onOpenStatusChange:o.func,onSelect:o.func}),f(y,"defaultProps",{menuItemOffset:50,menuIconRenderer:null,onOpenStatusChange:function(){return null},onSelect:function(){return null},transitionDuration:300});g(".index-module_IconText__1FYPn {\n  display: inline-flex;\n  align-items: center;\n  font-size: 12px; }\n\n.index-module_icon__2zvmM {\n  display: flex;\n  margin-right: 5px; }\n");var w=function(n){return e.createElement("span",{className:i("index-module_IconText__1FYPn",n.className||""),style:{color:n.color||"black"},onClick:n.onClick||function(){return null}},e.createElement("span",{className:"index-module_icon__2zvmM"},n.icon),n.text||n.children)};g(".index-module_MenuButton__PLqN9 {\n  position: fixed;\n  border: none;\n  outline: none;\n  top: 50px;\n  left: 50px;\n  width: 25px;\n  height: 26px;\n  border-radius: 0;\n  opacity: 0;\n  box-shadow: #6bcba88f -8px -8px 3px 0, #6bcba859 -20px -20px 10px 0;\n  background: #51c49f;\n  z-index: 1;\n  transition: all .3s;\n  cursor: pointer;\n  pointer-events: none; }\n  .index-module_MenuButton__PLqN9:active {\n    bottom: 23px;\n    right: 17px;\n    box-shadow: #6bcba88f -1px -1px 0 0; }\n\n.index-module_show__3KAOD {\n  pointer-events: all;\n  transition-delay: .3s;\n  opacity: 1;\n  box-shadow: #6bcba88f -5px -5px 0 0, #6bcba859 -10px -10px 0 0; }\n");var B=function(n){var t=n.onClick,r=n.className,o=n.style,a=n.hidden;return e.createElement("button",{type:"button",style:o,className:i("index-module_MenuButton__PLqN9",r,s({},"index-module_show__3KAOD",!a)),onClick:t})};function O(){return(O=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var S=n("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14 14a6 6 0 00-12 0h12z",fill:"#82D5BB"}),E=n("ellipse",{cx:8,cy:5.6,rx:3,ry:3.6,fill:"#51C49F"});function C(){return(C=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var P=n("path",{fill:"#9DDEC9",d:"M2 2h12v3H2z"}),k=n("path",{fill:"#9DDEC9",d:"M2 2h3v12H2z"}),M=n("path",{d:"M5 2h1v2H5V2zM13 2h1v3h-1zM9 2h1v2H9zM2 5h2v1H2zM2 9h2v1H2zM2 13h3v1H2z",fill:"#51C49F"}),j=n("path",{fill:"#F1FFFA",d:"M5 5h9v9H5z"});function R(){return(R=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var I=n("path",{d:"M11 4H6l5 5V4z",fill:"#82D5BB"}),N=n("path",{d:"M2 8l4-4 5 5-4 4-5-5z",fill:"#82D5BB"}),z=n("path",{d:"M14 3H9l5 5V3z",fill:"#51C49F"}),A=n("path",{d:"M4 8l5-5 5 5-5 5-5-5z",fill:"#51C49F"}),D=n("rect",{x:10,y:5,width:2,height:2,rx:1,fill:"#C2EADE"});function T(e){return n("svg",R({width:16,height:16,fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),I,N,z,A,D)}function q(){return(q=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var H=n("path",{fill:"#9DDEC9",d:"M2 4h12v8H2z"}),F=n("path",{d:"M7.973 9.293L2.189 4h11.568L7.973 9.293z",fill:"#51C49F"});function L(e){return n("svg",q({width:16,height:16,fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),H,F)}function Y(){return(Y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var Q=n("path",{d:"M12.966 5.382c.01-.54-.108-1.085-.204-1.622a3.042 3.042 0 00-.167-.538.3.3 0 00-.333-.188c-.087.02-.166.038-.242.063-.8.263-1.54.648-2.251 1.094a.614.614 0 01-.35.073c-.277-.02-.55-.088-.825-.102a9.232 9.232 0 00-2.041.107.45.45 0 01-.297-.05c-.775-.502-1.582-.931-2.49-1.173-.138-.036-.277-.016-.312.038a.399.399 0 00-.05.104c-.098.344-.215.688-.271 1.04-.069.42-.133.852-.101 1.271.02.264-.053.426-.197.611-.483.622-.7 1.336-.714 2.118a6.05 6.05 0 00.281 1.962c.312.98.916 1.716 1.823 2.195.746.393 1.56.545 2.393.575.75.026 1.502.003 2.252.008.752.005 1.495-.062 2.215-.298.721-.235 1.344-.613 1.829-1.21.7-.86.917-1.874.961-2.948.035-.82-.133-1.592-.613-2.264-.194-.272-.304-.506-.296-.866zm-1.45 6.289c-.323.28-.718.411-1.122.507-.793.19-1.6.237-2.41.202a8.688 8.688 0 01-2.37-.198c-.576-.136-1.1-.362-1.466-.856-.582-.784-.73-2.278.23-3.093.245-.208.519-.34.842-.36.356-.023.712-.067 1.069-.063.899.011 1.797.056 2.696.063.41.002.823-.093 1.231-.069.371.023.76.09 1.096.24.56.249.862.753.953 1.342.137.875-.042 1.673-.749 2.285z",fill:"#51C49F"}),V=n("path",{d:"M10.05 11.106c.474 0 .857-.513.857-1.145s-.383-1.145-.856-1.145c-.474 0-.857.513-.857 1.145s.383 1.145.857 1.145zM5.963 11.106c.474 0 .857-.513.857-1.145s-.383-1.145-.857-1.145c-.473 0-.856.513-.856 1.145s.383 1.145.856 1.145z",fill:"#51C49F"});function W(e){return n("svg",Y({width:16,height:16,fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),Q,V)}function U(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function G(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function X(e,n,t){return n&&G(e.prototype,n),t&&G(e,t),e}function Z(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function K(){return(K=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function J(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function $(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?J(Object(t),!0).forEach((function(n){Z(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):J(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function ee(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&te(e,n)}function ne(e){return(ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function te(e,n){return(te=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function re(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function oe(e,n){return!n||"object"!=l(n)&&"function"!=typeof n?re(e):n}function ie(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=ne(e);if(n){var o=ne(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return oe(this,t)}}!function(e,n){void 0===n&&(n={});var t=n.insertAt;if("undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".index-module_canvas__1uoln {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0; }\n  .index-module_canvas__1uoln .index-module_previewBox__CCpP_ {\n    position: absolute;\n    border: solid 1px #0078d7;\n    background: #b9d5f1; }\n  .index-module_canvas__1uoln .index-module_staticBoxContainer__1CnUk {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0; }\n  .index-module_canvas__1uoln .index-module_clearBtn__3St5Q {\n    position: absolute;\n    bottom: 50px;\n    right: 50px;\n    cursor: pointer;\n    z-index: 2; }\n");var ae=a.windowWhen,ue=a.map,ce=a.skip,le=a.mergeAll,se=a.takeUntil,de=function(){return null},pe=function(n){ee(r,e.PureComponent);var t=ie(r);function r(n){var o;return U(this,r),Z(re(o=t.call(this,n)),"resetPreviewBoxState",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:de;o.setState((function(n){return e(n),{previewBoxStartX:0,previewBoxStartY:0,previewBoxWidth:0,previewBoxHeight:0}}),(function(){n()}))})),Z(re(o),"setPreviewBoxStartPos",(function(e){var n=e.x,t=e.y;o.setState({previewBoxStartX:n,previewBoxStartY:t,previewBoxWidth:0,previewBoxHeight:0})})),Z(re(o),"setPreviewBoxSize",(function(e){var n=e.x,t=e.y,r=o.state,i=r.previewBoxStartX,a=r.previewBoxStartY;o.setState({previewBoxWidth:n-i,previewBoxHeight:t-a})})),Z(re(o),"initDrawingObservables",(function(){var e=u(document,"mousemove"),n=u(document,"mousedown"),t=u(document,"mouseup");e.pipe(ae((function(){return n})),ue((function(e){return e.pipe(se(t))})),ce(1),le()).subscribe(o.setPreviewBoxSize),n.subscribe(o.setPreviewBoxStartPos),t.subscribe(o.onDrawBoxDone)})),Z(re(o),"onDrawBoxDone",(function(){o.resetPreviewBoxState((function(e){if(e.previewBoxWidth&&e.previewBoxWidth){var n=$($({},e),{},{width:Math.abs(e.previewBoxWidth),height:Math.abs(e.previewBoxHeight),boxStyle:o.getPreviewBoxStyle()});o.props.onPreviewDone(n)}}))})),Z(re(o),"getPreviewBoxStyle",(function(){var e=o.state,n=e.previewBoxStartX,t=e.previewBoxStartY,r=e.previewBoxWidth,i=e.previewBoxHeight,a={width:Math.abs(r),height:Math.abs(i)},u={left:r>=0?n:n+r,top:i>=0?t:t+i};return Object.assign({position:"absolute"},u,a)})),Z(re(o),"renderPreviewBox",(function(){var n=o.getPreviewBoxStyle();return n.width&&n.height?o.props.renderer?o.props.renderer(n):e.createElement("div",{style:n,className:"index-module_previewBox__CCpP_"}):null})),o.state={previewBoxStartX:0,previewBoxStartY:0,previewBoxWidth:0,previewBoxHeight:0,boxesProps:[]},o}return X(r,[{key:"componentDidMount",value:function(){this.initDrawingObservables()}},{key:"render",value:function(){return this.renderPreviewBox()}}]),r}();Z(pe,"propTypes",{onPreviewDone:o.func,renderer:o.func}),Z(pe,"defaultProps",{onPreviewDone:de,renderer:null});var fe=c.produce,me=function(n){ee(r,e.PureComponent);var t=ie(r);function r(e){var n;return U(this,r),Z(re(n=t.call(this,e)),"setBoxState",(function(e){n.setState((function(n){return fe(n,(function(n){e(n.boxesProps)}))}))})),Z(re(n),"addBox",(function(e){n.setBoxState((function(n){n.push(e)}))})),Z(re(n),"removeBox",(function(e){n.setBoxState((function(n){n[e]=null}))})),Z(re(n),"removeAllBoxes",(function(){n.setBoxState((function(e){e.splice(0,e.length)}))})),Z(re(n),"updateBox",(function(e,t){n.setBoxState((function(n){t(n[e])}))})),n.state={boxesProps:[]},n}return X(r,[{key:"render",value:function(){var e=this.state.boxesProps;return(0,this.props.children)({addBox:this.addBox,removeBox:this.removeBox,updateBox:this.updateBox,clearBoxes:this.removeAllBoxes,boxes:e.slice()})}}]),r}();Z(me,"propTypes",{children:o.func.isRequired});var he=o.shape({left:o.number.isRequired,top:o.number.isRequired,height:o.number.isRequired,width:o.number.isRequired,position:o.string.isRequired}),xe=o.shape({previewBoxStartX:o.number.isRequired,previewBoxStartY:o.number.isRequired,previewBoxWidth:o.number.isRequired,previewBoxHeight:o.number.isRequired,width:o.number.isRequired,height:o.number.isRequired,boxIndex:o.number.isRequired,boxStyle:he,remove:o.func.isRequired,update:o.func.isRequired}),ve=function(n){ee(r,e.PureComponent);var t=ie(r);function r(n){var o;return U(this,r),Z(re(o=t.call(this,n)),"getPosAfterAttach",(function(e,n){var t=o.props.attachLineGutter;if(!t||"number"!=typeof t||t<0)return e;if(n)return e+(t-e%t);var r=e%t;return e-r<0?e:e-r})),Z(re(o),"handleClear",(function(e){e.stopPropagation(),o.props.clearBoxes()})),Z(re(o),"renderPreviewBox",(function(){var n=o.props,t=n.addBox,r=n.removeBox,i=n.updateBox,a=n.boxes;return e.createElement(pe,{renderer:o.props.previewBoxRenderer,onPreviewDone:function(e){var n=a.length;t($($({},e),{},{boxIndex:n,remove:function(){r(n)},update:function(e){i(n,e)}}))}})})),Z(re(o),"renderClearButton",(function(){var n=e.createElement("button",{onClick:o.handleClear,className:"index-module_clearBtn__3St5Q"},"reset");if(o.props.clearButtonRenderer)try{return o.props.clearButtonRenderer({clear:o.handleClear})}catch(e){return n}return n})),Z(re(o),"renderStaticBoxes",(function(){var n=o.props,t=n.staticBoxRenderer,r=n.boxes.map((function(n){return n?e.createElement("div",{style:$($({},n.boxStyle),{},{width:o.getPosAfterAttach(n.boxStyle.width,!0),height:o.getPosAfterAttach(n.boxStyle.height,!0),left:o.getPosAfterAttach(n.boxStyle.left),top:o.getPosAfterAttach(n.boxStyle.top)})},t(n)):null}));return e.createElement("div",{className:"index-module_staticBoxContainer__1CnUk"},r)})),o}return X(r,[{key:"render",value:function(){return e.createElement("div",{className:"index-module_canvas__1uoln"},this.renderStaticBoxes(),this.renderPreviewBox(),this.renderClearButton())}}]),r}();Z(ve,"propTypes",{staticBoxRenderer:o.func,previewBoxRenderer:o.func,clearButtonRenderer:o.func,attachLineGutter:o.number,addBox:o.func.isRequired,clearBoxes:o.func.isRequired,removeBox:o.func.isRequired,updateBox:o.func.isRequired,boxes:o.arrayOf(xe).isRequired}),Z(ve,"defaultProps",{staticBoxRenderer:function(){return null},clearButtonRenderer:null,previewBoxRenderer:null,attachLineGutter:0});var be=function(n){return e.createElement(me,null,(function(t){return e.createElement(ve,K({},n,t))}))};g("/**** Colors ****/\n.renderer_previewBox__2dmV7 {\n  position: absolute;\n  border: solid 1px #bdbdbd;\n  background: #f2f2f2;\n  opacity: 1;\n  transition: opacity .3s, background .3s;\n  overflow: visible;\n  color: #bdbdbd; }\n  .renderer_previewBox__2dmV7:after {\n    min-width: 300px;\n    text-align: right;\n    content: attr(data-size);\n    display: block;\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    padding: 5px 10px;\n    font-size: 10px; }\n\n.renderer_active__1uv-m {\n  border: solid 1px #9ddec9;\n  background: #f1fffa;\n  opacity: .9;\n  color: #82d5bb; }\n\n.renderer_toolbar__3NzoQ {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 5px; }\n\n.renderer_delete__TcyxB {\n  color: #999;\n  transition: color .3s;\n  border: none;\n  background: none;\n  outline: none;\n  cursor: pointer; }\n  .renderer_delete__TcyxB.renderer_big__18h3p {\n    font-size: 18px;\n    font-weight: bold; }\n  .renderer_delete__TcyxB.renderer_black__1fu1s {\n    color: black; }\n  .renderer_delete__TcyxB.renderer_red__2r-e_, .renderer_delete__TcyxB:hover {\n    color: #ff8888; }\n");var _e=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,t=e.width,r=e.height;return t>n&&r>n},ye=function(e){return _e(e)&&function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:900,t=e.width,r=e.height;return t<n&&r<n}(e,500)},ge=function(e){return _e(e,500)},we=function(){return!1};g(".index_blinkDot__2tjy6 {\n  animation-name: index_blink-dot__1LEXQ;\n  animation-duration: .3s;\n  animation-iteration-count: infinite; }\n\n@keyframes index_blink-dot__1LEXQ {\n  from {\n    color: #fff; }\n  to {\n    color: #6BCBA8; } }\n\n.index_tickLoader__3YNeg {\n  display: inline-block; }\n  .index_tickLoader__3YNeg:before, .index_tickLoader__3YNeg:after {\n    content: '';\n    display: block;\n    width: 6px;\n    background: #51c49f;\n    height: 1px; }\n  .index_tickLoader__3YNeg:before {\n    margin-bottom: 5px;\n    animation: index_tick__VlCnY .5s infinite; }\n  .index_tickLoader__3YNeg:after {\n    animation: index_tick__VlCnY .5s infinite reverse; }\n\n.index_center__1q1uQ {\n  position: absolute;\n  top: 50%;\n  left: 50%; }\n\n@keyframes index_tick__VlCnY {\n  0% {\n    width: 6px;\n    background: #c2eade; }\n  50% {\n    width: 12px;\n    background: #51c49f; }\n  100% {\n    width: 6px;\n    background: #c2eade; } }\n");var Be=function(n){var t=n.absCenter,r=n.style;return e.createElement("div",{style:r,className:i("index_tickLoader__3YNeg",s({},"index_center__1q1uQ",t))})},Oe=function(n){var t={background:"white",width:"100%",height:"100%",padding:n.padding||0,border:"solid 1px #ddd"};return e.createElement("div",{style:t},n.children)},Se=function(n){return e.createElement("button",{style:n.style||{},className:i("renderer_delete__TcyxB",n.className),onClick:n.onClick},"✕")},Ee=function(n){return e.createElement("div",{className:"renderer_toolbar__3NzoQ"},e.createElement(Se,{onClick:n.remove}))};Ee.propTypes={remove:o.func.isRequired};var Ce=function(){return null},Pe=[[function(n){var r=n.width,o=n.height,i=d(t(!0),2),a=i[0],u=i[1];return e.createElement(Oe,null,e.createElement("iframe",{onLoad:function(){u(!1)},width:r,frameBorder:"none",height:o,style:{position:"absolute"},src:"https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNqS0N6THcwmfvK3QIn9crW%2FHOME%3Fnode-id%3D0%253A1&chrome=DOCUMENTATION"}),a&&e.createElement(Be,{absCenter:!0}),e.createElement(Ee,n))},ge],[function(n){return e.createElement(Oe,{padding:10},e.createElement(Ee,n))},ye]],ke=function(n){var t=function(e,n){var t=[Ce,we],r=e.find((function(e){var t=d(e,2);return t[0],(0,t[1])(n)}))||t;return d(r,1)[0]}(Pe,n);return e.createElement(t,n)},Me=function(n){var t=ge(n)||ye(n),r="".concat(n.width,"px ").concat(n.height,"px");return e.createElement("div",{style:n,className:i("renderer_previewBox__2dmV7",s({},"renderer_active__1uv-m",t)),"data-size":r})},je=function(e){return null};g(".index_canvasPage__visZ5 {\n  height: 100%;\n  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(-90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(transparent 3px, #fff 3px, #fff 78px, transparent 78px), linear-gradient(-90deg, #82d5bb 1px, transparent 1px), linear-gradient(-90deg, transparent 3px, #fff 3px, #fff 78px, transparent 78px), linear-gradient(#82d5bb 1px, transparent 1px), #fff;\n  background-size: 4px 4px,\r 4px 4px,\r 80px 80px,\r 80px 80px,\r 80px 80px,\r 80px 80px,\r 80px 80px,\r 80px 80px; }\n  .index_canvasPage__visZ5 * {\n    user-select: none; }\n");var Re="about_kwd__7MOMZ",Ie="about_normal__3eG88";g(".about_about__dEsbc {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-start;\n  position: absolute;\n  bottom: 100px;\n  left: 50%; }\n  .about_about__dEsbc > span {\n    margin-bottom: 5px; }\n\n.about_kwd__7MOMZ {\n  color: #51c49f; }\n\n.about_normal__3eG88 {\n  color: #333; }\n");var Ne,ze=function(){return e.createElement("span",null,e.createElement("span",{className:Re},"'hi#zjh.im'"),e.createElement("span",{className:Ie},".replace("),e.createElement("span",{className:Re},"'#'"),e.createElement("span",{className:Ie},", "),e.createElement("span",{className:Re},"'@'"),e.createElement("span",{className:Ie},")"))},Ae={about:{title:"关于",icon:function(e){return n("svg",O({width:16,height:16,fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),S,E)},component:function(n){return e.createElement("div",{className:"about_about__dEsbc"},e.createElement(w,{color:"#333",icon:e.createElement(W,null),text:"@zjhou"}),e.createElement(w,{icon:e.createElement(L,null),text:e.createElement(ze,null)}),e.createElement(w,{icon:e.createElement(T,null),text:"v".concat("0.0.2")}))}},canvas:{title:"画布",icon:function(e){return n("svg",C({width:16,height:16,fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),P,k,M,j)},component:function(){return e.createElement("div",{className:"index_canvasPage__visZ5"},e.createElement(be,{attachLineGutter:4,clearButtonRenderer:je,staticBoxRenderer:ke,previewBoxRenderer:Me}))}}},De=[Ae.canvas,Ae.about],Te=function(n){var t=n.icon,r=n.title;return e.createElement("div",{style:{position:"absolute",top:15,left:15}},e.createElement(w,{icon:t,color:"#51c49f"},r||n.children))},qe=function(){var n=d(t(!1),2),r=n[0],o=n[1],i=d(t(De.length-1),2),a=i[0],u=i[1];return e.createElement(y,{defaultOpen:r,onOpenStatusChange:o,onSelect:u,menuIconRenderer:function(n){var t=n.open;return e.createElement(B,{onClick:t,hidden:r})}},De.map((function(n,t){var o=n.title,i=n.component,u=n.icon;return e.createElement(_,{title:r&&e.createElement(Te,{icon:e.createElement(u,null)},o)},t===a&&e.createElement(i,null))})))};Ne=document.getElementById("gui"),r.render(e.createElement(qe,null),Ne)}}}));
