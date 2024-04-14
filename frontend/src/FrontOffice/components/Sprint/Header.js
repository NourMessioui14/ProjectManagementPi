
export function Header({ sprintName , description }) {
  return (
    
    <header style={styles.header}>
      <h1 style={styles.title}>
        {sprintName ? sprintName : "Default Sprint Name"}
      </h1>
      <p style={styles.subtitle}>
      {description ? description : "Default Description"}
      </p>
    </header>
  );
}




const styles = {
  header: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '20px',

      backgroundColor: '#ecf0f1',
      color: '#ffffff',
      width: '100%',
      // position: 'fixed',
      // top: 0,
      // ledt: 0,
      // zIndex: 1
  },

  title: {
      margin: 0,
      padding: 0,
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 2px #000000'
  },

  subtitle: {
      margin: 0,
      padding: 0,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 2px #000000'
  }
}