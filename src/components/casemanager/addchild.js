import { React, useState, useEffect } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Form, FormGroup, FormText, FormFeedback, Label, Input, Col, Button } from 'reactstrap';
import { useNavigate,Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Addchild(){
    const [open, setOpen] = useState('1');

    const toggle = (id) => {
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};
    return (
		<Box justifyContent="center">
			<Accordion className="overflow-y-scroll overflow-x-hidden h-full" open={open} toggle={toggle}>
			<Form >
				<AccordionItem>
					<AccordionHeader targetId="1">Section-1</AccordionHeader>
					<AccordionBody accordionId="1">
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
										<option> Admitted by Guardians </option>
									</Input>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="image" sm={2}> Image </Label>
								<Col sm={10}>
									<Input id="image" name="image" placeholder="Image" type="file" accept="image/*" /></Col>
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
							</AccordionBody>
							<AccordionHeader targetId="2">Section-2</AccordionHeader>
							<AccordionBody accordionId="2">
							<FormGroup row>
								<Label for="caseno" sm={2}> Case Number </Label>
								<Col sm={10}>
									<Input id="caseno" name="caseno" placeholder="Case Number" type="text" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="rfa" sm={2}> Reason For Admission </Label>
								<Col sm={10}>
									<Input id="rfa" name="rfa" placeholder="Reason For Admission" type="textarea" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="rff" sm={2}> Reason For Flagging </Label>
								<Col sm={10}>
									<Input id="rff" name="rff" placeholder="Reason For Flagging" type="text" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="lvs" sm={2}> Last Visit Since<span className="text-red-500">*</span> </Label>
								<Col sm={10}>
									<Input id="lvs" name="lvs" placeholder="Last Visit Since" type="text" /></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="lcs" sm={2}> Last Call Since </Label>
								<Col sm={10}>
									<Input id="lcs" name="lcs" placeholder="Last Call Since" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="guardian" sm={2}> Guardian </Label>
								<Col sm={10}>
									<Input id="guardian" name="guardian" placeholder="Guardian" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="sibling" sm={2}>Sibling Details</Label>
								<Col sm={10}>
									<Input id="sibling" name="sibling" placeholder="Sibling Details" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="tshs" sm={2}>Total Shelter Home Stay</Label>
								<Col sm={10}>
									<Input id="tshs" name="tshs" placeholder="Total Shelter Home Stay" type="text"/></Col>
							</FormGroup>
							{/* <FormGroup row>
								<Label for="cwclr" sm={2}>CWC Last Review</Label>
								<Col sm={10}>
									<Input id="cwclr" name="cwclr" placeholder="CWC last review" type="date"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="cwclo" sm={2}>Last CWC Order</Label>
								<Col sm={10}>
									<Input id="cwclo" name="cwclo" placeholder="CWC last order" type="text"/></Col>
							</FormGroup> */}
							<FormGroup row>
								<Label for="casehistory" sm={2}>Case History</Label>
								<Col sm={10}>
									<Input id="casehistory" name="casehistory" placeholder="Case History" type="textarea"/></Col>
							</FormGroup>
							</AccordionBody>
							{/* <AccordionHeader targetId="3">Section-3</AccordionHeader>
							<AccordionBody accordionId="3">
							<FormGroup row>
								<Label for="docscomp" sm={2}>Documents Completed</Label>
								<Col sm={10}>
									<Input id="docscomp" name="docscomp" placeholder="Documents Completed" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="docspend" sm={2}>Documents Pending</Label>
								<Col sm={10}>
									<Input id="docspend" name="docspend" placeholder="Documents Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="newspend" sm={2}>News Paper Publications Pending</Label>
								<Col sm={10}>
									<Input id="newspend" name="newspend" placeholder="News Paper Publications Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="policepend" sm={2}>Police Report Pending</Label>
								<Col sm={10}>
									<Input id="policepend" name="policepend" placeholder="Police Report Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="surrenderpend" sm={2}>Surrender Pending</Label>
								<Col sm={10}>
									<Input id="surrenderpend" name="surrenderpend" placeholder="Surrender Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="status" sm={2}>Status</Label>
								<Col sm={10}>
								<Input id="status" name="status" type="select" >
										<option>Not Assigned</option>	
										<option>Assigned</option>
										<option>Completed </option>
									</Input>
								</Col>
							</FormGroup>
					</AccordionBody> */}
				</AccordionItem>
				<FormGroup row className="justify-content-center">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box marginTop={2} marginLeft={2}>
                            <Button type="submit" color="primary">
                            Submit
                            </Button>
                        </Box>
                        <Box marginTop={2} marginRight={2}>
                            <Button type="submit" color="primary">
                            Add Excel Sheet
                            </Button>
                        </Box>
                    </Box>


            </FormGroup>
		</Form>
		
		</Accordion>
		</Box>
    )
}

export default Addchild;