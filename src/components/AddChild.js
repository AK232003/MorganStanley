import { React, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Form, FormGroup, FormText, FormFeedback, Label, Input, Col, Button } from 'reactstrap';

const AddChild = () => {
	const [open, setOpen] = useState('1');
	const toggle = (id) => {
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};
	const handleSubmitInformation = (event) => {
		event.preventDefault();
		console.log(event);
	}
	const handleSubmitFamilyBackground = (event) => {
		event.preventDefault();
		console.log(event);
	}

	return (
		<div className="container">
			<Form onSubmit={(event) => handleSubmitInformation(event)}>
			<Accordion open={open} toggle={toggle}>
				<AccordionItem>
					<AccordionHeader targetId="1">Information</AccordionHeader>
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
									</Input>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="birthplace" sm={2}> Place of Birth </Label>
								<Col sm={10}>
									<Input id="birthplace" name="birthplace" placeholder="Birth Place" type="text" /></Col>
							</FormGroup>
					</AccordionBody>
				</AccordionItem>
				<AccordionItem>
					<AccordionHeader targetId="2">Family Background</AccordionHeader>
					<AccordionBody accordionId="2">
					<FormGroup row>
						<Label for="parentname" sm={2}> Name of Parent </Label>
						<Col sm={10}>
							<Input id="parentname" name="parentname" placeholder="Parent Name" type="text" /></Col>
					</FormGroup>
					<FormGroup row>
						<Label for="occupation" sm={2}> Occupation </Label>
						<Col sm={10}>
							<Input id="occupation" name="occupation" placeholder="Occupation" type="text" /></Col>
					</FormGroup>
					<FormGroup row>
						<Label for="income" sm={2}> Income </Label>
						<Col sm={10}>
							<Input id="income" name="income" placeholder="Income" type="number" /></Col>
					</FormGroup>
					<FormGroup row>
						<Label for="address" sm={2}> Address </Label>
						<Col sm={10}>
							<Input id="address" name="address" placeholder="Address" type="textarea" /></Col>
					</FormGroup>
					<FormGroup row>
						<Label for="infor" sm={2}> Information of Family Numbers </Label>
						<Col sm={10}>
							<Input id="infor" name="infor" placeholder="Family information" type="textarea" /></Col>
					</FormGroup>
					
					<FormGroup row>
						<Label for="reason" sm={2}> Reason for addmission </Label>
						<Col sm={10}>
							<Input id="reason" name="reason" placeholder="Reason" type="textarea" /></Col>
					</FormGroup>
					</AccordionBody>
				</AccordionItem>
				<AccordionItem>
					<AccordionHeader targetId="3">Medical History</AccordionHeader>
					<AccordionBody accordionId="3">
					<FormGroup row>
						<Label for="medicalinfo" sm={2}> Name of Parent </Label>
						<Col sm={10}>
							<Input rows={10} id="medicalinfo" name="medicalinfo" placeholder={`Medical History \n Existing Medical Conditions \n Known Allergies \n Vaccination History \n Previous Medical treatments/surgeriess \n Current Medication`} type="textarea" /></Col>
					</FormGroup>
					</AccordionBody>
				</AccordionItem>
				<AccordionItem>
					<AccordionHeader targetId="4">Education and Skills</AccordionHeader>
					<AccordionBody accordionId="4">
					<FormGroup row>
						<Label for="education" sm={2}> Education and Skills </Label>
						<Col sm={10}>
							<Input rows={10} id="education" name="education" placeholder={`Educational background \n School Enrollment Details\n Special Skills/Talents`} type="textarea" /></Col>
					</FormGroup>
					</AccordionBody>
				</AccordionItem>
				<AccordionItem>
					<AccordionHeader targetId="5">Documents</AccordionHeader>
					<AccordionBody accordionId="5">
					<FormGroup row>
						<Label for="birthcertificate" sm={2} > Birth Certificate </Label>
						<Col sm={10}> <Input id="birthcertificate" name="birthcertificate" type="file"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="oprhancertificate" sm={2} > Orphan Certificate </Label>
						<Col sm={10}> <Input id="oprhancertificate" name="oprhancertificate" type="file"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="socialinvesreport" sm={2} > Social Investigation Report </Label>
						<Col sm={10}> <Input id="socialinvesreport" name="socialinvesreport" type="file"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="childimage" sm={2} > Child Image </Label>
						<Col sm={10}> <Input id="childimage" name="childimage" type="file" accept=".jpeg.jpg.png"/>
						</Col>
					</FormGroup>
					</AccordionBody>
				</AccordionItem>
			</Accordion>
			<FormGroup row>
				<div className="col-2 m-2">
					<Button type="submit" color="primary">
						Submit
					</Button>
				</div>
			</FormGroup>
		</Form>
		</div>
	);
}
export default AddChild
