// @ts-nocheck
import { IsIPAD } from "@/themes/app.constant";
import { Dimensions, Image } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import One from "@/assets/images/onboarding/1.jpg";
import Two from "@/assets/images/onboarding/2.jpg";
import Three from "@/assets/images/onboarding/3.jpg";

export const onBoardingSlides: onBoardingSlidesTypes[] = [
  {
    color: "#95dd22", // Deep navy blue
    title: "Explore",
    image: (
      <Image
        source={One}
        style={{
          width: IsIPAD ? verticalScale(285) : verticalScale(330),
          height: IsIPAD ? verticalScale(345) : verticalScale(335),
        }}
      />
    ),
    secondTitle: "",
    subTitle:
      "Find the perfect course to enhance your career prospects and skill set",
  },
  {
    color: "#aae34f", // Medium electric blue
    title: "Set Your",
    image: (
      <Image
        source={Two}
        style={{
          width: IsIPAD ? scale(285) : scale(350),
          height: IsIPAD ? verticalScale(345) : verticalScale(335),
        }}
      />
    ),
    secondTitle: "Own Goal",
    subTitle:
      "Personalize your study plan with flexible timelines that suit you best",
  },
  {
    color: "#bce973", // Bright sky blue
    image: (
      <Image
        source={Three}
        style={{
          width: IsIPAD ? scale(285) : scale(350),
          height: IsIPAD ? verticalScale(345) : verticalScale(335),
        }}
      />
    ),
    title: "Complete full",
    secondTitle: "Course",
    subTitle:
      "Achieve certification by completing courses with dedicated effort",
  },
];

// onboarding variables
export enum Side {
  LEFT,
  RIGHT,
  NONE,
}
export const MIN_LEDGE = 25;
export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

// banner data
export const bannerData = [
  {
    image:
      "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGZpdG5lc3MlMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D",
    url: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGZpdG5lc3MlMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D",
    url: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxmaXRuZXNzJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D",
    url: "",
  },
];

export const NotificationsData = [
  {
    id: "1",
    title: "New Answer Received",
    message: "You have a new answer in your question",
    status: "Unread",
  },
  {
    id: "2",
    title: "New Reply Received",
    message: "You have a new reply in your support question",
    status: "Unread",
  },
];

export const FAQData = [
  {
    id: 1,
    question: "Will I receive a certificate for each course?",
    answer:
      "Yes — each student who completes any course will receive a certificate of completion to acknowledge their proficiency. We encourage students to include these on their LinkedIn profiles and in their job applications!",
  },
  {
    id: 2,
    question: "Can I get source code of each course?",
    answer:
      "Yes - You will get source code of all courses when you will watch the course video.",
  },
  {
    id: 3,
    question:
      "Can I ask about anything related course or if my code dosen't work?",
    answer:
      "Yes, you can comment on every part of the videos in the course. We'll always try to reply to your comment and fix any issues you may have.",
  },
  {
    id: 4,
    question: "Can I download any course videos?",
    answer:
      "For security reasons, course videos cannot be downloaded. However, you have lifetime access to each purchased course and can watch them anytime, anywhere with your account",
  },
];
