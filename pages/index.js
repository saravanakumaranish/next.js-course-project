import { Fragment } from 'react'

import Head from 'next/head';

import { MongoClient } from 'mongodb'; 

import MeetupList from "../components/meetups/MeetupList"



// const DUMMY_MEETUPS = [
//   {
//     id:'m1',
//     title:'A first Meetup',
//     image : 'https://upload.wikimedia.org/wikipedia/commons/6/66/The_Peninsula_New_York_Entrance.jpg',
//     address:'Some address 5,12345 some city ',
//     description:'This is the first meetup!'
//   },
//   {
//     id:'m2',
//     title:'A second Meetup',
//     image  :'https://upload.wikimedia.org/wikipedia/commons/6/66/The_Peninsula_New_York_Entrance.jpg',
//     address:'Some address 10,12345 some city ',
//     description:'This is the second meetup!'
//   }
// ]

function HomePage(props) {

  return  (
  <Fragment>
  <Head>
    <title>React meetups</title>
    <meta 
    name='description'
    content='Browse a huge list of highly active React meetups!'
    />
  </Head>
   <MeetupList meetups={props.meetups} />
   </Fragment>
   )

}

// export async function getServerSideProps(context) {

//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  //fetch data from an  API
  const client = await MongoClient.connect('mongodb+srv://dbuser:iPxeILzMzXNPGIJs@cluster0.qncxzxu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db()

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    
    client.close();

  return {
    props:{
      meetups:meetups.map(meetup=> ({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString(),
      }) )
    },
    revalidate:1 
  };
}

export default HomePage;