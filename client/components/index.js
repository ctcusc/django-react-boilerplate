import React, {Component} from 'react'
import { gql, graphql } from 'react-apollo'

function IndexComponent(props) {
  return (
    <div>
      <ul></ul>
      Hello world!
    </div>
  );
}

export default graphql(gql`
  query IndexComponent {
    persons {
      id
      name
    }
  }
`)(IndexComponent);
