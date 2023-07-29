import './Country.css';

const CountryCard = (props) => {
	let{name,flags,population} = props.data;
	return(
		<div className="country-col">
			<div className="country-card">
				<div className="flag-wrap">
					<img src={flags["svg"]} alt={flags["alt"]} />
				</div>
				<h4 className='title'>{name.common}</h4>
				<div><strong>Population: </strong>{population}</div>
			</div>
		</div>
	);
}
export default CountryCard;