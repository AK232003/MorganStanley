import React, {useEffect, useState} from "react";
import {  useLocation } from "react-router-dom";
import { Form,FormGroup, Col, Label,Input,Button } from "reactstrap";

const Report=() => {
	const location = useLocation();
	const [type,setType]=useState(location.pathname.split("/")[5]);
	const mapOfTypes= new Map();
	mapOfTypes.set("newsPaperReport","Newspaper Report");
	mapOfTypes.set("TVReport","TV Report");
	mapOfTypes.set("fileMisingReport","File Missing Report");
	mapOfTypes.set("medicalReport","Medical Report");
	mapOfTypes.set("siReport","SI Report");
	useEffect(()=>{
		setType(location.pathname.split("/")[5]);
	},[location])
	return (
			<div className="h-95 w-95 sm:h-9/10 sm:w-2/5 bg-sideBarColor1  rounded-1 ms-3 m-3 sm:m-2 sm:relative drop-shadow-xl shadow-xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block align-items-center justify-content-center overflow-y-scroll"> 
			<div className="row mt-3 m-2 w-95"> 
				<div className="col p-0 font-bold text-3xl"> {mapOfTypes.get(type)}</div>
				<div className="col-auto p-0"></div>
				<div className="col-auto p-0 justify-self-end "> <div className="w-auto rounded-pill font-medium bg-color2 justify-self-center p-2"> Status</div> </div>
			</div>
			<div className="row m-2 mt-3 w-95">	
			<Form>
			<FormGroup row>
								<Label for="fullname" sm={2}> Full Name </Label>
								<Col sm={10}>
									<Input id="fullname" name="fullname" placeholder="Full Name" type="text" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="gender" sm={2}> Gender </Label>
								<Col sm={10}>
									<Input id="gender" name="gender" placeholder="Gender" type="text" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="dob" sm={2}> Date of Birth </Label>
								<Col sm={10}>
									<Input id="dob" name="dob" placeholder="Date of Birth" type="date" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="age" sm={2}> Estimated Age </Label>
								<Col sm={10}>
									<Input id="age" name="age" placeholder="Estimated Age" type="text" /></Col>
							</FormGroup>

							<FormGroup row>
								<Label for="childCategory" sm={2}> Category </Label>
								<Col sm={10}>
									<Input id="childCategory" name="category" type="select" >
										<option> Abandoned / Family not traceable</option>
										<option> Surrendered</option>
										<option> Orphaned - No Guardians </option>
										<option> Child Admitted in CCI by Family </option>
									</Input>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="image" sm={2}> Image </Label>
								<Col sm={10}>
									<Input id="image" name="image" placeholder="Image" type="file" accept=".jpeg, .jpg, .png" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="state" sm={2}> State </Label>
								<Col sm={10}>
									<Input id="state" name="state" placeholder="State" type="text" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="disctrict" sm={2}> District </Label>
								<Col sm={10}>
									<Input id="disctrict" name="disctrict" placeholder="Disctrict" type="text" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="home" sm={2}> Home </Label>
								<Col sm={10}>
									<Input id="home" name="home" placeholder="Home" type="text" /></Col>
							</FormGroup>
							<Button className="!bg-color3 !border-none !text-textcolor" type="submit">
						Submit
					</Button>
			</Form>
			</div>
		</div>
	)
}

export default Report;
