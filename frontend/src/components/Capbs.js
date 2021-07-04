import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



export default class Capbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capbs: [],
    };
    this.getRoomDetails();
    this.requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
  } 
  
  getRoomDetails() {
    fetch("/internapp/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
            capbs: data
        });
      });
  }

  render() {
    
    return (
    <TableContainer component={Paper}>
         <Button color="primary" align="right" variant="contained" to="/create" component={Link}>
              Create a new Capability
            </Button>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Capability ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="center">Version</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            this.state.capbs.map(
                data => {
                    return(
                        <TableRow key={data.capbid}>
                            <TableCell component="th" scope="row">
                                {data.capbid}
                            </TableCell>
                            <TableCell align="left">{data.name}</TableCell>
                            <TableCell align="left">{data.status}</TableCell>
                            <TableCell align="center">{data.version.toString()}</TableCell>
                            <TableCell>
                                <Button color="secondary" variant="contained" to={"/detail/"+data.capbid} component={Link}>
                                    Details
                                </Button>
                            </TableCell>
                        </TableRow>
                        //             <Card key={data.capbid}>
                        //     <CardContent>
                        //         <Typography color="textSecondary" gutterBottom>
                        //             Word of the Day
                        //         </Typography>
                        //         <Typography variant="h5" component="h2">
                        //             benevolent
                        //         </Typography>
                        //         <Typography color="textSecondary">
                        //             adjective
                        //         </Typography>
                        //         <Typography variant="body2" component="p">
                        //             well meaning and kindly.
                        //         </Typography>
                        //     </CardContent>
                        //     <CardActions>
                        //     <Button color="secondary" variant="contained" to={"/detail/"+data.capbid} component={Link}>
                        //     </Button>
                        //     </CardActions>
                        // </Card>
                        // <div >
                        //     <h1>THIS IS HERE</h1>
                        //     <h3>{data.capbid}</h3>
                        //     <p>Votes: {data.name}</p>
                        //     <p>Guest Can Pause: {data.status}</p>
                        //     <p>Host: {data.version.toString()}</p>
                        //     <Button color="secondary" variant="contained" to={"/detail/"+data.capbid} component={Link}>
                        //     Details
                        //     </Button>
                        // </div>
                    )
                }
            )  
        }
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
}