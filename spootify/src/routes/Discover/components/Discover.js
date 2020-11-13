import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import makeRequest from "../api/makeRequest";

/*
  Solution: called the makeRequest() helper method with the provided paths on componentDidMount and set the state to the response 
*/

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const releases = await makeRequest('new-releases');
      this.setState({newReleases: releases.data.albums.items})

      const featured = await makeRequest('featured-playlists');
      this.setState({playlists: featured.data.playlists.items})

      const category = await makeRequest('categories');
      this.setState({categories: category.data.categories.items})
    }
    catch (error) {
      console.log(error);

  }
}

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
