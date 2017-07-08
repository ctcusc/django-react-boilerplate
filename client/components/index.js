import React, {Component} from 'react'
import { gql, graphql } from 'react-apollo'

function IndexComponent({data: {persons}}) {
  persons = persons || [];
  return (
    <div>
      <ul>
        {persons.map((p) => <li key={p.id}>{p.id} - {p.name}</li>)}
      </ul>
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
