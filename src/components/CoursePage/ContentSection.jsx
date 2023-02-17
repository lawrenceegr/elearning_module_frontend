import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import {
  SinglePage as SinglePageViewer,
  AudioPlayer,
  UnitNav,
  VideoComponent,
  QuillEditorStudent,
} from "../../components";
import "./SinglePage.css";
import posterImage from "../../assets/video-placeholder.jpg";

// Sample resources
const samplePDF =
  "https://kapesha001-demo.s3.ap-south-1.amazonaws.com/pol-1675866174132.pdf";
const sampleVideo =
  "https://kapesha001-demo.s3.ap-south-1.amazonaws.com/45b1f269541bf014a6ebc76666f22590.mp4";
const sampleAudio =
  "https://kapesha001-demo.s3.ap-south-1.amazonaws.com/e181dfcb46528793529605a0ea0640e2.webm";
const lessonName =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, nostrum!";
const ContentSection = () => {
  // Used to direct the traffic. Data is passed via the router.
  // Fetch lesson given its id.
  const location = useLocation();
  const { lessonId } = useParams();
  const [lessonData, setLessonData] = useState(null);
  const fetchLesson = async () => {
    console.log(`Lesson ID with which I want its data ${lessonId}`);
    const { data, status } = await axios.get(`/lesson/${lessonId}`);
    try {
      if (status == 200) {
        console.log(
          `Lesson Data returned during fetch ${JSON.stringify(data)}`
        );
        setLessonData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Every time a rerender occurs.
  useEffect(() => {
    fetchLesson();
  }, [lessonId]);
  // Reading our state.
  // console.log(`Current Lesson data ${JSON.stringify(lessonData)}`);
  // const lessonUrl = (location.state && location.state.lessonUrl) || null;
  const lessonType = (location.state && location.state.lessonType) || null;
  switch (lessonType) {
    case "video":
      return (
        <div className="w-full h-full text-center text-white flex flex-col justify-start border-2 border-black text-3xl font-extrabold">
          <VideoComponent
            poster={posterImage}
            src={lessonData && lessonData.lessonUrl}
            title={lessonData && lessonData.lessonName}
          />
          {/* <UnitNav /> */}
          {/* <QuillEditorStudent /> */}
        </div>
      );
      break;
    case "audio":
      return (
        <div className="w-full h-full text-center text-dark flex-row-centered text-3xl font-extrabold">
          <AudioPlayer
            url={lessonData && lessonData.lessonUrl}
            lessonName={lessonData && lessonData.lessonName}
          />
        </div>
      );
      break;
    case "pdf":
      return (
        <div className=" flex flex-col w-full  h-full text-dark">
          <SinglePageViewer
            pdf={
              lessonData &&
              `http://localhost:4000/s3Direct/${lessonData.lessonUrl}`
            }
          />
        </div>
      );
      break;
    default:
      return (
        <div className="w-full h-full bg-rose-600 text-white flex-row-centered text-3xl font-extrabold">
          This page has nothing to show
        </div>
      );
  }
};

export default ContentSection;
