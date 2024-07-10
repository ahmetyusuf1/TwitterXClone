import {
  AiOutlineBell,
  AiOutlineCheckCircle,
  AiOutlineMail,
} from "react-icons/ai";
import { BiHomeCircle } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeCircle } from "react-icons/pi";

export const navSections = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Notifications",
    icon: <AiOutlineBell />,
  },
  {
    title: "Messages",
    icon: <AiOutlineMail />,
  },
  {
    title: "Lists",
    icon: <CiViewList />,
  },
  {
    title: "Place Marks",
    icon: <BsBookmark />,
  },
  {
    title: "Approved",
    icon: <AiOutlineCheckCircle />,
  },
  {
    title: "Profile",
    icon: <CgProfile />,
  },
  {
    title: "More",
    icon: <PiDotsThreeCircle />,
  },
];
