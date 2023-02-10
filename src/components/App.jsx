import { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import { AxiosPaxabay } from './ApiPixabay';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { erroMesage } from './errorMessage';

export class App extends PureComponent {
  state = {
    page: 0,
    q: '',
    galleryList: [],
    totalHits: null,
    loader: false,
  };
  async getImage() {
    const { page, q } = this.state;
    const query = q.trim();
    if (query === '') {
      erroMesage('Please enter something');
      this.setState({ loader: false });
      return;
    }
    await AxiosPaxabay(page, query)
      .then(data => {
        this.setState(prevState => ({
          galleryList: [...prevState.galleryList, ...data.hits],
          totalHits: data.totalHits,
          loader: false,
        }));
      })
      .catch(e => {
        erroMesage(e);
      });
    setTimeout(() => {
      if (!this.state.totalHits) {
        erroMesage('Sorry. Image not found:(');
      }
    }, 0);
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loader: true,
    }));
    setTimeout(() => this.getImage(), 0);
  };
  searchImages = q => {
    this.setState({
      q,
      page: 1,
      galleryList: [],
      totalHits: null,
      loader: true,
    });
    setTimeout(() => this.getImage(), 0);
  };
  render() {
    const { galleryList, totalHits, page, loader } = this.state;
    return (
      <>
        <Searchbar getFindName={this.searchImages} />
        <ImageGallery>
          <ImageGalleryItem galleryList={galleryList} />
          {Math.ceil(totalHits / 12) > page && !loader && (
            <Button loadMore={this.loadMore} />
          )}
          {loader && <Loader />}
        </ImageGallery>
        <ToastContainer />
      </>
    );
  }
}
