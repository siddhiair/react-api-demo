import Loader from "../../components/common/Loader";
import CountryCard from "./CountryCard";
import { useState, useEffect } from "react";
import './Country.css';

const Country = () => {
	const [countries, setCountries] = useState([]); //state used to hold the initial api data
	const [filteredCountries, setFilteredCountries] = useState([]); //state used to display the data
	const [loading,setLoading] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [lang,setLang] = useState([]);
	const [continents,setContinents] = useState([]);
	const [sortInput, setSortInput] = useState("");
	const [langInput, setLangInput] = useState("");
	const [continentInput, setContinentInput] = useState("");

	useEffect(() => {
		const fetchCountries = async() => {
			try {
				setLoading(true)
				const response = await fetch('https://restcountries.com/v3.1/all');
				const data = await response.json();
				setCountries(data);
				setFilteredCountries(data);
				setLoading(false);

				//set languages array
				const langValues = data.reduce((acc, obj) => {
					if(obj.languages){
						const objLangValues = Object.values(obj.languages);
						acc.push(...objLangValues);
					}		
					return acc;
				},[]);
				// Get unique language values from acc array using a Set and sort them alphabetically
				const uniqueLangValues = [...new Set(langValues.sort())];
				setLang(uniqueLangValues);
				setLangInput("");

				//set continents array
				const continentValues = data.reduce((acc, obj) => {
					if(obj.continents && obj.continents.length>0){
						acc.push(...obj.continents);
					}		
					return acc;
				},[]);
				// Get unique continents values from acc array using a Set and sort them alphabetically
				const uniqueContinentValues = [...new Set(continentValues.sort())];
				setContinents(uniqueContinentValues);
				setContinentInput("")

			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchCountries();
	},[]);

	const filterCountries = (e) => {
		setSearchInput(e.target.value);
		setSortInput("");
		setLangInput("");
		setContinentInput("");
		if(searchInput !== ""){
			const result = [...countries].filter(obj=> obj.name.common.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
			setFilteredCountries(result);
		}
	}

	const sortCountries = (e) => {
		setSearchInput("");
		setLangInput("");
		setContinentInput("");
		if(e.target.value === "population-asc"){
			console.log(countries[0])
			setSortInput("population-asc");
			const result = [...countries].sort((a, b) => a.population - b.population);
			setFilteredCountries(result);
		}
		else if(e.target.value === "population-desc"){
			console.log(countries[0])
			setSortInput("population-desc");
			const result = [...countries].sort((a, b) => b.population - a.population);
			setFilteredCountries(result);
		}
	}

	const filterByLang = (e) => {
		let searchedLang = e.target.value; 
		setSortInput("");
		setSearchInput("");
		setContinentInput("");
		setLangInput(searchedLang);
		const result = [...countries].map(obj=> {
			if(obj.languages){
				const langList = Object.values(obj.languages);
				if(langList.includes(searchedLang)){
					return obj;
				}
			}
			return null;
		})
		.filter((obj) => obj !== null); //returns objects that are not null
		setFilteredCountries(result);
	}

	const filterByContinent = (e) => {
		let searchedContinent = e.target.value; 
		setSortInput("");
		setLangInput("");
		setSearchInput("");
		setContinentInput(searchedContinent);
		const result = [...countries].map(obj=> {
			if(obj.continents  && obj.continents.length>0){
				if(obj.continents.includes(searchedContinent)){
					return obj;
				}
			}
			return null;
		})
		.filter((obj) => obj !== null); //returns objects that are not null
		setFilteredCountries(result);
	}

	return(
		<>
			{loading===true && 
				<Loader />
			}
			<div className="filters-wrap form-wrap mt3">
				<div className="container">
					<div className="clearfix row">
						<div className="search-wrap sm-col md-col-6 mt2">
							<input type="text" id="country" name="country" autoComplete="off" placeholder="Type Country Name here..." className="form-control" value={searchInput} onChange={filterCountries} />
						</div>
						{/*search input ends*/}
						
						<div className="sort-wrap sm-col md-col-3 mt2">
							<select className="form-control" value={sortInput} onChange={sortCountries}>
								<option disabled value="">--Sort countries--</option>
								<option value="population-asc">Population (Lowest to Highest)</option>
								<option value="population-desc">Population (Highest to Lowest)</option>
							</select>
						</div>
						{/*sort dropdown ends*/}

						<div className="sort-wrap sm-col md-col-3 mt2">
							<select className="form-control" value={langInput} onChange={filterByLang}>
								<option disabled value="">--Filter by Language--</option>
									{lang.map((el,i) => <option key={i} value={el}>{el}</option>)}
							</select>
						</div>
						{/*language filter ends*/}

						<div className="sort-wrap sm-col md-col-3 mt2">
							<select className="form-control" value={continentInput} onChange={filterByContinent}>
								<option disabled value="">--Filter by Continent--</option>
									{continents.map((el,i) => <option key={i} value={el}>{el}</option>)}
							</select>
						</div>
						{/*continent filter ends*/}

					</div>
				</div>
			</div>
			<div className="container py4">
				<div className="flex flex-wrap country-list">
					{filteredCountries.map((el,i)=>{
						return(
							<CountryCard key={i} data={el} />
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Country;