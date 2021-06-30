import Link from "next/link";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes["footer-section"]}>
        <Link href="/admin">Admin Panel</Link>
      </div>
    </div>
  );
}

export default Footer;
