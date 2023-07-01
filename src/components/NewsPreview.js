import './css/NewsPreview.css'

function NewsPreview(props) {
    function truncateDescription(description, wordCount) {
        const words = description.split(' ');
      
        if (words.length <= wordCount) {
          return description;
        }
      
        const truncatedWords = words.slice(0, wordCount);
        const truncatedDescription = truncatedWords.join(' ') + '...';
      
        return truncatedDescription;
    }
    
    return (
        <div className="NewsPreview">
            <h2>{props.post.title} (publicerad {props.post.date})</h2>
            <p>{truncateDescription(props.post.description, 64)}</p>
            <a href={"/information/" + props.post.slug}>läs mer</a>
            <h3>Skriven av <span className='Theme'>{props.post.author}</span></h3>
        </div>
    );
}

export default NewsPreview;