import './BookCard.css';
import { AiFillStar } from "react-icons/ai";
import { BiSolidBookAlt } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";

const BookCard = (props) => {
	
	const {title,author_name,currently_reading_count,isbn,first_publish_year,number_of_pages_median,ratings_average,ratings_count,want_to_read_count} = props.data;
	return(
		<div className="list-col">
			<div className="bookcard sm-flex">
				<div className="cover-wrap">
					{isbn && isbn.length>0 &&
						<img src={`https://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg`} alt={title} className="fit cover-img" />
					}
				</div>
				<div className='content-wrap'>
					<h3 className='m0 book-title'>{title}</h3>
					<div className='publish-year'>(Published in: {first_publish_year})</div>
					<div className="mt1"><strong>Author: </strong> {author_name}</div>
					{currently_reading_count>0 &&
						<div className=""><strong>Currently reading: </strong>{currently_reading_count}</div>
					}
					
					<div className='flex book-meta-wrap'>
						{(ratings_average!==null && ratings_average>0) &&(
							<div className="book-meta">
								<AiFillStar />
								<span>{ratings_average.toFixed(1)} ({ratings_count} Reviews)</span>
							</div>
						)} 
						{(number_of_pages_median!==null && number_of_pages_median>0) && (
							<div className='book-meta'>
								<BiSolidBookAlt />
								<span>{number_of_pages_median} Pages</span>
							</div>
						)}

						{(want_to_read_count!==null && want_to_read_count>0) && (
							<div className='book-meta'>
								<MdFavorite />
								<span>{want_to_read_count} Want to read</span>
							</div>	
						)}
					</div>

					{(isbn && isbn.length>0) &&
						<div className='mt2'>
							<a href={`https://openlibrary.org/isbn/${isbn[0]}`} className='btn btn-primary' target='_blank' rel="noreferrer">View Details</a>
						</div>
					}
				</div>
			</div>
		</div>
	);
}
export default BookCard;