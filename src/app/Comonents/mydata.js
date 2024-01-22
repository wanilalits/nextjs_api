"use client"
import React, { useState, useEffect } from 'react';

function Mydata(props) {

	const [firstname, setFirstName] = useState(null)
	const [lastname, setLastName] = useState(null)
	const [address, setAddress] = useState(null)
	const [apidata, setApidata] = useState(null)
	const [enableedit, setEnableedit] = useState(null)
	
	useEffect(() => {
		
		getapi()
		
	}, [])

const detmyip =()=>{
	var http = require('http');

http.get({'host': 'http://localhost/', 'port': 3000, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    console.log("My public IP address is: " + ip);
  });
});
}

	const getapi = () => {
		fetch(window.location.href+'/api/logs').then((resp) => {
			resp.json().then((result) => {
				setApidata(result.result)
				//console.log(apidata)
				//console.log(result[2])
				//console.log(result)
				//{cache:"force-cache"}
			})
		})

	};



	const enableupdate = (_id, a, b, c) => {
		setFirstName(a)
		setLastName(b)
		setAddress(c)
		setEnableedit(_id)
		
	};



	const updateAPI = async (id) => {
		let data = await fetch(window.location.href+'/api/logs/' + id, {
			method: "PUT",
			body: JSON.stringify({ firstname, lastname, address })
		});
		data = await data.json();
		if (data.sucess) {
			alert('updated')
			getapi()
		}
		else { alert('not update') }
		
		setEnableedit(null)
	};

	const postAPI = async () => {
		let data = await fetch(window.location.href+'/api/logs', {
			method: "POST",
			body: JSON.stringify({ firstname, lastname, address })
		});
		data = await data.json();
		if (data.sucess) {
			alert('updated')
			getapi()
		}
		else { alert('not update') }
		
		
	
		
	};





	const deletelog = async (id) => {
		let response = await fetch(window.location.href+'/api/logs/' + id, {
			method: 'delete'
		});
		response = await response.json();
		if (response.sucess) {
			//alert('record deleted')
			getapi()

		}
	};

	return (
		<div>

 <h3 style={{ border: '1px solid black', color:'blue' }}>nextjs frontend---reactjs library---mongodb database---nextjs backend---CSS and validation ignore</h3>
			


			<div>

			GET API --------url/api/logs
			<br></br>
			GET API/_id --------url/api/logs/65aa45b559260a92717c24ad
			<br></br>
			PUT API/_id --------url/api/logs/65aa45b559260a92717c24ad
			<br></br>
			POST API --------url/api/logs
			<br></br>
			DELETE API/_id --------url/api/logs/65aa45b559260a92717c24ad
			<br></br>	<br></br>	<br></br>	<br></br>
				<div>

					<input type='text' onChange={(e) => (setFirstName(e.target.value))} defaultValue={null} placeholder='First Name' />
					<input type='text' onChange={(e) => (setLastName(e.target.value))} defaultValue={null} placeholder='Last Name' />
					<input type='text' onChange={(e) => (setAddress(e.target.value))} defaultValue={null} placeholder='Address' />
					<button onClick={() => postAPI()}>{'add new'}</button>

				</div>
				
				
				<table className="container" >
					<thead  >
						<tr   >
							<th style={{ border: '1px solid black' }}>
								id
							</th>
							<th style={{ border: '1px solid black' }}>
								_id
							</th>
							<th style={{ border: '1px solid black' }}>
								First Name
							</th>
							<th style={{ border: '1px solid black' }}>
								Last Name
							</th>
							<th style={{ border: '1px solid black' }}>
								Address
							</th>
							<th style={{ border: '1px solid black' }}>
								Action
							</th>
						</tr>
					</thead>
					{apidata !== null ?
						<tbody>
							{
								apidata.map((item, id) => (
									enableedit === item._id ?
										<tr key={item.id} >
											<td style={{ border: '1px solid black' }} >{id}</td>
											<td style={{ border: '1px solid black' }}>{item._id}</td>
											<td style={{ border: '1px solid black' }}> <input type='text' onChange={(e) => (setFirstName(e.target.value))} defaultValue={item.firstname} placeholder='update First Name' />  </td>
											<td style={{ border: '1px solid black' }}> <input type='text' onChange={(e) => (setLastName(e.target.value))} defaultValue={item.lastname} placeholder='update Last NAme' />  </td>
											<td style={{ border: '1px solid black' }}> <input type='text' onChange={(e) => (setAddress(e.target.value))} defaultValue={item.address} placeholder='update Address' />  </td>
											<td style={{ border: '1px solid black' }}> <button onClick={() => updateAPI(item._id)}>Update</button>
												<button disabled >Remove</button>  </td>
										</tr>
										: <tr key={item.id}>
											<td style={{ border: '1px solid black' }}> {id} </td>
											<td style={{ border: '1px solid black' }}> {item._id} </td>
											<td style={{ border: '1px solid black' }}> {item.firstname} </td>
											<td style={{ border: '1px solid black' }}> {item.lastname} </td>
											<td style={{ border: '1px solid black' }}> {item.address} </td>
											<td style={{ border: '1px solid black' }}><button onClick={() => enableupdate(item._id, item.firstname, item.lastname, item.address)}> Edit</button>
												<button onClick={() => deletelog(item._id)}>Remove</button> </td>

										</tr>
								))}
						</tbody>
						: <tbody>
							<tr>
								<td>please wait....</td>
							</tr>
						</tbody>
					}
				</table>

			</div>





		</div>
	);
}

export default Mydata;
