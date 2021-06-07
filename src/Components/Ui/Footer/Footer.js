import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

function Footer(){
    return(
        <div className={classes.footer}>
            <div className={classes['footer-section']}>
                <Link to="/admin">
                    <div>Admin Panel</div>
                </Link>
            </div>
        </div>
    )
}

export default Footer