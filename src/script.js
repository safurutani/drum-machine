const sounds = [
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", 
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", 
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", 
  "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", 
  "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", 
  "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", 
  "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", 
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
]



class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="display">
        {this.props.display}
        </div>
    );
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.originalColor = this.originalColor.bind(this);
    this.clickSound = this.clickSound.bind(this);
    this.colorChange = this.colorChange.bind(this);
  }
  playAudio(e) {
    const key = e.key.toUpperCase();
    document.getElementById(key).click();
    if (key === this.props.text) {
       $("#display").text(this.props.desc);
       $("#" + this.props.id).css({"background": "#B3DAFE", "color": "#154360"});
    }   
  }
  originalColor() {
    $("#" + this.props.id).css({"background": "#154360", "color": "#B3DAFE"});
  }
  colorChange(e) {
    const pad = e.target.id;
    if (e.target.className === "drum-pad col") {
      $("#" + pad).css({"background": "#B3DAFE", "color": "#154360"});
    }
  }
  clickSound(e) {
    const instrument = e.target.querySelector("audio");
    instrument.currentTime = 0;
    instrument.play();
    $("#display").text(this.props.desc);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.playAudio);
    document.addEventListener('keyup', this.originalColor);
    document.addEventListener('mousedown', this.colorChange);
    document.addEventListener('mouseup', this.originalColor);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.playAudio);
    document.removeEventListener('keyup', this.originalColor);
    document.removeEventListener('mousedown', this.colorChange);
    document.removeEventListener('mouseup', this.originalColor);
  }
  render() {
    return (
      <div id={this.props.id} className="drum-pad col" onClick={this.clickSound}>
        {this.props.text}
        <audio className="clip" id={this.props.id} src={this.props.source} type="audio/mpeg"></audio>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Press a key to play"
    }
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="drum-pads" className="container">
        <div className="row">
          <DrumPad id="Q" desc="Heater 1" source={sounds[0]} text="Q" />
          <DrumPad id="W" desc="Heater 2" source={sounds[1]} text="W" />
          <DrumPad id="E" desc="Heater 3" source={sounds[2]} text="E" />
        </div>
        <div className="row">
          <DrumPad id="A" desc="Heater 4" source={sounds[3]} text="A" />
          <DrumPad id="S" desc="Open Hi Hat" source={sounds[4]} text="S" />
          <DrumPad id="D" desc="Closed Hi Hat" source={sounds[5]} text="D" />
        </div>
        <div className="row">
          <DrumPad id="Z" desc="Kick"source={sounds[6]} text="Z" />
          <DrumPad id="X" desc="Kick n Hat" source={sounds[7]} text="X" />
          <DrumPad id="C" desc="Clap" source={sounds[8]} text="C" />
        </div>
      </div>
        <Display display={this.state.display} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));