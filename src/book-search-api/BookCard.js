import './BookCard.css';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const BookCard = (props) => {
	
	const {title,author_name,currently_reading_count,already_read_count,isbn,first_publish_year,number_of_pages_median,ratings_average,ratings_count,want_to_read_count} = props.data;
	let rating = null;
	if(ratings_average && ratings_average>0){
		rating = ratings_average/5*100;
	}
	console.log(props.data)
	return(
		<div className="list-col">
			<div className="bookcard sm-flex">
				<div className="cover-wrap">
					{isbn && isbn.length>0 &&
						<img src={`https://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg`} alt={title} className="fit cover-img" />
					}
				</div>
				<div className='content-wrap'>
					<h3>{title}</h3>
					<div>Published in: {first_publish_year}</div>
					<div className=""><strong>Author: </strong> {author_name}</div>
					<div className=""><strong>Currently reading: </strong>{currently_reading_count}</div>
					
					{rating &&
						<div className=""><strong>Avg. Rating: </strong>
							<div class="rating">
								<div className="rating-filled" style={{width: `${rating}%`}}>
									<AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
								</div>
								<div className='rating-empty'>
									<AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar />
								</div>
							</div>
							{`${ratings_average.toFixed(1)} (${ratings_count} Reviews)`}
						</div>
					} 

					{isbn && isbn.length>0 &&
						<div className='mt2'>
							<a href={`https://openlibrary.org/isbn/${isbn[0]}`} className='btn btn-primary' target='_blank' rel='noreferer'>View Details</a>
						</div>
					}
				</div>
			</div>
		</div>
	);
}
export default BookCard;