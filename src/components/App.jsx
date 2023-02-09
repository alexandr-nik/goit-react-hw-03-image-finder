import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosPaxabay } from './ApiPixabay/ApiPixabay';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    page: 0,
    q: '',
    galleryList: [],
    totalHits: null,
    loader: false,
  };
  async getImage() {
    const { page, q } = this.state;
    await AxiosPaxabay(page, q).then(data => {
      this.setState(prevState => ({
        galleryList: [...prevState.galleryList, ...data.hits],
        totalHits: data.totalHits,
        loader: false,
      }));
    });
    setTimeout(() => {
      if (!this.state.totalHits) {
        this.notify();
      }
    }, 0);
  }
  notify() {
    return toast.error('Sorry. Image not found:(', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
  loadMore = () => {
    const page = this.state.page;
    this.setState({ page: page + 1, loader: true });
    setTimeout(() => this.getImage(), 0);
  };
  getFindName = q => {
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
    return (
      <>
        <Searchbar getFindName={this.getFindName} />
        <ImageGallery>
          <ImageGalleryItem
            galleryList={this.state.galleryList}
          ></ImageGalleryItem>
          {Math.ceil(this.state.totalHits / 12) > this.state.page &&
            !this.state.loader && <Button loadMore={this.loadMore} />}
          {this.state.loader && <Loader />}
          </ImageGallery>
        <ToastContainer />
      </>
    );
  }
}
