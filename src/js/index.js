require('normalize.css/normalize.css');

var Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
    this.value = "foobar";
  }

  _createClass(Foo, [{
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }], [{
    key: "instance",
    value: function instance() {
      return new Foo();
    }
  }]);

  return Foo;
}();

console.log(Foo.instance().getValue());
