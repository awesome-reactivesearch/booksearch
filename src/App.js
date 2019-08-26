import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard,
  ReactiveList
} from "@appbaseio/reactivesearch";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      >
        <div className="navbar">
          <div className="logo">The Booksearch App</div>
          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={[
              "original_title",
              "original_title.search",
              "authors",
              "authors.search"
            ]}
            queryFormat="and"
            placeholder="Search for a book title or an author"
            innerClass={{
              input: "searchbox",
              list: "suggestionlist"
            }}
            autosuggest={false}
            iconPosition="left"
            filterLabel="search"
          />
        </div>
        <div className={"display"}>
          <div className={"leftSidebar"}>
            <SingleRange
              componentId="ratingsFilter"
              dataField="average_rating_rounded"
              title="Book Ratings"
              data={[
                { start: 4, end: 5, label: "★★★★ & up" },
                { start: 3, end: 5, label: "★★★ & up" },
                { start: 2, end: 5, label: "★★ & up" },
                { start: 1, end: 5, label: "★ & up" }
              ]}
              react={{
                and: "mainSearch"
              }}
              filterLabel="Ratings"
            />
            <RangeSlider
              componentId="publishFilter"
              dataField="original_publication_year"
              title="Year of Publication"
              filterLabel="published"
              range={{
                start: 1970,
                end: 2017
              }}
              rangeLabels={{
                start: "1970",
                end: "2017"
              }}
              interval={2}
            />
            <MultiList
              componentId="authorFilter"
              dataField="authors.raw"
              title="Authors"
              size={1000}
              showCheckbox={false}
              className="authors"
              innerClass={{
                list: "author-list"
              }}
              placeholder="Filter by author name"
              filterLabel="Authors"
            />
          </div>
          <div className={"mainBar"}>
            <SelectedFilters />
            <ReactiveList
              componentId="SearchResult"
              dataField="original_title"
              size={8}
              pagination
              react={{
                and: [
                  "mainSearch",
                  "ratingsFilter",
                  "publishFilter",
                  "authorFilter"
                ]
              }}
              render={({ data }) => (
                <ReactiveList.ResultCardsWrapper>
                  {data.map(item => (
                    <ResultCard key={item.id}>
                      <ResultCard.Image src={item.image} />
                      <ResultCard.Title>
                        <div
                          className="book-title"
                          dangerouslySetInnerHTML={{
                            __html: item.original_title
                          }}
                        />
                      </ResultCard.Title>

                      <ResultCard.Description>
                        <div className="flex column justify-space-between">
                          <div>
                            <div>
                              by{" "}
                              <span className="authors-list">
                                {item.authors}
                              </span>
                            </div>
                            <div className="ratings-list flex align-center">
                              <span className="stars">
                                {Array(item.average_rating_rounded)
                                  .fill("x")
                                  .map((
                                    item, // eslint-disable-line
                                    index
                                  ) => (
                                    <i
                                      className="fas fa-star"
                                      key={index} // eslint-disable-line
                                    />
                                  ))}
                              </span>
                              <span className="avg-rating">
                                ({item.average_rating} avg)
                              </span>
                            </div>
                          </div>
                          <span className="pub-year">
                            Pub {item.original_publication_year}
                          </span>
                        </div>
                      </ResultCard.Description>
                    </ResultCard>
                  ))}
                </ReactiveList.ResultCardsWrapper>
              )}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;
