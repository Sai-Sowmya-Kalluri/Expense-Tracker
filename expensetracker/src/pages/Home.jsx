function Home({ setPage }) {

  return (

    <div className="home-page">

      <div className="hero-section">

        <div className="hero-left">

          <h1 className="hero-title">
            Smart Expense Tracker
          </h1>

          <p className="hero-subtitle">

            Manage your expenses,
            savings and monthly
            financial analysis
            beautifully.

          </p>

          <div className="button-group">

            <button
              className="green-btn"
              onClick={() =>
                setPage("login")
              }
            >
              Login
            </button>

            <button
              className="blue-btn"
              onClick={() =>
                setPage("signup")
              }
            >
              Signup
            </button>

          </div>

        </div>

        <div className="hero-right">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
            alt="finance"
            className="hero-image"
          />

        </div>

      </div>

    </div>

  )
}

export default Home