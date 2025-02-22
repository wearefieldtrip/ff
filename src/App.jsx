function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <p>Body Text Medium</p>
        <p className='body-large'>Body Text Large</p>
        <p className='body-small'>Body Text Small</p>
        <a className='btn-white-pill'>Dual Credit</a>
        <form>
          <div className='form-field'>
            <label for='street-address'>Street Address</label>
            <input
              type='text'
              id='street-address'
              name='street-address'
              required
              aria-required='true'
            />
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
