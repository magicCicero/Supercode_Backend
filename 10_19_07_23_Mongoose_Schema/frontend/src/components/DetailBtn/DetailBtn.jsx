import { NavLink } from "react-router-dom";

const DetailBtn = (props) => {
  return (
    <>
      <NavLink to={`/post/${props.postId}`}>
        <button>Mehr lesen</button>
      </NavLink>
    </>
  );
};

export default DetailBtn;
