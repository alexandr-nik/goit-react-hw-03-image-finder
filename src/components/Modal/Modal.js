import { Component } from 'react';
import disableScroll from 'disable-scroll';
export class Modal extends Component {
  closeModalWindow = e => {
    if (e.currentTarget === e.target) {
      this.closeModal();
    }
  };
  // preventScroll = e => {
  //   e.preventDefault();  
  // };
  windowEventListner = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };
  closeModal() {
    this.props.closeModal();
  }
  componentDidMount() {
    window.addEventListener('keydown', this.windowEventListner);
    // window.addEventListener('wheel', this.preventScroll, { passive: false });
    disableScroll.on();
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.windowEventListner);
    // window.removeEventListener('wheel', this.preventScroll);
    disableScroll.off();
  }
  render() {
    const { alt, src } = this.props;
    return (
      <div className="Overlay" onClick={this.closeModalWindow}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
