'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
    _inherits(Clock, _React$Component);

    function Clock() {
        _classCallCheck(this, Clock);

        var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this));

        _this.state = {
            display: '',
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: null,
            data: [],
            classNm: 'abc'
        };
        return _this;
    }

    _createClass(Clock, [{
        key: 'clearTimeList',
        value: function clearTimeList() {
            var list = document.getElementsByTagName('ul')[0];
            list.innerHTML = '';
            this.setState({ times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                } });
        }
    }, {
        key: 'save',
        value: function save() {
            if (this.state.times) {
                var newArray = this.state.data;
                newArray.push(this.state.display);
                this.setState({ data: newArray });
            }
        }
    }, {
        key: 'print',
        value: function print() {
            this.setState({ display: this.format(this.state.times) });
        }
    }, {
        key: 'format',
        value: function format(times) {
            return this.pad0(times.minutes) + ' : ' + this.pad0(times.seconds) + ' : ' + this.pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.state.running = true;
                this.state.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.state.times.miliseconds += 1;
            if (this.state.times.miliseconds >= 100) {
                this.state.times.seconds += 1;
                this.state.times.miliseconds = 0;
            }
            if (this.state.times.seconds >= 60) {
                this.state.times.minutes += 1;
                this.state.times.seconds = 0;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.state.running = false;
            clearInterval(this.state.watch);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'button',
                        { className: 'btn start', onClick: function onClick(event) {
                                return _this3.start(event);
                            } },
                        'Start'
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn stop', onClick: function onClick(event) {
                                return _this3.stop(event);
                            } },
                        'Stop'
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn save', onClick: function onClick(event) {
                                return _this3.save(event);
                            } },
                        'Save'
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn reset', onClick: function onClick(event) {
                                return _this3.clearTimeList();
                            } },
                        'Reset'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'timer' },
                    this.state.display
                ),
                React.createElement(TimerLists, { data: this.state.data })
            );
        }
    }]);

    return Clock;
}(React.Component);

var List = function (_React$Component2) {
    _inherits(List, _React$Component2);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                { className: 'item' },
                React.createElement('i', { className: 'fa fa-clock-o' }),
                this.props.list
            );
        }
    }]);

    return List;
}(React.Component);

var TimerLists = function (_React$Component3) {
    _inherits(TimerLists, _React$Component3);

    function TimerLists() {
        _classCallCheck(this, TimerLists);

        return _possibleConstructorReturn(this, (TimerLists.__proto__ || Object.getPrototypeOf(TimerLists)).apply(this, arguments));
    }

    _createClass(TimerLists, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'ul',
                { className: 'items' },
                this.data
            );
        }
    }, {
        key: 'data',
        get: function get() {
            return this.props.data.map(function (list) {
                return React.createElement(List, { list: list });
            });
        }
    }]);

    return TimerLists;
}(React.Component);

ReactDOM.render(React.createElement(Clock, null), document.getElementById("root"));
