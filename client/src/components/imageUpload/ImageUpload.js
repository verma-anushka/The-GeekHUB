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
        console.log(res.user);
        this.setState({
          uploading: false,
          images: res.user
        });

        if (this.state.images.avatar) {
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

    console.log(images.bannerImg);
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

// Loop through all elements x in the first array and check all elements u in the second array for any elements with abs(x-y) <= d.
// For the rows with no reserved seats, the answer is 2. For the other rows, we will try to use 4 seats starting at columns 2, 4, and 6 (in this order).
// Calculate the power for each element, create the pairs (power, element), then sort the pairs lexicographically and find the kth element.
// Find the maximum non-adjacent subsequence sum of length n/3. This can be done with dp[i][j] = max sum of j elements from first i elements.
