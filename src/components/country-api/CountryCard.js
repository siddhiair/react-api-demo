import './Country.css';
import { useState } from 'react';
import DetailsModal from './DetailsModal';

const CountryCard = (props) => {
	const [modalShown,setModalShown] = useState(false);
	const {name,flags,population,capital} = props.data;

	const toggleModal = (e,val) =>  {
		setModalShown(val);
	}
	return(
		<>
			<div className="country-col">
				<div className="country-card">
					<div className="flag-wrap">
						<img src={flags["svg"]} alt={flags["alt"]} />
					</div>
					<h4 className='title'>{name.common}</h4>
					<div><strong>Capital/s: </strong>
						{capital && capital.join(", ")}
					</div>
					<div><strong>Population: </strong>{population.toLocaleString()}</div>	

					<div className='mt2'>
						<button onClick={(e)=>toggleModal(e,true)} className='inline-block py1 px0 text-btn'>Know More</button>
					</div>			
				</div>
			</div>
			{modalShown && 
				<DetailsModal data={props.data} handleModalShown={(e,val)=>toggleModal(e,val)} />
			}
		</>
	);
}
export default CountryCard;