import { useEffect, useState } from "react";

const DetailsModal = ({data,handleModalShown}) => {
	const [shownClass,setShownClass] = useState(false)

	useEffect(()=>{
		setShownClass(true)
	},[])

	const {name,flags,population,capital,currencies,independent,continents,subregion,languages,timezones,maps} = data;
  return(
		<>
			<div className={`modal ${shownClass ? 'shown' : ''}`}>
				<div className="modal-content">
					<div className='modal-header'>
						<button type="button" onClick={()=>handleModalShown(false)} className="close-modal">X Close</button>
					</div>
					<div className="modal-body p3">
						<div className="row clearfix">
							<div className="sm-col sm-col-3 md-col-4 lg-col-5">
								<div className="flag-wrap">
									<img src={flags["svg"]} alt={flags["alt"]} />
								</div>
							</div>
							<div className="sm-col sm-col-9 md-col-8 lg-col-7">
								<h2 className="title mt0">{name.common}</h2>
								{capital &&
									<div><strong>Capital/s: </strong>
										{capital.join(", ")}
									</div>
								}
								{
									currencies && 
									<div className="mt1">
										<h4 className="m0">Currency:</h4>
										{
											Object.keys(currencies).map((key, i)=>{
												return(
													<div className="" key={i}>
														- {currencies[key].name} ({currencies[key].symbol})
													</div>
												);
											})
										}
									</div>
								}
							</div>
						</div>
						<hr></hr>
						<div>
							<h3>Other Information:</h3>
							<table>
								<tbody>
									<tr>
										<td>Independent?</td>
										<td>{independent ? "Yes" : "No"}</td>
									</tr>
									<tr>
										<td>Population</td>
										<td>{population.toLocaleString()}</td>
									</tr>
									{continents && continents.length>0 &&
										<tr>
											<td>Continent/s</td>
											<td>{continents.join(", ")}</td>
										</tr>
									}
									{subregion && 
										<tr>
											<td>Sub-Region</td>
											<td>{subregion}</td>
										</tr>
									}
									{languages &&
										<tr>
											<td>Language/s</td>
											<td>{Object.values(languages).join(", ")}</td>
										</tr>
									}
									{timezones && timezones.length>0 &&
										<tr>
											<td>Timezone/s</td>
											<td>{timezones.join(", ")}</td>
										</tr>
									}
									{maps && maps.googleMaps && 
										<tr>
											<td>Google Map Link</td>
											<td><a href={maps.googleMaps} target="_blank" rel="noreferrer">Click Here</a></td>
										</tr>
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop"></div>
		</>
	);
}
export default DetailsModal;