import React, { Component } from "react";
import "./index.css";
import carriage from "./images/carriage.png";
import locomotive from "./images/locomotive.png";
import scarriage from "./images/smallcarriage.png";
import slocomotive from "./images/smallengine.png";
import { Draggable, Droppable } from "react-drag-and-drop";

class App extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.calculateTracks = this.calculateTracks.bind(this);
    this.state = {
      totalTrains: [],
      train: ["E"],
      trainsTimes: [],
      count: null
    };
  }
  calculateTracks() {
    debugger;
    if (this.state.totalTrains.length === 0) {
      alert(0);
      return;
    }
    let count = 1;
    let countArray = [];
    let trainsTimes = this.state.trainsTimes.slice();
    for (let i = 0; i <= trainsTimes.length; i++) {
      if (trainsTimes[i] === null) {
        continue;
      }
      for (let j = i + 1; j <= trainsTimes.length - 1; j++) {
        let time1 = Number(trainsTimes[i][0].split(":").join(""));
        let time2 = Number(trainsTimes[i][1].split(":").join(""));
        let time3 = Number(trainsTimes[j][0].split(":").join(""));
        if (time3 >= time1 && time3 <= time2) {
          ++count;
          trainsTimes[j] = null;
        }
      }
      countArray.push(count);
      count = 1;
    }
    let cnt = countArray.sort()[countArray.length - 1];
    // alert(cnt);
    this.setState({ count: cnt });
  }
  setArrivalTime(ind, e) {
    let trainsTimes = this.state.trainsTimes;
    trainsTimes[ind][0] = e.target.value;
    this.setState({ trainsTimes: trainsTimes });
    console.log(e.target.value);
  }
  setDepartureTime(ind, e) {
    let trainsTimes = this.state.trainsTimes;
    trainsTimes[ind][1] = e.target.value;
    this.setState({ trainsTimes: trainsTimes });
  }
  delete(ind) {
    let totalTrains = this.state.totalTrains;
    let trainsTimes = this.state.trainsTimes;
    trainsTimes.splice(ind, 1);
    totalTrains.splice(ind, 1);
    this.setState({ totalTrains: totalTrains });
    this.setState({ trainsTimes: trainsTimes });
  }
  onDrop(data) {
    console.log(data);
    let train = data.train;
    let totalTrains = this.state.totalTrains;
    let lastTrain = this.state.totalTrains[this.state.totalTrains.length - 1];
    let trainsTimes = this.state.trainsTimes;
    if (train === "E") {
      if (lastTrain && lastTrain.length === 1 && lastTrain[0] === "E") {
        return;
      } else {
        totalTrains.push(["E"]);
        trainsTimes.push(["00:00", "00:00"]);
      }
    } else {
      if (totalTrains.length === 0) {
        return;
      }
      lastTrain.push("L");
      totalTrains[totalTrains.length - 1] = lastTrain;
    }
    this.setState({ totalTrains: totalTrains });
    this.setState({ trainsTimes: trainsTimes });
  }
  onDropTrain(ind, data) {
    console.log(data);
    console.log(ind);
    let train = data.train;
    let totalTrains = this.state.totalTrains;
    let currentTrain = totalTrains[ind];
    let trainsTimes = this.state.trainsTimes;
    if (train === "E") {
      if (currentTrain.length === 1 && currentTrain[0] === "E") {
        return;
      }
    } else {
      currentTrain.push("L");
      totalTrains[ind] = currentTrain;
    }
    this.setState({ totalTrains: totalTrains });
    this.setState({ trainsTimes: trainsTimes });
  }
  render() {
    return (
      <div className="container">
        <div className="total-tracks">
          <p>
            <b>
              <i>Total Tracks : {this.state.count ? this.state.count : ""}</i>
            </b>
          </p>
        </div>
        <Draggable type="train" data="L">
          <div className="carriage">
            <img className="img-train" src={carriage} alt="img" />
          </div>
        </Draggable>
        <Draggable type="train" data="E">
          <div className="locomotive">
            <img className="img-train" src={locomotive} alt="img" />
          </div>
        </Draggable>

        <h1 className="main-title"> Build Trains Here</h1>
        <div className="parent-dotted-box">
          <br />
          <div>
            {this.state.totalTrains.map(function(val, index) {
              return (
                <Droppable
                  types={["train"]} // <= allowed drop types
                  onDrop={this.onDropTrain.bind(this, index)}
                >
                  <div className="train-track">
                    {val.map(function(val1, index1) {
                      return val1 === "E" ? (
                        <img src={slocomotive} alt="img" />
                      ) : (
                        <img src={scarriage} alt="img" />
                      );
                    })}
                    <span className="align-train">
                      <button
                        className="del-btn"
                        onClick={this.delete.bind(this, index)}
                      >
                        Del
                      </button>
                      <input
                        className="train-time"
                        placeholder="Arrival 24hr Format"
                        onChange={this.setArrivalTime.bind(this, index)}
                      />&nbsp;
                      <input
                        className="train-time"
                        placeholder="Depart. 24hr Format"
                        onChange={this.setDepartureTime.bind(this, index)}
                      />
                    </span>
                  </div>
                  <br />
                </Droppable>
              );
            }, this)}
          </div>
        </div>
        <Droppable
          types={["train"]} // <= allowed drop types
          onDrop={this.onDrop}
        >
          <div className="drag-drop-dotted-box">
            <p>Drag and Drop Elements here to create a Train </p>
          </div>
        </Droppable>

        <div>
          <button onClick={this.calculateTracks} className="calc-btn">
            {" "}
            Calculate Tracks{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
