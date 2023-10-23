import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SVGrender from "./SVGrender";
import LoadingSpinner from "./LoadingSpinner";

const BASEURL = process.env.REACT_APP_BASEURL;

function DocketMUI() {
    const deatilsForm = {
      name:"",
      startTime:"",
      endTime:"",
      hourWork:"",
      hourRate:"",
      supplierName:"",
      PONumber:"",
      description:""

    }

    const [deatils,setDetails] = useState(deatilsForm);
    const [data, setData] = useState([]);
  const [PONumberOptions, setPONumberOptions] = useState([]);
  const [descriptionOptions, setDescriptionOptions] = useState([]);
const[isError,setIsError] = useState(false);
const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
       
        console.log(name,"name")
        console.log(value,"value")
        setDetails({
          ...deatils,
          [name]: value,
        });
      };
    

  
  

  useEffect(() => {
    // fetch("http://localhost:3000/api/csv-data")
    fetch(`${BASEURL}api/csv-data`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
   
  }, []);

  const handleSupplierDropdownChange = (e) => {
    const selectedValue = e.target.value;
    // setSupplierName(selectedValue);

    const filteredOptions = data.filter(
      (item) => item.Supplier === selectedValue
    );
    console.log(filteredOptions, "fol");
    const PO = filteredOptions.map((item) => item.PONumber);
    // console.log(PO)

    setPONumberOptions(PO);
  };

  const handlePONumberDropdownChange = (e) => {
    const selectedValue = e.target.value;
    // setPONumber(selectedValue);
    console.log(data, "data fol");
    const wpscode = data.filter((item) => item.PONumber === selectedValue)[0]
      .WBSCode;
    console.log(wpscode, "wpscode");
    const filteredOptions = data.filter(
      (item) => item.PONumber === selectedValue && item.WBSCode === wpscode
    );
    console.log(filteredOptions, "fol");
    const PO = filteredOptions.map((item) => item.Description);
    console.log(PO, "description");

    setDescriptionOptions(PO);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(deatils.name==="" || deatils.startTime==="" || deatils.endTime==="" || deatils.hourWork==="" || deatils.hourRate==="" || deatils.supplierName==="" || deatils.PONumber==="" || deatils.description===""){
       setIsError(true);
       return false;
     
    }
    else{
      setIsError(false)
    }
     const body = deatils;
    console.log(body, "body");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };
    setIsLoading(true);

  fetch(`${BASEURL}createUser`, requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result)
        setIsLoading(false);
  })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
    {isLoading ? <LoadingSpinner/> :
    <section className="login">
      <div className="logo">
        <SVGrender />
        <h6>PARSHWA</h6>
      </div>
      <div className="leftside">
        <div>
          <img
            className="img image1"
            src="/auth-v2-login-illustration-light.png"
            alt=""
          />
        </div>
        <img className="img image2" src="/tree.png" alt="" />
        <img className="img image3" src="/auth-v2-mask-light.png" alt="" />
      </div>
      <div className="righside" style={{ marginTop: "30px" }}>
        <Box
          component="form"
          sx={{
            //   "& > :not(style)": { m: 1, width: "50ch" },
            display: "flex",
            flexDirection: "column",
            m: 2,
            width: "50ch",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          {/* <form onSubmit={handleFormSubmit}> */}
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
            }}
          >
            Parshwa Holdings LLC
          </h1>
          <hr />
          <br />

          <br />

          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ p: 1 }}
            value={deatils.name}
            name="name"
            onChange={handleChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              {/* <DatePicker label="Start Time" defaultValue={dayjs('2022-04-17')} /> */}
              <DemoItem>
                <DatePicker
                  sx={{ p: 1 }}
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                  label="Start Time"
                  name="startTime"
                  value={deatils.startTime}
                  onChange={(newValue)=>setDetails({...deatils,startTime:newValue})}
                />
              </DemoItem>
              <DemoItem>
                <DatePicker
                  sx={{ p: 1 }}
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                  label="End Time"
                  name="endTime"
                  value={deatils.endTime}
                  onChange={(newValue)=>setDetails({...deatils,endTime:newValue})}

                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            sx={{ p: 1 }}
            id="Hour_Work"
            type="number"
            label="Hour Work"
            variant="outlined"
            name="hourWork"
            value={deatils.hourWork}
            onChange={handleChange}
          />

          <TextField
            sx={{ p: 1 }}
            id="Hour_Rate"
            label="Hour Rate"
            type="number"
            variant="outlined"
            name="hourRate"
            value={deatils.hourRate}
            onChange={handleChange}
          />

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Supplier Name
            </InputLabel>
            <Select
              sx={{ p: 1 }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="supplierName"
              value={deatils.supplierName}
              onChange={(e)=>{handleSupplierDropdownChange(e);handleChange(e)}}
              label="Supplier Name"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {data
                .map((item) => item.Supplier)
                .map(
                  (item) =>
                    item !== "" && <MenuItem value={item}>{item}</MenuItem>
                )}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Purchase Order
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="PONumber"
              value={deatils.PONumber}
              onChange={(e)=>{handlePONumberDropdownChange(e);handleChange(e)}}
              label="Purchase Order"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {PONumberOptions.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

        

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Description
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="description"
              value={deatils.description}
              onChange={handleChange}
              label="Description"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {descriptionOptions.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <div>
          <label>Description:</label>
          <select
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <option value="">Select an option</option>

            {descriptionOptions.map((item) => (
              <option key={item.id} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div> */}
        {isError && <p style={{color:"red"}}>Please fill all fields!</p>}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <button type="submit">Submit</button> */}
           
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
          {/* </form> */}
          <Link to="/docketList">
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Show Docket List
            </p>
          </Link>
        </Box>
      </div>
    </section>
  }
  </>
  );
}

export default DocketMUI;
