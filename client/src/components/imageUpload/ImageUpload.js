import React, { Component } from "react";
import Spinner from "./Spinner";
import Images from "./Image";
import Button from "./Button";

export default class App extends Component {
  state = {
    uploading: false,
    images: [],
    imgPreview: null,
    avatar: false,
    banner: false
  };

  onChange = e => {
    const files = Array.from(e.target.files);
    // const file = Array.from(e.target.files[0]);

    const { type } = this.props;
    this.setState({ uploading: true });
    const formData = new FormData();

    files.forEach((file, i) => {
      this.setState({ imgPreview: file });
      formData.append(type, file, file.name);
    });

    fetch("/api/profile/uploadImg", {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: localStorage.jwtToken
        // "Content-Type": "application/json"
      },
      body: formData
      // onUploadProgress: progressEvent => {
      //   console.log(progressEvent.loaded / progressEvent.total);
      // }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          uploading: false
        });

        console.log(res);
        
        // if(res.user) {
        //   this.setState({
        //     images: res.user
        //   });
        // }
        if (this.state.images & this.state.images.avatar) {
          this.setState({
            avatar: true
          });
        }
        if (this.state.images.bannerImg) {
          this.setState({
            banner: true
          });
        }
      });
  };

  // removeImage = id => {
  //   this.setState({
  //     images: this.state.images.filter(image => image.public_id !== id)
  //   });
  // };

  render() {
    const { uploading, imgPreview, images, avatar, banner } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case imgPreview !== null && avatar:
          return (
            <Images images={images.avatar} removeImage={this.removeImage} />
          );
        case imgPreview !== null && banner:
          return (
            <Images images={images.bannerImg} removeImage={this.removeImage} />
          );
        default:
          return (
            <Button style={{ textAlign: "right" }} onChange={this.onChange} />
          );
      }
    };

    return (
      <div>
        <div className="buttons">{content()}</div>
      </div>
    );
  }
}
