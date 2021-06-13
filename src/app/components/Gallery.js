import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectEvents } from "../features/eventsSlice";

function Gallery() {
  const prevEvents = [...useSelector(selectEvents)].reverse().slice(0, 6);
  const [isGalleryReached, setIsGalleryReached] = useState(false);

  useEffect(() => {
    const addMargin = () => {
      if (window.scrollY > 1600 && window.scrollY < 2500) {
        setIsGalleryReached(true);
      } else if (window.scrollY > 1500) {
        setIsGalleryReached(false);
      } else {
        setIsGalleryReached(false);
      }
    };

    window.addEventListener("scroll", addMargin);

    return () => {
      window.removeEventListener("scroll", addMargin);
    };
  }, []);

  return (
    <GalleryContainer>
      <GalleryHeading>
        <MainHeading>Our Previous Events</MainHeading>
      </GalleryHeading>
      <ImageCards>
        {prevEvents.map((event) => (
          <ImageCardWrapper
            style={{ margin: isGalleryReached ? "20px" : 0 }}
            key={event.id}
          >
            <ImageCard
              style={{
                backgroundImage: `url(${event.poster})`,
              }}
            >
              <ImageDescription>
                <h1>{event.title}</h1>
                <p>
                  {event.description.length > 200
                    ? `${event.description.slice(0, 200)}...`
                    : event.description}
                </p>
              </ImageDescription>
            </ImageCard>
          </ImageCardWrapper>
        ))}
      </ImageCards>
    </GalleryContainer>
  );
}

export default Gallery;

const GalleryContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GalleryHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px 0 20px;
`;

const MainHeading = styled.h1`
  font-size: 3rem;
`;

const ImageCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const ImageCardWrapper = styled.div`
  width: 400px;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s ease;
`;

const ImageDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: none;
  transition: all 0.5s ease;
  color: #fff;
  text-align: center;
  margin: 0 40px 0 40px;
`;

const ImageCard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  :hover {
    background-color: rgba(0, 0, 0, 0.8);
    background-blend-mode: darken;
    transform: scale(1.1);
  }

  :hover > ${ImageDescription} {
    display: block;
  }
`;
