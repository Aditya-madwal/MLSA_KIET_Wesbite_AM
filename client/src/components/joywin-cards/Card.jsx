import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { MainContext } from "../../Context/MainContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";

import "./Card.css";

const EventCards = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardHover = () => {
    setIsExpanded(true);
  };

  const handleCardLeave = () => {
    setIsExpanded(false);
  };

  const handleCardClick = () => {
    const isUpcoming = props.isUpcoming || false;
    const path = isUpcoming
      ? `/upcoming-event-info/${props._id}`
      : `/event-info/${props.id}`;
    navigate(path);
  };

  return (
    <div
      className={`Card-content ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      onClick={handleCardClick}>
      <div className="Card-title">
        <h3 className="font-bold text-lg">{props.eventName}</h3>
      </div>
      <div className="Card-image">
        <img src={props.image} alt="Event" />
      </div>
      <div className="Card-footer">
        <div className="date-container">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <h5 className="font-normal">{props.date.split("T")[0]}</h5>
        </div>
      </div>
      {isExpanded && (
        <div className="Card-info">
          <h3 className="font-bold text-3xl underline  text-white">
            {props.eventName}
          </h3>
          <h5 className="text-2xl">
            <FontAwesomeIcon icon={faCalendarAlt} /> {props.date.split("T")[0]}
          </h5>
        </div>
      )}
    </div>
  );
};

const UpComingEventCards = (props) => {
  console.log("UpComingEventCards props:", props);
  const { showRegister, setShowRegister } = useContext(MainContext);
  const { eventName, setEventName } = useContext(MainContext);
  const { eventImage, setEventImage } = useContext(MainContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardHover = () => {
    setIsExpanded(true);
  };

  const handleCardLeave = () => {
    setIsExpanded(false);
  };

  const handleRegister = () => {
    const token = localStorage.getItem("token");
    if (token) {
      if (props.isRegistered) {
        console.log(`Already registered for ${props.eventName}`);
        alert(
          `You have already registered for ${props.eventName}. Excited to see you on ${props.date}!`
        );
      } else {
        setEventName(props.eventName);
        setEventImage(props.image);
        setShowRegister(true);

        const path = `/upcoming-event-info/${props._id}`;
        props.navigate(path);
      }
    } else {
      props.navigate("/login");
    }
  };

  return (
    <div
      className={`Card-content ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}>
      <div className="Card-title">
        <h3 className="font-bold text-lg">{props.eventName}</h3>
      </div>
      <div className="Card-image">
        <img src={props.image} alt="Event" />
      </div>
      <div className="Card-footer">
        <div className="date-container">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <h5 className="font-normal">{props.date.split("T")[0]}</h5>
        </div>
        <button
          onClick={handleRegister}
          className="font-bold"
          disabled={props.isRegistered}>
          {props.isRegistered ? "Already Registered" : "Register Now"}
        </button>
      </div>
      {isExpanded && (
        <div className="Card-info">
          <h3 className="font-bold text-2xl text-blue-900">
            {props.eventName}
          </h3>
          <h5>
            <FontAwesomeIcon icon={faCalendarAlt} /> {props.date.split("T")[0]}
          </h5>
          <p>{props.eventInfo}</p>
          <button
            onClick={handleRegister}
            className="transition-all mt-10 font-bold text-lg absolute bottom-5 hover:scale-125"
            disabled={props.isRegistered}>
            {props.isRegistered ? "Already Registered" : "Register Now"}
          </button>
        </div>
      )}
    </div>
  );
};

// const EventCard = (props) => {
//   return (
//     <div className="m-3">
//       <Link className="group relative block bg-black">
//         <img
//           alt=""
//           src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
//           className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
//         />

//         <div className="relative p-4 sm:p-6 lg:p-8">
//           <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-pink-500">
//             <span className="text-xl">
//               <CiCalendar />
//             </span>
//             <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
//               12 August, 2024
//             </p>
//           </span>

//           <p className="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

//           <div className="mt-32 sm:mt-48 lg:mt-64">
//             <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
//               <p className="text-sm text-white">
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
//                 perferendis hic asperiores quibusdam quidem voluptates
//                 doloremque reiciendis nostrum harum. Repudiandae?
//               </p>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

const EventCard = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // Handle hover to expand the card
  const handleCardHover = () => {
    setIsExpanded(true);
  };

  // Handle mouse leave to collapse the card
  const handleCardLeave = () => {
    setIsExpanded(false);
  };

  // Handle card click to navigate to event details
  const handleCardClick = () => {
    const isUpcoming = props.isUpcoming || false;
    const path = isUpcoming
      ? `/upcoming-event-info/${props._id}`
      : `/event-info/${props.id}`;
    navigate(path);
  };

  return (
    <div
      className="m-3 rounded-lg  hover:rotate-1 transition-transform duration-300"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      onClick={handleCardClick}>
      <div className="group relative block bg-black cursor-pointer rounded-lg">
        <img
          alt={props.eventName}
          src={
            props.image ||
            "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
          }
          className="absolute inset-0 h-full w-full object-cover transition-opacity opacity-50 rounded-lg"
        />

        <div className="relative p-4 sm:p-6 lg:p-8 backdrop-blur-[4px] rounded-lg flex justify-between flex-col h-[50vh]">
          <div>
            <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-yellow-500">
              <span className="text-xl">
                <CiCalendar />
              </span>
              <p className="text-sm font-medium uppercase tracking-widest text-yellow-50">
                {props.date.split("T")[0]}
              </p>
            </span>
            <p className="text-xl font-bold text-white sm:text-2xl ">
              {props.eventName}
            </p>
          </div>
          <div>
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm text-white flex items-center gap-2 font-semibold">
                Tap to View <FaExternalLinkAlt />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventCards, UpComingEventCards, EventCard };
