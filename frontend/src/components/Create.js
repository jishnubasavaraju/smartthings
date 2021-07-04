import React, {Component} from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class Create extends Component {
    defaultVersion = 1;

    constructor(props) {
      super(props);
      this.state = {
        capbid: "",
        name: "",
        attributes: "{}",
        commands: "{}",
        status: "live",
        version: this.defaultVersion,
      };
  
      this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
      this.handleCapbidChange = this.handleCapbidChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleVersionChange = this.handleVersionChange.bind(this);
      this.handleAttributesChange = this.handleAttributesChange.bind(this);
      this.handleCommandsChange = this.handleCommandsChange.bind(this);
      this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleCapbidChange(e) {
      this.setState({
        capbid: e.target.value,
      });
    }

    handleNameChange(e) {
      this.setState({
        name: e.target.value,
      });
    }
  
    handleVersionChange(e) {
      this.setState({
        version: e.target.value,
      });
    }

    handleAttributesChange(e) {
        this.setState({
          attributes: e.target.value,
        });
      }
      handleCommandsChange(e) {
        this.setState({
          commands: e.target.value,
        });
      }
    handleStatusChange(e) {
      this.setState({
        status: e.target.value
      });
    }
  
    handleRoomButtonPressed() {
        console.log(this.state)
        let abj,cbj
        try {
          if(this.state.attributes == ""){
            abj = {}
          }
          else{
            abj = JSON.parse(this.state.attributes)
          }
        } catch (error) {
          alert("Attributes must be a valid JSON object")
          return
        }
        try {
          if(this.state.attributes == ""){
            cbj = {}
          }
          else{
            cbj = JSON.parse(this.state.commands)
          }
          
        } catch (error) {
          alert("Commands must be a valid JSON object")
          return
        }
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            capbid: this.state.capbid,
            name: this.state.name,
            status: this.state.status,
            version: this.state.version,
            attributes: abj,
            commands: cbj,
          }),
        };
        fetch("/internapp", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            let as = ""
            if( Array.isArray(data["capbid"]) ){
              as = as+"Capability ID: "+data["capbid"][0]+"\n"
            }
            if(Array.isArray(data["name"]) ){
              as = as+"Name: "+data["name"][0]+"\n"
            }
            if(as!=""){
              alert(as)
            }
            else{
              alert("New Capability Succesfully created")
            }
          } );

    }
  
    render() {
      return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
             Add a Capability
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl required>
              <TextField
                required={true}
                variant = "outlined"
                onChange={this.handleCapbidChange}
                inputProps={{
                  style: { textAlign: "center" },
                }}
              />
              <FormHelperText>
                <div align="center">Capability ID</div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              <TextField
                variant = "outlined"
                onChange={this.handleNameChange}
                inputProps={{
                  style: { textAlign: "center" },
                }}
              />
              <FormHelperText>
                <div align="center">Name</div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <div align="center">Status</div>
              </FormHelperText>
              <RadioGroup
                row
                defaultValue="live"
                onChange={this.handleStatusChange}
              >
                <FormControlLabel
                  value="live"
                  control={<Radio color="primary" />}
                  label="Live"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="proposed"
                  control={<Radio color="secondary" />}
                  label="Proposed"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="Depreciated"
                  control={<Radio color="default" />}
                  label="Deprecated"
                  labelPlacement="bottom"
                />

              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              <TextField
                required={true}
                variant = "outlined"
                type="number"
                onChange={this.handleVersionChange}
                defaultValue={this.defaultVersion}
                inputProps={{
                  style: { textAlign: "center" },
                }}
              />
              <FormHelperText>
                <div align="center">Version</div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item item xs={12} align="center">
            <FormControl>
              <TextField
                multiline
                rows={4}
                variant = "outlined"
                onChange={this.handleAttributesChange}
                inputProps={{
                  style: {fontSize: 10, width: 300, height: 400 },
                }}
              />
              <FormHelperText>
                <div align="center">Attributes</div>
              </FormHelperText>
            </FormControl>
            <FormControl>
              <TextField
                multiline
                rows={4}
                variant = "outlined"
                onChange={this.handleCommandsChange}
                inputProps={{
                  style: {fontSize: 10, width: 300, height: 400 },
                }}
              />
              <FormHelperText>
                <div align="center">Commands</div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleRoomButtonPressed}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/capbs" component={Link}>
              Back
            </Button>
          </Grid>
        </Grid>
      );
    }
}