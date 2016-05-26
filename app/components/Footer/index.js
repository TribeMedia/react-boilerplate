import React from 'react';

import A from 'components/A';
import styles from './styles.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>Made by <A href="https://twitter.com/gqadonis2008">Travis James</A>.</p>
      </section>
    </footer>
  );
}

export default Footer;
