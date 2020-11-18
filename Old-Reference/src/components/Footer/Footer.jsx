import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-5">
            <h5 className={styles.title}>Template_Project</h5>
            <p className={styles.description}>
              This is placeholder text. Your web app description goes here.
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink} href="/">
                  Home
                </a>
              </li>
              <li>
                <a
                  className={styles.footerlink}
                  href="https://github.com/ronniegeraghty/Template-Project"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
