import Head from 'next/head'
import Header from '../../components/Header'

import { useRouter } from 'next/router'
import SearchResults from '../../components/SearchResults'
import {API_KEY, CONTEXT_KEY} from '../../keys'

function Search({results}) {
    
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{router.query.term}-Google Search-</title>
            </Head>
            <Header/>
            <SearchResults results={results}/>

        </div>
    )
}
export default Search

export async function getServerSideProps(context) {
  console.log(context.query.term);
   
    const data = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}`)
    .then(res=>res.json());

    //pass the data to the client side
    return{
        props:{ 
            results:data,
        }
    }
}
