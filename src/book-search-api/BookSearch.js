import { useState } from 'react';
import './BookSearch.css'; 
import BookCard from './BookCard';

const BookSearch  = () => {
	const [inputVal, setInputVal] = useState("");
	const [loading,setLoading] = useState(false)
	const[books, setBooks] =  useState([]);

	const handleInputChange = (e) => {
		setInputVal(e.target.value);
	}

	const fetchBooks = async(p) => {
		try {
			setLoading(true)
			const response = await fetch(`https://openlibrary.org/search.json?title=${inputVal}&page=${p}`);
      const data = await response.json();
      setBooks(data);
			setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
	}

	const handleSubmit = (e,page_num) => {
		e.preventDefault();
		if(e.target.classList.contains('pg-btn')){
			let pg_btns =  document.querySelectorAll('.pg-btn');
			pg_btns.forEach(el => el.classList.remove("active"));
			e.target.classList.add("active")	
		}
		fetchBooks(page_num);
	}
  return(
		<>
			{loading===true && 
				<div className='loader'>
					<div className='loader-content'>
						<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXLink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
							<path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
								<animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
							</path>
						</svg>
						<span>Fetching data...</span>
					</div>
				</div>
			}
			<section className="form-section">
				<div className='container'>
					<div className="form-wrap">
						<form onSubmit={(e)=>handleSubmit(e,1)} autoComplete='off'>
							<div className="flex">
								<input
									type="search"
									id="search-input"
									className="flex-auto m0 field rounded-left border-none form-control"
									placeholder="Search book by title"
									required
									value={inputVal} 
									onChange={handleInputChange} />
								<button className="btn btn-primary rounded-right border-none">Search Book</button>
							</div>
						</form>
					</div>
				</div>
				
				{books.numFound>100 &&
					<div className='container'>
						<div className='flex mt4 flex-wrap pagination'>
							{(()=>{
								let page_count = null;
								page_count = (books.numFound>100 && books.numFound%100 !== 0) ? Math.floor(books.numFound/100)+1 : Math.floor(books.numFound/100)

								return Array.from(
									{ length: page_count },
									(_, i) => (
										<button className={`pg-btn ${i === 0 ? 'active' : ''}`} key={i+1} onClick={(e)=>handleSubmit(e,i+1)}>{i+1}</button>
									)
								);
							})()}
						</div>
					</div>
				}
				{books.numFound>0 &&
					<div className='result-wrapper mt2'>
						<div className='container'>
							<div className='list-row'>
								{books.docs.map((el,i)=>{
									return(
										<BookCard key={el.key} data={el} />
									);
								})}
							</div>
						</div>
					</div>
				}
				{books.numFound===0 &&
					<div className='container mt4 no-book-msg'>No book found. Try another keyword.</div>
				}
			</section>
		</>
	);
}

export default BookSearch;