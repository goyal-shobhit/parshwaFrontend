import React,{useEffect,useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
const BASEURL = process.env.REACT_APP_BASEURL;




const DocketList = () => {

const [tableData,setTabledata] = useState([])
    useEffect(() => {
        fetch(`${BASEURL}users`)
          .then((response) => response.json())
          .then((data) => setTabledata(data))
          .catch((error) => console.error("Error fetching data: ", error));
        //   data.map((item)=>)
      }, []);

  return (
    <>
    <h1 style={{display:"flex",alignItems:"center",justifyContent:"center",color:"black",marginTop:"2px"}}>List of the Created Dockets</h1>
    <br/>
    <Link to="/">
  
  <div style={{display:"flex",alignItems:"right",justifyContent:"end", padding:"1px"}}>Create Docket</div>
  </Link>
  <br/>
   
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead >
        <TableRow    sx={{
       
        borderBottom: "2px solid black",
        "& th": {
         fontWeight:900,
          color: "rgba(96, 96, 96)"
        }
      }}>
<TableCell >No.</TableCell>
          <TableCell align="center" >Name</TableCell>
          <TableCell align="center"  >Start Time</TableCell>
          <TableCell align="center">End Time</TableCell>
          <TableCell align="center">No. of hours worked</TableCell>
          <TableCell align="center">Rate per hour&nbsp;($)</TableCell>
          <TableCell align="center">Supplier Name</TableCell>
          <TableCell align="center">Purchase Order</TableCell>
          <TableCell align="center">Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row,index) => (
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
             <TableCell component="th" scope="row">
              {index+1}
              </TableCell>
            <TableCell align="center" >
              {row.name}
            </TableCell>
            <TableCell align="center">{row.startTime}</TableCell>
            <TableCell align="center">{row.endTime}</TableCell>
            <TableCell align="center">{row.hourWork}</TableCell>
            <TableCell align="center">{row.hourRate}</TableCell>
            <TableCell align="center">{row.supplierName}</TableCell>
            <TableCell align="center">{row.PONumber}</TableCell>
            <TableCell align="center">{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
 
  </>
  )
}

export default DocketList