const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#d32f2f", 
      textAlign: "center",
      padding: "20px 0", 
      fontSize: "1em",
      fontFamily: "Arial, sans-serif",
    },
  };

  return (
    <footer style={styles.footer}>
      <p>© 2025 Movie Database App MovieDB. All rights reserved .</p>
    </footer>
  );
};

export default Footer;
