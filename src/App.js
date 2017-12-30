import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  MultiDropdownList,
  SingleRange,
  SelectedFilters,
  ResultCard
} from '@appbaseio/reactivesearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="good-books-live"
        credentials="sHZWU7AYJ:d1e2922c-035c-429f-bfe4-62aa38b1c395"
      >
        <div className="navbar">
          <div className="logo">
            The Booksearch App
          </div>
          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={["original_title", "original_title.search", "authors", "authors.search"]}
            queryFormat="and"
            placeholder="🔍  Search for books or authors"
            innerClass={{
              "input": "searchbox",
              "list": "suggestionlist"
            }}
            autosuggest={false}
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
                { start: 1, end: 5, label: "★ & up" },
              ]}
              react={{
                and: "mainSearch"
              }}
              filterLabel="ratings"
            />
            <MultiDropdownList
              componentId="publishFilter"
              dataField="original_publication_year"
              title="Published Year"
              size={50}
              placeholder="Filter"
              showSearch={false}
              showCheckbox={false}
              showCount={false}
              sortBy="desc"
              filterLabel="published"
            />
          </div>
          <div className={"mainBar"}>
            <SelectedFilters />
            <ResultCard
              componentId="results"
              dataField="original_title"
              react={{
                "and": ["mainSearch", "ratingsFilter", "publishFilter"]
              }}
              pagination={true}
              size={8}
              sortOptions={[
                { dataField: "average_rating", sortBy: "desc", label: "Ratings (High to low)" },
                { dataField: "original_title.raw", sortBy: "asc", label: "Title A->Z"},
                { dataField: "original_title.raw", sortBy: "desc", label: "Title Z->A"}
              ]}
              onData={(res)=>(
                {
                  "image": res.image,
                  "title": res.original_title || " ",
                  "desc":  res.average_rating + " ★ " +
                  "<span style='float:right;margin-right:5px;'>Pub: " + res.original_publication_year + "</span><br/><br/><div class='result-author' title='" + res.authors + "'>by " + res.authors + "</div>",
                  "url": "https://google.com/search?q=" + res.original_title
                }
              )}
              innerClass={{
                "image": "result-image",
                "resultStats": "result-stats"
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;
