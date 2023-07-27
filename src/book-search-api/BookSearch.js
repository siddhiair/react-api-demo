import { useState } from 'react';
import './BookSearch.css'; 
import BookCard from './BookCard';

const BookSearch  = () => {
	const [inputVal, setInputVal] = useState("");
	const[books, setBooks] =  useState([]);

	const handleInputChange = (e) => {
		setInputVal(e.target.value);
	}

	const fetchBooks = async() => {
		try {
			const response = await fetch(`https://openlibrary.org/search.json?title=${inputVal}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchBooks();
	}
  return(
		<section className="form-section">
			<div className="form-wrap">
				<form onSubmit={handleSubmit} autoComplete='off'>
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
			{books.numFound>0 &&
				<div className='result-wrapper mt4'>
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
		</section>
	);
}

export default BookSearch;