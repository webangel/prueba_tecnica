interface NameSidebarProps {
    name: String;
  }

const Header = ({name}: NameSidebarProps) => {
    return (
      <>
        <header className="App-header">  
          <div>
            <h3>{name}</h3>
          </div>
        </header>
      </>
    );
  }
  
  export default Header;