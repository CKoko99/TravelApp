import classes from "./Pagecard.module.css";

function Pagecard(props){
    return (
        <div onClick={props.onClick} className={classes["pagecard"]}>
            <div className={classes['title']}>{props.title}</div>
            <div>

          <img
            className={classes["home-img"]}
            alt={props.title}
            src={props.img}
          ></img>
          <div>
              {props.desc}
          </div>
            </div>
          <div className={classes.Rows}>
            <div className={classes.Row1}>
            </div>
            <div className={classes.Row2}>
            </div>
          </div>
        </div>
      );
}
export default Pagecard