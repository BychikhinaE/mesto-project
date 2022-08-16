(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var n=function(){function n(e){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t(this,"_handleEscClose",(function(e){"Escape"===e.key&&r.close()})),t(this,"_closeClickBlack",(function(e){e.target===e.currentTarget&&r.close()})),this._selector=e,this._element=document.querySelector(this._selector),this._buttonClose=this._element.querySelector(".popup__close"),this._buttonSubmit=this._element.querySelector(".popup__button")}var r,o;return r=n,(o=[{key:"open",value:function(){this._element.classList.add("popup_opened"),this._element.addEventListener("click",this._closeClickBlack),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._element.classList.remove("popup_opened"),this._element.removeEventListener("click",this._closeClickBlack),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._buttonClose.addEventListener("click",(function(){e.close()}))}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),n}();function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(){return i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=c(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},i.apply(this,arguments)}function c(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}function a(e,t){return a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},a(e,t)}function u(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(f,e);var t,n,r,c,s=(r=f,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=l(r);if(c){var n=l(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return u(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=s.call(this,e))._fieldTextError=t._element.querySelector(".popup__title"),t}return t=f,(n=[{key:"open",value:function(e){this._fieldTextError.textContent=e,i(l(f.prototype),"open",this).call(this)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n),f=document.querySelector(".content"),p=document.querySelector(".spinner"),h=document.querySelector(".profile__add"),y=document.forms.avatar.querySelector(".popup__button"),d=f.querySelector(".profile__avatar-edit"),_=document.forms.profile.querySelector(".popup__button"),b=f.querySelector(".profile__edit"),m=document.querySelector("#name"),v=document.querySelector("#bio");function k(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}function g(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function w(e){e?(p.classList.add("spinner_visible"),f.classList.add("content_hidden")):(p.classList.remove("spinner_visible"),f.classList.remove("content_hidden"))}var E=new s(".popup_type_error");function S(e){E.open(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}E.setEventListeners();var L=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"startLoad",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(k)}},{key:"loadCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(k)}},{key:"editProfile",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then(k)}},{key:"editAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then(k)}},{key:"postNewCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(k)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(k)}},{key:"plusLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then(k)}},{key:"disLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then(k)}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var j=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._initialArray=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._initialArray.forEach((function(t){return e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},q.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=D(e)););return e}function B(e,t){return B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},B(e,t)}function T(e,t){if(t&&("object"===P(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&B(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=D(r);if(o){var n=D(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function c(e){var t,n=e.selector,r=e.handleFormSubmit,o=e.objValid;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,n))._handleFormSubmit=r,t._elementForm=t._element.querySelector(".popup__form"),t._formValid=o,t._inputList=Array.from(t._element.querySelectorAll(".popup__input")),t}return t=c,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;this._element.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())})),q(D(c.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){var e=this;q(D(c.prototype),"close",this).call(this),this._elementForm.reset(),this._inputList.forEach((function(t){t.classList.contains("popup__input_type_error")&&e._formValid.hideInputError(t)})),this._formValid.toggleButtonState()}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(n);function x(e){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(e)}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function V(){return V="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=F(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},V.apply(this,arguments)}function F(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=J(e)););return e}function N(e,t){return N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},N(e,t)}function M(e,t){if(t&&("object"===x(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function J(e){return J=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},J(e)}var H=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&N(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=J(r);if(o){var n=J(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return M(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e))._fieldPhoto=t._element.querySelector(".popup__photo"),t._fieldSubtitle=t._element.querySelector(".popup__subtitle"),t}return t=c,(n=[{key:"open",value:function(e){this._fieldPhoto.src=e._url,this._fieldSubtitle.textContent=e._name,this._fieldPhoto.alt=e._name,V(J(c.prototype),"open",this).call(this)}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(n);function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var $=function(){function e(t){var n=t.selectorName,r=t.selectorBio,o=t.selectorAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selectorName=n,this._selectorBio=r,this._selectorAvatar=o,this._fieldName=document.querySelector(this._selectorName),this._fieldBio=document.querySelector(this._selectorBio),this._fieldAvatar=document.querySelector(this._selectorAvatar)}var t,n;return t=e,(n=[{key:"setUserInfo",value:function(e){this._userData=e,this._fieldName.textContent=this._userData.name,this._fieldBio.textContent=this._userData.about,this._fieldAvatar.style.backgroundImage="url(".concat(this._userData.avatar,")")}},{key:"getUserInfo",value:function(){return this._userData}},{key:"getUserId",value:function(){return this._userData._id}}])&&z(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function G(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var K=function(){function e(t,n,r){var o=t.data,i=t.handleCardClick,c=t.functionLike,a=t.functionDelete;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=o.name,this._url=o.link,this._countLike=o.likes,this._ownerId=o.owner._id,this._card_id=o._id,this._selector=r,this._handleCardClick=i,this._checkId=n,this._like=c,this._checkDelete=a}var t,n;return t=e,(n=[{key:"_getElement",value:function(){return document.querySelector(this._selector).content.querySelector(".elements__card").cloneNode(!0)}},{key:"generate",value:function(){var e=this;return this._element=this._getElement(),this._element.querySelector(".elements__title").textContent=this._name,this._cardPhoto=this._element.querySelector(".elements__photo"),this._cardPhoto.alt=this._name,this._cardPhoto.src=this._url,this._cardCountLike=this._element.querySelector(".elements__count-like"),this._cardCountLike.textContent=this._countLike.length,this._cardLike=this._element.querySelector(".elements__like"),this._deleteButton=this._element.querySelector(".elements__delete"),this._countLike.some((function(t){return t._id===e._checkId}))&&this._cardLike.classList.add("elements__like_act"),this._ownerId!==this._checkId?this._deleteButton.style.display="none":this._deleteButton.style.display="block",this._setEventListeners(),this._element}},{key:"_setEventListeners",value:function(){var e=this;this._deleteButton.addEventListener("click",(function(){e._checkDelete()})),this._cardLike.addEventListener("click",(function(){e._like()})),this._cardPhoto.addEventListener("click",(function(){e._handleCardClick()}))}},{key:"changeCountLike",value:function(e){this._cardCountLike.textContent=e.likes.length,this._cardLike.classList.toggle("elements__like_act")}},{key:"deleteCardDOM",value:function(){this._element.remove(),this._element=null}},{key:"checkMyLike",value:function(){return this._cardLike.classList.contains("elements__like_act")}}])&&G(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function Q(e){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(e)}function W(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function X(){return X="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=Y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},X.apply(this,arguments)}function Y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=te(e)););return e}function Z(e,t){return Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},Z(e,t)}function ee(e,t){if(t&&("object"===Q(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function te(e){return te=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},te(e)}var ne=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Z(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=te(r);if(o){var n=te(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return ee(this,e)});function c(e){var t,n=e.selector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,n))._handleFormSubmit=r,t._buttonDelete=t._element.querySelector("#questionDelete"),t}return t=c,(n=[{key:"setEventListeners",value:function(e){var t=this;this.callback=function(){return t._handleFormSubmit(e)},this._buttonDelete.addEventListener("click",this.callback),X(te(c.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){this._buttonDelete.removeEventListener("click",this.callback),X(te(c.prototype),"close",this).call(this)}}])&&W(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(n);function re(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var oe=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formConfig=t,this._formSelector=n,this._formElement=document.querySelector(this._formSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector))}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._formConfig.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._formConfig.errorClass)}},{key:"hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._formConfig.inputErrorClass),t.classList.remove(this._formConfig.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this.hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._formConfig.inactiveButtonClass),this._buttonElement.disabled=!0):(this._buttonElement.classList.remove(this._formConfig.inactiveButtonClass),this._buttonElement.disabled=!1)}},{key:"_setEventListeners",value:function(){var e=this;this._buttonElement=this._formElement.querySelector(this._formConfig.submitButtonSelector),this.toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e.toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&re(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),ie={inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function ce(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ae,ue,le=new L({baseUrl:"https://nomoreparties.co/v1/plus-cohort-10",headers:{authorization:"ae17cf5f-30f7-49c5-80a6-f47193e26f36","Content-Type":"application/json"}}),se=new oe(ie,"#formProfile");se.enableValidation();var fe=new oe(ie,"#formAvatar");fe.enableValidation();var pe=new oe(ie,"#formPlace");pe.enableValidation();var he=new H(".popup_type_photo");he.setEventListeners();var ye=new ne({selector:".popup_type_delete",handleFormSubmit:function(e){le.deleteCard(e._card_id).then((function(){ye.close(),e.deleteCardDOM()})).catch((function(e){S(e)}))}});function de(e){var t=new K({data:e,handleCardClick:function(){he.open(this)},functionLike:function(){var e;(e=this).checkMyLike()?le.disLike(e._card_id).then((function(t){e.changeCountLike(t)})).catch((function(e){S(e)})):le.plusLike(e._card_id).then((function(t){e.changeCountLike(t)})).catch((function(e){S(e)}))},functionDelete:function(){var e;e=this,ye.setEventListeners(e),ye.open()}},ae.getUserId(),"#card-template").generate();ue.addItem(t)}Promise.all([le.startLoad(),le.loadCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return ce(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ce(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];(ae=new $({selectorName:".profile__name",selectorBio:".profile__bio",selectorAvatar:".profile__avatar"})).setUserInfo(o),(ue=new j({items:i.reverse(),renderer:function(e){de(e)}},".elements")).renderItems()})).catch((function(e){S(e)}));var _e=new A({selector:".popup_type_place",handleFormSubmit:function(e){w(!0),le.postNewCard({name:e.namePlace,link:e.link}).then((function(e){de(e),_e.close()})).catch((function(e){S(e)})).finally((function(){w(!1)}))},objValid:pe});_e.setEventListeners(),h.addEventListener("click",(function(){_e.open()}));var be=new A({selector:".popup_type_avatar",handleFormSubmit:function(e){g(!0,y),le.editAvatar({avatar:e.avatar}).then((function(e){ae.setUserInfo(e)})).then((function(){be.close()})).catch((function(e){S(e)})).finally((function(){g(!1,y)}))},objValid:fe});be.setEventListeners(),d.addEventListener("click",(function(){be.open()}));var me=new A({selector:".popup_type_profile",handleFormSubmit:function(e){g(!0,_),le.editProfile({name:e.name,about:e.bio}).then((function(e){ae.setUserInfo(e)})).then((function(){me.close()})).catch((function(e){S(e)})).finally((function(){g(!1,_)}))},objValid:se});b.addEventListener("click",(function(){var e=ae.getUserInfo();m.value=e.name,v.value=e.about,se.toggleButtonState(),me.setEventListeners(),me.open()}))})();