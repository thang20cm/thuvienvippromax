import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import './App.css';
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import Options from "./Options";
import useFirestore from "../../firebase/useFirestore";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useState } from "react";
import "lightgallery.js/dist/css/lightgallery.css";
import {
  LightgalleryProvider,
  LightgalleryItem,
  withLightgallery,
  useLightgallery,
} from "react-lightgallery";

function srcset(image) {
  return {
    src: `${image}?w=164&h=164&fit=crop&auto=format`,
    srcSet: `${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImagesList() {
  const { documents } = useFirestore("gallery");
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <>
      <div class="container-card-img">
        <div class="card-img">
          {documents.map((item, index) => (
            <ImageListItem key={item?.id}>
              <Options
                imageId={item?.id}
                uid={item?.data?.uid}
                imageURL={item?.data?.imageURL}
              />

              <img
                {...srcset(item?.data?.imageURL, 200)}
                alt={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
                loading="lazy"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            </ImageListItem>
          ))}
        </div>
      </div>
      <p class="troll">Ứng dụng này chỉ hổ trợ trên iPhone7-32GB màu vàng gôn 🥳</p>
      {isOpen && (
        <Lightbox
          mainSrc={documents[photoIndex]?.data?.imageURL}
          nextSrc={
            documents[(photoIndex + 1) % documents.length]?.data?.imageURL
          }
          prevSrc={
            documents[(photoIndex + documents.length - 1) % documents.length]
              ?.data?.imageURL
          }
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % documents.length)
          }
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + documents.length - 1) % documents.length
            )
          }
          imageTitle={documents[photoIndex]?.data?.uName}
          imageCaption={documents[photoIndex]?.data?.uEmail}
        />
      )}
    </>
  );
}
