export const Button = ({ loadMore }) => {
   return (
     <li className="box ImageGalleryItem">
       <button className="Button" type="button" onClick={loadMore}>
         Load More
       </button>
     </li>
   );
};