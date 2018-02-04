class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
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
    }

    clearTimeList() {
       const list = document.getElementsByTagName('ul')[0];
       list.innerHTML = '';
       this.setState({times: {
               minutes: 0,
               seconds: 0,
               miliseconds: 0
           }});
    }

    save() {
        if (this.state.times) {
            var newArray = this.state.data;
            newArray.push(this.state.display);
            this.setState({data: newArray});
        }
    }

    print() {
        this.setState({display: this.format(this.state.times)});
    }

    format(times) {
        return `${this.pad0(times.minutes)} : ${this.pad0(times.seconds)} : ${this.pad0(Math.floor(times.miliseconds))}`;
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.state.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
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

    stop() {
        this.state.running = false;
        clearInterval(this.state.watch);
    }

    render() {
        return (
            <div>
                <div className={'panel'}>
                    <button className={'btn start'} onClick={event => this.start(event)}>Start</button>
                    <button className={'btn stop'} onClick={event => this.stop(event)}>Stop</button>
                    <button className={'btn save'} onClick={event => this.save(event)}>Save</button>
                    <button className={'btn reset'} onClick={event => this.clearTimeList()}>Reset</button>
                </div>
                <div className={'timer'}>{this.state.display}</div>
                <TimerLists data={this.state.data}/>
            </div>
        );
    }
}

class List extends React.Component {
    render() {
        return (
            <li className={'item'}>
                <i className="fa fa-clock-o"></i>{this.props.list}
            </li>
        );
    }
}

class TimerLists extends React.Component {
    get data() {
        return this.props.data.map(list => <List list={list}/>);
    }

    render() {
        return (
            <ul className={'items'} >
                {this.data}
            </ul>
        );
    }
}


ReactDOM.render(
    <Clock/>, document.getElementById("root")
);

