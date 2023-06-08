import React, { useState } from "react";
// import * as XLSX from "xlsx";
import { Accordion,AccordionItem, Form, FormGroup,AccordionHeader,AccordionBody,Col,Input,Label,Button } from "reactstrap";

function AddchildXL(){
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return (
        <Form className="container mt-4">
            <Accordion  open={open} toggle={toggle}>
    
                <AccordionItem>
                {/* <Accordion open={open} toggle={toggle}> */}
                        <AccordionHeader targetId="1">Insert Excel Sheet</AccordionHeader>
                        <AccordionBody accordionId="1">
                        <Label for="excelsheet" sm={2} >Excel Sheet</Label>
                            <Col sm={10}> <Input id="excelsheet" name="excelsheet" type="file" accept=".xlsx"  />
                            </Col>
                        </AccordionBody>
                    </AccordionItem>
                <FormGroup row>
                    <div className="col-2 m-2">
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </div>
                </FormGroup>
            </Accordion>
            </Form>
      );
}

export default AddchildXL;