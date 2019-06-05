import React, { Component } from "react";
import {
  Media,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import img1 from "../../Assets/Image/1.jpg";
import img2 from "../../Assets/Image/2.jpg";
import img3 from "../../Assets/Image/3.jpg";
import img4 from "../../Assets/Image/4.jpg";
import "../../Assets/Stylesheet.css";

class CustomCarousel extends Component {
  state = {
    modal: false,
    activeIndex: 0,
    items: [
      {
        src: img1,
        altText: "Picture 1",
        caption: ""
      },
      {
        src: img2,
        altText: "Picture 2",
        caption: ""
      },
      {
        src: img3,
        altText: "Picture 3",
        caption: ""
      },
      {
        src: img4,
        altText: "Picture 3",
        caption: ""
      }
    ]
  };

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.toggle();
  };

  render() {
    const slides = this.state.items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <Card style={{background: "black"}}>
            <CardImg
              top
              src={item.src}
              alt={item.altText}
              className="CarouselImage"
            />
            <CardBody>
              <CardText className="CarouselText">
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </CardText>
            </CardBody>
          </Card>
{/*
          <Media>
            <Media top href="#">
              <Media
                object
                src={item.src}
                alt={item.altText}
                style={{ width: "100%", height: "600px", alignItems: "center" }}
                className="CarouselImage"
              />
            </Media>
            <Media bottom body className="CarouselText">
              <Media heading>Title</Media>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </Media>
          </Media>
*/}
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });
    return (
      <Row style={{ height: "100%" }}>
        <Col xs="2" />
        <Col xs="8">
          <Carousel
            activeIndex={this.state.activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              items={this.state.items}
              activeIndex={this.state.activeIndex}
              onClickHandler={this.goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Carousel>
        </Col>
        <Col xs="2" />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default CustomCarousel;
