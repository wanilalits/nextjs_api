"use client"
import React, { useState, useEffect } from 'react';

function Mydata(props) {
	const [firstname, setFirstName] = useState(null)
	const [lastname, setLastName] = useState(null)
	const [address, setAddress] = useState(null)
	const [apidata, setApidata] = useState(null)
	const [enableedit, setEnableedit] = useState(null)
	const [enabledelete, setEnabledelete] = useState(null)

	useEffect(() => {
		getapi()
	}, [])

	const getapi = () => {
		setEnabledelete(true)
		fetch(window.location.href + '/api/logs').then((resp) => {
			resp.json().then((result) => {
				setApidata(result.result)
				//console.log(apidata)
				//console.log(result[2])
				//console.log(result)
				//{cache:"force-cache"}
				setEnabledelete(false)
			})
		})
	};

	const enableupdate = (_id, a, b, c) => {
		setFirstName(a)
		setLastName(b)
		setAddress(c)
		setEnableedit(_id)
		setEnabledelete(true)
	};

	const updateAPI = async (id) => {
		let data = await fetch(window.location.href + '/api/logs/' + id, {
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
		setEnabledelete(false)
	};

	const postAPI = async () => {
		let data = await fetch(window.location.href + '/api/logs', {
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
		setEnabledelete(true)
		let response = await fetch(window.location.href + '/api/logs/' + id, {
			method: 'delete'
		});
		response = await response.json();
		if (response.sucess) {
			//alert('record deleted')
			getapi()
			setEnabledelete(false)
		}
	};

	return (
		<div>
		
			{//<h3 style={{ border: '1px solid black', color:'#ff0040',    textAlign: 'center' }}>nextjs frontend---reactjs library---mongodb database---nextjs backend---CORS configured---validation and CSS ignored</h3>
			}
			
			
			<div>
				GET API --------https://vijay-xi.vercel.app/api/logs
				<br></br><br></br>
				GET API/_id --------https://vijay-xi.vercel.app/api/logs/65aa45b559260a92717c24ad
				<br></br> <br></br>
				PUT API/_id --------https://vijay-xi.vercel.app/api/logs/65aa45b559260a92717c24ad
				<br></br><br></br>
				POST API --------https://vijay-xi.vercel.app/api/logs
				<br></br><br></br>
				DELETE API/_id --------https://vijay-xi.vercel.app/api/logs/65aa45b559260a92717c24ad
				<br></br><br></br>
				Pass data through web page link --------https://vijay-xi.vercel.app/api/req/user_data
				<br></br>	<br></br>	<br></br>	<br></br>
				<div>
					<input type='text' onChange={(e) => (setFirstName(e.target.value))} defaultValue={null} placeholder='First Name' />
					<input type='text' onChange={(e) => (setLastName(e.target.value))} defaultValue={null} placeholder='Last Name' />
					<input type='text' onChange={(e) => (setAddress(e.target.value))} defaultValue={null} placeholder='Address' />
					<button onClick={() => postAPI()}>{'add new'}</button>
				</div>
				<div >
					<table className="container"  >
						<thead  >
							<tr>
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
							<tbody >
								{
									apidata.map((item, id) => (
										enableedit === item._id ?
											<tr key={item.id}  style={{cursor: 'cell' }}>
												<td style={{ border: '1px solid black'}} >{id}</td>
												<td style={{ border: '1px solid black' }}>{item._id}</td>
												<td style={{ border: '1px solid black' }}> <input type='text' onChange={(e) => (setFirstName(e.target.value))} defaultValue={item.firstname} placeholder='update First Name' />  </td>
												<td style={{ border: '1px solid black' }}> <input type='text' onChange={(e) => (setLastName(e.target.value))} defaultValue={item.lastname} placeholder='update Last Name' />  </td>
												<td style={{ border: '1px solid black' }}> <input type='text' onChange={(e) => (setAddress(e.target.value))} defaultValue={item.address} placeholder='update Address' />  </td>
												<td style={{ border: '1px solid black' }}> <button onClick={() => updateAPI(item._id)}>Update</button>
													<button disabled={enabledelete} >Remove</button>  </td>
											</tr>
											: <tr key={item.id}  style={{ cursor: 'no-drop' }}>
												<td style={{ border: '1px solid black',cursor: 'none' }}> {id} </td>
												<td style={{ border: '1px solid black' }}> {item._id} </td>
												<td style={{ border: '1px solid black' }}> {item.firstname} </td>
												<td style={{ border: '1px solid black' }}> {item.lastname} </td>
												<td style={{ border: '1px solid black' }}> {item.address} </td>
												<td style={{ border: '1px solid black' }}><button onClick={() => enableupdate(item._id, item.firstname, item.lastname, item.address)}  > Edit</button>
													<button onClick={() => deletelog(item._id)} disabled={enabledelete}>Remove</button> </td>
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
		</div>
	);
}

export default Mydata;
