System.register(["react","react-dom","prop-types","classnames","@bbbottle/bbicons","rxjs","@bbbottle/box-canvas"],(function(){"use strict";var e,n,t,r,o,i,a,c,u,l,s,d,f,p,m,_,h,b,g;return{setters:[function(o){e=o.default,n=o.useState,t=o.useEffect,r=o.useRef},function(e){o=e.default},function(e){i=e.default},function(e){a=e.default},function(e){c=e.AboutIcon,u=e.GithubIcon,l=e.MailIcon,s=e.TagIcon,d=e.RulerIcon,f=e.PostIcon,p=e.PhotoIcon},function(e){m=e.ajax,_=e.operators,h=e.fromEvent,b=e.interval},function(e){g=e.BoxCanvas}],execute:function(){function v(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function x(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,n,t){return n&&x(e.prototype,n),t&&x(e,t),e}function w(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function E(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function O(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?E(Object(t),!0).forEach((function(n){w(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):E(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function P(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&k(e,n)}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function k(e,n){return(k=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function I(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?I(e):n}function N(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=C(e);if(n){var o=C(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return S(this,t)}}function j(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}}(e,n)||function(e,n){if(e){if("string"==typeof e)return M(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?M(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function A(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function T(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function R(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function D(e,n){return(D=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function z(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?L(e):n}!function(e,n){void 0===n&&(n={});var t=n.insertAt;if("undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".index-module_menu__Gbc_8 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n  .index-module_menu__Gbc_8 .index-module_hiddenMenuItemContainer__2Cs7V {\n    top: calc(100% + 20px) !important; }\n\n.index-module_menuItemContainer__2Uzmj {\n  top: 0;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: #fff; }\n\n.index-module_menuItem__ApIQ6 {\n  box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  height: 100%; }\n\n.index-module_menuIcon__zJjUp {\n  position: absolute;\n  cursor: pointer;\n  top: 50px;\n  right: 50px; }\n");var F=function e(n){var t=this;A(this,e),T(this,"transition",(function(e,n){return t.STATE_TRANS_MAP.get(t.buildStateTransMapKey(e,n))})),T(this,"output",(function(e){switch(e){case"opened":return{isOpen:!0,hideIcon:!0,selectedIndex:t.pagesCount};default:return{isOpen:!1,hideIcon:!1,selectedIndex:e}}})),T(this,"buildPagesIndex",(function(e){return Array.from(Array(e).keys())})),T(this,"buildStateTransMapKey",(function(e,n){return"".concat(e,"-").concat(n)})),T(this,"buildStateTransMap",(function(){var e=new Map;return e.set(t.buildStateTransMapKey("closed","click_icon"),"opened"),t.pagesIndex.forEach((function(n){e.set(t.buildStateTransMapKey("opened",n),n),e.set(t.buildStateTransMapKey(n,"click_icon"),"opened")})),e})),this.pagesCount=n,this.pagesIndex=this.buildPagesIndex(n),this.STATE_TRANS_MAP=this.buildStateTransMap()};F.OPENED="opened",F.CLOSED="closed",F.CLICK_ICON="click_icon";var H=function(n){var t=n.children,r=n.title,o=n.style,i=void 0===o?{}:o;return e.createElement("div",{className:"index-module_menuItem__ApIQ6",style:i},r,t)};H.propTypes={title:i.oneOf([i.string.isRequired,i.element.isRequired]).isRequired,style:i.shape({})};var q=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&D(e,n)}(o,e.PureComponent);var t,r=function(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=B(e);if(n){var o=B(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return z(this,t)}}(o);function o(n){var t;A(this,o),T(L(t=r.call(this,n)),"transition",(function(e){var n=t.state.menuState,r=t.fsm.transition(n,e);if(void 0!==r){var o=t.fsm.output(r);t.setState(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?R(Object(t),!0).forEach((function(n){T(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):R(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({menuState:r},o))}})),T(L(t),"getItemOffset",(function(e){if(0===e)return 0;var n=t.props.menuItemOffset,r=t.state,o=r.isOpen,i=r.selectedIndex;return(o||e>i?n:0)*e})),T(L(t),"genMenuItemClickHandler",(function(e){return function(n){n.stopPropagation(),t.transition(e),t.props.onSelect(e)}})),T(L(t),"handleIconClick",(function(){t.transition(F.CLICK_ICON)})),T(L(t),"renderMenuItems",(function(n){return n.map((function(n,r){var o=r>t.state.selectedIndex,i=t.getItemOffset(r);return e.createElement("div",{className:a("index-module_menuItemContainer__2Uzmj",T({},"index-module_hiddenMenuItemContainer__2Cs7V",o)),onClick:t.genMenuItemClickHandler(r),style:{top:i,left:i,transition:"all ".concat(t.props.transitionDuration,"ms")}},n)}))})),T(L(t),"renderMenuIcon",(function(n){var r=t.props.menuIconRenderer,o={open:t.handleIconClick,isOpen:n},i=e.createElement("div",{onClick:t.handleIconClick,className:"index-module_menuIcon__zJjUp"},"OPEN");if(r)try{return r(o)}catch(e){return i}return i}));var i=n.children.length;return t.fsm=new F(i),t.state={menuState:F.CLOSED,selectedIndex:i},t}return(t=[{key:"render",value:function(){var n=this.props.children,t=this.state.isOpen;return e.createElement("div",{className:a("index-module_menu__Gbc_8")},this.renderMenuIcon(t),this.renderMenuItems(n))}}])&&function(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(o.prototype,t),o}();function G(e,n){void 0===n&&(n={});var t=n.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}T(q,"propTypes",{defaultOpen:i.bool.isRequired,transitionDuration:i.number,menuItemOffset:i.number,menuIconRenderer:i.func,onOpenStatusChange:i.func,onSelect:i.func}),T(q,"defaultProps",{menuItemOffset:50,menuIconRenderer:null,onOpenStatusChange:function(){return null},onSelect:function(){return null},transitionDuration:300});G(".index-module_IconText__1FYPn {\n  display: inline-flex;\n  align-items: center;\n  font-size: 12px; }\n\n.index-module_icon__2zvmM {\n  display: flex;\n  margin-right: 5px; }\n");var Q=function(n){return e.createElement("span",{className:a("index-module_IconText__1FYPn",n.className||""),style:{color:n.color||"black"},onClick:n.onClick||function(){return null}},e.createElement("span",{className:"index-module_icon__2zvmM"},n.icon),n.text||n.children)};G(".index-module_MenuButton__PLqN9 {\n  position: fixed;\n  border: none;\n  outline: none;\n  top: 50px;\n  left: 50px;\n  width: 25px;\n  height: 26px;\n  border-radius: 0;\n  opacity: 0;\n  box-shadow: #6bcba88f -8px -8px 3px 0, #6bcba859 -20px -20px 10px 0;\n  background: #51c49f;\n  z-index: 1;\n  transition: all .3s;\n  cursor: pointer;\n  pointer-events: none; }\n  .index-module_MenuButton__PLqN9:active {\n    bottom: 23px;\n    right: 17px;\n    box-shadow: #6bcba88f -1px -1px 0 0; }\n\n.index-module_show__3KAOD {\n  pointer-events: all;\n  transition-delay: .3s;\n  opacity: 1;\n  box-shadow: #6bcba88f -0px -0px 0 0, #6bcba859 0px 0px 0 0; }\n");var U=function(n){var t=n.onClick,r=n.className,o=n.style,i=n.hidden;return e.createElement("button",{type:"button",style:o,className:a("index-module_MenuButton__PLqN9",r,w({},"index-module_show__3KAOD",!i)),onClick:t})},V=m.ajax,Y=function(e){var n=V.getJSON(e);return new Promise((function(e){return n.subscribe(e)}))},K=function(e){var r=j(n(!0),2),o=r[0],i=r[1],a=j(n(null),2),c=a[0],u=a[1],l=e.url,s=e.children;return t((function(){Y(l).then((function(e){u(e),i(!1)}))}),[]),s({loading:o,data:c})},Z=function(e){var n=e.onLeftClick,t=void 0===n?function(e){return null}:n,r=e.onRightClick,o=void 0===r?function(e){return null}:r;return function(e){var n=window.innerWidth/2;(e.clientX>n?o:t)(e)}},W=function(n){P(r,e.PureComponent);var t=N(r);function r(e){var n;return v(this,r),w(I(n=t.call(this,e)),"getStateByPropsAndCurrentPageIndex",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.props,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.currentPageIndex,r=e.pageSize,o=e.data,i=e.infiniteLoopMode,a=Math.ceil(o.length/r),c=(t-1)*r,u=t*r,l=o.slice(c,u)||[],s=t<a,d=[];if(s){var f=t*r,p=(t+1)*r;d=o.slice(f,p)||[]}else i&&(d=o.slice(0,r));return{hasNextPage:s,hasPrevPage:t>1,currentPageIndex:t,currentPageData:l,nextPageData:d,totalPages:a}})),w(I(n),"next",(function(){(n.state.hasNextPage||n.props.infiniteLoopMode)&&n.setState((function(e){return n.getStateByPropsAndCurrentPageIndex(n.props,e.hasNextPage?e.currentPageIndex+1:1)}))})),w(I(n),"prev",(function(){(n.state.hasPrevPage||n.props.infiniteLoopMode)&&n.setState((function(e){return n.getStateByPropsAndCurrentPageIndex(n.props,e.hasPrevPage?e.currentPageIndex-1:e.totalPages)}))})),w(I(n),"isValidProps",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.props,t=e.data,r=e.pageSize,o=e.currentPageIndex,i=void 0===o?1:o,a=Math.ceil(t.length/r);return t.length&&r>0&&i>=1&&i<=a})),n.isValidProps(e)?(n.state=n.getStateByPropsAndCurrentPageIndex(),n):S(n)}return y(r,[{key:"render",value:function(){return this.isValidProps(this.props)&&this.props.children(O(O({},this.state),{},{next:this.next,prev:this.prev}))}}]),r}();W.defaultProps={currentPageIndex:1},W.propTypes={data:i.array.isRequired,pageSize:i.number.isRequired,currentPageIndex:i.number,children:i.func.isRequired};G(".index_blinkDot__2tjy6 {\n  animation-name: index_blink-dot__1LEXQ;\n  animation-duration: .3s;\n  animation-iteration-count: infinite; }\n\n@keyframes index_blink-dot__1LEXQ {\n  from {\n    color: #fff; }\n  to {\n    color: #6BCBA8; } }\n\n.index_tickLoader__3YNeg {\n  display: inline-block; }\n  .index_tickLoader__3YNeg:before, .index_tickLoader__3YNeg:after {\n    content: '';\n    display: block;\n    width: 6px;\n    background: #51c49f;\n    height: 1px; }\n  .index_tickLoader__3YNeg:before {\n    margin-bottom: 5px;\n    animation: index_tick__VlCnY .5s infinite; }\n  .index_tickLoader__3YNeg:after {\n    animation: index_tick__VlCnY .5s infinite reverse; }\n\n.index_center__1q1uQ {\n  position: absolute;\n  top: 50%;\n  left: 50%; }\n\n@keyframes index_tick__VlCnY {\n  0% {\n    width: 6px;\n    background: #c2eade; }\n  50% {\n    width: 12px;\n    background: #51c49f; }\n  100% {\n    width: 6px;\n    background: #c2eade; } }\n");var J=function(n){var t=n.absCenter,r=n.style;return e.createElement("div",{style:r,className:a("index_tickLoader__3YNeg",w({},"index_center__1q1uQ",t))})},X={fadeEle:"index_fadeEle__2HG7Q",superFast:"index_superFast__2QraS",fast:"index_fast__1aZHH",slow:"index_slow__2GJYw",fadeOut:"index_fadeOut__X4PjG",fadeIn:"index_fadeIn__3EDUW"};G(".index_fadeEle__2HG7Q {\n  opacity: 1;\n  transition: opacity .3s;\n  will-change: opacity; }\n\n.index_superFast__2QraS {\n  transition-duration: 0s; }\n\n.index_fast__1aZHH {\n  transition-duration: .3s; }\n\n.index_slow__2GJYw {\n  transition-duration: .5s; }\n\n.index_fadeOut__X4PjG {\n  opacity: 0; }\n\n.index_fadeIn__3EDUW {\n  opacity: 1; }\n");var $=function(n){P(r,e.PureComponent);var t=N(r);function r(){var e;v(this,r);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return w(I(e=t.call.apply(t,[this].concat(o))),"state",{unMounted:!e.props.visible}),e}return y(r,[{key:"componentDidUpdate",value:function(e,n,t){var r=this;e.visible!==this.props.visible&&setTimeout((function(){r.setState((function(e){return{unMounted:!e.unMounted}}))}),300)}},{key:"render",value:function(){var e;if(this.state.unMounted&&this.props.unMountAfterFadeOut)return null;var n=this.props,t=n.children,r=n.visible,o=n.speed;return t(a(X.fadeEle,X[void 0===o?"slow":o],(w(e={},X.fadeOut,!r),w(e,X.fadeIn,r),e)))}}]),r}();w($,"propTypes",{speed:i.oneOf(["superFast","fast","slow"]),visible:i.bool.isRequired,unMountAfterFadeOut:i.bool}),w($,"defaultProps",{unMountAfterFadeOut:!1});var ee=function(n){P(r,e.Component);var t=N(r);function r(n){var o;return v(this,r),w(I(o=t.call(this,n)),"renderImg",(function(){var n=o.props,t=n.src,r=n.onClick,i=n.onLoad,c=void 0===i?function(){}:i,u=n.style,l=void 0===u?{}:u,s=n.className,d=void 0===s?"":s,f=n.onLoadingStatusChange,p=void 0===f?function(e){return null}:f,m=o.state.loading,_=e.createElement("img",{className:a(d),alt:"*]:{)",src:t,key:t,onClick:r,onLoad:function(e){var n=e.target;n.complete&&n.height&&o.setState({loading:!1},(function(){c(),p(!1)}))},style:l});return e.createElement(e.Fragment,null,m&&o.renderLoadingView(),_)})),w(I(o),"renderLoadingView",(function(){var n=o.props,t=n.src,r=n.loadingViewRenderer;return r?r(t):e.createElement(J,{absCenter:!0})})),o.state={loading:!0,error:null},o}return y(r,[{key:"componentDidUpdate",value:function(e){var n=this.props.onLoadingStatusChange,t=void 0===n?function(e){return null}:n;e.src!==this.props.src&&this.setState({loading:!0},(function(){t(!0)}))}},{key:"render",value:function(){return this.state.error?":(":this.renderImg()}}]),r}();w(ee,"propTypes",{src:i.string.isRequired,onClick:i.func.isRequired,onLoad:i.func,onLoadingStatusChange:i.func,loadingViewRenderer:i.func,className:i.string.isRequired,style:i.shape({})});var ne="https://api.zjh.im",te={posts:"".concat(ne,"/z/posts"),res:"".concat(ne,"/res"),articles:"".concat(ne,"/articles"),audio:"".concat(ne,"/z/voice"),devRes:"http://localhost:3000/res"};G(".index_photoGallery__29fe- {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n  will-change: opacity;\n  height: 100%; }\n  .index_photoGallery__29fe- .index_img__7AH44 {\n    max-width: 80%;\n    max-height: 80%;\n    user-select: none;\n    cursor: w-resize; }\n");var re=function(e){return"".concat(e).concat("?x-oss-process=style/webp")},oe=function(n){var t=n.Spinner,r=void 0===t?e.createElement(J,{absCenter:!0}):t;return n.className,e.createElement(K,{url:te.res},(function(n){var t=n.loading,o=n.data;return t?r:e.createElement(W,{data:o,pageSize:1,infiniteLoopMode:!0},(function(n){var t,r,o=n.currentPageData,i=n.nextPageData,c=n.next,u=n.prev,l=o[0];return(t=re(i[0].url),r=new Image,r.src=t,new Promise((function(e,n){r.onload=function(n){var t=n.target;t.complete&&t.height&&e(t)}}))).then((function(e){})),e.createElement("div",{className:a("index_photoGallery__29fe-")},e.createElement(ee,{className:"index_img__7AH44",src:re(l.url),onClick:Z({onRightClick:c,onLeftClick:u})}))}))}))};G("/**** Colors ****/\n.renderer_previewBox__2dmV7 {\n  position: absolute;\n  border: solid 1px #bdbdbd;\n  background: #f2f2f2;\n  opacity: 1;\n  transition: opacity .3s, background .3s;\n  overflow: visible;\n  color: #bdbdbd; }\n  .renderer_previewBox__2dmV7:after {\n    min-width: 300px;\n    text-align: right;\n    content: attr(data-size);\n    display: block;\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    padding: 5px 10px;\n    font-size: 10px; }\n\n.renderer_active__1uv-m {\n  border: solid 1px #9ddec9;\n  background: #f1fffa;\n  opacity: .9;\n  color: #82d5bb; }\n\n.renderer_toolbar__3NzoQ {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 5px;\n  z-index: 10; }\n\n.renderer_delete__TcyxB {\n  color: #999;\n  transition: color .3s;\n  border: none;\n  background: none;\n  outline: none;\n  cursor: pointer; }\n  .renderer_delete__TcyxB.renderer_big__18h3p {\n    font-size: 18px;\n    font-weight: bold; }\n  .renderer_delete__TcyxB.renderer_black__1fu1s {\n    color: black; }\n  .renderer_delete__TcyxB.renderer_red__2r-e_, .renderer_delete__TcyxB:hover {\n    color: #ff8888; }\n");var ie=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,t=e.width,r=e.height;return t>n&&r>n},ae=function(e){return ie(e)&&function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:900,t=e.width,r=e.height;return t<n&&r<n}(e,500)},ce=function(e){return ie(e,500)},ue=function(){return!1},le=function(n){var o,i,a=n.height,c=n.width,u=n.className,l=n.opacity,s=n.style,d=void 0===s?{}:s,f=r(null),p=e.useRef(),m=function e(n){!function(e){for(var n=e.canvas.width,t=e.canvas.height,r=e.createImageData(n,t),o=new Uint32Array(r.data.buffer),i=o.length,a=0;a<i;)o[a++]=(100*Math.random()|0)<<24;e.putImageData(r,0,0)}(i),p.current=requestAnimationFrame(e)};return t((function(){o=f.current,i=o.getContext("2d")}),[]),t((function(){if(a||c)return o.width=c,void(o.height=a);var e=function(){o.width=window.innerWidth,o.height=window.innerHeight};e(),window.onresize=e}),[]),t((function(){return p.current=requestAnimationFrame(m),function(){return cancelAnimationFrame(p.current)}}),[]),e.createElement("canvas",{ref:f,className:u,id:"tv-noise-layer",style:Object.assign({pointerEvents:"none",opacity:l},d)})},se=function(n){var t={background:"white",width:"100%",height:"100%",padding:n.padding||0,cursor:"default",border:n.disableBorder?"unset":"solid 1px #ddd"};return e.createElement("div",{style:t},n.children)},de=function(n){return e.createElement("button",{style:n.style||{},className:a("renderer_delete__TcyxB",n.className),onClick:n.onClick},"✕")},fe=function(n){return e.createElement("div",{className:"renderer_toolbar__3NzoQ"},e.createElement(de,{onClick:n.remove}))};fe.propTypes={remove:i.func.isRequired};var pe=function(){return null},me=[[function(t){var r=t.width,o=t.height,i=j(n(!0),2),a=i[0],c=i[1];return e.createElement(se,null,e.createElement("iframe",{onLoad:function(){c(!1)},width:r,frameBorder:"none",height:o,style:{position:"absolute"},src:"https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNqS0N6THcwmfvK3QIn9crW%2FHOME%3Fnode-id%3D0%253A1&chrome=DOCUMENTATION"}),a&&e.createElement(J,{absCenter:!0}),e.createElement(fe,t))},ce],[function(n){return e.createElement(se,null,e.createElement(fe,n),e.createElement(oe,{Spinner:e.createElement(le,n)}))},ae]],_e=function(n){var t=function(e,n){var t=[pe,ue],r=e.find((function(e){var t=j(e,2);return t[0],(0,t[1])(n)}))||t;return j(r,1)[0]}(me,n);return e.createElement(t,n)},he=function(n){var t=ce(n)||ae(n),r="".concat(n.width,"px ").concat(n.height,"px");return e.createElement(e.Fragment,null,e.createElement("div",{style:O(O({},n),{},{width:n.width+200,height:n.height+200,left:n.left-100,top:n.top-100,cursor:"grabbing",zIndex:1})}),e.createElement("div",{style:n,className:a("renderer_previewBox__2dmV7",w({},"renderer_active__1uv-m",t)),"data-size":r}))},be=function(e){return null};G(".index_canvasPage__visZ5 {\n  position: relative;\n  cursor: grab;\n  height: 100%; }\n  .index_canvasPage__visZ5 * {\n    user-select: none; }\n");var ge="about_kwd__7MOMZ",ve="about_normal__3eG88";G(".about_about__dEsbc {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-start;\n  position: absolute;\n  top: 200px;\n  left: 45px;\n  padding: 5px; }\n  .about_about__dEsbc > span {\n    margin-bottom: 5px; }\n\n.about_kwd__7MOMZ {\n  color: #51c49f; }\n\n.about_normal__3eG88 {\n  color: #333; }\n\n.about_gridLine__jo1Kx {\n  display: flex;\n  justify-content: space-between;\n  background: #f1fffa; }\n\n.about_gridLineHor__2MZ6w {\n  flex-direction: column; }\n\n.about_vertical__1LwQC {\n  width: 2px;\n  height: 100%;\n  background: #c2eade; }\n\n.about_horizontal__1OFMM {\n  width: 100%;\n  height: 1px;\n  background: #c2eade; }\n\n@media (max-width: 500px) {\n  .about_about__dEsbc {\n    top: unset;\n    bottom: 150px; } }\n");var xe=matchMedia("(min-width: 500px)").matches,ye=function(e){return xe?e.children:null},we=function(){return e.createElement("span",null,e.createElement("span",{className:ge},"'hi#zjh.im'"),e.createElement("span",{className:ve},".replace("),e.createElement("span",{className:ge},"'#'"),e.createElement("span",{className:ve},", "),e.createElement("span",{className:ge},"'@'"),e.createElement("span",{className:ve},")"))},Ee=function(r){var o=r.promise,i=r.children,a=j(n(null),2),c=a[0],u=a[1];return t((function(){o.then((function(e){u(e)}))}),[]),c?i(c):e.createElement(J,{absCenter:!0})};G(".index_articles__5fPTn {\n  display: flex;\n  padding: 100px 0;\n  width: 100%;\n  height: 100%;\n  flex-direction: column;\n  align-items: center;\n  overflow: auto; }\n  .index_articles__5fPTn::-webkit-scrollbar {\n    display: none; }\n\n.index_article__2jSRA {\n  width: 50%;\n  max-width: 752px;\n  margin-bottom: 100px; }\n  .index_article__2jSRA:before {\n    content: attr(data-title);\n    margin-bottom: 40px;\n    display: block;\n    font-size: 36px;\n    line-height: 1.389;\n    font-weight: 700;\n    color: #262626;\n    font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif; }\n  .index_article__2jSRA:after {\n    content: attr(data-time);\n    font-weight: 400;\n    color: #bfbfbf;\n    font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;\n    display: block;\n    font-size: 12px;\n    margin-top: 50px; }\n\n@media (max-width: 500px) {\n  .index_article__2jSRA {\n    width: calc(100% - 50px);\n    margin: 100px 25px; } }\n");var Oe,Pe=function(n){return e.createElement("div",{className:"index_article__2jSRA",dangerouslySetInnerHTML:{__html:n.content},"data-time":new Date(n.updateTime).toLocaleDateString(),"data-title":n.title})},Ce={about:{title:"关于",icon:c,component:function(n){return e.createElement(e.Fragment,null,e.createElement(ye,null,e.createElement(ee,{className:a("center",n.className),src:"https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/5e3ffe8bdcaaca180c846aa2-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200209204106.jpg?x-oss-process=style/webp",style:{width:500,height:500}})),e.createElement("div",{className:"about_about__dEsbc"},e.createElement(Q,{color:"#333",icon:e.createElement(u,null),text:"@zjhou"}),e.createElement(Q,{icon:e.createElement(l,null),text:e.createElement(we,null)}),e.createElement(Q,{icon:e.createElement(s,null),text:"v".concat("0.2.6")})))}},canvas:{title:"画布 [beta]",icon:d,component:function(){return e.createElement("div",{className:a("index_canvasPage__visZ5")},e.createElement(g,{clearButtonRenderer:be,staticBoxRenderer:_e,previewBoxRenderer:he}))}},articles:{title:"文章",icon:f,component:function(n){return e.createElement(Ee,{promise:Y(te.articles)},(function(t){return e.createElement("div",{className:a("index_articles__5fPTn",n.className)},t.map((function(n){return e.createElement(Pe,n)})))}))}},photos:{title:"相片",icon:p,component:oe}},ke=xe?[Ce.canvas,Ce.photos,Ce.articles,Ce.about]:[Ce.photos,Ce.articles,Ce.about],Ie=_.map,Se=_.bufferCount,Ne=_.distinctUntilChanged,je=_.throttle,Me=_.filter,Ae=function(r){var o=r.visible,i=r.onClick;if(xe)return e.createElement(U,{onClick:i,hidden:!o});var a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,r=j(n("up"),2),o=r[0],i=r[1],a=h(e||window,"scroll",{capture:!0}).pipe(Ie((function(e){return e.target.scrollTop})),je((function(){return b(300)})),Se(2),Me((function(e){var n=j(e,2),t=n[0],r=n[1];return Math.abs(t-r)>50})),Ie((function(e){var n=j(e,2);return n[0]-n[1]>0?"UP":"DOWN"})),Ne());return t((function(){var e=a.subscribe((function(e){i(e)}));return function(){return e.unsubscribe()}}),[]),[o]}(document),c="DOWN"===j(a,1)[0];return e.createElement(U,{onClick:i,hidden:!o||c})},Te=function(){var t=j(n(ke.length-1),2),r=t[0],o=t[1];return e.createElement(q,{defaultOpen:!1,onSelect:o,menuIconRenderer:function(n){var t=n.open,r=n.isOpen;return e.createElement(Ae,{onClick:t,visible:!r})}},ke.map((function(n,t){n.title;var o=n.component,i=(n.icon,t===r||t===ke.length-1);return e.createElement(H,null,e.createElement($,{visible:i,unMountAfterFadeOut:!0},(function(n){return e.createElement(o,{className:n})})))})))};Oe=document.getElementById("gui"),o.render(e.createElement(Te,null),Oe),window.addEventListener("beforeinstallprompt",(function(e){console.log("👍","beforeinstallprompt",e),e.userChoice.then((function(e){console.log("👍","userChoice",e)}))}))}}}));
