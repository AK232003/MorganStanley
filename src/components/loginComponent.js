import {React} from 'react';
import { Form,Label,FormGroup, Input,Col,Button } from 'reactstrap';

const LoginComponent=({userName,password,setName,setPassword})=>{
	const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(userName,password);
  }
	return ( <>
		<img src="./logo_scroll.png" alt="logo"></img>
		<div className="row m-4 m-sm-2">
			<Form >
				<FormGroup row >
					<Label for="username" sm={2} >UserName</Label>
					<Col sm={10}>
					<Input  id="username" name="username"  placeholder="User Name" type="text" onChange={(event)=> setName(event.target.value)} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="password" sm={2}>Password</Label>
					<Col sm={10}>
					<Input id="password" name="password" placeholder="********" type="password" onChange={(event)=> setPassword(event.target.value)} />
					</Col>
				</FormGroup>
				<FormGroup check row>
					<Col>
						<Button onClick={(event)=> {handleSubmit(event)} }>Submit</Button>
					</Col>
				</FormGroup>
			</Form>
		</div>
		</>)
}

export default LoginComponent;