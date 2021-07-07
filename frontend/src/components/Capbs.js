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
import { DataGrid, GridToolbar } from '@material-ui/data-grid';



export default class Capbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capbs: [],
      columns: [
        { field: 'id', headerName: 'Capability ID', width: 240 },
        {
          field: 'name',
          headerName: 'Name',
          width: 320,
        },
        {
          field: 'version',
          headerName: 'Version',
          width: 140,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 220,
        },
        {
          field: 'details',
          headerName: 'Details',
          sortable: false,
          width: 160,
          renderCell: (params) =>
          (
            <Button color="secondary" variant="contained" to={"/detail/"+params.id} component={Link}>
                                    Details
                                </Button>
          ),
        },
        {
          field: 'delete',
          headerName: 'Delete',
          sortable: false,
          width: 160,
          renderCell: (params) =>
          (
            <Button color="default" value = {params.id} variant="contained" onClick={() => this.handleDelete(params.id)} >
                                    Delete
                                </Button>
          ),
        },
      ]
    };
    this.getRoomDetails();
    this.requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleDelete(val){
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/internapp/"+val+"/", requestOptions)
    alert(val+" - Deletion Successful")
    window.location.reload(true);
  }
  
  getRoomDetails() {
    fetch("/internapp/")
      .then((response) => response.json())
      .then((data) => {
        let bd = [];
        for(let i=0;i<data.length;i++){
          let ob = {
            "id" : data[i].capbid,
            "name": data[i].name,
            "status": data[i].status,
            "version": data[i].version
          }
          bd.push(ob)
        }
        console.log(bd)
        this.setState({
            capbs: bd
        });
      });
  }

  render() {
    
    return (
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
         components={{
          Toolbar: GridToolbar,
        }}
         rows={this.state.capbs} columns={this.state.columns} pageSize={10} />
        <Button color="primary" align="right" variant="contained" to="/create" component={Link}>
           Create a new Capability
             </Button>
      </div>
    );
  }
}