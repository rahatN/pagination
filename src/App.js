import "./App.css";
import { useFetch } from "./useFetch";
import { useState, useEffect } from "react";
import Follower from "./Follower";
import paginate from "./utils";

function App() {
  const { data, loading } = useFetch();
  console.log(data);
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(0);

  const handleBtn = (type) => {
    if ((type = "inc")) {
      if (page === data.length - 1) {
        setPage(data.length - 1);
      } else {
        setPage(page + 1);
      }
    } else if ((type = "dec")) {
      if (page === 0) {
        setPage(0);
      } else {
        setPage(page - 1);
      }
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    setFollowers(data[page]);
  }, [loading, page]);

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "pagination"}</h1>

        <div className="underline"></div>
        <section className="followers">
          <div className="container">
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower}></Follower>;
            })}
          </div>
          {!loading && (
            <div className="btn-container">
              <button
                className="btn-container"
                onClick={() => {
                  handleBtn("dec");
                }}
              >
                prev
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`page-btn ${
                      index === page ? "active-btn" : null
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button
                className="btn-container"
                onClick={() => {
                  handleBtn("inc");
                }}
              >
                next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
