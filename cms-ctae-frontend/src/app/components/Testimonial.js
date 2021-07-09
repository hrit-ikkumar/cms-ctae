import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Testimonial() {
  return (
    <TestimonialContainer>
      <TestimonialHeader>Testimonial</TestimonialHeader>
      <TestimonialCarousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showThumbs={false}
      >
        {Array(3)
          .fill()
          .map((_, index) => (
            <TestimonialCard key={index}>
              <TestimonialImage
                src={"https://news.itmo.ru/images/news/big/p7642.jpg"}
              />
              <TestimonialText>
                " The place where I learnt how to code!"
              </TestimonialText>
              <TestimonialUser>
                - Gennady Korotkevich (Programming Club ❤ Member){" "}
              </TestimonialUser>
            </TestimonialCard>
          ))}
      </TestimonialCarousel>
    </TestimonialContainer>
  );
}

export default Testimonial;

const TestimonialContainer = styled.section`
  width: 100%;
  margin-top: 60px;
  padding: 0 60px;

  @media only screen and (max-width: 500px) {
    padding: 0 10px;
  }
`;

const TestimonialHeader = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const TestimonialCarousel = styled(Carousel)`
  @media only screen and (max-width: 694px) {
    button {
      display: none;
    }
  }
`;

const TestimonialCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const TestimonialImage = styled.img`
  height: 180px !important;
  width: 180px !important;
  border-radius: 50%;
  object-fit: cover;
`;

const TestimonialText = styled.div`
  color: #cfcfd1;
  min-width: 300px;
  max-width: 500px;
  margin-top: 40px;
  text-align: center;
  font-weight: 600;
`;

const TestimonialUser = styled.h3`
  margin: 50px 0;
`;
