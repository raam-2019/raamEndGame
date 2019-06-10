import * as _ from 'lodash';
import * as React from 'react';

import {Carousel} from 'react-responsive-carousel';

import imgAtt from 'assets/images/sponsors/att.jpg';
import imgEquivital from 'assets/images/sponsors/equivital.jpg';
import imgGarmin from 'assets/images/sponsors/garmin.jpg';
import imgHumon from 'assets/images/sponsors/humon.svg';
import imgIronForge from 'assets/images/sponsors/iron_forge.png';
import imgKymira from 'assets/images/sponsors/kymira.jpg';
import imgMapbox from 'assets/images/sponsors/mapbox.png';
import imgNotio from 'assets/images/sponsors/notio.png';
import imgQlik from 'assets/images/sponsors/qlik.png';
import imgUbix from 'assets/images/sponsors/ubix.png';
import imgWid from 'assets/images/sponsors/wid.png';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {FlexCell} from 'components/layout/FlexCell';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './SponsorCarousel.module.css';



interface ISponsorCarouselState {
  currentIndex: number;
}

export class SponsorCarousel extends React.Component<object, ISponsorCarouselState> {

  constructor(props: object) {
    super(props);

    this.state = {
      currentIndex: 0
    };
  }



  public render = () => {
    const elSponsorCards = _.map(__sponsorData, sponsor => (
      <a
        className={styles.card}
        href={sponsor.webpageUrl}
        key={sponsor.webpageUrl}>
        <FlexCell>
          <img
            alt="sponsor logo"
            className={styles.img}
            src={sponsor.logoUrl} />
        </FlexCell>

        <FlexCell>
          <Paragraph extraClassName={styles.copyText}>
            {sponsor.copyText}
          </Paragraph>
        </FlexCell>
      </a>
    ));

    return (
      <Carousel
        autoPlay
        centerMode
        selectedItem={this.state.currentIndex}
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        onChange={this.__handleChange}>
        {elSponsorCards}
      </Carousel>
    );
  };



  private __handleChange = (currentIndex: number) =>
    this.setState({currentIndex});

}



interface ISponsor {
  copyText: string;
  logoUrl: string;
  webpageUrl: string;
}

const __sponsorData: ISponsor[] = [
  {
    copyText: "We’re using our network, labs, products, services and people to create a world where everything works together seamlessly, and life is better as a result.",
    logoUrl: imgAtt,
    webpageUrl: 'https://www.att.com/'
  },
  {
    copyText: "Equivital develops products that empower individuals and teams, save lives and improve human performance through the application of mobile human data.",
    logoUrl: imgEquivital,
    webpageUrl: 'https://www.equivital.com/'
  },
  {
    copyText: "For decades, Garmin has pioneered new GPS navigation and wireless devices and applications that are designed for people who live an active lifestyle.",
    logoUrl: imgGarmin,
    webpageUrl: "https://www.garmin.com/en-US/"
  },
  {
    copyText: "Our mission is to provide people with unprecedented visibility into their bodies and empower them with the required actionable insights to be their best selves.",
    logoUrl: imgHumon,
    webpageUrl: 'https://humon.io/'
  },
  {
    copyText: "Iron Forge Development is a premier software and mobile application design and development company.",
    logoUrl: imgIronForge,
    webpageUrl: "https://www.ironforge.co"
  },
  {
    copyText: "The world’s leading producer of infrared performance and recovery enhancing sportswear. Powered by Progress. #TeamKYMIRA.",
    logoUrl: imgKymira,
    webpageUrl: "https://www.kymirasport.com/"
  },
  {
    copyText: "Our tools let developers build a new world powered by location data. Real-time updates. Total customization. Developers first.",
    logoUrl: imgMapbox,
    webpageUrl: "https://www.mapbox.com/"
  },
  {
    copyText: "Notio develops unique technologies to gather, analyse and interpret data for all levels of cyclists. BE AERO. GO FASTER.",
    logoUrl: imgNotio,
    webpageUrl: "https://notiokonect.com/en/index"
  },
  {
    copyText: "Qlik® delivers intuitive platform solutions for self-service data visualization, guided analytics applications, embedded analytics and reporting to approximately 45,000 customers worldwide. Lead with data.",
    logoUrl: imgQlik,
    webpageUrl: "https://www.qlik.com/us"
  },
  {
    copyText: "Making AI Abundant, Reliable, and Cost Effective, UBIX.AI is the Cognitive Data Science Platform for Sports, Healthcare, Supply Chain, and IoT. ",
    logoUrl: imgUbix,
    webpageUrl: "https://ubixlabs.com/"
  },
  {
    copyText: "The mission of WID is to discover and inspire through interdisciplinary research conducted in a dynamic, collaborative community. It is also home to the UW campus hub in Data Science.",
    logoUrl: imgWid,
    webpageUrl: 'https://wid.wisc.edu/'
  }
];