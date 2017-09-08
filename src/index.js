import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const Heading = () => <h1>Camper Leaderboard</h1>
const TableInner = ({obj, changeObj, arrs, updateClassA, updateClassR, r, a}) => {
  const userData = (o, num) => {
    const tableRowClasses = [];
    if(r) {
      tableRowClasses.push("rClass");
    } else if(a) {
      tableRowClasses.push("aClass");
    }
    return(
      <tr className={tableRowClasses.join(" ")}>
        <td>{num}</td>
        <td>{o.username}</td>
        <td><img src={o.img} alt="na"/></td>
        <td>{o.recent}</td>
        <td>{o.alltime}</td>
      </tr>
    );
  }
  const setupData = () => {
    const o = obj;
    let numb = 0;
    let dataPackage = o.map((i) => {
      numb++;
      return(
        userData(i, numb)
      );
    });
    return(
      <table>
        <tr>
          <th>position</th>
          <th>username</th>
          <th>image</th>
          <th onClick={handleChangeR}>recent</th>
          <th onClick={handleChangeA}>all time</th>
        </tr>
        {dataPackage}
      </table>
    );
  }
  const handleChangeR = () => {
    const o1 = arrs[1].obj;
    changeObj(o1);
    updateClassR();
  }
  const handleChangeA = () => {
    const o2 = arrs[0].obj;
    changeObj(o2);
    updateClassA();
  }

  return(
    <div className="table-inner">{setupData()}</div>
  );

}
class TableOut extends React.Component {
  constructor() {
    super();
    this.state = {obj:[], r:0, a:0};
    this.arrs = [
      {
        obj: [],
        url: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
      },
      {
        obj: [],
        url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
      }
    ];
    const o1 = this.arrs[0];
    const o2 = this.arrs[1];
    this.callAPI(o1).callAPI(o2);
    this.callA();
  }
  callAPI(o) {
    fetch(o.url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      o.obj = [...data];
    });
    return this;
  }
  callA() {
    let that = this;
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      that.setState({ obj: data });
    });
  }
  changeObj(i) {
    const newObj = i;
    this.setState({obj: newObj});
  }
  updateClassA() {
    this.setState({r:0, a:1});
  }
  updateClassR() {
    this.setState({r:1, a:0});
  }
  render() {
    return(
      <div className="table-out">
        <Heading />
        <TableInner obj={this.state.obj} changeObj={this.changeObj.bind(this)} arrs={this.arrs} updateClassR={this.updateClassR.bind(this)} updateClassA={this.updateClassA.bind(this)} r={this.state.r} a={this.state.a} />
      </div>
    );
  }
}
const root = document.getElementById('root');

ReactDOM.render(
  <TableOut />,
  root
);

registerServiceWorker();
